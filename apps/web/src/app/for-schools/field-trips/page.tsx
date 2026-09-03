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
  lead: "The expedition gets months of planning. The short trips around it are each arranged in the fortnight before they run. ETI360 takes the year's field trips as one set and prepares them together.",
  answerTitle: "Field Trip Register",
  answerBody: "Every one-day trip in one register, each prepared to the same structure.",
  heroImage: "/marketing/hero/for-schools.jpg",
  planningLabel: "The planning question",
  problemTitle: "Field trips are planned one at a time, in the weeks before each one runs.",
  problemCopy: [
    "A single overseas expedition is visible from a long way off, and it gets planned accordingly. The short trips are different: there are many of them, each is small, and each is arranged close to its date. The venue is confirmed, the coach is booked, the letter goes home, the paperwork is assembled—then the same sequence starts again for next Thursday.",
    "ETI360 works from the other end. The year's field trips are laid out as one set, and the preparation they share is done together: locations confirmed, routes and journey times measured, the medical facilities named for each venue mapped with travel times, and the hazards and controls organized into structured working documents. The school reviews, completes and approves its own risk assessments—with the evidence already gathered and in one place.",
  ],
  proofEyebrow: "One term, one register",
  proofTitle: "Twenty-five field trips, read in a single page rather than twenty-five folders.",
  proofCopy:
    "Every trip in the term with its date, venues and times, in the order it will happen. The pattern becomes visible: the same departure time, the same shape of day, and venues that recur across the term. What repeats can be prepared once and reused.",
  stats: [
    ["25", "Field trips", "Across a single term"],
    ["50", "Venue visits", "At 44 distinct locations"],
    ["6", "Venues", "Visited more than once"],
    ["1", "Register", "Every trip, one structure"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/field-trip-register.png",
    width: 1921,
    height: 2798,
    alt: "ETI360 Field Trip Register: twenty-five one-day field trips for a term, each with date, trip name, venues, departure and return times",
    caption:
      "A Harborview demonstration program. Harborview International School is fictitious; no real school or student data is shown.",
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
      body: "Routes, journey times, nearby medical facilities, hazards and controls organized into the structured documents the risk assessment draws on.",
    },
    {
      number: "04",
      title: "Same structure every time",
      body: "The trip in week two and the trip in week nine read the same way, for the teacher leading it and the office approving it.",
    },
  ],
  detailEyebrow: "Where the time goes",
  detailTitle: "Much of the work on a field trip is not specific to that field trip.",
  detailCopy:
    "Confirming a venue, measuring the journey, identifying the nearest hospital and assembling the standing hazards and controls are the same tasks each time, repeated per trip because that is when they are needed. Done as a set, they are done once and drawn on as the year runs.",
  detailItems: [
    ["Locations", "Each venue confirmed and documented once, then reused wherever it appears."],
    ["Movement", "Route and journey time measured for every departure, not estimated per trip."],
    ["Medical access", "The facilities the school or provider names, mapped against each venue with travel times."],
    ["Hazards and controls", "Organized per activity group, so the risk assessment starts from evidence."],
  ],
  detailPanel: {
    label: "What stays with the school",
    title: "The school approves every trip, one at a time.",
    body: "Preparing the set does not approve the set. Each field trip is still reviewed and signed off on its own terms, by the people accountable for it—with the supporting work already done.",
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
    "Send us the field trips you have scheduled for one term. We will prepare their structured trip files at no cost, so you can judge the work using your own program.",
};

export default function FieldTripsPage() {
  return <SolutionReport data={data} />;
}
