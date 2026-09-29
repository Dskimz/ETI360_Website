import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Line & Landmark provider evaluation, sample edition: the provider
   section of a Travel Program Review, for ETI360's fictional reference trip
   provider, Line & Landmark Cycle Travel (display name Line & Landmark;
   renamed 2026-09-29 from Dan's brand brief). ETI360 evaluates the
   provider's documents and shows what they cover; it never certifies,
   approves, ranks or recommends a provider (CLAUDE.md, 2026-09-25).

   Registered 2026-09-29 for the Case Study's Travel Program Review step,
   and listed the same day on the Travel Program Review page (Dan's
   approval, 2026-09-29), after the Harborview sample, introduced there by
   the page's provider line. Its PDFs open through /open and go to S3 with
   the rest.

   PDFs: public/docs/provider-evaluation-line-and-landmark-{a4,letter}.pdf,
   15 pages each, the same page on the same page number on both papers.
   Source: the rebuild repo's vault copies (LNL-Provider-Evaluation-2026-09,
   re-issued 2026-09-29 under the new name), restored by `npm run
   sync:trip-pdfs`. Checked before they were added: no XMP, no local path
   or machine name in the Info dictionary, links or streams, and the Title
   is the document's own ("Travel Program Review · Provider Evaluation ·
   Line & Landmark Cycle Travel · Sample edition"), so nothing was
   rewritten.

   Images: import-trip.py line-and-landmark-evaluation --root versions, from
   the A4 edition (the default, as for Harborview), pages cover, 2 (the
   summary), 6 (Partner Vetting) and 11 (Incident Response). Re-rendered
   2026-09-29 from the revised evaluation (the Line & Landmark voice
   rewrite): only page 6 changed (one re-quoted proposal line), and its
   caption still holds.

   The name, summary, decision and captions are [draft], tone-reviewed
   2026-09-29. The provider's notice is the brand brief's, verbatim. */

const SOURCE = "../00 - eti360-rebuild/content/vault/Operations/Governance";
const DOC = "provider-evaluation";
const TITLE = "Provider Evaluation: Line & Landmark Cycle Travel";

const { cover, inside, editions } = docPaths({
  slug: "line-and-landmark-evaluation",
  letter: "provider-evaluation-line-and-landmark-letter.pdf",
  a4: "provider-evaluation-line-and-landmark-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const lineAndLandmarkEvaluation: Version = {
  slug: "line-and-landmark-evaluation",
  product: "travel-program-review",
  // [draft]
  title: "Provider Evaluation, sample edition",
  // A provider evaluation names no school: the provider stands in its place
  // (src/content/trips/types.ts).
  school: "Line & Landmark Cycle Travel",
  schoolType: "International",
  place: "Loire Valley, France",
  // [draft]
  summary:
    "A sample provider evaluation for a fictional cycling-tour provider: its three documents read against the ten areas of the ETI360 Operational Capability Framework, each area with its own state and each line cited to its document and section.",
  paperDefault: "a4",
  disclosure: "Line & Landmark is a fictional trip provider created by ETI360 for demonstration purposes.",
  listed: true,
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "School leadership",
      // [draft]
      decision: "Reviewing a provider’s documents",
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft] captions
      insidePages: inside(DOC, TITLE, [
        [2, "The summary: what a provider evaluation is, the state of each of the ten areas with the page that holds its evidence, and the three documents read, with the one that governs."],
        [6, "Partner Vetting: how the hotels, bike rental, coaches and guides a tour relies on are chosen or checked, which the governing document does not describe; the proposal’s and the catalog’s lines, shown but not counted; and the three open items."],
        [11, "Incident Response: the first response, the crash and missing-student steps and the emergency numbers, each quoted with its section and page, then the five open items, among them an incident reporting form not yet written."],
      ]),
      source: {
        letter: `${SOURCE}/LNL-Provider-Evaluation-2026-09-Letter.pdf`,
        a4: `${SOURCE}/LNL-Provider-Evaluation-2026-09-A4.pdf`,
      },
    },
  ],
  // Relative to the V3 root, as sync:trip-pdfs expects; the rebuild repo
  // sits beside V3. Each edition names its vault file in `source`.
  pdfSource: {
    letterDir: SOURCE,
    a4Dir: SOURCE,
  },
};

export default lineAndLandmarkEvaluation;
