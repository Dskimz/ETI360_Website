import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.dutyManager;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 gives a school duty manager one working view of active trips and their agreed context.",
  alternates: { canonical: "/for-schools/duty-manager" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "duty-manager",
  question: "Can your duty manager see where every traveling group is scheduled to be?",
  heroLine: "The Duty Manager Dashboard: one working view of every current trip.",
  editorial: [
    "While groups are away, the duty manager moves between the itinerary, the contact list, location information, messages, and incident notes — often for several trips at once. The documents all exist. What goes missing is the connection between them: a call comes in, and the context it concerns sits in another window.",
    "The Duty Manager Dashboard keeps them together: communications are recorded against the trip they concern rather than accumulating in a side channel, and an incident entry opens from the same screen the itinerary and contacts already occupy.",
  ],
  spreadTitle: "The dashboard staged mid-trip: six Harborview groups traveling at once",
  plates: [
    {
      src: "/Claude/Questions/assets/scheduled-group-locations.png",
      width: 1280,
      height: 800,
      alt: "ETI360 Duty Manager Dashboard showing six current trips, the selected trip's context and scheduled location, today's schedule, messages, and the next four hours across every trip",
      label: "The Active-Trip View",
      note: "Trip list beside one selected group: its context, today's schedule, and the message thread.",
    },
    {
      src: "/Claude/Questions/assets/duty-overview.png",
      width: 1280,
      height: 551,
      alt: "ETI360 Duty Manager Dashboard duty overview: students traveling, active trips, open incidents, active alerts, and overdue check-ins across every current trip",
      label: "The Duty Overview",
      note: "Students traveling, active trips, open incidents, alerts, and overdue check-ins — the numbers read first.",
    },
  ],
  disclosure: "Product screenshots staged mid-trip with trips from Harborview International School, a school fictitious by design — no real school or student data appears.",
  claims: [
    {
      lead: "Scheduled, not tracked",
      body: "Each group's position is where its itinerary places it at that hour — the dashboard reads the plan, not a device signal.",
    },
    {
      lead: "Next four hours",
      body: "The band across the foot of the dashboard lists what every group is doing in the coming four hours.",
    },
    {
      lead: "Time-stamped, then kept",
      body: "What a screenshot cannot show: every entry is stamped with the moment it was made, and the record stays with the trip after the group returns.",
    },
  ],
  boundary: "Operated by your school's or provider's own duty manager — ETI360 does not monitor trips on your behalf, make escalation decisions, or replace emergency services.",
  promo: {
    title: "Rehearse it before anyone travels",
    body: "The dashboard is also the venue for the Duty Manager Simulation — a facilitated session working a staged situation on one of your real trips, inside this same view, before the group departs.",
  },
  stripLine: "The trip record the school approved in Tier 2 becomes the working view here.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation is enough to see whether the Duty Manager Dashboard fits how your school manages trips in progress.",
};

export default function DutyManagerPage() {
  return <SolutionEvidence data={data} />;
}
