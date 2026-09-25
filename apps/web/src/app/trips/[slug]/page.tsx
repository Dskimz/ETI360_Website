import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaCard } from "@/components/CtaCard";
import { getTrip, openHref, trips } from "@/content/trips";
import { DocCard } from "@/components/TripDocCard";
import { BRAND_EYEBROW, CLOSING_SENTENCE, WHO_DECIDES } from "@/content/voice";
import styles from "../trips.module.css";

/* A worked trip: the documents one trip receives, decision by decision, each
   in its US Letter and A4 editions (Dan, 2026-09-24), with three captioned
   pages from each. Data: src/content/trips/{slug}.ts. Every PDF link goes through
   ./open/[doc] so the open is logged. */

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
  const pageEdition = trip.paperDefault;
  const pageEditionName = pageEdition === "letter" ? "US Letter" : "A4";
  const single = trip.documents.length === 1 ? trip.documents[0] : null;
  const hasWorkingFile = trip.documents.some((d) => d.slug === "trip-risk-working-file");

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
              document is written for the person who uses it, and every one opens in full.
            </p>
            <p className={`${styles.paper} ui`}>
              ETI360 builds every document to two paper sizes. The US Letter edition (8.5 &times; 11
              inches) is the standard in the United States; the A4 edition (210 &times; 297 mm) is the
              standard in most other countries.
            </p>
          </div>

          {single ? (
            // A trip with one document (the elementary pack): the card spans the
            // row, and what it covers is one list under it, decision by decision.
            <div className={styles.decision}>
              <div className={styles.cards}>
                <DocCard trip={trip} doc={single} solo />
              </div>
              <h3 className={styles.coversHead}>What the pack covers</h3>
              <ul className={styles.covers}>
                {trip.decisions.map((decision) => (
                  <li key={decision.title}>
                    <strong>{decision.title}.</strong> {decision.note}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            trip.decisions.map((decision) => {
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
                      <DocCard key={doc.slug} trip={trip} doc={doc} solo={docs.length === 1} />
                    ))}
                  </div>
                </div>
              );
            })
          )}

          <h2 id="inside">Inside the documents</h2>
          <div className={styles.sectionIntro}>
            <p>
              Three pages from each document, as the school receives them. Select a page to open the{" "}
              {pageEditionName} edition at that page.
            </p>
          </div>
          {trip.documents.map((doc) => (
            <div key={doc.slug} className={styles.inside}>
              <div className={styles.insideHead}>
                <h3>{doc.title}</h3>
                <span className="ui">{doc.reader}</span>
              </div>
              <div className={styles.pages}>
                {doc.insidePages.map((pg) => (
                  <figure key={pg.page}>
                    {doc.editions[pageEdition] ? (
                      <a
                        href={openHref(trip, doc, pageEdition, pg.page)}
                        target="_blank"
                        rel="noopener"
                        aria-label={`Open the ${doc.title} at page ${pg.page} (PDF, opens in a new tab)`}
                      >
                        <Image
                          src={pg.image.src}
                          width={pg.image.width}
                          height={pg.image.height}
                          alt={pg.image.alt}
                          sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 340px"
                        />
                      </a>
                    ) : (
                      <Image
                        src={pg.image.src}
                        width={pg.image.width}
                        height={pg.image.height}
                        alt={pg.image.alt}
                        sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 340px"
                      />
                    )}
                    <figcaption>{pg.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}

          <div className="boundary-callout">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
            {hasWorkingFile ? (
              <p className={styles.boundaryNext}>
                The Trip Risk Working File is written for the school to review, complete, and approve.
                Its ratings are a starting point, its review lines are for the school&rsquo;s own
                controls, and the trip leader makes the live assessment on the day.
              </p>
            ) : single ? (
              <p className={styles.boundaryNext}>
                The risk-assessment working documents in the pack are written for the school to review,
                complete, and approve. The pack records that they were prepared, not that a trip is
                approved.
              </p>
            ) : null}
          </div>

          <p className="ui">
            <Link href="/trips" className="cta-link">
              All trips &rarr;
            </Link>
          </p>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={trip.hero.src} />
    </>
  );
}
