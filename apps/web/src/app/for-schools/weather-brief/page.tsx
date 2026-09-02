import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.weatherBrief;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 places fifteen years of destination climate history into the trip planning record.",
  alternates: { canonical: "/for-schools/weather-brief" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 turns the destination, dates and fifteen years of historical weather data into a concise planning brief—and makes the relevant risk information easier to adjust as the trip develops.",
  answerTitle: "The Weather Brief",
  answerBody: "Historical climate intelligence for each destination and departure window—not a forecast.",
  heroImage: "/marketing/hero/for-schools.jpg",
  planningLabel: "The planning question",
  problemTitle: "Seasonal knowledge becomes useful when it is specific to the trip.",
  problemCopy: [
    "A destination label such as ‘Sydney in March’ is too broad for practical planning. The trip team needs the pattern for its dates: temperatures, rainfall, daylight and the range that history shows.",
    "ETI360 prepares that context in the trip file, using a consistent source and format so likely conditions can be discussed alongside the itinerary and carried into the risk information prepared for the school’s review.",
  ],
  proofEyebrow: "A date-specific worked example",
  proofTitle: "Sydney in March, translated from climate history into planning context.",
  proofCopy: "The brief combines typical ranges, rain frequency, daylight, daily historical averages and recorded extremes. Plain-language notes connect the data to the trip without claiming to predict the weather.",
  stats: [
    ["15 years", "Historical period", "A consistent evidence base"],
    ["8 days", "Travel window", "Matched to trip dates"],
    ["21.7°C", "Average", "For this worked window"],
    ["12.3 hrs", "Daylight", "Available planning context"],
  ],
  primaryArtifact: {
    src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
    width: 1273,
    height: 1800,
    alt: "ETI360 Weather Brief for Sydney in March with fifteen-year temperature, rain and daylight analysis",
    caption: "A demonstration Weather Brief for a March travel window, prepared for the fictitious Harborview International School. Historical data guides planning; it does not guarantee conditions.",
  },
  answersLabel: "What the brief answers",
  answersTitle: "The data is selected for decisions a trip team can actually make.",
  answersCopy: "The page avoids a data dump. It surfaces a small set of patterns and explains what they mean for preparation, scheduling and the risk information connected to the trip.",
  answers: [
    { number: "01", title: "Temperature", body: "Typical ranges and recorded variation show the conditions the window has historically produced." },
    { number: "02", title: "Rain", body: "Historical frequency shows whether wet conditions should be expected in the plan." },
    { number: "03", title: "Daylight", body: "Sunrise, sunset and available daylight add context to the daily program." },
    { number: "04", title: "Risk information", body: "Relevant seasonal context can be carried into the trip’s risk documentation and adjusted when dates or activities change." },
  ],
  detailEyebrow: "How to read the page",
  detailTitle: "A climate brief informs the plan; it does not replace a forecast.",
  detailCopy: "Historical conditions are useful early, when the itinerary, preparation and risk information are still being shaped. Because the brief sits in the same trip record, a change of date, destination or activity can be reflected without starting the review again from scratch.",
  detailItems: [
    ["History", "The brief uses a defined multi-year period for the same destination and date window."],
    ["Pattern", "Averages and frequency describe what has been common, not what must occur."],
    ["Extremes", "Recorded highs and lows keep normal conditions in context."],
    ["Adjustment", "Relevant risk information can be refreshed as the itinerary or travel window changes."],
  ],
  detailPanel: {
    label: "The ETI360 standard",
    title: "Describe the evidence precisely.",
    body: "ETI360 calls this climate history, never a forecast. The distinction keeps the evidence useful for planning and risk review while remaining honest about what historical data can—and cannot—say.",
  },
  scopeTitle: "For trips where destination conditions shape preparation.",
  scopeCopy: "The Weather Brief can support international travel, outdoor programs, field trips and seasonal departures. Each brief is matched to the destination and the dates held in the trip record.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "Historical data is a guide, not a guarantee. ETI360 prepares relevant information for the school’s risk review; it does not forecast conditions, issue warnings, author the school’s final risk position or replace current checks before and during travel.",
  widerTitle: "Conditions become more useful when connected to the day.",
  widerCopy: "The Weather Brief sits beside the Location Timeline and Route Intelligence, allowing likely conditions to be considered against the places, timings and activities in the same trip file.",
  ctaTitle: "See the climate context for one upcoming trip.",
  ctaCopy: "Send the destination and dates for a trip already in planning. We will show how the historical conditions would be presented alongside the rest of the trip record.",
};

export default function WeatherBriefPage() {
  return <SolutionReport data={data} />;
}
