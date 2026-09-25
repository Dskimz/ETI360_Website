import type { DocEntry } from "./DocShowcase";

/* The school-facing document library for /framework. Tier 2 and the Tier 3
   documents a trip carries are shown from a worked trip (WorkedTripDocs), so
   they carry the same names and editions as the trip pages. What stays here
   is what no worked trip holds: the Travel Program Review sample, and the two
   Tier 3 services that are screens rather than documents. */

export const schoolTier1: DocEntry[] = [
  {
    anchor: "baseline",
    pdf: "/docs/organizational-baseline-evaluation-v4.pdf",
    stage: "Tier 1 · Schools and trip providers",
    name: "Travel Program Review",
    reader: "School leadership · Board · Risk committee",
    desc: "The same ten-area review is applied to your school and to each trip provider who serves it: where the school and its providers stand, read against the ETI360 Operational Capability Framework and reviewed once every four years.",
    image: {
      src: "/email/spread-school-baseline-v4.png",
      alt: "Travel Program Review for Harborview International School: ten areas read across every program path the school runs, each marked at standard, progressing, or not evidenced",
    },
  },
];

export const schoolTier3: DocEntry[] = [
  {
    anchor: "duty-manager-simulation",
    stage: "Tier 3 · Practice before departure",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard. Your duty manager works through a realistic scenario based on one of your school's trips, practicing agreed roles, communication, and escalation decisions. The Duty Manager Simulation has not yet been run with a school.",
    image: {
      src: "/marketing/solutions/simulation-dashboard.png",
      alt: "The Duty Manager Dashboard in simulation mode: a gold SIMULATION badge, the trip timeline, current Harborview trips in triage lanes, and the Duty Overview",
    },
    wide: true,
    pageHref: "/for-schools/duty-manager-simulation",
  },
  {
    anchor: "duty-manager-dashboard",
    stage: "Tier 3 · During the trip",
    name: "Duty Manager Dashboard",
    reader: "The school's own duty manager",
    desc: "The school's own view while groups travel, operated by the school's duty manager, never by ETI360: trip context, location, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure.",
    image: {
      src: "/marketing/solutions/scheduled-group-locations.png",
      alt: "The Duty Manager Dashboard with a trip open: six current trips, trip context, the scheduled location on the map, today's schedule, and messages",
    },
    wide: true,
    pageHref: "/for-schools/duty-manager",
  },
];
