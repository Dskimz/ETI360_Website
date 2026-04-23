import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What each artifact decides — ETI360",
  description:
    "Six documents. Six decisions. The governance cycle's artifacts are not compliance theatre — each one exists to let someone decide something specific.",
  openGraph: {
    title: "What each artifact decides",
    description:
      "Six documents. Six decisions. The governance cycle's artifacts are not compliance theatre — each one exists to let someone decide something specific.",
    type: "article",
  },
};

type Artifact = {
  stage: string;
  docName: string;
  decision: string;
  image: string;
  reader: string;
  decides: string[];
  body: string[];
};

const artifacts: Artifact[] = [
  {
    stage: "Stage 01 · Selection",
    docName: "Trip Options Brief",
    decision: "Should this trip go ahead?",
    image: "/marketing/previews/trip-options-brief.png",
    reader: "Risk committee · Head of school · Trip approval meeting",
    decides: [
      "Whether the provider matches the school's governance standards",
      "Whether the destination's operational profile fits the programme",
      "Whether the trip passes baseline selection before deeper work begins",
    ],
    body: [
      "A one-page structured brief produced before the approval meeting. It collapses the provider's submission into comparable evidence — trip type, physical demand, accommodation, season, cost tier, year group, included and excluded elements, and a day-by-day operational summary.",
      "The committee reads it in evidence form rather than narrative form. A provider's glossy proposal is good marketing; a Trip Options Brief is what a governance body actually signs against.",
    ],
  },
  {
    stage: "Stage 02 · Audit",
    docName: "ISO 31031 Audit",
    decision: "Does the provider meet the standard the school holds itself to?",
    image: "/marketing/previews/iso-31031-audit.png",
    reader: "Risk committee · Insurance carrier · Accrediting body",
    decides: [
      "Where the provider sits on ISO 31031's four-band maturity scale",
      "What evidence has been submitted and what is missing",
      "What must be addressed before the trip proceeds, and what can be addressed after",
    ],
    body: [
      "A structured maturity assessment across ISO 31031's ten dimensions — governance, risk management, provider selection, communication, monitoring, and the rest. Each dimension is scored Foundational, Developing, Established, or Leading, with evidence cited and gaps itemised.",
      "The audit does not produce a pass/fail. It produces a defensible record. When a committee is asked why they approved a trip, the ISO 31031 Audit is what they point to — findings by dimension, evidence underneath each finding, and recommendations that travel with the trip into the next stage of the cycle.",
    ],
  },
  {
    stage: "Stage 03 · Lock",
    docName: "Itinerary Confirmation",
    decision: "Is this the itinerary every party is working from?",
    image: "/marketing/previews/itinerary-confirmation.png",
    reader: "Trip leader · Provider operations · Parents · Duty manager",
    decides: [
      "What happens on each day, down to the hour",
      "What transport and accommodation are locked in",
      "Where drift from the original plan has occurred (and been agreed)",
    ],
    body: [
      "A calendar-view confirmation that renders the trip as a four-column hour-block timeline, with meals, activities, accommodation, and logistics visible at a glance in the local time zone plus the school's home time zone.",
      "Trip governance drifts without a single source of truth. Pre-departure emails multiply; providers update one party but not another; parents hold an old version. The Itinerary Confirmation is the artifact every downstream decision references — emergency documentation, parent letters, duty-manager scripts, post-trip review. If it isn't agreed, nothing downstream is.",
    ],
  },
  {
    stage: "Stage 07 · Run · Location",
    docName: "Location Audit",
    decision: "Where are students at every point during the trip?",
    image: "/marketing/previews/location-audit.png",
    reader: "Duty manager · Trip leader · Emergency responder",
    decides: [
      "The percentage of the trip covered by a known, mapped location",
      "The nearest hospital for each location and the estimated road time to it",
      "Gaps in coverage that need a contingency plan before departure",
    ],
    body: [
      "A day-by-day location timeline, each day showing a map of stops, a stacked time-bar of what happens where, and a distance-to-hospital table with the expected road time. 100% day coverage is the standard; anything under 100% is a flagged gap with a named responsible contingency.",
      "Emergency response begins with a location. A trip that cannot tell a duty manager where its students are at 14:15 on day 2 cannot tell an ambulance service the same thing. The Location Audit moves this answer from memory to record.",
    ],
  },
  {
    stage: "Stage 07 · Run · Route",
    docName: "Route Audit",
    decision: "What does the stated route actually involve?",
    image: "/marketing/previews/route-audit.png",
    reader: "Trip leader · Ride leader · Duty manager",
    decides: [
      "Whether the stated distance, climb and moving time match the route's actual difficulty",
      "Which waypoints sit near emergency facilities and which do not",
      "Where on the route — terrain, heat, wind, remoteness — the operational risk concentrates",
    ],
    body: [
      "A two-page intelligence brief per route: a stats page with distance, climb, steepest grade, moving time, a waypoint map overlaid with nearest hospitals and phone numbers, plus a \u201chow the ride actually feels\u201d page with an elevation profile, waypoint register (coordinates), direction, season, hydration, lunch and navigation notes, and an on-trip checklist.",
      "A route description supplied by a provider is marketing. A Route Audit is the document a trip leader can actually ride with — where emergency hospitals are along the way, where conditions turn, and where the apparent numbers don\u2019t match the real difficulty. The artifact makes route intelligence portable.",
    ],
  },
  {
    stage: "Stage 07 · Run · Weather",
    docName: "Weather Brief",
    decision: "What conditions should trip leaders prepare for?",
    image: "/marketing/previews/weather-brief.png",
    reader: "Trip leader · Provider operations · Parent pack",
    decides: [
      "What temperature, rainfall, and daylight to expect, day by day",
      "Which gear and clothing the participant pack should specify",
      "What weather-driven go/no-go rules apply to each activity",
    ],
    body: [
      "A single-page climate brief calibrated to the trip's specific window and destination. Fifteen years of historical daily data — temperature range, rainfall probability, dominant conditions — presented with the implication for trip planning explicit: pack layers, bring rain gear, plan outdoor time against real daylight.",
      "A forecast is a guess for a particular week. A Weather Brief is a statement about what a trip leader should plan for, built on enough history that the trip can design around it rather than react to it.",
    ],
  },
];

export default function WhatEachArtifactDecidesPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">Decision support</p>
          <h1>What each artifact decides.</h1>
          <p className="subtitle">
            The governance cycle&apos;s documents are not compliance theatre. Each one
            exists to let someone decide something specific.
          </p>
          <p className="byline ui">Published April 2026 &middot; 6 min read</p>
        </div>
      </section>

      <article className="article-body">
        <div className="container measure">
          <p className="lead">
            Every stage of the trip governance cycle produces a document. That is not
            unusual — most processes generate paperwork. What is unusual is that every
            document in this cycle exists to support a single, specific decision.
            Remove the decision and the document becomes ornamental. Remove the
            document and the decision sits on memory.
          </p>

          <p>
            What follows is a walk through six of the cycle&apos;s key artifacts. For
            each one: the decision it supports, the question it answers, and the role
            it plays once the decision has been made. The images are real pages from
            real engagements, de-identified where necessary.
          </p>
        </div>

        <div className="artifact-wall">
          {artifacts.map((a, i) => (
            <section key={a.docName} className="artifact-entry">
              <div className="artifact-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.image}
                  alt={`${a.docName} — sample page`}
                  loading={i < 2 ? undefined : "lazy"}
                />
              </div>
              <div className="artifact-copy container measure">
                <p className="artifact-stage ui">{a.stage}</p>
                <h2 className="artifact-decision">{a.decision}</h2>
                <p className="artifact-doc-name ui">{a.docName}</p>
                {a.body.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}

                <p className="artifact-reader ui">
                  <span className="artifact-reader-label">Primary reader</span>{" "}
                  {a.reader}
                </p>

                <ul className="artifact-decides">
                  <li className="artifact-decides-label ui">This document decides</li>
                  {a.decides.map((d, k) => (
                    <li key={k}>{d}</li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        <div className="container measure" style={{ marginTop: "4em" }}>
          <h2>What the six share</h2>
          <p>
            None of these documents are long. None are generic. None are written for
            an abstract regulator. Each one is built around a named reader, a specific
            decision, and a time horizon short enough that the document must be
            usable without re-reading it end to end.
          </p>
          <p>
            That is the governance cycle&apos;s quiet promise: that by the time a
            committee approves, or a trip leader acts, or a duty manager escalates,
            the evidence the moment requires has already been produced — in a form
            the moment can actually use.
          </p>
          <p>
            <Link href="/" className="cta-link ui">
              Back to the cycle &rarr;
            </Link>
          </p>
        </div>
      </article>

      <section className="cta-section">
        <div className="container measure">
          <h2>Arrange a briefing.</h2>
          <p>
            A structured conversation about your current trip governance and where the
            cycle can support it. We respond within two business days.
          </p>
          <Link href="/contact" className="cta-button ui">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
