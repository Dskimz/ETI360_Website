import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Travel Program Review sample (Harborview International School,
   Singapore), the Travel Program Review's version.

   PDFs: public/docs/travel-program-review-harborview-{a4,letter}.pdf, written
   only by the rebuild repo's dev/iso31031-rubric/publish_baseline_report.py
   (CLAUDE.md: one canonical PDF, never hand-copied), so there is no
   pdfSource and sync:trip-pdfs skips this version. Re-rendered 2026-09-25
   13:49 with "Sample edition" and the verbatim notice.

   Images: import-trip.py harborview-review --root versions, from the A4
   edition (the default: Harborview is an international school), pages cover,
   2, 5 and 18. The provider-section sample is a version of its own
   (line-and-landmark-evaluation.ts), listed after this one on the Travel
   Program Review page since 2026-09-29.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const DOC = "travel-program-review";
const TITLE = "Travel Program Review";

const { cover, inside, editions } = docPaths({
  slug: "harborview-review",
  letter: "travel-program-review-harborview-letter.pdf",
  a4: "travel-program-review-harborview-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const harborviewReview: Version = {
  slug: "harborview-review",
  product: "travel-program-review",
  title: "Travel Program Review, sample edition",
  school: "Harborview International School",
  schoolType: "International",
  place: "Singapore",
  // [draft]
  summary:
    "A sample review for an international school: its travel program read path by path, with every finding traced to the document, section, and page it comes from.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "School leadership",
      decision: "Reviewing the whole program",
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft] captions
      insidePages: inside(DOC, TITLE, [
        [2, "The summary: the international path read on its own and every program path together, then the state of each of the ten areas."],
        [5, "One area across the paths: Governance and Policy, the state of each program path, and each evidence line with the document, section, and page it comes from."],
        [18, "The documents read, each with its reference and issue date, and the documents referenced but not provided for review."],
      ]),
    },
  ],
};

export default harborviewReview;
