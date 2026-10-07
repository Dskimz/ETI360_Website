import { siteDocument } from "@/content/case-study";

/* The Case Study home (/case-study; Dan, 2026-10-07): a timeline of one
   school's engagement with ETI360 (Dan: "a timeline of the engagement with
   maybe a line going down the middle with bubbles bouncing out with a card
   with a short very short overview of the issue and then a link to learn
   more. Maybe an image of the document."). One card per point in the
   school's process, organized by the work, never by month. Each card has
   two short sentences, an image of the point's document and a link to the
   point's page (src/content/case-study-points.ts).

   Voice: "we" for ETI360, professional Dan. Tier 3 is "Incident Reporting
   and Feedback" (Dan, 2026-10-07). [draft] throughout, for Dan's markup. */

export type TierKey = 1 | 2 | 3;

export const TIER_NAMES: Record<TierKey, string> = {
  1: "Tier 1 Organizational Readiness",
  2: "Tier 2 Trip Readiness",
  3: "Tier 3 Incident Reporting and Feedback",
};

export type TimelineImage = { src: string; width: number; height: number; alt: string };

export type Point = {
  id: string;
  label: string;
  tier: TierKey | null;
  /** Two very short sentences: the issue, then what we do. */
  short: string;
  image: TimelineImage | null;
  href: string;
};

function cover(version: string, doc: string): TimelineImage {
  const d = siteDocument({ version, doc }).doc;
  return { src: d.cover.src, width: d.cover.width, height: d.cover.height, alt: d.cover.alt };
}

export const HOME = {
  title: "Case Study: Harborview International School",
  description:
    "One school’s year with ETI360, from understanding its travel program to preparing each trip and looking back afterwards.",
  heading: "A year of school travel with Harborview International School",
  intro:
    "Follow one school’s year with us. Each step opens a page that shows the work and the documents Harborview received.",
  closing:
    "Harborview keeps every decision and every record, and the school reviews and approves the documents we prepare.",
};

const page = (id: string) => `/case-study/${id}`;

export const POINTS: Point[] = [
  {
    id: "understanding-the-program",
    label: "Understanding the program",
    tier: 1,
    short: "Harborview’s trip rules sit in nine documents. We read them one program path at a time.",
    image: cover("harborview-review", "travel-program-review"),
    href: page("understanding-the-program"),
  },
  {
    id: "laying-out-the-year",
    label: "Laying out the year",
    tier: 1,
    short: "Trips and costs arrive from many places. We put the year in one guide.",
    image: cover("harborview-travel-year-guide", "travel-year-guide"),
    href: page("laying-out-the-year"),
  },
  {
    id: "preparing-each-trip",
    label: "Preparing each trip",
    tier: 2,
    short: "Every trip arrives in its own format. We prepare each one the same way.",
    image: cover("italy", "trip-risk-working-file"),
    href: page("preparing-each-trip"),
  },
  {
    id: "preparing-families",
    label: "Preparing families",
    tier: 2,
    short: "Families want one clear report, and some students need visas.",
    image: cover("harborview-kyoto-visa", "japan-entry-and-visa-report"),
    href: page("preparing-families"),
  },
  {
    id: "preparing-trip-leaders",
    label: "Preparing trip leaders",
    tier: 2,
    short: "Trip leaders need each day laid out. We prepare a brief for every day.",
    image: cover("italy", "trip-leader-card"),
    href: page("preparing-trip-leaders"),
  },
  {
    id: "preparing-for-field-trips",
    label: "Preparing for field trips",
    tier: 2,
    short: "Day trips need the same care. One pack covers the whole year.",
    image: cover("harborview-elementary", "field-trip-risk-assessment-pack"),
    href: page("preparing-for-field-trips"),
  },
  {
    id: "preparing-for-sports-and-cultural-exchange-trips",
    label: "Preparing for sports and cultural exchange trips",
    tier: 2,
    short: "Teams and groups travel all season. Coaches get one guide for every trip.",
    image: cover("wexcombe-meridian", "athletics-activities-trips-guide"),
    href: page("preparing-for-sports-and-cultural-exchange-trips"),
  },
  {
    id: "during-trips",
    label: "During trips",
    tier: 3,
    short: "Harborview runs its own incident reporting, and we help set it up.",
    image: {
      src: "/marketing/case-studies/incident-reporting/incident-p1.jpg",
      width: 900,
      height: 1273,
      alt: "The first page of an incident report from Harborview’s incident reporting system",
    },
    href: page("during-trips"),
  },
  {
    id: "after-the-trips",
    label: "After the trips",
    tier: 3,
    short: "Records and feedback become next year’s starting point.",
    image: cover("italy", "post-trip-feedback-report"),
    href: page("after-the-trips"),
  },
  {
    id: "the-next-year",
    label: "The next year",
    tier: null,
    short: "Year two starts from everything the school already holds.",
    image: null,
    href: page("the-next-year"),
  },
];
