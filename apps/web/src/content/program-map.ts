/* The Program Map (Dan's sketch, 2026-10-08; rulings D1–D3 the same day):
   the three tiers on one line with each tier's documents hanging below.
   One data file feeds both components: ProgramMap (the full map) and
   YouAreHere (the strip with one tier lit and the branch named under it).
   Tier 3 is "Incident Reporting and Feedback" (D1); the Trip Leaders Brief
   sits in Trip Readiness (D2). Branch labels are the plain nouns from the
   sketch; the reports run under them. Tier 1 holds two branches, the school
   and its providers, as in the sketch (Dan, 2026-10-08). */

export type TierKey = 1 | 2 | 3;

export type Branch = {
  id: string;
  label: string;
  reports: string[];
  href?: string;
};

export type Tier = {
  key: TierKey;
  name: string;
  short: string;
  /** One sentence under the tier name; the school is the subject. */
  purpose: string;
  /** An optional closing line under the branches. */
  note?: string;
  branches: Branch[];
};

const cs = (slug: string) => `/case-study/${slug}`;

export const TIERS: Tier[] = [
  {
    key: 1,
    name: "Organizational Readiness",
    short: "Organization",
    purpose: "The school sets its travel policies and chooses its providers.",
    branches: [
      {
        id: "school-program",
        label: "The school’s travel program",
        reports: ["Travel Program Review, path by path", "Travel Year Guide", "Trip Budgets", "Semester Board Report"],
        href: cs("understanding-the-program"),
      },
      {
        id: "trip-providers",
        label: "Trip provider 1, 2, 3…",
        reports: ["One provider evaluation each"],
      },
    ],
  },
  {
    key: 2,
    name: "Trip Readiness",
    short: "Trip",
    purpose: "Each trip’s reports are prepared with the school and its provider.",
    branches: [
      {
        id: "itinerary",
        label: "Itinerary",
        reports: ["Off Campus Travel Report"],
        href: cs("preparing-each-trip"),
      },
      {
        id: "risk-reports",
        label: "Risk reports",
        reports: ["Risk Assessment Report", "Duty Manager Trip Brief"],
        href: cs("preparing-each-trip"),
      },
      {
        id: "parent-documents",
        label: "Parent documents",
        reports: ["Student and Parent Trip Report"],
        href: cs("preparing-families"),
      },
      {
        id: "trip-leaders",
        label: "Trip leaders",
        reports: ["Trip Leaders Brief", "day maps"],
        href: cs("preparing-trip-leaders"),
      },
      {
        id: "students",
        label: "Students",
        reports: ["Educational Travel Fieldbook"],
      },
      {
        id: "other-trips",
        label: "Other types of trips",
        reports: ["Field Trip Reports", "Conference Travel Reports"],
        href: cs("preparing-for-field-trips"),
      },
    ],
  },
  {
    key: 3,
    name: "Incident Reporting and Feedback",
    short: "Incidents and Feedback",
    purpose: "Staff record what happens, and each trip’s lessons shape the next.",
    note: "Each trip’s feedback feeds next year’s Organizational Readiness.",
    branches: [
      {
        id: "incident-reports",
        label: "Incident reports",
        reports: ["Educational Travel Incident Reporting System"],
        href: cs("during-trips"),
      },
      {
        id: "feedback",
        label: "Feedback",
        reports: ["Post Trip Report"],
        href: cs("after-the-trips"),
      },
    ],
  },
];

/** The tier and branch a page or post sits on, for YouAreHere. */
export function findBranch(branchId: string): { tier: Tier; branch: Branch } | undefined {
  for (const tier of TIERS) {
    const branch = tier.branches.find((b) => b.id === branchId);
    if (branch) return { tier, branch };
  }
  return undefined;
}
