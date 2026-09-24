import type { Paper, Trip, TripDocument } from "./types";
import washingtonDc from "./washington-dc";
import costaRica from "./costa-rica";
import italy from "./italy";
import shenandoah from "./shenandoah";
import idahoRailTrail from "./idaho-rail-trail";
import whiteMountains from "./white-mountains";
import cascoBay from "./casco-bay";
import elementaryFieldTripsUs from "./elementary-field-trips-us";
import elementaryFieldTripsInternational from "./elementary-field-trips-international";

/* Worked trips: one content file per trip, in the order the library shows
   them. A file that exports null is not built yet and does not appear; only
   real, built trips are listed, never placeholders. */

export * from "./types";

const ordered: (Trip | null)[] = [
  washingtonDc,
  costaRica,
  italy,
  shenandoah,
  idahoRailTrail,
  whiteMountains,
  cascoBay,
  elementaryFieldTripsUs,
  elementaryFieldTripsInternational,
];

/** Live trips, in the order the library shows them. */
export const trips: Trip[] = ordered.filter((t): t is Trip => t !== null);

export function getTrip(slug: string): Trip | undefined {
  return trips.find((t) => t.slug === slug);
}

export function openHref(trip: Trip, doc: TripDocument, size: Paper, page?: number): string {
  const q = new URLSearchParams({ size });
  if (page) q.set("page", String(page));
  return `/trips/${trip.slug}/open/${doc.slug}?${q.toString()}`;
}

/** Whether every document in the trip has the given edition built. */
export function hasEdition(trip: Trip, size: Paper): boolean {
  return trip.documents.every((d) => d.editions[size] !== null);
}
