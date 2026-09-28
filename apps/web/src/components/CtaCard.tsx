import Link from "next/link";
import type { ProductSlug } from "@/content/trips/types";
import { CLOSING_SIGNATURE } from "@/content/voice";
import styles from "./ctacard.module.css";

/* The contact band. `image` is accepted for existing callers and ignored:
   the band is flat navy (Website v1 review, 2026-09-25). On a product page,
   `product` carries the product to the form (/contact?product={slug}, spec
   S14); the form accepts only the four product slugs. Dan's sentence says
   "send me a message", so his name and title sit under it (review fix,
   2026-09-27); the band makes no response-time promise. */
export function CtaCard({
  title,
  copy,
  product,
}: {
  title: string;
  copy?: string;
  image?: string;
  product?: ProductSlug;
}) {
  const href = product ? `/contact?product=${product}` : "/contact";
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <h2>{title}</h2>
            {copy ? <p>{copy}</p> : null}
            {copy ? <p className={`${styles.signature} ui`}>{CLOSING_SIGNATURE}</p> : null}
            <Link className={styles.btn} href={href}>
              Get in touch &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
