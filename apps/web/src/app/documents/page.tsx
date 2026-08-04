import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Documents",
  description:
    "The ETI360 document library: what your school receives across Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, and Tier 3 Dynamic Risk Operations — real rendered pages, shown in full.",
  openGraph: {
    title: "The Documents — ETI360",
    description:
      "The ETI360 document library: what your school receives across Tier 1 Organizational Baseline, Tier 2 Trip Risk Review, and Tier 3 Dynamic Risk Operations — real rendered pages, shown in full.",
    type: "website",
  },
};

type Entry = {
  anchor: string;
  stage: string;
  name: string;
  reader: string;
  desc: string;
  image: { src: string; alt: string };
  pageHref?: string;
};

const tier1: Entry[] = [
  {
    anchor: "baseline",
    stage: "Tier 1 · Annual",
    name: "Organizational Baseline Evaluation",
    reader: "Head · Board · Risk committee",
    desc: "The same ten-area review is applied to your school and to each trip provider who serves it: a baseline of organizational readiness on both sides of every trip, mapped against ISO 31031 and refreshed annually.",
    image: {
      src: "/email/spread-school-baseline.png",
      alt: "Organizational Baseline Evaluation cover page for Harborview International School, with ten scored areas",
    },
  },
];

const tier2: Entry[] = [
  {
    anchor: "trip-overview",
    stage: "Tier 2 · The first read",
    name: "Trip Overview",
    reader: "Head · Approving committee",
    desc: "The trip on one page: program, dates, group, and logistics at a glance, for the first read before the detail.",
    image: {
      src: "/email/page-overview.png",
      alt: "Trip Overview one-pager for the Cherry Blossom Tokyo sample trip",
    },
  },
  {
    anchor: "parent-itinerary",
    stage: "Tier 2 · For families",
    name: "Parent Itinerary",
    reader: "Parents",
    desc: "The journey written for families, in the school's own voice: clear day information, meals, accommodation, and what to know — with the full risk assessment staying school-side, deliberately.",
    image: {
      src: "/email/card-parent.png",
      alt: "Parent Itinerary day pages with photographs and day-by-day plans",
    },
  },
  {
    anchor: "itinerary-report",
    stage: "Tier 2 · The operational record",
    name: "Itinerary Report",
    reader: "Coordinator · Trip staff",
    desc: "The same journey as a minute-by-minute calendar: every activity, transfer, meal, and overnight in hour-by-hour blocks, transit included.",
    image: {
      src: "/marketing/library/itinerary-report.png",
      alt: "Itinerary Report calendar view: four trip days as hour-by-hour blocks covering activities, meals, transport, and accommodation",
    },
  },
  {
    anchor: "trip-discovery-map",
    stage: "Tier 2 · The trip on one sheet",
    name: "Trip Discovery Map",
    reader: "Coordinator · Parents evening",
    desc: "Stops, routes, and the shape of each day on one visual sheet, with the day-by-day companion page alongside.",
    image: {
      src: "/email/spread-map-1.jpg",
      alt: "Trip Discovery Map for Cherry Blossom Tokyo: numbered stops, routes, and photo callouts on one sheet",
    },
  },
  {
    anchor: "route-intelligence",
    stage: "Tier 2 · Outdoor activities",
    name: "Route Intelligence",
    reader: "Coordinator · Duty manager",
    desc: "Distance, gradient, pacing, sun, terrain cover, and escape points, recorded for outdoor activities such as cycling, trekking, and river sports.",
    image: {
      src: "/email/spread-itoshima-2.png",
      alt: "Route Intelligence page for the Big Itoshima ride: elevation profile, waypoint register, sun and terrain cover",
    },
  },
  {
    anchor: "weather",
    stage: "Tier 2 · Conditions",
    name: "Weather Brief",
    reader: "Coordinator · Trip staff",
    desc: "Month-specific conditions for the destination and dates, built on fifteen years of historical data: temperature ranges, rain probability by day, daylight, and what the pattern means for the plan.",
    image: {
      src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
      alt: "Weather Brief for a March trip window: fifteen-year temperature overview, daily outlook, and planning notes",
    },
  },
  {
    anchor: "activity-risk-profile",
    stage: "Tier 2 · Every activity scored",
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
    stage: "Tier 2 · The decision record",
    name: "Trip Risk Assessment & RAMS",
    reader: "Risk lead · Trip staff · Provider",
    desc: "A consistent document prepared for the school's review and decision: hazards, controls, who holds each control, and residual risk in plain language — grouped the way the trip runs, one assessment per activity group. The same structure is available as built-in RAMS forms your team can work in directly.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "RAMS report risk register page: named risks with inherent and residual scores, controls, and emergency actions",
    },
  },
  {
    anchor: "leadership-deck",
    stage: "Tier 2 · For the approval meeting",
    name: "Leadership Deck",
    reader: "Head presenting to board or parents",
    desc: "The trip's evidence base as a short presentation, for the internal meeting where the trip is discussed and decided.",
    image: {
      src: "/marketing/library/leadership-deck.png",
      alt: "Leadership Deck title slide: the trip in 30 seconds, with days, students, activities, destination, and dates",
    },
  },
  {
    anchor: "field-trip-report",
    stage: "Tier 2 · One-day trips",
    name: "Field Trip Report",
    reader: "Parents · Trip coordinator",
    desc: "The same discipline for a single day out: departure and return times, a timed itinerary, the route and hospital mapped, and notes for families, on one page.",
    image: {
      src: "/email/page-fieldtrip.png",
      alt: "Field Trip Report for a one-day trip: timed itinerary, route map, and hospital map on one page",
    },
  },
  {
    anchor: "trip-risk-register",
    stage: "Tier 2 · Before departure",
    name: "Trip Risk Register",
    reader: "Coordinator · Risk lead · Leadership",
    desc: "A pre-trip view of the school's trips in one place: departures, seasonal risk signals, and RAMS status across the year, connected to each trip's documents.",
    image: {
      src: "/marketing/library/trip-risk-register.png",
      alt: "The Trip Risk Register in the school portal: scheduled trips month by month with seasonal risk signals and RAMS status",
    },
    pageHref: "/documents/trip-risk-register",
  },
];

const tier3: Entry[] = [
  {
    anchor: "teacher-guide",
    stage: "Tier 3 · In the leader's hand",
    name: "Teacher Operational Guide",
    reader: "Trip leader · Trip staff",
    desc: "One page per day, built for the trip leader: timing, movements, contacts, and the day's attention points.",
    image: {
      src: "/email/page-teacher.png",
      alt: "Teacher Operational Guide day page with the run sheet, movements, and contacts",
    },
  },
  {
    anchor: "duty-manager-dashboard",
    stage: "Tier 3 · During the trip",
    name: "Duty Manager Dashboard",
    reader: "The school's own duty manager",
    desc: "The working view while groups travel — operated by your duty manager, never by us: trip context, location, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure.",
    image: {
      src: "/email/screen-dmd-v3.png",
      alt: "The Duty Manager Dashboard with a trip open: trip context, location map with the routed hospital, check-ins, and messages",
    },
  },
  {
    anchor: "duty-manager-simulation",
    stage: "Tier 3 · Rehearsal",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard. Your duty manager works through a realistic scenario based on one of your school's trips, practicing agreed roles, communication, and escalation decisions.",
    image: {
      src: "/email/screen-simulation.png",
      alt: "The Duty Manager Simulation: itinerary rehearsal and crisis rehearsal inside the dashboard",
    },
  },
  {
    anchor: "post-trip-feedback-loop",
    stage: "Tier 3 · After the trip",
    name: "Post-Trip Feedback Loop",
    reader: "Head · Board · Next year's coordinator",
    desc: "Staff observations recorded after each trip and carried into the next annual baseline, so the record the trip produced is the starting point the next review reads. The feedback system is in development.",
    image: {
      src: "/email/card-posttrip.png",
      alt: "Front page of the Post-Trip Intelligence Report specimen",
    },
  },
];

function EntryBlock({ e, eager }: { e: Entry; eager?: boolean }) {
  return (
    <section id={e.anchor} className="artifact-entry">
      <div className="artifact-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={e.image.src} alt={e.image.alt} loading={eager ? undefined : "lazy"} />
      </div>
      <div className="artifact-copy container measure">
        <p className="artifact-stage ui">{e.stage}</p>
        <h2 className="artifact-decision">{e.name}</h2>
        <p>{e.desc}</p>
        <p className="artifact-reader ui">
          <span className="artifact-reader-label">Read by</span> {e.reader}
        </p>
        {e.pageHref && (
          <p>
            <Link href={e.pageHref} className="cta-link ui">
              Read the full overview &rarr;
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default function DocumentsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/emergency-docs.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Documents</p>
          <h1>What your school receives.</h1>
          <p className="subtitle">
            Every engagement produces documents, built from your trip&rsquo;s own
            data. One entry per document, in the order the work happens &mdash;
            each shown as a real rendered page.
          </p>
        </div>
      </section>

      <article className="article-body">
        <div className="container measure">
          <p className="artifact-reader ui">
            The pages shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown.
          </p>
        </div>

        <div className="container" style={{ marginTop: "3em" }}>
          <h2 className="section-heading rule-gold">
            Tier 1 &middot; Organizational Baseline
          </h2>
        </div>
        <div className="artifact-wall">
          {tier1.map((e) => (
            <EntryBlock key={e.anchor} e={e} eager />
          ))}
        </div>

        <div className="container" id="tier2">
          <h2 className="section-heading rule-gold">
            Tier 2 &middot; Trip Risk Review
          </h2>
        </div>
        <div className="artifact-wall">
          {tier2.map((e) => (
            <EntryBlock key={e.anchor} e={e} />
          ))}
        </div>

        <div className="container" id="tier3">
          <h2 className="section-heading rule-gold">
            Tier 3 &middot; Dynamic Risk Operations
          </h2>
        </div>
        <div className="artifact-wall">
          {tier3.map((e) => (
            <EntryBlock key={e.anchor} e={e} />
          ))}
        </div>

        <div className="container measure">
          <p>
            Around these, each engagement carries its working documents &mdash;
            daily briefings, incident records, site briefs, and provider
            documentation reviews &mdash; inside the packs they belong to. Each
            document can be prepared around the school&rsquo;s policies,
            templates, parent audience, and brand.
          </p>
        </div>
      </article>

      <section className="cta-section">
        <div className="container measure">
          <h2>Every page, shown in full.</h2>
          <p>
            A complete worked example &mdash; the sample pack, walkable end to
            end, produced the way yours would be.
          </p>
          <p>
            <Link href="/showcase" className="cta-button ui">
              See the full sample pack
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
