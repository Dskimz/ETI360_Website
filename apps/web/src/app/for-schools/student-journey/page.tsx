import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.studentJourney;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 carries a trip's stated educational purpose through to the day it belongs to, as a student-facing guide built from the same trip record.",
  alternates: { canonical: "/for-schools/student-journey" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "student-journey",
  question: "Is the educational purpose of each trip connected to its daily activities?",
  heroLine: "The Student Journey Guide carries the trip's learning purpose onto the day it belongs to: one student-facing page per travel day.",
  editorial: [
    "A trip's learning intent is usually stated clearly when it is proposed: the themes, the objectives, the reason for this destination and not another. What the group carries on the day is the schedule — times, places, the coach at 05:30. Purpose and day sit in different documents, and the connection between them is made in the moment or not at all.",
    "In the Student Journey Guide, each day opens with a short account of what it holds, the question it raises, and the skills it draws on. Each named activity then carries what the student will do at the site and what to look for while they are there.",
  ],
  spreadTitle: "A complete travel day from a Harborview demonstration trip",
  plates: [
    {
      src: "/Claude/Questions/assets/student-journey-day.png",
      width: 1920,
      height: 2716,
      alt: "ETI360 Student Journey Guide day page: dated header, site photograph, day map with numbered pins, narrative, three numbered activity cards, an hour-by-hour column and a safety notes card",
      label: "One day page",
      note: "The place, the activities, and the hours, read before the day starts.",
    },
    {
      src: "/Claude/Questions/assets/student-journey-overview.png",
      width: 1920,
      height: 2322,
      alt: "ETI360 Student Journey Guide overview page showing the whole trip on one map, trip facts, and the learning themes the trip is built around",
      label: "The opening page",
      note: "The whole journey on one map, with the learning themes the trip is built around.",
    },
  ],
  disclosure: "Harborview International School is fictitious by design; no real school or student data is shown.",
  claims: [
    {
      lead: "Pins match cards",
      body: "Stops on the day map are numbered in visiting order, and each pin's number is the number on its activity card.",
    },
    {
      lead: "Rebuilt, not redrawn",
      body: "Every block in the hour-by-hour column is a real itinerary entry with its real duration. When the itinerary changes, the column is rebuilt.",
    },
    {
      lead: "No gaps",
      body: "Coach transfers, meals, free time, and the evening appear as their own blocks, so the day runs continuously from wake-up to lights out.",
    },
    {
      lead: "Any trip length",
      body: "The guide fits a two-day field study as well as a two-week expedition.",
    },
  ],
  boundary: "The school defines the educational objectives and approves what students receive; ETI360 organizes and presents them — it never sets curriculum.",
  promo: {
    title: "The same record throughout",
    body: "The structured itinerary behind the day pages also produces the trip calendar, the routes, the historical conditions, and the duty manager's operating view — so the guide a student reads and the record leadership approves come from one source.",
  },
  stripLine: "Prepared within Tier 2 Trip Risk Review.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Student Journey Guide fits your program.",
};

export default function StudentJourneyPage() {
  return <SolutionEvidence data={data} />;
}
