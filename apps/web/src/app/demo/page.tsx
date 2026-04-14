"use client";

import dynamic from "next/dynamic";

const ActivityRiskProfile = dynamic(
  () => import("@/components/interactive/ActivityRiskProfile").then((m) => m.ActivityRiskProfile),
  { ssr: false }
);
const StressTest = dynamic(
  () => import("@/components/interactive/StressTest").then((m) => m.StressTest),
  { ssr: false }
);
const ComplianceScorecard = dynamic(
  () => import("@/components/interactive/ComplianceScorecard").then((m) => m.ComplianceScorecard),
  { ssr: false }
);
const Standardisation = dynamic(
  () => import("@/components/interactive/Standardisation").then((m) => m.Standardisation),
  { ssr: false }
);
const TripViews = dynamic(
  () => import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false }
);
const WeatherIntelligence = dynamic(
  () => import("@/components/interactive/WeatherIntelligence").then((m) => m.WeatherIntelligence),
  { ssr: false }
);
const SingaporeLocations = dynamic(
  () => import("@/components/interactive/SingaporeLocations").then((m) => m.SingaporeLocations),
  { ssr: false }
);
const SingaporeDayView = dynamic(
  () => import("@/components/interactive/SingaporeDayView").then((m) => m.SingaporeDayView),
  { ssr: false }
);

export default function DemoPage() {
  return (
    <main>
      {/* Activity Risk Profile */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Activity Risk Profile</h2>
          <p className="body-text-secondary mb-8">
            Every activity scored across seven dimensions. Activities above threshold trigger full RAMS documentation.
          </p>
          <ActivityRiskProfile />
        </div>
      </section>

      {/* Trip Views */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Trip Views</h2>
          <p className="body-text-secondary mb-8">
            Multiple views of the same trip data — calendar, itinerary, route, and location.
          </p>
          <TripViews />
        </div>
      </section>

      {/* Stress Test */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Trip Stress Test</h2>
          <p className="body-text-secondary mb-8">
            1,000 simulated iterations of your specific trip. Probability-weighted outcomes.
          </p>
          <StressTest />
        </div>
      </section>

      {/* Compliance Scorecard */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Compliance Assessment</h2>
          <p className="body-text-secondary mb-8">
            ISO 31031 alignment scored across ten assessment dimensions.
          </p>
          <ComplianceScorecard />
        </div>
      </section>

      {/* Standardisation */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Program Standardisation</h2>
          <p className="body-text-secondary mb-8">
            Raw provider itineraries converted to structured, verified activity ledgers.
          </p>
          <Standardisation />
        </div>
      </section>

      {/* Weather Intelligence */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Weather Intelligence</h2>
          <p className="body-text-secondary mb-8">
            15-year historical climate analysis. Daily conditions, UV index, precipitation probability, and operational weather concerns.
          </p>
          <WeatherIntelligence />
        </div>
      </section>

      {/* Singapore Day-by-Day Location Intelligence */}
      <section className="section-padding">
        <div className="container-narrow">
          <h2 className="heading-section mb-4">Location Intelligence — Singapore</h2>
          <p className="body-text-secondary mb-8">
            A different trip, the same standard. Filter by day to see each location with nearest emergency facility and drive time.
          </p>
          <SingaporeDayView />
        </div>
      </section>
    </main>
  );
}
