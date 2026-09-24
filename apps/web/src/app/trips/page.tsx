import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaCard } from "@/components/CtaCard";
import { trips } from "@/content/trips";
import { BRAND_EYEBROW, CLOSING_SENTENCE } from "@/content/voice";
import styles from "./trips.module.css";

/* The library of worked trips. Only built trips appear (src/content/trips.ts);
   no placeholders. */

export const metadata: Metadata = {
  title: "Trips",
  description:
    "Worked trips from ETI360: each page shows one trip and the documents prepared for it, decision by decision, every document open in full. The schools shown are fictional.",
  alternates: { canonical: "/trips" },
  openGraph: {
    title: "Trips — ETI360",
    description:
      "Worked trips from ETI360: each page shows one trip and the documents prepared for it, decision by decision, every document open in full.",
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

export default function TripsPage() {
  return (
    <>
      <section className="article-header">
        <div className="hero-inner">
          <p className="label label-light ui">{BRAND_EYEBROW}</p>
          <h1>Worked trips, document by document.</h1>
          <p className="subtitle">
            Each page shows one trip and the documents prepared for it, decision by decision, with
            every document open in full.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className={styles.wide}>
          <div className={styles.library}>
            {trips.map((trip) => (
              <Link key={trip.slug} href={`/trips/${trip.slug}`} className={styles.tripCard}>
                <Image
                  src={trip.hero.src}
                  width={trip.hero.width}
                  height={trip.hero.height}
                  alt={trip.hero.alt}
                  sizes="(max-width: 960px) 100vw, 530px"
                />
                <div className={styles.tripCardBody}>
                  <p className={`${styles.reader} ui`}>
                    {trip.schoolType === "US" ? "US school" : "International school"} &middot; {trip.tripType}
                  </p>
                  <h2>{trip.title}</h2>
                  <p className={`${styles.tripMeta} ui`}>
                    {trip.school} &middot; {trip.dates} &middot; {trip.group}
                  </p>
                  <p>{trip.summary}</p>
                  <p className={`${styles.disclosure} ui`}>{trip.disclosure}</p>
                  <span className={`${styles.go} ui`}>See the documents &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} />
    </>
  );
}
