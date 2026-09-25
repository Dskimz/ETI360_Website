import Image from "next/image";
import { openHref, type Trip, type TripDocument } from "@/content/trips";
import styles from "@/app/trips/trips.module.css";

/* The document card from the worked trip pages: thumbnail, reader, title,
   blurb, and both paper editions ("US Letter" and "A4"; a missing edition
   reads "… edition in preparation"). Shared by /trips/{slug} and /framework
   so a document looks and is named the same everywhere. Wrap in an element
   with styles.wide for the type scale. */

export function Editions({ trip, doc }: { trip: Trip; doc: TripDocument }) {
  return (
    <p className={`${styles.editions} ui`}>
      {doc.editions.letter ? (
        <a
          href={openHref(trip, doc, "letter")}
          target="_blank"
          rel="noopener"
          aria-label={`Open the ${doc.title}, US Letter edition (PDF, opens in a new tab)`}
        >
          US Letter
        </a>
      ) : (
        <span className={styles.pending}>US Letter edition in preparation</span>
      )}
      {doc.editions.a4 ? (
        <a
          href={openHref(trip, doc, "a4")}
          target="_blank"
          rel="noopener"
          aria-label={`Open the ${doc.title}, A4 edition (PDF, opens in a new tab)`}
        >
          A4
        </a>
      ) : (
        <span className={styles.pending}>A4 edition in preparation</span>
      )}
    </p>
  );
}

export function DocCard({ trip, doc, solo = false }: { trip: Trip; doc: TripDocument; solo?: boolean }) {
  const other = trip.paperDefault === "letter" ? "a4" : "letter";
  const edition = doc.editions[trip.paperDefault] ? trip.paperDefault : doc.editions[other] ? other : null;
  const thumb = (
    <Image
      src={doc.cover.src}
      width={doc.cover.width}
      height={doc.cover.height}
      alt={doc.cover.alt}
      sizes={solo ? "(max-width: 640px) 96px, 200px" : "(max-width: 640px) 96px, 150px"}
    />
  );
  return (
    <article id={doc.slug} className={solo ? `${styles.card} ${styles.cardSolo}` : styles.card}>
      {edition ? (
        <a
          className={styles.cardThumb}
          href={openHref(trip, doc, edition)}
          target="_blank"
          rel="noopener"
          aria-label={`Open the ${doc.title} (PDF, opens in a new tab)`}
        >
          {thumb}
        </a>
      ) : (
        <div className={styles.cardThumb}>{thumb}</div>
      )}
      <div className={styles.cardBody}>
        <p className={`${styles.reader} ui`}>{doc.reader}</p>
        <h4>{doc.title}</h4>
        <p className={styles.blurb}>{doc.blurb}</p>
        <Editions trip={trip} doc={doc} />
      </div>
    </article>
  );
}
