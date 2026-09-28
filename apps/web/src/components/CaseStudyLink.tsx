import Link from "next/link";
import { CHAPTERS, caseStudyLive } from "@/content/case-study";
import type { Product } from "@/content/products";
import styles from "./casestudylink.module.css";

/* One line on a product page that opens its chapter of the Case Study
   (/case-study#{chapter}): the product in one fictional school's year.
   The chapter anchor comes from the case study's content, so a product
   without a chapter links the page's top. */
export function CaseStudyLink({ product }: { product: Product }) {
  if (!caseStudyLive()) return null;
  const chapter = CHAPTERS.find((c) => c.product === product.slug);
  const href = chapter ? `/case-study#${chapter.id}` : "/case-study";
  return (
    <p className={`${styles.line} ui`}>
      {/* [draft], tone-reviewed 2026-09-28 with the Case Study page */}
      <Link href={href}>
        Case Study: the {product.name} in one fictional school&rsquo;s year &rarr;
      </Link>
    </p>
  );
}
