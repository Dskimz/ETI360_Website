import queenstown from "@/content/trips/queenstown";
import type { DocGroup } from "@/content/case-study";

/* Which trip set the Case Study shows (Dan, 2026-10-07: "Build Harborview's
   own trip set for the covers"). Harborview's own Queenstown set
   (src/content/trips/queenstown.ts) once its V3 import lands; until then,
   Horizon Ridge's Italy set under its earlier document names, with the
   other school's note. Every Case Study reference to a trip document goes
   through here, by its Sep 29 name, so the switch is one flag in
   queenstown.ts. */

export const HARBORVIEW_TRIP_LIVE = queenstown !== null;

/** Sep 29 name (Queenstown slug) → the Italy slug with the earlier name. */
const ITALY_SLUG: Record<string, string> = {
  "off-campus-travel-report": "school-trip-record",
  "risk-assessment-report": "trip-risk-working-file",
  "student-and-parent-trip-report": "family-trip-brief",
  "trip-leaders-brief": "trip-leader-card",
  "educational-travel-fieldbook": "student-journey-guide",
  "post-trip-report": "post-trip-feedback-report",
};

export type TripDocSlug = keyof typeof ITALY_SLUG;

/** One trip document as a { version, doc } reference. */
export function tripDoc(slug: TripDocSlug): { version: string; doc: string } {
  return HARBORVIEW_TRIP_LIVE ? { version: "queenstown", doc: slug } : { version: "italy", doc: ITALY_SLUG[slug] };
}

/** A Case Study document group for the given trip documents. Italy keeps the
    other school's note and the readers of the base group. */
export function tripGroup(base: DocGroup, slugs: TripDocSlug[], open?: TripDocSlug): DocGroup {
  if (HARBORVIEW_TRIP_LIVE) {
    return { version: "queenstown", docs: slugs, open, note: undefined };
  }
  return {
    ...base,
    version: "italy",
    docs: slugs.map((s) => ITALY_SLUG[s]),
    open: open ? ITALY_SLUG[open] : undefined,
    note: undefined,
  };
}

/** A note that applies only while the Italy set stands in: its earlier names. */
export function whileItaly(text: string): string | undefined {
  return HARBORVIEW_TRIP_LIVE ? undefined : text;
}
