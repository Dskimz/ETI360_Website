import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.medicalAccess;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 connects verified medical facilities and estimated access times to the locations in a school trip itinerary.",
  alternates: { canonical: "/for-schools/medical-access" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 verifies facility information and connects it to the places in the itinerary, giving trip staff and the duty team one location-by-location reference.",
  answerTitle: "The Medical Access Record",
  answerBody: "Verified facility details, mapped against the actual trip plan with estimated access information.",
  heroImage: "/marketing/hero/for-schools.jpg",
  planningLabel: "The location question",
  problemTitle: "Medical access becomes useful when it is connected to where the group will be.",
  problemCopy: [
    "A general destination hospital list does not show which facility relates to Tuesday’s activity, Thursday’s accommodation or a routed day outside the city center.",
    "ETI360 organizes the information around the itinerary. Each planned location can carry a consistent facility reference, estimated access time and the operational details available from verified sources.",
  ],
  proofEyebrow: "A location-based worked example",
  proofTitle: "Facility information organized for the places the trip actually uses.",
  proofCopy: "The record presents address and map access, operational profile, group suitability, emergency capability, accessibility and practical access information in one repeatable format.",
  stats: [
    ["3 facilities", "Worked example", "Presented consistently"],
    ["24/7", "Operating detail", "Where verified"],
    ["Location-led", "Trip context", "Connected to the itinerary"],
    ["1 format", "Shared reference", "For trip and duty teams"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/medical-access.png",
    width: 994,
    height: 1405,
    alt: "ETI360 Medical Access record with verified facility profiles, addresses, QR links and operational evaluations",
    caption: "A demonstration medical access record for the fictitious Harborview International School, using publicly available facility information. Facilities are verified and described, not recommended by ETI360.",
  },
  answersLabel: "What the record answers",
  answersTitle: "The same practical questions are answered for each relevant facility.",
  answersCopy: "A repeatable profile makes the information easier to compare and easier to use alongside the day, route or accommodation it supports.",
  answers: [
    { number: "01", title: "Which facility", body: "The facility is named with its address and a direct mapping reference." },
    { number: "02", title: "From where", body: "The record connects the facility to the itinerary locations for which it is relevant." },
    { number: "03", title: "How far", body: "Distance and estimated access information place the facility in practical context." },
    { number: "04", title: "What is known", body: "Verified operating, capability and accessibility information is presented consistently." },
  ],
  detailEyebrow: "The day-level view",
  detailTitle: "The map connects facilities to the schedule, not only to the destination.",
  detailCopy: "A Location Audit can show the planned stops, the time allocated to each and the facility reference associated with that part of the day. The team reads the access information in the context of the itinerary.",
  detailItems: [
    ["Locations", "The itinerary supplies the places that need to be considered."],
    ["Facilities", "Relevant facility details are checked against available sources."],
    ["Access", "Distance and estimated travel time are recorded for planning context."],
    ["Handover", "The same reference can be included in staff and duty-manager documents."],
  ],
  secondaryArtifact: {
    src: "/showcase/pages/02-2-location-audit/4.png",
    width: 1273,
    height: 1800,
    alt: "ETI360 Location Audit mapping six Tokyo itinerary stops and their associated medical access information",
    caption: "Location Audit: the day’s planned places, time allocation and associated facility access in one view.",
  },
  scopeTitle: "For itinerary locations where a verified reference adds practical value.",
  scopeCopy: "Medical access can be documented for accommodations, activities, day routes, remote stages and other planned locations. The depth follows the trip and the reliable information available.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "ETI360 verifies and presents available facility information; it does not recommend providers, guarantee capacity or travel times, make clinical judgments or replace local emergency services. Current conditions must be checked when the information is used.",
  widerTitle: "Medical access belongs beside the route and the itinerary.",
  widerCopy: "The Location Timeline shows when the group is scheduled to be somewhere. Route Intelligence shows how it moves. The Medical Access Record adds the relevant facility context to those same places.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Medical Access Record fits your program.",
};

export default function MedicalAccessPage() {
  return <SolutionReport data={data} />;
}
