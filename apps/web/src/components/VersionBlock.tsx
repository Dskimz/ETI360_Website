import Image from "next/image";
import { openAuto, publicNotice, thumbEdition, type Version } from "@/content/versions";
import { InsidePages } from "@/components/TripDocCard";
import styles from "./versionblock.module.css";

/* A single-document version shown whole on its product page (spec S9): the
   Travel Program Review sample, a Field Trip Package pack, a Conference
   Travel Package guide. One anchored block per version (id = the version
   slug, so /{product}#{slug} lands on it):
     - the school and place, the version's title, its one-sentence summary;
     - the cover, opening the default edition (the school's country: US
       Letter for a US school, A4 for an international school);
     - three captioned pages, each opening that edition at that page;
     - both paper editions through /open ("… edition in preparation" when one
       is not built);
     - the school's notice, verbatim.
   No detail page: only Trip Package versions get pages of their own. */

export function VersionBlock({ version }: { version: Version }) {
  return (
    <section id={version.slug} className={styles.block} aria-labelledby={`${version.slug}-title`}>
      <header className={styles.head}>
        <p className={`${styles.eyebrow} ui`}>
          {version.school} &middot; {version.place}
        </p>
        <h3 id={`${version.slug}-title`} className={styles.title}>
          {version.title}
        </h3>
        <p className={styles.summary}>{version.summary}</p>
      </header>

      {version.documents.map((doc) => {
        const edition = thumbEdition(version, doc);
        const cover = (
          <Image
            src={doc.cover.src}
            width={doc.cover.width}
            height={doc.cover.height}
            alt={doc.cover.alt}
            sizes="(max-width: 640px) 60vw, 240px"
          />
        );
        return (
          <div key={doc.slug} className={styles.doc}>
            <div className={styles.coverCol}>
              {edition ? (
                <a
                  className={styles.cover}
                  href={openAuto(version, doc)}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Open the ${doc.title} (PDF, opens in a new tab)`}
                >
                  {cover}
                </a>
              ) : (
                <div className={styles.cover}>{cover}</div>
              )}
              <p className={`${styles.reader} ui`}>{doc.reader}</p>
              <p className={styles.docTitle}>{doc.title}</p>
            </div>
            <InsidePages version={version} doc={doc} edition={edition} className={styles.pages} />
          </div>
        );
      })}

      {publicNotice(version.disclosure) ? (
        <p className={`${styles.notice} ui`}>{publicNotice(version.disclosure)}</p>
      ) : null}
    </section>
  );
}
