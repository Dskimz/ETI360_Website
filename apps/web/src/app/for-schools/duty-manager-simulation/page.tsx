import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.dutyManagerSimulation;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description: "How ETI360 prepares a school's own trip for a facilitated session inside the Duty Manager Dashboard and files the After-Action Report with the trip record.",
  alternates: { canonical: "/for-schools/duty-manager-simulation" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "duty-manager-simulation",
  question: "Can your duty manager practice one of your own trips before it runs?",
  heroLine: "The Duty Manager Simulation: one of the school's own trips, run by its own duty manager inside the Duty Manager Dashboard before the group departs.",
  editorial: [
    "A group is away, and the duty phone sits beside the trip file. The itinerary, the contact sheet, the hospital list, and the approved RAMS all exist, each on its own page and each complete in its own terms. Working them together — with a call on the line and a message arriving on the dashboard — has no venue before the trip itself.",
    "ETI360 prepares that venue: the itinerary normalized, the school's own procedures included where the school supplies them, and the trip staged inside the Duty Manager Dashboard — the same screen used for live trips. In a facilitated ninety-minute session, remote or on-site, the school's own duty manager — observers welcome — runs it from the documents at hand. The trip plays clean, then stops going to plan, twice — partial information by phone and message, the clock running, every decision recorded. The record is about the plan, not the person; the facilitator says so at the start.",
  ],
  spreadTitle: "The Harborview Nepal Himalaya Trek rehearsed: the dashboard in simulation and the After-Action Report",
  plates: [
    {
      src: "/marketing/solutions/simulation-dashboard.png",
      width: 2880,
      height: 1800,
      alt: "ETI360 Duty Manager Dashboard in simulation mode: SIMULATION badge, clock, and status line, a note that locations follow the itinerary, a trip timeline with day marks, trip search, Harborview trips in triage lanes, the Duty Overview numbers, and the check-ins and active alerts panels",
      label: "The dashboard in simulation",
      note: "The simulation band above the working view: the SIMULATION badge and trip timeline, then the Harborview trips in their lanes and the Duty Overview numbers.",
    },
    {
      src: "/marketing/solutions/simulation-after-action-report.png",
      width: 1588,
      height: 2248,
      alt: "ETI360 After-Action Report, the simulated incident reports sheet from a Harborview session: header band, title, intro line, scenario marker, numbered incident reports with tier chip, first mention, situation, document checks, call with verbatim reasoning, communications line, and resolution, above the footer Simulated — did not occur",
      label: "The Simulated Incident Reports",
      note: "Each numbered incident: first mention, the situation, document checks, the call with its time and reasoning verbatim, and resolution; footer “Simulated — did not occur.”",
    },
  ],
  disclosure: "A dashboard and a report sheet from Harborview International School, fictitious by design — no real school, incident, or student data appears; the places are real Nepal locations, every event simulated.",
  claims: [
    {
      lead: "The trip, not a template",
      body: "Drawn from the trip's reviewed itinerary — the real places, hospitals, and contact sheet — the scenario holds nothing that could not happen on that itinerary: if it has no kayaks, nobody capsizes. Behind the SIMULATION badge, live trips stay untouched.",
    },
    {
      lead: "Stated, then recorded",
      body: "Calls arrive on a phone, messages on the dashboard — the facilitator voices the trip leader, the provider, a parent. Each situation's decision is logged as Go, Slow go, or No go with its reasoning, verbatim, as it is made.",
    },
    {
      lead: "Covered, or on judgment",
      body: "Nothing is corrected mid-session. The debrief replays the timeline; the coverage reveal shows which events the room faced were covered by a documented control in the trip's approved RAMS and which were handled on judgment alone — gaps identified, never scheduled.",
    },
    {
      lead: "Filed with the trip",
      body: "The session is recorded for the After-Action Report, with consent asked on screen first. Compiled from the session's record, the report names no one; it reaches the school within 48 hours, filed with the trip, and a 30-minute conversation follows.",
    },
  ],
  boundary: "Your school's own duty manager operates the dashboard, and your school approves its own RAMS; ETI360 facilitates and records — it does not monitor trips on your behalf, make escalation decisions, or replace emergency services.",
  promo: {
    title: "When the group departs",
    body: "The screen the duty manager rehearses on is the Duty Manager Dashboard — the working view while groups travel, run by the school's own duty team: the same lanes, trip view, and incident form, now carrying the live trip's check-ins, messages, contacts, and incident record.",
  },
  stripLine: "Rehearsed within Tier 2 Trip Risk Review on the Duty Manager Dashboard, the school's Tier 3 working view.",
  ctaTitle: "Talk it through on your own trips.",
  ctaCopy: "A 20-minute conversation about the trips you run is enough to see whether the Duty Manager Simulation fits how your school prepares its duty team.",
};

export default function DutyManagerSimulationPage() {
  return <SolutionEvidence data={data} />;
}
