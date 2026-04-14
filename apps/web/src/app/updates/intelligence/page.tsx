"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

/* ── Dynamic imports (SSR disabled — interactive components) ── */

const Standardisation = dynamic(
  () => import("@/components/interactive/Standardisation").then((m) => m.Standardisation),
  { ssr: false }
);
const ActivityRiskProfile = dynamic(
  () => import("@/components/interactive/ActivityRiskProfile").then((m) => m.ActivityRiskProfile),
  { ssr: false }
);
const ComplianceScorecard = dynamic(
  () => import("@/components/interactive/ComplianceScorecard").then((m) => m.ComplianceScorecard),
  { ssr: false }
);
const StressTest = dynamic(
  () => import("@/components/interactive/StressTest").then((m) => m.StressTest),
  { ssr: false }
);
const TripViews = dynamic(
  () => import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false }
);

/* ══════════════════════════════════════════════════
   DOCUMENT DATA
   ══════════════════════════════════════════════════ */

interface DocumentCard {
  id: string;
  name: string;
  description: string;
  component: "standardisation" | "arp" | "rams" | "compliance" | "stress-test" | "trip-views";
  schoolUse: string;
  providerUse: string;
}

const DOCUMENTS: DocumentCard[] = [
  {
    id: "standardisation",
    name: "Program Standardisation",
    description:
      "Raw itineraries become structured activity ledgers.",
    component: "standardisation",
    schoolUse: "Schools see exactly what's happening and when.",
    providerUse: "Providers demonstrate operational thoroughness.",
  },
  {
    id: "activity-risk-profile",
    name: "Activity Risk Profile",
    description:
      "Every activity scored across seven dimensions.",
    component: "arp",
    schoolUse:
      "Schools understand the risk shape of a trip.",
    providerUse:
      "Providers show they've assessed their own activities independently.",
  },
  {
    id: "rams",
    name: "RAMS Documentation",
    description:
      "Hazard identification, control measures, residual risk. Activities above threshold get full documentation.",
    component: "rams",
    schoolUse: "Schools need this for governance sign-off.",
    providerUse:
      "Providers who include it win proposals over those who don't.",
  },
  {
    id: "compliance",
    name: "Compliance Assessment",
    description: "ISO 31031 alignment across ten dimensions.",
    component: "compliance",
    schoolUse:
      "Schools see where their framework is strong and where the gaps are.",
    providerUse:
      "Providers demonstrate alignment with recognized standards.",
  },
  {
    id: "stress-test",
    name: "Trip Stress Test",
    description:
      "1,000 simulated iterations. Probability-weighted outcomes, not worst-case fear.",
    component: "stress-test",
    schoolUse: "Schools see what a realistic bad day looks like.",
    providerUse: "Providers use this to train their staff.",
  },
  {
    id: "trip-views",
    name: "Trip Views",
    description:
      "Multiple views of the same data — calendar, itinerary, route, location.",
    component: "trip-views",
    schoolUse: "Schools get oversight.",
    providerUse: "Providers get operational tools.",
  },
];

/* ══════════════════════════════════════════════════
   COMPONENT RENDERER
   ══════════════════════════════════════════════════ */

function InteractiveSlot({ type }: { type: DocumentCard["component"] }) {
  switch (type) {
    case "standardisation":
      return <Standardisation />;
    case "arp":
      return <ActivityRiskProfile />;
    case "compliance":
      return <ComplianceScorecard />;
    case "stress-test":
      return <StressTest />;
    case "trip-views":
      return <TripViews />;
    case "rams":
      return (
        <div
          className="rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: "var(--band-background)",
            border: "1px dashed var(--border-color)",
            padding: "3rem 2rem",
            minHeight: "12rem",
          }}
        >
          <div className="text-center">
            <p
              className="text-sm font-semibold uppercase tracking-wide mb-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              RAMS Preview
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--text-tertiary)" }}
            >
              Available in the full assessment
            </p>
          </div>
        </div>
      );
  }
}

/* ══════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════ */

export default function IntelligencePage() {
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
          href="/what-we-do"
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
            The Intelligence Suite
          </p>
          <h1
            className="heading-section mb-6"
            style={{ color: "var(--brand-navy)", fontSize: "2.5rem", lineHeight: 1.1 }}
          >
            Six documents. One structured standard.
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            Each document serves a specific function in the assessment lifecycle.
            Schools and providers see the same intelligence.
          </p>
        </div>
      </section>

      {/* Document cards */}
      {DOCUMENTS.map((doc, i) => (
        <section
          key={doc.id}
          id={doc.id}
          className={`section-padding${i % 2 === 1 ? " section-band" : ""}`}
        >
          <div className="container-narrow">
            {/* Header */}
            <div className="mb-8">
              <h2
                className="heading-section mb-3"
                style={{ color: "var(--brand-navy)" }}
              >
                {doc.name}
              </h2>
              <p
                className="text-lg"
                style={{ color: "var(--text-primary)" }}
              >
                {doc.description}
              </p>
            </div>

            {/* Interactive component */}
            <div className="mb-8">
              <InteractiveSlot type={doc.component} />
            </div>

            {/* Dual-audience line */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div
                className="rounded-lg p-5"
                style={{
                  backgroundColor: "rgba(13,53,88,0.04)",
                  borderLeft: "3px solid var(--brand-navy)",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "var(--brand-navy)" }}
                >
                  Schools
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {doc.schoolUse}
                </p>
              </div>
              <div
                className="rounded-lg p-5"
                style={{
                  backgroundColor: "rgba(45,138,78,0.04)",
                  borderLeft: "3px solid #2d8a4e",
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                  style={{ color: "#2d8a4e" }}
                >
                  Providers
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {doc.providerUse}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--band-background)" }}
      >
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="rounded-lg bg-white p-8"
              style={{
                border: "1px solid var(--border-color)",
                borderTopColor: "var(--brand-navy)",
                borderTopWidth: "4px",
              }}
            >
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Need this for your school&apos;s trips?
              </p>
              <Link
                href="/contact"
                className="inline-block font-medium transition-opacity hover:opacity-80"
                style={{ color: "var(--brand-navy)" }}
              >
                Start a conversation &rarr;
              </Link>
            </div>
            <div
              className="rounded-lg bg-white p-8"
              style={{
                border: "1px solid var(--border-color)",
                borderTopColor: "#2d8a4e",
                borderTopWidth: "4px",
              }}
            >
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Want this in your proposals?
              </p>
              <Link
                href="/contact"
                className="inline-block font-medium transition-opacity hover:opacity-80"
                style={{ color: "#2d8a4e" }}
              >
                Start a conversation &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
