/* Shared by the product pages (four-product site, 2026-09-25): the
   canonical tier names (CLAUDE.md), the decisions a trip's documents are
   tied to, and the paper note. The four products themselves live in
   products.ts. */

export const TIER_NAMES = {
  1: "Tier 1 Organizational Readiness",
  2: "Tier 2 Trip Readiness",
  3: "Tier 3 Incident Reporting and Feedback",
} as const;

/** The decisions a trip's documents are tied to, in the order a trip meets them. */
export const DECISIONS: { title: string; note: string }[] = [
  {
    title: "Approving the trip",
    note: "The record the school files and the Trip Risk Working File the school reviews, completes, and approves.",
  },
  {
    title: "Telling families",
    note: "What families need to know about the days away, in the school's own name.",
  },
  {
    title: "Preparing the leader and chaperones",
    note: "The card the trip leader carries and the briefing the chaperones read: the contacts, the day's plan, and the escalation path the school agreed.",
  },
  {
    title: "Connecting the trip to learning",
    note: "The purpose of each day, carried to the place and the hour it happens.",
  },
  {
    title: "Getting a student to care",
    // Tone review 2026-09-27: departments plural (hospital rule, N4 Option B).
    note: "The emergency departments for each place, listed with their drive times and mapped before the group leaves; where a leg is by boat or on foot, the travel time.",
  },
  {
    title: "Improving next year's trip",
    note: "A short report after the trip, so next year's planning starts from what happened on this one.",
  },
];

/** The paper note (Dan, 2026-09-24: every document in US Letter and A4). */
export const PAPER_NOTE =
  "Every document is built to two paper sizes: US Letter (8.5 × 11 inches) and A4 (210 × 297 mm). Each trip page lists both editions of every document.";
