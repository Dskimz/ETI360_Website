/* Types for the site's versions: one version is one product prepared for one
   fictional school (Dan, 2026-09-25: each product page shows several versions
   of that product). An Individual Trip Reports version is a worked trip with a page of its
   own (/trips/{slug}); every other version is one document shown whole on its
   product page. The registry is src/content/versions/index.ts; the worked trips
   keep their files beside this one, listed in src/content/trips/index.ts.

   Paper (Dan, 2026-09-24): ETI360 builds every document to both US Letter and
   A4. Each document lists both editions; an edition that is not yet built is
   null and the page says it is in preparation. Every PDF opens through
   /open/{version}/{doc}?size=letter|a4 (src/app/open/[version]/[doc]/route.ts),
   so the open is logged, and in production it redirects to DOCS_BASE_URL (S3).

   PDFs are not committed (see scripts/README-import-trip.md): a version
   records where its PDFs live (pdfSource), and `npm run sync:trip-pdfs`
   copies them into public/. */

export type SchoolType = "US" | "International";

export const TRIP_KINDS = ["City", "Service", "Language and culture", "Outdoor"] as const;
export type TripKind = (typeof TRIP_KINDS)[number];

export type Paper = "letter" | "a4";

/** The four products, by their page address (src/content/products.ts). */
export type ProductSlug =
  | "travel-program-review"
  | "trip-package"
  | "field-trip-package"
  | "conference-travel-package";

export type TripImage = { src: string; width: number; height: number; alt: string };

export type InsidePage = { page: number; caption: string; image: TripImage };

/** Site paths of the two editions (/trips/{slug}/letter|a4/… for a worked
    trip, /docs/… for a single-document version; absolute once a file lives
    only in object storage). null = in preparation. */
export type Editions = { letter: string | null; a4: string | null };

/** Where a version's PDFs are built, relative to the V3 repo root
    (the V3 repo, or $ETI360_V3_ROOT); the rebuild repo
    sits beside it, so its builders are reached as ../00 - eti360-rebuild/….
    The sync copies <letterDir>/<file name of editions.letter> and likewise
    for A4, unless the document names its own `source`. */
export type PdfSource = { letterDir: string; a4Dir: string };

/** A document inside any version. */
export type VersionDocument = {
  slug: string;
  title: string;
  /** Who reads and uses it. */
  reader: string;
  /** The decision it supports; matches a decisions title where the version has them. */
  decision: string;
  /** The card text on a worked-trip page. A single-document version has
      none: its block shows the version's summary instead. */
  blurb?: string;
  cover: TripImage;
  editions: Editions;
  insidePages: InsidePage[];
  /** Per-document override of the source file (V3-relative path), for a
      file whose name differs from its published name. */
  source?: { letter?: string; a4?: string };
};

/** A document inside a worked trip: its card always carries a blurb. */
export type TripDocument = VersionDocument & { blurb: string };

export type TripDecision = { title: string; note: string };

/** One version of a product: real documents prepared for one fictional school. */
export type Version = {
  /** Unique across the site: the /open/{slug}/ segment and the page anchor. */
  slug: string;
  product: ProductSlug;
  /** Short name for cards, blocks, metadata and the sitemap. */
  title: string;
  /** Fictional school name. A provider evaluation is prepared for no one
      school (the sample names none), so it carries its fictional provider's
      name here, the name the Case Study shows where it would show a school. */
  school: string;
  schoolType: SchoolType;
  /** Where the version is set, e.g. "Washington, DC" or "Singapore". */
  place: string;
  /** One sentence for the version block, the card and the page description. */
  summary: string;
  /** The edition page thumbnails open by default: "letter" for US schools,
      "a4" for international schools. Both editions are always listed. */
  paperDefault: Paper;
  /** The verbatim notice(s): "<School name> is a fictional school; its
      location is shown for illustrative purposes." */
  disclosure: string;
  documents: VersionDocument[];
  /** The decisions the version's documents support, where the product page lists them. */
  decisions?: TripDecision[];
  /** Absent = not synced by sync:trip-pdfs (the Review sample reaches
      public/docs only through publish_baseline_report.py). */
  pdfSource?: PdfSource;
  /** false: registered (its documents open through /open, the S3 upload
      carries its PDFs, and the Case Study shows it) but not listed on its
      product page. Absent or true: listed. The Line & Landmark provider
      evaluation was Case Study only until 2026-09-29, when Dan approved
      listing it on the Travel Program Review page (`listed: true`). */
  listed?: boolean;
  /** Shown only on the Case Study (Dan, 2026-10-07: "Keep Queenstown on the
      case study only"): left out of the Examples library as well. */
  caseStudyOnly?: true;
};

/** An Individual Trip Reports version: a worked trip with a page of its own. */
export type Trip = Version & {
  product: "trip-package";
  h1: string;
  /** Library filter. */
  tripKind: TripKind;
  /** Plain description, e.g. "Overnight trip, five days". */
  tripType: string;
  region: string;
  dates: string;
  group: string;
  /** One paragraph under the hero. */
  lede: string;
  facts: { label: string; value: string }[];
  hero: TripImage;
  /** Photo credit for the hero, shown under the trip facts when present. */
  heroCredit?: string;
  decisions: TripDecision[];
  documents: TripDocument[];
  pdfSource: PdfSource;
};
