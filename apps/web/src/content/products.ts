import { TIER_NAMES } from "@/content/services";
import type { ProductSlug } from "@/content/trips/types";
import { versionsOf } from "@/content/versions";

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
    // [draft]
    door: "When leadership wants to see the whole travel program at once: the school's own policies, program path by program path, and the documents of every provider it uses, in one report every four years.",
    lead: { version: "harborview-review", doc: "travel-program-review" },
  },
  {
    slug: "trip-package",
    href: "/trip-package",
    name: "Trip Package",
    h1: "The Trip Package",
    tiers: [2, 3],
    // The former SERVICES[1].body, verbatim.
    door: "The documents for one trip, before, during, and after it: the file the school reviews and approves, what families read, what the trip leader and chaperones carry, and the report that closes the trip.",
    lead: { version: "washington-dc", doc: "trip-leader-card" },
  },
  {
    slug: "field-trip-package",
    href: "/field-trip-package",
    name: "Field Trip Package",
    h1: "The Field Trip Package",
    tiers: [2],
    // [draft] (Q1 no: no single day trips)
    door: "Before the school year begins: the lower school's day trips, one page per trip and a calendar for each month.",
    lead: { version: "firholm-elementary", doc: "field-trip-risk-assessment-pack" },
  },
  {
    slug: "conference-travel-package",
    href: "/conference-travel-package",
    name: "Conference Travel Package",
    h1: "The Conference Travel Package",
    tiers: [2],
    // [draft]
    door: "Before the season starts: one guide for the coaches and staff who travel with the school's teams and delegations, with a chapter for every host city in the conference year.",
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
