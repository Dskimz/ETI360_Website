import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.locationTimeline;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 turns a multi-day itinerary into calendar and timeline views built from one trip record.",
  alternates: { canonical: "/for-schools/location-timeline" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 converts the itinerary into two connected views: a detailed calendar for reading each day and a continuous timeline for seeing the whole trip from departure to return.",
  answerTitle: "Calendar + Timeline Views",
  answerBody: "Two ways to read the same structured itinerary, both generated from one trip ledger.",
  heroImage: "/marketing/hero/trip-approval.jpg",
  planningLabel: "The planning question",
  problemTitle: "A list of activities is not yet a continuous account of the trip.",
  problemCopy: [
    "Itineraries often describe the main events clearly while leaving transfers, breaks, free time and overnight periods in separate documents or implied between entries.",
    "ETI360 structures every scheduled block in sequence, then presents it as both a day-by-day calendar and a whole-trip timeline. The coordinator, trip leader and duty manager can choose the view they need without reconciling different versions.",
  ],
  proofEyebrow: "A complete five-day view",
  proofTitle: "One timeline shows the trip from airport arrival to departure gate.",
  proofCopy: "Accommodation, activity, transit and meal or break periods are differentiated without breaking the sequence. Unscheduled time remains visible rather than disappearing into a gap.",
  stats: [
    ["5 days", "Continuous view", "Arrival through departure"],
    ["2 views", "One itinerary", "Calendar and timeline"],
    ["24 hrs", "Every day", "Overnights included"],
    ["1 ledger", "Source record", "Used across the trip file"],
  ],
  primaryArtifact: {
    src: "/codex/MarketingCampaign/location-timeline.png",
    width: 2291,
    height: 1459,
    alt: "ETI360 Location Timeline showing accommodation, activities, transit and breaks across five days",
    caption: "A Harborview demonstration trip. Harborview International School is fictitious; no real school or student data is shown.",
  },
  answersLabel: "What the timeline answers",
  answersTitle: "The same itinerary can be read at two useful scales.",
  answersCopy: "The calendar carries the operating detail of each day. The timeline shows continuity across the trip. Both remain connected to the same source record.",
  answers: [
    { number: "01", title: "Calendar view", body: "Each day reads hour by hour, with activities, meals, movements, free time and overnight periods in place." },
    { number: "02", title: "Timeline view", body: "The full journey reads continuously across days, destinations and accommodation changes." },
    { number: "03", title: "Shared structure", body: "Both views use the same categories, times and locations from the trip ledger." },
    { number: "04", title: "Simple updates", body: "A change to the trip record can flow into both views without rebuilding the itinerary twice." },
  ],
  detailEyebrow: "The calendar view",
  detailTitle: "The timeline shows the trip. The calendar runs the day.",
  detailCopy: "The calendar view expands the same structured itinerary into readable day columns. The trip team can see exact timings, movements, free periods, meals and accommodation without losing the wider sequence.",
  detailItems: [
    ["Activities", "Every scheduled program block has a start, finish and place."],
    ["Movements", "Walking, coach, rail and air travel remain visible between activities."],
    ["Unscheduled", "Free time and breaks are recorded as real blocks rather than gaps."],
    ["Overnight", "The day continues through accommodation, lights-out and the next morning."],
  ],
  secondaryArtifact: {
    src: "/showcase/pages/02-1-calendar-view/2.png",
    width: 1273,
    height: 1800,
    alt: "ETI360 Itinerary Report calendar view showing four days hour by hour with activities, meals, transport, free time and accommodation",
    caption: "Calendar view: the same trip ledger expanded into the operating detail for each day.",
  },
  scopeTitle: "For every trip with a scheduled itinerary.",
  scopeCopy: "Calendar and Timeline views apply to day trips, residential programs, international travel and multi-stage expeditions. The level of detail follows the source itinerary the school and provider hold.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "The timeline records the planned location of the group. It is not live student tracking. During travel, the school’s own check-in and communication procedures confirm what is happening against the plan.",
  widerTitle: "Location is one part of a complete trip file.",
  widerCopy: "Routes, historical conditions and the duty manager’s operating view use the same trip context, so the school is not reconciling different versions of the journey.",
  ctaTitle: "See your itinerary as one continuous record.",
  ctaCopy: "Send an itinerary for a trip already in planning. We will show how its activities, movements, breaks and overnight stays would read in a structured trip file.",
};

export default function LocationTimelinePage() {
  return <SolutionReport data={data} />;
}
