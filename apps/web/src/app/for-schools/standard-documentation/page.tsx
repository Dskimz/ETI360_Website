import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.standardDocumentation;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 gives different school trips one consistent documentation structure while preserving trip-specific content.",
  alternates: { canonical: "/for-schools/standard-documentation" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 gives every trip a consistent document structure while keeping the destinations, activities, timings, evidence and school decisions specific to that trip.",
  answerTitle: "One Trip Documentation System",
  answerBody: "A repeatable set of documents generated from one structured record for each trip.",
  heroImage: "/marketing/hero/for-providers.jpg",
  planningLabel: "The consistency question",
  problemTitle: "Different trips should not require a different way of reading the evidence.",
  problemCopy: [
    "A city program, ski trip and adventure itinerary contain different information. Leadership can still review each through the same sequence, terminology and document architecture.",
    "ETI360 normalises the source itinerary into one trip ledger, then produces the relevant documents from that record. The content changes with the trip; the way the school reads it remains familiar.",
  ],
  proofEyebrow: "Three different trips",
  proofTitle: "Tokyo, Hokkaido and Queenstown—one consistent calendar structure.",
  proofCopy: "The examples contain different dates, time zones, activities, movements and accommodation. Their shared format makes each day immediately legible without forcing the trip into generic content.",
  stats: [
    ["3 trips", "Different programs", "One worked comparison"],
    ["1 structure", "Calendar view", "Familiar across departures"],
    ["Trip-specific", "Evidence", "Never generic filler"],
    ["One ledger", "Source record", "Documents stay connected"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/std-documentation.png",
    width: 2532,
    height: 1171,
    alt: "Three ETI360 calendar views for Tokyo, Hokkaido and Queenstown using the same documentation structure",
    caption: "Three fictitious demonstration trips. The content changes; the ETI360 document structure remains consistent.",
  },
  answersLabel: "What standardization provides",
  answersTitle: "A common structure makes trip-specific information easier to read.",
  answersCopy: "Standardization is not sameness. It gives each reader a familiar route through the evidence while preserving what is unique about the program.",
  answers: [
    { number: "01", title: "Common sequence", body: "Each document places the same categories of information in a predictable order." },
    { number: "02", title: "Shared language", body: "Activities, movements, meals, free time and accommodation use consistent labels." },
    { number: "03", title: "Trip-specific detail", body: "Dates, places, activities, evidence and arrangements remain specific to the departure." },
    { number: "04", title: "Connected updates", body: "Changes enter the trip ledger once and can flow into the affected documents." },
  ],
  detailEyebrow: "The document in use",
  detailTitle: "Consistency makes the detailed page faster to understand.",
  detailCopy: "A coordinator or reviewer learns the document once, then reads the next trip without relearning the format. The calendar below remains detailed because the standard sits around the content, not in place of it.",
  detailItems: [
    ["Inputs", "Provider and school information can arrive in the form already held."],
    ["Structure", "ETI360 creates the trip ledger and identifies the documents that apply."],
    ["Outputs", "Calendar, timeline, location, risk and operating views share the same source."],
    ["Revision", "Updates can be issued consistently across the affected document set."],
  ],
  secondaryArtifact: {
    src: "/showcase/pages/02-1-calendar-view/2.png",
    width: 1273,
    height: 1800,
    alt: "Detailed ETI360 calendar view showing the structured itinerary for days five through eight of a Tokyo trip",
    caption: "One detailed calendar page: a consistent structure carrying trip-specific operating information.",
  },
  scopeTitle: "For schools managing different trips through one governance process.",
  scopeCopy: "The shared structure can support day trips, residential programs, international travel, expeditions and provider-led programs. Only the documents relevant to the trip need to be produced.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "ETI360 standardizes the structure and prepares the evidence. It does not make every trip identical, replace the school’s policies, approve the program or substitute its judgment for the school’s review and sign-off.",
  widerTitle: "Standard documentation is the system beneath every report.",
  widerCopy: "Route, location, weather, medical, communications and incident information become more useful when each appears in a familiar form and remains connected to the same trip record.",
  ctaTitle: "Compare two of your trips in one documentation system.",
  ctaCopy: "Send two itineraries in the formats you already hold. We will show how different programs can be structured consistently without losing their trip-specific detail.",
};

export default function StandardDocumentationPage() {
  return <SolutionReport data={data} />;
}
