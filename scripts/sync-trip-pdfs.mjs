#!/usr/bin/env node
/* Restore every version's PDFs from where they are built:
   npm run sync:trip-pdfs            copy what is missing or changed
     -- --check                      report without copying
     -- --force                      recopy all
     -- --link                       symlink instead of copying (a local
                                     check of the /open links with no second
                                     copy of each PDF on disk; never upload
                                     from a linked tree you intend to keep)
     -- --list                       print every linked edition as JSON (the
                                     upload script reads this) and stop
     -- --s3-check                   HEAD every linked edition in the bucket
                                     (DOCS_BASE_URL, or the default bucket
                                     URL) and fail on any that is not a 200
     -- --skip-wording-check         skip the hospital-wording gate (never
                                     before a publish)

   The site's versions are listed in apps/web/src/content/versions/index.ts
   (the registry: the worked trips plus the single-document versions). This
   script loads it, so it copies exactly the editions the site links to, no
   more:
     - a worked trip's PDFs go to public/trips/<slug>/letter|a4/ (gitignored);
     - a single-document version's PDFs go to public/docs/<file>.pdf.
   Each version records where its PDFs are built (pdfSource.letterDir / a4Dir,
   relative to the V3 root, with an optional per-document `source` override
   naming the builder's output file). The rebuild repo sits beside V3, so its
   builders (the Harborview field-trip pack, the Wexcombe guide's web copies)
   are reached as ../00 - eti360-rebuild/…. A version with no pdfSource is
   skipped: the Travel Program Review sample reaches public/docs only through
   the rebuild repo's publish_baseline_report.py (one canonical PDF, never
   hand-copied).

   Before anything is copied or linked, every source PDF goes through
   scripts/check-pdf-wording.py (V3 ADR-025: no document says ETI360
   designated a hospital); one hit stops the sync.

   V3 root: $ETI360_V3_ROOT, default /Users/danskimin/00 - ETI360 - V3.
   Editions whose URL is absolute (object storage) are skipped. */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
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
const LINK = args.has("--link");
const LIST = args.has("--list");
const S3_CHECK = args.has("--s3-check");
const SKIP_WORDING = args.has("--skip-wording-check");
const DEFAULT_BUCKET_URL = "https://eti360-site-documents.s3.us-east-1.amazonaws.com";

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

/* Every edition the site links, with where it is built (null: no pdfSource). */
function editionsOf() {
  const out = [];
  for (const version of versions) {
    for (const doc of version.documents) {
      for (const size of ["letter", "a4"]) {
        const url = doc.editions[size];
        if (!url || /^https?:\/\//.test(url)) continue;
        const rel = version.pdfSource
          ? doc.source?.[size] ??
            path.join(size === "letter" ? version.pdfSource.letterDir : version.pdfSource.a4Dir, path.basename(url))
          : null;
        out.push({ version: version.slug, product: version.product, doc: doc.slug, size, url, source: rel ? path.join(V3, rel) : null, rel });
      }
    }
  }
  return out;
}

if (LIST) {
  console.log(JSON.stringify(editionsOf(), null, 2));
  process.exit(0);
}

if (S3_CHECK) {
  const base = (process.env.DOCS_BASE_URL || DEFAULT_BUCKET_URL).replace(/\/?$/, "/");
  const bad = [];
  const all = editionsOf();
  for (const e of all) {
    const target = new URL(e.url.replace(/^\//, ""), base).toString();
    let status = 0;
    try {
      status = (await fetch(target, { method: "HEAD" })).status;
    } catch (err) {
      status = String(err.cause?.code || err.message || err);
    }
    if (status !== 200) bad.push(`${status}  ${target}`);
  }
  console.log(`${all.length - bad.length} of ${all.length} linked editions answer 200 at ${base}`);
  if (bad.length) {
    console.error("Not readable in the bucket (upload with scripts/upload-docs-s3.py --execute):");
    for (const b of bad) console.error(`  ${b}`);
    process.exit(1);
  }
  process.exit(0);
}

if (!fs.existsSync(V3)) {
  console.error(`V3 repo not found at ${V3}. Set ETI360_V3_ROOT.`);
  process.exit(1);
}

let copied = 0;
let current = 0;
const synced = new Set();
const skipped = new Set();
const missing = [];
const todo = [];

for (const e of editionsOf()) {
  if (!e.source) {
    skipped.add(e.version);
    continue;
  }
  synced.add(e.version);
  if (!fs.existsSync(e.source)) {
    missing.push(`${e.version}/${e.doc} (${e.size}): ${e.rel}`);
    continue;
  }
  todo.push(e);
}

// The hospital-wording gate (ADR-025), on every source, before anything moves.
if (!SKIP_WORDING && todo.length) {
  const sources = [...new Set(todo.map((e) => e.source))];
  const r = spawnSync("python3", [path.join(REPO, "scripts", "check-pdf-wording.py"), ...sources], {
    encoding: "utf8",
  });
  if (r.error || r.status !== 0) {
    process.stdout.write(r.stdout || "");
    process.stderr.write(r.stderr || "");
    if (r.error) console.error(`Could not run the wording check: ${r.error.message}`);
    console.error("Wording check failed: nothing was copied. (--skip-wording-check bypasses it; never before a publish.)");
    process.exit(1);
  }
  console.log(`Wording check: ${sources.length} source PDFs clean.`);
}

for (const e of todo) {
  const dest = path.join(PUBLIC, e.url);
  const s = fs.statSync(e.source);
  const l = fs.lstatSync(dest, { throwIfNoEntry: false });
  let same = false;
  if (l?.isSymbolicLink()) {
    same = LINK && fs.readlinkSync(dest) === e.source;
  } else if (l) {
    same = !LINK && l.size === s.size && Math.abs(l.mtimeMs - s.mtimeMs) < 1000;
  }
  if (same && !FORCE) {
    current += 1;
    continue;
  }
  if (CHECK) {
    console.log(`would ${LINK ? "link" : "copy"} ${e.rel} -> public${e.url}`);
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (l) fs.rmSync(dest);
    if (LINK) {
      fs.symlinkSync(e.source, dest);
    } else {
      fs.copyFileSync(e.source, dest);
      fs.utimesSync(dest, s.atime, s.mtime);
    }
    console.log(`${LINK ? "linked" : "copied"} ${e.rel} -> public${e.url}`);
  }
  copied += 1;
}

const verb = LINK ? "linked" : "copied";
console.log(
  `${synced.size} versions synced: ${copied} ${CHECK ? `to be ${verb}` : verb}, ${current} already current, ${missing.length} missing at source.`,
);
if (skipped.size) console.log(`No pdfSource, not synced: ${[...skipped].join(", ")}.`);
if (missing.length) {
  console.error("Missing at source (the site links these; build or re-point them):");
  for (const m of missing) console.error(`  ${m}`);
  process.exit(1);
}
