import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.fieldTrips;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 sets out a school's one-day field trips for the whole year before day 1 — one register, one page per trip — so the preparation behind them happens once rather than trip by trip.",
  alternates: { canonical: "/for-schools/field-trips" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "field-trips",
  question: "Are your educational excursions documented from day 1?",
  heroLine: "The Field Trip Register sets out every one-day trip of the school year before day 1 — one page per trip with the schedule, the route from school, the emergency department the school named, and the documentation prepared for it.",
  editorial: [
    "A single overseas expedition is visible from a long way off, and it gets planned accordingly. The short trips are different: many, small, each arranged in the weeks before it runs. Venue confirmed, coach booked, letter home, paperwork assembled — then the same sequence starts again for next Thursday.",
    "ETI360 works from the other end, doing the shared preparation before the term starts and organizing hazards, controls, and supporting evidence into structured working documents. The school reviews, completes, and approves its own risk assessments — with the evidence already gathered and in one place.",
  ],
  spreadTitle: "A year of Harborview elementary field trips: the register, its contents, and one trip's page",
  plates: [
    {
      src: "/marketing/solutions/field-trip-register-v2-cover.jpg",
      width: 1040,
      height: 1471,
      alt: "The cover of the Harborview Elementary School Field Trip Register 2026–27: thirty field trips, five grades, nine months, thirty-six venues",
      label: "The register",
      note: "Thirty one-day trips, one for each unit of inquiry in each grade, planned and documented before the first day of school.",
    },
    {
      src: "/marketing/solutions/field-trip-register-v2-contents.jpg",
      width: 800,
      height: 1131,
      alt: "The contents page of the register: every month, every date, every trip with its page number",
      label: "Contents",
      note: "Month, date, trip — every field trip of the year has a page, and a month opener shows the calendar.",
    },
    {
      src: "/marketing/solutions/field-trip-register-v2-trip.jpg",
      width: 800,
      height: 1131,
      alt: "One trip's page: learning purpose, schedule, notes for families, venues, the route from school and the emergency department mapped, and the documentation set",
      label: "One trip's page",
      note: "The learning purpose, the schedule, the route from school with its measured drive, the emergency department the school named, and the documentation set prepared for the day.",
    },
  ],
  pdfHref: "/docs/field-trip-register-harborview-2026-27-v2.pdf",
  disclosure: "Shown for the Harborview sample year. Harborview International School is not a real school; it is used only as a sample school. No real school or student data appears.",
  claims: [
    {
      lead: "Venues confirmed once",
      body: "Forty-four venues sit behind the set. Each is confirmed, measured, and documented once, and that record serves every trip that visits it.",
    },
    {
      lead: "Measured, not estimated",
      body: "Routes carry measured journey times, not estimates; the emergency department shown is the one the school named for that area, mapped with its travel time from the venue.",
    },
    {
      lead: "The school's name",
      body: "The letter goes home under the school's own crest and branding, not ETI360's.",
    },
    {
      lead: "Same structure throughout",
      body: "The trip in week two and the trip in week nine read the same way — for the teacher leading each and the family receiving each.",
    },
  ],
  boundary: "Preparing the set approves nothing: each trip is still signed off on its own terms.",
  promo: {
    title: "The same record on trip day",
    body: "A one-day trip prepared this way produces the same working record as a two-week expedition — and appears in the school's Duty Manager Dashboard on the day it runs.",
  },
  stripLine: "The register sits within Tier 2 Trip Risk Review, beside the expedition file.",
  ctaTitle: "See a year of your own field trips in one register.",
  ctaCopy: "Would you be open to a 20-minute conversation about the field trips you have planned for the year, and how they would read as one register?",
};

export default function FieldTripsPage() {
  return <SolutionEvidence data={data} />;
}
