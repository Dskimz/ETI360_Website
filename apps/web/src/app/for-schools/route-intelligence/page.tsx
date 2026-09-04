import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.routeIntelligence;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "The ETI360 Route Intelligence Summary: the Big Itoshima cycling route — map, elevation, terrain, waypoints and access information in one measured record.",
  alternates: { canonical: "/for-schools/route-intelligence" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "route-intelligence",
  question: "Do you know the route, distance, elevation, and terrain for every routed activity?",
  heroLine: "One answer per route: the Route Intelligence Summary, a two-page record of the physical shape of the day.",
  editorial: [
    "An itinerary line reads “full-day cycling.” Between breakfast and dinner sit hours on open roads, and the person reviewing the trip has that one line to go on.",
    "The Route Intelligence Summary covers any activity with a route — cycling days, hikes, expedition stages, river corridors — and the depth of each record follows the activity and the source information behind it.",
  ],
  spreadTitle: "The Big Itoshima cycling loop, starting and ending at Chikuzen-Maebaru Station, Fukuoka.",
  plates: [
    {
      src: "/showcase/pages/02-3-itoshima-route/1.png",
      width: 1273,
      height: 1800,
      alt: "Big Itoshima cycling Route Intelligence page with the mapped loop, waypoints, nearest hospitals, and route metrics",
      label: "Page one — the map",
      note: "The whole day at a glance — the mapped route and the four figures that frame the ride.",
    },
    {
      src: "/showcase/pages/02-3-itoshima-route/2.png",
      width: 1273,
      height: 1800,
      alt: "Big Itoshima Route Intelligence page with elevation profile, waypoint register, and practical ride information",
      label: "Page two — working detail",
      note: "Elevation by distance, the waypoint register, terrain cover, seasonal context, and ride-day operating notes.",
    },
  ],
  disclosure: "Harborview International School is a fictitious demonstration school; no real school or student data is shown.",
  pdfHref: "/docs/route-intelligence.pdf",
  claims: [
    {
      lead: "Measured, with method",
      body: "Cumulative climb is computed with 5 m smoothing, and moving time at a stated pace plus a climb allowance — 18 km/h for a cycling day. The method travels with the figure.",
    },
    {
      lead: "Facilities tied to waypoints",
      body: "The nearest mapped medical facilities are linked to the waypoints they serve, each with an address, telephone number, and distance from the route.",
    },
    {
      lead: "A shared vocabulary",
      body: "Waypoints at fixed intervals — 10 km on this ride — give the school and the people operating the day one reference for timing, progress, and communication.",
    },
  ],
  boundary: "Route Intelligence supports the school's review of the activity; it does not certify or approve it.",
  promo: {
    title: "The recorded-dependency rule",
    body: "ETI360 analyzes available route data. When the definitive route can only come from the provider, the Summary records that dependency instead of filling the gap with an assumption — the school sees what is known and what is still pending.",
  },
  stripLine: "One route record, one part of the complete trip file ETI360 structures.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether Route Intelligence fits your program.",
};

export default function RouteIntelligenceProblemSolution() {
  return <SolutionEvidence data={data} />;
}
