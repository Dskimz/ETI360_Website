/* The Case Study home (/case-study; Dan, 2026-10-07): the page copy and the
   tier names. The five stages and their documents live in
   src/content/case-study-stages.ts; each point's page in
   src/content/case-study-points.ts. Organized by the work, never by month.

   Voice: "we" for ETI360, professional Dan. Tier 3 is "Incident Reporting
   and Feedback" (Dan, 2026-10-07). [draft] throughout, for Dan's markup. */

export type TierKey = 1 | 2 | 3;

export const TIER_NAMES: Record<TierKey, string> = {
  1: "Tier 1 Organizational Readiness",
  2: "Tier 2 Trip Readiness",
  3: "Tier 3 Incident Reporting and Feedback",
};

export type CoverImage = { src: string; width: number; height: number; alt: string };

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
