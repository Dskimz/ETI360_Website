export const reportCatalog = {
  routeIntelligence: {
    slug: "route-intelligence",
    tier: 2,
    name: "Route Intelligence",
    question: "Do you know the route, distance, elevation, and terrain for every routed activity?",
    summary: "Map, terrain, elevation, waypoints and relevant access information in one route record.",
    href: "/for-schools/route-intelligence",
    image: "/showcase/pages/02-3-itoshima-route/1.png",
    imageAlt: "ETI360 Route Intelligence map for the Big Itoshima cycling route",
  },
  ramsWorkingDocuments: {
    slug: "risk-assessment",
    tier: 2,
    name: "RAMS Working Documents",
    question: "Does your risk team have the full picture before it writes the RAMS?",
    summary: "The groundwork for each risk assessment, one working document per activity group: hazards beside controls, residual risk, emergency actions, and the routes to the emergency departments, for the school's risk team to complete and approve.",
    href: "/for-schools/risk-assessment",
    image: "/marketing/solutions/rams-working-documents-group.jpg",
    imageAlt: "One activity group's page of the RAMS Working Documents for a Tokyo trip: the activities, the map with routes to the emergency departments, and the first risk with its controls and emergency actions",
  },
  locationTimeline: {
    slug: "location-timeline",
    tier: 2,
    name: "Calendar + Timeline",
    question: "Do you know the scheduled location of every trip group, on every trip?",
    summary: "One structured itinerary presented as a detailed calendar and a continuous trip timeline.",
    href: "/for-schools/location-timeline",
    image: "/marketing/solutions/location-timeline.png",
    imageAlt: "ETI360 Location Timeline across five days",
  },
  weatherBrief: {
    slug: "weather-brief",
    tier: 2,
    name: "Weather Brief",
    question: "Have historical seasonal conditions been reviewed against each location and date in the itinerary?",
    summary: "Historical climate context connected to preparation and adjustable risk information.",
    href: "/for-schools/weather-brief",
    image: "/showcase/pages/01-1-weather-brief-sydney/1.png",
    imageAlt: "ETI360 Weather Brief for Sydney in March",
  },
  medicalAccess: {
    slug: "medical-access",
    tier: 2,
    name: "Medical Access",
    question: "Can your team see the medical facilities and travel times connected to each planned location?",
    summary: "Verified facility details and estimated access information connected to the actual itinerary.",
    href: "/for-schools/medical-access",
    image: "/marketing/solutions/medical-access.png",
    imageAlt: "ETI360 verified medical facility profiles",
  },
  studentJourney: {
    slug: "student-journey",
    tier: 2,
    name: "Student Journey Guide",
    question: "Is the educational purpose of each trip connected to its daily activities?",
    summary: "The learning purpose, the named activities and the shape of each day in one student-facing guide.",
    href: "/for-schools/student-journey",
    image: "/marketing/solutions/student-journey-day.png",
    imageAlt: "ETI360 Student Journey Guide day page with map, activity cards and an hour-by-hour view of the day",
  },
  fieldTrips: {
    slug: "field-trips",
    tier: 2,
    name: "Field Trip Register",
    question: "Are your educational excursions documented from day 1?",
    summary: "Every one-day trip of the school year planned and documented before day 1: one register, one page per trip, with the route, the emergency department, and the documentation set.",
    href: "/for-schools/field-trips",
    image: "/marketing/solutions/field-trip-register-v2-cover.jpg",
    imageAlt: "The cover of the Harborview Elementary School Field Trip Register 2026–27",
  },
  conferenceVisits: {
    slug: "conference-visits",
    tier: 2,
    name: "Athletics and Activities Trips Guide",
    question: "When your teams travel to the other schools in your conference, what do your coaches carry?",
    summary: "One guide for the staff who travel with a school's teams, in the school's own name and colors: every host city in the conference year, with arrival by air and rail, three hotels within a walk of the host, the emergency departments, and one contacts page to photograph.",
    href: "/for-schools/conference-visits",
    image: "/marketing/solutions/athletics-activities-trips-guide.jpg",
    imageAlt: "The cover of the Athletics and Activities Trips Guide, Wexcombe International School edition: a six-city collage of Paris, Berlin, Madrid, Rome, Amsterdam, and Geneva, each tile badged with its host school's mark, over the conference name, the year, the cities, and the windows",
  },
  standardDocumentation: {
    slug: "standard-documentation",
    tier: 2,
    name: "Standard Trip Documentation",
    question: "Do all of your field trips use the same documentation format?",
    summary: "A consistent structure across different trips, generated from one trip-specific record.",
    href: "/for-schools/standard-documentation",
    image: "/marketing/solutions/std-documentation.png",
    imageAlt: "Three ETI360 itinerary documents using one standard format",
  },
  dutyManagerSimulation: {
    slug: "duty-manager-simulation",
    tier: 3,
    name: "Duty Manager Simulation",
    question: "Can your duty manager practice one of your own trips on the dashboard before it runs?",
    summary: "A facilitated ninety-minute session on one of the school's own trips inside the dashboard, the situations faced and the plan's coverage recorded in one After-Action Report.",
    href: "/for-schools/duty-manager-simulation",
    image: "/marketing/solutions/simulation-dashboard.png",
    imageAlt: "ETI360 Duty Manager Dashboard in simulation mode, with the SIMULATION badge in the top bar, the trip timeline, and current trips in their lanes",
  },
  dutyManager: {
    slug: "duty-manager",
    tier: 3,
    name: "Duty Manager Dashboard",
    question: "Can your duty manager see where every traveling group is scheduled to be across all active trips?",
    summary: "Trip context with calls, messages, check-ins and follow-up tracked in one operating view.",
    href: "/for-schools/duty-manager",
    image: "/marketing/solutions/scheduled-group-locations.png",
    imageAlt: "ETI360 Duty Manager Dashboard with six current trips, the selected trip's scheduled location, and the next four hours across every trip",
  },
  incidentReporting: {
    slug: "incident-reporting",
    tier: 3,
    name: "Incident Reporting",
    question: "Can your duty team log an incident, track its status, and preserve the full record in one place?",
    summary: "Context, communications, actions, status and retained documentation in one record.",
    href: "/for-schools/incident-reporting",
    image: "/marketing/solutions/incident-record.png",
    imageAlt: "ETI360 integrated incident record",
  },
} as const;

export const reportList = Object.values(reportCatalog);

export const tier3Solutions = reportList.filter((r) => r.tier === 3);

// The three Tier 2 links each solution page shows in its wider-system strip.
// Curated per page (3 max, Tier 2 only, never the page itself); keyed by slug.
const c = reportCatalog;
export const relatedTier2: Record<string, ReadonlyArray<(typeof reportList)[number]>> = {
  "route-intelligence": [c.weatherBrief, c.medicalAccess, c.locationTimeline],
  "risk-assessment": [c.routeIntelligence, c.medicalAccess, c.locationTimeline],
  "location-timeline": [c.standardDocumentation, c.routeIntelligence, c.weatherBrief],
  "weather-brief": [c.routeIntelligence, c.locationTimeline, c.fieldTrips],
  "medical-access": [c.routeIntelligence, c.locationTimeline, c.fieldTrips],
  "student-journey": [c.locationTimeline, c.standardDocumentation, c.routeIntelligence],
  "field-trips": [c.routeIntelligence, c.weatherBrief, c.medicalAccess],
  "conference-visits": [c.medicalAccess, c.weatherBrief, c.locationTimeline],
  "standard-documentation": [c.locationTimeline, c.fieldTrips, c.routeIntelligence],
  "duty-manager-simulation": [c.locationTimeline, c.medicalAccess, c.routeIntelligence],
  "duty-manager": [c.locationTimeline, c.medicalAccess, c.weatherBrief],
  "incident-reporting": [c.standardDocumentation, c.medicalAccess, c.locationTimeline],
};

// Build-time guards: a new catalog entry must appear here, and related links
// must be other pages' Tier 2 entries.
for (const entry of reportList) {
  if (!(entry.slug in relatedTier2)) {
    throw new Error(`relatedTier2 is missing an entry for "${entry.slug}"`);
  }
}
for (const [slug, related] of Object.entries(relatedTier2)) {
  for (const r of related) {
    if (r.tier !== 2 || r.slug === slug) {
      throw new Error(`relatedTier2["${slug}"] must list other Tier 2 solutions only`);
    }
  }
}

// Per-page hero images for the solution pages (Canva-licensed set); keyed by slug.
export const solutionHeroes: Record<string, string> = {
  "route-intelligence": "/marketing/hero/solutions/route-intelligence.jpg",
  "risk-assessment": "/marketing/hero/solutions/risk-assessment.jpg",
  "location-timeline": "/marketing/hero/solutions/location-timeline.jpg",
  "weather-brief": "/marketing/hero/solutions/weather-brief.jpg",
  "medical-access": "/marketing/hero/solutions/medical-access.jpg",
  "student-journey": "/marketing/hero/solutions/student-journey.jpg",
  "field-trips": "/marketing/hero/solutions/field-trips.jpg",
  "standard-documentation": "/marketing/hero/solutions/standard-documentation.jpg",
  "conference-visits": "/marketing/hero/solutions/conference-visits.jpg",
  "duty-manager-simulation": "/marketing/hero/solutions/duty-manager-simulation.jpg",
  "duty-manager": "/marketing/hero/solutions/duty-manager.jpg",
  "incident-reporting": "/marketing/hero/solutions/incident-reporting.jpg",
};
