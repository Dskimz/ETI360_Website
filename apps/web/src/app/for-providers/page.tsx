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
              maxWidth: "44rem",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            A school&rsquo;s risk committee reviews your proposal alongside two
            others. One includes a narrative risk summary. Yours includes
            structured activity scoring, compliance alignment, and a verified
            activity ledger with every location mapped to the nearest emergency
            hospital. The committee isn&rsquo;t comparing trips. They&rsquo;re
            comparing evidence.
          </p>
          <h1
            style={{
              fontSize: "2.75rem",
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
              marginBottom: "2rem",
            }}
          >
            ETI360 transforms your trip documentation into
            institutional-quality evidence. Your itinerary becomes a structured
            activity ledger &mdash; every activity timestamped, every location
            resolved, every gap identified. Your risk management becomes
            visible: scored, specific, and independently assessed.
          </p>
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--brand-navy)",
              fontWeight: 500,
              maxWidth: "44rem",
              borderLeft: "3px solid var(--brand-gold)",
              paddingLeft: "1.25rem",
            }}
          >
            Schools see operational thoroughness, not narrative promises.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: PROPORTIONALITY ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--text-primary)",
              maxWidth: "44rem",
            }}
          >
            <span style={{ fontStyle: "italic" }}>
              Your cultural programme in Singapore doesn&rsquo;t need the same
              documentation as a Grade&nbsp;III rafting expedition in Borneo.
              The system is proportionate.
            </span>{" "}
            Activities below the risk threshold are scored, documented, and
            filed &mdash; not inflated. Schools see that your programme has
            been properly evaluated. They also see that the evaluation is
            calibrated, not fear-driven.
          </p>
        </div>
      </section>

      {/* ── SECTION 3: THE DEEPER VALUE ── */}
      <section className="section-padding">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
            }}
          >
            Structured evidence doesn&rsquo;t just strengthen the proposal. It
            strengthens the operation. Your team gets the same intelligence the
            school gets &mdash; structured views of the itinerary, location
            context, weather preparation, emergency access. The documentation
            that wins the proposal also helps you run the trip.
          </p>
        </div>
      </section>

      {/* ── SECTION 4: COMPETITIVE ADVANTAGE ── */}
      <section className="section-padding section-band">
        <div className="container-narrow">
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.65,
              color: "var(--text-primary)",
              maxWidth: "44rem",
            }}
          >
            Providers who include ETI360 intelligence aren&rsquo;t just meeting
            requirements. They&rsquo;re setting the standard schools will
            expect from every proposal that follows.
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
            Start with one trip. One itinerary.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
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
        </div>
      </section>
    </main>
  );
}
