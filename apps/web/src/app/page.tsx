"use client";

import Link from "next/link";

/* ── Serif font stack (Source Serif 4 via Google Fonts) ── */
const SERIF = `"Source Serif 4", "Source Serif Pro", Georgia, "Times New Roman", serif`;

/* ── Proof card data ── */

const proofCards = [
  {
    number: "01",
    label: "Program structure",
    question: "Where is the time actually going?",
    sentence: "See how time is allocated across transit, activity, and rest.",
    href: "/see-it#standardisation",
  },
  {
    number: "02",
    label: "Risk identification",
    question: "Where are the real exposure points?",
    sentence: "See where exposure exists across activities, transitions, and locations.",
    href: "/see-it#risk-profiling",
  },
  {
    number: "03",
    label: "Route and location",
    question: "How remote is each location?",
    sentence: "See travel paths, distances, and isolation context for every venue.",
    href: "/see-it#trip-views",
  },
  {
    number: "04",
    label: "Medical access",
    question: "How far to emergency care?",
    sentence: "See how far each location is from definitive medical care \u2014 and what the plan is.",
    href: "/see-it#trip-views",
  },
  {
    number: "05",
    label: "Environmental context",
    question: "What conditions will we face?",
    sentence: "See weather patterns, terrain, and seasonal timing built into preparation.",
    href: "/see-it#trip-views",
  },
  {
    number: "06",
    label: "Program comparison",
    question: "How does this provider compare?",
    sentence: "See one provider\u2019s program against another using identical structure.",
    href: "/see-it#standardisation",
  },
];

/* ════════════════════════════════════════════════════
   HOMEPAGE
   ════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          color: "#ffffff",
          padding: "7rem 1.5rem 6rem",
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
        <div className="container-narrow" style={{ maxWidth: "48rem", position: "relative" }}>
          {/* Gold accent rectangle */}
          <div
            style={{
              width: "3.5rem",
              height: "0.25rem",
              background: "var(--brand-gold)",
              marginBottom: "2rem",
            }}
          />
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "3.75rem",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              marginBottom: "1.75rem",
            }}
          >
            Trip decisions need structured evidence.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.7)",
              marginBottom: "2.5rem",
              maxWidth: "40rem",
            }}
          >
            School trip documentation is rarely prepared for the person who has to approve, oversee, and answer for the trip. ETI360 structures that information for review.
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

      {/* ── 2. THE PROBLEM ── */}
      <section className="section-padding">
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
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
            The Problem
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "2.5rem",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--brand-navy)",
              marginBottom: "1.75rem",
            }}
          >
            The problem is not missing information.
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Schools receive itineraries, provider materials, internal notes, and supporting documents in different formats and levels of detail. Leadership still has to decide whether the trip is appropriate to run.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
            }}
          >
            The issue is not volume. It is that the information is not structured for the decision it needs to support.
          </p>
        </div>
      </section>

      {/* ── 3. GOLD ANCHOR STRIP ── */}
      <section
        style={{
          background: "var(--brand-gold)",
          padding: "2.25rem 1.5rem",
        }}
      >
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: "1.25rem",
              fontStyle: "italic",
              lineHeight: 1.4,
              color: "var(--brand-navy)",
              maxWidth: "44rem",
              margin: "0 auto",
              fontWeight: 500,
            }}
          >
            &ldquo;The standard for evidence in international school travel.&rdquo;
          </p>
        </div>
      </section>

      {/* ── 4. THE BRIDGE ── */}
      <section className="section-padding section-band">
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
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
            What Changes
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "2.5rem",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--brand-navy)",
              marginBottom: "1.75rem",
            }}
          >
            What structured evidence changes.
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            ETI360 converts fragmented trip documentation into structured evidence: a consistent view of activities, locations, timings, and logistics prepared for review.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
            }}
          >
            Once the program is structured, leadership can review it more clearly. Time allocation, route context, medical access, environmental conditions, and provider differences become easier to assess because the underlying information has been normalized into one format.
          </p>
        </div>
      </section>

      {/* ── 5. PROOF GRID (numbered editorial cards) ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "2.5rem",
              borderTop: "2px solid var(--brand-gold)",
              paddingTop: "2rem",
            }}
          >
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: "1.75rem",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "var(--brand-navy)",
                letterSpacing: "-0.01em",
                margin: 0,
                maxWidth: "32rem",
              }}
            >
              Six questions every approver should be able to answer.
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                lineHeight: 1.55,
                color: "var(--text-tertiary)",
                margin: 0,
                maxWidth: "20rem",
                fontStyle: "italic",
              }}
            >
              Outputs follow from structuring the trip properly &mdash; not added afterward.
            </p>
          </div>

          <div className="proof-grid">
            {proofCards.map((card) => (
              <Link
                key={card.number}
                href={card.href}
                className="proof-card"
              >
                <div className="proof-card-inner">
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--brand-gold)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {card.number}
                  </p>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: "1.375rem",
                      fontStyle: "italic",
                      lineHeight: 1.3,
                      color: "var(--brand-navy)",
                      marginBottom: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    &ldquo;{card.question}&rdquo;
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {card.sentence}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "1.25rem",
                      color: "var(--brand-gold)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    See it &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link
              href="/see-it"
              className="btn-primary"
              style={{
                background: "var(--brand-navy)",
                color: "#ffffff",
              }}
            >
              See the full interactive assessment &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. DUAL-AUDIENCE FORK ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--brand-gold)",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Two Audiences. One Standard.
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--brand-navy)",
              marginBottom: "3rem",
              textAlign: "center",
              maxWidth: "44rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Built for the people who decide and the people who deliver.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
            }}
            className="md-grid-2"
          >
            {/* Schools */}
            <div
              style={{
                background: "var(--page-background)",
                border: "1px solid var(--border-color)",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "0.25rem",
                  background: "var(--brand-gold)",
                  marginBottom: "1.5rem",
                }}
              />
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
                For Schools
              </p>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.625rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--brand-navy)",
                  marginBottom: "1.25rem",
                }}
              >
                Evidence on the table when you sign off.
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                Activity scoring, compliance alignment, location intelligence, and stress-tested outcomes &mdash; produced by a methodology, not by the person organizing the trip.
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
                For Schools &rarr;
              </Link>
            </div>

            {/* Providers */}
            <div
              style={{
                background: "var(--page-background)",
                border: "1px solid var(--border-color)",
                padding: "2.5rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "0.25rem",
                  background: "var(--brand-gold)",
                  marginBottom: "1.5rem",
                }}
              />
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
                For Providers
              </p>
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "1.625rem",
                  fontWeight: 600,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--brand-navy)",
                  marginBottom: "1.25rem",
                }}
              >
                Position your proposals with structured evidence.
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                Your itinerary becomes a verified activity ledger. Your risk management becomes visible: scored, specific, independently assessed.
              </p>
              <Link
                href="/for-providers"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--brand-navy)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                For Providers &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. INDEPENDENCE + CTA (Foundation panel) ── */}
      <section
        style={{
          background: "var(--brand-navy)",
          color: "#ffffff",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div className="container-narrow" style={{ maxWidth: "42rem" }}>
          <div
            style={{
              width: "2.5rem",
              height: "0.25rem",
              background: "var(--brand-gold)",
              margin: "0 auto 2rem",
            }}
          />
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1.25,
              color: "#ffffff",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            The school keeps every decision.
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.75)",
              marginBottom: "2.5rem",
            }}
          >
            ETI360 structures the evidence those decisions rest on.
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

      {/* ── Responsive styles ── */}
      <style>{`
        .proof-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-bottom: 1px solid var(--border-color);
        }
        .proof-card {
          display: block;
          background: var(--page-background);
          text-decoration: none;
          border-top: 1px solid var(--border-color);
          transition: background 0.15s ease;
        }
        .proof-card:hover {
          background: var(--band-background);
        }
        .proof-card-inner {
          padding: 2rem 1.75rem;
        }
        @media (min-width: 768px) {
          .md-grid-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          .proof-grid {
            grid-template-columns: 1fr 1fr;
          }
          .proof-card {
            border-left: 1px solid var(--border-color);
          }
          .proof-card:nth-child(2n+1) {
            border-left: none;
          }
        }
        @media (min-width: 1024px) {
          .proof-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .proof-card {
            border-left: 1px solid var(--border-color);
          }
          .proof-card:nth-child(2n+1) {
            border-left: 1px solid var(--border-color);
          }
          .proof-card:nth-child(3n+1) {
            border-left: none;
          }
          .proof-card-inner {
            padding: 2.25rem 2rem;
          }
        }
      `}</style>
    </main>
  );
}
