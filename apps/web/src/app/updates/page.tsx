"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

/* ── Dynamic interactive components (client-only) ── */

const Standardisation = dynamic(
  () =>
    import("@/components/interactive/Standardisation").then(
      (m) => m.Standardisation
    ),
  { ssr: false }
);

const ActivityRiskProfile = dynamic(
  () =>
    import("@/components/interactive/ActivityRiskProfile").then(
      (m) => m.ActivityRiskProfile
    ),
  { ssr: false }
);

const TripViews = dynamic(
  () =>
    import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false }
);

/* ══════════════════════════════════════════════════════
   SECTION 0 — Preview Banner
   ══════════════════════════════════════════════════════ */

function PreviewBanner() {
  return (
    <div
      style={{
        background: "var(--brand-navy)",
        color: "#ffffff",
        fontSize: "0.8125rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
        padding: "0.625rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <span style={{ opacity: 0.8 }}>PROPOSED UPDATE</span>
      <span style={{ opacity: 0.35 }}>&mdash;</span>
      <span style={{ opacity: 0.6 }}>comparing against current site</span>
      <Link
        href="/"
        style={{
          color: "var(--brand-gold)",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        View current &rarr;
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1 — Hero + Transformation
   ══════════════════════════════════════════════════════ */

function HeroTransformation() {
  return (
    <section className="section-padding" style={{ paddingBottom: "3rem" }}>
      <div className="container-narrow" style={{ maxWidth: "56rem" }}>
        <p className="eyebrow mb-4">EDUCATIONAL TRAVEL INTELLIGENCE</p>
        <h1 className="heading-display mb-6">
          The standard for educational travel intelligence.
        </h1>
        <hr className="hero-rule" />
        <p
          className="body-text"
          style={{
            maxWidth: "36rem",
            marginBottom: "3.5rem",
          }}
        >
          Raw trip documents in. Structured, scored intelligence out.
        </p>
      </div>

      {/* Standardisation before/after */}
      <div className="container-narrow">
        <Standardisation />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2 — What It Produces
   ══════════════════════════════════════════════════════ */

function WhatItProduces() {
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <div className="mb-10">
          <p className="eyebrow mb-3">OUTPUT</p>
          <h2 className="heading-section mb-4">
            Every trip, one structured standard.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Mini ARP glimpse */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderTop: "3px solid var(--brand-gold)",
              background: "var(--page-background)",
              padding: "1.5rem",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "1rem",
              }}
            >
              Activity Risk Profile
            </p>
            <ActivityRiskProfile />
          </div>

          {/* Trip Views glimpse */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderTop: "3px solid var(--brand-gold)",
              background: "var(--page-background)",
              padding: "1.5rem",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                marginBottom: "1rem",
              }}
            >
              Trip Views
            </p>
            <TripViews />
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/updates/see-it"
            className="text-sm font-semibold"
            style={{ color: "var(--brand-navy)" }}
          >
            See the full interactive suite &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3 — How Both Sides Benefit
   ══════════════════════════════════════════════════════ */

function BothSidesBenefit() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Schools card */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderTop: "3px solid var(--brand-navy)",
              background: "var(--page-background)",
              padding: "2rem",
            }}
          >
            <p
              className="eyebrow mb-4"
              style={{ color: "var(--brand-navy)", opacity: 0.6 }}
            >
              FOR THE PERSON WHO SIGNS OFF
            </p>
            <p
              className="statement mb-6"
              style={{ fontSize: "1.125rem", maxWidth: "none" }}
            >
              Traceable evidence for trip approval. Activity risk scores,
              compliance alignment, and structured documentation — produced
              independently, not by the person who organized the trip.
            </p>
            <Link
              href="/for-schools"
              className="text-sm font-semibold"
              style={{ color: "var(--brand-navy)" }}
            >
              How schools use ETI360 &rarr;
            </Link>
          </div>

          {/* Providers card */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              borderTop: "3px solid #2d7a4f",
              background: "var(--page-background)",
              padding: "2rem",
            }}
          >
            <p
              className="eyebrow mb-4"
              style={{ color: "#2d7a4f", opacity: 0.8 }}
            >
              FOR THE TEAM PROPOSING THE TRIP
            </p>
            <p
              className="statement mb-6"
              style={{ fontSize: "1.125rem", maxWidth: "none" }}
            >
              Institutional-quality documentation that strengthens proposals.
              Structured itineraries, risk assessments, and compliance
              scorecards — the evidence school governance boards look for.
            </p>
            <Link
              href="/for-providers"
              className="text-sm font-semibold"
              style={{ color: "var(--brand-navy)" }}
            >
              How providers use ETI360 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4 — The Process
   ══════════════════════════════════════════════════════ */

const processSteps = [
  {
    number: 1,
    title: "Send",
    body: "Upload the itinerary, provider proposal, or trip brief. Any format.",
  },
  {
    number: 2,
    title: "Standardise",
    body: "ETI360 normalizes the trip into a structured, scored format — activities, locations, timelines, risk profiles.",
  },
  {
    number: 3,
    title: "Verify",
    body: "Three parties verify the data before intelligence is produced. The school, the provider, and ETI360 each confirm independently.",
  },
  {
    number: 4,
    title: "Intelligence",
    body: "Structured output: risk assessments, compliance scorecards, operational playbooks, and approval-ready documentation.",
  },
];

function TheProcess() {
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <div className="mb-10">
          <p className="eyebrow mb-3">HOW IT WORKS</p>
          <h2 className="heading-section">The process</h2>
        </div>

        <div className="process-steps" style={{ maxWidth: "40rem" }}>
          {processSteps.map((step) => (
            <div key={step.number} className="process-step">
              <div
                className="process-step-number"
                style={{
                  background: "var(--brand-gold)",
                  color: "var(--brand-navy)",
                  borderColor: "var(--brand-gold)",
                }}
              >
                {step.number}
              </div>
              <div>
                <p className="process-step-title">{step.title}</p>
                <p className="process-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5 — Independence + CTA
   ══════════════════════════════════════════════════════ */

function IndependenceCta() {
  return (
    <section className="section-padding section-band-dark">
      <div className="container-narrow text-center">
        <hr
          className="gold-rule mx-auto mb-8"
          style={{ width: "3rem", opacity: 0.8 }}
        />
        <h2
          className="text-3xl font-bold text-white mb-4"
          style={{ maxWidth: "32rem", margin: "0 auto 1rem" }}
        >
          ETI360 structures evidence. Schools make decisions.
        </h2>
        <p
          className="text-lg mb-10 mx-auto"
          style={{
            color: "rgba(255, 255, 255, 0.6)",
            maxWidth: "28rem",
          }}
        >
          Independent intelligence for every school trip — from first proposal
          to final sign-off.
        </p>
        <Link
          href="/contact"
          className="btn-primary"
          style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}
        >
          Start with one trip
        </Link>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */

export default function UpdatesHomePage() {
  return (
    <>
      <PreviewBanner />
      <main>
        <HeroTransformation />
        <WhatItProduces />
        <BothSidesBenefit />
        <TheProcess />
        <IndependenceCta />
      </main>
    </>
  );
}
