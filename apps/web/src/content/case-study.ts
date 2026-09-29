import type { ProductSlug, Version, VersionDocument } from "@/content/trips/types";
import { getVersion } from "@/content/versions";
import { WHO_DECIDES, WHO_PREPARES } from "@/content/voice";

export { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/lib/case-study-hold";

/* The Case Study (/case-study; Dan, 2026-09-28: "How we work I do not like.
   I prefer Case Study."): one illustrative school year with Harborview
   International School across the four products, told as a step-by-step
   guide with the left step list and the pinned previous and next bar Dan
   asked for.

   FIVE PAGES (revision of 2026-09-28, after Dan's tone and voice reviewer):
   the overview, then one step per product, in tier order: Travel Program
   Review (it opens with the first conversation, folded in from the old step
   1), Field Trip Package, Conference Travel Package, Trip Package (it ends
   with the rest of the year, folded in from the old step 6). The old
   addresses /case-study/first-conversation and /case-study/through-the-year
   redirect permanently (src/lib/redirects.ts); the old hash anchors land
   through _parts/HashRedirect.tsx.

   OUTPUTS FIRST, one sequence on every step: what Harborview needs (one or
   two sentences) → what Harborview receives (a compact summary; the Trip
   Package's decision table, which the reviewer called the strongest
   content, and an equivalent for each other product) → how it works (1 what
   Harborview sends, 2 what ETI360 does, 3 what Harborview decides) → one
   decision-ownership box, positive role first, in the site's canonical
   words → one or two readable excerpts → next.

   Excerpts: public/case-study/x-*.jpg, cut by the rebuild repo's
   dev/case-study/cut_web_excerpts.py, one column of a real sample page
   each, narrow enough to read on a phone. Every excerpt opens its document
   at that page through the logged /open route; no PDF is duplicated.

   Copy: the words are those of the reviewed web copy (the rebuild repo's
   content/vault/Marketing/ETI360-Case-Study-Web-Copy-2026-09.md) with the
   reviewer's accepted changes; lines marked [draft] are new. No prices, no
   Duty Manager Dashboard or Simulation, no invented quotes, outcomes or
   metrics. "does not certify, approve, rank or recommend" appears once, in
   the Travel Program Review's provider part (its Provider evaluations row);
   a build check holds it there.

   ON HOLD FOR PUBLISHING until both fictional providers are renamed: see
   src/lib/case-study-hold.ts. Each provider name lives once, in the two
   constants below, so the rename is one edit here. */

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
   so the case study and the product pages carry one wording. */
export const NOTICES = {
  harborview: requireVersion("harborview-review").disclosure,
  cycling: providerNotice(CYCLING_PROVIDER),
  orienteering: providerNotice(ORIENTEERING_PROVIDER),
  wexcombe: requireVersion("wexcombe-meridian").disclosure,
  horizonRidge: requireVersion("italy").disclosure,
};

/** The other fictional schools whose samples a step shows. */
const OTHER_SCHOOLS = {
  wexcombe: { school: "Wexcombe International School", notice: NOTICES.wexcombe },
  horizonRidge: { school: "Horizon Ridge School of Cleveland", notice: NOTICES.horizonRidge },
};
type OtherSchool = keyof typeof OTHER_SCHOOLS;

/** One note, the same wherever another school's samples appear, followed
    by that school's verbatim notice once. [draft] */
export function otherSchoolNote(key: OtherSchool): { text: string; notice: string } {
  const o = OTHER_SCHOOLS[key];
  return {
    text: `These pages come from samples prepared for another fictional school, ${o.school}; Harborview’s edition would take the same form.`,
    notice: o.notice,
  };
}

/* ── The overview ── */

export const INTRO = {
  // [draft] The overview's h1 (the reviewer's suggestion, adapted).
  heading: "How ETI360 supports one school across a year of travel",
  // [draft] The reviewer's suggestion, verbatim.
  lede: "This illustrative engagement follows Harborview International School through four kinds of preparation: a review of its travel program, an annual field-trip pack, a conference travel guide, and the documents for one international trip.",
  // [draft] The reviewer's suggestion, keeping Dan's point: ETI360 does
  // the work (the reading and the data entry).
  work: "The school sends the documents it already holds. ETI360 does the reading and the data entry, adds cited research within the agreed scope, and prepares the documents for leadership review. The school reviews the outputs and makes every decision.",
  // The reviewer's wording for the old "real samples ETI360 built" line.
  samples:
    "The documents are fully developed samples created by ETI360. The school, providers and decisions in this example are fictional.",
  dates:
    "Each sample was produced on its own date, so the dates printed on the samples do not set the order of this story.",
};

/** How the work divides (source page 2), the absolutes bounded. */
export const WORK = {
  sends:
    "What it already has, by email: policies, calendars, venue lists, provider documents and booking confirmations. It fills in no forms and uploads nothing to a system.",
  does: "Reads each document supplied in full and enters each trip, stop and statement in it. Researches and measures, within the agreed scope, what the documents leave out, such as emergency departments, drive times, entry rules and climate, from cited public sources. Writes each document, in A4 and US Letter.",
  receives:
    "Prepared documents, in its own paper size. The school reviews them and makes every decision; for trip risk documents, it completes, amends and approves them.",
};

/** The rest of the year, in one line on the overview. [draft] */
export const LIFECYCLE =
  "Through the rest of the year: a Post-Trip Feedback Report after each trip, next year’s field-trip pages each August, and, every four years, the next Travel Program Review, opened with a scoping conversation.";

/** The one decision-ownership box on every page: ETI360's positive role
    first, then the site's canonical Who decides line (voice.ts). */
export const WHO_DECIDES_BOX = `${WHO_PREPARES} ${WHO_DECIDES}`;

/** Tier 1 to 3 in one line each (Dan, 2026-09-28: "we don't explain T1-T3.
    I think a small explanation on the nav bar will help"), from his
    approved tier bullets (rebuild repo dev/schools-email/
    template-v42-docs.html). [draft], tone-reviewed 2026-09-28 with the
    five-page revision (the whole section's text in context; its seven
    corrections are applied in this file). */
export const TIER_LINES: Record<1 | 2 | 3, string> = {
  1: "The school-wide review of travel policies and procedures, prepared for leadership review.",
  2: "Each trip’s documents, prepared for review before departure.",
  3: "Field and emergency information for trip leaders while the group is away, and the report after the trip.",
};

/* ── The steps ── */

export type Excerpt = {
  /** File in public/case-study/. */
  image: string;
  width: number;
  height: number;
  /** The crop's width in PDF points. Every excerpt shows at the same scale
      (CSS px per point), so the source text reads at one size. */
  pt: number;
  /** The crop's dominant text size in points. */
  textPt: number;
  alt: string;
  caption: string;
  /** Where the page comes from. */
  source: string;
  /** The site version and document it opens, at this page. */
  open: { version: string; doc: string; page: number };
};

export type DecisionRow = { decision: string; documents: { id: string; name: string }[]; holders: string };

export type Step = {
  /** The step's page, /case-study/{id}: its product's slug. */
  id: ProductSlug;
  number: number;
  /** The product's name. */
  name: string;
  title: string;
  /** One or two sentences. */
  need: string;
  /** The Travel Program Review only: the first conversation. */
  conversation?: { title: string; items: string[] };
  receives: {
    title: string;
    paper: string;
    /** A compact summary: each part and what it holds… */
    parts?: { part: string; holds: string }[];
    /** …or, for the Trip Package, the decision table (ids: the document
        anchors on /trip-package). */
    decisions?: DecisionRow[];
    /** A line under the summary. */
    note?: { lead: string; text: string };
  };
  sends: string[];
  does: { title: string; items: string[] };
  decides: string[];
  /** Where the excerpts come from another fictional school. */
  otherSchool?: OtherSchool;
  excerpts: Excerpt[];
  /** A note beside the excerpts. */
  excerptNote?: { lead: string; text: string };
  /** The Trip Package only: the rest of the year. */
  restOfYear?: {
    title: string;
    subtitle: string;
    items: { lead: string; text: string }[];
    decides: string;
  };
  /** The site documents the step opens, in both papers. */
  docs: { version: string; doc: string }[];
  links: { href: string; label: string }[];
  /** 150 to 160 characters, plain, no notices (the notices stay on the
      page). [draft] */
  description: string;
};

const TPR_OPEN = { version: "harborview-review", doc: "travel-program-review" };
const FTP_OPEN = { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack" };
const WEX_OPEN = { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide" };

export const STEPS: Step[] = [
  {
    id: "travel-program-review",
    number: 1,
    name: "Travel Program Review",
    title: "The whole program, read path by path",
    need: "Harborview’s travel grew one program at a time, each with its own owner. Before planning the year, the leadership team wants one view of the whole program, read the same way path by path, including what its two providers’ own documents cover.",
    conversation: {
      title: "Scope and document request",
      items: [
        "Dan Skimin, Principal Consultant, and Seb Wong, Senior Consultant, hold the first conversation with the leadership team.",
        "They listen first and write down each program path with the role that owns it: six paths, one of which, exchange and homestay, has no governing document.",
        "They explain that the review also reads each provider’s documents, then send one email listing what to send. The school fills in no forms.",
      ],
    },
    receives: {
      title: "The Travel Program Review",
      paper: "In A4, its own paper, and US Letter",
      // [draft] rows, from the reviewed captions and receives lines.
      parts: [
        {
          part: "Summary",
          holds: "Two figures, international trips read on their own and every program path together, then the state of each area and the documents read.",
        },
        { part: "Program paths", holds: "The six paths, the documents that govern each, and the role that owns it." },
        {
          part: "A page for each area",
          holds: "Each path’s state in that area, and each evidence line with its document, section and page.",
        },
        {
          part: "Ownership by path",
          holds: "Who proposes a trip, approves it, leads it, can cancel it and reviews it afterward; where no document names anyone, the review says so.",
        },
        {
          // The provider part: the one place the case study says what
          // ETI360 does not do with providers (each provider evaluation,
          // page 3, verbatim in its last two sentences).
          part: "Provider evaluations",
          holds: "For each provider the school uses: the documents read and the one that governs, whose lines alone count toward a state; each area keeps its own state, with no overall grade. ETI360 shows what the provider’s documents cover. It does not certify, approve, rank or recommend providers.",
        },
      ],
      // [draft] The definition where "At standard" first appears on the
      // page, from the review's page 4.
      note: {
        lead: "At standard",
        text: "is an evidence state within the ETI360 Operational Capability Framework, not certification or compliance approval: the path’s documents describe the practice in cited detail. Progressing means at least one part is not yet written down; Not evidenced means the governing documents do not describe it.",
      },
    },
    sends: [
      "Its nine travel documents, from the trips policy, the medical policy and the emergency procedures to the Week Without Walls handbook and the service learning and CAS guidelines.",
      `From ${CYCLING_PROVIDER}: its operating manual, a trip proposal and its tour catalog.`,
      `From ${ORIENTEERING_PROVIDER}: eight trip program documents, its tour catalog and its brand profile.`,
    ],
    does: {
      title: "The reading, the evidence entry, the checking",
      items: [
        "Reads each document supplied in full, section by section, and assigns it to the program path it governs.",
        "Enters each statement in those documents as an evidence line that names the document, section and page.",
        "Reads each path against the ten areas of the ETI360 Operational Capability Framework, from that path’s own documents only, and checks each open item against the full text before recording it.",
        "Sets a state for each path in each area: At standard, Progressing or Not evidenced. The school’s state for an area is its weakest documented path.",
        "Records who proposes, approves, leads, can cancel and reviews each path’s trips, and notes the two documents the school’s documents mention but did not send, without assuming their content.",
        "Reads each provider’s documents against the same ten areas and marks which document governs how the provider runs its trips.",
      ],
    },
    decides: [
      "Which program paths are in scope and which providers to include.",
      "How to weigh and sequence the open items; the review does not schedule the school’s work.",
      "How the provider documentation informs the school’s review.",
    ],
    excerpts: [
      {
        image: "x-tpr-summary.jpg",
        width: 1050,
        height: 352,
        pt: 302,
        textPt: 10,
        alt: "The summary headline of Harborview International School’s Travel Program Review: areas at standard, 8 of 10 for international trips read on their own, and 1 of 10 across every program path.",
        caption:
          "The summary opens with two figures: the areas at standard for international trips read on their own, and across every program path together.",
        source: "Travel Program Review, sample edition · page 2 of 19 · A4 edition",
        open: { ...TPR_OPEN, page: 2 },
      },
      {
        image: "x-tpr-states.jpg",
        width: 942,
        height: 522,
        pt: 271,
        textPt: 7.5,
        alt: "Two state definitions from the review. At standard: the path’s documents describe the practice in cited detail, with at least three evidence lines, no structural open item and no more than two procedural open items. Not evidenced: the path’s governing documents do not describe the practice.",
        caption:
          "How a state is set, as the review prints it: At standard asks for cited detail from the path’s own documents; Not evidenced means they do not describe the practice.",
        source: "Travel Program Review, sample edition · page 4 of 19 · A4 edition",
        open: { ...TPR_OPEN, page: 4 },
      },
    ],
    docs: [TPR_OPEN],
    links: [{ href: "/travel-program-review", label: "The Travel Program Review" }],
    description:
      "Illustrative case study with a fictional school, step 1 of 4: the Travel Program Review reads the school’s travel documents path by path, providers included.",
  },

  {
    id: "field-trip-package",
    number: 2,
    name: "Field Trip Package",
    title: "A year of day trips, prepared at once",
    need: "Harborview’s elementary school runs one-day trips for Grades 1 to 5 in Singapore, one for each unit of inquiry. The division wants the whole year prepared at once, with one page per trip, so that every trip reads the same way.",
    receives: {
      title: "The Annual Elementary Field Trip Risk Assessment Pack",
      paper: "In A4 and US Letter",
      parts: [
        { part: "The year at a glance", holds: "Each grade’s trips by date and unit of inquiry." },
        { part: "A calendar for each month", holds: "Each trip on its date, linked to its page." },
        {
          part: "One page per trip",
          holds: "The learning purpose, the schedule, notes for families, the route from school, and the emergency departments with the drive from each stop.",
        },
        {
          part: "Issued separately for each trip",
          holds: "The itinerary, a parent information letter in the school’s own name, risk-assessment working documents for each activity group, and a weather note from the 15-year record. These are not part of this case study.",
        },
      ],
    },
    sends: [
      "Each grade team’s venues for its units of inquiry.",
      "Class sizes and the adults going on each trip.",
      "The school calendar, with its term dates and holidays.",
      "The elementary field trip procedure is already on file from the review.",
    ],
    does: {
      title: "The entry, the measuring, the writing",
      items: [
        "Enters each trip: grade, unit of inquiry, a date checked against the term calendar and public holidays, the schedule, and each stop with its address, and its map position where it has one.",
        "Measures the drive by road from each mapped stop (from the ferry terminal for the island day) to Singapore’s public emergency departments. Each trip page lists the two children’s emergency departments and the general one with the shortest drive, with what each hospital’s own pages say about treating children, its address, hours and telephone.",
        "Builds the island day from National Parks Board crossing information.",
        "Writes each trip’s learning purpose, schedule and notes for families, then a calendar for each month and the year at a glance.",
      ],
    },
    decides: [
      "Each trip and its risk assessment: the school reviews, completes, amends as necessary, and approves them.",
      "Which emergency department each group uses.",
    ],
    excerpts: [
      {
        image: "x-ftp-trip-left.jpg",
        width: 973,
        height: 834,
        pt: 280,
        textPt: 8.5,
        alt: "A Grade 1 trip page, left column: the learning purpose, and the schedule from 08:15 to 14:10 for Mount Faber Park and Henderson Waves.",
        caption: "A trip page, Grade 1, left: the learning purpose and the schedule. The notes for families follow.",
        source: "Field Trip Risk Assessment Pack 2026–27 · page 8 of 46 · A4 edition",
        open: { ...FTP_OPEN, page: 8 },
      },
      {
        image: "x-ftp-trip-right.jpg",
        width: 800,
        height: 560,
        pt: 230,
        textPt: 8,
        alt: "The same trip page, right column: 66 Grade 1 students, one adult to five students, departure and return times, and the two stops with their addresses.",
        caption:
          "Right: the day’s facts: students, supervision, times, and the two stops with their addresses. Below them come the route from school with its measured drive, and the emergency departments with the drive from each stop; the school confirms which one the group uses.",
        source: "Field Trip Risk Assessment Pack 2026–27 · page 8 of 46 · A4 edition",
        open: { ...FTP_OPEN, page: 8 },
      },
    ],
    // The page-2 caption's second half; the lead is [draft], from the
    // caption's own words.
    excerptNote: {
      lead: "What in the example is real.",
      text: "The venues, addresses and emergency departments are real, and each drive is measured on real roads; the dates, class sizes and staff are illustrative.",
    },
    docs: [FTP_OPEN],
    links: [{ href: "/field-trip-package", label: "The Field Trip Package" }],
    description:
      "Illustrative case study with a fictional school, step 2 of 4: the Field Trip Package documents a year of elementary day trips at once, one page for each trip.",
  },

  {
    id: "conference-travel-package",
    number: 3,
    name: "Conference Travel Package",
    title: "One guide for the conference year",
    need: "Harborview’s teams and activity groups travel to other schools in its conference through the year, and Harborview hosts in turn. The Director of Athletics & Activities wants the coaches and advisors who travel with them to carry the same information for every host city.",
    receives: {
      title: "One guide for the conference year, in the school’s own name",
      paper: "In A4 and US Letter",
      // [draft] rows, from the reviewed receives line and the guide's
      // own contents page.
      parts: [
        { part: "The year", holds: "Each conference window, with its events, host schools and cities." },
        {
          part: "Information that applies to every trip",
          holds: "Entry and documents, health cover, and phones and money, settled once before the first trip.",
        },
        {
          part: "A chapter for every host city",
          holds: "Arriving, the hotels, medical, eating around the hotel, weather and contacts, in the same order, so the medical page is always in the same place.",
        },
        {
          part: "Items to confirm before travel",
          holds: "One line for each field or decision the school completes, initialed and dated when confirmed.",
        },
      ],
    },
    sends: [
      "The travel calendar the Director of Athletics & Activities publishes each August.",
      "For each trip: the dates, the teams and staff traveling, and the host school’s schedule.",
      "Flight numbers, room lists and staff phone numbers stay with the school, as fields it completes.",
    ],
    does: {
      title: "The research, the measuring, the writing",
      items: [
        "Reads the athletics and activities travel policy first, so the guide follows it: the Head Coach leads each team’s traveling party, students stay with host families the host school arranges at Conference tournaments, and activities travel uses hotels.",
        "Researches each host city once, from cited public sources on the research date: arrival by air and rail, emergency departments, clinics and pharmacies, emergency numbers, entry rules, and climate from the historical record.",
        "Measures the routes between the airport, the host school, where the group stays and the emergency departments, and lists the emergency departments by drive time, shortest first.",
        "Writes a chapter for each host city in the same order, and a page of items to confirm before travel.",
      ],
    },
    decides: [
      "The Director of Athletics & Activities approves all team and activity travel under the school’s policy.",
      "The school completes the fields marked for confirmation and confirms which emergency department each group uses.",
    ],
    otherSchool: "wexcombe",
    excerpts: [
      {
        image: "x-ctp-medical.jpg",
        width: 903,
        height: 744,
        pt: 260,
        textPt: 7.9,
        alt: "Two entries from the Paris medical page: Hôpital Cochin, the adult emergency department, 1.8 km and about 9 minutes by taxi from the host school; and the American Hospital of Paris, private, 8.4 km and about 36 minutes.",
        caption:
          "A host city’s medical page, Paris: each emergency department with the patients it takes, its address and hours, the drive from the host school and its telephone. The school confirms which one the group uses.",
        source: "Athletics and Activities Trips Guide 2026–27 · page 9 of 49 · A4 edition",
        open: { ...WEX_OPEN, page: 9 },
      },
      {
        image: "x-ctp-confirm.jpg",
        width: 903,
        height: 626,
        pt: 260,
        textPt: 7.9,
        alt: "The confirm-before-travel page, each line initialed and dated when confirmed: passports, EES registration, ETIAS status and the GHIC.",
        caption:
          "Items to confirm before travel: each line matches a field or decision elsewhere in the guide, and the school initials and dates it when confirmed.",
        source: "Athletics and Activities Trips Guide 2026–27 · page 48 of 49 · A4 edition",
        open: { ...WEX_OPEN, page: 48 },
      },
    ],
    docs: [WEX_OPEN],
    links: [{ href: "/conference-travel-package", label: "The Conference Travel Package" }],
    description:
      "Illustrative case study with a fictional school, step 3 of 4: the Conference Travel Package gives coaches one guide, with a chapter for every host city.",
  },

  {
    id: "trip-package",
    number: 4,
    name: "Trip Package",
    title: "One trip, from approval to feedback",
    need: `One of Harborview’s international trips is a cycling trip in Taiwan, the Sun Moon Lake Loop from the tour catalog of ${CYCLING_PROVIDER}, whose documents the review has already read. The Head of School needs the trip’s documents before approving it; the trip leader, chaperones, families and students each need theirs before the group leaves.`,
    receives: {
      title: "The Trip Package, decision by decision",
      paper: "Before, during and after the trip, in A4, Harborview’s paper, and US Letter",
      decisions: [
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
      note: {
        lead: "Day maps.",
        text: "For each riding day, a pocket route card for the teachers to carry, the full route pages in the Trip Leader Card, and an online version behind a password.",
      },
    },
    sends: [
      "The provider’s proposal and day-by-day itinerary.",
      "Booking confirmations for flights and places to stay.",
      "The group: numbers, grades and staff.",
      "The school’s existing trip documents, in their current form.",
      "The provider’s operating manual is already on file from the review.",
    ],
    does: {
      title: "The record, the research, the writing, the maps",
      items: [
        "Turns the itinerary supplied into a day-by-day record, hour by hour, and places each location it names on the map.",
        "Lists the emergency departments by drive time from each place in the itinerary where the group stays or rides, with each hospital’s published capability facts.",
        "Prepares the Trip Risk Working File, one section for each activity group, in support of whichever risk documentation the school uses.",
        "Writes the documents for families, the trip leader, chaperones, teachers and students.",
        "Maps each riding day and builds each document in A4, Harborview’s paper, and in US Letter.",
      ],
    },
    decides: [
      "The Head of School approves the trip, with the Board Chair notified, under the school’s trips policy.",
      "The school reviews, completes, amends and approves its risk documentation; the trip leader makes the live assessment during the trip.",
      "The school or the provider designates which emergency department the group uses.",
    ],
    otherSchool: "horizonRidge",
    excerpts: [
      {
        image: "x-tp-controls.jpg",
        width: 908,
        height: 619,
        pt: 261,
        textPt: 8.2,
        alt: "Controls and mitigations for a student separated from the group in a crowd, from the Trip Risk Working File for a trip to Italy: groups of five with their own chaperone, a regroup point and time named aloud, the rule taught on day one, free time only in threes, and the trip card every student carries.",
        caption:
          "The Trip Risk Working File, activity group G04, On Foot in Crowded Cities: the controls set out for a student separated from the group in a crowd. The school reviews them, determines the appropriate controls and level of risk, and completes and approves its chosen documents.",
        source: "Trip Risk Working File · page 13 of 29 · US Letter edition",
        open: { version: "italy", doc: "trip-risk-working-file", page: 13 },
      },
      {
        image: "x-tp-feedback.jpg",
        width: 901,
        height: 647,
        pt: 259,
        textPt: 8.5,
        alt: "The rules the Post-Trip Feedback Report follows: labeled scales, scales specific to each item, counts under every bar, groups under five responses suppressed, leaders and the provider as a named debrief, quotes as written, and welfare as a routed channel whose content is never coded, counted or quoted.",
        caption: "After the trip: the rules the Post-Trip Feedback Report follows, from the report’s last page.",
        source: "Post-Trip Feedback Report · page 6 of 6 · US Letter edition",
        open: { version: "italy", doc: "post-trip-feedback-report", page: 6 },
      },
    ],
    restOfYear: {
      title: "The rest of the year",
      // The reviewer's wording for the old "By email, when each moment comes".
      subtitle: "At each stage of the cycle",
      items: [
        {
          lead: "After each trip.",
          // The welfare line: the Post-Trip Feedback Report's own method
          // note ("a routed channel to the school's designated welfare
          // contact"; this report "records only that the channel was
          // available and was not used") and the rebuild repo's
          // src/feedback/instrument.py (the line goes to the school's
          // designated contact at submission; a report may record only
          // that the channel was used).
          text: "The school collects answers to four questions from students and families; the trip leaders and the provider answer them as a named debrief. ETI360 compiles the Post-Trip Feedback Report, with any group under five responses suppressed. Anything written on the welfare line goes to the school’s designated welfare contact when the form is submitted; the report records only whether that channel was used.",
        },
        {
          lead: "Each August.",
          text: "ETI360 prepares next year’s field-trip pack from the school’s new plans and this year’s pages; within a year, a trip that moves keeps its page.",
        },
        {
          lead: "Every four years.",
          text: "ETI360 opens the next Travel Program Review with a scoping conversation, where the school confirms its program paths, and reads its documents as they then stand.",
        },
      ],
      // From the report's page 6: "The three statements on page 2 say what
      // the answers show; what follows is the school's decision."
      decides:
        "The report sets out what the answers show; who sees it and what changes as a result are the school’s decisions.",
    },
    docs: [
      { version: "italy", doc: "trip-risk-working-file" },
      { version: "italy", doc: "post-trip-feedback-report" },
    ],
    links: [
      { href: "/trip-package", label: "The Trip Package" },
      { href: "/trips/italy", label: "The Italy trip, every document in US Letter and A4" },
    ],
    description:
      "Illustrative case study with a fictional school, step 4 of 4: the Trip Package prepares one trip’s documents, from approval to the post-trip feedback.",
  },
];

/** The overview's description (150 to 160 characters, no notices). [draft] */
export const OVERVIEW_DESCRIPTION =
  "An illustrative case study with a fictional school: how ETI360 prepares a travel program review, a field-trip pack, a conference guide and one trip’s documents.";

/** One line per step on the overview: what Harborview receives. [draft],
    from the reviewed year at a glance. */
export const STEP_RECEIVES: Record<ProductSlug, string> = {
  "travel-program-review": "The review of its whole program, with an evaluation of each provider’s documents",
  "field-trip-package": "The year’s day trips: one page per trip and a calendar for each month",
  "conference-travel-package": "One guide for the conference year, with a chapter for every host city",
  "trip-package": "The documents for one trip, before, during and after it",
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
  tiers: "What the tiers mean",
  illustrative: "Illustrative case study",
  need: "What Harborview needs",
  receives: "What Harborview receives",
  how: "How it works",
  conversation: "It starts with a conversation",
  moves: {
    sends: "What Harborview sends, by email",
    does: "What ETI360 does",
    decides: "What Harborview decides",
  },
  whoDecides: "Who decides",
  excerpts: "From the samples",
  docs: "Open the documents",
  onSite: "On this site",
  nextStep: "Next step",
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

export type OpenTarget = { version: Version; doc: VersionDocument; page?: number };

/** A version and document on the site; throws (failing the build) if
    either is no longer there. */
export function siteDocument(ref: { version: string; doc: string; page?: number }): OpenTarget {
  const version = requireVersion(ref.version);
  const doc = version.documents.find((d) => d.slug === ref.doc);
  if (!doc) throw new Error(`Case Study: ${ref.version} has no document "${ref.doc}"`);
  return { version, doc, page: ref.page };
}

/* Which fictional names a notice covers: a step carries the notice of every
   fictional school or provider it names, so a page reached on its own is as
   plain about what is invented as the overview. */
const NOTICE_NAMES: [string, string][] = [
  [NOTICES.cycling, CYCLING_PROVIDER],
  [NOTICES.orienteering, ORIENTEERING_PROVIDER],
];

/** The notices at the foot of a step: Harborview's always, then those of
    the providers the step names. Another school's notice is said once, in
    its note beside the excerpts. */
export function stepNotices(s: Step): string[] {
  const text = JSON.stringify(s);
  return [NOTICES.harborview, ...NOTICE_NAMES.filter(([, name]) => text.includes(name)).map(([n]) => n)];
}

// Fails the build if a description leaves its range, a step is out of
// order, or "does not certify, approve, rank or recommend" is said anywhere
// but once, in the Travel Program Review's provider row.
for (const d of [OVERVIEW_DESCRIPTION, ...STEPS.map((s) => s.description)]) {
  if (d.length < 150 || d.length > 160) {
    throw new Error(`Case Study: description is ${d.length} characters (150 to 160): ${d}`);
  }
}
STEPS.forEach((s, i) => {
  if (s.number !== i + 1) throw new Error(`Case Study: ${s.id} is numbered ${s.number} at position ${i + 1}`);
});
{
  const BOUNDARY = /does not certify, approve, rank or recommend/gi;
  const all = JSON.stringify([INTRO, WORK, LIFECYCLE, WHO_DECIDES_BOX, TIER_LINES, STEP_RECEIVES, STEPS]);
  const inRow = STEPS[0].receives.parts?.find((p) => p.part === "Provider evaluations")?.holds ?? "";
  if ((all.match(BOUNDARY) ?? []).length !== 1 || !BOUNDARY.test(inRow)) {
    throw new Error("Case Study: the provider boundary must appear once, in the Travel Program Review's provider row");
  }
}
