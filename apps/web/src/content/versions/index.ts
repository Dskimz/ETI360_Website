import type { ProductSlug, Version } from "@/content/trips/types";
import { trips } from "@/content/trips";
import harborviewReview from "./harborview-review";
import lineAndLandmarkEvaluation from "./line-and-landmark-evaluation";
import firholmElementary from "./firholm-elementary";
import harborviewElementary from "./harborview-elementary";
import wexcombeMeridian from "./wexcombe-meridian";

/* Every version of every product, in display order (four-product site spec
   §5, Dan 2026-09-25: each product page shows several versions of that
   product). A version is one product prepared for one fictional school:
     - Travel Program Review: the Harborview sample, and the Line &
       Landmark provider evaluation (listed 2026-09-29; the Case Study
       shows it too);
     - Trip Package: the worked trips (src/content/trips/, each with a page
       at /trips/{slug});
     - Field Trip Package: the Firholm and Harborview annual packs;
     - Conference Travel Package: the Wexcombe guide.
   A file that exports null is not built and never appears; only real
   versions are listed, never placeholders. Coming: the Idaho rail trail
   (src/content/trips/idaho-rail-trail.ts, null until its import lands) and
   Japan (Harborview, not built).

   Version slugs are unique across the site: each is the /open/{slug}/
   segment and, for a single-document version, the anchor on its product
   page. */

export { hasEdition, openAuto, openHref, PAPER_NAME, publicNotice, thumbEdition } from "./editions";
import { publicNotice } from "./editions";
export type { Paper, ProductSlug, Version, VersionDocument } from "@/content/trips/types";

const ordered: (Version | null)[] = [
  harborviewReview,
  lineAndLandmarkEvaluation,
  ...trips,
  firholmElementary,
  harborviewElementary,
  wexcombeMeridian,
];

export const versions: Version[] = ordered.filter((v): v is Version => v !== null);

const seen = new Set<string>();
for (const v of versions) {
  if (seen.has(v.slug)) throw new Error(`Duplicate version slug: ${v.slug}`);
  seen.add(v.slug);
}

export function getVersion(slug: string): Version | undefined {
  return versions.find((v) => v.slug === slug);
}

/** A product's versions, in display order: the ones its page lists (a
    version with `listed: false` still opens through /open). */
export function versionsOf(product: ProductSlug): Version[] {
  return versions.filter((v) => v.product === product && v.listed !== false);
}

/** Each fictional school's notice once, verbatim, in the order the versions
    appear: for a product page's metadata and its notes under the versions
    (ADR-023: the disclosure on the page and in the page's metadata). */
export function notices(list: Version[]): string {
  return Array.from(new Set(list.map((v) => publicNotice(v.disclosure)).filter((n): n is string => !!n))).join(" ");
}
