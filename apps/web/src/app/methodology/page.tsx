"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const SERIF = `"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif`;

/* ── Loading placeholder ── */

function ComponentLoader() {
  return (
    <div
      style={{
        minHeight: 240,
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

/* ── Dynamic imports (no SSR) ── */

const Standardisation = dynamic(
  () => import("@/components/interactive/Standardisation").then((m) => m.Standardisation),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const ActivityRiskProfile = dynamic(
  () => import("@/components/interactive/ActivityRiskProfile").then((m) => m.ActivityRiskProfile),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const ComplianceScorecard = dynamic(
  () => import("@/components/interactive/ComplianceScorecard").then((m) => m.ComplianceScorecard),
  { ssr: false, loading: () => <ComponentLoader /> }
);
const StressTest = dynamic(
  () => import("@/components/interactive/StressTest").then((m) => m.StressTest),
  { ssr: false, loading: () => <ComponentLoader /> }
);

/* ── Step eyebrow label ── */

function StepLabel({ number, title }: { number: string; title: string }) {
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

/* ── Bridge connector ── */

function Bridge({ text }: { text: string }) {
  return (
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
      {text}
    </p>
  );
}

/* ── Frame paragraph ── */

function Frame({ text }: { text: string }) {
  return (
    <p
      style={{
        fontSize: "1.125rem",
        lineHeight: 1.65,
        color: "var(--text-primary)",
        maxWidth: "44rem",
        marginBottom: "2.5rem",
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

/* ════════════════════════════════════════════════════
   METHODOLOGY PAGE
   ════════════════════════════════════════════════════ */

export default function MethodologyPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          padding: "6rem 1.5rem 5rem",
        }}
      >
        <img
          src="/images/hero-approach.png"
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
        <div className="container-narrow" style={{ position: "relative" }}>
          <div
            style={{
              width: "3.5rem",
              height: "0.25rem",
              background: "var(--brand-gold)",
              marginBottom: "2rem",
            }}
          />
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--brand-gold)",
              marginBottom: "1.25rem",
            }}
          >
            Methodology
          </p>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "3.5rem",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: "48rem",
              marginBottom: "2rem",
            }}
          >
            Traceable methods. Sourced scores. No black boxes.
          </h1>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "1.25rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.85)",
              maxWidth: "44rem",
              marginBottom: "1.5rem",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Most school trip risk assessments are written by the person organizing the trip and reviewed by someone who has never visited the destination.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "40rem",
            }}
          >
            The same methodology applied to every trip, regardless of who commissions it. The standard doesn&rsquo;t change.
          </p>
        </div>
      </section>

      {/* ── STEP 1: PROGRAM STANDARDISATION ── */}
      <section id="standardisation" className="section-padding">
        <div className="container-narrow">
          <StepLabel number="01" title="Program Standardisation" />
          <Frame text="Raw documents in. Structured intelligence out. The foundation &mdash; every minute accounted for, every location resolved, every gap flagged." />
          <Standardisation />
          <Bridge text="A structured ledger enables consistent scoring." />
        </div>
      </section>

      {/* ── STEP 2: ACTIVITY RISK PROFILING ── */}
      <section id="risk-profiling" className="section-padding section-band">
        <div className="container-narrow">
          <StepLabel number="02" title="Activity Risk Profiling" />
          <Frame text="Seven dimensions, each scored 1&ndash;5. The same activity assessed by two different people produces the same result. Activities above a composite threshold of 14 trigger full RAMS documentation." />
          <ActivityRiskProfile />
          <Bridge text="Scored activities placed in geographic context." />
        </div>
      </section>

      {/* ── STEP 3: LOCATION INTELLIGENCE ── */}
      <section id="location-intelligence" className="section-padding">
        <div className="container-narrow">
          <StepLabel number="03" title="Location Intelligence" />
          <Frame text="Every activity location mapped against emergency infrastructure. Hospital proximity, drive times, and time-to-definitive-care calculated for each venue. The question every parent asks &mdash; how far to help." />

          {/* Illustrative stats panel */}
          <div
            style={{
              border: "1px solid var(--border-color)",
              background: "var(--page-background)",
              padding: "2rem 2.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--brand-navy)",
                  lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}
              >
                14
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--text-tertiary)",
                }}
              >
                locations resolved to coordinates
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--brand-navy)",
                  lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}
              >
                3
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--text-tertiary)",
                }}
              >
                hospitals mapped with drive times
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--brand-navy)",
                  lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}
              >
                4.2 hr
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--text-tertiary)",
                }}
              >
                time-to-definitive-care (P50, Borneo)
              </p>
            </div>
          </div>

          <Bridge text="Placed activities assessed against standards." />
        </div>
      </section>

      {/* ── STEP 4: COMPLIANCE ALIGNMENT ── */}
      <section id="compliance" className="section-padding section-band">
        <div className="container-narrow">
          <StepLabel number="04" title="Compliance Alignment" />
          <Frame text="Ten ISO 31031 dimensions. Green means covered. Amber means partial. Red means a gap. The assessment doesn&rsquo;t judge the school &mdash; it makes the current state visible." />
          <ComplianceScorecard />
          <Bridge text="Assessed trips can be stress-tested." />
        </div>
      </section>

      {/* ── STEP 5: PROBABILISTIC MODELLING ── */}
      <section id="stress-test" className="section-padding">
        <div className="container-narrow">
          <StepLabel number="05" title="Probabilistic Modelling" />
          <Frame text="1,000 Monte Carlo iterations conditioned on this destination, these activities, this time of year. The P50 is the trip the school should plan for. The P90 is the trip the school should prepare for." />
          <StressTest />
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section
        className="section-padding"
        style={{
          background: "var(--brand-navy)",
          color: "#ffffff",
        }}
      >
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem",
            }}
          >
            ETI360 structures evidence. Schools make decisions. The methodology is open. The execution is consistent. Every assessment is documented. Every score identifies its basis.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/"
              className="btn-primary"
              style={{
                background: "var(--brand-gold)",
                color: "var(--brand-navy)",
              }}
            >
              See it in practice &rarr;
            </Link>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                background: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Start with one trip &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Responsive grid helper for stats panel ── */}
      <style>{`
        @media (max-width: 640px) {
          #location-intelligence div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
