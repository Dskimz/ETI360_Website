import type { ProductSlug, Version, VersionDocument } from "@/content/trips/types";
import { getVersion } from "@/content/versions";
import { WHO_DECIDES, WHO_PREPARES } from "@/content/voice";

export { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/lib/case-study-hold";

/* The Case Study (/case-study; Dan, 2026-09-28: "How we work I do not like.
   I prefer Case Study."): one illustrative school year with Harborview
   International School across the four products, told as a step-by-step
   guide with the left step list and the pinned previous and next bar Dan
   asked for.

   FIVE PAGES, in this order (Dan, 2026-09-29: "Trip Package should be number
   2"): the overview, then Travel Program Review, Trip Package, Field Trip
   Package, Conference Travel Package. The addresses of the two old steps
   folded in on 2026-09-28 redirect (src/lib/redirects.ts); the old hash
   anchors land through _parts/HashRedirect.tsx.

   DOCUMENTS FIRST, AS IMAGES (Dan, 2026-09-29: "This is a wall of text ... I
   think the images of the documents is best. Kind of like what we did for
   the Washington DC trip page ... I want people to see the solution. Less
   words and more about the solution."), one sequence on every step:
     the hero bar   (Dan: "a small hero bar on each of the pages. Give the key
                    information"): the product, its tiers, three or four key
                    facts, and the illustrative line;
     the need       one sentence;
     the documents  the trip page's document card (src/components/
                    TripDocCard.tsx): cover, who uses it, the name, what it
                    is for (the document's own decision label), A4 and US
                    Letter through the logged /open route, and Look inside
                    with its three pages (open on a step with one document);
     how it works   one compact row: what Harborview sends, what ETI360 does
                    (navy, the strongest cell), what Harborview decides;
     who decides    the one decision-ownership line;
     the foot       the pages on this site, then the notices.
   The output tables and the text excerpts of 2026-09-28 are gone: the
   thumbnails carry that job. Provider evaluations are not shown as images
   for now (the Line & Landmark sample is re-issued under its new name when
   Dan's logo arrives; the orienteering provider awaits its rename): one line
   under the Travel Program Review says the review evaluates them.

   Copy: the words are those of the reviewed web copy (the rebuild repo's
   content/vault/Marketing/ETI360-Case-Study-Web-Copy-2026-09.md) with the
   reviewer's accepted changes, cut down; lines marked [draft] are new or
   shortened (tone-reviewed 2026-09-29 with this revision, the whole text
   of the five pages in context; its two corrections are applied here). No prices, no
   Duty Manager Dashboard or Simulation, no invented quotes, outcomes or
   metrics. "does not certify, approve, rank or recommend" appears once, in
   the Travel Program Review's provider line; a build check holds it there.

   ON HOLD FOR PUBLISHING until the second fictional provider is renamed:
   see src/lib/case-study-hold.ts. The cycling provider was renamed Line &
   Landmark Cycle Travel on 2026-09-29 (Dan's brand brief); the orienteering
   provider still carries a founder's name. Each provider name lives once,
   in the constants below. */

/** The fictional cycling-tour provider (Dan, 2026-09-29: renamed from Dan
    Skimin Cycling Tours by his branding brief; internal code LNL, never
    "L&L" in copy). */
export const CYCLING_PROVIDER = "Line & Landmark Cycle Travel";
/** Its display name, where a short form reads better. */
export const CYCLING_PROVIDER_SHORT = "Line & Landmark";
/** The fictional orienteering provider (renamed before publishing). */
export const ORIENTEERING_PROVIDER = "Seb Wong Orienteering Tours";

function providerNotice(name: string): string {
  return `${name} is a fictional trip provider; its documents were written for this example.`;
}

function requireVersion(slug: string): Version {
  const v = getVersion(slug);
  if (!v) throw new Error(`Case Study: version "${slug}" is not on the site`);
  return v;
}

/* The fictional names' notices, verbatim: the schools' from the versions
   they belong to, so the case study and the product pages carry one
   wording; Line & Landmark's from the brand brief (2026-09-29), exactly. */
export const NOTICES = {
  harborview: requireVersion("harborview-review").disclosure,
  cycling: "Line & Landmark is a fictional trip provider created by ETI360 for demonstration purposes.",
  orienteering: providerNotice(ORIENTEERING_PROVIDER),
  wexcombe: requireVersion("wexcombe-meridian").disclosure,
  horizonRidge: requireVersion("italy").disclosure,
  firholm: requireVersion("firholm-elementary").disclosure,
};

/* The other fictional schools whose samples a step shows. Each note is said
   once, beside that school's documents, followed by its verbatim notice. */
type OtherSchool = "wexcombe" | "horizonRidge" | "firholm";

const OTHER_SCHOOLS: Record<OtherSchool, { text: string; notice: string }> = {
  wexcombe: {
    // [draft] 2026-09-28, unchanged.
    text: "These pages come from samples prepared for another fictional school, Wexcombe International School; Harborview’s edition would take the same form.",
    notice: NOTICES.wexcombe,
  },
  horizonRidge: {
    // [draft] 2026-09-28, unchanged.
    text: "These pages come from samples prepared for another fictional school, Horizon Ridge School of Cleveland, for its Italy trip; Harborview’s edition would take the same form.",
    notice: NOTICES.horizonRidge,
  },
  firholm: {
    // [draft] 2026-09-29
    text: "The same product for another fictional school, Firholm School in Seattle, in US Letter.",
    notice: NOTICES.firholm,
  },
};

export function otherSchoolNote(key: OtherSchool): { text: string; notice: string } {
  return OTHER_SCHOOLS[key];
}

/* ── The overview ── */

export const INTRO = {
  // [draft] The overview's h1 (the reviewer's suggestion, adapted).
  heading: "How ETI360 supports one school across a year of travel",
  // The reviewer's wording for the old "real samples ETI360 built" line.
  samples:
    "The documents are fully developed samples created by ETI360. The school, providers and decisions in this example are fictional.",
  dates:
    "Each sample was produced on its own date, so the dates printed on the samples do not set the order of this story.",
};

/** A key fact in a hero bar: a short label and its value. */
export type Fact = { label: string; value: string };

/** The overview's hero bar: the school, the four products, who decides,
    the paper. [draft] labels; the values from the reviewed copy. */
export const OVERVIEW_FACTS: Fact[] = [
  { label: "School", value: "Harborview International School, Singapore" },
  {
    label: "Four products",
    value: "Travel Program Review, Trip Package, Field Trip Package, Conference Travel Package",
  },
  // INTRO.work's last sentence (reviewed), verbatim.
  { label: "Who decides", value: "The school reviews the outputs and makes every decision." },
  { label: "Paper", value: "A4, the school’s own paper, and US Letter" },
];

/** How the work divides (source page 2), the absolutes bounded. */
export const WORK = {
  sends:
    "What it already has, by email: policies, calendars, venue lists, provider documents and booking confirmations. It fills in no forms and uploads nothing to a system.",
  does: "Reads each document supplied in full and enters each trip, stop and statement it contains. Researches and measures, within the agreed scope, what the documents leave out, such as emergency departments, drive times, entry rules and climate, from cited public sources. Writes each document, in A4 and US Letter.",
  receives:
    "Prepared documents, in its own paper size. The school reviews them; for trip risk documents, it completes, amends and approves them.",
};

/** The rest of the year, in one line on the overview (the Trip Package's
    "rest of the year" block folded in here, 2026-09-29, now that the Trip
    Package is step 2, not the last). [draft] 2026-09-28. */
export const LIFECYCLE =
  "Through the rest of the year: a Post-Trip Feedback Report after each trip, next year’s field-trip pages each August, and, every four years, the next Travel Program Review, opened with a scoping conversation.";

/** The one decision-ownership line on every page: ETI360's positive role
    first, then the site's canonical Who decides line (voice.ts). */
export const WHO_DECIDES_BOX = `${WHO_PREPARES} ${WHO_DECIDES}`;

/** Tier 1 to 3 in one line each (Dan, 2026-09-28: "we don't explain T1-T3.
    I think a small explanation on the nav bar will help"), from his
    approved tier bullets (rebuild repo dev/schools-email/
    template-v42-docs.html). [draft], tone-reviewed 2026-09-28. Shown under
    the heading "ETI360’s 3-Tier Risk Framework" (Dan, 2026-09-29). */
export const TIER_LINES: Record<1 | 2 | 3, string> = {
  1: "The school-wide review of travel policies and procedures, prepared for leadership review.",
  2: "Each trip’s documents, prepared for review before departure.",
  3: "Field and emergency information for trip leaders while the group is away, and the report after the trip.",
};

/* ── The steps ── */

/** One school's documents on a step: a version on the site and the
    documents shown from it, in order. */
export type DocGroup = {
  version: string;
  docs: string[];
  /** Another fictional school's samples: its note and notice, once. */
  otherSchool?: OtherSchool;
  /** A line under the group's documents. */
  note?: { lead: string; text: string };
};

export type Step = {
  /** The step's page, /case-study/{id}: its product's slug. */
  id: ProductSlug;
  number: number;
  /** The product's name: the hero bar's h1. */
  name: string;
  /** The step's line under the name. */
  title: string;
  /** One sentence. */
  need: string;
  /** The hero bar's key facts: three or four. */
  facts: Fact[];
  /** The documents, the center of the step. */
  groups: DocGroup[];
  sends: string[];
  does: string[];
  decides: string[];
  links: { href: string; label: string }[];
  /** 150 to 160 characters, plain, no notices (the notices stay on the
      page). [draft] */
  description: string;
};

/* The hero bar's labels, the same on every step. [draft] */
const USED_BY = "Used by";
const WHEN = "When";
const RECEIVES = "Harborview receives";
const PAPER = "Paper";

export const STEPS: Step[] = [
  {
    id: "travel-program-review",
    number: 1,
    name: "Travel Program Review",
    title: "The whole program, read path by path",
    // The reviewed need's second sentence, verbatim.
    need: "Before planning the year, the leadership team wants one view of the whole program, read the same way path by path, including what its two providers’ own documents cover.",
    facts: [
      { label: USED_BY, value: "The leadership team" },
      // From the reviewed rest of the year ("Every four years … opens the
      // next Travel Program Review with a scoping conversation").
      { label: WHEN, value: "Every four years, opened with a scoping conversation" },
      { label: RECEIVES, value: "The review of its whole program, with an evaluation of each provider’s documents" },
      { label: PAPER, value: "A4, its own paper, and US Letter" },
    ],
    groups: [
      {
        version: "harborview-review",
        docs: ["travel-program-review"],
        // [draft] The one provider line (no provider-evaluation images for
        // now); its last two sentences are the reviewed provider row's.
        note: {
          lead: "Providers.",
          text: `The review also evaluates the documents of Harborview’s two providers, ${CYCLING_PROVIDER} and ${ORIENTEERING_PROVIDER}. ETI360 shows what each provider’s documents cover. It does not certify, approve, rank or recommend providers.`,
        },
      },
    ],
    // [draft] shortened from the reviewed lines.
    sends: [
      "Its nine travel documents, from the trips policy to the service learning and CAS guidelines.",
      "Each provider’s documents, such as an operating manual and a tour catalog.",
    ],
    does: [
      // [draft] shortened; the first line keeps the first conversation.
      "Holds a scoping conversation with the leadership team, then sends one email listing the documents needed.",
      "Reads each document in full and enters each statement as an evidence line with its document, section and page.",
      "Reads each program path, and each provider’s documents, against the ten areas of the ETI360 Operational Capability Framework.",
    ],
    decides: [
      "Which program paths are in scope and which providers to include.",
      // [draft] shortened.
      "How to weigh and sequence the open items.",
    ],
    links: [{ href: "/travel-program-review", label: "The Travel Program Review" }],
    description:
      "Illustrative case study with a fictional school, step 1 of 4: the Travel Program Review reads the school’s travel documents path by path, providers included.",
  },

  {
    id: "trip-package",
    number: 2,
    name: "Trip Package",
    title: "One trip, from approval to feedback",
    // [draft] the reviewed two sentences in one; the trip's provider by its
    // display name.
    need: `For a cycling trip in Taiwan from the ${CYCLING_PROVIDER_SHORT} catalog, the Head of School needs the trip’s documents before approving it; the trip leader, chaperones, families and students each need theirs before the group leaves.`,
    facts: [
      { label: USED_BY, value: "The Head of School, the trip leader, chaperones, families and students" },
      { label: WHEN, value: "Before, during and after the trip" },
      // [draft] from the reviewed "The Trip Package, decision by decision".
      { label: RECEIVES, value: "The documents for one trip, decision by decision" },
      { label: PAPER, value: "A4, Harborview’s paper, and US Letter" },
    ],
    groups: [
      {
        version: "italy",
        // The documents of the reviewed decision table, one per decision
        // where it named two (Dan's brief, 2026-09-29): the record, the
        // working file, the family brief, the leader card, the student
        // guide, the feedback report. Each card's line is its decision.
        docs: [
          "school-trip-record",
          "trip-risk-working-file",
          "family-trip-brief",
          "trip-leader-card",
          "student-journey-guide",
          "post-trip-feedback-report",
        ],
        otherSchool: "horizonRidge",
      },
    ],
    sends: [
      "The provider’s proposal and day-by-day itinerary.",
      "Booking confirmations for flights and places to stay.",
      "The group: numbers, grades and staff.",
    ],
    does: [
      "Turns the itinerary supplied into a day-by-day record and places each location it names on the map.",
      // [draft] shortened.
      "Lists the emergency departments by drive time from each place the group stays or rides.",
      // [draft] two reviewed lines in one.
      "Prepares the Trip Risk Working File, one section for each activity group, and writes each document for the person who uses it.",
    ],
    decides: [
      // [draft] shortened.
      "The Head of School approves the trip under the school’s trips policy.",
      "The school reviews, completes, amends and approves its risk documentation; the trip leader makes the live assessment during the trip.",
      "The school or the provider designates which emergency department the group uses.",
    ],
    links: [
      { href: "/trip-package", label: "The Trip Package" },
      { href: "/trips/italy", label: "The Italy trip, every document in US Letter and A4" },
    ],
    description:
      "Illustrative case study with a fictional school, step 2 of 4: the Trip Package prepares one trip’s documents, from approval to the post-trip feedback.",
  },

  {
    id: "field-trip-package",
    number: 3,
    name: "Field Trip Package",
    title: "A year of day trips, prepared at once",
    // [draft] the reviewed two sentences in one.
    need: "Harborview’s elementary division wants its year of one-day trips prepared at once, with one page per trip, so that every trip reads the same way.",
    facts: [
      // [draft] from the pack's summary.
      { label: USED_BY, value: "Elementary leaders, teachers and families" },
      // [draft] from the reviewed rest of the year ("Each August") and the
      // product's door ("Before the school year begins").
      { label: WHEN, value: "Each August, before the school year begins" },
      { label: RECEIVES, value: "The year’s day trips: one page per trip and a calendar for each month" },
      { label: PAPER, value: "A4 and US Letter" },
    ],
    groups: [
      {
        version: "harborview-elementary",
        docs: ["field-trip-risk-assessment-pack"],
        // The reviewed page-2 caption's second half; the lead is [draft].
        note: {
          lead: "What in the example is real.",
          text: "The venues, addresses and emergency departments are real, and each drive is measured on real roads; the dates, class sizes and staff are illustrative.",
        },
      },
      { version: "firholm-elementary", docs: ["field-trip-risk-assessment-pack"], otherSchool: "firholm" },
    ],
    sends: [
      "Each grade team’s venues for its units of inquiry.",
      "Class sizes and the adults going on each trip.",
      "The school calendar, with its term dates and holidays.",
    ],
    does: [
      // [draft] shortened.
      "Enters each trip: grade, unit of inquiry, date, schedule and each stop.",
      "Measures the drive by road from each stop to Singapore’s public emergency departments.",
      "Writes each trip page, a calendar for each month and the year at a glance.",
    ],
    decides: [
      "Each trip and its risk assessment: the school reviews, completes, amends as necessary, and approves them.",
      "Which emergency department each group uses.",
    ],
    links: [{ href: "/field-trip-package", label: "The Field Trip Package" }],
    description:
      "Illustrative case study with a fictional school, step 3 of 4: the Field Trip Package documents a year of elementary day trips at once, one page for each trip.",
  },

  {
    id: "conference-travel-package",
    number: 4,
    name: "Conference Travel Package",
    title: "One guide for the conference year",
    // [draft] the reviewed two sentences in one.
    need: "The Director of Athletics & Activities wants the coaches and advisors who travel with Harborview’s teams and activity groups to carry the same information for every host city.",
    facts: [
      { label: USED_BY, value: "Coaches and advisors who travel with teams and activity groups" },
      // From the product's door.
      { label: WHEN, value: "Before the season starts" },
      { label: RECEIVES, value: "One guide for the conference year, with a chapter for every host city" },
      { label: PAPER, value: "A4 and US Letter" },
    ],
    groups: [
      { version: "wexcombe-meridian", docs: ["athletics-activities-trips-guide"], otherSchool: "wexcombe" },
    ],
    sends: [
      "The travel calendar the Director of Athletics & Activities publishes each August.",
      "For each trip: the dates, the teams and staff traveling, and the host school’s schedule.",
    ],
    does: [
      // [draft] shortened.
      "Reads the athletics and activities travel policy first, so the guide follows it.",
      // [draft] two reviewed lines in one.
      "Researches each host city once, from cited public sources, and lists the emergency departments by drive time, shortest first.",
      "Writes a chapter for each host city in the same order, and a page of items to confirm before travel.",
    ],
    decides: [
      "The Director of Athletics & Activities approves all team and activity travel under the school’s policy.",
      "The school completes the fields marked for confirmation and confirms which emergency department each group uses.",
    ],
    links: [{ href: "/conference-travel-package", label: "The Conference Travel Package" }],
    description:
      "Illustrative case study with a fictional school, step 4 of 4: the Conference Travel Package gives coaches one guide, with a chapter for every host city.",
  },
];

/** The overview's description (150 to 160 characters, no notices), in the
    steps' order. [draft] */
export const OVERVIEW_DESCRIPTION =
  "An illustrative case study with a fictional school: how ETI360 prepares a travel program review, one trip’s documents, a field-trip pack and a conference guide.";

/** One line per step on the overview: what Harborview receives. [draft],
    from the reviewed year at a glance. */
export const STEP_RECEIVES: Record<ProductSlug, string> = {
  "travel-program-review": "The review of its whole program, with an evaluation of each provider’s documents",
  "trip-package": "The documents for one trip, before, during and after it",
  "field-trip-package": "The year’s day trips: one page per trip and a calendar for each month",
  "conference-travel-package": "One guide for the conference year, with a chapter for every host city",
};

/** The document each step's card on the overview shows. */
export const STEP_COVER: Record<ProductSlug, { version: string; doc: string }> = {
  "travel-program-review": { version: "harborview-review", doc: "travel-program-review" },
  "trip-package": { version: "italy", doc: "trip-leader-card" },
  "field-trip-package": { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack" },
  "conference-travel-package": { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide" },
};

/** Interface words for the guide. [draft] */
export const STEP_UI = {
  label: "Case Study",
  overview: "Overview",
  steps: "Case Study steps",
  bar: "Previous and next step",
  previous: "Previous",
  next: "Next",
  contact: "Contact",
  start: "Start at step 1",
  skip: "Skip to the step",
  // Dan, 2026-09-29: "What the tiers mean should be ETI360's 3-Tier Risk
  // Framework".
  tiers: "ETI360’s 3-Tier Risk Framework",
  illustrative: "Illustrative case study",
  facts: "Key facts",
  need: "What Harborview needs",
  receives: "What Harborview receives",
  how: "How it works",
  moves: {
    sends: "What Harborview sends, by email",
    does: "What ETI360 does",
    decides: "What Harborview decides",
  },
  whoDecides: "Who decides",
  onSite: "On this site",
  /** The overview's cards: "Sample from …" under a cover that another
      fictional school's documents supply. */
  sampleFrom: "Sample from",
};

/* ── Lookups and build-time checks ── */

export const CASE_STUDY_HREF = "/case-study";

export function stepHref(s: Pick<Step, "id">): string {
  return `${CASE_STUDY_HREF}/${s.id}`;
}

export function getStep(id: string): Step | undefined {
  return STEPS.find((s) => s.id === id);
}

/** The step a product's page links to. */
export function stepForProduct(product: ProductSlug): Step | undefined {
  return STEPS.find((s) => s.id === product);
}

/** "Step 2 of 4". */
export function stepOfTotal(s: Step): string {
  return `Step ${s.number} of ${STEPS.length}`;
}

/** A version and document on the site; throws (failing the build) if
    either is no longer there. */
export function siteDocument(ref: { version: string; doc: string }): { version: Version; doc: VersionDocument } {
  const version = requireVersion(ref.version);
  const doc = version.documents.find((d) => d.slug === ref.doc);
  if (!doc) throw new Error(`Case Study: ${ref.version} has no document "${ref.doc}"`);
  return { version, doc };
}

/** Every document a step shows. */
export function stepDocuments(s: Step): { version: Version; doc: VersionDocument }[] {
  return s.groups.flatMap((g) => g.docs.map((doc) => siteDocument({ version: g.version, doc })));
}

/* Which fictional names a notice covers: a step carries the notice of every
   fictional provider it names, so a page reached on its own is as plain
   about what is invented as the overview. The cycling provider is matched
   by its display name, which its full name contains. */
const NOTICE_NAMES: [string, string][] = [
  [NOTICES.cycling, CYCLING_PROVIDER_SHORT],
  [NOTICES.orienteering, ORIENTEERING_PROVIDER],
];

/** The notices at the foot of a step: Harborview's always, then those of
    the providers the step names. Another school's notice is said once,
    beside its documents. */
export function stepNotices(s: Step): string[] {
  const text = JSON.stringify(s);
  return [NOTICES.harborview, ...NOTICE_NAMES.filter(([, name]) => text.includes(name)).map(([n]) => n)];
}

// Fails the build if a description leaves its range, a step is out of
// order, a step's documents are missing from the site, a hero bar has other
// than three or four facts, or "does not certify, approve, rank or
// recommend" is said anywhere but once, in the Travel Program Review's
// provider line.
for (const d of [OVERVIEW_DESCRIPTION, ...STEPS.map((s) => s.description)]) {
  if (d.length < 150 || d.length > 160) {
    throw new Error(`Case Study: description is ${d.length} characters (150 to 160): ${d}`);
  }
}
STEPS.forEach((s, i) => {
  if (s.number !== i + 1) throw new Error(`Case Study: ${s.id} is numbered ${s.number} at position ${i + 1}`);
  if (s.facts.length < 3 || s.facts.length > 4) throw new Error(`Case Study: ${s.id} has ${s.facts.length} key facts`);
  stepDocuments(s);
});
for (const ref of Object.values(STEP_COVER)) siteDocument(ref);
{
  const BOUNDARY = /does not certify, approve, rank or recommend/gi;
  const all = JSON.stringify([INTRO, OVERVIEW_FACTS, WORK, LIFECYCLE, WHO_DECIDES_BOX, TIER_LINES, STEP_RECEIVES, STEPS]);
  const line = STEPS.find((s) => s.id === "travel-program-review")?.groups[0]?.note?.text ?? "";
  if ((all.match(BOUNDARY) ?? []).length !== 1 || !BOUNDARY.test(line)) {
    throw new Error("Case Study: the provider boundary must appear once, in the Travel Program Review's provider line");
  }
}
