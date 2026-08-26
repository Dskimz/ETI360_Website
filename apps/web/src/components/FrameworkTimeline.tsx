import Link from "next/link";

/* The campaign centerpiece: the 3-Tier framework as a timeline with the
   feedback loop, from Dan's wireframe (2026-08-26). Full-size version:
   /review/framework-timeline.html. Real Harborview pages, disclosed below. */

const t2Chips = [
  { src: "/email/page-overview.png", alt: "Trip Overview one-pager", label: "Trip Overview" },
  { src: "/marketing/library/itinerary-report.png", alt: "Itinerary Report calendar view", label: "Itinerary Report" },
  { src: "/marketing/library/rams-report.png", alt: "Trip Risk Assessment and RAMS register page", label: "Risk Assessment & RAMS" },
  { src: "/email/spread-itoshima-2.png", alt: "Route Intelligence elevation profile", label: "Route Intelligence" },
  { src: "/email/card-parent.png", alt: "Parent Itinerary day pages", label: "Parent Itinerary" },
  { src: "/marketing/library/weather-briefing.png", alt: "Weather Brief for the travel month", label: "Weather Brief" },
];

export function FrameworkTimeline() {
  return (
    <section id="framework" className="ft-section">
      <div className="container">
        <p className="label ui">The framework</p>
        <h2 className="section-heading section-heading-lg rule-gold">
          ETI360&rsquo;s 3-Tier Risk Framework.
        </h2>
        <p className="section-lead">
          ETI360 helps schools establish organizational readiness, review each
          trip on its own merits, and equip their own teams for dynamic
          operations. One framework across the school year, and a record that
          opens the next one.
        </p>
      </div>

      <div className="container ft-wrap">
        <div className="ft-rail" aria-hidden="true">
          <div className="ft-line" />
          <div className="ft-stops">
            <div className="ft-stop"><span className="ft-dot" /><span className="ft-stop-lbl ui">Annual foundation</span></div>
            <div className="ft-stop"><span className="ft-dot" /><span className="ft-stop-lbl ui">Each individual trip</span></div>
            <div className="ft-stop"><span className="ft-dot" /><span className="ft-stop-lbl ui">While trips are underway</span></div>
          </div>
        </div>

        <div className="ft-tiers">
          <div className="ft-tier">
            <p className="ft-eyebrow ui">Tier 1 &middot; Annual</p>
            <h3 className="ft-name">Organizational Baseline</h3>
            <p className="ft-sub">
              A standing view of governance, responsibilities, procedures, and
              capabilities that every trip review can reference &mdash; the
              school, and each provider it travels with.
            </p>
            <div className="ft-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/email/spread-school-baseline-v2.png"
                alt="Organizational Baseline Evaluation spread: ten areas of operational capability, each marked at standard or progressing"
                loading="lazy"
              />
            </div>
          </div>

          <div className="ft-tier ft-tier-mid">
            <p className="ft-eyebrow ui">Tier 2 &middot; Per trip</p>
            <h3 className="ft-name">Trip Risk Review</h3>
            <p className="ft-sub">
              Each trip is reviewed on its own merits, producing a complete file
              for leadership review &mdash; every document from the trip&rsquo;s
              single record, reissued when something changes.
            </p>
            <div className="ft-chips">
              {t2Chips.map((c) => (
                <figure key={c.label} className="ft-chip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={c.alt} loading="lazy" />
                  <figcaption className="ui">{c.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="ft-tier">
            <p className="ft-eyebrow ui">Tier 3 &middot; During travel</p>
            <h3 className="ft-name">Dynamic Risk Operations</h3>
            <p className="ft-sub">
              The school&rsquo;s own team works from a current operating
              picture, structured check-ins, and practical reference tools.
            </p>
            <div className="ft-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/email/screen-dmd-v3.png"
                alt="The Duty Manager Dashboard with a trip open: location map with the routed hospital, check-ins, and messages"
                loading="lazy"
              />
            </div>
            <div className="ft-minis ui">
              <span>Check-ins</span>
              <span>RESPOND Cards</span>
              <span>Incident Record</span>
            </div>
          </div>
        </div>

        <div className="ft-sim">
          <span className="ft-sim-k ui">Duty Manager Simulation</span>
          <span className="ft-sim-d">
            Once a school&rsquo;s trips are in the system, a facilitated session
            runs the duty manager through a timeline of those trips on the Duty
            Manager Dashboard, managing events as they arrive, so procedures are
            worked before any group departs.{" "}
            <Link href="/duty-manager-simulation" className="ft-sim-link">
              About the session &rarr;
            </Link>
          </span>
        </div>

        <div className="ft-loop">
          <div className="ft-loop-arrow" aria-hidden="true" />
          <div>
            <p className="ft-loop-k ui">Review &middot; Learn &middot; Carry forward</p>
            <p className="ft-loop-d">
              Findings from simulations and completed trips inform the
              Organizational Baseline and the review of future trips, so each
              year opens further ahead than the last.
            </p>
          </div>
        </div>

        <p className="ft-disclose">
          The pages shown are from a fully worked example for Harborview
          International School, fictitious by design, so every page can be shown
          in full.
        </p>

        <p className="bridge-line ui">
          <Link href="/framework" className="cta-link ui">
            How the framework works &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
