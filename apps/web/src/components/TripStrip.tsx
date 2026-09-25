import Image from "next/image";
import Link from "next/link";
import { cardEyebrow, trips as allTrips, type Trip } from "@/content/trips";
import styles from "./tripstrip.module.css";

/* The worked trips as a strip of cards (home, For Schools, For Providers).
   Each card names its fictional school; the disclosure for every school shown
   sits under the strip, once per school, verbatim from the trip file. */

export function TripStrip({ trips = allTrips }: { trips?: Trip[] }) {
  const disclosures = Array.from(new Map(trips.map((t) => [t.school, t.disclosure])).values());
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {trips.map((trip) => (
          <Link key={trip.slug} href={`/trips/${trip.slug}`} className={styles.card}>
            <span className={styles.photo}>
              <Image
                src={trip.hero.src}
                alt={trip.hero.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 270px"
              />
            </span>
            <span className={styles.body}>
              <span className={`${styles.kind} ui`} title={cardEyebrow(trip)}>
                {cardEyebrow(trip)}
              </span>
              <span className={styles.title}>{trip.title}</span>
              <span className={`${styles.school} ui`}>{trip.school}</span>
              <span className={`${styles.go} ui`}>See the documents &rarr;</span>
            </span>
          </Link>
        ))}
        {trips.length % 4 !== 0 ? (
          <Link href="/trips" className={styles.allTile}>
            <span className={`${styles.allTileText} ui`}>All trips &rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className={`${styles.disclosures} ui`}>
        {disclosures.map((d) => (
          <p key={d}>{d}</p>
        ))}
      </div>
    </div>
  );
}
