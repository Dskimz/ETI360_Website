import type { Metadata } from "next";
import Link from "next/link";
import { DocEntry, DocMarquee, DocRow, TierBand } from "../../components/DocShowcase";

export const metadata: Metadata = {
  title: "For Providers",
  description:
    "For trip providers: the documents schools ask for — organizational standing, trip due diligence, and the pack families read — prepared once from your program's data, then adjusted for each school, trip, and set of dates.",
  openGraph: {
    title: "For Providers — ETI360",
    description:
      "For trip providers: the documents schools ask for — organizational standing, trip due diligence, and the pack families read — prepared once from your program's data, then adjusted for each school, trip, and set of dates.",
    type: "website",
  },
};

const tier1: DocEntry[] = [
  {
    anchor: "baseline",
    pdf: "/docs/organizational-baseline-evaluation.pdf",
    stage: "T1 · Your organization",
    name: "Organizational Baseline Evaluation",
    reader: "School risk committees · Your leadership",
    desc: "The same ten-area review schools receive, applied to your organization: policies, roles, standing arrangements, and supporting evidence recorded in a common structure, mapped against ISO 31031 and refreshed annually — your standing documented in the same form schools use for their own baseline.",
    image: {
      src: "/email/spread-partner-baseline.png",
      alt: "Organizational Baseline Evaluation applied to a trip provider, with ten scored areas",
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
    desc: "Your program on one page: dates, group, and logistics at a glance — the first read for the school's leadership before the detail.",
    image: {
      src: "/email/page-overview.png",
      alt: "Trip Overview one-pager for the Cherry Blossom Tokyo sample trip",
    },
  },
  {
    anchor: "parent-itinerary",
    pdf: "/docs/parent-itinerary.pdf",
    stage: "T2 · For families",
    name: "Parent Itinerary",
    reader: "Parents",
    desc: "The journey written for families, in the school's own voice: clear day information, meals, accommodation, and what to know — the document that gets parents ready for the trip.",
    image: {
      src: "/email/card-parent.png",
      alt: "Parent Itinerary day pages with photographs and day-by-day plans",
    },
  },
  {
    anchor: "itinerary-report",
    pdf: "/showcase/pdfs/02-1-calendar-view.pdf",
    stage: "T2 · The operational record",
    name: "Itinerary Report",
    reader: "Coordinator · Trip staff",
    desc: "The same journey as a minute-by-minute calendar: every activity, transfer, meal, and overnight in hour-by-hour blocks, transit included — the record each proposal is adjusted from.",
    image: {
      src: "/marketing/library/itinerary-report.png",
      alt: "Itinerary Report calendar view: four trip days as hour-by-hour blocks covering activities, meals, transport, and accommodation",
    },
  },
  {
    anchor: "trip-discovery-map",
    pdf: "/docs/trip-discovery-map.pdf",
    stage: "T2 · The trip on one sheet",
    name: "Trip Discovery Map",
    reader: "Coordinator · Parents evening",
    desc: "Stops, routes, and the shape of each day on one visual sheet — as useful in your proposal as at the school's parents evening.",
    image: {
      src: "/email/spread-map-1.jpg",
      alt: "Trip Discovery Map for Cherry Blossom Tokyo: numbered stops, routes, and photo callouts on one sheet",
    },
    wide: true,
  },
  {
    anchor: "weather",
    pdf: "/showcase/pdfs/01-1-weather-brief-sydney.pdf",
    stage: "T2 · Conditions",
    name: "Weather Brief",
    reader: "Coordinator · Trip staff",
    desc: "Month-specific conditions for the destination and dates, built on fifteen years of historical data — rebuilt for the travel month each time a proposal moves to new dates.",
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
  {
    anchor: "activity-risk-profile",
    pdf: "/docs/activity-risk-profile.pdf",
    stage: "T2 · Every activity scored",
    name: "Activity Risk Profile",
    reader: "Risk lead · Coordinator",
    desc: "Every activity scored across seven dimensions, with the policy gate separating the activities that receive full RAMS coverage from those recorded at routine level.",
    image: {
      src: "/marketing/library/arp-summary.png",
      alt: "Activity Risk Profile summary page with the seven-dimension radar chart and per-dimension score table",
    },
  },
  {
    anchor: "risk-assessment",
    pdf: "/showcase/pdfs/04-rams-report.pdf",
    stage: "T2 · The decision record",
    name: "Trip Risk Assessment & RAMS",
    reader: "Risk lead · Trip staff · Provider",
    desc: "A consistent document prepared for the school's review and decision: hazards, controls, who holds each control, and residual risk in plain language — the due diligence file a school's risk committee can put in front of its board.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "RAMS report risk register page: named risks with inherent and residual scores, controls, and emergency actions",
    },
  },
  {
    anchor: "duty-manager-simulation",
    stage: "T2 · Rehearsal",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard: a way to stress test a trip before it runs, working through a realistic scenario with roles, communication, and escalation decisions practiced in advance.",
    image: {
      src: "/email/screen-simulation.png",
      alt: "The Duty Manager Simulation: itinerary rehearsal and crisis rehearsal inside the dashboard",
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
    desc: "The working view while groups travel: trip context, location, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure. Operated by the school's or the provider's own duty manager, never by ETI360.",
    image: {
      src: "/email/screen-dmd-v3.png",
      alt: "The Duty Manager Dashboard with a trip open: trip context, location map with the routed hospital, check-ins, and messages",
    },
    wide: true,
  },
];

const allDocs = [...tier1, ...tier2, ...tier3];

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
          <h1>Do them once and our system updates them.</h1>
          <p className="subtitle">
            The documents schools ask providers for &mdash; organizational
            standing, trip due diligence, and the pack families read &mdash;
            prepared from your program&rsquo;s own data, then adjusted for each
            school, each trip, and each set of dates.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            Schools evaluate a provider through its documents: the
            organizational standing behind the program, the due diligence file
            their leadership reviews, and the itineraries and briefings their
            families receive. This page walks those documents through the same
            three tiers schools use &mdash; open any thumbnail to read the
            document itself. Once they exist for one of your programs, the next
            school&rsquo;s proposal is an adjustment, not a rebuild.
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
          desc="A documented review of your practices against industry standards — the same ten-area review applied to schools and to trip providers, mapped against ISO 31031, with your documentation recorded in order and refreshed annually."
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
          desc="The due diligence documentation school leadership asks for, the documents that get students and parents ready for the trip, and a rehearsal of the trip before it runs."
        />
        <div className="container measure" style={{ paddingTop: "40px" }}>
          <p>
            Document a program once and the Tier 2 pack becomes repeatable. A
            new proposal begins in one line:
          </p>
          <p className="pull-quote">
            &ldquo;A proposal for this school, on this trip, on these
            dates.&rdquo;
          </p>
          <p>
            ETI360 updates and adjusts the data from there: the itinerary
            re-dated for the new group, the Trip Overview and Parent Itinerary
            re-prepared for the school, the Weather Brief rebuilt for the travel
            month, and the proposed dates checked against the
            destination&rsquo;s calendar &mdash; holidays, closures, and
            seasonal events flagged as a booking checklist for you to verify
            before anything is confirmed.
          </p>
        </div>
        <div className="doc-rows">
          {tier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>

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

        <div className="container measure">
          <div className="boundary-callout">
            <h3>What ETI360 does not do</h3>
            <p>
              ETI360 prepares and adjusts documentation; it does not operate
              trips, certify providers, or approve trips on a school&rsquo;s
              behalf. Risk assessments are prepared for each school&rsquo;s own
              review, and the decision to run a trip stays with the school. How
              you run your operations &mdash; and what you confirm with venues,
              transport, and calendars before booking &mdash; remains your
              responsibility.
            </p>
          </div>
        </div>

        <div className="container measure">
          <h2>The documents, end to end</h2>
          <p>
            Every document above, in one passing view &mdash; the strip pauses
            when your cursor is over it, and any page opens in full.
          </p>
        </div>
        <DocMarquee items={allDocs} label="The ETI360 documents for trip providers" />
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Start with one program.</h2>
          <p>
            Bring the program you propose most often. A conversation covers what
            documenting it involves and what each proposal after that looks
            like. Briefings are conversations, not sales calls. We respond
            within two business days.
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
