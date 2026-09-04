import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.medicalAccess;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 connects verified medical facilities and estimated access times to the locations in a school trip itinerary.",
  alternates: { canonical: "/for-schools/medical-access" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "medical-access",
  question: "Can your team see the medical facilities and travel times connected to each planned location?",
  heroLine: "The Medical Access Record connects verified facility details and estimated access times to each planned location in the itinerary.",
  editorial: [
    "A destination hospital list answers the wrong question. It names facilities for the city in general, not for Tuesday's activity, Thursday's accommodation, or a day routed outside the center — the places where the group will actually be when someone needs the answer.",
    "The record profiles each relevant facility in one repeatable format — address, operating detail, group suitability, emergency capability, accessibility, practical access — and files it against the accommodation, activity, day route, or remote stage it serves. Depth follows the trip and the information that can be relied on.",
  ],
  spreadTitle: "Three facility profiles, and the day view that reads access against the schedule",
  plates: [
    {
      src: "/Claude/Questions/assets/medical-access.png",
      width: 994,
      height: 1405,
      alt: "ETI360 Medical Access Record profiling three Tokyo hospitals with addresses, map links, and operational detail",
      label: "Medical Access Record",
      note: "Each profile carries a direct map link and detail such as pediatric readiness and English-language treatment experience.",
    },
    {
      src: "/showcase/pages/02-2-location-audit/4.png",
      width: 1273,
      height: 1800,
      alt: "ETI360 Location Audit day view pairing six Tokyo itinerary stops with named hospitals and access times",
      label: "Location Audit Day View",
      note: "One Tokyo trip day: six stops, each paired with a named hospital and access minutes.",
    },
  ],
  disclosure: "Demonstration artifacts for Harborview International School, fictitious by design — no real school's documents appear. Facility details are drawn from publicly available information.",
  claims: [
    {
      lead: "Named, then verified",
      body: "The school or trip provider names each facility; ETI360 verifies what is named. Operating detail appears in the record only where it could be confirmed.",
    },
    {
      lead: "Estimates, not promises",
      body: "Distance and access times are planning-context figures. The record cannot show current conditions — those are checked at the moment the information is used.",
    },
    {
      lead: "Stated in minutes",
      body: "Where a stop sits a long way from emergency care, the day view states it in minutes, visible before the group travels.",
    },
    {
      lead: "One shared reference",
      body: "The same record carries into staff and duty-manager documents, so the trip team and the duty team work from identical facility information.",
    },
  ],
  boundary: "ETI360 never recommends a hospital or clinic, never guarantees capacity, and makes no clinical judgment.",
  stripLine: "Location Timeline shows when, Route Intelligence shows how — medical access joins the same places.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Medical Access Record fits your program.",
};

export default function MedicalAccessPage() {
  return <SolutionEvidence data={data} />;
}
