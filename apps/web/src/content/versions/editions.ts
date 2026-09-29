import type { Paper, Version, VersionDocument } from "@/content/trips/types";

/* Links and edition checks shared by every version. Kept apart from the
   registry (./index.ts) so src/content/trips/index.ts can re-export them
   without importing the registry that imports it. */

/** The logged open link for one document: /open/{version}/{doc}?size=…[&page=N]
    (src/app/open/[version]/[doc]/route.ts). No page links a .pdf directly. */
export function openHref(
  version: Pick<Version, "slug">,
  doc: Pick<VersionDocument, "slug">,
  size: Paper,
  page?: number,
): string {
  const q = new URLSearchParams({ size });
  if (page) q.set("page", String(page));
  return `/open/${version.slug}/${doc.slug}?${q.toString()}`;
}

/** The one link a page shows for a document (Dan, 2026-09-29: "I don't want
    to have two links"): /open/{version}/{doc}[?page=N] with no size, so the
    open route picks the edition from the visitor's country (US Letter in
    North America and the Philippines, A4 elsewhere). */
export function openAuto(
  version: Pick<Version, "slug">,
  doc: Pick<VersionDocument, "slug">,
  page?: number,
): string {
  return page ? `/open/${version.slug}/${doc.slug}?page=${page}` : `/open/${version.slug}/${doc.slug}`;
}

/** A version's notice as the site shows it (Dan, 2026-09-29: the
    fictional-school lines are "just clutter"): school notices are dropped;
    a fictional provider's notice stays (Line & Landmark, required on every
    outward sample). */
export function publicNotice(disclosure: string): string | null {
  return /is a fictional school/.test(disclosure) ? null : disclosure;
}

/** Whether every document in the version has the given edition built. */
export function hasEdition(version: Pick<Version, "documents">, size: Paper): boolean {
  return version.documents.every((d) => d.editions[size] !== null);
}

/** The edition a thumbnail opens: the version's default paper if that
    edition exists, else the other one, else none. */
export function thumbEdition(version: Pick<Version, "paperDefault">, doc: VersionDocument): Paper | null {
  const other: Paper = version.paperDefault === "letter" ? "a4" : "letter";
  if (doc.editions[version.paperDefault]) return version.paperDefault;
  return doc.editions[other] ? other : null;
}

export const PAPER_NAME: Record<Paper, string> = { letter: "US Letter", a4: "A4" };
