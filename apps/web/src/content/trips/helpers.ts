import type { Editions, InsidePage, TripImage } from "./types";

/* Path helpers shared by the version content files. Image names follow
   scripts/import-trip.py: {doc}-cover.jpg and {doc}-p{N}.jpg.
     - Worked trips (tripPaths): images under /trips/{slug}/; PDFs are
       /trips/{slug}/letter|a4/{filePrefix}-{doc}.pdf.
     - Single-document versions (docPaths): images under /versions/{slug}/
       (import-trip.py --root versions); PDFs are /docs/{file}.pdf, where the
       builders' publish steps write them. */

type Size = { width: number; height: number };

/** US Letter page images as rendered for Washington, DC. */
export const LETTER_COVER: Size = { width: 935, height: 1210 };
export const LETTER_PAGE: Size = { width: 1105, height: 1430 };
/** A4 page images at the same widths, as scripts/import-trip.py renders them. */
export const A4_COVER: Size = { width: 935, height: 1324 };
export const A4_PAGE: Size = { width: 1105, height: 1564 };

export function tripPaths(opts: {
  slug: string;
  /** PDF file-name prefix, e.g. "hrsc-ot01-washington-dc". */
  filePrefix: string;
  coverSize?: Size;
  pageSize?: Size;
}) {
  const base = `/trips/${opts.slug}`;
  const coverSize = opts.coverSize ?? LETTER_COVER;
  const pageSize = opts.pageSize ?? LETTER_PAGE;

  return {
    base,
    cover(doc: string, title: string): TripImage {
      return { src: `${base}/${doc}-cover.jpg`, ...coverSize, alt: `First page of the ${title}` };
    },
    inside(doc: string, title: string, pages: [number, string][]): InsidePage[] {
      return pages.map(([page, caption]) => ({
        page,
        caption,
        image: { src: `${base}/${doc}-p${page}.jpg`, ...pageSize, alt: `${title}, page ${page}` },
      }));
    },
    /** Both editions; pass { a4: false } (or letter) for an edition still in preparation. */
    editions(doc: string, built: { letter?: boolean; a4?: boolean } = {}): Editions {
      const file = `${opts.filePrefix}-${doc}.pdf`;
      return {
        letter: built.letter === false ? null : `${base}/letter/${file}`,
        a4: built.a4 === false ? null : `${base}/a4/${file}`,
      };
    },
  };
}

/** Paths for a single-document version (the Review sample, a Field Trip
    Package pack, a Conference Travel Package guide). `letter` and `a4` are
    the published PDF file names under /docs/, or null for an edition still
    in preparation. */
export function docPaths(opts: {
  slug: string;
  letter: string | null;
  a4: string | null;
  coverSize?: Size;
  pageSize?: Size;
}) {
  const base = `/versions/${opts.slug}`;
  const coverSize = opts.coverSize ?? LETTER_COVER;
  const pageSize = opts.pageSize ?? LETTER_PAGE;

  return {
    base,
    cover(doc: string, title: string): TripImage {
      return { src: `${base}/${doc}-cover.jpg`, ...coverSize, alt: `First page of the ${title}` };
    },
    inside(doc: string, title: string, pages: [number, string][]): InsidePage[] {
      return pages.map(([page, caption]) => ({
        page,
        caption,
        image: { src: `${base}/${doc}-p${page}.jpg`, ...pageSize, alt: `${title}, page ${page}` },
      }));
    },
    editions(): Editions {
      return {
        letter: opts.letter ? `/docs/${opts.letter}` : null,
        a4: opts.a4 ? `/docs/${opts.a4}` : null,
      };
    },
  };
}
