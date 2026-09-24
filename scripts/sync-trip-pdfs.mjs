#!/usr/bin/env node
/* Restore every trip's PDFs from the V3 repo: npm run sync:trip-pdfs
   (add -- --check to report without copying, -- --force to recopy all).

   The PDFs under apps/web/public/trips/<slug>/letter|a4/ are gitignored.
   Each trip content file (apps/web/src/content/trips/<slug>.ts) records where
   its PDFs live in V3 (pdfSource.letterDir / a4Dir, relative to the V3 root,
   with an optional per-document `source` override). This script loads the
   live trips from src/content/trips/index.ts, so it copies exactly the
   editions the site links to, no more.

   V3 root: $ETI360_V3_ROOT, default /Users/danskimin/00 - ETI360 - V3.
   Editions whose URL is absolute (object storage) are skipped. */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB = path.join(REPO, "apps", "web");
const PUBLIC = path.join(WEB, "public");
const TRIPS_INDEX = path.join(WEB, "src", "content", "trips", "index.ts");
const V3 = process.env.ETI360_V3_ROOT || "/Users/danskimin/00 - ETI360 - V3";

const args = new Set(process.argv.slice(2));
const CHECK = args.has("--check");
const FORCE = args.has("--force");

const require = createRequire(import.meta.url);
const ts = require("typescript");

/* Minimal loader: transpile a .ts module to CommonJS and evaluate it,
   resolving relative and "@/" imports to other .ts files. */
const cache = new Map();
function resolveTs(spec, fromFile) {
  const base = spec.startsWith("@/")
    ? path.join(WEB, "src", spec.slice(2))
    : path.resolve(path.dirname(fromFile), spec);
  for (const c of [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts")]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  throw new Error(`Cannot resolve ${spec} from ${fromFile}`);
}
function load(file) {
  if (cache.has(file)) return cache.get(file).exports;
  const source = fs.readFileSync(file, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: file,
  });
  const mod = { exports: {} };
  cache.set(file, mod);
  const localRequire = (spec) =>
    spec.startsWith(".") || spec.startsWith("@/") ? load(resolveTs(spec, file)) : require(spec);
  new Function("exports", "require", "module", "__filename", "__dirname", outputText)(
    mod.exports,
    localRequire,
    mod,
    file,
    path.dirname(file),
  );
  return mod.exports;
}

const { trips } = load(TRIPS_INDEX);
if (!fs.existsSync(V3)) {
  console.error(`V3 repo not found at ${V3}. Set ETI360_V3_ROOT.`);
  process.exit(1);
}

let copied = 0;
let current = 0;
const missing = [];

for (const trip of trips) {
  for (const doc of trip.documents) {
    for (const size of ["letter", "a4"]) {
      const url = doc.editions[size];
      if (!url || /^https?:\/\//.test(url)) continue;
      const dest = path.join(PUBLIC, url);
      const rel =
        doc.source?.[size] ??
        path.join(size === "letter" ? trip.pdfSource.letterDir : trip.pdfSource.a4Dir, path.basename(url));
      const src = path.join(V3, rel);
      if (!fs.existsSync(src)) {
        missing.push(`${trip.slug}/${doc.slug} (${size}): ${rel}`);
        continue;
      }
      const s = fs.statSync(src);
      const d = fs.existsSync(dest) ? fs.statSync(dest) : null;
      const same = d && d.size === s.size && Math.abs(d.mtimeMs - s.mtimeMs) < 1000;
      if (same && !FORCE) {
        current += 1;
        continue;
      }
      if (CHECK) {
        console.log(`would copy ${rel} -> public${url}`);
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        fs.utimesSync(dest, s.atime, s.mtime);
        console.log(`copied ${rel} -> public${url}`);
      }
      copied += 1;
    }
  }
}

console.log(
  `${trips.length} trips: ${copied} ${CHECK ? "to copy" : "copied"}, ${current} already current, ${missing.length} missing in V3.`,
);
if (missing.length) {
  console.error("Missing in V3 (the site links these; build or re-point them):");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}
