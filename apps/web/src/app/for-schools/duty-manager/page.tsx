import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.dutyManager;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 gives a school duty manager one working view of active trips and their agreed context.",
  alternates: { canonical: "/for-schools/duty-manager" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 carries the school’s approved trip record into one operating view for the school’s own duty manager, with calls, check-ins, messages and updates tracked beside the trip context they relate to.",
  answerTitle: "The Duty Manager Dashboard",
  answerBody: "A working school-side view built from the context prepared before departure.",
  heroImage: "/marketing/hero/emergency-docs.jpg",
  planningLabel: "The operating question",
  problemTitle: "The trip file should remain usable after the group departs.",
  problemCopy: [
    "A duty manager may need to move between the itinerary, contact list, location information, messages and incident notes while monitoring several groups. The difficulty is not a lack of documents; it is the lack of one operating view.",
    "ETI360 brings the agreed trip context forward into the dashboard. The school’s duty manager operates it, records communications and updates, and follows the school’s own communication and escalation arrangements.",
  ],
  proofEyebrow: "The active-trip view",
  proofTitle: "Six trips, with communications connected to the trip they belong to.",
  proofCopy: "The dashboard keeps the trip list, selected trip context, location, check-ins, messages, contacts, calls, flags and incident entry in one interface. Communications remain part of the operating record rather than sitting in an unconnected side channel.",
  stats: [
    ["6 trips", "Portfolio view", "Active travel in one list"],
    ["1 record", "Communications", "Calls, messages and check-ins"],
    ["Time-stamped", "Operating log", "Updates in sequence"],
    ["School-led", "Duty role", "Operated by your own staff"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/scheduled-group-locations.png",
    width: 1280,
    height: 800,
    alt: "ETI360 Duty Manager Dashboard showing six current trips, the selected trip's context and scheduled location, today's schedule, messages, and the next four hours across every trip",
    caption: "The ETI360 Duty Manager Dashboard. The examples are fictitious and contain no real school or student data.",
  },
  answersLabel: "How communications stay on the record",
  answersTitle: "Each communication remains connected to the trip context.",
  answersCopy: "The dashboard supports the school’s existing communication channels while creating one chronological view of what was received, recorded and followed up.",
  answers: [
    { number: "01", title: "Check-ins", body: "Routine confirmations are recorded against the active trip and its current operating context." },
    { number: "02", title: "Messages", body: "Relevant messages and updates remain visible in the selected trip’s history." },
    { number: "03", title: "Calls", body: "Call notes can be time-stamped and associated with the person, trip and subject." },
    { number: "04", title: "Follow-up", body: "Flags, actions and subsequent communications build one chronological operating record." },
  ],
  detailEyebrow: "The record behind the screen",
  detailTitle: "A communication is more useful when its context travels with it.",
  detailCopy: "The dashboard is the operating surface of a wider trip file. The itinerary, locations, contacts and agreed procedures sit beside the communication record, so an update can be read against what was planned and what happened next.",
  detailItems: [
    ["Context", "The trip’s dates, locations, program and contacts are already structured."],
    ["Capture", "Calls, messages and check-ins can be recorded in a common format."],
    ["Sequence", "Time stamps show the order of updates and follow-up actions."],
    ["Continuity", "The communication history remains associated with the trip after it closes."],
  ],
  secondaryArtifact: {
    src: "/Claude/Questions/assets/duty-overview.png",
    width: 1280,
    height: 551,
    alt: "ETI360 Duty Manager Dashboard duty overview: students traveling, active trips, open incidents, active alerts and overdue check-ins across every current trip",
    caption: "The duty overview across all current trips: who is traveling, which trips are active, and whether check-ins are on schedule. The examples are fictitious and contain no real school or student data.",
  },
  scopeTitle: "For schools monitoring one or many active trips.",
  scopeCopy: "The dashboard supports the school’s nominated duty manager during travel and can be rehearsed before departure through a facilitated simulation using one of the school’s own trips.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "ETI360 provides the operating view. It does not monitor trips on the school’s behalf, make escalation decisions or replace emergency services. The school operates the dashboard under its own roles and procedures, and it shows the planned picture for each group — never live tracking of students.",
  widerTitle: "The operating view depends on the planning record.",
  widerCopy: "Location, route and condition information become more useful when they remain connected to the itinerary, contacts and agreed procedures the duty manager receives.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Duty Manager Dashboard fits your program.",
};

export default function DutyManagerPage() {
  return <SolutionReport data={data} />;
}
