import { getTrip } from "@/content/trips";
import { DocCard } from "@/components/TripDocCard";
import styles from "@/app/trips/trips.module.css";

/* A tier's documents shown from one worked trip, with the same cards, names
   and editions as the trip page, and the trip's fictional-school notice. */

export function WorkedTripDocs({ tripSlug, docSlugs }: { tripSlug: string; docSlugs: string[] }) {
  const trip = getTrip(tripSlug);
  if (!trip) return null;
  const docs = docSlugs
    .map((slug) => trip.documents.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
  if (docs.length === 0) return null;
  return (
    <div className={`${styles.wide} ${styles.workedDocs}`}>
      <div className={styles.cards}>
        {docs.map((doc) => (
          <DocCard key={doc.slug} version={trip} doc={doc} solo={docs.length === 1} />
        ))}
      </div>
      <p className={`${styles.paper} ${styles.workedNote} ui`}>
        From the <a href={`/trips/${trip.slug}`}>{trip.title} worked trip</a>. {trip.disclosure}
      </p>
    </div>
  );
}
