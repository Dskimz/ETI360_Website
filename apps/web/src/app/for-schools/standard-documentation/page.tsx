import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.standardDocumentation;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 gives different school trips one consistent documentation structure while preserving trip-specific content.",
  alternates: { canonical: "/for-schools/standard-documentation" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "standard-documentation",
  question: "Do all of your trips use the same documentation format?",
  heroLine: "Standard Trip Documentation: a repeatable document set for each departure, with every destination, timing, and arrangement specific to that trip.",
  editorial: [
    "A city program, a ski trip, and an adventure itinerary carry different information, and they usually arrive formatted differently too. Each review starts with decoding a new layout before the content itself can be weighed.",
    "ETI360 normalizes each source itinerary into one structured trip record and generates the trip's documents from it. A coordinator who has read one program's documents reads the next — whatever its destination or season — without relearning the format.",
  ],
  spreadTitle: "Tokyo, Hokkaido, and Queenstown in one calendar format.",
  plates: [
    {
      src: "/Claude/Questions/assets/std-documentation.png",
      width: 2532,
      height: 1171,
      alt: "Three ETI360 calendar views for Tokyo, Hokkaido and Queenstown using the same documentation structure",
      label: "Three calendar views",
      note: "Different dates, time zones, and content; each category holds the same position on all three.",
    },
    {
      src: "/showcase/pages/02-1-calendar-view/2.png",
      width: 1273,
      height: 1800,
      alt: "Detailed ETI360 calendar view showing the structured itinerary for days five through eight of a Tokyo trip",
      label: "Tokyo calendar detail",
      note: "Days five through eight of the Tokyo program at full operating detail — the structure frames the content.",
    },
  ],
  disclosure: "Demonstration trips for Harborview International School, fictitious by design; no real school or student data is shown.",
  claims: [
    {
      lead: "Compare across trips",
      body: "Any day of one trip checks directly against the same day of another.",
    },
    {
      lead: "Shared vocabulary",
      body: "Activities, movements, meals, free time, and accommodation carry the same labels on every departure.",
    },
    {
      lead: "Entered once",
      body: "A revision enters the trip record once and carries through to every affected document.",
    },
    {
      lead: "Any trip shape",
      body: "Day trips, residential programs, international travel, and expeditions share the structure; only the documents relevant to each trip are produced.",
    },
  ],
  boundary: "ETI360 standardizes the structure and prepares the documents; the school's own review and sign-off — not the format — approve each trip.",
  promo: {
    title: "The system beneath every report",
    body: "The same trip record carries every other ETI360 view — location timeline, route intelligence, weather brief, medical access, and incident records — so each report on this site reads in a form you already know.",
  },
  stripLine: "Standard documentation is a Tier 2 solution, part of every Trip Risk Review.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether one documentation structure fits your program.",
};

export default function StandardDocumentationPage() {
  return <SolutionEvidence data={data} />;
}
