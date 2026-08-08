/* DRAFT: pending eti360-tone-review gate before ship */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ETI360’s 3-Tier Risk Framework",
  description:
    "Three questions every school answers about travel. One framework: Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations.",
  openGraph: {
    title: "ETI360’s 3-Tier Risk Framework",
    description:
      "Three questions every school answers about travel. One framework: Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations.",
    type: "website",
  },
};

type Tier = {
  stage: string;
  question: string;
  body: string;
  components: string;
  receives: string;
  anchor: string;
  image?: { src: string; alt: string };
};

const tiers: Tier[] = [
  {
    stage: "Tier 1 · Organizational Baseline — documented once, maintained",
    question: "Where does our travel governance stand?",
    body: "The school’s standing position: policies, procedures, and evidence reviewed and mapped against the ISO 31031 framework, area by area, with strengths and gaps identified. Not a trip document — the foundation every trip stands on.",
    components:
      "Document review · framework mapping · per-area maturity scoring · evidence register · gap identification",
    receives:
      "The Organizational Baseline Report — per-area scores, evidence found, gaps identified. Written to be read by a board in one sitting.",
    anchor: "/for-schools#baseline",
  },
  {
    stage: "Tier 2 · Trip Risk Review — every trip, on its merits, before departure",
    question: "Is this trip ready?",
    body: "The per-trip evidence base. The provider’s itinerary is normalized into a gap-free, hour-by-hour record; every location verified; every activity risk-profiled across seven dimensions; the activities that warrant a RAMS get one — grouped the way the trip actually runs. Around that core: medical access, seasonal weather, route intelligence, site briefs.",
    components:
      "Itinerary normalization · location verification · Activity Risk Profiles (7 dimensions) · RAMS by activity group · medical access mapping · weather & climate briefing · route intelligence · provider documentation review",
    receives:
      "The trip document pack — produced from the trip’s own data. The approval conversation starts with evidence already organized.",
    anchor: "/for-schools#tier2",
    image: {
      src: "/marketing/library/itinerary-report.png",
      alt: "Itinerary Report — a rendered calendar-view page from the sample pack: four days of the trip as hour-by-hour blocks covering activities, meals, transport, free time, and accommodation",
    },
  },
  {
    stage: "Tier 3 · Dynamic Risk Operations — while the trip runs",
    question: "Do we know what’s happening — and will we have the record afterward?",
    body: "Live operational evidence, on a surface the school’s own duty manager operates — never an ETI360-staffed service. The day’s timeline, the map, weather and medical access for where the group actually is, check-ins, messages, incidents. When the trip ends, the record already exists.",
    components:
      "Duty Manager Dashboard · daily briefings · RESPOND cards · check-in record · incident reports · post-trip report",
    receives:
      "The operational record — every check-in, incident, and communication compiled into the Post-Trip Report the school’s own review reads.",
    anchor: "/for-schools#tier3",
  },
];

export default function FrameworkPage() {
  return (
    <>
      {/* DRAFT: pending eti360-tone-review gate before ship */}
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Framework</p>
          <h1>Three questions every school answers about travel. One framework.</h1>
          <p className="subtitle">
            Where does our travel governance stand? Is this trip ready? Do we know
            what&rsquo;s happening while it runs? The ETI360 framework structures the
            evidence behind each answer &mdash; the organization documented once, each
            trip assessed on its merits before departure, and live operational evidence
            while it runs.
          </p>
          <p>
            ETI360 structures and presents the evidence. The decision &mdash; and the
            duty of care &mdash; remain the school&rsquo;s. We think that&rsquo;s
            exactly where they belong.
          </p>
        </div>
      </section>

      <article className="article-body">
        <div className="artifact-wall">
          {tiers.map((t) => (
            <section key={t.anchor} className="artifact-entry">
              {t.image && (
                <div className="artifact-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image.src} alt={t.image.alt} />
                  <p className="artifact-reader ui">
                    The documents shown are from a fully worked example for Harborview
                    International School &mdash; a fictitious school built on real
                    venues and real method, so every page can be shown in full.
                  </p>
                </div>
              )}
              <div className="artifact-copy container measure">
                <p className="artifact-stage ui">{t.stage}</p>
                <h2 className="artifact-decision">&ldquo;{t.question}&rdquo;</h2>
                <p>{t.body}</p>

                <p className="artifact-reader ui">
                  <span className="artifact-reader-label">Components</span>{" "}
                  {t.components}
                </p>

                <ul className="artifact-decides">
                  <li className="artifact-decides-label ui">
                    What the school receives
                  </li>
                  <li>{t.receives}</li>
                </ul>

                <p className="perspective-see-all">
                  <Link href={t.anchor} className="cta-link ui">
                    See it in the document library &rarr;
                  </Link>
                </p>
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="about-strip tight">
        <div className="container">
          <p className="label ui">Provenance</p>
          <h2 className="section-heading rule-gold">Where the framework comes from.</h2>
          <p className="cycle-provenance">
            Built from field experience running school trips, and aligned to recognized
            international standards &mdash; ISO 31031 as the anchor, with ISO 31030,
            ISO 21101, BS 8848, and SS 710 alongside. That experience and those
            standards produced the three-tier framework &mdash; the structure beneath
            everything ETI360 does.
          </p>
          <figure className="framework-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/diagrams/method-01-inputs.svg"
              alt="Where the method comes from: field experience (school-trip operations, incident learning) and recognized standards (ISO 31031, ISO 31030, ISO 21101, BS 8848, SS 710) feed the ETI360 risk framework"
            />
          </figure>
          <figure className="framework-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/diagrams/method-02-framework.svg"
              alt="The three-tier framework: Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, Tier 3 Dynamic Risk Operations"
            />
          </figure>
        </div>
      </section>

      <section className="cycle-section tight">
        <div className="container">
          <p className="label ui">Across the tiers</p>
          <h2 className="section-heading rule-gold">The framework in motion.</h2>
          <p className="cycle-provenance">
            A single trip travels the tiers in order: proposed against the standing
            baseline, assessed and documented before departure, run on the live
            surface, closed into the record. Each tier produces its documents
            &mdash; which is why the clearest way to understand the framework is to
            read what it produces.
          </p>
          <figure className="framework-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/diagrams/method-03-documents.svg"
              alt="The documents each tier produces, from the Organizational Baseline Report through the trip document pack to the operational record"
            />
          </figure>
          <p className="bridge-line ui">
            <Link href="/for-schools" className="cta-link ui">
              See every document &rarr;
            </Link>{" "}
            &nbsp;&middot;&nbsp;{" "}
            <Link href="/showcase" className="cta-link ui">
              Walk a real trip through it &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>
            Three tiers. Three questions. Every answer on paper your board can read.
          </h2>
          <p>
            <Link href="/showcase" className="cta-button ui">
              See the sample pack
            </Link>
          </p>
          <p>
            <Link href="/contact" className="cta-link ui">
              Talk to us &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
