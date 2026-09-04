import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.locationTimeline;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 turns a multi-day itinerary into calendar and timeline views built from one trip record.",
  alternates: { canonical: "/for-schools/location-timeline" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "location-timeline",
  question: "Where is every group meant to be, at every point in the trip?",
  heroLine: "ETI360 structures the itinerary into a day-by-day calendar and a continuous whole-trip timeline.",
  editorial: [
    "Most itineraries name the main events clearly. Everything between them — the transfer, the unstructured hour, the night itself — sits in separate documents or is implied between entries, so a coordinator reading the plan holds a list of activities, not a continuous account of the trip.",
    "ETI360 structures every scheduled block in sequence, covering all 24 hours of every day. One view carries the operating detail of each day; the other reads the whole journey across days, destinations, and accommodation changes. Coordinator, trip leader, and duty manager choose the scale they need, and a change to the trip record flows into both views at once.",
  ],
  spreadTitle: "Harborview's five-day trip, from airport arrival to departure gate.",
  plates: [
    {
      src: "/codex/MarketingCampaign/location-timeline.png",
      width: 2291,
      height: 1459,
      alt: "ETI360 Location Timeline showing accommodation, activities, transit, and breaks across five days",
      label: "Location Timeline",
      note: "Every block color-coded by category — transit and downtime read as clearly as the headline activities.",
    },
    {
      src: "/showcase/pages/02-1-calendar-view/2.png",
      width: 1273,
      height: 1800,
      alt: "ETI360 Itinerary Report calendar view showing four days hour by hour with activities, meals, transport, free time, and accommodation",
      label: "Calendar View",
      note: "Four days expanded hour by hour — activities, meals, transport, free time, and lights-out in day columns.",
    },
  ],
  disclosure: "A Harborview demonstration trip. Harborview International School is fictitious by design; no real school or student data is shown.",
  claims: [
    {
      lead: "Start, finish, place",
      body: "Every block in both views carries a start, a finish, and a named location, so any hour of the trip has an answer.",
    },
    {
      lead: "Follows the source",
      body: "Detail comes from the itinerary the school and provider hold. The same structure serves a day trip, a residential program, or a multi-stage expedition.",
    },
    {
      lead: "Confirmed by people",
      body: "During travel, the school's own check-in and communication procedures confirm what is happening against the plan.",
    },
    {
      lead: "Reused downstream",
      body: "Routes, historical conditions, and the Duty Manager Dashboard draw on the same trip context, so the school is not reconciling different versions of the journey.",
    },
  ],
  boundary: "The timeline records where each group is scheduled to be. It is not live student tracking.",
  stripLine: "Two of the working views inside the Tier 2 Trip Risk Review.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether these views fit your program.",
};

export default function LocationTimelinePage() {
  return <SolutionEvidence data={data} />;
}
