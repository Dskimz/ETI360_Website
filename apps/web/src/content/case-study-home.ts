import { stepHref } from "@/content/case-study";

/* The Case Study home (/case-study; Dan, 2026-10-07, plan revision 3 in the
   rebuild repo: content/vault/Marketing/ETI360-Website-and-Case-Study-
   Plan-Rev3-2026-10.html). The case study is a series: this page walks
   through the points in a school's process where a need comes up, and each
   point links to the page that shows the solution. It is organized by the
   work, never by month (Dan: some trips run early in the year, so their
   work happens the year before); each point carries a recommended lead
   time instead.

   Build as needed (Dan, 2026-10-07): the home comes first; each point's
   page is built when its turn comes. A point with no page yet shows
   "Page in preparation". Pages that still show another school's example
   (Individual Trip Reports, sports and cultural exchange trips) say so.

   Voice: "we" for ETI360, professional Dan (docs/ETI360_TONE_AND_VOICE.md
   § Dan's Voice in the rebuild repo). Document names follow the Sep 29
   rulings. Tier 3 is "Incident Reporting and Feedback" (Dan, 2026-10-07).
   No prices, no invented quotes, outcomes or metrics. [draft] throughout,
   for Dan's markup. */

export type TierKey = 1 | 2 | 3;

export const TIER_NAMES: Record<TierKey, string> = {
  1: "Tier 1 Organizational Readiness",
  2: "Tier 2 Trip Readiness",
  3: "Tier 3 Incident Reporting and Feedback",
};

export type Point = {
  id: string;
  label: string;
  tier: TierKey | null;
  problem: string;
  prepared: string[];
  lead: string;
  href: string | null;
  /** A short line under the link when the page is not yet Harborview's own. */
  status?: string;
};

export const HOME = {
  title: "Case Study: Harborview International School",
  description:
    "How we work with Harborview International School across its travel program, from understanding the program to preparing each trip and looking back afterwards.",
  heading: "A year of school travel with Harborview International School",
  facts: [
    { label: "School", value: "Harborview International School, Singapore" },
    { label: "Program", value: "Six program paths" },
    { label: "Paper", value: "A4 and US Letter" },
  ],
  intro:
    "Harborview International School sends students off campus in several ways, from week-long international trips to elementary field trips and away fixtures. Whatever the trip, the same needs come up at the same points: understanding the program, laying out the year, preparing each trip with its families and leaders, and looking back afterwards. This case study follows Harborview through each of those points and shows what we prepared.",
  leadNote:
    "Some of Harborview’s trips run early in the school year, so their preparation happens in the year before. Each point gives a recommended lead time rather than a month.",
  closing:
    "Harborview keeps every decision and every record, and the school reviews and approves the documents we prepare.",
};

export const CYCLE: { label: string; text: string }[] = [
  {
    label: "Before the year begins",
    text: "We read your travel policies and your providers’ procedures side by side, so any gaps show up before a trip does.",
  },
  {
    label: "As trips are planned",
    text: "Each trip’s documents come together in the same format, and we go back to providers for what’s missing, like the hotel on day three or the route for the cycling day.",
  },
  {
    label: "Before each departure",
    text: "Families receive a clear report about the trip, and trip leaders receive a brief for every day.",
  },
  {
    label: "During trips",
    text: "Your school runs its own incident reporting, which we help you set up.",
  },
  {
    label: "When groups come home",
    text: "The records and feedback become next year’s starting point, and the year comes back around.",
  },
];

const TPR = stepHref({ id: "travel-program-review" });

export const POINTS: Point[] = [
  {
    id: "understanding-the-program",
    label: "Understanding the program",
    tier: 1,
    problem:
      "Harborview wants to know what its travel policies cover, one program path at a time, and whether its providers’ own procedures match them.",
    prepared: ["Travel Program Review", "Provider Evaluation"],
    lead: "We recommend this before the next year’s trips are planned.",
    href: TPR,
  },
  {
    id: "laying-out-the-year",
    label: "Laying out the year",
    tier: 1,
    problem:
      "The school wants every trip in one place with its own dates, and leadership wants to compare what each trip costs.",
    prepared: ["Travel Year Guide", "Trip Budgets"],
    lead: "We recommend this as trips are chosen, about a year ahead.",
    href: TPR,
  },
  {
    id: "preparing-each-trip",
    label: "Preparing each trip",
    tier: 2,
    problem:
      "Each trip’s information arrives in a different format, and the risks on each trip need identifying before the school approves it.",
    prepared: ["Individual Trip Reports", "Risk Assessment Report"],
    lead: "The best time to start is about six months before departure.",
    href: stepHref({ id: "trip-package" }),
    status: "This page shows another school’s trip while Harborview’s own trip is prepared.",
  },
  {
    id: "preparing-families",
    label: "Preparing families",
    tier: 2,
    problem:
      "Families want to know what to expect on the trip, and some students need visas before they can travel.",
    prepared: ["Student and Parent Trip Report", "Entry and Visa Report"],
    lead: "The best time is three to six months before departure, ahead of the parent meeting.",
    href: null,
  },
  {
    id: "preparing-trip-leaders",
    label: "Preparing trip leaders",
    tier: 2,
    problem: "Trip leaders need each day laid out, with what to do if something goes wrong.",
    prepared: ["Trip Leaders Brief"],
    lead: "We prepare it with the trip reports and send the final version a few weeks before departure.",
    href: null,
  },
  {
    id: "preparing-for-field-trips",
    label: "Preparing for field trips",
    tier: 2,
    problem:
      "The elementary school runs many day trips, and the school wants the same care for each one without a long document every time.",
    prepared: ["Field Trip Reports"],
    lead: "We recommend this before the school year starts.",
    href: stepHref({ id: "field-trip-package" }),
  },
  {
    id: "preparing-for-exchanges",
    label: "Preparing for exchanges",
    tier: 2,
    problem:
      "Harborview’s teams sometimes stay with host families at tournaments, and the school has no separate policy for exchanges and homestays yet.",
    prepared: [],
    lead: "We recommend starting before host families are matched.",
    href: null,
  },
  {
    id: "preparing-for-sports-and-cultural-exchange-trips",
    label: "Preparing for sports and cultural exchange trips",
    tier: 2,
    problem:
      "Harborview’s teams and activity groups travel to fixtures, tournaments and festivals through the year, and coaches and sponsors need the same information for every trip.",
    prepared: ["Conference Travel Reports"],
    lead: "We recommend this before the season or the event calendar starts.",
    href: stepHref({ id: "conference-travel-package" }),
    status: "This page shows another school’s guide while Harborview’s own is prepared.",
  },
  {
    id: "during-trips",
    label: "During trips",
    tier: 3,
    problem: "When something happens on a trip, the school needs to record it properly and in one place.",
    prepared: ["Educational Travel Incident Reporting System"],
    lead: "We set it up with the school before the first trip.",
    href: "/incident-reporting",
  },
  {
    id: "after-the-trips",
    label: "After the trips",
    tier: 3,
    problem:
      "The school wants to know what worked and what to change, and its Board wants a short account of the program.",
    prepared: ["Post Trip Report", "Semester Board Report"],
    lead: "We prepare these after each trip and at the end of each semester.",
    href: null,
  },
  {
    id: "the-next-year",
    label: "The next year",
    tier: null,
    problem:
      "The school wants to know what changes in year two. We update the dates and seasons, touch up the risk documents from what the school learned, and add new trips and providers.",
    prepared: [],
    lead: "The best time to review the program again is the end of the first year.",
    href: null,
  },
];
