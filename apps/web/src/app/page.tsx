"use client";

import Link from "next/link";

/* ── Proof card data ── */

const proofCards = [
  {
    label: "Program structure",
    sentence: "See how time is allocated across transit, activity, and rest.",
    visual: "calendar",
    href: "/see-it#standardisation",
  },
  {
    label: "Risk identification",
    sentence: "See where exposure points are — across activities, transitions, and locations.",
    visual: "radar",
    href: "/see-it#risk-profiling",
  },
  {
    label: "Route and location context",
    sentence: "See travel paths, distances, and how remote each location is.",
    visual: "map",
    href: "/see-it#trip-views",
  },
  {
    label: "Medical access",
    sentence: "See how far each location is from emergency care — and what the plan is.",
    visual: "hospital",
    href: "/see-it#trip-views",
  },
  {
    label: "Environmental context",
    sentence: "See weather patterns, terrain, and timing incorporated into preparation.",
    visual: "weather",
    href: "/see-it#trip-views",
  },
  {
    label: "Program comparison",
    sentence: "See how one provider\u2019s program compares with another using the same structure.",
    visual: "compare",
    href: "/see-it#standardisation",
  },
];

/* ── Visual icons for proof cards ── */

function ProofVisual({ type }: { type: string }) {
  const iconStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(201, 162, 77, 0.1)",
    border: "1px solid rgba(201, 162, 77, 0.25)",
    flexShrink: 0,
  };

  const svgProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#C9A24D",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<string, React.ReactNode> = {
    calendar: (
      <svg {...svgProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="6" y="13" width="3" height="2" fill="#C9A24D" stroke="none" />
        <rect x="10.5" y="13" width="3" height="2" fill="#0d3558" stroke="none" />
        <rect x="15" y="13" width="3" height="2" fill="#C9A24D" stroke="none" />
      </svg>
    ),
    radar: (
      <svg {...svgProps}>
        <polygon points="12,3 20,9 18,18 6,18 4,9" strokeDasharray="2 2" />
        <polygon points="12,7 16,10 15,15 9,15 8,10" fill="rgba(201,162,77,0.2)" />
        <polygon points="12,5 18,9.5 16.5,16.5 7.5,16.5 6,9.5" fill="rgba(13,53,88,0.15)" />
      </svg>
    ),
    map: (
      <svg {...svgProps}>
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
    hospital: (
      <svg {...svgProps}>
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M12 10v6M9 13h6" stroke="#C9A24D" strokeWidth="2" />
        <path d="M9 6V4a3 3 0 016 0v2" />
      </svg>
    ),
    weather: (
      <svg {...svgProps}>
        <circle cx="12" cy="10" r="4" />
        <path d="M12 2v2M12 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <path d="M6 20h12" strokeDasharray="2 3" />
      </svg>
    ),
    compare: (
      <svg {...svgProps}>
        <rect x="2" y="5" width="8" height="14" rx="1" />
        <rect x="14" y="5" width="8" height="14" rx="1" />
        <line x1="5" y1="9" x2="8" y2="9" />
        <line x1="5" y1="12" x2="8" y2="12" />
        <line x1="17" y1="9" x2="20" y2="9" />
        <line x1="17" y1="12" x2="20" y2="12" />
      </svg>
    ),
  };

  return <div style={iconStyle}>{icons[type]}</div>;
}

/* ════════════════════════════════════════════════════
   HOMEPAGE
   ════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <main>
      {/* ── 1. HERO ── */}
      <section
        style={{
          background: "var(--brand-navy)",
          color: "#ffffff",
          padding: "7rem 1.5rem 6rem",
        }}
      >
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
          <h1
            style={{
              fontSize: "3.25rem",
              fontWeight: 700,
              lineHeight: 1.08,
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
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--brand-navy)",
              marginBottom: "1.25rem",
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

      {/* ── 3. THE BRIDGE ── */}
      <section className="section-padding section-band">
        <div className="container-narrow" style={{ maxWidth: "44rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--brand-navy)",
              marginBottom: "1.25rem",
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

      {/* ── 4. PROOF VISUALS ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--text-tertiary)",
              maxWidth: "44rem",
              marginBottom: "3rem",
            }}
          >
            These outputs are not separate layers added afterward. They follow from structuring the trip properly.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1px",
              background: "var(--border-color)",
              border: "1px solid var(--border-color)",
            }}
            className="proof-grid"
          >
            {proofCards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.25rem",
                  padding: "1.75rem 2rem",
                  background: "var(--page-background)",
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--band-background)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--page-background)";
                }}
              >
                <ProofVisual type={card.visual} />
                <div>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--brand-navy)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.55,
                      color: "var(--text-tertiary)",
                      margin: 0,
                    }}
                  >
                    {card.sentence}
                  </p>
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "var(--brand-gold)",
                    fontSize: "1.125rem",
                    flexShrink: 0,
                    alignSelf: "center",
                  }}
                >
                  &rarr;
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
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

      {/* ── 5. DUAL-AUDIENCE FORK ── */}
      <section className="section-padding section-band">
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
                  marginBottom: "1.25rem",
                }}
              >
                For Schools
              </p>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                How structured evidence changes what&rsquo;s on the table when you sign off.
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
                  marginBottom: "1.25rem",
                }}
              >
                For Providers
              </p>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.65,
                  color: "var(--text-primary)",
                  marginBottom: "1.75rem",
                }}
              >
                How structured evidence strengthens the proposals you submit.
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
                For Providers &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INDEPENDENCE + CTA ── */}
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
              fontSize: "1.375rem",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "2.5rem",
            }}
          >
            The school keeps every decision. ETI360 structures the evidence those decisions rest on.
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
        @media (min-width: 768px) {
          .md-grid-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          .proof-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 1024px) {
          .proof-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
