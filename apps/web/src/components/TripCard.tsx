import Image from "next/image";
import Link from "next/link";
import { cardEyebrow, cardSummary, hasEdition, shortDates, type Trip } from "@/content/trips";
import type { Version } from "@/content/versions";
import styles from "@/app/trips/trips.module.css";

/* One worked trip as a card (a Individual Trip Reports version): photo, trip kind ·
   region, title, school · dates, the one-line summary, the paper line, and
   "See the documents". Links to /trips/{slug}. Lifted from the trips
   library; wrap the cards in an element with styles.wide and styles.library. */

/** Which paper editions a version carries: "US Letter · A4", or
    "… edition in preparation" for a paper not yet built for every document. */
export function PaperLine({ version }: { version: Version }) {
  const letter = hasEdition(version, "letter");
  const a4 = hasEdition(version, "a4");
  return (
    <p className={`${styles.paperLine} ui`}>
      {letter ? "US Letter" : <span className={styles.pending}>US Letter edition in preparation</span>}
      {" · "}
      {a4 ? "A4" : <span className={styles.pending}>A4 edition in preparation</span>}
    </p>
  );
}

export function TripCard({ trip, headingLevel = 3 }: { trip: Trip; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link href={`/trips/${trip.slug}`} className={styles.tripCard}>
      <span className={styles.tripCardPhoto}>
        <Image src={trip.hero.src} alt={trip.hero.alt} fill sizes="(max-width: 960px) 100vw, 530px" />
      </span>
      <div className={styles.tripCardBody}>
        <p className={`${styles.reader} ui`}>{cardEyebrow(trip)}</p>
        <Heading className={styles.tripCardTitle}>{trip.title}</Heading>
        <p className={`${styles.tripMeta} ui`}>
          {trip.school} &middot; {shortDates(trip)}
        </p>
        <p>{cardSummary(trip)}</p>
        <span className={`${styles.go} ui`}>See the documents &rarr;</span>
      </div>
    </Link>
  );
}
