import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.tripRiskWorkingFile;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "Trip Risk Documentation Preparation: how ETI360 brings the information behind a school's risk assessments, RAMS and emergency procedures into one Trip Risk Working File, organized by activity group, for the school to complete and approve its own documents.",
  alternates: { canonical: "/for-schools/trip-risk-documentation" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "trip-risk-documentation",
  question: "Do your risk assessments, RAMS and emergency procedures start from the same information?",
  heroLine:
    "Trip Risk Documentation Preparation: ETI360 brings the information a school's risk documentation draws on into one Trip Risk Working File, organized by activity group, so the school and provider can determine the controls and the level of risk and complete whichever documents they use.",
  editorial: [
    "Before a school can make decisions about a trip, it needs a clear view of what students will do and where, the hazards associated with each activity and location, the controls already described by the provider, and any additional controls the school may require. It also needs practical emergency information: response triggers, location-specific actions, and the routes and travel times to the designated emergency departments. That information is usually spread across the itinerary, the provider's documentation, school policy, maps, and other supporting material.",
    "ETI360 brings it together in a structured Trip Risk Working File, organized by activity group. The working file supports whichever forms of risk documentation the school uses: risk assessments, Risk Assessment Method Statements (RAMS), Emergency Action Procedures, and dynamic risk assessment processes. The school and provider review the information, determine the appropriate controls and level of risk, and complete and approve their chosen documents. ETI360 prepares and organizes the supporting information; the school and provider retain responsibility for risk decisions, live assessments, and final approval.",
  ],
  spreadTitle: "One activity group from a Tokyo trip: the file's front page, the group's section, and one risk in full.",
  plates: [
    {
      src: "/marketing/solutions/trip-risk-working-file-signoff.jpg",
      width: 800,
      height: 1132,
      alt: "The front page of the Trip Risk Working File: what the file holds and which documents it supports, the likelihood and severity scales, the risk bands, and the review block for the school and the provider",
      label: "The front page",
      note: "What the file holds, the documents it supports, the scales its ratings use, and the block where the school and the provider record their review.",
    },
    {
      src: "/marketing/solutions/trip-risk-working-file-group.jpg",
      width: 1040,
      height: 1471,
      alt: "One activity group's section: the activities it covers, the map with routes and travel times to the three nearest emergency departments, and the first risk with its consequence, controls, residual risk and emergency actions",
      label: "One activity group",
      note: "Urban free time across four Tokyo districts: the activities, the map with the routes and times to the emergency departments, and the first risk.",
    },
    {
      src: "/marketing/solutions/trip-risk-working-file-risk.jpg",
      width: 800,
      height: 1132,
      alt: "Two risks set out in full: consequence, inherent risk, controls and mitigations, residual risk, and emergency actions",
      label: "Each risk in full",
      note: "Consequence, inherent risk, the controls and mitigations, the residual risk once they are applied, and the emergency actions for that place.",
    },
  ],
  pdfHref: "/docs/trip-risk-working-file.pdf",
  disclosure:
    "Shown for Harborview International School, our sample school (not a real school), as an example document. No real school or student data appears.",
  claims: [
    {
      lead: "Any format the school uses",
      body: "A risk assessment, a RAMS, an Emergency Action Procedure, a dynamic risk assessment framework, or the school's own form: the working file carries the information each of them draws on, so ETI360 stays independent of any single format.",
    },
    {
      lead: "Organized by activity group",
      body: "Free time in a city, a day on the water, a mountain walk: each group of activities has its own section, with every hazard set out beside its controls, the residual risk once they are applied, and the emergency actions for that place.",
    },
    {
      lead: "Emergency information in place",
      body: "The routes and travel times to the designated emergency departments are measured for each location, and the emergency actions are written for that place rather than in general terms.",
    },
    {
      lead: "The live assessment stays with the trip leader",
      body: "For a dynamic risk assessment made during the trip as conditions change, ETI360 can prepare the structure, the information, the triggers and the recording process; the trip leader makes the live assessment.",
    },
  ],
  boundary:
    "ETI360 prepares and organizes the supporting information; it does not write, approve or certify the school's risk documentation. The school and provider determine the controls and the level of risk, make any live assessment, and give final approval.",
  promo: {
    title: "Built from the same trip record",
    body: "The activity groups, places and hospital routes come from the trip's structured itinerary, the same record behind the calendar, the location timeline and the medical access report, so the working file and every other document the trip carries read from the same record.",
  },
  stripLine: "Trip Risk Documentation Preparation sits within Tier 2 Trip Risk Review, prepared for every trip.",
  ctaTitle: "See the working file for one of your own trips.",
  ctaCopy:
    "Would you be open to a 20-minute conversation about an upcoming trip, and what its working file would give the people who write your risk documentation?",
};

export default function TripRiskDocumentationPage() {
  return <SolutionEvidence data={data} />;
}
