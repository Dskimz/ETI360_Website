import type { DocEntry } from "./DocShowcase";

/* The school-facing document library - single source of truth for the
   homepage, For Schools, and any future surface that shows the set.
   For Providers keeps its own audience-split variant. */

export const schoolTier1: DocEntry[] = [
  {
    anchor: "baseline",
    pdf: "/docs/organizational-baseline-evaluation.pdf",
    stage: "T1 · Schools and trip providers",
    name: "Organizational Baseline Evaluation",
    reader: "Head · Board · Risk committee",
    desc: "The same ten-area review is applied to your school and to each trip provider who serves it: a baseline of organizational readiness on both sides of every trip, mapped against ISO 31031 and refreshed annually.",
    image: {
      src: "/email/spread-school-baseline.png",
      alt: "Organizational Baseline Evaluation cover page for Harborview International School, with ten scored areas",
    },
  },
];

export const schoolTier2: DocEntry[] = [
  {
    anchor: "trip-overview",
    pdf: "/docs/trip-overview.pdf",
    stage: "T2 · The first read",
    name: "Trip Overview",
    reader: "Head · Approving committee",
    desc: "The trip on one page: program, dates, group, and logistics at a glance, for the first read before the detail.",
    image: {
      src: "/email/page-overview.png",
      alt: "Trip Overview one-pager for the Cherry Blossom Tokyo sample trip",
    },
  },
  {
    anchor: "parent-itinerary",
    pdf: "/docs/parent-itinerary.pdf",
    stage: "T2 · For families",
    name: "Parent Itinerary",
    reader: "Parents",
    desc: "The journey written for families, in the school's own voice: clear day information, meals, accommodation, and what to know — with the full risk assessment staying school-side, deliberately.",
    image: {
      src: "/email/card-parent.png",
      alt: "Parent Itinerary day pages with photographs and day-by-day plans",
    },
  },
  {
    anchor: "itinerary-report",
    pdf: "/showcase/pdfs/02-1-calendar-view.pdf",
    stage: "T2 · The operational record",
    name: "Itinerary Report",
    reader: "Coordinator · Trip staff",
    desc: "The same journey as a minute-by-minute calendar: every activity, transfer, meal, and overnight in hour-by-hour blocks, transit included.",
    image: {
      src: "/showcase/pages/02-1-calendar-view/2.png",
      alt: "Itinerary Report calendar view, page two of the Cherry Blossom Tokyo sample trip: days five through eight as hour-by-hour blocks covering activities, meals, transport, and accommodation",
    },
  },
  {
    anchor: "trip-discovery-map",
    pdf: "/docs/trip-discovery-map.pdf",
    stage: "T2 · The trip on one sheet",
    name: "Trip Discovery Map",
    reader: "Coordinator · Parents evening",
    desc: "Stops, routes, and the shape of each day on one visual sheet, with the day-by-day companion page alongside.",
    image: {
      src: "/email/spread-map-1.jpg",
      alt: "Trip Discovery Map for Cherry Blossom Tokyo: numbered stops, routes, and photo callouts on one sheet",
    },
    wide: true,
  },
  {
    anchor: "route-intelligence",
    pdf: "/docs/route-intelligence.pdf",
    stage: "T2 · Outdoor activities",
    name: "Route Intelligence",
    reader: "Coordinator · Duty manager",
    desc: "Distance, gradient, pacing, sun, terrain cover, and escape points, recorded for outdoor activities such as cycling, trekking, and river sports.",
    image: {
      src: "/email/spread-itoshima-2.png",
      alt: "Route Intelligence page for the Big Itoshima ride: elevation profile, waypoint register, sun and terrain cover",
    },
    wide: true,
  },
  {
    anchor: "weather",
    pdf: "/showcase/pdfs/01-1-weather-brief-sydney.pdf",
    stage: "T2 · Conditions",
    name: "Weather Brief",
    reader: "Coordinator · Trip staff",
    desc: "Month-specific conditions for the destination and dates, built on fifteen years of historical data: temperature ranges, rain probability by day, daylight, and what the pattern means for the plan.",
    image: {
      src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
      alt: "Weather Brief for a March trip window: fifteen-year temperature overview, daily outlook, and planning notes",
    },
  },
  {
    anchor: "activity-risk-profile",
    pdf: "/docs/activity-risk-profile.pdf",
    stage: "T2 · Every activity scored",
    name: "Activity Risk Profile",
    reader: "Risk lead · Coordinator",
    desc: "Every activity scored across seven dimensions, with the policy gate separating the activities that receive full RAMS coverage from those recorded at routine level.",
    image: {
      src: "/marketing/library/arp-summary.png",
      alt: "Activity Risk Profile summary page with the seven-dimension radar chart and per-dimension score table",
    },
  },
  {
    anchor: "risk-assessment",
    pdf: "/showcase/pdfs/04-rams-report.pdf",
    stage: "T2 · The decision record",
    name: "Trip Risk Assessment & RAMS",
    reader: "Risk lead · Trip staff · Provider",
    desc: "A consistent document prepared for the school's review and decision: hazards, controls, who holds each control, and residual risk in plain language — grouped the way the trip runs, one assessment per activity group.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "RAMS report risk register page: named risks with inherent and residual scores, controls, and emergency actions",
    },
  },
  {
    anchor: "leadership-deck",
    pdf: "/docs/leadership-deck.pdf",
    stage: "T2 · For the approval meeting",
    name: "Leadership Deck",
    reader: "Head presenting to board or parents",
    desc: "The trip's evidence base as a short presentation, for the internal meeting where the trip is discussed and decided.",
    image: {
      src: "/marketing/library/leadership-deck.png",
      alt: "Leadership Deck title slide: the trip in 30 seconds, with days, students, activities, destination, and dates",
    },
    wide: true,
  },
  {
    anchor: "field-trip-report",
    pdf: "/showcase/pdfs/05-field-trip-brief.pdf",
    stage: "T2 · One-day trips",
    name: "Field Trip Report",
    reader: "Parents · Trip coordinator",
    desc: "The same discipline for a single day out: departure and return times, a timed itinerary, the route and hospital mapped, and notes for families, on one page.",
    image: {
      src: "/email/page-fieldtrip.png",
      alt: "Field Trip Report for a one-day trip: timed itinerary, route map, and hospital map on one page",
    },
  },
  {
    anchor: "trip-risk-register",
    stage: "T2 · Before departure",
    name: "Trip Risk Register",
    reader: "Coordinator · Risk lead · Leadership",
    desc: "The home view of the school's TripRisk360 portal, where the documents live: every scheduled trip for the year in one register — departures, seasonal risk signals, and RAMS status, connected to each trip's documents.",
    image: {
      src: "/marketing/library/trip-risk-register.png",
      alt: "The Trip Risk Register in the school portal: scheduled trips month by month with seasonal risk signals and RAMS status",
    },
    wide: true,
    pageHref: "/documents/trip-risk-register",
  },

  {
    anchor: "duty-manager-simulation",
    stage: "T2 · Rehearsal",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard. Your duty manager works through a realistic scenario based on one of your school's trips, practicing agreed roles, communication, and escalation decisions.",
    image: {
      src: "/email/screen-simulation.png",
      alt: "The Duty Manager Simulation: itinerary rehearsal and crisis rehearsal inside the dashboard",
    },
    wide: true,
  },
];

export const schoolTier3: DocEntry[] = [
  {
    anchor: "teacher-guide",
    pdf: "/docs/teacher-operational-guide.pdf",
    stage: "T3 · In the leader's hand",
    name: "Teacher Operational Guide",
    reader: "Trip leader · Trip staff",
    desc: "One page per day, built for the trip leader: timing, movements, contacts, and the day's attention points.",
    image: {
      src: "/email/page-teacher.png",
      alt: "Teacher Operational Guide day page with the run sheet, movements, and contacts",
    },
  },
  {
    anchor: "duty-manager-dashboard",
    stage: "T3 · During the trip",
    name: "Duty Manager Dashboard",
    reader: "The school's own duty manager",
    desc: "The working view while groups travel — operated by your duty manager, never by us: trip context, location, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure.",
    image: {
      src: "/email/screen-dmd-v3.png",
      alt: "The Duty Manager Dashboard with a trip open: trip context, location map with the routed hospital, check-ins, and messages",
    },
    wide: true,
  },
  {
    anchor: "post-trip-feedback-loop",
    pdf: "/docs/post-trip-feedback-loop.pdf",
    stage: "T3 · After the trip",
    name: "Post-Trip Feedback Loop",
    reader: "Head · Board · Next year's coordinator",
    desc: "Staff observations recorded after each trip and carried into the next annual baseline, so the record the trip produced is the starting point the next review reads. The feedback system is in development.",
    image: {
      src: "/email/card-posttrip.png",
      alt: "Front page of the Post-Trip Intelligence Report specimen",
    },
  },
];

export const schoolDocs: DocEntry[] = [...schoolTier1, ...schoolTier2, ...schoolTier3];