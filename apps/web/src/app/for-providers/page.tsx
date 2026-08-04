import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Providers",
  description:
    "For trip providers: document a program once with ETI360, then each school proposal starts from a message — the itinerary adjusted, the Weather Brief updated for the travel month, and the risk documents school leaders read, prepared from your program's own data.",
  openGraph: {
    title: "For Providers — ETI360",
    description:
      "For trip providers: document a program once with ETI360, then each school proposal starts from a message — the itinerary adjusted, the Weather Brief updated for the travel month, and the risk documents school leaders read, prepared from your program's own data.",
    type: "website",
  },
};

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
          <h1>A proposal from one message.</h1>
          <p className="subtitle">
            Document a program once. After that, a proposal for a new school
            starts from a message &mdash; this school, these dates &mdash; and
            ETI360 adjusts the itinerary, rebuilds the Weather Brief for the
            travel month, and prepares the documents school leaders read.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            Every school you propose to asks for broadly the same things:
            the program on their dates, the conditions their group will meet,
            and the risk documentation their leadership reviews before a trip is
            approved. Assembling that pack by hand, proposal after proposal, is
            slow work &mdash; and most of it is the same program, re-dated.
            ETI360 documents the program once, then prepares the documents
            behind each school&rsquo;s proposal from that record.
          </p>

          <p className="artifact-reader ui">
            The pages shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown.
          </p>

          <h2>Your program, documented once</h2>
          <p>
            The starting point is a program you already run. ETI360 documents it
            in full: the itinerary as a minute-by-minute operational record, the
            routes and activities, the conditions by month, and the risk
            documentation built around them. These are the same documents
            schools browse in the ETI360 library &mdash; prepared here from your
            program&rsquo;s own data.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/library/itinerary-report.png"
              alt="Itinerary Report calendar view: four trip days as hour-by-hour blocks covering activities, meals, transport, and accommodation"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Itinerary Report: the program as a minute-by-minute operational
            record &mdash; the base each proposal is adjusted from.
          </p>
          <p>
            <Link href="/documents" className="cta-link ui">
              The document library, in full &rarr;
            </Link>
          </p>

          <h2>Then a proposal starts from a message</h2>
          <p>Once the record exists, a new proposal begins in one line:</p>
          <p className="pull-quote">
            &ldquo;A proposal for this school, on this trip, on these
            dates.&rdquo;
          </p>
          <p>
            ETI360 updates and adjusts the data from there. The itinerary is
            re-dated for the new group. The Trip Overview and Parent Itinerary
            are re-prepared for the school. The Weather Brief is rebuilt for the
            travel month from fifteen years of historical data. And the proposed
            dates are checked against the destination&rsquo;s calendar &mdash;
            holidays, closures, and seasonal events that could affect the
            program, flagged as a booking checklist for you to verify before
            anything is confirmed.
          </p>
          <p>
            Alongside those, the pack carries the documents school leaders read
            when they work through a trip&rsquo;s risk questions &mdash; the
            Activity Risk Profile and the Trip Risk Assessment &amp; RAMS,
            prepared for the school&rsquo;s own review &mdash; together with the
            Trip Discovery Map that shows the journey on one sheet.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showcase/pages/01-1-weather-brief-sydney/1.png"
              alt="Weather Brief for a March trip window: fifteen-year temperature overview, daily outlook, and planning notes"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The Weather Brief, rebuilt for the travel month: fifteen-year
            temperature overview, daily outlook, and planning notes.
          </p>
          <p>
            <Link href="/documents#trip-overview" className="cta-link ui">
              Trip Overview &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#parent-itinerary" className="cta-link ui">
              Parent Itinerary &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#weather" className="cta-link ui">
              Weather Brief &rarr;
            </Link>{" "}
            &middot;{" "}
            <Link href="/documents#risk-assessment" className="cta-link ui">
              Trip Risk Assessment &amp; RAMS &rarr;
            </Link>
          </p>

          <h2>Documented standing, on both sides</h2>
          <p>
            Schools increasingly read provider documentation the way their
            boards read their own. The Tier 1 Organizational Baseline applies
            the same ten-area review to the school and to each trip provider who
            serves it, mapped against ISO 31031 and refreshed annually &mdash;
            so your standing is documented in the same form a school&rsquo;s own
            baseline review takes.
          </p>
          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/email/spread-partner-baseline.png"
              alt="Organizational Baseline Evaluation applied to a trip provider, with ten scored areas"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The same ten-area baseline review, applied to a trip provider.
          </p>
          <p>
            <Link href="/documents#baseline" className="cta-link ui">
              The Organizational Baseline in the library &rarr;
            </Link>
          </p>

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
          <p>
            <Link href="/documents" className="cta-link ui">
              Browse the documents &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
