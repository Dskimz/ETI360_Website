/* The two services the site sells (Dan, 2026-09-25): the Travel Program
   Review (Tier 1) and trip by trip (Tiers 2 and 3). One approach for every
   school: the same two doors on the home page and For Schools, with no
   separate pitch for international schools and US independent schools.
   Tier names follow the canon in CLAUDE.md. */

export const TIER_NAMES = {
  1: "Tier 1 Organizational Readiness",
  2: "Tier 2 Trip Readiness",
  3: "Tier 3 Live Trip Support and Review",
} as const;

export type Service = {
  name: string;
  tiers: string;
  body: string;
  link: { href: string; label: string };
};

export const SERVICES: Service[] = [
  {
    name: "The Travel Program Review",
    tiers: TIER_NAMES[1],
    body: "A review of the school's whole travel program. ETI360 reads the school's policies and procedures path by path, from overnight trips abroad to elementary day trips, athletics, and service programs, and records where each area stands. The review runs once every four years.",
    link: { href: "/framework#tier1", label: "See the sample review" },
  },
  {
    name: "Trip by trip",
    tiers: `${TIER_NAMES[2]} · ${TIER_NAMES[3]}`,
    body: "The documents for one trip, before, during, and after it: the file the school reviews and approves, what families read, what the trip leader and chaperones carry, and the report that closes the trip.",
    link: { href: "/trips", label: "See the worked trips" },
  },
];

/** Smaller doors under the two services. */
export const SERVICE_LINKS = [
  { href: "/trips?kind=day-trips", label: "Elementary day trips" },
  { href: "/for-providers", label: "For trip providers" },
];

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
    note: "The emergency department for each place, with the drive time, mapped before the group leaves; where a leg is by boat or on foot, the travel time.",
  },
  {
    title: "Improving next year's trip",
    note: "A short report after the trip, so next year's planning starts from what happened on this one.",
  },
];

/** The paper note (Dan, 2026-09-24: every document in US Letter and A4). */
export const PAPER_NOTE =
  "Every document is built to two paper sizes: US Letter (8.5 × 11 inches) and A4 (210 × 297 mm). Each trip page lists both editions of every document.";
