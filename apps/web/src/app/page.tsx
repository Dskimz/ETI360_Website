import type { Metadata } from "next";
import { ProductDoors } from "@/components/ProductDoors";
import { WhoDoesTheWork } from "@/components/WhoDoesTheWork";
import { liveProducts, productCount, siteDescription, type Product } from "@/content/products";
import type { ProductSlug } from "@/content/trips/types";
import {
  BRAND_EYEBROW,
  BRAND_LINE,
  WHAT_WE_DO_LINE,
  WHO_DECIDES,
} from "@/content/voice";
import styles from "./home.module.css";

/* Home (four-product site, spec §4.1 and S19; Dan, 2026-09-25: "each page
   should be one of the 4 products"). The page only routes: the two brand
   lines above the fold, one door per live product, who does the work and who
   decides, then Dan's closing sentence, the only call to action. Its only
   links in the body are the product pages and the contact band. */

// The h1 is BRAND_LINE split for its line break: "Risk intelligence" /
// "for school trips." Never retyped (voice.ts).
const BREAK_AT = BRAND_LINE.indexOf(" for ");
const BRAND_HEAD = BRAND_LINE.slice(0, BREAK_AT);
const BRAND_TAIL = BRAND_LINE.slice(BREAK_AT + 1);

// Only live products get a door (S18), so the count and the heading are
// built from the live list: with all four live, the heading reads "The whole
// program, one trip, a year of day trips, or a conference year." [draft]
const PHRASE: Record<ProductSlug, string> = {
  "travel-program-review": "the whole program",
  "trip-package": "one trip",
  "field-trip-package": "a year of day trips",
  "conference-travel-package": "a conference year",
};
function doorsHeading(products: Product[]): string {
  const text = listOf(products.map((p) => PHRASE[p.slug]));
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}.`;
}

function listOf(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} or ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, or ${items[items.length - 1]}`;
}

const LIVE = liveProducts();

// The two brand lines and the live products (products.ts), also the root
// layout's fallback description.
const DESCRIPTION = siteDescription();

export const metadata: Metadata = {
  title: `ETI360 — ${BRAND_EYEBROW}`,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: `ETI360 — ${BRAND_EYEBROW}`,
    description: DESCRIPTION,
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <section
        className="hero hero-compact"
        style={{ ["--hero-bg" as string]: "url('/trips/washington-dc/hero-capitol.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <h1>
            {BRAND_HEAD}
            <br />
            <em>{BRAND_TAIL}</em>
          </h1>
          <p className={`hero-line ${styles.heroLine}`}>{WHAT_WE_DO_LINE}</p>
        </div>
      </section>

      {LIVE.length > 0 ? (
        <section id="products" className={styles.doorsBand}>
          <div className="container">
            <p className="label ui">{productCount(LIVE)}</p>
            <h2 className="section-heading rule-gold">{doorsHeading(LIVE)}</h2>
            <ProductDoors products={LIVE} />
          </div>
        </section>
      ) : null}

      <section className={styles.band}>
        <div className="container measure">
          <WhoDoesTheWork />
          <div className="boundary-callout" id="who-decides">
            <h3>Who decides</h3>
            <p>{WHO_DECIDES}</p>
          </div>
        </div>
      </section>

    </>
  );
}
