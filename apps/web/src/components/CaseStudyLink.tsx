import Link from "next/link";
import { CASE_STUDY_HREF, CHAPTERS, caseStudyLive, stepHref } from "@/content/case-study";
import type { Product } from "@/content/products";
import styles from "./casestudylink.module.css";

/* One line on a product page that opens its step of the Case Study
   (/case-study/{step}): the product in one fictional school's year. The
   step comes from the case study's content, so a product without a step
   links the overview. */
export function CaseStudyLink({ product }: { product: Product }) {
  if (!caseStudyLive()) return null;
  const chapter = CHAPTERS.find((c) => c.product === product.slug);
  const href = chapter ? stepHref(chapter) : CASE_STUDY_HREF;
  return (
    <p className={`${styles.line} ui`}>
      {/* [draft], tone-reviewed 2026-09-28 with the Case Study page */}
      <Link href={href}>
        Case Study: the {product.name} in one fictional school&rsquo;s year &rarr;
      </Link>
    </p>
  );
}
