import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.routeIntelligence;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "The ETI360 Route Intelligence Summary: the Big Itoshima cycling route — map, elevation, terrain, waypoints and access information in one measured record.",
  alternates: { canonical: "/for-schools/route-intelligence" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 turns an available route into a measured record: the map, distance, elevation, terrain, waypoints and relevant access information in one reviewable document.",
  answerTitle: "Route Intelligence Summary",
  answerBody: "A finished two-page output for every qualifying routed activity.",
  heroImage: "/images/itoshima-route-map.png",
  planningLabel: "The planning question",
  problemTitle: "A routed activity needs to be understood as a route.",
  problemCopy: [
    "A school reviewing a cycling, hiking or expedition day needs more than the activity name. It needs to see where the route goes, how long it is, how the terrain changes and what operational information sits along it.",
    "ETI360 brings those details into one consistent Route Intelligence Summary. The school can review the physical shape of the day, and the people operating it can use the same reference.",
  ],
  proofEyebrow: "A real worked example",
  proofTitle: "The Big Itoshima cycling route, shown as a complete operating day.",
  proofCopy: "The route begins and ends at Chikuzen-Maebaru Station in Fukuoka. The page combines the mapped loop, 10 km waypoints, nearest verified facilities and the four figures that frame the ride.",
  stats: [
    ["80.0 km", "Distance", "One coastal loop"],
    ["183 m", "Cumulative climb", "Measured with 5 m smoothing"],
    ["5.9%", "Steepest", "Short coastal section"],
    ["4 h 45", "Moving time", "At 18 km/h plus climb allowance"],
  ],
  primaryArtifact: {
    src: "/showcase/pages/02-3-itoshima-route/1.png",
    width: 1273,
    height: 1800,
    alt: "Big Itoshima cycling Route Intelligence page with the mapped loop, waypoints, nearest hospitals and route metrics",
    caption: "Page one of the ETI360 Route Intelligence Summary. Harborview International School is a fictitious demonstration school; no real school or student data is shown.",
  },
  answersLabel: "What the map answers",
  answersTitle: "The map is not decoration. It is a working index to the route.",
  answersCopy: "One visual connects the route geometry to shared waypoints and relevant facilities. The reader can see the whole day before moving into terrain, pacing and conditions.",
  answers: [
    { number: "01", title: "The route", body: "The complete 80 km loop is visible as a route, not simply named as a cycling activity." },
    { number: "02", title: "The waypoints", body: "Ten-kilometer markers create a shared reference for timing, progress and communication." },
    { number: "03", title: "Medical access", body: "Verified facilities are connected to relevant waypoints with addresses, telephone numbers and distance." },
    { number: "04", title: "The shape of the day", body: "Distance, climb, steepest section and estimated moving time are shown before the operational detail." },
  ],
  detailEyebrow: "The second page",
  detailTitle: "The map shows where. The profile explains how the route feels.",
  detailCopy: "Page two turns the same route into the working detail for review and ride-day preparation: elevation by distance, waypoint coordinates, terrain cover, seasonal context, pacing and practical operating notes.",
  detailItems: [
    ["Elevation", "The profile shows where the climbing occurs, not only the total."],
    ["Conditions", "Sun, terrain cover and seasonal context shape the preparation."],
    ["Waypoints", "Coordinates connect the map, route progress and communication."],
    ["Operations", "Contacts and ride-day notes place the analysis into use."],
  ],
  secondaryArtifact: {
    src: "/showcase/pages/02-3-itoshima-route/2.png",
    width: 1273,
    height: 1800,
    alt: "Big Itoshima Route Intelligence page with elevation profile, waypoint register and practical ride information",
    caption: "Page two: elevation, waypoints, terrain and preparation.",
  },
  scopeTitle: "For routed activities where the route itself matters.",
  scopeCopy: "Cycling days, hikes, expedition stages, river corridors and other activities with a defined route can carry Route Intelligence. The level of detail follows the activity and the source information available.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "ETI360 analyzes available route data. When the definitive route must come from the provider, ETI360 records that dependency instead of filling it with an assumption. Route Intelligence supports the school’s review; it does not certify or approve the activity.",
  widerTitle: "The route is one part of a complete trip file.",
  widerCopy: "ETI360 also structures timings, locations, accommodation, facilities, parent information and the operating view used while groups travel.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether Route Intelligence fits your program.",
};

export default function RouteIntelligenceProblemSolution() {
  return <SolutionReport data={data} />;
}
