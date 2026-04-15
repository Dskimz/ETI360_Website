import Link from "next/link";

/* ════════════════════════════════════════════════════
   FOR PROVIDERS
   ════════════════════════════════════════════════════ */

export default function ForProvidersPage() {
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
              maxWidth: "36rem",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            A school&rsquo;s risk committee reviews your proposal alongside two others. One includes a narrative risk summary. Yours includes seven-dimension activity scoring, ISO&nbsp;31031 alignment, and a structured activity ledger. The committee isn&rsquo;t comparing trips. They&rsquo;re comparing evidence.
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
            Position your proposals with structured evidence.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "40rem",
            }}
          >
            Schools increasingly look for institutional-quality documentation in trip proposals. ETI360 intelligence gives you that documentation&nbsp;&mdash; independently assessed, standards-aligned, and formatted for governance boards.
          </p>
        </div>
      </section>

      {/* ── SECTION 1: WHAT CHANGES ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
              marginBottom: "2.5rem",
            }}
          >
            Before ETI360, your proposal is a PDF with photos, narrative, and promises. After ETI360, your proposal includes:
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "44rem",
            }}
          >
            {[
              {
                href: "/#standardisation",
                text: "A structured activity ledger showing operational thoroughness\u00a0\u2014 every minute, every location, every transport leg.",
              },
              {
                href: "/#risk-profiling",
                text: "Activity Risk Profiles showing you\u2019ve assessed your own programme independently\u00a0\u2014 not self-reported, methodology-driven.",
              },
              {
                href: "/#compliance",
                text: "ISO\u00a031031 compliance alignment showing your programme meets recognised international standards.",
              },
              {
                href: "/#trip-views",
                text: "Multiple views of the itinerary\u00a0\u2014 calendar, map, route profiles\u00a0\u2014 presented as professional operations documentation.",
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  textDecoration: "none",
                  lineHeight: 1.65,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    color: "var(--brand-gold)",
                    fontWeight: 700,
                    fontSize: "1.125rem",
                    marginTop: "0.05em",
                  }}
                >
                  &rarr;
                </span>
                <span
                  style={{
                    fontSize: "1.0625rem",
                    color: "var(--brand-navy)",
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: PROPORTIONALITY ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
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
            Your cultural programme in Singapore doesn&rsquo;t need the same documentation as a Grade&nbsp;III rafting expedition in Borneo. The system is proportionate.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
            }}
          >
            Activities below the risk threshold get scored but don&rsquo;t trigger full RAMS. A heritage walk in Kampong Gelam is assessed, documented, and filed&nbsp;&mdash; not inflated into a 30-page risk assessment. Schools see that your programme has been properly evaluated. They also see that the evaluation is calibrated, not fear-driven.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: COMPETITIVE ADVANTAGE ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "44rem",
            }}
          >
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.65,
                color: "var(--text-primary)",
              }}
            >
              Providers who include ETI360 intelligence in their proposals aren&rsquo;t just meeting requirements&nbsp;&mdash; they&rsquo;re setting the standard that schools will expect from every proposal that follows.
            </p>
            <p
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.65,
                color: "var(--text-primary)",
              }}
            >
              When a school receives ETI360 documentation attached to your proposal, every other provider they&rsquo;re comparing you against looks unstructured by contrast.
            </p>
          </div>
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
            Start with one trip. One itinerary. See what structured documentation does for your next proposal.
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
