"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

const WorkflowDiagram = dynamic(
  () => import("@/components/interactive/WorkflowDiagram").then((m) => m.WorkflowDiagram),
  { ssr: false }
);

/* ════════════════════════════════════════════════════
   FOR SCHOOLS
   ════════════════════════════════════════════════════ */

export default function ForSchoolsPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--brand-navy)",
          color: "#ffffff",
          padding: "6rem 1.5rem 5rem",
        }}
      >
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "44rem",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            You approve trips based on documents that weren&rsquo;t written for
            you. The provider&rsquo;s materials were written to sell the trip.
            The coordinator&rsquo;s were written to justify it. Your job is to
            find the evidence inside the enthusiasm &mdash; under time pressure,
            with full accountability.
          </p>
          <h1
            style={{
              fontSize: "2.75rem",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: "48rem",
              marginBottom: "1.5rem",
            }}
          >
            Structured evidence for the person who signs off.
          </h1>
        </div>
      </section>

      {/* ── SECTION 1: WHAT CHANGES ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2rem",
            }}
          >
            ETI360 gives you a single governance package where the analytical
            work is already done. The provider&rsquo;s itinerary has been
            structured into a verified activity ledger. Every activity has been
            scored independently across seven dimensions. Activities above
            threshold have full hazard documentation with specific, verifiable
            controls. The whole trip has been stress-tested against 1,000
            probability-weighted scenarios.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--brand-navy)",
              fontWeight: 600,
              maxWidth: "44rem",
            }}
          >
            You&rsquo;re not reading a provider&rsquo;s pitch. You&rsquo;re
            reading structured evidence &mdash; produced by the methodology, not
            by the person who organised the trip.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: WHAT THIS MEANS FOR GOVERNANCE ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Every document demonstrates the basis on which the decision was
            made. The risk scores are traceable. The controls are specific. The
            compliance alignment is mapped. If something goes wrong on a trip
            you approved, the documentation shows what was assessed, what was
            identified, and what was in place.
          </p>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            This is structured evidence of institutional due diligence.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: THE PROCESS ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <WorkflowDiagram />

          <p
            style={{
              marginTop: "2.5rem",
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
            }}
          >
            You verify the data alongside the provider before any assessment
            begins. Three stamps required.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: THE DEEPER VALUE ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Structured evidence doesn&rsquo;t just support the approval
            decision. It supports preparation. Parents can be briefed with
            intelligence specific to this trip. Teachers can prepare with
            emergency action plans tied to actual locations. Trip leaders can
            review their itinerary as an operational document.
          </p>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1rem",
            }}
          >
            The same structure that helps you approve the trip helps everyone
            else prepare for it.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
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
              fontSize: "1.25rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem",
            }}
          >
            Start with one trip. One set of documents.
          </p>
          <div>
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                background: "var(--brand-gold)",
                color: "var(--brand-navy)",
                display: "inline-block",
                marginBottom: "1.25rem",
              }}
            >
              Start a conversation &rarr;
            </Link>
          </div>
          <Link
            href="/see-it"
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              textDecoration: "none",
            }}
          >
            See the complete interactive assessment &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
