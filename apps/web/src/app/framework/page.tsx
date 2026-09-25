import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Link from "next/link";
import { DocRow, TierBand } from "../../components/DocShowcase";
import { schoolTier1, schoolTier2, schoolTier3 } from "../../components/docLibrary";
import { getTrip } from "@/content/trips";
import { CLOSING_SENTENCE } from "@/content/voice";
import styles from "./framework.module.css";

/* Each tier points to where its documents appear (Website v1, 2026-09-25):
   Tier 1 to the sample review below, Tier 2 to the worked trips, Tier 3 to
   the Trip Leader Card, Chaperone Briefing and Post-Trip Feedback Report on a
   worked trip page. No document-count buttons. */

const TIER3_TRIP = "washington-dc";
const TIER3_DOCS = ["trip-leader-card", "chaperone-briefing", "post-trip-feedback-report"];

export const metadata: Metadata = {
  title: "ETI360’s 3-Tier Risk Framework",
  description:
    "The three tiers of the ETI360 framework shown as what a school actually receives — the Organizational Readiness review on a four-year cycle, the Tier 2 Trip Readiness pack, and Tier 3 Live Trip Support and Review — every document openable as a real PDF.",
  alternates: { canonical: "/framework" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360’s 3-Tier Risk Framework",
    description:
      "The three tiers of the ETI360 framework shown as what a school actually receives — every document openable as a real PDF.",
    type: "website",
  },
};

export default function FrameworkPage() {
  const tier3Trip = getTrip(TIER3_TRIP);
  const tier3Docs = tier3Trip
    ? TIER3_DOCS.map((slug) => tier3Trip.documents.find((d) => d.slug === slug)).filter(
        (d): d is NonNullable<typeof d> => Boolean(d),
      )
    : [];

  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">The Framework</p>
          <h1>Three questions every school answers about travel. One framework.</h1>
          <p className="subtitle">
            Each tier answers one of them &mdash; and every answer is a document
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
            The documents on this page are from a worked example for Harborview
            International School. Harborview International School is a fictional
            school; its location is shown for illustrative purposes. For your
            school, every document is produced the same way: in your branding and
            your voice, from your trip&rsquo;s own data.
          </p>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Every four years"
          name="Organizational Readiness"
          desc="Where does our travel governance stand? One documented review of where the school and its providers stand before the year's trips begin — policies, roles, evidence, and standing arrangements across ten operational capability areas."
        />
        <div className={`container measure ${styles.where}`}>
          <p>
            Tier 1 is the Travel Program Review: the school&rsquo;s policies and
            procedures, path by path, once every four years. The sample review
            below opens in full.{" "}
            <a href="#baseline" className="cta-link ui">
              The sample review &rarr;
            </a>
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
          desc="Is this trip ready for approval? A consistent set of documents for leadership review, from the trip overview to the information parents receive."
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
        <div className="doc-rows">
          {schoolTier2.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>

        <TierBand
          n={3}
          id="tier3"
          eyebrow="Tier Three · During and after"
          name="Live Trip Support and Review"
          desc="Do we know what's happening while they're away? The working views for the days away, and the record the trip carries home into next year's planning."
        />
        {tier3Trip && tier3Docs.length > 0 ? (
          <div className={`container measure ${styles.where}`}>
            <p>
              On a worked trip, this tier appears in the documents the trip
              leader and chaperones carry while the group is away and in the
              report that closes the trip. The Duty Manager Dashboard is the
              school&rsquo;s own view while groups travel.
            </p>
            <ul className={`${styles.whereLinks} ui`}>
              {tier3Docs.map((d) => (
                <li key={d.slug}>
                  <Link href={`/trips/${tier3Trip.slug}#${d.slug}`} className="cta-link">
                    {d.title}, {tier3Trip.title} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
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
