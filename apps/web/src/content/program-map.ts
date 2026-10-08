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
  /** The gold label in the hover box; the branch label when absent. */
  label?: string;
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
  /** Where the heading breaks, when it should break at a set place. */
  lines?: string[];
  /** One sentence in the heading's hover box; the school is the subject. */
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
    lines: ["Organizational", "Readiness"],
    purpose:
      "ETI360 reviews the school’s travel documentation and its providers’ procedures, so leadership can oversee the whole travel program.",
    branches: [
      {
        id: "school-program",
        label: "The school’s travel program",
        reports: [
          {
            name: "Travel Program Review",
            label: "School travel policies",
            overview:
              "ETI360 reviews the school’s travel policies and procedures for each type of trip against the ten areas of its Operational Capability Framework and shows where the documents are at standard, progressing or not yet evidenced.",
          },
          {
            name: "Travel Year Guide",
            label: "The year ahead",
            overview:
              "The guide sets the school’s trips and preparation on its own calendar, so leaders can plan and oversee the travel year.",
          },
          {
            name: "Trip Budgets",
            label: "The year ahead",
            overview:
              "Each trip’s costs are set out in the same format, so the school can compare trips and plan the year’s spending.",
          },
          {
            name: "Semester Board Report",
            label: "Board reporting",
            overview:
              "ETI360 summarizes the semester’s trips, risk documentation, incident record counts and Travel Program Review standing in a short report that the school issues to its Board.",
          },
        ],
        href: cs("understanding-the-program"),
      },
      {
        id: "trip-providers",
        label: "Trip providers",
        reports: [
          {
            name: "Trip Provider SOP Review",
            label: "Provider operating procedures",
            overview:
              "ETI360 reviews each provider’s documented standard operating procedures against the same ten areas and shows what is at standard, progressing or not evidenced.",
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: "Trip Readiness",
    short: "Trip",
    lines: ["Trip", "Readiness"],
    purpose:
      "ETI360 prepares each trip’s reports with the school and its provider, so everyone has what they need before departure and while the group is away.",
    branches: [
      {
        id: "itinerary",
        label: "Itinerary",
        reports: [
          {
            name: "Off Campus Travel Report",
            label: "Trip approval",
            overview:
              "ETI360 sets out who is going, where and when, the cost, the bookings and the flights in one record that the school uses to approve the trip.",
          },
        ],
        href: cs("preparing-each-trip"),
      },
      {
        id: "risk-reports",
        label: "Risk reports",
        reports: [
          {
            name: "Risk Assessment Report",
            label: "Risk reports",
            overview:
              "ETI360 organizes the itinerary facts, hazards, questions for the provider and nearest emergency care for each activity group, and the school and provider write, complete and approve the assessment.",
          },
          {
            name: "Duty Manager Trip Brief",
            label: "Duty manager",
            overview:
              "The brief gives the school’s duty holder the trip’s schedule, contacts and nearest hospitals, and ETI360 calls each number in the duty chain before departure to confirm that it connects.",
          },
        ],
        href: cs("preparing-each-trip"),
      },
      {
        id: "parent-documents",
        label: "Parent documents",
        reports: [
          {
            name: "Student and Parent Trip Report",
            label: "Families",
            overview:
              "Families receive one report that explains the trip and how to prepare for it, with the days at a glance, the letter home and the packing list.",
          },
        ],
        href: cs("preparing-families"),
      },
      {
        id: "trip-leaders",
        label: "Trip leaders",
        reports: [
          {
            name: "Trip Leaders Brief",
            label: "Trip leaders",
            overview:
              "Trip leaders and chaperones carry each day’s plan, contacts and emergency information on one page per day.",
          },
          {
            name: "Day maps",
            label: "Outdoor days",
            overview:
              "A mapped route for each outdoor day helps leaders plan and follow it, on a pocket card and a private online page.",
          },
        ],
        href: cs("preparing-trip-leaders"),
      },
      {
        id: "students",
        label: "Students",
        reports: [
          {
            name: "Educational Travel Fieldbook",
            label: "Students",
            overview:
              "Students use the fieldbook to connect each day’s places and activities to what they are learning.",
          },
        ],
      },
      {
        id: "other-trips",
        label: "Other types of trips",
        reports: [
          {
            name: "Field Trip Reports",
            label: "Day trips",
            overview:
              "One annual pack helps the school plan and prepare its year of day trips, with a page for each trip and a calendar for each month.",
          },
          {
            name: "Conference Travel Reports",
            label: "Athletics and activities",
            overview:
              "A season guide helps the school and its coaches plan and coordinate a conference’s athletics and activities travel.",
          },
        ],
        href: cs("preparing-for-field-trips"),
      },
    ],
  },
  {
    key: 3,
    name: "Incident Reporting and Feedback",
    short: "Incidents and Feedback",
    lines: ["Incident Reporting", "and Feedback"],
    purpose:
      "Staff record what happens on each trip, and the feedback informs how the school prepares the next one.",
    note: "Each trip’s feedback feeds next year’s Organizational Readiness.",
    branches: [
      {
        id: "incident-reports",
        label: "Incident reports",
        reports: [
          {
            name: "Incident Report System",
            label: "Incident reports",
            overview:
              "Staff record incidents the same way on every trip, from a phone, in a system built to run in the school’s own Google Workspace.",
          },
        ],
        href: cs("during-trips"),
      },
      {
        id: "feedback",
        label: "Feedback",
        reports: [
          {
            name: "Post Trip Report",
            label: "Feedback",
            overview:
              "The report gathers the leader’s notes and the feedback from students and families, so the school can review the trip and prepare the next one.",
          },
        ],
        href: cs("after-the-trips"),
      },
    ],
  },
];

/** The tier and branch a page or post sits on, for YouAreHere. */
export function findBranch(
  branchId: string,
): { tier: Tier; branch: Branch } | undefined {
  for (const tier of TIERS) {
    const branch = tier.branches.find((b) => b.id === branchId);
    if (branch) return { tier, branch };
  }
  return undefined;
}
