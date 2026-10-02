/* The home page's copy (Dan, 2026-10-01, redesign brief
   dev/website-outputs/REDESIGN-PROMPT-2026-10-01.md in the rebuild repo):
   about 400 words, images over prose. The partnership in one paragraph and
   three points, the eight areas as document tiles (src/content/areas.ts), the
   travel year in six one-line phases, two case-study cards, who does the
   work, and one line to start a conversation. The earlier long copy is in
   the vault draft ETI360-Consulting-and-Partnership-Draft-2026-10 (revision
   2). No fee on the site: ETI360 scopes and prices each partnership case by
   case. The Travel Year Guide is a guide the school owns, with its own
   dates; never deadlines. */

export const PARTNERSHIP = {
  heading: "A partner for the whole travel program",
  lede: "ETI360 works with schools across the travel year, reviewing the program, preparing each trip and supporting staff while groups are away. The school keeps every decision and approval.",
  points: [
    "ETI360’s consultants have run travel programs inside schools.",
    "ETI360 takes no payment from trip providers, so its evaluation of each provider stays independent.",
    "The school keeps every document and record when its staff move on.",
  ],
};

export const AREAS_INTRO = {
  heading: "Where ETI360 helps",
  lede: "Each school chooses its areas, and every tile opens a real document.",
};

export const YEAR = {
  heading: "A travel year with ETI360",
  lede: "The school sets its own dates, and the Travel Year Guide keeps them in one place.",
  guide: { version: "harborview-travel-year-guide", doc: "travel-year-guide" },
  phases: [
    { title: "Review and planning", text: "ETI360 reviews the program and its policies with the school’s leadership." },
    { title: "Choosing the trips", text: "ETI360 evaluates the providers’ documents and sets out the budgets." },
    { title: "Preparing families", text: "ETI360 writes the entry requirements and the family reports." },
    { title: "Preparing the trips", text: "ETI360 prepares each trip’s reports and meets its leaders." },
    { title: "The trips", text: "Leaders carry their brief, and the school runs its own duty arrangements." },
    { title: "Feedback and reporting", text: "ETI360 gathers the feedback, and next year’s guide starts from it." },
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
      audience: "For US schools",
      // Dan, 2026-10-01: show it as coming; its trips open now.
      text: "ETI360 is preparing the US case study, and the school’s three trips open in full now.",
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
  ],
};

/** Who does the work, two lines each, from the approved bios (voice.ts). */
export const PEOPLE = {
  heading: "Who does the work",
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
};

export const START = {
  text: "A first conversation covers the school’s program and the trips it runs.",
  cta: "Start a conversation",
};
