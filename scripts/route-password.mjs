#!/usr/bin/env node
/* Make the password hash for a private route page:
   npm run route-password            (asks for the password, input hidden)
   printf '%s' "$PW" | npm run route-password --silent

   Prints the "gate" block for the route's route-page.json in V3
   (customers/<school>/trips/<set>/site/route-page.json). The plaintext is
   never written anywhere; give it to the school with the link, separately.
   scrypt N 2^15, r 8, p 1, 32 bytes, 16-byte random salt: the settings
   apps/web/src/lib/routes/access.ts checks against. */

import crypto from "node:crypto";
import readline from "node:readline";

const PARAMS = { N: 32768, r: 8, p: 1, keylen: 32 };

function readHidden(prompt) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr, terminal: true });
    process.stderr.write(prompt);
    rl._writeToOutput = () => {};
    rl.question("", (answer) => {
      rl.close();
      process.stderr.write("\n");
      resolve(answer);
    });
  });
}

async function readPiped() {
  let text = "";
  for await (const chunk of process.stdin) text += chunk;
  return text.replace(/\r?\n$/, "");
}

const password = process.stdin.isTTY ? await readHidden("Password: ") : await readPiped();
if (password.length < 10) {
  console.error("Use at least 10 characters.");
  process.exit(1);
}
const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(password.normalize("NFC"), salt, PARAMS.keylen, {
  N: PARAMS.N,
  r: PARAMS.r,
  p: PARAMS.p,
  maxmem: 256 * PARAMS.N * PARAMS.r,
});
console.log(
  JSON.stringify(
    { gate: { kdf: "scrypt", ...PARAMS, salt: salt.toString("hex"), hash: hash.toString("hex") } },
    null,
    2,
  ),
);
