export const homePage = {
  hero: {
    eyebrow: null,
    headline: "Structured intelligence for every stage of your trips.",
    subhead: "Decision-ready documents and operational tools for school leadership teams and trip providers.",
    cta: { label: "Start a conversation", href: "/contact" },
    image: "/images/hero-home.png",
  },
  wedge: {
    eyebrow: "THE STARTING POINT",
    headline: "The Trip Options Brief.",
    body: "A one-page structured overview of the proposed trip. Activity risk scores across seven dimensions. Provider credentials. Location intelligence. Identified gaps. Built for the person who signs off on the trip, not the person who organized it.\n\nOne trip. One document. The basis for an informed decision.",
    image: null, // Trip Options Brief PNG to be added
  },
  governanceCycle: {
    eyebrow: "THE GOVERNANCE CYCLE",
    headline: "Assessment is the starting point. Not the end.",
    body: "The Trip Options Brief is Stage 1. ETI360 operates as a five-stage governance cycle: assessment, risk documentation, pre-departure preparation, live operations, and post-trip review. Each stage produces specific documents. Schools adopt the stages they need.",
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
      body: "Governance documentation for leadership teams. From initial proposal assessment through live operations to post-trip review. Every document built for the person who signs off.",
      cta: { label: "Learn more", href: "/for-schools" },
    },
    providers: {
      eyebrow: "FOR TRIP PROVIDERS",
      body: "Structured documentation that moves proposals from evaluation to approval. Evidence that meets the governance requirements schools apply.",
      cta: { label: "Learn more", href: "/for-providers" },
    },
  },
  documentShowcase: {
    eyebrow: "WHAT SCHOOLS RECEIVE",
    headline: "Decision-ready intelligence, not another binder.",
    linkLabel: "See all documents",
    linkHref: "/what-we-do",
  },
  independence: {
    eyebrow: "INDEPENDENCE",
    body: "ETI360 structures evidence. Schools make decisions. Every assessment is traceable, every score is sourced, and every document identifies the basis on which conclusions were reached. ETI360 does not approve trips, certify providers, or guarantee outcomes.",
  },
  cta: {
    headline: "Start a conversation.",
    body: "Start with one trip. One set of documents. See what structured governance looks like for your institution.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
};
