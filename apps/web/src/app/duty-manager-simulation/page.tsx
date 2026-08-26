import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Duty Manager Simulation",
  description:
    "A facilitated ninety-minute session in which a school's own duty manager works a timeline of the school's trips on the Duty Manager Dashboard, closing with an After-Action Report.",
  alternates: { canonical: "/duty-manager-simulation" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "Duty Manager Simulation — ETI360",
    description:
      "A facilitated ninety-minute session in which a school's own duty manager works a timeline of the school's trips on the Duty Manager Dashboard, closing with an After-Action Report.",
    type: "website",
  },
};

export default function DutyManagerSimulationPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Duty Manager Simulation</p>
          <h1>The plan on paper, worked once before travel.</h1>
          <p className="subtitle">
            A facilitated ninety-minute session in which your own duty manager
            works a timeline of your school&rsquo;s trips on the Duty Manager
            Dashboard, managing events as they arrive, before any group departs.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            Schools rehearse the things they care about: the concert has a dress
            rehearsal, the exam season has mocks. The Duty Manager Simulation
            gives the same practice to the person who holds the operational
            picture while a group travels &mdash; your duty manager, in the same
            working view they will use during the real trip.
          </p>

          <h2>How it runs</h2>
          <p>
            The Simulation runs after your trips are in the system: the
            itineraries structured into their records, the assessments in place,
            and the documents produced. The session then draws on that real trip
            data. Over ninety minutes, your duty manager works a compressed
            timeline of the trips on the Duty Manager Dashboard: check-ins
            arrive, a forecast moves, a coach runs late, a message needs an
            answer. Each event asks for a decision &mdash; act, communicate,
            escalate, or deliberately hold &mdash; and the escalation path
            agreed before departure is the one being practiced.
          </p>
          <p>
            A facilitator runs the clock and the scenario. The duty manager runs
            the trips.
          </p>

          <h2>What the school receives</h2>
          <p>
            The session closes with an After-Action Report, compiled from what
            happened in the room: the events, the decisions and their timing,
            the messages, and the points where the school&rsquo;s own procedures
            answered &mdash; or where no procedure was on file. The report is
            addressed to the school and kept by the school, filed beside the
            trip documents it was practiced against.
          </p>

          <div className="boundary-callout">
            <h3>Whose seat it is</h3>
            <p>
              The person in the seat during the Simulation is the same person in
              the seat during the trip: your duty manager, never ETI360. The
              Dashboard is operated by the school&rsquo;s own team, the
              decisions practiced are the school&rsquo;s own decisions, and the
              record of the practice belongs to the school.
            </p>
          </div>

          <h2>Where it sits in the framework</h2>
          <p>
            The Simulation is part of Tier 2, the Trip Risk Review: the
            rehearsal that follows the documents. What it practices is Tier 3,
            Dynamic Risk Operations &mdash; the days a group is away, worked
            from the Duty Manager Dashboard. What it leaves behind feeds the
            record that opens next year&rsquo;s planning.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Arrange a briefing.</h2>
          <p>
            The Simulation is scoped in conversation, once your trips are in the
            system. A briefing covers what that involves for your school and
            what the session would draw on. We respond within two business days.
          </p>
          <p>
            <Link href="/contact" className="cta-button ui">
              Arrange a briefing
            </Link>
          </p>
          <p>
            <Link href="/for-schools" className="cta-link ui">
              See the documents the session draws on &rarr;
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
