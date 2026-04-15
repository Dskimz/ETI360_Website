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
              maxWidth: "40rem",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            Leadership teams approve trips on documents that vary in format,
            rigor, and completeness. Risk assessments written by the person who
            organised the trip. Reviewed by someone who has never visited the
            destination.
          </p>
          <h1
            style={{
              fontSize: "3.25rem",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: "48rem",
              marginBottom: "1.5rem",
            }}
          >
            Structured evidence for the person who signs off.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "40rem",
            }}
          >
            ETI360 produces the intelligence that sits on the table when a trip
            requires approval. Independent. Traceable. Built for governance.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: WHAT CHANGES ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            className="eyebrow"
            style={{ marginBottom: "1.5rem" }}
          >
            What changes
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Before ETI360, you approve a trip based on a narrative written by the
            person who wants it to happen. After ETI360, you approve a trip based
            on structured evidence produced independently.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "44rem",
            }}
          >
            <LinkedStatement href="/#risk-profiling">
              Every activity scored across seven dimensions &mdash; not by the
              coordinator, by the methodology.
            </LinkedStatement>
            <LinkedStatement href="/#trip-views">
              Every minute of the itinerary accounted for &mdash; locations
              resolved, gaps flagged, hospitals identified.
            </LinkedStatement>
            <LinkedStatement href="/#stress-test">
              1,000 simulated iterations of this specific trip &mdash; the
              realistic scenario and the bad week.
            </LinkedStatement>
            <LinkedStatement href="/#compliance">
              Your governance framework mapped against ISO 31031 &mdash; green
              where you&rsquo;re covered, red where you&rsquo;re not.
            </LinkedStatement>
            <LinkedStatement href="/#standardisation">
              Raw provider documents transformed into structured intelligence
              your board can read.
            </LinkedStatement>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE PROCESS ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            className="eyebrow"
            style={{ marginBottom: "1.5rem" }}
          >
            The process
          </p>

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
            You&rsquo;re part of the process. The school verifies the
            standardised data alongside the provider and ETI360 before any
            intelligence is produced. Three stamps required. Then the assessment
            begins.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: GOVERNANCE FRAMING ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            className="eyebrow"
            style={{ marginBottom: "1.5rem" }}
          >
            Governance
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.5,
              fontWeight: 600,
              color: "var(--brand-navy)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Every document demonstrates the basis on which decisions were made.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            <GovernanceItem label="The Trip Options Brief">
              records what was assessed
            </GovernanceItem>
            <GovernanceItem label="The RAMS documents">
              record risks identified and controls in place
            </GovernanceItem>
            <GovernanceItem label="The Compliance Scorecard">
              records alignment against recognised standards
            </GovernanceItem>
            <GovernanceItem label="The Stress Test">
              records what a realistic bad trip looks like &mdash; and what the
              school prepared for
            </GovernanceItem>
          </div>

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
            Start with one trip. One set of documents. See what structured
            governance looks like for your institution.
          </p>
          <Link
            href="/contact"
            className="btn-primary"
            style={{
              background: "var(--brand-gold)",
              color: "var(--brand-navy)",
            }}
          >
            Start a conversation &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ── Linked statement row ── */

function LinkedStatement({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "0.75rem",
        textDecoration: "none",
        color: "var(--text-primary)",
      }}
    >
      <span
        style={{
          color: "var(--brand-gold)",
          fontWeight: 700,
          fontSize: "1rem",
          flexShrink: 0,
        }}
      >
        &rarr;
      </span>
      <span
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.6,
        }}
      >
        {children}
      </span>
    </Link>
  );
}

/* ── Governance document item ── */

function GovernanceItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <p
      style={{
        fontSize: "1.0625rem",
        lineHeight: 1.6,
        color: "var(--text-primary)",
        paddingLeft: "1rem",
        borderLeft: "2px solid var(--border-color)",
      }}
    >
      <strong style={{ color: "var(--brand-navy)" }}>{label}</strong>{" "}
      {children}
    </p>
  );
}
