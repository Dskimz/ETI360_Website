/* Types for the worked trips (/trips and /trips/{slug}). One content file per
   trip lives beside this one; src/content/trips/index.ts lists them in order.

   Paper (Dan, 2026-09-24): ETI360 builds every document to both US Letter and
   A4. Each document lists both editions; an edition that is not yet built is
   null and the page says it is in preparation. Every PDF opens through
   /trips/{slug}/open/{doc}?size=letter|a4 so the open is logged.

   PDFs are not committed (see scripts/README-import-trip.md): each trip
   records where its PDFs live in the V3 repo (pdfSource), and
   `npm run sync:trip-pdfs` copies them into public/trips/{slug}/letter|a4/. */

export type SchoolType = "US" | "International";

export const TRIP_KINDS = ["Day trips", "City", "Service", "Language and culture", "Outdoor"] as const;
export type TripKind = (typeof TRIP_KINDS)[number];

export type Paper = "letter" | "a4";

export type TripImage = { src: string; width: number; height: number; alt: string };

export type InsidePage = { page: number; caption: string; image: TripImage };

/** Public URLs of the two editions (under /trips/{slug}/letter|a4/, or absolute
    once PDFs move to object storage). null = in preparation. */
export type Editions = { letter: string | null; a4: string | null };

/** Where a trip's PDFs live in the V3 repo, relative to its root
    (/Users/danskimin/00 - ETI360 - V3, or $ETI360_V3_ROOT). The sync script
    copies <letterDir>/<file name of editions.letter> and likewise for A4. */
export type PdfSource = { letterDir: string; a4Dir: string };

export type TripDocument = {
  slug: string;
  title: string;
  /** Who reads and uses it. */
  reader: string;
  /** The decision it supports; matches a Trip.decisions title. */
  decision: string;
  blurb: string;
  cover: TripImage;
  editions: Editions;
  insidePages: InsidePage[];
  /** Per-document override of the V3 source file (V3-relative path), for a
      file whose name differs from its published name. */
  source?: { letter?: string; a4?: string };
};

export type TripDecision = { title: string; note: string };

export type Trip = {
  slug: string;
  /** Short name for cards, metadata and the sitemap. */
  title: string;
  h1: string;
  /** Fictional school name. */
  school: string;
  schoolType: SchoolType;
  /** Library filter. */
  tripKind: TripKind;
  /** Plain description, e.g. "Overnight trip, five days". */
  tripType: string;
  region: string;
  dates: string;
  group: string;
  /** The edition page thumbnails open by default: "letter" for US schools,
      "a4" for international schools. Both editions are always listed. */
  paperDefault: Paper;
  /** One paragraph under the hero. */
  lede: string;
  /** One sentence for the library card and the page description. */
  summary: string;
  facts: { label: string; value: string }[];
  hero: TripImage;
  /** Photo credit for the hero, shown under the trip facts when present. */
  heroCredit?: string;
  /** "<School name> is a fictional school; its location is shown for illustrative purposes." */
  disclosure: string;
  decisions: TripDecision[];
  documents: TripDocument[];
  pdfSource: PdfSource;
};
