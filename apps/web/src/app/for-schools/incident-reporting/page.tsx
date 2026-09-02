import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.incidentReporting;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 connects incident details, communications, actions, status and documentation in one school-operated record.",
  alternates: { canonical: "/for-schools/incident-reporting" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 brings the incident details, communications, recorded actions, status and follow-up into one time-stamped record operated by the school’s own team.",
  answerTitle: "The Integrated Incident Record",
  answerBody: "One structured record that connects the live operating view to the documentation the school retains.",
  heroImage: "/marketing/hero/trip-approval.jpg",
  planningLabel: "The system question",
  problemTitle: "Incident reporting works best when the record is part of the operating system.",
  problemCopy: [
    "An incident may generate an initial report, calls, messages, actions, status changes and follow-up items. Each is useful on its own; together they form the complete record.",
    "ETI360 keeps those elements connected to the trip and to one another. The school’s team can work from the same context during the event and retain a structured account for its own review afterwards.",
  ],
  proofEyebrow: "One connected record",
  proofTitle: "Details, actions, communications and status in one operating view.",
  proofCopy: "The incident view keeps the current position, open items, recorded actions and latest communication together. Entries remain associated with the trip, the people involved and the school’s own follow-up process.",
  stats: [
    ["1 record", "Integrated view", "Trip and incident context"],
    ["Time-stamped", "Activity log", "Updates in sequence"],
    ["4 layers", "Working structure", "Context, comms, actions, timeline"],
    ["School-led", "Decision making", "Operated by your own staff"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/incident-record.png",
    width: 1148,
    height: 785,
    alt: "ETI360 incident view showing current status, flags, incident details and the latest communication in one record",
    caption: "A demonstration incident record. The school, trip and people shown are fictitious; no real incident or student data is used.",
  },
  answersLabel: "What the integrated record contains",
  answersTitle: "The system keeps each part of the record connected.",
  answersCopy: "The value is not a single incident form. It is the continuity between the first entry, the operating activity that follows and the documentation retained after the trip.",
  answers: [
    { number: "01", title: "Context", body: "The incident stays connected to the trip, activity, location and people recorded by the school." },
    { number: "02", title: "Communications", body: "Relevant calls, messages and updates can be captured in the same chronological record." },
    { number: "03", title: "Actions", body: "Recorded actions and follow-up items remain visible with their status and timing." },
    { number: "04", title: "Documentation", body: "The operating record supplies a consistent basis for incident and post-trip reporting." },
  ],
  detailEyebrow: "From operating view to retained record",
  detailTitle: "The documentation develops as the school uses the system.",
  detailCopy: "The trip team and duty manager do not need to reconstruct the sequence afterwards. Time-stamped entries create the source record from which the school’s incident documentation and follow-up review can be prepared.",
  detailItems: [
    ["Report", "The initial facts are entered in a consistent structure."],
    ["Update", "New information is added without overwriting the earlier record."],
    ["Status", "Open, monitored, escalated and resolved states remain visible."],
    ["Follow-up", "Actions and review items can carry into the post-trip file."],
  ],
  secondaryArtifact: {
    src: "/showcase/pages/liveops/3.png",
    width: 1273,
    height: 1800,
    alt: "ETI360 LiveOps incident card showing context, communications, actions and timeline as four connected layers",
    caption: "The incident card architecture: context, communications, actions and timeline in one school-operated system.",
  },
  scopeTitle: "For schools that want one record from report through review.",
  scopeCopy: "The incident record sits within the same operating environment as the trip context, check-ins and communications. It can support the school’s procedures across active trips without changing who holds responsibility.",
  boundaryTitle: "Scope boundary",
  boundaryCopy: "ETI360 provides the system and structured record. It does not monitor incidents, direct the school’s response, make escalation decisions or replace emergency services. The school’s staff operate the system and retain authority.",
  widerTitle: "Incident documentation is one part of live trip operations.",
  widerCopy: "The Duty Manager Dashboard supplies the operating context and communication history. The incident record gives the school a focused structure when it chooses to open and manage an incident.",
  ctaTitle: "See how one incident record connects from start to finish.",
  ctaCopy: "We can demonstrate the system with a fictitious scenario based on the type of trips your school runs, showing the record without using real student or incident information.",
};

export default function IncidentReportingPage() {
  return <SolutionReport data={data} />;
}
