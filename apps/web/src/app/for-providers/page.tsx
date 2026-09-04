import type { Metadata } from "next";
import Link from "next/link";
import { DocEntry, DocRow, TierBand } from "../../components/DocShowcase";
import { DocRowsExpander } from "../../components/DocRowsExpander";

export const metadata: Metadata = {
  title: "For Providers",
  description:
    "For trip providers: the documents schools ask for — organizational standing, trip due diligence, and the pack families read — prepared once from your program's data, then adjusted for each school, trip, and set of dates.",
  alternates: { canonical: "/for-providers" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "For Providers — ETI360",
    description:
      "For trip providers: the documents schools ask for — organizational standing, trip due diligence, and the pack families read — prepared once from your program's data, then adjusted for each school, trip, and set of dates.",
    type: "website",
  },
};

const tier1: DocEntry[] = [
  {
    anchor: "baseline",
    pdf: "/docs/organizational-baseline-evaluation-v3.pdf",
    stage: "T1 · Your organization",
    name: "Organizational Baseline Evaluation",
    reader: "School risk committees · Your leadership",
    desc: "The ten areas applied to your organization: policies, roles, standing arrangements, and supporting evidence recorded in a common structure.",
    image: {
      src: "/email/spread-partner-baseline-v2.png",
      alt: "Organizational Baseline Evaluation applied to a trip provider: each of ten areas marked at standard or progressing",
    },
  },
];

const tier2: DocEntry[] = [
  {
    anchor: "trip-overview",
    pdf: "/docs/trip-overview.pdf",
    stage: "T2 · The first read",
    name: "Trip Overview",
    reader: "Head · Approving committee",
    desc: "Your program on one page: dates, group, and logistics at a glance.",
    image: {
      src: "/email/page-overview.png",
      alt: "Trip Overview one-pager for the Cherry Blossom Tokyo sample trip",
    },
  },
  {
    anchor: "itinerary-report",
    pdf: "/showcase/pdfs/02-1-calendar-view.pdf",
    stage: "T2 · The operational record",
    name: "Itinerary Report",
    reader: "Coordinator · Trip staff",
    desc: "The same journey as a minute-by-minute calendar: every activity, transfer, meal, and overnight in hour-by-hour blocks — the record each proposal is adjusted from.",
    image: {
      src: "/showcase/pages/02-1-calendar-view/2.png",
      alt: "Itinerary Report calendar view, page two of the Cherry Blossom Tokyo sample trip: days five through eight as hour-by-hour blocks covering activities, meals, transport, and accommodation",
    },
  },
  {
    anchor: "risk-assessment",
    pdf: "/showcase/pdfs/04-rams-report.pdf",
    stage: "T2 · The decision record",
    name: "Trip Risk Assessment & RAMS",
    reader: "Risk lead · Trip staff · Provider",
    desc: "The structured working documents behind the risk assessment and RAMS: hazards, controls, who holds each control, and residual risk in plain language — prepared for the school to review, complete, amend, and approve; the due diligence file its risk committee can put in front of the board.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "RAMS report risk register page: named risks with inherent and residual scores, controls, and emergency actions",
    },
  },
  {
    anchor: "parent-itinerary",
    pdf: "/docs/parent-itinerary.pdf",
    stage: "T2 · For families",
    name: "Parent Itinerary",
    reader: "Parents",
    desc: "The journey written for families, in the school's own voice: clear day information, meals, accommodation, and what to know.",
    image: {
      src: "/email/card-parent.png",
      alt: "Parent Itinerary day pages with photographs and day-by-day plans",
    },
  },
  {
    anchor: "trip-discovery-map",
    pdf: "/docs/trip-discovery-map.pdf",
    stage: "T2 · The trip on one sheet",
    name: "Trip Discovery Map",
    reader: "Coordinator · Parent information evening",
    desc: "Stops, routes, and the shape of each day on one visual sheet — as useful in your proposal as at the school's parent information evening.",
    image: {
      src: "/email/spread-map-1.jpg",
      alt: "Trip Discovery Map for Cherry Blossom Tokyo: numbered stops, routes, and photo callouts on one sheet",
    },
    wide: true,
  },
  {
    anchor: "duty-manager-simulation",
    stage: "T2 · Rehearsal",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard: a way to stress test a trip before it runs, working through a realistic scenario with roles, communication, and escalation decisions.",
    image: {
      src: "/email/screen-simulation.png",
      alt: "The Duty Manager Simulation: itinerary rehearsal and crisis rehearsal inside the dashboard",
    },
    wide: true,
  },
];

const tier2More: DocEntry[] = [
  {
    anchor: "weather",
    pdf: "/showcase/pdfs/01-1-weather-brief-sydney.pdf",
    stage: "T2 · Conditions",
    name: "Weather Brief",
    reader: "Coordinator · Trip staff",
    desc: "Month-specific conditions for the destination and dates, built on fifteen years of historical data.",
    image: {
      src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
      alt: "Weather Brief for a March trip window: fifteen-year temperature overview, daily outlook, and planning notes",
    },
  },
  {
    anchor: "route-intelligence",
    pdf: "/docs/route-intelligence.pdf",
    stage: "T2 · Outdoor activities",
    name: "Route Intelligence",
    reader: "Coordinator · Duty manager",
    desc: "Distance, gradient, pacing, sun, terrain cover, and escape points, recorded for outdoor activities such as cycling, trekking, and river sports.",
    image: {
      src: "/email/spread-itoshima-2.png",
      alt: "Route Intelligence page for the Big Itoshima ride: elevation profile, waypoint register, sun and terrain cover",
    },
    wide: true,
  },
];

const tier3: DocEntry[] = [
  {
    anchor: "duty-manager-dashboard",
    stage: "T3 · During the trip",
    name: "Duty Manager Dashboard",
    reader: "The school's or provider's own duty manager",
    desc: "The working view while groups travel: trip context, scheduled locations, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure. Operated by the school's or the provider's own duty manager, never by ETI360.",
    image: {
      src: "/Claude/Questions/assets/scheduled-group-locations.png",
      alt: "The Duty Manager Dashboard with a trip open: six current trips, trip context, the scheduled location on the map, today's schedule, and messages",
    },
    wide: true,
  },
];

export default function ForProvidersPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/for-providers.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">For Providers</p>
          <h1>Document a program once. The system carries the updates.</h1>
          <p className="subtitle">
            The documents schools ask providers for &mdash; organizational
            standing, the trip file their leadership reviews, and the pack
            families read &mdash; prepared from your program&rsquo;s own data,
            then reissued for each school, each trip, and each set of dates.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 turns your program information &mdash; itineraries, routes,
            accommodation, activity detail &mdash; into the documentation
            schools review before they book.
          </p>

          <h2>The problems this solves</h2>
          <p>
            <strong>Every school asks for the same evidence in a different
            shape.</strong>{" "}
            One consistent pack &mdash; overview, itinerary, risk information,
            parent version &mdash; produced from your program record and
            reissued per school, trip and dates.
          </p>
          <p>
            <strong>A changed date or hotel touches half the pack.</strong>{" "}
            The change enters the program record once; the affected documents
            are reissued from it.
          </p>
          <p>
            <strong>Due-diligence questionnaires repeat every season.</strong>{" "}
            The annual Organizational Baseline documents your standing once;
            every proposal references the same current evidence.
          </p>
          <p>
            <strong>Routed days draw the hardest questions.</strong>{" "}
            Route Intelligence, Weather Brief and Medical Access pages answer
            distance, terrain, conditions and access with measured figures a
            school can verify.
          </p>
          <p>
            <strong>Schools ask how you operate while groups travel.</strong>{" "}
            The Duty Manager Dashboard gives your duty staff &mdash; or the
            school&rsquo;s &mdash; one working view of the trip, its
            communications and its record.
          </p>

          <h2>The documents</h2>
          <p>
            The same three tiers schools use, applied from the provider&rsquo;s
            side. Open any thumbnail to read the document itself.
          </p>
          <p className="artifact-reader ui">
            The documents shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown.
          </p>
        </div>

        <TierBand
          n={1}
          eyebrow="Tier One · Annual"
          name="Organizational Baseline"
          desc="The same ten-area review applied to schools and to trip providers, read against the ETI360 Operational Capability Framework."
        />
        <div className="doc-rows">
          {tier1.map((e) => (
            <DocRow key={e.anchor} e={e} eager />
          ))}
        </div>

        <TierBand
          n={2}
          eyebrow="Tier Two · Every proposal"
          name="Trip Risk Review"
          desc="The due diligence documentation school leadership asks for, and the documents that get students and parents ready for the trip."
        />
        <div className="container measure" style={{ paddingTop: "40px" }}>
          <p>
            A new proposal begins as one line: this school, this trip, these
            dates. ETI360 re-dates the itinerary, re-prepares the overview and
            parent documents, rebuilds the Weather Brief for the travel month,
            and flags holidays, closures and seasonal events for you to verify
            before anything is confirmed.
          </p>
        </div>
        <div className="doc-rows">
          {tier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
        <DocRowsExpander
          items={tier2More}
          label="See two more Tier 2 documents"
        />

        <TierBand
          n={3}
          eyebrow="Tier Three · During the trip"
          name="Dynamic Risk Operations"
          desc="A working view for managing trip issues while groups travel — operated by the school's or the provider's own duty manager, never staffed by ETI360."
        />
        <div className="doc-rows">
          {tier3.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Contact us.</h2>
          <p>
            A 20-minute conversation about the program you propose most often
            will show how the documentation pack applies to it &mdash; and what
            each new proposal takes from there.
          </p>
          <p>
            <Link href="/contact" className="cta-button ui">
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
