import { siteDocument } from "@/content/case-study";
import { TIER_NAMES, type TierKey, type TimelineImage } from "@/content/case-study-home";

/* MOCKUP (Dan, 2026-10-07: "Quick Mock up both A and C"). The Case Study
   home cut to five stages of the 360, each with its one-line problem, the
   real document covers it produces and the point pages inside it. Used by
   /case-study/mock-a (the 360 dial) and /case-study/mock-c (the fanned
   document desk). [draft] copy for Dan's markup. */

export type StageDoc = TimelineImage & { href: string; name: string };
export type StageLink = { label: string; href: string };
export type Stage = {
  id: string;
  n: number;
  label: string;
  tier: TierKey;
  tierName: string;
  line: string;
  docs: StageDoc[];
  links: StageLink[];
};

const page = (id: string) => `/case-study/${id}`;

function doc(version: string, slug: string, name: string, href: string): StageDoc {
  const d = siteDocument({ version, doc: slug }).doc;
  return { src: d.cover.src, width: d.cover.width, height: d.cover.height, alt: d.cover.alt, name, href };
}

const RAW: Omit<Stage, "n" | "tierName">[] = [
  {
    id: "before-the-year",
    label: "Before the year begins",
    tier: 1,
    line: "Harborview’s trip rules and trips sit in many places. We read them path by path and lay out the year in one guide.",
    docs: [
      doc("harborview-review", "travel-program-review", "Travel Program Review", page("understanding-the-program")),
      doc("harborview-travel-year-guide", "travel-year-guide", "Travel Year Guide", page("laying-out-the-year")),
      doc("harborview-trip-budgets", "trip-budgets", "Trip Budgets", page("laying-out-the-year")),
    ],
    links: [
      { label: "Understanding the program", href: page("understanding-the-program") },
      { label: "Laying out the year", href: page("laying-out-the-year") },
    ],
  },
  {
    id: "as-trips-are-planned",
    label: "As trips are planned",
    tier: 2,
    line: "Every trip arrives in its own format. We prepare each one the same way, from a week in Italy to the elementary day trips and the season’s fixtures.",
    docs: [
      doc("italy", "trip-risk-working-file", "Risk Assessment Report", page("preparing-each-trip")),
      doc("harborview-elementary", "field-trip-risk-assessment-pack", "Field Trip Risk Assessment Pack", page("preparing-for-field-trips")),
      doc("wexcombe-meridian", "athletics-activities-trips-guide", "Conference travel guide", page("preparing-for-sports-and-cultural-exchange-trips")),
    ],
    links: [
      { label: "Preparing each trip", href: page("preparing-each-trip") },
      { label: "Preparing for field trips", href: page("preparing-for-field-trips") },
      { label: "Preparing for sports and cultural exchange trips", href: page("preparing-for-sports-and-cultural-exchange-trips") },
    ],
  },
  {
    id: "before-each-departure",
    label: "Before each departure",
    tier: 2,
    line: "Families want one clear report, and trip leaders need each day laid out. We prepare both before the group leaves.",
    docs: [
      doc("italy", "family-trip-brief", "Student and Parent Trip Report", page("preparing-families")),
      doc("harborview-kyoto-visa", "japan-entry-and-visa-report", "Entry and visa report", page("preparing-families")),
      doc("italy", "trip-leader-card", "Trip Leaders Brief", page("preparing-trip-leaders")),
    ],
    links: [
      { label: "Preparing families", href: page("preparing-families") },
      { label: "Preparing trip leaders", href: page("preparing-trip-leaders") },
    ],
  },
  {
    id: "during-trips",
    label: "During trips",
    tier: 3,
    line: "Harborview runs its own incident reporting while groups are away. We help the school set it up before the year starts.",
    docs: [
      {
        src: "/marketing/case-studies/incident-reporting/incident-p1.jpg",
        width: 900,
        height: 1273,
        alt: "The first page of an incident report from Harborview’s incident reporting system",
        name: "Incident report",
        href: page("during-trips"),
      },
    ],
    links: [{ label: "During trips", href: page("during-trips") }],
  },
  {
    id: "when-groups-come-home",
    label: "When groups come home",
    tier: 3,
    line: "Records and feedback come back from every trip. They become the starting point for next year.",
    docs: [
      doc("italy", "post-trip-feedback-report", "Post Trip Report", page("after-the-trips")),
      doc("italy", "school-trip-record", "Off Campus Travel Report", page("after-the-trips")),
    ],
    links: [
      { label: "After the trips", href: page("after-the-trips") },
      { label: "The next year", href: page("the-next-year") },
    ],
  },
];

export const STAGES: Stage[] = RAW.map((s, i) => ({ ...s, n: i + 1, tierName: TIER_NAMES[s.tier] }));
