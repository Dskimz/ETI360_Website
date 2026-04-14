export const homePage = {
  hero: {
    eyebrow: null,
    headline: "Structured governance documentation for international school trips.",
    subhead: "Decision-ready reports, traceable assessments, and operational tools — built for the person who signs off.",
    cta: { label: "Start a conversation", href: "/contact" },
    image: "/images/hero-home.png",
  },
  wedge: {
    eyebrow: "THE STARTING POINT",
    headline: "Trip Options Brief.",
    statement: "A one-page structured overview built for leadership approval decisions.",
    outputs: [
      "Activity risk scores across seven dimensions",
      "Provider credentials and location intelligence",
      "Identified gaps and assumptions",
      "Designed for the person who signs off — not the person who organized it",
    ],
    image: null, // Trip Options Brief PNG to be added
  },
  governanceCycle: {
    eyebrow: "THE GOVERNANCE CYCLE",
    headline: "Five stages. Each produces specific documents.",
    statement: "Schools adopt the stages they need.",
    stages: [
      { number: 1, label: "Planning & Assessment", active: true },
      { number: 2, label: "Risk & Operations", active: false },
      { number: 3, label: "Pre-Departure", active: false },
      { number: 4, label: "Live Operations", active: false },
      { number: 5, label: "Post-Trip Review", active: false },
    ],
  },
  audienceRouting: {
    schools: {
      eyebrow: "FOR SCHOOLS",
      statement: "Governance documentation for leadership teams.",
      outputs: [
        "Trip assessment and approval documentation",
        "Risk and compliance reporting",
        "Live operations oversight",
        "Post-trip review and governance archive",
      ],
      cta: { label: "Learn more", href: "/for-schools" },
    },
    providers: {
      eyebrow: "FOR TRIP PROVIDERS",
      statement: "Structured documentation that supports school governance requirements.",
      outputs: [
        "Normalized itineraries and risk documentation",
        "Compliance alignment and gap analysis",
        "Destination intelligence and provider credentials",
      ],
      cta: { label: "Learn more", href: "/for-providers" },
    },
  },
  documentShowcase: {
    eyebrow: "WHAT SCHOOLS RECEIVE",
    headline: "Decision-ready intelligence.",
    linkLabel: "See all documents",
    linkHref: "/what-we-do",
  },
  independence: {
    eyebrow: "INDEPENDENCE",
    statement: "ETI360 structures evidence. Schools make decisions.",
    outputs: [
      "Every assessment is traceable",
      "Every score is sourced",
      "Every document identifies the basis on which conclusions were reached",
      "ETI360 does not approve trips, certify providers, or guarantee outcomes",
    ],
  },
  cta: {
    headline: "Start with one trip.",
    body: "One set of documents. See what structured governance looks like for your institution.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
};
