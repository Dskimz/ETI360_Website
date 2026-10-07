import type { Trip } from "./types";
import washingtonDc from "./washington-dc";
import costaRica from "./costa-rica";
import italy from "./italy";
import shenandoah from "./shenandoah";
import idahoRailTrail from "./idaho-rail-trail";
import whiteMountains from "./white-mountains";
import cascoBay from "./casco-bay";
import queenstown from "./queenstown";

/* Worked trips, the Individual Trip Reports's versions: one content file per trip, in
   the order the Individual Trip Reports page shows them. A file that exports null is not
   built yet and does not appear; only real, built trips are listed, never
   placeholders. Every version of every product, these included, is listed in
   src/content/versions/index.ts. The two elementary packs moved there on
   2026-09-25: they are Field Trip Reports versions, not trips. */

export * from "./types";
export { hasEdition, openHref, PAPER_NAME, thumbEdition } from "@/content/versions/editions";

const ordered: (Trip | null)[] = [
  washingtonDc,
  costaRica,
  italy,
  shenandoah,
  idahoRailTrail, // null until the Idaho rail trail import lands
  whiteMountains,
  cascoBay,
  queenstown, // Harborview's own trip; null until the V3 import lands
];

/** Live trips, in the order the Individual Trip Reports page shows them. */
export const trips: Trip[] = ordered.filter((t): t is Trip => t !== null);

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

const MONTHS: Record<string, string> = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr", May: "May", June: "Jun",
  July: "Jul", August: "Aug", September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};

/** Card dates: "Wednesday, April 14 to Sunday, April 18, 2027" → "Apr 14–18, 2027".
    Falls back to the full string if it does not match the usual shape. */
export function shortDates(trip: Trip): string {
  const s = trip.dates.replace(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), /g, "");
  const m = s.match(/^(\w+) (\d+)(?:, (\d{4}))? to (\w+) (\d+), (\d{4})$/);
  if (!m || !MONTHS[m[1]] || !MONTHS[m[4]]) return trip.dates;
  const [, m1, d1, y1, m2, d2, y2] = m;
  if (y1 && y1 !== y2) return `${MONTHS[m1]} ${d1}, ${y1} – ${MONTHS[m2]} ${d2}, ${y2}`;
  if (m1 === m2) return `${MONTHS[m1]} ${d1}–${d2}, ${y2}`;
  return `${MONTHS[m1]} ${d1} – ${MONTHS[m2]} ${d2}, ${y2}`;
}

/** The trip's own first clause, without the repeated list of readers. */
export function cardSummary(trip: Trip): string {
  const cut = trip.summary.search(/: (the documents for|one page per trip)/);
  // A card line is a label, so it carries no period (2026-09-30).
  return (cut > 0 ? trip.summary.slice(0, cut) : trip.summary).replace(/\.$/, "");
}

/** A one-line card eyebrow: "Culture · Europe" rather than "Language and culture · Europe". */
export function cardEyebrow(trip: Trip): string {
  const kind = trip.tripKind === "Language and culture" ? "Culture" : trip.tripKind;
  return `${kind} · ${trip.region}`;
}
