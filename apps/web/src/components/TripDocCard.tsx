import Image from "next/image";
import {
  openAuto,
  openHref,
  PAPER_NAME,
  thumbEdition,
  type Paper,
  type Version,
  type VersionDocument,
} from "@/content/versions";
import styles from "@/app/trips/trips.module.css";

/* The document card: thumbnail, reader, title, blurb, and both paper editions
   (the school's own paper first; a missing edition reads "… edition in
   preparation"). Works for any version of any product, so a document looks
   and is named the same everywhere. Every link opens through
   /open/{version}/{doc}. Wrap in an element with styles.wide for the type
   scale.

   lookInside (the worked-trip pages, spec S8): a closed native <details>
   under the card holds the document's three captioned pages, each opening
   the default edition at that page. No JavaScript. insideOpen starts it
   open (the Case Study, on a step with one document); id replaces the
   card's anchor where two cards on one page show documents with the same
   slug (the Case Study's two field-trip packs); className adds a class to
   the card (the Case Study's one open card in a grid of several). */

export function Editions({ version, doc }: { version: Version; doc: VersionDocument }) {
  // The school's own paper first: US Letter for a US school, A4 for an
  // international school (spec §5.2).
  const sizes: Paper[] = version.paperDefault === "a4" ? ["a4", "letter"] : ["letter", "a4"];
  return (
    <p className={`${styles.editions} ui`}>
      {sizes.map((size) =>
        doc.editions[size] ? (
          <a
            key={size}
            href={openHref(version, doc, size)}
            target="_blank"
            rel="noopener"
            aria-label={`Open the ${doc.title}, ${PAPER_NAME[size]} edition (PDF, opens in a new tab)`}
          >
            {PAPER_NAME[size]}
          </a>
        ) : (
          <span key={size} className={styles.pending}>
            {PAPER_NAME[size]} edition in preparation
          </span>
        ),
      )}
    </p>
  );
}

/** The link for a document: the fixed paper when the page asks for one and
    that edition is built (the Case Study shows Harborview in A4 only, Dan,
    2026-10-07), else the open route's choice by the visitor's country. */
function docHref(version: Version, doc: VersionDocument, paper?: Paper, page?: number): string {
  return paper && doc.editions[paper] ? openHref(version, doc, paper, page) : openAuto(version, doc, page);
}

/** A document's captioned inside pages, each opening `edition` at that page
    (or a plain image when no edition is built). */
export function InsidePages({
  version,
  doc,
  edition,
  className,
  paper,
}: {
  version: Version;
  doc: VersionDocument;
  edition: Paper | null;
  className?: string;
  paper?: Paper;
}) {
  return (
    <div className={className ?? styles.pages}>
      {doc.insidePages.map((pg) => {
        const img = (
          <Image
            src={pg.image.src}
            width={pg.image.width}
            height={pg.image.height}
            alt={pg.image.alt}
            sizes="(max-width: 640px) 80vw, (max-width: 960px) 45vw, 340px"
          />
        );
        return (
          <figure key={pg.page}>
            {edition ? (
              <a
                href={docHref(version, doc, paper, pg.page)}
                target="_blank"
                rel="noopener"
                aria-label={`Open the ${doc.title} at page ${pg.page} (PDF, opens in a new tab)`}
              >
                {img}
              </a>
            ) : (
              img
            )}
          </figure>
        );
      })}
    </div>
  );
}

export function DocCard({
  version,
  doc,
  solo = false,
  lookInside = false,
  insideOpen = false,
  id,
  className,
  paper,
}: {
  version: Version;
  doc: VersionDocument;
  solo?: boolean;
  lookInside?: boolean;
  insideOpen?: boolean;
  id?: string;
  className?: string;
  paper?: Paper;
}) {
  const edition = thumbEdition(version, doc);
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
    <article
      id={id ?? doc.slug}
      className={[styles.card, solo ? styles.cardSolo : null, className].filter(Boolean).join(" ")}
    >
      {edition ? (
        <a
          className={styles.cardThumb}
          href={docHref(version, doc, paper)}
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
        <h4>
          {edition ? (
            <a href={docHref(version, doc, paper)} target="_blank" rel="noopener" className={styles.docLink}>
              {doc.title}
            </a>
          ) : (
            doc.title
          )}
        </h4>
      </div>
      {lookInside && doc.insidePages.length > 0 ? (
        <details className={styles.lookInside} open={insideOpen || undefined}>
          <summary className="ui">Look inside</summary>
          <InsidePages version={version} doc={doc} edition={edition} className={styles.lookInsidePages} paper={paper} />
        </details>
      ) : null}
    </article>
  );
}
