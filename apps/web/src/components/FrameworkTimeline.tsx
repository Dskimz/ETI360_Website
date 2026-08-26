import Link from "next/link";
import { SequenceHighlight } from "./SequenceHighlight";

/* The campaign centerpiece: the 3-Tier framework as a pinned side-by-side
   sequence. Each tier owns roughly one screen of scrolling: its copy moves
   on the left while its documents stay pinned on the right, then the next
   tier takes over. Pure CSS position:sticky, no scroll listeners.

   The static three-column version of the same content lives at
   /review/framework-timeline.html and stays the exportable asset for email,
   carousels and print. Real Harborview pages, disclosed at the foot. */

type Tier = {
  n: 1 | 2 | 3;
  eyebrow: string;
  name: string;
  desc: string;
};

const tiers: Tier[] = [
  {
    n: 1,
    eyebrow: "Tier 1 · Annual foundation",
    name: "Organizational Baseline",
    desc: "A standing view of governance, responsibilities, procedures, and capabilities that every trip review can reference. The same ten-area review is applied to the school and to each provider it travels with, and refreshed each year.",
  },
  {
    n: 2,
    eyebrow: "Tier 2 · Each individual trip",
    name: "Trip Risk Review",
    desc: "Each trip is reviewed on its own merits, producing a complete file for leadership review. Every document is produced from the trip's single record, and reissued from it when something changes.",
  },
  {
    n: 3,
    eyebrow: "Tier 3 · While trips are underway",
    name: "Dynamic Risk Operations",
    desc: "The school's own team works from a current operating picture, structured check-ins, and practical reference tools, on a surface the school's own duty manager operates.",
  },
];

const t2Chips = [
  { src: "/email/page-overview.png", alt: "Trip Overview one-pager", label: "Trip Overview" },
  { src: "/marketing/library/itinerary-report.png", alt: "Itinerary Report calendar view", label: "Itinerary Report" },
  { src: "/marketing/library/rams-report.png", alt: "Trip Risk Assessment and RAMS register page", label: "Risk Assessment & RAMS" },
  { src: "/email/spread-itoshima-2.png", alt: "Route Intelligence elevation profile", label: "Route Intelligence" },
  { src: "/email/card-parent.png", alt: "Parent Itinerary day pages", label: "Parent Itinerary" },
  { src: "/marketing/library/weather-briefing.png", alt: "Weather Brief for the travel month", label: "Weather Brief" },
];

function TierVisual({ n }: { n: 1 | 2 | 3 }) {
  if (n === 1) {
    return (
      <div className="ft-card ft-card--portrait">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/email/spread-school-baseline-v3.png"
          alt="Organizational Baseline Evaluation: ten areas of operational capability, OC01 to OC10, each marked at standard or progressing"
          width={991}
          height={1400}
          loading="lazy"
        />
      </div>
    );
  }
  if (n === 2) {
    return (
      <div className="ft-chips">
        {t2Chips.map((c) => (
          <figure key={c.label} className="ft-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.alt} loading="lazy" />
            <figcaption className="ui">{c.label}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="ft-card ft-card--landscape">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/email/screen-dmd-v3.png"
          alt="The Duty Manager Dashboard with a trip open: location map with the routed hospital, check-ins, and messages"
          width={1280}
          height={811}
          loading="lazy"
        />
      </div>
      <div className="ft-minis ui">
        <span>Check-ins</span>
        <span>RESPOND Cards</span>
        <span>Incident Record</span>
      </div>
    </>
  );
}

export function FrameworkTimeline() {
  return (
    <section id="framework" className="ft-section">
      <div className="container ft-intro" data-reveal="">
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

      <SequenceHighlight />

      <div className="ft-seq">
        {tiers.map((t) => (
          <article key={t.n} className="ft-seq-item">
            <div className="ft-seq-copy">
              <span className="ft-seq-numeral" aria-hidden="true">
                {t.n}
              </span>
              <p className="ft-eyebrow ui">{t.eyebrow}</p>
              <h3 className="ft-name">{t.name}</h3>
              <p className="ft-sub">{t.desc}</p>
            </div>
            <div className="ft-seq-visual">
              <TierVisual n={t.n} />
            </div>
          </article>
        ))}
      </div>

      <div className="container">
        <div className="ft-sim" data-reveal="">
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

        <div className="ft-loop" data-reveal="">
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
