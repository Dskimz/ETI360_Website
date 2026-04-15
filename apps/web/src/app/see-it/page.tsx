"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

/* ── Dynamic imports (no SSR — canvas/SVG components) ── */

const Standardisation = dynamic(
  () => import("@/components/interactive/Standardisation").then((m) => m.Standardisation),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const ActivityRiskProfile = dynamic(
  () => import("@/components/interactive/ActivityRiskProfile").then((m) => m.ActivityRiskProfile),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const RAMSPreview = dynamic(
  () => import("@/components/interactive/RAMSPreview").then((m) => m.RAMSPreview),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const TripViews = dynamic(
  () => import("@/components/interactive/TripViews").then((m) => m.TripViews),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const StressTest = dynamic(
  () => import("@/components/interactive/StressTest").then((m) => m.StressTest),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const ComplianceScorecard = dynamic(
  () => import("@/components/interactive/ComplianceScorecard").then((m) => m.ComplianceScorecard),
  { ssr: false, loading: () => <ComponentLoader /> }
);

/* ── Loading placeholder ── */

function ComponentLoader() {
  return (
    <div
      style={{
        minHeight: 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--band-background)",
        border: "1px solid var(--border-color)",
        color: "var(--text-tertiary)",
        fontSize: "0.875rem",
      }}
    >
      Loading...
    </div>
  );
}

/* ── Narrative section wrapper ── */

function NarrativeSection({
  id,
  orient,
  frame,
  bridge,
  bridgeNote,
  children,
  band,
}: {
  id: string;
  orient: string;
  frame: string;
  bridge?: string;
  bridgeNote?: string;
  children: React.ReactNode;
  band?: boolean;
}) {
  return (
    <section id={id} className={band ? "section-padding section-band" : "section-padding"}>
      <div className="container-narrow">
        {/* Orient */}
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.7,
            color: "var(--text-tertiary)",
            maxWidth: "44rem",
            marginBottom: "1rem",
            fontStyle: "italic",
          }}
        >
          {orient}
        </p>

        {/* Frame */}
        <p
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.65,
            color: "var(--text-primary)",
            maxWidth: "44rem",
            marginBottom: "2.5rem",
          }}
        >
          {frame}
        </p>

        {/* Present — the component */}
        {children}

        {/* Bridge */}
        {bridge && (
          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            {bridge}
          </p>
        )}
        {bridgeNote && (
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.9375rem",
              lineHeight: 1.5,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              paddingLeft: "1rem",
            }}
          >
            {bridgeNote}
          </p>
        )}
      </div>
    </section>
  );
}

/* ── Section heading ── */

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1.5rem",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          background: "var(--brand-navy)",
          color: "#ffffff",
          fontSize: "0.75rem",
          fontWeight: 700,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--brand-gold)",
        }}
      >
        {title}
      </span>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   HOMEPAGE
   ════════════════════════════════════════════════════ */

export default function SeeItPage() {
  return (
    <main>
      {/* ── INTRO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          padding: "5rem 1.5rem 4rem",
        }}
      >
        <img
          src="/images/hero-home.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13, 53, 88, 0.88)",
          }}
        />
        <div className="container-narrow" style={{ maxWidth: "44rem", position: "relative" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--brand-gold)",
              marginBottom: "1.5rem",
            }}
          >
            Interactive assessment
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            See the complete assessment.
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.75)",
              marginBottom: "1.5rem",
            }}
          >
            This is a complete assessment of the Borneo Rainforest Expedition — a 7-day Year 10 trip with 28 students. Everything below was produced from the same stack of documents every school trip generates.
          </p>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Toggle to the Singapore trip to see how the same system adapts to a completely different risk profile.
          </p>
        </div>
      </section>

      {/* ── TRIP CONTEXT BAR ── */}
      <div
        style={{
          background: "var(--page-background)",
          borderBottom: "1px solid var(--border-color)",
          padding: "1rem 1.5rem",
          position: "sticky",
          top: "calc(4rem + 3px)",
          zIndex: 40,
        }}
      >
        <div
          className="container-narrow"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-tertiary)",
            }}
          >
            Sample trips:
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              background: "var(--brand-navy)",
              color: "#ffffff",
              fontSize: "0.8125rem",
              fontWeight: 600,
              borderRadius: "2px",
            }}
          >
            Borneo Rainforest Expedition
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "var(--brand-gold)",
              }}
            >
              High exposure
            </span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              background: "var(--band-background)",
              color: "var(--brand-navy)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              border: "1px solid var(--border-color)",
              borderRadius: "2px",
            }}
          >
            Active Singapore Adventure
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "var(--text-tertiary)",
              }}
            >
              Low exposure
            </span>
          </span>
        </div>
      </div>

      {/* ── SECTION 1: PROGRAM STANDARDISATION ── */}
      <section id="standardisation" className="section-padding">
        <div className="container-narrow">
          <SectionLabel number="01" title="Program Standardisation" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            A trip provider sends a PDF. It&rsquo;s 12 pages of narrative, photos, and promises. Somewhere in there is a schedule.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Program Standardisation converts whatever arrives into a structured activity ledger — every minute accounted for, every location resolved, every gap flagged. This ledger feeds everything that follows.
          </p>
          <Standardisation />
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "44rem" }}>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-tertiary)" }}>
              <strong style={{ color: "var(--brand-navy)" }}>Borneo:</strong> The provider sent a 4-page PDF. Arrival times were vague. Transport between locations wasn&rsquo;t specified. Three hours on Day 2 were unaccounted for.
            </p>
            <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-tertiary)" }}>
              <strong style={{ color: "var(--brand-navy)" }}>Singapore:</strong> The provider sent a detailed day-by-day schedule — but meal locations were unspecified, MRT routes weren&rsquo;t confirmed, and no emergency hospitals were identified for any district.
            </p>
          </div>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            With a structured ledger, every activity can now be scored.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: ACTIVITY RISK PROFILE ── */}
      <section id="risk-profiling" className="section-padding section-band">
        <div className="container-narrow">
          <SectionLabel number="02" title="Activity Risk Profile" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            A cooking class and white-water rafting are both &lsquo;activities&rsquo; on an itinerary. A flat list treats them the same.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            The Activity Risk Profile scores each one across seven dimensions. Toggle activities on and off to compare their risk shapes. Activities above a composite threshold of 14 trigger full RAMS documentation.
          </p>
          <ActivityRiskProfile />
          <p style={{ marginTop: "2rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-tertiary)", maxWidth: "44rem" }}>
            The Borneo trip has three activities above threshold — rafting, snorkelling, and kayaking. The Singapore trip has none. The system is proportionate — a heritage walk in Kampong Gelam doesn&rsquo;t trigger the same documentation as a Grade III rapid.
          </p>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            Three activities on the Borneo trip crossed the threshold. Here&rsquo;s what happens to them.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: RAMS ── */}
      <section id="rams" className="section-padding">
        <div className="container-narrow">
          <SectionLabel number="03" title="RAMS Documentation" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            Activities above threshold don&rsquo;t just get flagged — they get full risk documentation. Hazard identification. Specific controls. Residual risk scoring.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Each control starts with a verified action verb — require, brief, assign, halt, inspect. No vague language. No &lsquo;ensure appropriate measures.&rsquo; Each control is observable and verifiable.
          </p>
          <RAMSPreview />
          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            The same structured data — 42 activities, 14 locations, 7 days — can be viewed through multiple lenses.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: TRIP VIEWS ── */}
      <section id="trip-views" className="section-padding section-band">
        <div className="container-narrow">
          <SectionLabel number="04" title="Trip Views" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            A trip leader needs the minute-by-minute schedule. A head of school needs the day-by-day shape. Operations needs the map with hospitals. Parents need to know their child is accounted for at every point.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            One ledger, multiple views. Each designed for a different decision. Click through the tabs.
          </p>
          <TripViews />
          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            The trip is planned. The activities are scored. The views are built. But what actually happens when 28 students are on that river?
          </p>
        </div>
      </section>

      {/* ── SECTION 5: STRESS TEST ── */}
      <section id="stress-test" className="section-padding">
        <div className="container-narrow">
          <SectionLabel number="05" title="Trip Stress Test" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            Risk assessments describe what could go wrong. Stress tests describe what probably will go wrong — and how often.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            1,000 simulated iterations of this specific trip. The P50 tab shows the realistic scenario — the trip most school groups would experience. The P90 shows a statistically bad trip — not the worst case, but what happens when several things go wrong in the same week.
          </p>
          <StressTest />
          <p style={{ marginTop: "2rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-tertiary)", maxWidth: "44rem" }}>
            The Borneo P90 includes a raft capsize, a GI outbreak, and a modified programme. The Singapore P90 includes a thunderstorm disruption, an MRT delay, and a student medical incident at a market. Different risks. Same structured response.
          </p>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            The stress test reveals which days carry the most exposure. The compliance assessment checks whether the school&rsquo;s governance framework covers what those days require.
          </p>
        </div>
      </section>

      {/* ── SECTION 6: COMPLIANCE ── */}
      <section id="compliance" className="section-padding section-band">
        <div className="container-narrow">
          <SectionLabel number="06" title="Compliance Assessment" />
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "1rem",
              fontStyle: "italic",
            }}
          >
            ISO 31031 is the international standard for managing risk in youth and school travel. Most schools have never mapped their policies against it.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Green means covered. Amber means partial. Red means a gap. The assessment makes the current state visible so decisions can be made.
          </p>
          <ComplianceScorecard />
          <p style={{ marginTop: "2rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--text-tertiary)", maxWidth: "44rem" }}>
            Both trips are assessed against the same ten dimensions. The Borneo trip exposes gaps in dynamic risk assessment. The Singapore trip scores higher — but reveals a gap in post-trip review that applies to the entire programme.
          </p>
          <p
            style={{
              marginTop: "2rem",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            This is what structured trip intelligence looks like — from a raw itinerary to a fully assessed, compliance-checked, stress-tested programme. The same standard, applied proportionately.
          </p>
        </div>
      </section>

      {/* ── SECTION 7: DUAL-AUDIENCE FORK ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
            className="md-grid-2"
          >
            {/* Schools */}
            <div
              style={{
                background: "var(--page-background)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid var(--brand-navy)",
                padding: "2.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--brand-navy)",
                  marginBottom: "1rem",
                }}
              >
                For the person who signs off
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                }}
              >
                You just saw a trip move from a raw provider PDF to structured, scored, stress-tested intelligence. Every document you&rsquo;d receive is designed for governance — traceable evidence for the decision you need to make.
              </p>
              <Link
                href="/for-schools"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--brand-navy)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                How schools use ETI360 &rarr;
              </Link>
            </div>

            {/* Providers */}
            <div
              style={{
                background: "var(--page-background)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid #1a5c3a",
                padding: "2.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#1a5c3a",
                  marginBottom: "1rem",
                }}
              >
                For the team proposing the trip
              </p>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                }}
              >
                You just saw your itinerary become institutional-quality documentation. Activity scores, compliance alignment, structured views — the evidence school governance boards are looking for.
              </p>
              <Link
                href="/for-providers"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#1a5c3a",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                How providers use ETI360 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: INDEPENDENCE + CTA ── */}
      <section
        className="section-padding"
        style={{
          background: "var(--brand-navy)",
          color: "#ffffff",
        }}
      >
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1.2,
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            ETI360 structures evidence. Schools make decisions.
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2rem",
            }}
          >
            Every assessment is traceable. Every score is sourced. Every document identifies the basis on which conclusions were reached. ETI360 does not approve trips, certify providers, or guarantee outcomes.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem",
              fontStyle: "italic",
            }}
          >
            The next trip your school approves — or the next proposal your team submits — could have structured evidence behind it.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                background: "var(--brand-gold)",
                color: "var(--brand-navy)",
              }}
            >
              Start with one trip &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Responsive grid helper ── */}
      <style>{`
        @media (min-width: 768px) {
          .md-grid-2 {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
