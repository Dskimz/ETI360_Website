import type { Metadata } from "next";
import Link from "next/link";
import { DocEntry, DocMarquee, DocRow, TierBand } from "../../components/DocShowcase";
import { SectionNav } from "../../components/SectionNav";
import { DocRowsExpander } from "../../components/DocRowsExpander";
import { QABlock, type QAEntry } from "../../components/QASection";

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
    desc: "The same ten-area review schools receive, applied to your organization: policies, roles, standing arrangements, and supporting evidence recorded across the ETI360 Operational Capability Framework and refreshed annually — your standing documented in the same form schools use for their own baseline.",
    image: {
      src: "/email/spread-school-baseline-v3.png",
      alt: "The ten-area Organizational Baseline Evaluation format, shown on the school edition: each area marked at standard or progressing",
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
    anchor: "itinerary-report",
    pdf: "/showcase/pdfs/02-1-calendar-view.pdf",
    stage: "T2 · The operational record",
    name: "Itinerary Report",
    reader: "Coordinator · Trip staff",
    desc: "The same journey as a minute-by-minute calendar: every activity, transfer, meal, and overnight in hour-by-hour blocks, transit included — the record each proposal is adjusted from.",
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
    desc: "A consistent document prepared for the school's review and decision: hazards, controls, who holds each control, and residual risk in plain language — the due diligence file a school's risk committee can put in front of its board.",
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
    desc: "The journey written for families, in the school's own voice: clear day information, meals, accommodation, and what to know — the document that gets parents ready for the trip.",
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
    reader: "Coordinator · Parents evening",
    desc: "Stops, routes, and the shape of each day on one visual sheet — as useful in your proposal as at the school's parents evening.",
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
    desc: "A facilitated ninety-minute session inside the dashboard: a way to stress test a trip before it runs, working through a realistic scenario with roles, communication, and escalation decisions practiced in advance.",
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
    stage: "T2 · Behind the RAMS",
    name: "Activity Risk Profile",
    reader: "Risk lead",
    desc: "The working layer beneath the RAMS: every activity profiled across seven dimensions, deciding which activities carry a full assessment and which are recorded at routine level.",
    image: {
      src: "/marketing/library/arp-summary.png",
      alt: "Activity Risk Profile summary page with the seven-dimension radar chart and per-dimension score table",
    },
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

const allDocs = [...tier1, ...tier2, ...tier2More, ...tier3];

const qaAsked: QAEntry[] = [
  {
    q: "A school's risk committee asks in the first meeting: what evidence can you show of how your organization manages risk?",
    needs:
      "A complete answer needs a documented review of your standing, in the form school committees already read.",
    how: "The ten-area review, recorded across the ETI360 Operational Capability Framework and refreshed annually, is the same structure schools apply to themselves, so your documentation arrives in a form their leadership recognizes.",
    bridge: { label: "Organizational Baseline Evaluation", href: "#baseline" },
  },
  {
    q: "Three days before their board meeting, the school asks: can you send the full risk assessment for this itinerary?",
    needs:
      "A complete answer needs hazards, controls, who holds each control, and residual risk, in a form a board can read.",
    how: "ETI360 profiles the trip's activities and supplies the structured evidence, grouped the way the trip runs. You author and sign your operational controls; the assessment is prepared for the school's own review.",
    bridge: { label: "Trip Risk Assessment & RAMS", href: "#risk-assessment" },
  },
  {
    q: "The school asks: what can we hand to families about your program?",
    needs:
      "A complete answer needs the journey written for families, consistent with the operational record behind it.",
    how: "The parent version is produced from the same trip ledger as the operational documents, in the school's own voice, so what families read matches what staff run.",
    bridge: { label: "Parent Itinerary", href: "#parent-itinerary" },
  },
  {
    q: "A school wants your March program in October instead: what changes with the dates?",
    needs:
      "A complete answer needs month-specific conditions for the new window and the destination's calendar checked against the new dates.",
    how: "The Weather Brief is rebuilt for the travel month from fifteen years of historical data, and holidays, closures, and seasonal events are flagged as a booking checklist for you to verify before anything is confirmed.",
    bridge: { label: "Weather Brief", href: "#weather" },
  },
  {
    q: "The school's duty manager asks: what exactly is the cycling day, kilometer by kilometer?",
    needs:
      "A complete answer needs the route recorded: distance, gradient, pacing, sun, terrain cover, and escape points.",
    how: "Outdoor activities such as cycling, trekking, and river sports carry their own route record, prepared once for the program and reissued with each proposal that includes the activity.",
    bridge: { label: "Route Intelligence", href: "#route-intelligence" },
  },
];

const qaProcess: QAEntry[] = [
  {
    q: "Operators ask first: how much of our time does documenting a program take?",
    needs:
      "A complete start needs only the program information you already hold: the itinerary, the venues, the transport.",
    how: "Send it in whatever form it exists. ETI360 structures it once into the program's ledger, and from then on each proposal is an adjustment, not a rebuild.",
    bridge: { label: "Itinerary Report, the record proposals adjust from", href: "#itinerary-report" },
  },
  {
    q: "A school wants a proposal for your program on their dates: what does that involve on your side?",
    needs:
      "A complete answer needs the documented program and one line: this school, this trip, these dates.",
    how: "The itinerary is re-dated, the overview and parent pack re-prepared for the school, and the conditions rebuilt for the travel month. You verify the bookings before anything is confirmed.",
    bridge: { label: "Trip Overview, the first page of the proposal", href: "#trip-overview" },
  },
  {
    q: "Your own leadership asks: whose name is on these documents?",
    needs:
      "A complete answer needs a clear line between structured evidence and signed judgment.",
    how: "ETI360 prepares and structures the evidence. You author and sign your operational controls, the assessment is prepared for each school's own review, and the decision to run the trip stays with the school.",
    bridge: { label: "Trip Risk Assessment & RAMS", href: "#risk-assessment" },
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
            standing, trip due diligence, and the pack families read &mdash;
            prepared from your program&rsquo;s own data, then adjusted for each
            school, each trip, and each set of dates.
          </p>
        </div>
      </section>

      <SectionNav
        items={[
          { href: "#workflow", label: "How it runs" },
          { href: "#tier1", label: "Tier 1 · Baseline" },
          { href: "#tier2", label: "Tier 2 · Every proposal" },
          { href: "#tier3", label: "Tier 3 · During the trip" },
          { href: "#questions", label: "The questions" },
          { href: "#briefing", label: "Arrange a briefing" },
        ]}
      />

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

        <div id="workflow" className="pw-section">
          <div className="container">
            <p className="label ui">How it runs</p>
            <h2 className="section-heading section-heading-lg rule-gold">
              One program on file. Every proposal from it.
            </h2>
            <p className="section-lead">
              Producing a fresh pack for every school&rsquo;s request is where a
              provider&rsquo;s evenings go. ETI360 runs the proposal cycle from
              one record instead: your program documented once, each request
              answered by adjustment, and your review before anything is sent
              or confirmed.
            </p>
          </div>

          <div className="container pw-flow">
            <div className="pw-step" data-reveal="">
              <div className="pw-num ui">Once</div>
              <div className="pw-body">
                <h3>The program goes on file.</h3>
                <p>
                  Send the program as it exists &mdash; itinerary, venues,
                  transport, activities, in whatever form you hold them. ETI360
                  structures it into one record: the master everything else is
                  produced from.
                </p>
              </div>
              <figure className="pw-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/showcase/pages/02-1-calendar-view/2.png"
                  alt="The program's Itinerary Report as an hour-by-hour calendar: the structured record every proposal is produced from"
                  loading="lazy"
                />
                <figcaption className="ui">The program&rsquo;s record</figcaption>
              </figure>
            </div>

            <div className="pw-trigger" data-reveal="">
              <p className="pw-trigger-line">
                &ldquo;A proposal for this school, on this trip, on these
                dates.&rdquo;
              </p>
              <p className="pw-trigger-sub ui">
                A new request begins in one line. From there:
              </p>
            </div>

            <div className="pw-step" data-reveal="">
              <div className="pw-num ui">1</div>
              <div className="pw-body">
                <h3>The system re-dates.</h3>
                <p>
                  The itinerary and calendar move to the school&rsquo;s dates.
                  The Weather Brief is rebuilt for the travel month from fifteen
                  years of data, and the destination&rsquo;s calendar is checked
                  against the new window &mdash; holidays, closures, and
                  seasonal events flagged as a booking checklist for you to
                  verify.
                </p>
              </div>
              <figure className="pw-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/showcase/pages/01-1-weather-brief-sydney/1.png"
                  alt="Weather Brief rebuilt for the proposal's travel month"
                  loading="lazy"
                />
                <figcaption className="ui">Rebuilt for the travel month</figcaption>
              </figure>
            </div>

            <div className="pw-step" data-reveal="">
              <div className="pw-num ui">2</div>
              <div className="pw-body">
                <h3>The pack is re-prepared.</h3>
                <p>
                  The Trip Overview and Parent Itinerary are re-prepared for the
                  school, in the school&rsquo;s own voice. The risk assessment
                  and RAMS are prepared for the school&rsquo;s own review; your
                  operational controls stay yours to author and sign.
                </p>
              </div>
              <figure className="pw-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/email/card-parent.png"
                  alt="Parent Itinerary re-prepared in the requesting school's voice"
                  loading="lazy"
                />
                <figcaption className="ui">In the school&rsquo;s voice</figcaption>
              </figure>
            </div>

            <div className="pw-step" data-reveal="">
              <div className="pw-num ui">3</div>
              <div className="pw-body">
                <h3>The correspondence is drafted.</h3>
                <p>
                  Coordination emails for the hotels, restaurants, and transport
                  around the tour are drafted from the same record. For college
                  tours, the requests to each college for visit times are
                  prepared alongside &mdash; every draft ready for your review.
                </p>
                <p className="pw-chips ui">
                  <span>Hotels</span>
                  <span>Restaurants</span>
                  <span>Transport</span>
                  <span>The colleges</span>
                </p>
              </div>
            </div>

            <div className="pw-step" data-reveal="">
              <div className="pw-num ui">4</div>
              <div className="pw-body">
                <h3>You review, send, and confirm.</h3>
                <p>
                  Every draft is yours to edit and send; every booking is yours
                  to confirm before anything is fixed. The system prepares, you
                  decide &mdash; and the school receives the same documented
                  standard, proposal after proposal.
                </p>
              </div>
            </div>

            {/* When written permission exists, the client's name goes here:
                "This is the cycle we run with [TSCT], a college-tour
                provider working across Asia." Until then the cycle is
                described without naming the client. */}
            <p className="pw-close" data-reveal="">
              Once the program is on file, every proposal after that is an
              adjustment, not a rebuild. The documents below are what each
              proposal is assembled from.
            </p>
          </div>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Annual"
          name="Organizational Baseline"
          desc="A documented review of your practices — the same ten-area review applied to schools and to trip providers, recorded across the ETI360 Operational Capability Framework, with your documentation kept in order and refreshed annually."
        />
        <div className="doc-rows">
          {tier1.map((e) => (
            <DocRow key={e.anchor} e={e} eager />
          ))}
        </div>

        <TierBand
          n={2}
          id="tier2"
          eyebrow="Tier Two · Every proposal"
          name="Trip Risk Review"
          desc="The due diligence documentation school leadership asks for, the documents that get students and parents ready for the trip, and a rehearsal of the trip before it runs."
        />
        <div className="doc-rows">
          {tier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
        <DocRowsExpander
          items={tier2More}
          label="See three more Tier 2 documents"
        />

        <TierBand
          n={3}
          id="tier3"
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

        <div id="questions" className="container measure qa-section">
          <h2 className="section-heading rule-gold">
            The questions a proposal must answer.
          </h2>
          <p>
            Every proposal generates questions: from school risk committees and
            boards during due diligence, from families before departure, and
            from your own leadership. Each answer below names the document that
            carries it.
          </p>
          <QABlock
            label="Questions schools ask you"
            entries={qaAsked}
            expandFirst={2}
          />
          <QABlock label="Working with ETI360" entries={qaProcess} />
        </div>
      </section>

      <section id="briefing" className="cta-section">
        <div className="container measure">
          <h2>See it on your own program.</h2>
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
