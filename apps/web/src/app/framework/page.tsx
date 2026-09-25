import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Link from "next/link";
import { DocRow, TierBand } from "../../components/DocShowcase";
import { schoolTier1, schoolTier3 } from "../../components/docLibrary";
import { WorkedTripDocs } from "@/components/WorkedTripDocs";
import { getTrip } from "@/content/trips";
import { CLOSING_SENTENCE } from "@/content/voice";
import styles from "./framework.module.css";

/* Each tier shows the documents a school receives (Website v1, 2026-09-25):
   Tier 1 the Travel Program Review sample (Harborview), Tier 2 and the Tier 3
   trip documents from the Washington, DC worked trip, with the same names,
   cards and editions as the trip page. No document-count buttons. */

const WORKED_TRIP = "washington-dc";
const TIER2_DOCS = [
  "school-trip-record",
  "trip-risk-working-file",
  "family-trip-brief",
  "educational-journey",
  "student-journey-guide",
];
const TIER3_DOCS = ["trip-leader-card", "chaperone-briefing", "post-trip-feedback-report"];

const DESCRIPTION =
  "The three tiers of the ETI360 framework shown as what a school receives: the Travel Program Review every four years, the documents for each trip, and live trip support and review, every document open in full.";

export const metadata: Metadata = {
  title: "ETI360’s 3-Tier Risk Framework",
  description: DESCRIPTION,
  alternates: { canonical: "/framework" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360’s 3-Tier Risk Framework",
    description: DESCRIPTION,
    type: "website",
  },
};

export default function FrameworkPage() {
  const worked = getTrip(WORKED_TRIP);

  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/trips/shenandoah/hero-point-overlook.jpg')",
        } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">The Framework</p>
          <h1>ETI360&rsquo;s 3-Tier Risk Framework</h1>
          <p className="subtitle">
            Each tier answers one question a school asks about travel, and each answer is a document
            you can open.
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
            prepares a document for each of those decisions. Open any thumbnail
            to read the document itself.
          </p>
          <p className="artifact-reader ui">
            The Travel Program Review sample and the dashboard screens are from
            a worked example for Harborview International School. Harborview International School is a fictional
            school; its location is shown for illustrative purposes. The Tier 2
            and Tier 3 documents are from the {worked ? worked.title : "Washington, DC"} worked
            trip. For your school, every document is produced the same way: in
            your branding and your voice, from your trip&rsquo;s own data.
          </p>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Every four years"
          name="Organizational Readiness"
          desc="Where does our travel governance stand? One documented review, every four years, of where the school and its providers stand: policies, roles, evidence, and standing arrangements across ten operational capability areas."
        />
        <div className={`container measure ${styles.where}`}>
          <p>
            Tier 1 is the Travel Program Review: the school&rsquo;s policies and
            procedures, path by path, once every four years. The sample review
            below opens in full.
          </p>
        </div>
        <div className="doc-rows">
          {schoolTier1.map((e) => (
            <DocRow key={e.anchor} e={e} eager />
          ))}
        </div>

        <TierBand
          n={2}
          id="tier2"
          eyebrow="Tier Two · Every trip"
          name="Trip Readiness"
          desc="Is this trip ready for approval? The documents for one trip, each written for the person who uses it, from the record the school files to the brief families read."
        />
        <div className={`container measure ${styles.where}`}>
          <p>
            Every worked trip shows this tier in full: the documents for one
            trip, decision by decision, each in US Letter and A4.{" "}
            <Link href="/trips" className="cta-link ui">
              The worked trips &rarr;
            </Link>
          </p>
        </div>
        <WorkedTripDocs tripSlug={WORKED_TRIP} docSlugs={TIER2_DOCS} />

        <TierBand
          n={3}
          id="tier3"
          eyebrow="Tier Three · During and after"
          name="Live Trip Support and Review"
          desc="Do we know what's happening while they're away? The documents the trip leader and chaperones carry, the school's own view while groups travel, and the report that closes the trip."
        />
        <div className={`container measure ${styles.where}`}>
          <p>
            On a worked trip, this tier appears in the documents the trip
            leader and chaperones carry while the group is away and in the
            report that closes the trip. The Duty Manager Dashboard is the
            school&rsquo;s own view while groups travel.
          </p>
        </div>
        <WorkedTripDocs tripSlug={WORKED_TRIP} docSlugs={TIER3_DOCS} />
        <div className="doc-rows">
          {schoolTier3.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/marketing/hero/trip-approval.jpg"} />
    </>
  );
}
