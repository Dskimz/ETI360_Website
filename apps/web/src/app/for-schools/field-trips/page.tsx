import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.fieldTrips;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 lays out a school's one-day field trips as one set at the start of the year, so the preparation behind them happens once rather than trip by trip.",
  alternates: { canonical: "/for-schools/field-trips" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "The expedition gets months of planning. The short trips around it are each arranged in the fortnight before they run. ETI360 takes the year's field trips as one set, prepares them together, and issues each one its parent letter.",
  answerTitle: "Field Trip Register",
  answerBody: "Every one-day trip in one register — and a parent letter for each, carrying the day, the route and emergency access.",
  heroImage: "/marketing/hero/for-schools.jpg",
  planningLabel: "The planning question",
  problemTitle: "Field trips are planned one at a time, in the weeks before each one runs.",
  problemCopy: [
    "A single overseas expedition is visible from a long way off, and it gets planned accordingly. The short trips are different: there are many of them, each is small, and each is arranged close to its date. The venue is confirmed, the coach is booked, the letter goes home, the paperwork is assembled—then the same sequence starts again for next Thursday.",
    "ETI360 works from the other end. The year's field trips are laid out as one set, and the preparation they share is done together: locations confirmed, routes and journey times measured, the medical facilities named for each venue mapped with travel times, and the hazards and controls organized into structured working documents. The school reviews, completes and approves its own risk assessments—with the evidence already gathered and in one place.",
  ],
  proofEyebrow: "One trip out of the set",
  proofTitle: "A register is only worth what sits behind each row. This is one row.",
  proofCopy:
    "Each field trip produces the same single page: departure and return, the day hour by hour, the route from school with its measured journey time, and the emergency department the school has named for that area with its travel time from the venue. It goes out under the school's own name.",
  stats: [
    ["25", "Field trips", "Each with the same document"],
    ["1 page", "Per trip", "Day, route and emergency access"],
    ["50", "Maps", "A route and a hospital map per trip"],
    ["44", "Venues", "Confirmed once, reused across the set"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/field-trip-parent-letter.png",
    width: 1920,
    height: 2716,
    alt: "A field trip parent information letter: school crest and name, departure and return times, educational overview, hour-by-hour itinerary, a route map from school and a map to the nearest emergency department, notes for families and the trip coordinator",
    caption:
      "The letter carries the school's own branding, not ETI360's. A Harborview demonstration trip; Harborview International School is fictitious and no real school or student data is shown.",
  },
  answersLabel: "What preparing the set gives you",
  answersTitle: "The work that repeats is done once, before the term starts.",
  answersCopy:
    "Each trip still gets its own record, its own letter and its own approval. What changes is when the shared preparation happens, and how much of it has to be redone for the next trip.",
  answers: [
    {
      number: "01",
      title: "The year in view",
      body: "Every field trip in one register, so the term can be read and questioned before it begins rather than a week at a time.",
    },
    {
      number: "02",
      title: "Venues confirmed once",
      body: "A venue that appears in more than one trip is checked, measured and documented once, and that record serves every trip that visits it.",
    },
    {
      number: "03",
      title: "Evidence gathered up front",
      body: "Routes, journey times, the named emergency department for each area, hazards and controls organized into the structured documents the risk assessment draws on.",
    },
    {
      number: "04",
      title: "Same structure every time",
      body: "The trip in week two and the trip in week nine read the same way, for the teacher leading it and the office approving it.",
    },
  ],
  detailEyebrow: "The term in one view",
  detailTitle: "Behind the letters, the whole term reads as one register.",
  detailCopy:
    "Confirming a venue, measuring the journey, mapping the named emergency department and assembling the standing hazards and controls are the same tasks every time, repeated per trip because that is when they are needed. Prepared as a set, they are done once — and the term can be read and questioned before it starts rather than a week at a time.",
  detailItems: [
    ["Locations", "Each venue confirmed and documented once, then reused wherever it appears."],
    ["Movement", "Route and journey time measured for every departure, not estimated per trip."],
    ["Emergency access", "The department the school names for the area, mapped from the venue with its travel time."],
    ["Hazards and controls", "Organized per activity group, so the risk assessment starts from evidence."],
  ],
  secondaryArtifact: {
    src: "/Claude/Questions/assets/field-trip-register.png",
    width: 1921,
    height: 2798,
    alt: "ETI360 Field Trip Register: twenty-five one-day field trips for a term, each with date, trip name, venues, departure and return times",
    caption:
      "The register behind the letters: a term of field trips in date order. Preparing the set does not approve the set — each trip is still signed off on its own terms.",
  },
  scopeTitle: "For schools that run more short trips than long ones.",
  scopeCopy:
    "The register suits any program with a high number of one-day trips across the year—the museum visit, the nature reserve, the sports fixture, the gallery walk. It sits beside the trip file for longer expeditions rather than replacing it.",
  boundaryTitle: "Scope boundary",
  boundaryCopy:
    "ETI360 prepares and organizes the itinerary information, provider documentation, hazards, controls and supporting evidence. The school reviews, completes, amends as necessary and approves its own risk assessments. ETI360 does not approve or certify a trip, and preparing trips as a set does not change who is accountable for each one.",
  widerTitle: "Short trips and long trips read from the same record.",
  widerCopy:
    "A field trip prepared this way produces the same routes, historical conditions and medical access information as a two-week expedition, and appears in the same duty manager's view on the day it runs.",
  ctaTitle: "See a term of your own field trips in one register.",
  ctaCopy:
    "A 20-minute conversation about the field trips you have scheduled for one term is enough to see how they read as one register, and whether the approach fits your program.",
};

export default function FieldTripsPage() {
  return <SolutionReport data={data} />;
}
