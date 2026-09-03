import type { Metadata } from "next";
import { SolutionReport, type SolutionReportData } from "@/components/SolutionReport";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.studentJourney;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 carries a trip's stated educational purpose through to the day it belongs to, as a student-facing guide built from the same trip record.",
  alternates: { canonical: "/for-schools/student-journey" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionReportData = {
  slug: report.slug,
  eyebrow: report.name,
  question: report.question,
  lead: "ETI360 sets the school's learning intent beside the trip's own itinerary and prepares a guide the students carry—each named activity with its purpose, its place on the day's map, and the question it is there to raise.",
  answerTitle: "Student Journey Guide",
  answerBody: "One page per travel day, built from the same trip record as the rest of the file.",
  heroImage: "/marketing/hero/for-schools.jpg",
  planningLabel: "The planning question",
  problemTitle: "The educational purpose is set out at approval. What travels is the itinerary.",
  problemCopy: [
    "A trip's learning intent is usually stated clearly when it is proposed: the themes, the objectives, the reason for this destination and not another. What the group carries on the day is the schedule—times, places, and the coach at 05:30. The purpose and the day sit in different documents, and the connection between them is made in the moment or not at all.",
    "ETI360 carries the stated purpose through to the day it belongs to. Each named activity is presented with what the student will do, what to look for, and the question the day raises—assembled from the same structured itinerary that produces the rest of the trip file. The school defines the educational objectives; ETI360 organizes and presents them.",
  ],
  proofEyebrow: "One travel day, complete",
  proofTitle: "Everything the day contains, on a page a student can read before it starts.",
  proofCopy:
    "The photograph and map set the place. The numbered cards carry the activities and their purpose. The hour-by-hour column runs from wake-up to lights out. Card numbers match the map pins, so a student reading about the second stop can see where it is and when it happens.",
  stats: [
    ["1 page", "Per travel day", "Wake-up to lights out"],
    ["17", "Named activities", "Each carrying its purpose"],
    ["1 map", "Per day page", "Pins numbered in visiting order"],
    ["1 record", "Shared source", "The same trip ledger"],
  ],
  primaryArtifact: {
    src: "/Claude/Questions/assets/student-journey-day.png",
    width: 1920,
    height: 2716,
    alt: "ETI360 Student Journey Guide day page: dated header, site photograph, day map with numbered pins, narrative, three numbered activity cards, an hour-by-hour column and a safety notes card",
    caption:
      "A Harborview demonstration trip. Harborview International School is fictitious; no real school or student data is shown.",
  },
  answersLabel: "What the guide carries",
  answersTitle: "The purpose, the day, and the place it happens—on the same page.",
  answersCopy:
    "Each day page is assembled from the trip record, so the activity a student reads about is the activity in the itinerary, at the time the itinerary gives it.",
  answers: [
    {
      number: "01",
      title: "The day's purpose",
      body: "A short account of what the day holds, the question it raises, and the skills it draws on.",
    },
    {
      number: "02",
      title: "Named activities",
      body: "Each activity carries what the student will do at the site and what to look for while they are there.",
    },
    {
      number: "03",
      title: "The day's map",
      body: "Stops are numbered in visiting order, and those numbers match the activity cards beside them.",
    },
    {
      number: "04",
      title: "Hour by hour",
      body: "Activities, meals, transfers, free time and the evening, each block sized by its real duration.",
    },
  ],
  detailEyebrow: "The hour-by-hour column",
  detailTitle: "The whole day, visible before it begins.",
  detailCopy:
    "The right-hand column is built directly from the trip's activity records, so every block is a real entry with a real duration rather than a redrawn summary. The day reads continuously instead of as a list of highlights, and when the itinerary changes the column is rebuilt from the updated record.",
  detailItems: [
    ["Activities", "Numbered to match the cards and the map pins."],
    ["Meals and rest", "Named where the itinerary names them, timed where it times them."],
    ["Movement", "Coach transfers appear as their own blocks, so travel time is visible rather than implied."],
    ["Unscheduled", "Free time and the evening stay on the page instead of becoming gaps."],
  ],
  secondaryArtifact: {
    src: "/Claude/Questions/assets/student-journey-overview.png",
    width: 1920,
    height: 2716,
    alt: "ETI360 Student Journey Guide overview page showing the whole trip on one map, trip facts, and the learning themes the trip is built around",
    caption:
      "The opening page: the whole journey on one map, with the themes the trip is built around. A Harborview demonstration trip.",
  },
  scopeTitle: "For any trip with a stated educational purpose.",
  scopeCopy:
    "Day pages follow the source itinerary, so the guide suits a two-day field study or a two-week expedition. Where the school supplies its own objectives, themes or curriculum links, those are what the guide carries.",
  boundaryTitle: "Scope boundary",
  boundaryCopy:
    "The school defines the educational objectives and approves what students receive. ETI360 organizes and presents them; it does not set curriculum. The reminders on each day page are a short prompt for students rather than a briefing—the trip leaders' instructions come first, and the page says so.",
  widerTitle: "The purpose and the operating record come from one trip file.",
  widerCopy:
    "The structured itinerary behind the day pages also produces the calendar, the routes, the historical conditions and the duty manager's view, so the guide a student reads and the record leadership approves come from one source.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Student Journey Guide fits your program.",
};

export default function StudentJourneyPage() {
  return <SolutionReport data={data} />;
}
