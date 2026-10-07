import { STEPS, type Step } from "@/content/case-study";

/* The Case Study's point pages (Dan, 2026-10-07: "build as needed"), one per
   point on the Case Study home (src/content/case-study-home.ts), each told
   as the problem, what we did, what Harborview received, what Harborview
   decides and the recommended lead time. Voice: "we" for ETI360,
   professional Dan. The documents reuse the step pages' cards, so the same
   samples and notices appear on both. [draft] throughout, for Dan's
   markup. */

export type PointPage = {
  id: string;
  label: string;
  tier: string;
  description: string;
  problem: string[];
  did: string[];
  /** The documents, as a Step whose groups the cards render. */
  docs: Step;
  docsNote?: string;
  decides: string[];
  boundary: string;
  lead: string;
  next: { label: string; href: string | null };
};

const tpr = STEPS.find((s) => s.id === "travel-program-review");
if (!tpr) throw new Error("Case Study: the Travel Program Review step is missing");

/* The review and the Line & Landmark evaluation only; the Travel Year Guide
   and the budgets belong to the next point, "Laying out the year". The
   provider line moves into the page's own copy, in "we". */
const understandingDocs: Step = {
  ...tpr,
  groups: tpr.groups.slice(0, 2).map((g) => ({ ...g, note: undefined })),
};

export const UNDERSTANDING: PointPage = {
  id: "understanding-the-program",
  label: "Understanding the program",
  tier: "Tier 1 Organizational Readiness",
  description:
    "How we read Harborview International School’s travel policies one program path at a time, along with the documents of the providers it uses.",
  problem: [
    "Harborview runs trips on six program paths, from international trips and Week Without Walls to elementary day trips, athletics and service learning. Its travel rules sit across nine documents, from the trips policy to the service learning guidelines, and its two trip providers each have their own documents.",
    "Before planning the year, the leadership team wanted to know what all of it covers, one path at a time, and whether the providers’ procedures match the school’s own.",
  ],
  did: [
    "We started with a conversation with the leadership team about which program paths and providers to include. Then we sent one email listing the documents we needed.",
    "We read every document in full and recorded what each one says, with its section and page, so anyone can check it. We read each program path, and each provider’s documents, against the ten areas of the ETI360 Operational Capability Framework.",
    "Where a path has no document, the review says so plainly rather than filling the gap. Harborview’s exchange and homestay path is one of them.",
  ],
  docs: understandingDocs,
  docsNote:
    "The review covers both of Harborview’s providers, Line & Landmark Cycle Travel and Northmark Orienteering. Line & Landmark’s evaluation is shown here as a sample edition, with its own date and no school named, and the orienteering provider’s is not included in this example.",
  decides: [
    "Harborview chose the program paths in scope and the providers to include.",
    "Harborview decides which findings to address first, and how.",
  ],
  boundary:
    "We show what each provider’s documents cover, and we never certify, approve, rank or recommend a provider. Harborview keeps every decision.",
  lead: "We recommend this before the next year’s trips are planned, because everything else in the year builds on it.",
  next: { label: "Laying out the year", href: "/case-study/laying-out-the-year" },
};

/* The Travel Year Guide and the trip budgets, without the step page's
   notes (the page says the same in its own copy, in "we"). */
const layingOutDocs: Step = {
  ...tpr,
  groups: tpr.groups.slice(2, 4).map((g) => ({ ...g, note: undefined })),
};

export const LAYING_OUT: PointPage = {
  id: "laying-out-the-year",
  label: "Laying out the year",
  tier: "Tier 1 Organizational Readiness",
  description:
    "How we set out Harborview International School’s year of trips in one guide, and each trip’s budget in one format.",
  problem: [
    "Once Harborview knew what its policies covered, the next question was the year itself. Its trips were planned in different places, and each trip’s costs arrived in a different form, from provider quotes to flight bookings.",
    "Leadership wanted the whole year in one place, and a way to compare what each trip costs.",
  ],
  did: [
    "We prepared Harborview’s Travel Year Guide. It sets out the school’s year of trips in six phases and names the people each phase involves. The school sets the dates and changes them as the year moves, and the guide sets no deadlines.",
    "We set out the budget for each of Harborview’s 35 March trips in one format, from the provider’s cost and flights to GST and card fees, so leadership can compare the trips side by side.",
  ],
  docs: layingOutDocs,
  decides: [
    "Harborview sets the dates for every phase and changes them as the year moves.",
    "Harborview decides which trips run and sets what each one costs families.",
  ],
  boundary: "We prepare the guide and the budgets, and Harborview owns both. The school makes every decision about its year.",
  lead: "We recommend this as trips are chosen, about a year ahead.",
  next: { label: "Preparing each trip", href: null },
};
