import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Link from "next/link";
import { TripStrip } from "@/components/TripStrip";
import { TwoServices } from "@/components/TwoServices";
import styles from "./page.module.css";
import {
  BRAND_LINE,
  CLOSING_SENTENCE,
  DAN_TRACK_RECORD,
  FOUNDERS_LINE,
  WHAT_WE_DO_LINE,
  WHO_DECIDES,
} from "@/content/voice";

/* For Schools: one page for every school (Dan, 2026-09-25: "I do not want to
   have a marketing approach for International schools that is different from
   US Private schools"). The former /us content lives here, written for any
   school; /us redirects here (next.config). The two services lead, then the
   worked trips, the questions schools ask first, and what each tier
   includes, named as on the trip pages. */

const DESCRIPTION =
  "Risk intelligence for school trips. ETI360 brings together the trip's itinerary, the provider's documents, and the school's procedures and prepares the documents school leaders, trip leaders, and families use, in US Letter and A4. Approval stays with the school.";

export const metadata: Metadata = {
  title: "For Schools",
  description: DESCRIPTION,
  alternates: { canonical: "/for-schools" },
  openGraph: {
    title: "For Schools — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

const OFFICE_ADDRESS = "412 Avon Belden Rd, Avon Lake, OH 44012";

// What each tier includes: named from the worked trips, so the names match
// the trip pages and /framework.
const TIER_LIST: { name: string; body: string }[] = [
  {
    name: "Tier 1 Organizational Readiness",
    body: "The Travel Program Review: the school's policies and procedures, path by path, reviewed once every four years.",
  },
  {
    name: "Tier 2 Trip Readiness",
    body: "For each trip: the School Trip Record, the Trip Risk Working File the school reviews, completes, and approves, the Family Trip Brief, the Educational Journey, and the Student Journey Guide.",
  },
  {
    name: "Tier 3 Live Trip Support and Review",
    body: "The Trip Leader Card, the Chaperone Briefing and Pocket Emergency Card, and the Post-Trip Feedback Report. The Duty Manager Dashboard is the school's own view while groups travel. The Duty Manager Simulation gives the school's duty manager practice on one of its own trips; it has not yet been run with a school.",
  },
];

export default function ForSchoolsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/trips/italy/hero-florence.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">For schools</p>
          <h1>{BRAND_LINE}</h1>
          <p className="hero-line">{WHAT_WE_DO_LINE}</p>
          <p className="subtitle">
            ETI360 is a school travel preparation service. We bring together the trip&rsquo;s
            itinerary, the provider&rsquo;s documents, and the school&rsquo;s procedures, add what the
            group needs to know about each place, and prepare the documents school leaders, trip
            leaders, and families use. Approval stays with the school.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            Most schools run the same kinds of trips every year: a city trip, a language and culture
            trip abroad, a service week, an outdoor education week, and a year of day trips for the
            younger grades. Each is planned by a teacher or trip lead, often booked through a
            provider, and approved by the school. ETI360 prepares the documents that sit between
            them, each for the person who uses it: the record the school files, the working file the
            school completes and approves, the brief families read, the card the trip leader carries,
            and the report that closes the trip.
          </p>
          <p>
            The school&rsquo;s trip lead emails us the itinerary, the provider&rsquo;s documents, and
            the school&rsquo;s trip policy. We add what the group needs to know along the way, such as
            venue entry rules and the emergency department for each place, with the drive time, and
            return the documents in the school&rsquo;s name and branding, each in a US Letter edition
            and an A4 edition. Where a provider runs the trip, its documents are the starting point.
            The school approves the trip.
          </p>

        </div>
        <div className={`container ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="services">Two services</h2>
        </div>
        <div className="container">
          <TwoServices />
        </div>

        <div className={`container ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="trips">Worked trips</h2>
          <p className={styles.gridLead}>
            Each worked trip shows the documents prepared for one trip, decision by decision, with
            every document open in full.
          </p>
        </div>
        <div className="container">
          <TripStrip />
        </div>

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="questions">What schools ask us first</h2>
          <p>
            <strong>We book through a provider. What does this add?</strong> The provider&rsquo;s
            documents are the starting point, not a competitor. ETI360 brings them together with the
            school&rsquo;s policy and the itinerary, adds what the group needs to know about each
            place, and prepares the file the school reviews and the card the trip leader carries.
            Nothing the provider does is replaced.
          </p>
          <p>
            <strong>Which standard is this against?</strong> There is no single standard for school
            trips. Schools work to their own policies, their accreditor&rsquo;s standards, their
            insurer&rsquo;s requirements, the rules of the country they operate in, and, for travel
            abroad, government travel advisories. The ETI360 Operational Capability Framework
            organizes the school&rsquo;s documents against those references without replacing them.
          </p>
          <p>
            <strong>Student data.</strong> ETI360 does not receive student records or personally
            identifiable student information. Trip files name places, dates, providers, and staff
            roles. The school&rsquo;s obligations for student data stay with the school.
          </p>
          <p>
            <strong>Who does the work.</strong> {FOUNDERS_LINE} {DAN_TRACK_RECORD}
          </p>
          {
            // PENDING Dan N6: price display
          }
          <p>
            <strong>Pricing.</strong> Per trip, in US dollars: the number of trip days times a per-day
            rate covers the trip&rsquo;s documents. A one-day trip is a flat rate. Nothing is free, and
            there is no first-trip fee.
          </p>
          <p>
            <strong>Where we are.</strong> ETI360 PTE. LTD. is a Singapore company with a US office at{" "}
            {OFFICE_ADDRESS}. We respond within two business days.
          </p>
          <p className="artifact-reader ui">{WHO_DECIDES}</p>
        </div>

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="tiers">What each tier includes</h2>
          <dl className={styles.tierList}>
            {TIER_LIST.map((t) => (
              <div key={t.name}>
                <dt className="ui">{t.name}</dt>
                <dd>{t.body}</dd>
              </div>
            ))}
          </dl>
          <p className="ui">
            <Link href="/framework" className="cta-link">
              Every document, tier by tier &rarr;
            </Link>
          </p>

          <h2 className={`section-heading rule-gold ${styles.block}`} id="changes">
            When the program changes
          </h2>
          <p>
            A revised date, hotel, transport movement, route or activity can affect several
            documents. ETI360 updates the confirmed source information and rechecks information that
            depends on the changed plan.
          </p>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/marketing/hero/for-schools.jpg"} />
    </>
  );
}
