import { TIER_NAMES } from "@/content/services";
import type { ProductSlug } from "@/content/trips/types";
import { versionsOf } from "@/content/versions";
import { BRAND_LINE, WHAT_WE_DO_LINE } from "@/content/voice";

/* The four products (Dan, 2026-09-25: "each page should be one of the 4
   products and then we show off multiple versions of the product from that
   page"). Schools only. Each product's page takes its name as its address;
   its versions come from the registry (src/content/versions/). The nav, the
   footer, the home page doors and the sitemap list only live products: a
   product is live once it has at least one version (spec S18).

   Replaced SERVICES in services.ts; TIER_NAMES, DECISIONS and PAPER_NOTE
   stay there. */

export type Tier = 1 | 2 | 3;

export type Product = {
  slug: ProductSlug;
  href: string;
  /** The full product name: nav, footer, doors. Never a short form. */
  name: string;
  h1: string;
  tiers: Tier[];
  /** The door sentence on the home page. */
  door: string;
  /** The version and document whose cover the door shows. */
  lead: { version: string; doc: string };
};

export const PRODUCTS: Product[] = [
  {
    slug: "travel-program-review",
    href: "/travel-program-review",
    name: "Travel Program Review",
    h1: "The Travel Program Review",
    tiers: [1],
    // Rewritten with verbs (Dan, 2026-09-30: no verbless list sentences). [draft]
    door: "The Travel Program Review reads the school's travel policies program by program, and the documents of every provider the school uses. The school repeats it every four years.",
    lead: { version: "harborview-review", doc: "travel-program-review" },
  },
  {
    slug: "trip-package",
    href: "/trip-package",
    name: "Trip Package",
    h1: "The Trip Package",
    tiers: [2, 3],
    // Rewritten with verbs (Dan, 2026-09-30). [draft]
    door: "The Trip Package gives each person on one trip the document they use, from the school's approval to the report after the group comes home.",
    lead: { version: "washington-dc", doc: "trip-leader-card" },
  },
  {
    slug: "field-trip-package",
    href: "/field-trip-package",
    name: "Field Trip Package",
    h1: "The Field Trip Package",
    tiers: [2],
    // Rewritten with verbs (Dan, 2026-09-30). [draft] (Q1 no: no single day trips)
    door: "The Field Trip Package covers the lower school's day trips for the whole school year, with one page for each trip and a calendar for each month.",
    lead: { version: "firholm-elementary", doc: "field-trip-risk-assessment-pack" },
  },
  {
    slug: "conference-travel-package",
    href: "/conference-travel-package",
    name: "Conference Travel Package",
    h1: "The Conference Travel Package",
    tiers: [2],
    // Rewritten with verbs (Dan, 2026-09-30). [draft]
    door: "The Conference Travel Package gives the coaches and staff who travel with the school's teams one guide for the season, with a chapter for each host city.",
    lead: { version: "wexcombe-meridian", doc: "athletics-activities-trips-guide" },
  },
];

export function getProduct(slug: ProductSlug): Product {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product: ${slug}`);
  return p;
}

/** A product is live once it has at least one version (spec S18). */
export function isLive(p: Product): boolean {
  return versionsOf(p.slug).length > 0;
}

export function liveProducts(): Product[] {
  return PRODUCTS.filter(isLive);
}

/** The tier label(s) for a product, in the canonical names. */
export function tierNames(p: Product): string[] {
  return p.tiers.map((t) => TIER_NAMES[t]);
}

/** The product slugs the contact form accepts (?product=). */
export const PRODUCT_SLUGS: ProductSlug[] = PRODUCTS.map((p) => p.slug);

const COUNT = ["", "One product", "Two products", "Three products", "Four products"];

/** "One product" … "Four products", for the live list. */
export function productCount(products: Product[] = liveProducts()): string {
  return COUNT[products.length] ?? `${products.length} products`;
}

/** "the Travel Program Review, the Trip Package, …, and the Conference Travel Package". */
export function productNames(products: Product[] = liveProducts()): string {
  const names = products.map((p) => `the ${p.name}`);
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** The site's description: the home page's, and the fallback for every page
    that sets none (the root layout). The two brand lines, then the live
    products by name. Never the company statement (spec S5: it names
    providers, and the site is for schools only). [draft] */
export function siteDescription(): string {
  const live = liveProducts();
  if (live.length === 0) return `${BRAND_LINE} ${WHAT_WE_DO_LINE}`;
  return `${BRAND_LINE} ${WHAT_WE_DO_LINE} ETI360 prepares ${productCount(live).toLowerCase()} for schools: ${productNames(live)}.`;
}
