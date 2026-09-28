#!/usr/bin/env node
/* Write the private route pages' folders from the V3 repo:
   npm run sync:route-private             (every route page V3 defines)
   npm run sync:route-private -- --check  (report only; exit 1 if anything is stale)
   npm run sync:route-private -- --config <path/to/route-page.json>

   A private route page (/routes/<token>, apps/web/src/app/routes/[token]/)
   reads everything from its folder in the private store, never from this
   repository, which is public. Locally that folder is
   apps/web/private/routes/<token>/ (gitignored); the deployed site reads the
   same files from the private bucket (scripts/upload-route-private-s3.py).

   Each route page is defined in V3 by a route-page.json, found at
   customers/<school>/trips/<set>/site/route-page.json. It holds the token,
   the page's words and brand, where its web bundle, logo and card PDFs are
   (paths relative to the file) and the scrypt hash of its password
   (`npm run route-password`). This script checks the bundle against its
   register, then writes:

     route.json   the page's words, brand, file list and gate hash
     *.json       the web bundle
     the logo     a web-sized copy kept beside route-page.json
     cards/*.pdf  the pocket route cards, when V3 has built them

   V3 root: $ETI360_V3_ROOT, default /Users/danskimin/00 - ETI360 - V3. */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRIVATE = path.join(REPO, "apps", "web", "private", "routes");
const V3 = process.env.ETI360_V3_ROOT || "/Users/danskimin/00 - ETI360 - V3";
const CHECK = process.argv.includes("--check");
const configArg = process.argv.indexOf("--config");
const TOKEN = /^[a-z0-9](?:[a-z0-9-]{6,62})[a-z0-9]$/;

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

function findConfigs() {
  if (configArg !== -1) return [path.resolve(process.argv[configArg + 1])];
  const found = [];
  const customers = path.join(V3, "customers");
  for (const school of fs.readdirSync(customers, { withFileTypes: true })) {
    if (!school.isDirectory()) continue;
    const trips = path.join(customers, school.name, "trips");
    if (!fs.existsSync(trips)) continue;
    for (const set of fs.readdirSync(trips, { withFileTypes: true })) {
      const file = path.join(trips, set.name, "site", "route-page.json");
      if (set.isDirectory() && fs.existsSync(file)) found.push(file);
    }
  }
  return found;
}

let stale = 0;
let problems = 0;

function place(dest, name, buffer) {
  const to = path.join(dest, name);
  const same = fs.existsSync(to) && sha256(fs.readFileSync(to)) === sha256(buffer);
  if (!same) stale += 1;
  console.log(`${same ? "current " : CHECK ? "stale   " : "written "} ${path.basename(dest)}/${name}`);
  if (!same && !CHECK) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.writeFileSync(to, buffer);
  }
}

if (!fs.existsSync(V3)) {
  console.error(`V3 repo not found at ${V3}. Set ETI360_V3_ROOT.`);
  process.exit(1);
}

const configs = findConfigs();
if (!configs.length) {
  console.error("No route-page.json found in V3 (customers/*/trips/*/site/route-page.json).");
  process.exit(1);
}

for (const file of configs) {
  const here = path.dirname(file);
  const config = JSON.parse(fs.readFileSync(file, "utf8"));
  const { token, bundle, mark, cards, page, gate } = config;
  if (!TOKEN.test(token ?? "")) {
    console.error(`${file}: the token must be 8 to 64 lowercase letters, digits and hyphens`);
    problems += 1;
    continue;
  }
  if (gate?.kdf !== "scrypt" || !gate.hash || !gate.salt) {
    console.error(`${file}: no scrypt gate hash (npm run route-password)`);
    problems += 1;
    continue;
  }

  // The bundle: every geometry file must name this register.
  const src = path.resolve(here, bundle.dir);
  const registerBuffer = fs.readFileSync(path.join(src, bundle.register));
  const registerSha = sha256(registerBuffer);
  const others = [...bundle.trips, bundle.reference];
  const mismatched = others.filter(
    (name) => JSON.parse(fs.readFileSync(path.join(src, name), "utf8")).register_sha256 !== registerSha,
  );
  if (mismatched.length) {
    console.error(`${file}: ${mismatched.join(", ")} built from another register (rerun build_register.py in V3)`);
    problems += 1;
    continue;
  }

  const dest = path.join(PRIVATE, token);
  const route = {
    token,
    ...page,
    brand: { ...page.brand, mark: { file: mark.file, width: mark.width, height: mark.height, alt: mark.alt } },
    files: { register: bundle.register, trips: bundle.trips, reference: bundle.reference },
    cards: cards.map(({ slug, label, size, file: cardFile, downloadName }) => ({
      slug,
      label,
      size,
      file: cardFile,
      downloadName,
    })),
    gate,
  };
  place(dest, "route.json", Buffer.from(`${JSON.stringify(route, null, 2)}\n`));
  place(dest, bundle.register, registerBuffer);
  for (const name of others) place(dest, name, fs.readFileSync(path.join(src, name)));
  place(dest, mark.file, fs.readFileSync(path.resolve(here, mark.from)));
  for (const card of cards) {
    const from = path.resolve(here, card.from);
    if (!fs.existsSync(from)) {
      console.log(`missing  ${token}/${card.file} (not yet built in V3: ${path.relative(V3, from)})`);
      continue;
    }
    place(dest, card.file, fs.readFileSync(from));
  }
}

if (problems) process.exit(1);
process.exit(CHECK && stale ? 1 : 0);
