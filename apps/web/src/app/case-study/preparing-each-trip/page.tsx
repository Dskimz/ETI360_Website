import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDY_ON_HOLD, caseStudyLive } from "@/content/case-study";
import { EACH_TRIP as P } from "@/content/case-study-points";
import { PointView } from "../_parts/PointView";

/* Case Study point: Preparing each trip. Copy: src/content/case-study-points.ts. A static
   route, so it wins over /case-study/[step]. */

export function generateMetadata(): Metadata {
  if (!caseStudyLive()) return {};
  const title = `${P.label} — Case Study`;
  return {
    title,
    description: P.description,
    alternates: { canonical: `/case-study/${P.id}` },
    robots: CASE_STUDY_ON_HOLD ? { index: false, follow: false } : undefined,
    openGraph: { title: `${title} — ETI360`, description: P.description, type: "website", images: ["/marketing/og-default.png"] },
  };
}

export default function PreparingEachTripPage() {
  if (!caseStudyLive()) notFound();
  return <PointView p={P} />;
}
