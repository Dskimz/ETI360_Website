"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

/* ── Dynamic imports (SSR disabled — interactive components) ── */

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
const TripViews = dynamic(
  () => import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false }
);

/* ══════════════════════════════════════════════════
   SECTION DATA
   ══════════════════════════════════════════════════ */

interface MethodSection {
  id: string;
  title: string;
  lead: string;
  explanation: string;
  component: "arp" | "stress-test" | "compliance" | "trip-views";
}

const SECTIONS: MethodSection[] = [
  {
    id: "risk-profiling",
    title: "Risk Profiling",
    lead: "Seven dimensions. Every activity. The same framework applied uniformly.",
    component: "arp",
    explanation:
      "Physical intensity, technical skill, environmental exposure, supervision intensity, equipment dependence, location conditions, participant readiness. Each dimension scored 1\u20135. Composite scores above 14 trigger full RAMS documentation.",
  },
  {
    id: "probability-modelling",
    title: "Probability Modelling",
    lead: "What does a realistic bad day look like?",
    component: "stress-test",
    explanation:
      "1,000 Monte Carlo simulations using destination-conditioned event probabilities, activity sequence modelling, and time-to-definitive-care calculations. P50 and P90 scenarios \u2014 not worst-case fear.",
  },
  {
    id: "compliance-alignment",
    title: "Compliance Alignment",
    lead: "Measured against ISO 31031.",
    component: "compliance",
    explanation:
      "Ten dimensions from travel risk management to post-trip review. Each scored against the recognized international standard for travel risk management.",
  },
  {
    id: "location-intelligence",
    title: "Location Intelligence",
    lead: "Where students are. Where hospitals are. How long it takes.",
    component: "trip-views",
    explanation:
      "Every location mapped with nearest emergency facility, drive time calculations, and transport route geometry. The same data feeds the stress test and the operational plan.",
  },
];

/* ══════════════════════════════════════════════════
   COMPONENT RENDERER
   ══════════════════════════════════════════════════ */

function MethodComponent({ type }: { type: MethodSection["component"] }) {
  switch (type) {
    case "arp":
      return <ActivityRiskProfile />;
    case "stress-test":
      return <StressTest />;
    case "compliance":
      return <ComplianceScorecard />;
    case "trip-views":
      return <TripViews />;
  }
}

/* ══════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════ */

export default function MethodologyPage() {
  return (
    <>
      {/* Proposed update banner */}
      <div
        className="w-full py-2 px-4 text-center text-sm font-medium tracking-wide"
        style={{ backgroundColor: "var(--brand-navy)", color: "#fff" }}
      >
        <span className="uppercase mr-3">Proposed Update</span>
        <span className="opacity-70 mr-1">&mdash; comparing against current site</span>
        <Link
          href="/approach"
          className="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity"
          style={{ color: "var(--brand-gold)" }}
        >
          View current &rarr;
        </Link>
      </div>

      {/* Hero */}
      <section className="section-padding">
        <div className="container-narrow text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-6" style={{ color: "var(--brand-gold)" }}>
            The Methodology
          </p>
          <h1
            className="heading-section mb-6"
            style={{ color: "var(--brand-navy)", fontSize: "2.5rem", lineHeight: 1.1 }}
          >
            Traceable Methods. Sourced Scores.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            The same methodology applied to every trip, regardless of who
            commissions it. The standard doesn&apos;t change.
          </p>
        </div>
      </section>

      {/* Method sections — full interactive components */}
      {SECTIONS.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className={`section-padding${i % 2 === 1 ? " section-band" : ""}`}
        >
          <div className="container-narrow">
            {/* Header */}
            <div className="mb-6">
              <h2
                className="heading-section mb-3"
                style={{ color: "var(--brand-navy)" }}
              >
                {section.title}
              </h2>
              <p
                className="text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                {section.lead}
              </p>
            </div>

            {/* Full interactive component */}
            <div className="mb-8">
              <MethodComponent type={section.component} />
            </div>

            {/* Explanation block */}
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: "rgba(13,53,88,0.03)",
                borderLeft: "3px solid var(--brand-gold)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {section.explanation}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--band-background)" }}
      >
        <div className="container-narrow text-center max-w-2xl mx-auto">
          <h2
            className="heading-section mb-4"
            style={{ color: "var(--brand-navy)" }}
          >
            See the full output
          </h2>
          <p className="body-text-secondary mb-8">
            The methodology page shows how each score is produced. The
            intelligence page shows what schools and providers actually receive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/updates/intelligence"
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--brand-navy)",
                color: "#fff",
              }}
            >
              View the intelligence suite &rarr;
            </Link>
            <Link
              href="/updates/see-it"
              className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "transparent",
                color: "var(--brand-navy)",
                border: "1px solid var(--border-color)",
              }}
            >
              See a sample assessment &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
