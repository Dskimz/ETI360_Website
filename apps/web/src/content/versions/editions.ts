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
