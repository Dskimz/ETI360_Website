import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.fieldTrips;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 lays out a school's one-day field trips as one set at the start of the year, so the preparation behind them happens once rather than trip by trip.",
  alternates: { canonical: "/for-schools/field-trips" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "field-trips",
  question: "Do you know every field trip your school will run this year?",
  heroLine: "The Field Trip Register prepares the year's one-day trips as one set, and issues each trip its own parent letter — the day, the route, and emergency access.",
  editorial: [
    "A single overseas expedition is visible from a long way off, and it gets planned accordingly. The short trips are different: many, small, each arranged in the weeks before it runs. Venue confirmed, coach booked, letter home, paperwork assembled — then the same sequence starts again for next Thursday.",
    "ETI360 works from the other end, doing the shared preparation before the term starts and organizing hazards, controls, and supporting evidence into structured working documents. The school reviews, completes, and approves its own risk assessments — with the evidence already gathered and in one place.",
  ],
  spreadTitle: "One term of Harborview field trips: the register and one trip's letter",
  plates: [
    {
      src: "/Claude/Questions/assets/field-trip-register.png",
      width: 1921,
      height: 2798,
      alt: "ETI360 Field Trip Register: twenty-five one-day field trips for a term, each with date, trip name, venues, departure and return times",
      label: "Field Trip Register",
      note: "A term's twenty-five trips in date order — each row one trip, its venues, its times.",
    },
    {
      src: "/Claude/Questions/assets/field-trip-parent-letter.png",
      width: 1920,
      height: 2716,
      alt: "A field trip parent information letter: school crest and name, departure and return times, educational overview, hour-by-hour itinerary, a route map from school and a map to the nearest emergency department, notes for families and the trip coordinator",
      label: "One Trip's Parent Letter",
      note: "Departure to return on one side — the hour-by-hour day, both maps, and notes for families.",
    },
  ],
  disclosure: "Shown for a Harborview demonstration term. Harborview International School is fictitious by design; no real school or student data appears.",
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
  ctaTitle: "See a term of your own field trips in one register.",
  ctaCopy: "Would you be open to a 20-minute conversation about the field trips you have scheduled for one term, and how they would read as one register?",
};

export default function FieldTripsPage() {
  return <SolutionEvidence data={data} />;
}
