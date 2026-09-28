/* PARKED, AND IT DOES NOT COMPILE (four-product site, 2026-09-27). The
   providers page is down "for now" (Dan, 2026-09-25: "Focus on schools.").
   It stays at this path because CLAUDE.md names it, unrouted (the leading
   underscore) and excluded from tsconfig.json and the ESLint ignores. Its
   imports are broken on purpose: DocShowcase and WorkedTripDocs were
   deleted and its content moved to apps/web/_parked/content/for-providers.ts.
   Restore them from git history if the page returns. */

import type { Metadata } from "next";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { TripStrip } from "@/components/TripStrip";
import { DocEntry, DocRow, TierBand } from "../../components/DocShowcase";
import { WorkedTripDocs } from "@/components/WorkedTripDocs";

/* PENDING Dan: voice.ts has no provider version of the closing sentence, and
   Dan's sentence speaks to "your school". Until he writes one, the card says
   "Contact us." with no body copy; never reword his sentence inline. */

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
    pdf: "/docs/organizational-baseline-evaluation-v4.pdf",
    stage: "Tier 1 · Your organization",
    name: "Travel Program Review, applied to a trip provider",
    reader: "School risk committees · Your leadership",
    desc: "The ten areas applied to your organization: policies, roles, standing arrangements, and supporting evidence recorded in a common structure.",
    image: {
      src: "/email/spread-school-baseline-v4.png",
      alt: "Travel Program Review for Harborview International School: ten areas, each marked at standard, progressing, or not evidenced; a provider's review follows the same structure",
    },
  },
];

const tier3: DocEntry[] = [
  {
    anchor: "duty-manager-simulation",
    stage: "Tier 3 · Practice before departure",
    name: "Duty Manager Simulation",
    reader: "Duty manager · Trip leadership",
    desc: "A facilitated ninety-minute session inside the dashboard: practice on one of the school's own trips before it runs, working through a realistic scenario with roles, communication, and escalation decisions. The Duty Manager Simulation has not yet been run with a school.",
    image: {
      src: "/marketing/solutions/simulation-dashboard.png",
      alt: "The Duty Manager Dashboard in simulation mode: a gold SIMULATION badge, the trip timeline, current Harborview trips in triage lanes, and the Duty Overview",
    },
    wide: true,
  },
  {
    anchor: "duty-manager-dashboard",
    stage: "Tier 3 · During the trip",
    name: "Duty Manager Dashboard",
    reader: "The school's or provider's own duty manager",
    desc: "The working view while groups travel: trip context, scheduled locations, check-ins, weather flags, incidents, contacts, and the escalation path agreed before departure. Operated by the school's or the provider's own duty manager, never by ETI360.",
    image: {
      src: "/marketing/solutions/scheduled-group-locations.png",
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
          ["--hero-bg" as string]: "url('/trips/costa-rica/hero-poas.jpg')",
        } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">For Providers</p>
          <h1>Documents for the schools you work with.</h1>
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
            The Travel Program Review documents your standing once, reviewed every four years;
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

          <h2>What your school clients receive</h2>
          <p>
            The worked trips show what a school receives for one trip: the
            documents decision by decision, in the school&rsquo;s name, each in
            US Letter and A4. A provider working with ETI360 can offer its school
            clients the same documents for each departure, prepared from the
            provider&rsquo;s own itinerary and documents.
          </p>
        </div>
        <div className="container">
          <TripStrip />
        </div>
        <div className="container measure">
          <p>
            <Link href="/trips" className="cta-link ui">
              See the worked trips &rarr;
            </Link>
          </p>

          <h2>The documents</h2>
          <p>
            The same three tiers schools use, applied from the provider&rsquo;s
            side. Open any thumbnail to read the document itself.
          </p>
          <p className="artifact-reader ui">
            The Travel Program Review sample and the dashboard screens are from
            a worked example for Harborview International School. Harborview
            International School is a fictional school; its location is shown
            for illustrative purposes. The trip documents are from the
            Washington, DC worked trip.
          </p>
        </div>

        <TierBand
          n={1}
          eyebrow="Tier One · Every four years"
          name="Organizational Readiness"
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
          name="Trip Readiness"
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
        <WorkedTripDocs
          tripSlug="washington-dc"
          docSlugs={["school-trip-record", "trip-risk-working-file", "family-trip-brief", "educational-journey"]}
        />

        <TierBand
          n={3}
          eyebrow="Tier Three · During and after"
          name="Live Trip Support and Review"
          desc="A rehearsal before departure, and a working view for managing trip issues while groups travel. The working view is operated by the school's or the provider's own duty manager, never staffed by ETI360."
        />
        <WorkedTripDocs
          tripSlug="washington-dc"
          docSlugs={["trip-leader-card", "chaperone-briefing", "post-trip-feedback-report"]}
        />
        <div className="doc-rows">
          {tier3.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
      </section>

      <CtaCard title={"Contact us."} image={"/marketing/hero/for-providers.jpg"} />
    </>
  );
}
