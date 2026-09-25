import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Image from "next/image";
import Link from "next/link";
import { TripStrip } from "@/components/TripStrip";
import { TwoServices } from "@/components/TwoServices";
import { reportCatalog } from "@/content/solutions";
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
   worked trips, the questions schools ask first, and lower down the
   documents question by question. */

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

// Thumbnail crops. A whole document page shrunk to the card slot reads as grey
// noise, so each asset is anchored — and where needed magnified — on the region
// that stays legible: a masthead, a status grid, a route line.
const crops: Record<string, { pos: string; zoom?: number }> = {
  "location-timeline": { pos: "left top", zoom: 1.5 },
  "route-intelligence": { pos: "center top" },
  "trip-risk-documentation": { pos: "left top", zoom: 1.6 },
  "weather-brief": { pos: "left top", zoom: 2.3 },
  "medical-access": { pos: "left top", zoom: 2.4 },
  "student-journey": { pos: "center top" },
  "field-trips": { pos: "center top", zoom: 1.15 },
  "conference-visits": { pos: "center top", zoom: 1.15 },
  "standard-documentation": { pos: "center top" },
  "duty-manager-simulation": { pos: "left top" },
  "duty-manager": { pos: "left top" },
  "incident-reporting": { pos: "left top" },
};

// The slot a thumbnail occupies, multiplied by its crop zoom and a cover-crop
// factor: object-fit cover on a landscape source in the portrait slot shows
// under half the source width, so the source must be over-provisioned or the
// crop renders soft on retina displays.
function imageSizes(slug: string, wide: boolean) {
  const zoom = crops[slug]?.zoom ?? 1;
  const desktop = Math.round((wide ? 420 : 205) * zoom * 2.3);
  return `(max-width: 700px) ${Math.round(140 * zoom)}vw, ${desktop}px`;
}

const groups = [
  {
    label: "Understand the trip",
    title: "See the trip as time, place, movement and conditions.",
    copy: "Read from one structured itinerary, not from disconnected source documents.",
    items: [
      reportCatalog.locationTimeline,
      reportCatalog.routeIntelligence,
      reportCatalog.weatherBrief,
      reportCatalog.medicalAccess,
    ],
  },
  {
    label: "Prepare the risk documentation",
    title: "Bring the information behind every trip risk document into one working file.",
    copy: "Risk assessments, Emergency Action Procedures, dynamic risk assessment processes: whichever the school uses, the working file carries the hazards, the controls and the emergency information they draw on, organized by activity group.",
    items: [reportCatalog.tripRiskWorkingFile],
  },
  {
    label: "Connect purpose to the day",
    title: "Carry the trip's educational intent through to the day it belongs to.",
    copy: "Each named activity carries its purpose, its place on the day's map, and its hour.",
    items: [reportCatalog.studentJourney],
  },
  {
    label: "Keep the record consistent",
    title: "Give different trips one familiar documentation structure.",
    copy: "The content remains specific to the departure while the way leadership, staff and families read it stays consistent—across a two-week expedition and across a year of one-day trips.",
    items: [reportCatalog.standardDocumentation, reportCatalog.fieldTrips, reportCatalog.conferenceVisits],
  },
  {
    label: "Practice before departure",
    title: "Work one trip from the duty phone before the group departs.",
    copy: "The same trip record and the same screen, worked by the school's own duty manager on situations drawn from the trip's own itinerary; the record is about the plan, not the person.",
    items: [reportCatalog.dutyManagerSimulation],
  },
  {
    label: "Operate and document",
    title: "Carry the trip record forward while groups travel.",
    copy: "Keep the current context, communications and operating record connected to the trip that produced them.",
    items: [reportCatalog.dutyManager, reportCatalog.incidentReporting],
  },
];

export default function ForSchoolsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/for-schools.jpg')" } as React.CSSProperties}
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
        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="services">Two services</h2>
        </div>
        <div className="container">
          <TwoServices />
        </div>

        <div className={`container measure ${styles.block}`}>
          <h2 className="section-heading rule-gold" id="trips">Worked trips</h2>
          <p>
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
      </section>

      <div className={styles.page}>
        <section className={styles.openSet}>
          <div className={styles.openSetInner}>
            <p className={styles.sectionLabel}>Question by question</p>
            <p>
              The documents below, grouped by the question each one answers. When a school brings a
              question that is not on this page, we work on it together.
            </p>
            <Link href="/framework">Every document, tier by tier &rarr;</Link>
          </div>
        </section>

        {groups.map((group, groupIndex) => (
          <section
            className={`${styles.groupSection} ${groupIndex % 2 === 1 ? styles.groupAlt : ""}`}
            key={group.label}
          >
            <div className={styles.groupInner}>
              <div className={styles.groupHeading}>
                <div>
                  <p className={styles.sectionLabel}>{group.label}</p>
                  <h2>{group.title}</h2>
                </div>
                <p>{group.copy}</p>
              </div>

              <div className={`${styles.solutionGrid} ${group.items.length === 1 ? styles.singleCard : ""}`}>
                {group.items.map((solution) => (
                  <Link href={solution.href} className={styles.solutionCard} key={solution.slug}>
                    <div
                      className={styles.cardImage}
                      style={
                        {
                          "--crop-pos": crops[solution.slug]?.pos ?? "top center",
                          "--crop-zoom": crops[solution.slug]?.zoom ?? 1,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={solution.image}
                        alt={solution.imageAlt}
                        fill
                        quality={90}
                        sizes={imageSizes(solution.slug, group.items.length === 1)}
                      />
                    </div>
                    <div className={styles.cardCopy}>
                      <h3>{solution.name}</h3>
                      <p>{solution.summary}</p>
                      <div className={styles.supportingQuestion}>
                        <span>A question it answers</span>
                        <strong>{solution.question}</strong>
                        <em className={styles.cardGo}>See the answer &rarr;</em>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className={styles.changeSection}>
          <div className={styles.changeInner}>
            <div>
              <p className={styles.sectionLabel}>When the program changes</p>
              <h2>Update the trip record. Reissue the affected views.</h2>
            </div>
            <div>
              <p>
                A revised date, hotel, transport movement, route or activity can affect several
                documents. ETI360 updates the confirmed source information and rechecks information
                that depends on the changed plan.
              </p>
              <Link href="/for-providers">See how this supports trip providers &rarr;</Link>
            </div>
          </div>
        </section>
      </div>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/marketing/hero/for-schools.jpg"} />
    </>
  );
}
