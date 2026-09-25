import { tierNames, type Product } from "@/content/products";
import { BRAND_EYEBROW } from "@/content/voice";
import styles from "./productheader.module.css";

/* The header of a product page: the brand eyebrow, the product's h1, its
   tier label(s) in the canonical names (the site sells the tiers; Dan,
   2026-09-10), and a one-line lede. Same article-header markup as every
   other page. */

export function ProductHeader({ product, lede }: { product: Product; lede?: string }) {
  return (
    <section className="article-header">
      <div className="hero-inner">
        <p className="label label-light ui">{BRAND_EYEBROW}</p>
        <h1>{product.h1}</h1>
        <p className={`${styles.tiers} ui`}>
          {tierNames(product).map((name, i) => (
            <span key={name}>
              {i > 0 ? <span aria-hidden="true"> &middot; </span> : null}
              {name}
            </span>
          ))}
        </p>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
      </div>
    </section>
  );
}
