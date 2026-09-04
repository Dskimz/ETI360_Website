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
  locationTimeline: {
    slug: "location-timeline",
    tier: 2,
    name: "Calendar + Timeline",
    question: "Do you know the scheduled location of every trip group, on every trip?",
    summary: "One structured itinerary presented as a detailed calendar and a continuous trip timeline.",
    href: "/for-schools/location-timeline",
    image: "/codex/MarketingCampaign/location-timeline.png",
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
    image: "/Claude/Questions/assets/medical-access.png",
    imageAlt: "ETI360 verified medical facility profiles",
  },
  studentJourney: {
    slug: "student-journey",
    tier: 2,
    name: "Student Journey Guide",
    question: "Is the educational purpose of each trip connected to its daily activities?",
    summary: "The learning purpose, the named activities and the shape of each day in one student-facing guide.",
    href: "/for-schools/student-journey",
    image: "/Claude/Questions/assets/student-journey-day.png",
    imageAlt: "ETI360 Student Journey Guide day page with map, activity cards and an hour-by-hour view of the day",
  },
  fieldTrips: {
    slug: "field-trips",
    tier: 2,
    name: "Field Trip Register",
    question: "Do you know every field trip your school will run this year?",
    summary: "A year of one-day trips prepared as one set, each issuing its own parent letter with the day, the route and emergency access.",
    href: "/for-schools/field-trips",
    image: "/Claude/Questions/assets/field-trip-parent-letter.png",
    imageAlt: "A field trip parent information letter carrying the day hour by hour, a route map from school and a map to the nearest emergency department",
  },
  standardDocumentation: {
    slug: "standard-documentation",
    tier: 2,
    name: "Standard Trip Documentation",
    question: "Do all of your field trips use the same documentation format?",
    summary: "A consistent structure across different trips, generated from one trip-specific record.",
    href: "/for-schools/standard-documentation",
    image: "/Claude/Questions/assets/std-documentation.png",
    imageAlt: "Three ETI360 itinerary documents using one standard format",
  },
  dutyManager: {
    slug: "duty-manager",
    tier: 3,
    name: "Duty Manager Dashboard",
    question: "Can your duty manager see where every traveling group is scheduled to be across all active trips?",
    summary: "Trip context with calls, messages, check-ins and follow-up tracked in one operating view.",
    href: "/for-schools/duty-manager",
    image: "/Claude/Questions/assets/scheduled-group-locations.png",
    imageAlt: "ETI360 Duty Manager Dashboard with six current trips, the selected trip's scheduled location, and the next four hours across every trip",
  },
  incidentReporting: {
    slug: "incident-reporting",
    tier: 3,
    name: "Incident Reporting",
    question: "Can your duty team log an incident, track its status, and preserve the full record in one place?",
    summary: "Context, communications, actions, status and retained documentation in one record.",
    href: "/for-schools/incident-reporting",
    image: "/Claude/Questions/assets/incident-record.png",
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
  "location-timeline": [c.standardDocumentation, c.routeIntelligence, c.weatherBrief],
  "weather-brief": [c.routeIntelligence, c.locationTimeline, c.fieldTrips],
  "medical-access": [c.routeIntelligence, c.locationTimeline, c.fieldTrips],
  "student-journey": [c.locationTimeline, c.standardDocumentation, c.routeIntelligence],
  "field-trips": [c.routeIntelligence, c.weatherBrief, c.medicalAccess],
  "standard-documentation": [c.locationTimeline, c.fieldTrips, c.routeIntelligence],
  "duty-manager": [c.locationTimeline, c.medicalAccess, c.routeIntelligence],
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
