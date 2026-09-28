import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaCard } from "@/components/CtaCard";
import { DocCard } from "@/components/TripDocCard";
import { TripStrip } from "@/components/TripStrip";
import { getProduct } from "@/content/products";
import { getTrip, PAPER_NAME, trips } from "@/content/trips";
import { BRAND_EYEBROW, CLOSING_SENTENCE, WHO_DECIDES } from "@/content/voice";
import { WORKING_FILE_BOUNDARY } from "../boundary";
import styles from "../trips.module.css";

/* A worked trip: one version of the Trip Package (four-product site spec
   §4.4). The documents one trip receives, decision by decision, each in its
   US Letter and A4 editions (Dan, 2026-09-24). Each document card folds its
   three captioned pages under a closed "Look inside" (spec S8; no
   JavaScript). Every PDF link, cover, edition and inside page alike, goes
   through /open/{version}/{doc} (openHref), so the open is logged and, in
   production, redirects to S3. Data: src/content/trips/{slug}.ts.

   Monday's TRIP emails land here, so the address never moves (spec S2). The
   breadcrumb and the other worked trips place the trip inside its product. */

export const dynamicParams = false;

export function generateStaticParams() {
  return trips.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return {};
  const title = `${trip.title} trip documents`;
  const description = `${trip.summary} ${trip.disclosure}`;
  return {
    title,
    description,
    alternates: { canonical: `/trips/${trip.slug}` },
    openGraph: { title: `${title} — ETI360`, description, type: "website", images: [trip.hero.src] },
  };
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();
  const product = getProduct("trip-package");
  const pageEditionName = PAPER_NAME[trip.paperDefault];
  const hasWorkingFile = trip.documents.some((d) => d.slug === "trip-risk-working-file");
  const others = trips.filter((t) => t.slug !== trip.slug);

  return (
    <>
      <section
        className="article-header trip-hero"
        style={{ ["--hero-bg" as string]: `url('${trip.hero.src}')` } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">{BRAND_EYEBROW}</p>
          <h1>{trip.h1}</h1>
        </div>
        {trip.heroCredit ? <p className="trip-hero-credit ui">{trip.heroCredit}</p> : null}
      </section>

      <section className="article-body">
        <div className={styles.wide}>
          <nav className={`${styles.breadcrumb} ui`} aria-label="Breadcrumb">
            <ol>
              <li>
                <Link href={product.href}>{product.name}</Link>
              </li>
              <li aria-current="page">{trip.title}</li>
            </ol>
          </nav>

          <div className={styles.intro}>
            <div>
              <p className={styles.lede}>{trip.lede}</p>
              <p className={`${styles.disclosure} ui`}>{trip.disclosure}</p>
            </div>
            <dl className={`${styles.facts} ui`} aria-label="Trip facts">
              {trip.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <h2 id="documents">Decision by decision</h2>
          <div className={styles.sectionIntro}>
            <p>
              Each decision the school makes about the trip, and the documents that support it. Every
              document is written for the person who uses it, and every one opens in full.{" "}
              {/* [draft] folded in from the retired "Inside the documents" intro. */}
              Under each document, Look inside shows three of its pages as the school receives them;
              select a page to open the {pageEditionName} edition at that page.
            </p>
            <p className={`${styles.paper} ui`}>
              ETI360 builds every document to two paper sizes. The US Letter edition (8.5 &times; 11
              inches) is the standard in the United States; the A4 edition (210 &times; 297 mm) is the
              standard in most other countries.
            </p>
          </div>

          {trip.decisions.map((decision) => {
            const docs = trip.documents.filter((d) => d.decision === decision.title);
            if (docs.length === 0) return null;
            return (
              <div key={decision.title} className={styles.decision}>
                <div className={styles.decisionHead}>
                  <h3>{decision.title}</h3>
                  <p>{decision.note}</p>
                </div>
                <div className={styles.cards}>
                  {docs.map((doc) => (
                    <DocCard key={doc.slug} version={trip} doc={doc} solo={docs.length === 1} lookInside />
                  ))}
                </div>
              </div>
            );
          })}

          <div className="boundary-callout">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
            {hasWorkingFile ? <p className={styles.boundaryNext}>{WORKING_FILE_BOUNDARY}</p> : null}
          </div>

          {others.length > 0 ? (
            <div className={styles.others}>
              <h2 id="other-trips">Other worked trips</h2>
              <TripStrip trips={others} />
            </div>
          ) : null}
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} product="trip-package" />
    </>
  );
}
