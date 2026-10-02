import type { Tier } from "@/content/products";
import { TIER_NAMES } from "@/content/services";

/* The eight areas of ETI360's work (Dan, 2026-10-01), shared by the home
   page's document tiles and the Examples library. Each area carries one line,
   its tier, the documents its home tile shows, and the document slugs the
   Examples library files under it. Tiers follow the redesign brief
   (dev/website-outputs/REDESIGN-PROMPT-2026-10-01.md in the rebuild repo):
   policies, budgets and providers are Tier 1; trip preparation, entry and
   families are Tier 2; leader preparation and reporting are Tier 3.

   Names: the trip documents still carry their pre-Sep-29 titles (School Trip
   Record, Trip Leader Card, Family Trip Brief, ...). The tiles label each
   area by its own name and show each document under the title it opens with,
   so a reader never meets a name the PDF does not carry. A rename pass will
   follow. */

export type AreaId =
  | "policies"
  | "budgets"
  | "providers"
  | "trip-preparation"
  | "entry"
  | "leaders"
  | "families"
  | "reporting";

/** One document a home tile shows: a version and document on the site, and
    an optional caption that replaces the document's title (the trip
    preparation tile names the three products). */
export type TileDoc = { version: string; doc: string; caption?: string };

export type Area = {
  id: AreaId;
  title: string;
  line: string;
  tier: Tier;
  tile: TileDoc[];
  /** Document slugs the Examples library files under this area. */
  docs: string[];
};

export const AREAS: Area[] = [
  {
    id: "policies",
    title: "Policies, procedures and goals",
    line: "ETI360 reviews the school's travel policies and maps its year of trips.",
    tier: 1,
    tile: [
      { version: "harborview-review", doc: "travel-program-review" },
      { version: "harborview-travel-year-guide", doc: "travel-year-guide" },
    ],
    docs: ["travel-program-review", "travel-year-guide"],
  },
  {
    id: "budgets",
    title: "Trip budgets",
    line: "ETI360 sets out each trip's costs in one format, so leadership can compare trips side by side.",
    tier: 1,
    tile: [{ version: "harborview-trip-budgets", doc: "trip-budgets" }],
    docs: ["trip-budgets"],
  },
  {
    id: "providers",
    title: "Trip providers",
    line: "ETI360 reviews what each provider's documents cover. The school decides which provider to use.",
    tier: 1,
    tile: [{ version: "line-and-landmark-evaluation", doc: "provider-evaluation" }],
    docs: ["provider-evaluation"],
  },
  {
    id: "trip-preparation",
    title: "Trip preparation",
    line: "ETI360 prepares the reports for each trip, day-trip year and team season.",
    tier: 2,
    tile: [
      { version: "costa-rica", doc: "trip-risk-working-file", caption: "Individual Trip Reports" },
      { version: "harborview-elementary", doc: "field-trip-risk-assessment-pack", caption: "Field Trip Reports" },
      { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide", caption: "Conference Travel Reports" },
    ],
    docs: [
      "school-trip-record",
      "trip-risk-working-file",
      "daylight-and-cover-report",
      "daylight-tide-and-exposure-report",
      "field-trip-risk-assessment-pack",
      "athletics-activities-trips-guide",
    ],
  },
  {
    id: "entry",
    title: "Entry requirements and travel documents",
    line: "ETI360 researches the published entry requirements for each passport in the group.",
    tier: 2,
    tile: [{ version: "harborview-kyoto-visa", doc: "japan-entry-and-visa-report" }],
    docs: ["japan-entry-and-visa-report"],
  },
  {
    id: "leaders",
    title: "Trip leader preparation",
    line: "ETI360 works through the day-by-day brief with each trip's leaders before they depart.",
    tier: 3,
    tile: [{ version: "washington-dc", doc: "trip-leader-card" }],
    docs: ["trip-leader-card", "chaperone-briefing"],
  },
  {
    id: "families",
    title: "Communication with families",
    line: "ETI360 prepares the information the school provides to families and students, in the school's name.",
    tier: 2,
    tile: [{ version: "italy", doc: "family-trip-brief" }],
    docs: ["family-trip-brief", "student-journey-guide", "educational-journey"],
  },
  {
    id: "reporting",
    title: "Feedback and reporting",
    line: "ETI360 gathers the feedback from each trip to support the following year's planning.",
    tier: 3,
    tile: [{ version: "costa-rica", doc: "post-trip-feedback-report" }],
    docs: ["post-trip-feedback-report"],
  },
];

/** The area a document slug is filed under; throws for an unfiled document,
    so a new document type fails the build until it has an area. */
export function areaOfDoc(slug: string): Area {
  const a = AREAS.find((x) => x.docs.includes(slug));
  if (!a) throw new Error(`Examples: document "${slug}" has no area in src/content/areas.ts`);
  return a;
}

/** The Examples address of an area. */
export function areaHref(id: AreaId): string {
  return `/examples#${id}`;
}

/** The tier tag on a tile: the canonical tier name. */
export const TIER_TAG = TIER_NAMES;

/** One card in the home page's solutions row (Dan, 2026-10-01: "the scroll
    like we have in the Washington DC page but with all the solutions"). */
export type SolutionCard = {
  key: string;
  area: Area;
  title: string;
  line: string;
  doc: TileDoc;
  href: string;
};

/* Trip preparation opens into its three products; every other area is one
   card. The product lines restate the approved product text briefly. */
const TRIP_PREP_CARDS: { title: string; line: string; tileIndex: number; anchor: string }[] = [
  {
    title: "Individual Trip Reports",
    line: "ETI360 prepares a consistently formatted set of reports for each trip, with the school and its provider.",
    tileIndex: 0,
    anchor: "individual-trips",
  },
  {
    title: "Field Trip Reports",
    line: "The lower school's day trips for the year sit in one pack, with a page for each trip.",
    tileIndex: 1,
    anchor: "field-trips",
  },
  {
    title: "Conference Travel Reports",
    line: "Coaches and staff who travel with the school's teams carry one guide for the season.",
    tileIndex: 2,
    anchor: "conference-travel",
  },
];

export const SOLUTION_CARDS: SolutionCard[] = AREAS.flatMap((a) =>
  a.id === "trip-preparation"
    ? TRIP_PREP_CARDS.map((c) => ({
        key: c.anchor,
        area: a,
        title: c.title,
        line: c.line,
        doc: a.tile[c.tileIndex],
        href: `/examples#${c.anchor}`,
      }))
    : [{ key: a.id, area: a, title: a.title, line: a.line, doc: a.tile[0], href: areaHref(a.id) }],
);
