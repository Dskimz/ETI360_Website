#!/usr/bin/env node
/* Restore every version's PDFs from where they are built:
   npm run sync:trip-pdfs (add -- --check to report without copying,
   -- --force to recopy all).

   The site's versions are listed in apps/web/src/content/versions/index.ts
   (the registry: the worked trips plus the single-document versions). This
   script loads it, so it copies exactly the editions the site links to, no
   more:
     - a worked trip's PDFs go to public/trips/<slug>/letter|a4/ (gitignored);
     - a single-document version's PDFs go to public/docs/<file>.pdf.
   Each version records where its PDFs are built (pdfSource.letterDir / a4Dir,
   relative to the V3 root, with an optional per-document `source` override
   naming the builder's output file). The rebuild repo sits beside V3, so its
   builders (the Harborview field-trip pack) are reached as
   ../00 - eti360-rebuild/…. A version with no pdfSource is skipped: the
   Travel Program Review sample reaches public/docs only through the rebuild
   repo's publish_baseline_report.py (one canonical PDF, never hand-copied).

   V3 root: $ETI360_V3_ROOT, default /Users/danskimin/00 - ETI360 - V3.
   Editions whose URL is absolute (object storage) are skipped. */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WEB = path.join(REPO, "apps", "web");
const PUBLIC = path.join(WEB, "public");
const VERSIONS_INDEX = path.join(WEB, "src", "content", "versions", "index.ts");
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

const { versions } = load(VERSIONS_INDEX);
if (!fs.existsSync(V3)) {
  console.error(`V3 repo not found at ${V3}. Set ETI360_V3_ROOT.`);
  process.exit(1);
}

let copied = 0;
let current = 0;
let synced = 0;
const skipped = [];
const missing = [];

for (const version of versions) {
  if (!version.pdfSource) {
    skipped.push(version.slug);
    continue;
  }
  synced += 1;
  for (const doc of version.documents) {
    for (const size of ["letter", "a4"]) {
      const url = doc.editions[size];
      if (!url || /^https?:\/\//.test(url)) continue;
      const dest = path.join(PUBLIC, url);
      const rel =
        doc.source?.[size] ??
        path.join(size === "letter" ? version.pdfSource.letterDir : version.pdfSource.a4Dir, path.basename(url));
      const src = path.join(V3, rel);
      if (!fs.existsSync(src)) {
        missing.push(`${version.slug}/${doc.slug} (${size}): ${rel}`);
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
  `${synced} versions synced: ${copied} ${CHECK ? "to copy" : "copied"}, ${current} already current, ${missing.length} missing at source.`,
);
if (skipped.length) console.log(`No pdfSource, not synced: ${skipped.join(", ")}.`);
if (missing.length) {
  console.error("Missing at source (the site links these; build or re-point them):");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}
