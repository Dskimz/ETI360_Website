/* The Program Map (Dan's sketch, 2026-10-08; rulings D1–D3 the same day):
   the three tiers on one line with each tier's documents hanging below.
   One data file feeds both components: ProgramMap (the full map) and
   YouAreHere (the strip with one tier lit and the branch named under it).
   Tier 3 is "Incident Reporting and Feedback" (D1); the Trip Leaders Brief
   sits in Trip Readiness (D2). Branch labels are the plain nouns from the
   sketch; the reports run under them. Tier 1 holds two branches, the school
   and its providers, as in the sketch (Dan, 2026-10-08). */

export type TierKey = 1 | 2 | 3;

export type Report = {
  name: string;
  /** One sentence for the hover box; the school stays the decider. */
  overview: string;
};

export type Branch = {
  id: string;
  label: string;
  reports: Report[];
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
        reports: [{ name: "Travel Program Review", overview: "ETI360 reads the school’s travel policies path by path and shows what each area of the framework covers." }, { name: "Travel Year Guide", overview: "The guide lays out the school’s travel year on its own calendar and with its own dates." }, { name: "Trip Budgets", overview: "Each page budgets one trip, so the school can see the year’s costs side by side." }, { name: "Semester Board Report", overview: "The school issues this short report to its Board and Risk Committee each semester." }],
        href: cs("understanding-the-program"),
      },
      {
        id: "trip-providers",
        label: "Trip provider 1, 2, 3…",
        reports: [{ name: "Provider Evaluations", overview: "ETI360 evaluates the documents of each provider the school uses and shows what they cover, and the school decides." }],
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
        reports: [{ name: "Off Campus Travel Report", overview: "The report accounts for every day and hour of the itinerary, from departure to return." }],
        href: cs("preparing-each-trip"),
      },
      {
        id: "risk-reports",
        label: "Risk reports",
        reports: [{ name: "Risk Assessment Report", overview: "ETI360 prepares the information behind each activity group’s risk assessment, and the school writes and approves it." }, { name: "Duty Manager Trip Brief", overview: "The brief gives the duty holder the trip’s contacts and checks before departure that every number in the duty chain connects." }],
        href: cs("preparing-each-trip"),
      },
      {
        id: "parent-documents",
        label: "Parent documents",
        reports: [{ name: "Student and Parent Trip Report", overview: "Families receive one report with the days at a glance, the letter home and the packing list." }],
        href: cs("preparing-families"),
      },
      {
        id: "trip-leaders",
        label: "Trip leaders",
        reports: [{ name: "Trip Leaders Brief", overview: "Trip leaders and chaperones carry one page for each day of the trip." }, { name: "Day maps", overview: "Each mapped outdoor day gets a pocket route card and a private online version." }],
        href: cs("preparing-trip-leaders"),
      },
      {
        id: "students",
        label: "Students",
        reports: [{ name: "Educational Travel Fieldbook", overview: "Students follow the learning purpose of each day in their own fieldbook." }],
      },
      {
        id: "other-trips",
        label: "Other types of trips",
        reports: [{ name: "Field Trip Reports", overview: "One annual pack covers the school’s day trips, with a page for each trip and a calendar for each month." }, { name: "Conference Travel Reports", overview: "A season guide covers a conference’s athletics and activities travel." }],
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
        reports: [{ name: "Educational Travel Incident Reporting System", overview: "Staff report incidents from a phone into a system built to run in the school’s own Google Workspace or Microsoft 365." }],
        href: cs("during-trips"),
      },
      {
        id: "feedback",
        label: "Feedback",
        reports: [{ name: "Post Trip Report", overview: "The report gathers the leader’s notes and the feedback from students and families while the trip is still fresh." }],
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
