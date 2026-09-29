import type { ProductSlug, Version, VersionDocument } from "@/content/trips/types";
import { getVersion } from "@/content/versions";

/* The Case Study (/case-study; Dan, 2026-09-28: "How we work I do not like.
   I prefer Case Study."): one illustrative school year with Harborview
   International School across the four products, told as a step-by-step
   guide (Dan, 2026-09-28: "That is too much scroll … a step by step guide
   for each of the products"). /case-study is the overview; each chapter
   below is one step with its own page, /case-study/{id}. Each step carries
   the same four moves: what Harborview sends by email, what ETI360 does
   (the reading, the data entry, the research and the writing), what
   Harborview receives, and what Harborview decides. A step shows the two
   or three exhibits named in its `show` list, each run of them under its
   section's intro; the rest stay listed here
   with their source words, and every document a chapter's exhibits open
   stays linked from its step.

   Source: the rebuild repo's content/vault/Marketing/
   ETI360-Case-Study-Harborview-2026-09.html, pages 1 to 15, tone-reviewed
   in full on 2026-09-28. The words below are that document's, shortened for
   the web; lines marked [draft] are new. The whole page went through the
   tone review in context on 2026-09-28; its three corrections are applied:
   "this sample" became "this case study" (seven places, the web has no
   sample document around it), the chapter links name the paper sizes
   instead of "both papers", and the feedback report's Who decides line
   opens "The report" instead of "It". No prices, no Duty Manager Dashboard
   or Simulation, no document counts as a selling point.

   The case study's internal pages list what else stays open before any of
   this is public: the "register" section word shown inside the review and
   provider-evaluation exhibits (item 12), the Harborview conference and
   Taiwan trip sets that would replace the Wexcombe and Horizon Ridge pages
   (items 5 and 6), and Dan's preview (item 16).

   Exhibits: public/case-study/, web-sized from the document's exhibit cuts
   (rebuild repo content/vault/Marketing/case-study-harborview/, whose
   MANIFEST.json names each source page). An exhibit whose document is a
   version on this site opens that page through the logged /open route;
   no PDF is duplicated. The Wexcombe guide's year and confirmation pages
   (the document's Exhibits 4.3 and 4.4) are left off: they carry the
   edition's "Version 0.1 draft" running header, which the site keeps off
   (src/content/versions/wexcombe-meridian.ts).

   ON HOLD FOR PUBLISHING until both fictional providers are renamed (the
   case study's internal item 1): they carry the names of ETI360's two
   founders, and a school would read the chapters as ETI360 evaluating its
   founders' own companies. Each name lives once, in the two constants
   below, so the rename is one edit here; the two provider exhibits
   (dsct-p02-summary.jpg, swot-p01-cover.jpg) show the names too and must be
   re-cut from the rebuilt evaluations at the same time. */

/* The hold, enforced in code (not only this comment). While it is on, a
   production deploy (VERCEL_ENV "production") serves /case-study as a 404 and
   drops every link to it: the menu, the footer, the product pages' lines and
   the sitemap. Local builds and Vercel preview deployments still show the
   page so it can be reviewed. Set CASE_STUDY_ON_HOLD to false in the same
   edit as the provider rename.

   What the hold does not cover, stated plainly: the exhibit images in
   public/case-study/ are static files, so a production deploy still serves
   each one at its own address (/case-study/{file}.jpg), unlinked. Two of
   them, dsct-p02-summary.jpg and swot-p01-cover.jpg, show the founders'
   names as providers, and this file names both providers in its two
   constants. This repository is public: pushing the branch that carries
   them publishes both, whatever the hold. The re-cut images and the renamed
   constants replace them in the rename edit. */
export const CASE_STUDY_ON_HOLD = true;

/** False on a production deploy while the hold is on; true everywhere else. */
export function caseStudyLive(): boolean {
  return !(CASE_STUDY_ON_HOLD && process.env.VERCEL_ENV === "production");
}

/** The fictional cycling-tour provider (renamed before publishing). */
export const CYCLING_PROVIDER = "Dan Skimin Cycling Tours";
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

/* The fictional schools' notices, verbatim from the versions they belong to,
   so the page and the product pages carry one wording. */
const HARBORVIEW = requireVersion("harborview-review").disclosure;
const WEXCOMBE = requireVersion("wexcombe-meridian").disclosure;
const HORIZON_RIDGE = requireVersion("italy").disclosure;

export const NOTICES = {
  harborview: HARBORVIEW,
  cycling: providerNotice(CYCLING_PROVIDER),
  orienteering: providerNotice(ORIENTEERING_PROVIDER),
  wexcombe: WEXCOMBE,
  horizonRidge: HORIZON_RIDGE,
};

/** Every notice once, in the order the story meets them. */
export const ALL_NOTICES: string[] = [
  NOTICES.harborview,
  NOTICES.cycling,
  NOTICES.orienteering,
  NOTICES.wexcombe,
  NOTICES.horizonRidge,
];

export const INTRO = {
  // Source page 2, "This document follows …", with "document" as "case study".
  lede:
    "This case study follows one school through a typical engagement with ETI360. Each time the school needs something, from one view of its whole travel program to a guide for its coaches, it sends what it already has by email.",
  illustrative:
    "An illustrative engagement. The documents shown are real samples ETI360 built. The school, its providers and its decisions are invented. Each sample was produced on its own date, so the dates printed on the samples do not set the order of this story.",
  work:
    "ETI360 does the reading, the data entry, the research and measurement, and the writing. The school receives the documents prepared for its review and makes every decision.",
};

/** How the work divides (source page 2). */
export const WORK = {
  sends:
    "What it already has, by email: policies, calendars, venue lists, provider documents and booking confirmations. It fills in no forms and uploads nothing to a system.",
  does:
    "Reads every document in full. Enters every trip, stop and statement. Researches and measures what the documents leave out, such as emergency departments, drive times, entry rules and climate. Writes each document, in A4 and US Letter.",
  receives:
    "Prepared documents, in its own paper size. The school reviews them and makes every decision; for trip risk documents, it completes, amends and approves them. ETI360 never certifies, approves, ranks or recommends a provider.",
};

// The page's former reading note (READING_THE_CHAPTERS), adapted to the
// steps and their four parts. [draft], tone-reviewed 2026-09-28 (its one
// correction applied: "four moves" became "four parts").
export const READING_THE_STEPS =
  "Each step opens with what Harborview needs, then four parts: what Harborview sends, what ETI360 does, what Harborview receives, and what Harborview decides. Pages cut from the real samples follow, each captioned with what it is for. Where a Harborview document is not part of this case study, the step says so and shows the same product built for another fictional school.";

// [draft]
export const OPENING_PAGES =
  "Where a document is on this site, selecting its page opens the document at that page.";

export type Exhibit = {
  /** File in public/case-study/. */
  image: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Where the page comes from, as the case study labels it. */
  source: string;
  /** A crop shown across the column rather than a page in the grid. */
  wide?: boolean;
  /** The site version and document it opens, at this page. */
  open?: { version: string; doc: string; page: number };
};

export type ChapterSection = {
  heading?: string;
  intro?: string;
  /** Shown before the exhibits: a chapter showing another fictional school. */
  otherSchool?: { text: string; notices: string[] };
  exhibits: Exhibit[];
  notes?: { lead: string; text: string }[];
  notices?: string[];
};

export type Chapter = {
  /** The step's page: /case-study/{id}. A product step takes its product's
      slug. The old anchors (/case-study#{id}) redirect to it. */
  id: string;
  number: number;
  name: string;
  title: string;
  /** The product the chapter shows (its tier labels come from products.ts). */
  product?: ProductSlug;
  /** The label where the chapter is not one product. */
  label?: string;
  /** Where the chapter is not one product: the products its label names,
      whose tiers mark it in the step list. */
  opens?: ProductSlug[];
  need: string;
  sends: { title: string; items: string[] };
  does: { title: string; items: string[] };
  receives: { title: string; receives: string[]; decides: string[] };
  whoDecides: { text: string; source?: string }[];
  /** The Trip Package chapter's decision table. */
  decisionTable?: { decision: string; documents: { id: string; name: string }[]; holders: string }[];
  sections: ChapterSection[];
  /** The exhibits the step shows (image file names from `sections`): the
      two or three most telling, in this order. */
  show: string[];
  links: { href: string; label: string }[];
};

// Page sizes of the web copies in public/case-study/.
const A4_FULL = { width: 1000, height: 1415 };
const LETTER_FULL = { width: 1000, height: 1294 };

export const CHAPTERS: Chapter[] = [
  {
    id: "first-conversation",
    number: 1,
    name: "The first conversation",
    title: "Every way a student leaves campus",
    label: "Opens a Travel Program Review",
    opens: ["travel-program-review"],
    need: "Harborview’s travel grew one program at a time: international trips, elementary day trips, athletics and activities, Week Without Walls, and service learning and CAS, each with its own owner. Before planning the year, the leadership team wants one view of all of it.",
    sends: {
      title: "By email, and in one conversation",
      items: [
        "A reply to an email from ETI360, and time for a conversation.",
        "In the conversation: the ways students leave campus, and who owns each.",
        "Afterward, by email: each program’s governing document, and the documents of the two providers it wants read.",
      ],
    },
    does: {
      title: "The listening, the list, the request",
      items: [
        "Dan Skimin, Principal Consultant, and Seb Wong, Senior Consultant, hold the conversation.",
        "They listen first and write down each program path with the role that owns it: six paths, one of which, exchange and homestay, has no governing document.",
        "They set out who decides: ETI360 prepares and organizes the information; the school reviews it and makes every decision, and it completes, amends and approves its trip risk documents.",
        "They explain that the review also reads the documents of each provider the school uses.",
        "They send one email listing what to send. The school fills in no forms.",
      ],
    },
    receives: {
      title: "Before any document is written",
      receives: [
        // Source: "… becomes page 3 of the review (Exhibit 1.1)".
        "That email. The path list agreed in the conversation becomes page 3 of the review, shown below.",
      ],
      decides: [
        `Which program paths are in scope, which documents to send, and which providers to include: ${CYCLING_PROVIDER} and ${ORIENTEERING_PROVIDER}.`,
      ],
    },
    whoDecides: [
      {
        text: "The six program paths on page 3 are those the school’s documents name. A path the school runs that no document names would not appear here; the scoping conversation that opens each four-year cycle is where the school confirms the list.",
        source: "Travel Program Review, page 18",
      },
    ],
    sections: [
      {
        exhibits: [
          {
            image: "review-p03-paths.jpg",
            width: 1388,
            height: 1163,
            wide: true,
            alt: "The program paths page of Harborview International School's Travel Program Review: six paths, the documents that govern each, the role that owns it, and how each path reads.",
            caption:
              "The list from the first conversation, as the review prints it. The six program paths, the documents that govern each, the role that owns it, and how each path reads. Exchange and homestay has no governing document; the review records that once, under Governance & Policy, rather than on every area.",
            source: "Travel Program Review, sample edition · page 3 of 19, upper part · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 3 },
          },
        ],
        notes: [
          {
            lead: "How documents reach ETI360.",
            text: "By email, as the school already holds them. There is nothing to upload and no form to complete; ETI360 files what arrives and asks by email for anything else it needs.",
          },
        ],
      },
    ],
    show: ["review-p03-paths.jpg"],
    links: [{ href: "/travel-program-review", label: "The Travel Program Review" }],
  },

  {
    id: "travel-program-review",
    number: 2,
    name: "Travel Program Review",
    title: "The whole program, read path by path",
    product: "travel-program-review",
    need: "Harborview wants its whole program read the same way, path by path, and wants to see what its two providers’ own documents cover, before the year’s trips are planned.",
    sends: {
      title: "By email",
      items: [
        "Its nine documents: the trips policy, the medical policy, the emergency procedures, the operations manual, the accountability chart, the athletics and activities travel policy, the elementary field trip procedure, the Week Without Walls handbook, and the service learning and CAS guidelines.",
        `From ${CYCLING_PROVIDER}: its operating manual, a trip proposal and its tour catalog.`,
        `From ${ORIENTEERING_PROVIDER}: eight trip program documents, its tour catalog and its brand profile.`,
      ],
    },
    does: {
      title: "The reading, the evidence entry, the checking",
      items: [
        "Reads each document in full, section by section, and assigns it to the program path it governs.",
        "Enters every statement as an evidence line that names the document, section and page.",
        "Reads each path against the ten areas of the ETI360 Operational Capability Framework, from that path’s own documents only.",
        "Checks each open item against the full text before recording it.",
        "Sets a state for each path in each area: At standard, Progressing or Not evidenced. The school’s state for an area is its weakest documented path.",
        "Records, for each path, who proposes a trip, approves it, leads it in the field, can cancel it and reviews it afterward. Where no document names anyone, the review says so.",
        "Notes the two documents the school’s documents mention but did not send, without assuming their content.",
        "Reads each provider’s documents against the same ten areas, marks which document governs how the provider runs its trips, and sets out where the documents differ.",
      ],
    },
    receives: {
      title: "In A4, its own paper, and US Letter",
      receives: [
        "The Travel Program Review: the summary, the program paths, how the evidence was read, a page for each area, ownership by path, and the documents read.",
        "A provider evaluation for each provider: each area with its own state, and no overall grade.",
      ],
      decides: [
        "How to weigh and sequence the open items. The review does not schedule the school’s work.",
        "What to make of each provider’s documents.",
      ],
    },
    whoDecides: [
      {
        text: "This review structures what the school’s documents state. It does not certify outcomes or schedule the school’s work: open items are the school’s to weigh and sequence, and the school retains responsibility for its decisions and approvals.",
        source: "Travel Program Review, page 4",
      },
      {
        text: "ETI360 shows what the provider’s documents cover. It does not certify, approve, rank or recommend providers.",
        source: "Each provider evaluation, page 3",
      },
    ],
    sections: [
      {
        exhibits: [
          {
            image: "review-p01-cover.jpg",
            ...A4_FULL,
            alt: "The cover of Harborview International School's Travel Program Review, sample edition.",
            caption: "The cover: school, tier, date and four-year cycle.",
            source: "Travel Program Review, sample edition · cover · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 1 },
          },
          {
            image: "review-p04-states.jpg",
            width: 1388,
            height: 570,
            wide: true,
            alt: "The four states the review uses, At standard, Progressing, Not evidenced and Open items, with the review's Who decides statement.",
            caption:
              "What each state means, and who decides, as the review sets them out before its first area page.",
            source: "Travel Program Review, sample edition · page 4 of 19, lower part · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 4 },
          },
        ],
      },
      {
        heading: "The Travel Program Review",
        intro:
          "Every line in the review names the document, section and page it comes from, so a Head, a Board member or a program owner can check any finding against the school’s own text.",
        exhibits: [
          {
            image: "review-p02-summary.jpg",
            ...A4_FULL,
            alt: "The summary page of the Travel Program Review: the international path and every program path, the state of each of the ten areas, and the documents read.",
            caption:
              "The summary. International trips read on their own and every program path together, the state of each of the ten areas, and the nine documents read.",
            source: "Travel Program Review, sample edition · page 2 of 19 · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 2 },
          },
          {
            image: "review-p05-area.jpg",
            ...A4_FULL,
            alt: "The Governance & Policy area page of the Travel Program Review, with the state of each path and its evidence lines.",
            caption:
              "One area across the paths: Governance & Policy, the state of each path, and every evidence line with its document, section and page.",
            source: "Travel Program Review, sample edition · page 5 of 19 · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 5 },
          },
          {
            image: "review-p15-international.jpg",
            ...A4_FULL,
            alt: "The ownership page of the Travel Program Review for international multi-day trips and elementary day trips.",
            caption:
              "Who holds what on each path, from proposing a trip to reviewing it afterward, with the source of each line.",
            source: "Travel Program Review, sample edition · page 15 of 19 · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 15 },
          },
        ],
      },
      {
        heading: "What each provider’s documents cover",
        intro:
          "The review reads the documents of each provider the school uses against the same ten areas. Each evaluation lists the documents read and marks which one governs how the provider runs its trips; only a governing document’s lines count toward a state. Each area carries its own state, and the states are not combined into an overall grade.",
        exhibits: [
          {
            image: "dsct-p02-summary.jpg",
            ...A4_FULL,
            alt: `The summary page of the provider evaluation for ${CYCLING_PROVIDER}, a fictional trip provider.`,
            caption: `${CYCLING_PROVIDER}: three documents read. The operating manual governs. The trip proposal and the tour catalog are read for what a school receives and for where the documents differ: staffing, the emergency line, the support vehicle, and the Loire tour’s route and length.`,
            source: "Provider Evaluation, sample edition · page 2 of 15 · A4 edition",
          },
          {
            image: "swot-p01-cover.jpg",
            ...A4_FULL,
            alt: `The cover of the provider evaluation for ${ORIENTEERING_PROVIDER}, a fictional trip provider.`,
            caption: `${ORIENTEERING_PROVIDER}: ten documents read. Eight trip program documents, one for each program, its tour catalog and its brand profile. This evaluation is still in preparation, so only its cover is shown.`,
            source: "Provider Evaluation, sample edition · cover · A4 edition",
          },
        ],
        notes: [
          {
            lead: "About these samples.",
            text: "The review and the two provider evaluations were produced as separate sample documents. Each evaluation shows its provider on its own and names no school; in an engagement, they are parts of one Travel Program Review.",
          },
        ],
        notices: [NOTICES.cycling, NOTICES.orienteering],
      },
    ],
    show: ["review-p02-summary.jpg", "review-p05-area.jpg", "dsct-p02-summary.jpg"],
    links: [
      { href: "/travel-program-review", label: "The Travel Program Review" },
      { href: "/travel-program-review#harborview-review", label: "Harborview’s sample review, in A4 and US Letter" },
    ],
  },

  {
    id: "field-trip-package",
    number: 3,
    name: "Field Trip Package",
    title: "A year of day trips, prepared at once",
    product: "field-trip-package",
    need: "Harborview’s elementary school runs one-day trips for Grades 1 to 5 in Singapore, one for each unit of inquiry. The division wants the whole year prepared at once, with one page per trip, so that every trip reads the same way.",
    sends: {
      title: "By email",
      items: [
        "Each grade team’s venues for its units of inquiry.",
        "Class sizes and the adults going on each trip.",
        "The school calendar, with its term dates and holidays.",
        "The elementary field trip procedure is already on file from the review.",
      ],
    },
    does: {
      title: "The entry, the measuring, the writing",
      items: [
        "Enters each trip: grade, unit of inquiry, a date checked against the term calendar and public holidays, the schedule, and each stop with its address, and its map position where it has one.",
        "Measures the drive by road from each mapped stop (from the ferry terminal for the island day) to Singapore’s public emergency departments. Each trip page lists the two children’s emergency departments and the general one with the shortest drive, with what each hospital’s own pages say about treating children, its address, hours and telephone.",
        "Builds the island day from National Parks Board crossing information.",
        "Writes each trip’s learning purpose, schedule and notes for families, then a calendar for each month and the year at a glance.",
      ],
    },
    receives: {
      title: "In A4 and US Letter",
      receives: [
        "The Annual Elementary Field Trip Risk Assessment Pack: the year at a glance, a calendar for each month, and one page per trip.",
        "For each trip, issued separately and not part of this case study: the itinerary, a parent information letter in the school’s own name, risk-assessment working documents for each activity group, and a weather note from the 15-year record.",
      ],
      decides: ["Each trip and its risk assessment, and which emergency department each group uses."],
    },
    whoDecides: [
      {
        text: "Harborview International School reviews, completes, amends as necessary, and approves each trip and its risk assessment. The school also confirms the emergency department each group uses. The school and its trip leaders retain responsibility for risk decisions, the judgments made on the day, and final approval.",
        source: "Field Trip Risk Assessment Pack, page 2",
      },
    ],
    sections: [
      {
        exhibits: [
          {
            image: "ftp-p01-cover.jpg",
            ...A4_FULL,
            alt: "The cover of Harborview International School's Annual Elementary Field Trip Risk Assessment Pack 2026–27.",
            caption: "The cover names the school, the division and the year.",
            source: "Annual Elementary Field Trip Risk Assessment Pack 2026–27 · cover · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 1 },
          },
          {
            image: "ftp-p06-carries.jpg",
            ...A4_FULL,
            alt: "The page of the Field Trip Risk Assessment Pack that sets out what every trip carries and how the pack is used.",
            caption:
              "What every trip carries, and how the pack is used: a trip that moves keeps its page, and the pack lists the working documents for each trip and does not record approval.",
            source: "Field Trip Risk Assessment Pack · page 6 of 46 · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 6 },
          },
        ],
      },
      {
        heading: "The Field Trip Risk Assessment Pack",
        exhibits: [
          {
            image: "ftp-p08-trip.jpg",
            ...A4_FULL,
            alt: "A Grade 1 trip page of the Field Trip Risk Assessment Pack: Mount Faber Park and Henderson Waves.",
            caption:
              "A trip page, Grade 1. The learning purpose, the schedule, notes for families, the route from school, and the emergency departments with the drive from each stop. The school confirms which one the group uses.",
            source: "Annual Elementary Field Trip Risk Assessment Pack 2026–27 · page 8 of 46 · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 8 },
          },
          {
            image: "ftp-p05-year.jpg",
            ...A4_FULL,
            alt: "The year at a glance in the Field Trip Risk Assessment Pack: each grade's trips by date and unit of inquiry.",
            caption: "The year at a glance: each grade’s trips by date and unit of inquiry.",
            source: "Field Trip Risk Assessment Pack · page 5 of 46 · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 5 },
          },
          {
            image: "ftp-p02-who-decides.jpg",
            ...A4_FULL,
            alt: "The Who decides and About the example page of the Field Trip Risk Assessment Pack.",
            caption:
              "Who decides, and what in the example is real: the venues, addresses and emergency departments are real, and each drive is measured on real roads; the dates, class sizes and staff are illustrative.",
            source: "Field Trip Risk Assessment Pack · page 2 of 46 · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 2 },
          },
        ],
        // The page-2 caption's second half, kept on the step while its page
        // is not shown (the step already quotes page 2's Who decides). The
        // lead is [draft], from the caption's own words; tone-reviewed
        // 2026-09-28 with the stepper's review fixes, no corrections.
        notes: [
          {
            lead: "What in the example is real.",
            text: "The venues, addresses and emergency departments are real, and each drive is measured on real roads; the dates, class sizes and staff are illustrative.",
          },
        ],
      },
    ],
    show: ["ftp-p08-trip.jpg", "ftp-p05-year.jpg"],
    links: [
      { href: "/field-trip-package", label: "The Field Trip Package" },
      { href: "/field-trip-package#harborview-elementary", label: "Harborview’s pack, in A4 and US Letter" },
    ],
  },

  {
    id: "conference-travel-package",
    number: 4,
    name: "Conference Travel Package",
    title: "One guide for the conference year",
    product: "conference-travel-package",
    need: "Harborview’s teams travel to other schools in its athletics conference through the year, and its activity groups travel to their own events; Harborview hosts in turn. The Director of Athletics & Activities wants the coaches and advisors who travel with them to carry the same information for every host city.",
    sends: {
      title: "By email",
      items: [
        "The travel calendar the Director of Athletics & Activities publishes each August.",
        "For each trip: the dates, the teams and staff traveling, and the host school’s schedule.",
        "Flight numbers, room lists and staff phone numbers stay with the school, as fields it completes.",
      ],
    },
    does: {
      title: "The research, the measuring, the writing",
      items: [
        "Reads the athletics and activities travel policy first, so the guide follows it: the Head Coach leads each team’s traveling party, students stay with host families the host school arranges at Conference tournaments, and activities travel uses hotels.",
        "Researches each host city once: arrival by air and rail, emergency departments, clinics and pharmacies, emergency numbers, entry rules, and climate from the historical record, each with its source.",
        "Measures the routes between the airport, the host school, where the group stays and the emergency departments, and lists the emergency departments by drive time, shortest first.",
        "Writes a chapter for every host city in the same order, so the medical page is always in the same place, and a page of items to confirm before travel.",
      ],
    },
    receives: {
      title: "In A4 and US Letter",
      receives: [
        "One guide for the conference year, issued in the school’s own name: the year, what holds before every trip, a chapter for every host city, and the items to confirm before travel.",
        // Source: "… page 10 shows the same product for another fictional
        // school."; "this sample" became "this case study" (tone review).
        "Harborview’s edition is not part of this case study; the pages below show the same product for another fictional school.",
      ],
      decides: [
        "The Director of Athletics & Activities approves all team and activity travel under the school’s policy. The school completes the fields marked for confirmation and confirms which emergency department each group uses.",
      ],
    },
    whoDecides: [
      {
        text: "The school completes and holds the fields marked for confirmation. ETI360 structures the information; it does not advise, certify, or guarantee outcomes.",
        source: "Athletics and Activities Trips Guide, back cover (Wexcombe International School edition)",
      },
    ],
    sections: [
      {
        exhibits: [
          {
            image: "review-p16-athletics.jpg",
            width: 1388,
            height: 855,
            wide: true,
            alt: "The athletics and activities travel path on the ownership page of Harborview International School's Travel Program Review.",
            caption:
              "The athletics and activities path, as the review reads it. Who proposes, approves, leads in the field and reviews after the season, each from the school’s own policy. The guide starts from the same policy.",
            source: "Travel Program Review, sample edition · page 16 of 19, upper part · A4 edition",
            open: { version: "harborview-review", doc: "travel-program-review", page: 16 },
          },
        ],
      },
      {
        heading: "The same product, another school",
        otherSchool: {
          text: "Another fictional school. Harborview’s conference edition is not part of this case study. These pages come from the draft edition of the Athletics and Activities Trips Guide built for Wexcombe International School in London and the Meridian Schools Conference.",
          notices: [NOTICES.wexcombe],
        },
        exhibits: [
          {
            image: "wex-p01-cover.jpg",
            ...A4_FULL,
            alt: "The cover of the Athletics and Activities Trips Guide 2026–27, Wexcombe International School edition, for the Meridian Schools Conference.",
            caption: "The cover names the school, the conference, its cities and its windows.",
            source: "Athletics and Activities Trips Guide 2026–27 · cover · A4 edition",
            open: { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide", page: 1 },
          },
          {
            image: "wex-p09-medical.jpg",
            width: 1400,
            height: 776,
            wide: true,
            alt: "The medical page for Paris in the Athletics and Activities Trips Guide: the emergency departments listed by drive time from the host school.",
            caption:
              "A host city’s medical page, Paris. ETI360 lists the emergency departments by drive time from the host school, shortest first, each with the patients it takes, its hours and its telephone, and the school confirms which one the group uses. The host school is fictional.",
            source: "Athletics and Activities Trips Guide 2026–27 · page 9 of 49, upper part · A4 edition",
            open: { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide", page: 9 },
          },
        ],
      },
    ],
    show: ["wex-p01-cover.jpg", "wex-p09-medical.jpg"],
    links: [
      { href: "/conference-travel-package", label: "The Conference Travel Package" },
      { href: "/conference-travel-package#wexcombe-meridian", label: "Wexcombe’s guide, in A4 and US Letter" },
    ],
  },

  {
    id: "trip-package",
    number: 5,
    name: "Trip Package",
    title: "One trip, from approval to feedback",
    product: "trip-package",
    need: `One of Harborview’s international trips is a cycling trip in Taiwan, the Sun Moon Lake Loop from the tour catalog of ${CYCLING_PROVIDER}, whose documents the review has already read. The Head of School needs the trip’s documents before approving it; the trip leader, chaperones, families and students each need theirs before the group leaves.`,
    sends: {
      title: "By email",
      items: [
        "The provider’s proposal and day-by-day itinerary.",
        "Booking confirmations for flights and places to stay.",
        "The group: numbers, grades and staff.",
        "The school’s own trip papers, in whatever form they are in.",
        "The provider’s operating manual is already on file from the review.",
      ],
    },
    does: {
      title: "The record, the research, the writing, the maps",
      items: [
        "Turns the itinerary into a day-by-day record with no gaps, and places every location on the map.",
        "Lists the emergency departments by drive time from each place the group stays and rides through, with each hospital’s published capability facts.",
        "Prepares the Trip Risk Working File, one section for each activity group, in support of whichever risk documentation the school uses.",
        "Writes the documents for families, the trip leader, chaperones, teachers and students.",
        "Maps each riding day: a pocket route card for the teachers to carry, the full route pages in the Trip Leader Card, and an online version behind a password.",
        "Builds every document in A4, Harborview’s paper, and in US Letter.",
      ],
    },
    receives: {
      title: "Before, during and after the trip",
      receives: [
        "The Trip Package, listed below, and the day maps for each riding day.",
        // Source: "… page 12 shows the same product for another fictional
        // school."; "this sample" became "this case study" (tone review).
        "Harborview’s set for this trip is not part of this case study; the pages below show the same product for another fictional school.",
      ],
      decides: [
        "The Head of School approves the trip, with the Board Chair notified, under the school’s trips policy.",
        "The school reviews, completes, amends and approves its risk documentation; the trip leader makes the live assessment during the trip.",
        "The school or the provider designates which emergency department the group uses.",
      ],
    },
    whoDecides: [
      {
        text: "ETI360 prepares and organizes supporting information. The school and its providers retain responsibility for decisions, supervision, live assessment, and final approval.",
        source: "School Trip Record, page 2 (Horizon Ridge School of Cleveland edition)",
      },
      {
        text: "At Harborview, the trips policy sets the approval route: the Head of School approves Category C trips, with Board Chair notification.",
        source: "Travel Program Review, page 15",
      },
    ],
    // The ids are the document anchors on /trip-package.
    decisionTable: [
      {
        decision: "Approving the trip",
        documents: [
          { id: "school-trip-record", name: "School Trip Record" },
          { id: "trip-risk-working-file", name: "Trip Risk Working File" },
        ],
        holders: "The school office, the Head of School, the trip leader",
      },
      {
        decision: "Telling families",
        documents: [{ id: "family-trip-brief", name: "Family Trip Brief" }],
        holders: "Families",
      },
      {
        decision: "Preparing the leader and chaperones",
        documents: [
          { id: "trip-leader-card", name: "Trip Leader Card" },
          { id: "chaperone-briefing", name: "Chaperone Briefing and Pocket Emergency Card" },
        ],
        holders: "The trip leader and each chaperone",
      },
      {
        decision: "Connecting the trip to learning",
        documents: [
          { id: "educational-journey", name: "Educational Journey" },
          { id: "student-journey-guide", name: "Student Journey Guide" },
        ],
        holders: "Teachers and students",
      },
      {
        decision: "Improving next year’s trip",
        documents: [{ id: "post-trip-feedback-report", name: "Post-Trip Feedback Report" }],
        holders: "The school",
      },
    ],
    sections: [
      {
        heading: "The same product, another school",
        otherSchool: {
          text: "Another fictional school. Harborview’s set for its Taiwan trip is not part of this case study. These pages come from the Trip Package built for Horizon Ridge School of Cleveland’s eleven-day language and culture trip to Italy, in its US Letter edition, the school’s own paper.",
          notices: [NOTICES.horizonRidge],
        },
        exhibits: [
          {
            image: "italy-str-p01-cover.jpg",
            ...LETTER_FULL,
            alt: "The cover of the School Trip Record for Horizon Ridge School of Cleveland's trip to Italy.",
            caption:
              "The School Trip Record, the office file for approving the trip: trip facts and contacts, travel documents and insurance, reservations and the calendar, and transportation.",
            source: "School Trip Record · cover · US Letter edition",
            open: { version: "italy", doc: "school-trip-record", page: 1 },
          },
          {
            image: "italy-trwf-p02-groups.jpg",
            ...LETTER_FULL,
            alt: "The activity groups and rating scales page of the Trip Risk Working File for the Italy trip.",
            caption:
              "The Trip Risk Working File: the trip’s activity groups, each with its own section, and the rating scales. The school may substitute its own scales, and its own ratings go in each group’s review record.",
            source: "Trip Risk Working File · page 2 of 29 · US Letter edition",
            open: { version: "italy", doc: "trip-risk-working-file", page: 2 },
          },
          {
            image: "italy-ej-p02-language.jpg",
            ...LETTER_FULL,
            alt: "The Language in Place page of the Educational Journey for the Italy trip.",
            caption:
              "The Educational Journey: the trip’s teaching program, one question carried through fourteen places, with the three strands students work on each day. The Student Journey Guide gives students the same question as their own book.",
            source: "Educational Journey · page 2 of 7 (printed page 1) · US Letter edition",
            open: { version: "italy", doc: "educational-journey", page: 2 },
          },
        ],
      },
    ],
    show: ["italy-trwf-p02-groups.jpg", "italy-ej-p02-language.jpg"],
    links: [
      { href: "/trip-package", label: "The Trip Package" },
      { href: "/trips/italy", label: "The Italy trip, every document in US Letter and A4" },
    ],
  },

  {
    id: "through-the-year",
    number: 6,
    name: "Through the year",
    title: "After each trip, and the year after",
    label: "Trip Package · Field Trip Package · Travel Program Review",
    opens: ["trip-package", "field-trip-package", "travel-program-review"],
    need: "After each trip, Harborview wants to hear how it went from students, families and leaders. Each August it plans the next elementary year, and every four years its program is read again.",
    sends: {
      title: "By email, when each moment comes",
      items: [
        "After a trip: the answers to the four feedback questions, which the school collects from students and families itself, and the debrief answers of the trip leaders and the provider.",
        "Each August: the next year’s elementary trip plans.",
        "At the four-year mark: its documents as they then stand.",
      ],
    },
    does: {
      title: "The compiling, the carrying forward",
      items: [
        "Compiles the Post-Trip Feedback Report: the same four questions for each group, groups under five responses suppressed, leaders and the provider as a named debrief, and anything written in the welfare channel routed, never quoted.",
        "Prepares next year’s field-trip pack from this year’s pages; within a year, a trip that moves keeps its page.",
        "Each semester, compiles the Semester Board Report for the Board and Risk Committee from the trips and documents it has prepared for the school.",
        "Four years on, opens the next review with a scoping conversation.",
      ],
    },
    receives: {
      title: "Through the year",
      receives: [
        "A Post-Trip Feedback Report for each trip, part of the Trip Package.",
        "The Semester Board Report, which the school issues to its own Board; it is not shown in this case study.",
        "Next year’s pack and, four years on, the next Travel Program Review.",
      ],
      decides: [
        "Who sees each report and what changes as a result. At the next scoping conversation, the school confirms its program paths.",
      ],
    },
    whoDecides: [
      {
        text: "The report does not recommend. The three statements on page 2 say what the answers show; what follows is the school’s decision.",
        source: "Post-Trip Feedback Report, page 6 (Horizon Ridge School of Cleveland edition)",
      },
    ],
    sections: [
      {
        exhibits: [
          {
            image: "italy-ptf-p06-rules.jpg",
            width: 1380,
            height: 565,
            wide: true,
            alt: "The rules a Post-Trip Feedback Report follows, what it does not do, and how the answers were collected.",
            caption: `The rules a Post-Trip Feedback Report follows, what it does not do, and how the answers were collected. From another fictional school’s trip: ${HORIZON_RIDGE}`,
            source: "Post-Trip Feedback Report · page 6 of 6, lower part · US Letter edition",
            open: { version: "italy", doc: "post-trip-feedback-report", page: 6 },
          },
          {
            image: "ftp-p07-september.jpg",
            ...A4_FULL,
            alt: "The September calendar in Harborview International School's Field Trip Risk Assessment Pack.",
            caption: "A month’s calendar in the field-trip pack; each trip links to its page.",
            source: "Field Trip Risk Assessment Pack · page 7 of 46 · A4 edition",
            open: { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", page: 7 },
          },
        ],
      },
    ],
    show: ["italy-ptf-p06-rules.jpg", "ftp-p07-september.jpg"],
    links: [
      { href: "/trip-package#post-trip-feedback-report", label: "The Post-Trip Feedback Report" },
      { href: "/field-trip-package", label: "The Field Trip Package" },
      { href: "/travel-program-review", label: "The Travel Program Review" },
    ],
  },
];

/** The year at a glance (source page 2), one row per chapter. The label
    falls back to the chapter's tier label(s). */
const GLANCE: Record<string, { need: string; meets: string; label?: string; receives: string }> = {
  "first-conversation": {
    need: "Before planning the year, one view of every way a student leaves campus and who owns each",
    meets: "The first conversation",
    receives: "One email listing what to send",
  },
  "travel-program-review": {
    need: "Its whole program read the same way, path by path, and a view of what its two providers’ own documents cover",
    meets: "Travel Program Review",
    receives: "The review, and an evaluation of each provider’s documents",
  },
  "field-trip-package": {
    need: "The elementary school’s day trips for the year, prepared at once",
    meets: "Field Trip Package",
    receives: "The Annual Elementary Field Trip Risk Assessment Pack: one page per trip, a calendar for each month",
  },
  "conference-travel-package": {
    need: "The same information for every host city, carried by the coaches and advisors who travel with teams",
    meets: "Conference Travel Package",
    receives: "One guide for the conference year, with a chapter for every host city",
  },
  "trip-package": {
    need: "Each international trip’s documents, ready before approval and before departure",
    meets: "Trip Package",
    receives: "The documents for one trip, before, during and after it",
  },
  "through-the-year": {
    need: "A look back after each trip, then the next year and the next cycle",
    meets: "Through the year",
    label: "Post-Trip Feedback Report · next year’s pack · the next review",
    receives: "Feedback by group, next year’s trip pages, and a review every four years",
  },
};

/** A chapter's row in the year at a glance; throws (failing the build) if
    a chapter has none. */
export function glanceOf(ch: Chapter): { need: string; meets: string; label?: string; receives: string } {
  const g = GLANCE[ch.id];
  if (!g) throw new Error(`Case Study: no year-at-a-glance row for chapter "${ch.id}"`);
  return g;
}

/** Across the four products (source page 14). Not shown since the
    step-by-step guide (2026-09-28), where each product's step carries the
    same division in full as its four moves; kept here with its source
    words. The removal awaits Dan's approval; the old /case-study#across
    link lands on How the work divides (_parts/HashRedirect.tsx). */
export const ACROSS: { product: ProductSlug; sends: string; does: string; receives: string }[] = [
  {
    product: "travel-program-review",
    sends: "Its travel policies and procedures, and each provider’s documents",
    does: "Reads every document in full, enters each line with its source, reads each program path and each provider against ten areas",
    receives: "The review, once every four years, with an evaluation of each provider’s documents",
  },
  {
    product: "field-trip-package",
    sends: "Venues by unit, class sizes, the school calendar",
    does: "Enters every trip and stop, measures the drives to emergency departments, writes each trip page and calendar",
    receives: "The year’s day trips, one page per trip, a calendar for each month",
  },
  {
    product: "conference-travel-package",
    sends: "The season calendar and each trip’s teams and hosts",
    does: "Researches each host city once, measures its routes, writes a chapter per city",
    receives: "One guide for the conference year",
  },
  {
    product: "trip-package",
    sends: "The provider’s itinerary, bookings and the group",
    does: "Builds the day-by-day record, lists the emergency departments, prepares the working file and writes each document",
    receives: "The documents for one trip, before, during and after it",
  },
];

/** The page's Who decides (source pages 14 and 15). */
export const WHO_DECIDES_LEAD =
  "ETI360 prepares and organizes the information and adds what the school’s documents leave out.";
export const WHO_DECIDES_PROVIDERS = "ETI360 does not certify, approve, rank or recommend providers.";

/** The back cover's line, over every notice. */
export const ABOUT =
  "The documents shown are real samples ETI360 built. The school, its providers and its decisions are invented, and the dates printed on the samples are the dates each sample was produced.";

/* ── Build-time checks ── */

export type OpenTarget = { version: Version; doc: VersionDocument; page: number };

/** The version and document an exhibit opens; throws (failing the build) if
    either is no longer on the site. */
export function openTarget(ex: Exhibit): OpenTarget | null {
  if (!ex.open) return null;
  const version = requireVersion(ex.open.version);
  const doc = version.documents.find((d) => d.slug === ex.open!.doc);
  if (!doc) throw new Error(`Case Study: ${ex.open.version} has no document "${ex.open.doc}"`);
  return { version, doc, page: ex.open.page };
}

/** The site documents a chapter's exhibits open, once each, in order. */
export function chapterDocuments(ch: Chapter): { version: Version; doc: VersionDocument }[] {
  const seen = new Set<string>();
  const out: { version: Version; doc: VersionDocument }[] = [];
  for (const s of ch.sections) {
    for (const ex of s.exhibits) {
      const t = openTarget(ex);
      if (!t) continue;
      const key = `${t.version.slug}/${t.doc.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ version: t.version, doc: t.doc });
    }
  }
  return out;
}

/* ── The steps ── */

/** The overview's address; each step is /case-study/{chapter id}. */
export const CASE_STUDY_HREF = "/case-study";

export function stepHref(ch: Chapter): string {
  return `${CASE_STUDY_HREF}/${ch.id}`;
}

export function getChapter(id: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

/** Interface words for the guide: the step bar, the step list, the four
    moves and the start button. [draft], tone-reviewed 2026-09-28. The move
    labels are the ones the guide was specified with. */
export const STEP_UI = {
  overview: "Overview",
  steps: "Case Study steps",
  bar: "Previous and next step",
  previous: "Previous",
  next: "Next",
  contact: "Contact",
  start: "Start at step 1",
  // The second skip link, on a step page: past the bar and the step list.
  // [draft], tone-reviewed 2026-09-28 with the review fixes, no corrections.
  skip: "Skip to the step",
  exhibits: "Pages from the samples",
  moves: {
    sends: "What Harborview sends",
    does: "What ETI360 does",
    receives: "What Harborview receives",
    decides: "What Harborview decides",
  },
};

/** "Step 2 of 6". [draft] */
export function stepOfTotal(ch: Chapter): string {
  return `Step ${ch.number} of ${CHAPTERS.length}`;
}

export type ShownExhibits = {
  /** A chapter showing another fictional school: said before its pages. */
  lead?: { text: string; notices: string[] };
  exhibits: Exhibit[];
  /** The shown pages by the section they come from, in `show` order, each
      run with its section's intro (said once, before the section's first
      shown page). */
  groups: { intro?: string; exhibits: Exhibit[] }[];
  /** The notes of the sections the shown exhibits come from. */
  notes: { lead: string; text: string }[];
};

/** The exhibits a step shows, in its `show` order, with their sections'
    notes. Throws (failing the build) if a name is not one of the chapter's
    exhibits, or if another school's pages would be shown beside
    Harborview's, where "these pages" would no longer be exact. */
export function shownExhibits(ch: Chapter): ShownExhibits {
  const found = ch.show.map((image) => {
    const section = ch.sections.find((s) => s.exhibits.some((e) => e.image === image));
    if (!section) throw new Error(`Case Study: ${ch.id} shows "${image}", which is not one of its exhibits`);
    return { section, exhibit: section.exhibits.find((e) => e.image === image)! };
  });
  const sections = [...new Set(found.map((f) => f.section))];
  const leads = sections.filter((s) => s.otherSchool);
  if (leads.length > 0 && sections.length > 1) {
    throw new Error(`Case Study: ${ch.id} mixes another school's pages with Harborview's`);
  }
  const groups: ShownExhibits["groups"] = [];
  const introduced = new Set<ChapterSection>();
  let last: ChapterSection | null = null;
  for (const f of found) {
    if (f.section !== last) {
      const intro = introduced.has(f.section) ? undefined : f.section.intro;
      introduced.add(f.section);
      groups.push({ intro, exhibits: [] });
      last = f.section;
    }
    groups[groups.length - 1].exhibits.push(f.exhibit);
  }
  return {
    lead: leads[0]?.otherSchool,
    exhibits: found.map((f) => f.exhibit),
    groups,
    notes: sections.flatMap((s) => s.notes ?? []),
  };
}

/* Which fictional names a notice covers: a step carries the notice of every
   fictional school or provider it names, so a page reached on its own is as
   plain about what is invented as the whole case study was. */
const NOTICE_NAMES: [string, string][] = [
  [NOTICES.cycling, CYCLING_PROVIDER],
  [NOTICES.orienteering, ORIENTEERING_PROVIDER],
  [NOTICES.wexcombe, "Wexcombe"],
  [NOTICES.horizonRidge, "Horizon Ridge"],
];

/** The notices at the foot of a step: Harborview's always, then those of
    every other fictional name the step carries, in the order the story
    meets them, less any already said in the step's lead. */
export function stepNotices(ch: Chapter): string[] {
  const text = JSON.stringify(ch);
  const said = new Set(shownExhibits(ch).lead?.notices ?? []);
  const named = NOTICE_NAMES.filter(([, name]) => text.includes(name)).map(([n]) => n);
  return [NOTICES.harborview, ...named].filter((n) => !said.has(n));
}
