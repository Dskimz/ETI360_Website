import type { TileDoc } from "@/content/areas";

/* The home page's copy (Dan, 2026-10-01, second pass: "less words on the
   homepage but link to learn more"). Order: what we do in one line with
   links, who we work with, the solutions as a sideways card row (Where
   ETI360 helps), Year-Round Travel Support as a second card row with each
   phase's documents, two case-study cards, About ETI360 as cards, and one
   line to start a conversation. Areas and their documents live in
   content/areas.ts. No fee on the site: ETI360 scopes and prices each
   partnership case by case. The Travel Year Guide is a guide the school
   owns, with its own dates; never deadlines. */

export const WHAT_WE_DO = {
  heading: "What we do",
  // Dan's line, 2026-10-01 ("solution" made plural).
  line: "ETI360 provides a full suite of customizable solutions to help schools with their educational travel programs.",
  links: [
    { href: "#solutions", label: "The solutions" },
    { href: "#year", label: "Year-round support" },
    { href: "/examples", label: "Every example" },
    { href: "/case-study", label: "The case study" },
  ],
};

export const WHO_WE_WORK_WITH = {
  heading: "Who we work with",
  groups: [
    {
      title: "International schools",
      text: "ETI360 works with international schools whose trips cross borders, from Week Without Walls to conference travel.",
      href: "/examples?schools=international",
      cta: "International examples",
    },
    {
      title: "Independent schools",
      text: "ETI360 works with independent and religious schools on day trips, overnight trips and travel abroad.",
      href: "/examples?schools=us",
      cta: "Independent school examples",
    },
  ],
};

export const SOLUTIONS_INTRO = {
  heading: "Where ETI360 helps",
  lede: "Each school determines the scope of the work.",
};

export const YEAR = {
  heading: "Year-round travel support",
  lede: "The school sets its own dates, and ETI360 prepares the documents each phase needs.",
  phases: [
    {
      title: "Review and planning",
      text: "ETI360 reviews the program and its policies with the school’s leadership.",
      docs: [
        { version: "harborview-review", doc: "travel-program-review" },
        { version: "harborview-travel-year-guide", doc: "travel-year-guide" },
      ] as TileDoc[],
    },
    {
      title: "Choosing the trips",
      text: "ETI360 evaluates the providers’ documents and sets out the budgets.",
      docs: [
        { version: "line-and-landmark-evaluation", doc: "provider-evaluation" },
        { version: "harborview-trip-budgets", doc: "trip-budgets" },
      ] as TileDoc[],
    },
    {
      title: "Preparing families",
      text: "ETI360 writes the entry requirements and the family reports.",
      docs: [
        { version: "harborview-kyoto-visa", doc: "japan-entry-and-visa-report" },
        { version: "italy", doc: "family-trip-brief" },
      ] as TileDoc[],
    },
    {
      title: "Preparing the trips",
      text: "ETI360 prepares each trip’s reports and meets its leaders.",
      docs: [
        { version: "washington-dc", doc: "school-trip-record" },
        { version: "washington-dc", doc: "trip-risk-working-file" },
      ] as TileDoc[],
    },
    {
      title: "The trips",
      text: "Leaders carry their brief, and the school runs its own duty arrangements.",
      docs: [
        { version: "washington-dc", doc: "trip-leader-card" },
        { version: "washington-dc", doc: "chaperone-briefing" },
      ] as TileDoc[],
    },
    {
      title: "Feedback and reporting",
      text: "ETI360 gathers the feedback, and next year’s guide starts from it.",
      docs: [{ version: "costa-rica", doc: "post-trip-feedback-report" }] as TileDoc[],
    },
  ],
};

export type CaseStudyCard = {
  school: string;
  place: string;
  audience: string;
  text: string;
  photo: { src: string; width: number; height: number; alt: string };
  href: string;
  cta: string;
  /** Shown as a tag while the case study is being written. */
  status?: string;
  /** Behind the incident case study's publishing hold (src/lib/incident-case-hold.ts). */
  incidentHold?: boolean;
};

export const CASE_STUDIES: { heading: string; cards: CaseStudyCard[] } = {
  heading: "Case studies",
  cards: [
    {
      school: "Harborview International School",
      place: "Singapore",
      audience: "For international schools",
      text: "The case study follows one partnership year, from the Travel Program Review to the reports after the trips.",
      photo: {
        src: "/marketing/case-studies/harborview-singapore.jpg",
        width: 800,
        height: 500,
        alt: "The Singapore skyline across Marina Bay.",
      },
      href: "/case-study",
      cta: "Read the case study",
    },
    {
      school: "Horizon Ridge School of Cleveland",
      place: "Ohio",
      audience: "For independent schools",
      // Dan, 2026-10-01: show it as coming; its trips open now.
      text: "ETI360 is preparing this case study, and the school’s three trips open in full now.",
      photo: {
        src: "/marketing/case-studies/horizon-ridge-cleveland.jpg",
        width: 800,
        height: 500,
        alt: "The Great Lakes Science Center on the Cleveland lakefront.",
      },
      href: "/examples?schools=us#trip-preparation",
      cta: "See the school’s trips",
      status: "In preparation",
    },
    {
      school: "Harborview International School",
      place: "Incident reporting",
      audience: "For international schools",
      text: "The system records incidents, an evening check-in and trip leaders’ feedback, and ETI360 installs it in the school’s own Google Workspace account.",
      photo: {
        src: "/marketing/case-studies/harborview-incident-nepal.jpg",
        width: 800,
        height: 500,
        alt: "Machapuchare at sunrise from Sarangkot, above Pokhara.",
      },
      href: "/incident-reporting",
      cta: "Read the case study",
      incidentHold: true,
    },
  ],
};

/** About ETI360 as cards: the two consultants, from the approved bios
    (voice.ts), and how ETI360 works. */
export const ABOUT = {
  heading: "About ETI360",
  people: [
    {
      name: "Dan Skimin",
      title: "Principal Consultant",
      photo: "/people/dan-navy.png",
      line: "Dan coordinated 600 programs for 12,000 students over 16 years, including as Interim Semester Coordinator at Singapore American School.",
    },
    {
      name: "Seb Wong",
      title: "Senior Consultant",
      photo: "/people/seb-navy.png",
      line: "Seb is Senior Manager of Safety, Security, and Operational Risk at Singapore American School, and he is part of every engagement.",
    },
  ],
  how: {
    title: "How ETI360 works",
    lines: [
      "ETI360 accepts no payment from trip providers and prepares each evaluation for the school’s review.",
      "The school retains its documents and records through staff transitions.",
      "The school retains decision authority and final approval.",
    ],
  },
};

export const START = {
  text: "A first conversation covers your school’s program and the trips it runs.",
  cta: "Contact",
};
