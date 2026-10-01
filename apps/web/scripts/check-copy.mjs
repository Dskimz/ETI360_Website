#!/usr/bin/env node
/* Copy check: no verbless sentences (Dan, 2026-09-30: "This sentence makes no
   sense ... AI creates a lot of them ... it drives me mad").

   Runs after `next build` (the postbuild script, so Vercel's build fails the
   same way) and reads the text of every prerendered page in
   .next/server/app/**\/*.html. A sentence that ends in a period must have a
   subject and a verb. Banned shapes (AGENTS.md § Writing):
     - a list of noun phrases:  "The whole program, one trip, a year of day
       trips, or a conference year."
     - a scene clause, a colon, then a list: "Before the season starts: one
       guide for the coaches and staff…"
     - a fragment posing as a claim: "The school's own trip policy, forms and
       escalation path."
   Headings and labels carry no period, so they are not checked.

   The test is a heuristic, not a parser: a sentence passes when it holds an
   auxiliary or modal, an irregular past form, a regular past form not used as
   an adjective, or a present-tense verb in a verb position (an -s form not
   after a comma, "and", "or" or a determiner; a base form after a pronoun, a
   plural noun, "to" or a modal). Anything it gets wrong goes in
   scripts/check-copy-allow.txt, one exact sentence per line, with a reason
   on the line above starting with #.

   The V3 document builders run the same test in Python:
   customers/_shared/check_verbless.py (keep the two word lists in step).

     node scripts/check-copy.mjs            # after a build
     node scripts/check-copy.mjs --list     # print every sentence it reads
*/

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP = join(ROOT, ".next", "server", "app");
const ALLOW = join(ROOT, "scripts", "check-copy-allow.txt");

const AUX = new Set(
  `am is are was were be been being has have had having do does did can could will would shall should may might must
   isn't aren't wasn't weren't hasn't haven't hadn't doesn't don't didn't can't cannot couldn't won't wouldn't shouldn't
   it's that's there's here's what's who's we're they're you're i'm we've they've you've i've we'll they'll you'll i'll
   it'll let's`.split(/\s+/),
);

const IRREGULAR_PAST = new Set(
  `began brought built bought came chose did drew drove ate fell felt fought found flew forgot froze gave went grew hung
   heard hid held hurt kept knew laid led left lent lay lost made meant met paid put quit ran rode rang rose said saw
   sought sold sent set shook shot showed shown shut sang sank sat slept spoke spent stood stole stuck struck swam took
   taught tore told thought threw understood woke wore won wrote written done gone taken given seen known chosen driven
   ridden spoken broken`.split(/\s+/),
);

// Base forms of common verbs. The present -s form and the regular past are
// derived below; a word here counts only in a verb position.
const BASE = `accept add adapt affect agree allow answer apply approve arrange arrive ask assess assign attend avoid
  begin belong bring build buy call carry change check choose clarify close collect come compare complete confirm
  connect consider contain continue cost count cover create cross cut decide deliver depend describe design do drive
  email end ensure evaluate expect explain face fall fill find finish fit follow form get give go grow guide handle
  happen hear help hold include inform join keep know land last lead learn leave let list live look lose make manage
  map mark match mean meet move name need note offer open order organize own pack pass pay place plan point prepare
  present print protect provide put reach read receive record reduce remain replace report request require rest
  return review ride rise run save say see seem select send serve set share show sign sit sleep speak spend stand
  start stay stop suggest support take talk teach tell think touch track train travel trust turn understand update
  use visit wait walk want watch wear work write enter measure research repeat publish issue sit stay mean belong
  weigh sequence rate score rank test launch release ship upload download sort file book confirm route stop
  arrive depart board pick drop fly sail paddle cycle climb hike camp swim eat drink cook clean wash dry
  miss search lock unlock alert warn call text message phone reply respond act ask cause fail succeed
  improve strengthen close open post publish price quote charge invoice bill welcome thank invite
  gather coordinate`.split(/\s+/);

const DETERMINERS = new Set(
  `the a an its their our your his her my this that these those every each any some no one two three four five six
   seven eight nine ten own of for with in on at by from into about per`.split(/\s+/),
);
const PRONOUNS = new Set(`i we they you he she it who that which what everyone nobody everybody nothing`.split(/\s+/));
const TO_OR_MODAL = new Set(`to can could will would shall should may might must not don't doesn't didn't never also`.split(/\s+/));

function sForm(v) {
  if (/(s|sh|ch|x|z|o)$/.test(v)) return `${v}es`;
  if (/[^aeiou]y$/.test(v)) return `${v.slice(0, -1)}ies`;
  return `${v}s`;
}
function pastForm(v) {
  if (v.endsWith("e")) return `${v}d`;
  if (/[^aeiou]y$/.test(v)) return `${v.slice(0, -1)}ied`;
  if (/^(plan|stop|ship|map|drop|step)$/.test(v)) return `${v}${v.at(-1)}ed`;
  return `${v}ed`;
}
const BASE_SET = new Set(BASE);
const S_FORMS = new Map(BASE.map((v) => [sForm(v), v]));
const PAST = new Set(BASE.map(pastForm));

function words(sentence) {
  return (sentence.toLowerCase().replace(/[’‘]/g, "'").match(/[a-z0-9][a-z0-9'-]*|[,;:]/g) ?? []);
}

const RELATIVE = new Set(["who", "which", "that", "whose", "whom"]);
// "Before the season starts: one guide for…": the scene clause's verb does
// not count; the part after the colon must carry its own.
const SCENE_CLAUSE = /^(before|when|after|if|while|once|until|as soon as|whenever|wherever|where)\b[^:,]*:\s*/i;
const OPENERS = new Set([...DETERMINERS, ...PRONOUNS, "to", "and", "or", "not", "yes", "no"]);

/** Whether the sentence has a finite verb, by the heuristic above. A verb
    right after who/which/that belongs to a relative clause and does not
    count. */
export function hasVerb(sentence) {
  const w = words(sentence.replace(SCENE_CLAUSE, ""));
  for (let i = 0; i < w.length; i++) {
    const t = w[i];
    const prev = w[i - 1] ?? "";
    if (RELATIVE.has(prev) && prev !== "that") continue;
    if (prev === "that" && !AUX.has(t)) continue;
    if (AUX.has(t) || IRREGULAR_PAST.has(t)) return true;
    if (PAST.has(t) && !DETERMINERS.has(prev)) return true;
    const next = w[i + 1] ?? "";
    // A step or instruction opens with its verb: "Reads each document…",
    // "See our privacy notice."
    if (i === 0 && S_FORMS.has(t) && OPENERS.has(next)) return true;
    if (i === 0 && BASE_SET.has(t) && OPENERS.has(next)) return true;
    if (S_FORMS.has(t) && prev && ![",", ";", ":", "and", "or"].includes(prev) && !DETERMINERS.has(prev) && !prev.endsWith("'s"))
      return true;
    if (BASE_SET.has(t) && (PRONOUNS.has(prev) || TO_OR_MODAL.has(prev) || (/[a-z]s$/.test(prev) && !prev.endsWith("'s") && !DETERMINERS.has(prev))))
      return true;
    // A base form after a noun and before a preposition or determiner:
    // "the rooming list stay with the school".
    if (BASE_SET.has(t) && prev && ![",", ";", ":", "and", "or"].includes(prev) && !DETERMINERS.has(prev) && !prev.endsWith("'s") && DETERMINERS.has(next))
      return true;
  }
  return false;
}

function decode(s) {
  return s
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;|&#x27;|&#39;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&middot;/g, "·")
    .replace(/&times;/g, "×")
    .replace(/&rarr;/g, "→")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

/** The sentences a page shows: <main> only, one block element at a time. */
export function sentencesOf(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? "";
  const text = main
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, " ")
    // Key-value facts (<dt>/<dd>) are data, not sentences.
    .replace(/<(dt|dd)\b[\s\S]*?<\/\1>/gi, "\n")
    .replace(/<\/?(p|li|h[1-6]|dt|dd|td|th|figcaption|summary|div|section|article|header|footer|br|blockquote)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  const out = [];
  for (const block of decode(text).split("\n")) {
    const b = block.replace(/\s+/g, " ").trim();
    if (!b) continue;
    for (const s of b.split(/(?<=[.!?])\s+(?=[A-Z“"‘(])/)) out.push(s.trim());
  }
  return out;
}

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

function main() {
  if (!existsSync(APP)) {
    console.error("check-copy: no build output at .next/server/app; run `next build` first.");
    process.exit(2);
  }
  const allow = new Set(
    existsSync(ALLOW)
      ? readFileSync(ALLOW, "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
      : [],
  );
  const list = process.argv.includes("--list");
  const failures = new Map();
  let pages = 0;
  for (const file of htmlFiles(APP)) {
    if (/\/(_not-found|_global-error|review|routes|unsubscribe|_for-providers-parked)/.test(file)) continue;
    pages++;
    const page = `/${relative(APP, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "")}`;
    for (const s of sentencesOf(readFileSync(file, "utf8"))) {
      if (list) console.log(`${page}\t${s}`);
      if (!s.endsWith(".") || (s.match(/[a-z]+/gi) ?? []).length < 4) continue;
      if (allow.has(s) || hasVerb(s)) continue;
      if (!failures.has(s)) failures.set(s, new Set());
      failures.get(s).add(page);
    }
  }
  if (failures.size === 0) {
    console.log(`check-copy: ${pages} pages, no verbless sentences.`);
    return;
  }
  console.error(`check-copy: ${failures.size} verbless sentence(s) (AGENTS.md § Writing). Give each a verb, drop its period if it is a label, or add it to scripts/check-copy-allow.txt with a reason.\n`);
  for (const [s, where] of failures) console.error(`  ${s}\n      on ${[...where].sort().join(", ")}\n`);
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
