import { STEPS, type Step } from "@/content/case-study";
import { tripGroup, whileItaly } from "@/content/case-study-trip";

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
  /** The tier's name; empty for a point outside the tiers (the hero shows
      no tier line). */
  tier: string;
  /** The tier number, for the lead-time box color. */
  tierNum: 1 | 2 | 3;
  description: string;
  problem: string[];
  did: string[];
  /** The documents, as a Step whose groups the cards render; a point with
      no documents of its own (During trips, The next year) leaves it out. */
  docs?: Step;
  docsNote?: string;
  /** Links under "What we did", for a point whose solution has its own page. */
  links?: { label: string; href: string }[];
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
  tierNum: 1,
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
  tierNum: 1,
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
  next: { label: "Preparing each trip", href: "/case-study/preparing-each-trip" },
};

const trip = STEPS.find((s) => s.id === "trip-package");
if (!trip) throw new Error("Case Study: the Individual Trip Reports step is missing");

/* Harborview's Queenstown set (Horizon Ridge's Italy set until the V3 import
   lands; src/content/case-study-trip.ts), the two documents that support the approval
   (Dan, 2026-10-07: "Build it now with the Italy documents"), with the
   other school's note and notice the step page already carries. The family
   report and the leader card belong to the next two points. */
const eachTripDocs: Step = {
  ...trip,
  groups: [
    tripGroup(trip.groups[0], ["off-campus-travel-report", "risk-assessment-report"], "risk-assessment-report"),
  ],
};

export const EACH_TRIP: PointPage = {
  id: "preparing-each-trip",
  label: "Preparing each trip",
  tier: "Tier 2 Trip Readiness",
  tierNum: 2,
  description:
    "How we prepare each of Harborview International School’s trips in the same format, with the groundwork for its risk assessment, before the school approves it.",
  problem: [
    "Each of Harborview’s trips arrives as a provider’s proposal, a day-by-day itinerary and a set of booking confirmations, each in its own format.",
    "Before the Head of School approves a trip, the school needs to see the whole trip in one place, with the risks of each activity laid out.",
  ],
  did: [
    "We turn the itinerary into a day-by-day record and place every location it names on a map. Where the itinerary leaves a gap, such as the hotel on day three or the route for a riding day, we go back to the provider and ask.",
    "We list the nearest emergency departments by drive time from each place the group stays, with what each one can treat.",
    "We prepare the groundwork for the school’s risk assessment, with one section for each activity group, so the school can review, complete and approve it.",
  ],
  docs: eachTripDocs,
  docsNote: whileItaly(
    "These two documents still carry their earlier names. The School Trip Record is now the Off Campus Travel Report, and the Trip Risk Working File is now the Risk Assessment Report.",
  ),
  decides: [
    "The Head of School approves the trip under the school’s trips policy.",
    "The school reviews, completes, amends and approves its risk assessment, and the trip leader makes the live assessment during the trip.",
    "The school or the provider designates which emergency department the group uses.",
  ],
  boundary: "We prepare the information and the groundwork, and Harborview makes every decision about the trip.",
  lead: "The best time to start is about six months before departure.",
  next: { label: "Preparing families", href: "/case-study/preparing-families" },
};

/* The family report from Harborview's trip set (case-study-trip.ts), with the other school's
   note the step page already carries, and Harborview's own Japan Entry and
   Visa Report for its Kyoto trip. The Visas note moves into the page's own
   copy, in "we". */
const visaGroup = trip.groups.find((g) => g.version === "harborview-kyoto-visa");
if (!visaGroup) throw new Error("Case Study: the Kyoto visa group is missing");

const familiesDocs: Step = {
  ...trip,
  groups: [
    tripGroup(trip.groups[0], ["student-and-parent-trip-report"], "student-and-parent-trip-report"),
    { ...visaGroup, note: undefined },
  ],
};

export const FAMILIES: PointPage = {
  id: "preparing-families",
  label: "Preparing families",
  tier: "Tier 2 Trip Readiness",
  tierNum: 2,
  description:
    "How we prepare the report Harborview International School sends to families, and the visa information some students need before they travel.",
  problem: [
    "Families want to know what to expect on the trip. They want it in one clear report rather than a series of emails.",
    "Some students need visas before they can travel, and each nationality has different rules.",
  ],
  did: [
    "We prepare the Student and Parent Trip Report in the school’s own name. It shows the days at a glance and sets out what families need to send back to the school.",
    "For Harborview’s Kyoto trip, we sorted the group by passport and set out which students and teachers need a visa for Japan.",
    "We wrote an email for each nationality, with the school letters each application needs.",
  ],
  docs: familiesDocs,
  docsNote: whileItaly(
    "The family document still carries its earlier name. The Family Trip Brief is now the Student and Parent Trip Report.",
  ),
  decides: [
    "The school sends the report to families under its own name.",
    "Families make the visa applications and pay for them.",
    "The Embassy of Japan decides each application.",
  ],
  boundary: "We prepare the information, and Harborview and its families make every decision and application.",
  lead: "The best time is three to six months before departure, ahead of the parent meeting.",
  next: { label: "Preparing trip leaders", href: "/case-study/preparing-trip-leaders" },
};

/* The leader brief from Harborview's trip set (case-study-trip.ts), with the other school's
   note the step page already carries. */
const leadersDocs: Step = {
  ...trip,
  groups: [
    tripGroup(trip.groups[0], ["trip-leaders-brief"], "trip-leaders-brief"),
  ],
};

export const TRIP_LEADERS: PointPage = {
  id: "preparing-trip-leaders",
  label: "Preparing trip leaders",
  tier: "Tier 2 Trip Readiness",
  tierNum: 2,
  description:
    "How we prepare the brief Harborview International School’s trip leaders carry, with each day laid out and what to do if something goes wrong.",
  problem: [
    "Harborview’s trip leaders are teachers. On a trip, their attention belongs with the students, and they have little time to search through documents.",
    "They need each day laid out in one place, with what to do if something goes wrong.",
  ],
  did: [
    "We prepare the Trip Leaders Brief from the same information as the trip reports. It gives one page for each day, with the plan for that day and what to do if something goes wrong. The chaperones receive the same brief.",
    "We do not meet trip leaders or run sessions with them. The brief carries what they need, so they can focus on the students.",
    "We talk to a teacher only when that teacher is the only source of information, for example on a trip that runs without a provider.",
  ],
  docs: leadersDocs,
  docsNote: whileItaly(
    "This document still carries its earlier name. The Trip Leader Card is now the Trip Leaders Brief, with one page for each day.",
  ),
  decides: [
    "The school sends the brief to its trip leaders.",
    "Trip leaders lead the trip and make the live assessment as conditions change.",
  ],
  boundary: "We prepare the brief, and Harborview and its trip leaders make every decision before and during the trip.",
  lead: "We prepare it with the trip reports and send the final version a few weeks before departure.",
  next: { label: "Preparing for field trips", href: "/case-study/preparing-for-field-trips" },
};

const fieldTrips = STEPS.find((s) => s.id === "field-trip-package");
if (!fieldTrips) throw new Error("Case Study: the Field Trip Reports step is missing");

/* Harborview's own pack, with the note on what the example reflects, and
   Firholm's, with the other school's note the step page already carries. */
const fieldTripDocs: Step = { ...fieldTrips };

export const FIELD_TRIPS: PointPage = {
  id: "preparing-for-field-trips",
  label: "Preparing for field trips",
  tier: "Tier 2 Trip Readiness",
  tierNum: 2,
  description:
    "How we prepare Harborview International School’s year of elementary day trips in one pack, with a page for each trip and a calendar for each month.",
  problem: [
    "Harborview’s elementary school runs many day trips through the year, to venues across Singapore.",
    "The school wants the same care for each one without a long document every time.",
  ],
  did: [
    "We prepare one pack for the school year, with a page for each trip and a calendar for each month.",
    "Each grade team sends us its venues, its class sizes and the adults going on each trip. We set out each trip with its date, its schedule and each stop.",
    "We measure the drive by road from each stop to Singapore’s public emergency departments.",
  ],
  docs: fieldTripDocs,
  decides: [
    "The school reviews, completes, amends as necessary, and approves each trip and its risk assessment.",
    "The school confirms which emergency department each group uses.",
  ],
  boundary: "We prepare the pack, and Harborview makes every decision about its day trips.",
  lead: "We recommend this before the school year starts.",
  next: {
    label: "Preparing for sports and cultural exchange trips",
    href: "/case-study/preparing-for-sports-and-cultural-exchange-trips",
  },
};

const conference = STEPS.find((s) => s.id === "conference-travel-package");
if (!conference) throw new Error("Case Study: the Conference Travel Reports step is missing");

/* Wexcombe's guide, with the other school's note the step page already
   carries. */
const conferenceDocs: Step = { ...conference };

export const SPORTS_EXCHANGE: PointPage = {
  id: "preparing-for-sports-and-cultural-exchange-trips",
  label: "Preparing for sports and cultural exchange trips",
  tier: "Tier 2 Trip Readiness",
  tierNum: 2,
  description:
    "How we prepare one guide for the season that Harborview International School’s coaches and sponsors carry, with a chapter for each host city.",
  problem: [
    "Harborview’s teams and activity groups travel to fixtures, tournaments and festivals through the year.",
    "The coaches and sponsors who travel with them need the same information for every trip.",
  ],
  did: [
    "We read the school’s athletics and activities travel policy first, so the guide follows it.",
    "We prepare one guide for the season, with a chapter for each host city in the same order. We research each city from cited public sources and list its emergency departments by drive time, shortest first.",
    "A page at the end of the guide lists the items the school confirms before each trip.",
  ],
  docs: conferenceDocs,
  docsNote: "Harborview’s own guide is in preparation.",
  decides: [
    "The Director of Athletics & Activities approves all team and activity travel under the school’s policy.",
    "The school completes the fields marked for confirmation and confirms which emergency department each group uses.",
  ],
  boundary: "We prepare the guide, and Harborview approves every trip and makes every decision while its groups travel.",
  lead: "We recommend this before the season or the event calendar starts.",
  next: { label: "During trips", href: "/case-study/during-trips" },
};

/* No document cards: the system is shown on its own case study page,
   /incident-reporting. The copy says the system is built to run in the
   school's Workspace and is installed there at handover, never that it
   runs there today (CLAUDE.md, Incident Reporting). */
export const DURING_TRIPS: PointPage = {
  id: "during-trips",
  label: "During trips",
  tier: "Tier 3 Incident Reporting and Feedback",
  tierNum: 3,
  description:
    "How we help Harborview International School set up its own incident reporting before the first trip, for the school to run while groups are away.",
  problem: [
    "When something happens on a trip, the school needs to record it properly and in one place.",
    "The school also wants to hear from its trip leaders while groups are away.",
  ],
  did: [
    "The school runs its own incident reporting while groups are away. We help set it up with the school’s IT before the first trip.",
    "The Educational Travel Incident Reporting System is built to run in the school’s own Google Workspace. It is installed there at handover.",
    "We take no part in decisions during a trip, and we have no contact with trip leaders while they are away. In an emergency, the school calls on its own risk and security advisers.",
  ],
  links: [{ label: "See the incident reporting case study", href: "/incident-reporting" }],
  decides: [
    "The school decides how incidents are reported and who receives each report.",
    "Trip leaders and the school’s own staff handle each incident as it happens.",
    "The school’s own risk and security advisers handle emergencies.",
  ],
  boundary: "We help build the system, and the school runs it and makes every decision while groups are away.",
  lead: "We set it up with the school before the first trip.",
  next: { label: "After the trips", href: "/case-study/after-the-trips" },
};

/* The feedback report from Harborview's trip set (case-study-trip.ts), with the other
   school's note the step page already carries. The Semester Board Report
   is in preparation and is not shown. */
const afterDocs: Step = {
  ...trip,
  groups: [
    tripGroup(trip.groups[0], ["post-trip-report"], "post-trip-report"),
  ],
};

export const AFTER_TRIPS: PointPage = {
  id: "after-the-trips",
  label: "After the trips",
  tier: "Tier 3 Incident Reporting and Feedback",
  tierNum: 3,
  description:
    "How we turn Harborview International School’s trip records and feedback into the Post Trip Report, and prepare a short report each semester for its Board.",
  problem: [
    "After each trip, the school wants to know what worked and what to change.",
    "Its Board wants a short account of the program each semester.",
  ],
  did: [
    "After each trip, we turn the records and feedback the school shares with us into the Post Trip Report. It becomes the starting point when the trip is planned again next year.",
    "If the school asks, we gather feedback from families as well.",
    "At the end of each semester, we prepare a Semester Board Report, which the school issues to its own Board. Harborview’s first report is in preparation.",
  ],
  docs: afterDocs,
  docsNote: whileItaly(
    "This document still carries its earlier name. The Post-Trip Feedback Report is now the Post Trip Report.",
  ),
  decides: [
    "The school decides what to change for the next trip.",
    "The school issues the Semester Board Report to its Board under its own name.",
  ],
  boundary: "We prepare the reports from what the school shares with us, and Harborview decides what changes.",
  lead: "We prepare these after each trip and at the end of each semester.",
  next: { label: "The next year", href: "/case-study/the-next-year" },
};

export const NEXT_YEAR: PointPage = {
  id: "the-next-year",
  label: "The next year",
  tier: "",
  tierNum: 1,
  description:
    "What changes in Harborview International School’s second year, from updated dates and risk documents to new trips and a second program review.",
  problem: [
    "The school wants to know what changes in year two, and how much of the first year’s work carries forward.",
  ],
  did: [
    "Year two is smoother, because most of the first year’s work carries forward.",
    "We update the dates and seasons, touch up the risk documents from what the school learned, and add new trips and providers.",
    "Trips can drift from their goals over time. Sometimes a trip goes back to the start.",
    "The program review runs again at the end of the first year, so the school can see what has changed.",
  ],
  decides: [
    "Harborview decides which trips continue, which change and which go back to the start.",
    "Harborview decides when to review the program again.",
  ],
  boundary: "We prepare the updates, and Harborview makes every decision about its program.",
  lead: "The best time to review the program again is the end of the first year.",
  next: { label: "The case study home", href: "/case-study" },
};
