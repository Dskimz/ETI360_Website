import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Schools",
  description:
    "How the ETI360 document library carries a school trip from the annual Organizational Baseline through the Tier 2 Trip Risk Review pack to Tier 3 Dynamic Risk Operations — shown as real rendered pages.",
  openGraph: {
    title: "For Schools — ETI360",
    description:
      "How the ETI360 document library carries a school trip from the annual Organizational Baseline through the Tier 2 Trip Risk Review pack to Tier 3 Dynamic Risk Operations — shown as real rendered pages.",
    type: "website",
  },
};

export default function ForSchoolsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/for-schools.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">For Schools</p>
          <h1>How a trip comes together.</h1>
          <p className="subtitle">
            From the annual baseline to the day the group returns, each stage of
            a school trip has its own document. This page walks that arc in
            order, with real pages from the library.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            A school trip is a sequence of decisions: whether the program fits,
            how the days will run, what families should know, what has been
            assessed and what stands ready, who watches while the group travels,
            and what next year&rsquo;s planning learns from this one. ETI360
            prepares a document for each of those decisions, built from your
            trip&rsquo;s own data, so that each one can be discussed with the
            evidence in front of it.
          </p>

          <p className="artifact-reader ui">
            The pages shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown.
          </p>

          <h2>Before any trip: the Organizational Baseline</h2>
          <p>
            Tier 1 &middot; Organizational Baseline is annual, not per-trip. The
            same ten-area review is applied to your school and to each trip
            provider who serves it &mdash; policies, roles, and standing
            arrangements on both sides of every trip, mapped against ISO 31031
            and refreshed each year. Every trip that follows starts from that
            documented standing rather than from a blank page.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/spread-school-baseline.png"
              alt="Organizational Baseline Evaluation cover page for Harborview International School, with ten scored areas"
            />
          </div>
          <p className="artifact-reader ui">
            The Organizational Baseline Evaluation for Harborview International
            School: ten scored areas, refreshed annually.
          </p>
          <p>
            <Link href="/documents#baseline" className="cta-link ui">
              The Organizational Baseline in the library &rarr;
            </Link>
          </p>

          <h2>A trip is proposed: the first read</h2>
          <p>
            Tier 2 &middot; Trip Risk Review begins when a specific trip is on
            the table. The Trip Overview puts the program, dates, group, and
            logistics on one page &mdash; the first read for a head or approving
            committee, before anyone opens the detail.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/page-overview.png"
              alt="Trip Overview one-pager for the Cherry Blossom Tokyo sample trip"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Trip Overview for the Cherry Blossom Tokyo sample trip: the
            whole program on one page.
          </p>
          <p>
            <Link href="/documents#trip-overview" className="cta-link ui">
              The Trip Overview in the library &rarr;
            </Link>
          </p>

          <h2>The journey, written for each reader</h2>
          <p>
            The same journey is then written for the people who will read it.
            The Parent Itinerary tells families the days, meals, accommodation,
            and what to know, in the school&rsquo;s own voice &mdash; with the
            full risk assessment staying school-side, deliberately. The
            Itinerary Report is the operational record: every activity,
            transfer, meal, and overnight in hour-by-hour blocks, transit
            included. And the Trip Discovery Map puts stops, routes, and the
            shape of each day on one visual sheet, as useful at a parents
            evening as on a planning desk.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/spread-map-1.jpg"
              alt="Trip Discovery Map for Cherry Blossom Tokyo: numbered stops, routes, and photo callouts on one sheet"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Trip Discovery Map: numbered stops, routes, and photo callouts
            on one sheet.
          </p>
          <p>
            <Link href="/documents#parent-itinerary" className="cta-link ui">
              Parent Itinerary &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#itinerary-report" className="cta-link ui">
              Itinerary Report &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#trip-discovery-map" className="cta-link ui">
              Trip Discovery Map &rarr;
            </Link>
          </p>

          <h2>The conditions the trip will meet</h2>
          <p>
            Two documents record what the destination itself brings. Route
            Intelligence covers outdoor activities such as cycling, trekking,
            and river sports: distance, gradient, pacing, sun, terrain cover,
            and escape points, recorded for each route. The Weather Brief sets
            out month-specific conditions for the destination and dates, built
            on fifteen years of historical data &mdash; temperature ranges, rain
            probability by day, daylight, and what the pattern means for the
            plan.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/spread-itoshima-2.png"
              alt="Route Intelligence page for the Big Itoshima ride: elevation profile, waypoint register, sun and terrain cover"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            Route Intelligence for the Big Itoshima ride: elevation profile,
            waypoint register, sun and terrain cover.
          </p>
          <p>
            <Link href="/documents#route-intelligence" className="cta-link ui">
              Route Intelligence &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#weather" className="cta-link ui">
              Weather Brief &rarr;
            </Link>
          </p>

          <h2>The risk work: scored, assessed, decided</h2>
          <p>
            The Activity Risk Profile scores every activity across seven
            dimensions, and its policy gate separates the activities that
            receive full RAMS coverage from those recorded at routine level. The
            Trip Risk Assessment &amp; RAMS is the decision record that follows:
            hazards, controls, who holds each control, and residual risk in
            plain language, grouped the way the trip runs &mdash; one assessment
            per activity group, prepared for your school&rsquo;s review and
            decision.
          </p>
          <p>
            For the meeting where the trip is discussed and decided, the
            Leadership Deck compresses the trip&rsquo;s evidence base into a
            short presentation.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/library/rams-report.png"
              alt="RAMS report risk register page: named risks with inherent and residual scores, controls, and emergency actions"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The RAMS risk register page: named risks with inherent and residual
            scores, controls, and emergency actions.
          </p>
          <p>
            <Link
              href="/documents#activity-risk-profile"
              className="cta-link ui"
            >
              Activity Risk Profile &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#risk-assessment" className="cta-link ui">
              Trip Risk Assessment &amp; RAMS &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#leadership-deck" className="cta-link ui">
              Leadership Deck &rarr;
            </Link>
          </p>

          <h2>One-day trips, the same discipline</h2>
          <p>
            Not every departure is a week abroad. The Field Trip Report applies
            the same structure to a single day out: departure and return times,
            a timed itinerary, the route and hospital mapped, and notes for
            families, on one page.
          </p>
          <p>
            <Link href="/documents#field-trip-report" className="cta-link ui">
              The Field Trip Report in the library &rarr;
            </Link>
          </p>

          <h2>The year in one register</h2>
          <p>
            Each trip&rsquo;s pack has a home. The Trip Risk Register holds your
            school&rsquo;s year on one screen &mdash; every scheduled trip in
            departure order, with seasonal risk signals and RAMS status visible
            before any group leaves. It is the bridge between the standing Tier
            1 review above it and each trip&rsquo;s Tier 2 pack below.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/library/trip-risk-register.png"
              alt="The Trip Risk Register in the school portal: scheduled trips month by month with seasonal risk signals and RAMS status"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Trip Risk Register for Harborview International School: 31
            scheduled trips across the academic year.
          </p>
          <p>
            <Link href="/documents/trip-risk-register" className="cta-link ui">
              Read the full overview &rarr;
            </Link>
          </p>

          <h2>While the group travels: Dynamic Risk Operations</h2>
          <p>
            Tier 3 &middot; Dynamic Risk Operations is the trip in motion. The
            Teacher Operational Guide puts one page per day in the trip
            leader&rsquo;s hand: timing, movements, contacts, and the
            day&rsquo;s attention points. The Duty Manager Dashboard is the
            working view while groups travel &mdash; operated by your own duty
            manager, never by us: trip context, location, check-ins, weather
            flags, incidents, contacts, and the escalation path agreed before
            departure.
          </p>
          <p>
            Before the first departure, your duty manager rehearses the role in
            the Duty Manager Simulation: a facilitated ninety-minute session
            inside the dashboard, working through a realistic scenario based on
            one of your school&rsquo;s own trips.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/screen-dmd-v3.png"
              alt="The Duty Manager Dashboard with a trip open: trip context, location map with the routed hospital, check-ins, and messages"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Duty Manager Dashboard with a trip open: trip context, location
            map with the routed hospital, check-ins, and messages.
          </p>
          <p>
            <Link
              href="/documents#duty-manager-dashboard"
              className="cta-link ui"
            >
              Duty Manager Dashboard &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#teacher-guide" className="cta-link ui">
              Teacher Operational Guide &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link
              href="/documents#duty-manager-simulation"
              className="cta-link ui"
            >
              Duty Manager Simulation &rarr;
            </Link>
          </p>

          <h2>After the trip: what next year reads</h2>
          <p>
            Staff observations are recorded after each trip and carried into the
            next annual baseline, so the record one trip produced is the
            starting point the next review reads. The feedback system is in
            development.
          </p>
          <p>
            <Link
              href="/documents#post-trip-feedback-loop"
              className="cta-link ui"
            >
              The Post-Trip Feedback Loop in the library &rarr;
            </Link>
          </p>

          <div className="boundary-callout">
            <h3>What ETI360 does not do</h3>
            <p>
              ETI360 covers trip governance specifically &mdash; not
              safeguarding, on-campus health and safety, or liability
              management, which are distinct disciplines with their own
              specialist firms. Within trip governance, ETI360 prepares,
              structures, and documents the evidence. It does not approve trips,
              certify schools or providers, or substitute its judgment for that
              of your governing bodies. The documents inform leadership discussion; the
              decision stays with the school.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Start with one trip.</h2>
          <p>
            The clearest way to see how the documents would read for your school
            is a conversation about one upcoming trip. Briefings are
            conversations, not sales calls. We respond within two business days.
          </p>
          <p>
            <Link href="/contact" className="cta-button ui">
              Get in touch
            </Link>
          </p>
          <p>
            <Link href="/documents" className="cta-link ui">
              Browse the full library &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
