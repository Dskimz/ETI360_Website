import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.weatherBrief;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 places fifteen years of destination climate history into the trip planning record.",
  alternates: { canonical: "/for-schools/weather-brief" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "weather-brief",
  question: "Have historical seasonal conditions been reviewed against each location and date in the itinerary?",
  heroLine: "The Weather Brief sets fifteen years of destination climate history against the exact dates and locations of the trip.",
  editorial: [
    "Seasonal knowledge tends to arrive as a label — a city and a month — and a label is too broad to plan against. Preparation and daily scheduling turn on what conditions the trip's own dates have historically produced.",
    "The Weather Brief prepares that context in the trip file, with plain-language notes connecting each figure to the plan it sits beside. Recorded conditions get discussed alongside the itinerary rather than remembered from the last visit.",
  ],
  spreadTitle: "Sydney in March: one eight-day travel window, translated into planning context.",
  plates: [
    {
      src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
      width: 1273,
      height: 1800,
      alt: "ETI360 Weather Brief for Sydney in March with fifteen-year temperature, rain, and daylight analysis",
      label: "Weather Brief, Sydney in March",
      note: "The one-page brief a school receives: temperature bands, rain frequency, and daylight for one travel window.",
    },
  ],
  disclosure: "A demonstration Weather Brief prepared for Harborview International School — fictitious by design; no real school's documents are shown.",
  claims: [
    {
      lead: "Averages beside extremes",
      body: "The window's 21.7°C historical average is printed with recorded highs and lows around it — what has been common, never what must occur.",
    },
    {
      lead: "Daylight is program data",
      body: "Sunrise, sunset, and 12.3 hours of daylight — the hard limits a daily program has to fit inside.",
    },
    {
      lead: "One method throughout",
      body: "Every brief draws on the same defined historical period, source, and format, so conditions read consistently from one destination to the next.",
    },
  ],
  boundary: "The Weather Brief is climate history, never a forecast — it predicts nothing, issues no warnings, and replaces no current checks before or during travel.",
  promo: {
    title: "The brief moves with the trip",
    body: "Relevant seasonal context carries into the risk information prepared for the school's own review — and when dates, destination, or activities change, the brief is rebuilt against the new window rather than the review starting again from scratch.",
  },
  stripLine: "Part of the Tier 2 Trip Risk Review, beside Location Timeline and Route Intelligence.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Weather Brief fits your program.",
};

export default function WeatherBriefPage() {
  return <SolutionEvidence data={data} />;
}
