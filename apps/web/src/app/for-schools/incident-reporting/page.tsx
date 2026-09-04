import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.incidentReporting;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 connects incident details, communications, actions, status and documentation in one school-operated record.",
  alternates: { canonical: "/for-schools/incident-reporting" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "incident-reporting",
  question: "Can your duty team log an incident and keep the full record in one place?",
  heroLine: "The integrated incident record, run by the school's own duty team inside the Duty Manager Dashboard.",
  editorial: [
    "An incident rarely stays one document. A first report becomes calls, messages, decisions, status changes, and follow-up items, spread across phones, notebooks, and inboxes. Afterward, someone reconstructs the sequence from whatever each person kept.",
    "The duty team opens the incident, works it, and closes it as the situation runs. That working record — not a write-up assembled afterward — is the documentation the school keeps.",
  ],
  spreadTitle: "A Harborview trip in Seoul, day three of eight",
  plates: [
    {
      src: "/Claude/Questions/assets/incident-record.png",
      width: 1200,
      height: 1458,
      alt: "ETI360 Duty Manager Dashboard trip view showing the day's schedule, an open incident, flags, and the chronological activity log for a fictitious Harborview trip in Seoul",
      label: "Duty Manager Dashboard, trip view",
      note: "One trip day mid-incident — the working screen as the duty team sees it.",
    },
  ],
  disclosure: "Harborview International School is fictitious by design; no real school, incident, or student data is shown.",
  claims: [
    {
      lead: "One log",
      body: "Messages, calls, and check-ins enter the record as time-stamped entries, in sequence, beside the incident they concern.",
    },
    {
      lead: "Context stays attached",
      body: "The incident opens inside the trip view, not a separate module; every entry keeps its link to the trip, activity, location, and people the school recorded.",
    },
    {
      lead: "Nothing overwritten",
      body: "Updates are added as new entries; status moves through open, monitored, escalated, and resolved.",
    },
    {
      lead: "After the trip",
      body: "Follow-up items and the finished record move into the post-trip file.",
    },
  ],
  boundary: "ETI360 provides the system and the structured record — it does not monitor incidents, direct the response, decide escalations, or stand in for emergency services.",
  stripLine: "Incident reporting sits in Tier 3 Dynamic Risk Operations — the during-and-after tier.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the incident record fits how your team already operates.",
};

export default function IncidentReportingPage() {
  return <SolutionEvidence data={data} />;
}
