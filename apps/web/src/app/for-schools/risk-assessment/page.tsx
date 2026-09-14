import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.ramsWorkingDocuments;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 prepares the groundwork for each risk assessment, one working document per activity group with hazards beside controls, residual risk and emergency actions, for the school's risk team to complete and approve.",
  alternates: { canonical: "/for-schools/risk-assessment" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "risk-assessment",
  question: "Does your risk team have the full picture before it writes the RAMS?",
  heroLine:
    "The RAMS Working Documents put the groundwork for each risk assessment in front of the risk team: one working document per activity group, with the hazards, the controls, the emergency actions and the evidence behind them, so the team can decide the level of risk students will be exposed to, and sign off.",
  editorial: [
    "A risk assessment rests on what the team knows when it sits down to write it: what the students will do and where, hour by hour; the hazards each activity and place carries; the controls the provider already has in place; the nearest emergency department and the time to reach it. Gathering that from the provider's itinerary, the provider's documentation and the school's own policy is work the team does before the assessment can begin, and each trip asks for it again.",
    "ETI360 prepares that groundwork and organizes it into structured working documents, one per activity group. Each hazard sits beside its controls, the residual risk with those controls in place, and the emergency actions for that activity and location, with the routes to the emergency departments mapped. The risk team reviews, amends and completes the assessment, decides the level of risk students will be exposed to, and approves it. ETI360 does not write the RAMS and does not approve it.",
  ],
  spreadTitle: "One activity group from a Tokyo trip: the definitions the school signs to, the group's page, and one risk.",
  plates: [
    {
      src: "/marketing/solutions/rams-working-documents-signoff.jpg",
      width: 800,
      height: 1132,
      alt: "The definitions and sign-off page: the likelihood and severity scales, the risk bands, and the review and sign-off block for the school and the provider",
      label: "Definitions and sign-off",
      note: "The scales the assessment uses and the block where the school and the provider record their review. The document says on its face that ETI360 does not write RAMS.",
    },
    {
      src: "/marketing/solutions/rams-working-documents-group.jpg",
      width: 1040,
      height: 1471,
      alt: "The activity group's page: the activities it covers, the map with routes to the two nearest emergency departments, and the first risk with its consequence, controls, residual risk and emergency actions",
      label: "One activity group",
      note: "Urban free time across four Tokyo districts: the activities, the map with the routes and times to the emergency departments, and the first risk.",
    },
    {
      src: "/marketing/solutions/rams-working-documents-risk.jpg",
      width: 800,
      height: 1132,
      alt: "Two risks set out in full: consequence, inherent risk, controls and mitigations, residual risk, and emergency actions",
      label: "Each risk in full",
      note: "Consequence, inherent risk, the controls and mitigations, the residual risk once they are applied, and the emergency actions for that place.",
    },
  ],
  pdfHref: "/docs/rams-working-documents.pdf",
  disclosure:
    "Shown for Harborview International School, our sample school (not a real school), as an example document. No real school or student data appears.",
  claims: [
    {
      lead: "One document per activity group",
      body: "Free time in a city, a day on the water, a mountain walk: each group of activities has its own working document, so the team reads the risks of one kind of activity together.",
    },
    {
      lead: "Hazard beside control",
      body: "Every hazard is set out with its consequence, the controls in place, the residual risk once they are applied, and the emergency actions for that place.",
    },
    {
      lead: "Drawn from the trip's own record",
      body: "The activities, places and hospital routes come from the trip's structured itinerary; the hazards and controls from the provider's documentation and the school's policy. The document names its sources.",
    },
    {
      lead: "The school decides",
      body: "The team amends, completes and approves the assessment; the document carries the review block for the school and for the provider, with name, signature and date.",
    },
  ],
  boundary:
    "ETI360 prepares and organizes the working documents; it does not write, approve or certify the risk assessment. Approval rests with the school or the trip provider.",
  promo: {
    title: "Built from the same trip record",
    body: "The activity groups, places and hospital routes come from the trip's structured itinerary, the same record behind the calendar, the location timeline and the medical access report, so the working documents and every other document the trip carries read from the same record.",
  },
  stripLine: "The RAMS Working Documents sit within Tier 2 Trip Risk Review, prepared for every trip.",
  ctaTitle: "See the working documents for one of your own trips.",
  ctaCopy:
    "Would you be open to a 20-minute conversation about an upcoming trip, and what its working documents would give your risk team before it writes the RAMS?",
};

export default function RiskAssessmentPage() {
  return <SolutionEvidence data={data} />;
}
