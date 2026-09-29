import Link from "next/link";
import { CASE_STUDY_HREF, caseStudyLive, stepForProduct, stepHref } from "@/content/case-study";
import type { Product } from "@/content/products";
import styles from "./casestudylink.module.css";

/* One line on a product page that opens its step of the Case Study
   (/case-study/{product}, one step per product since 2026-09-28): the
   product in one fictional school's year. A product without a step links
   the overview. Nothing while the publishing hold keeps the case study off
   a production deploy. */
export function CaseStudyLink({ product }: { product: Product }) {
  if (!caseStudyLive()) return null;
  const step = stepForProduct(product.slug);
  const href = step ? stepHref(step) : CASE_STUDY_HREF;
  return (
    <p className={`${styles.line} ui`}>
      {/* [draft], tone-reviewed 2026-09-28 with the Case Study page */}
      <Link href={href}>{`Case Study: the ${product.name} in one school’s year →`}</Link>
    </p>
  );
}
