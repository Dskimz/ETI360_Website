import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Annual Elementary Field Trip Risk Assessment Pack 2026–27 (Harborview
   International School, Singapore), a Field Trip Package version: one pack
   for the school year, one page per trip, a calendar for each month. Formerly
   the /trips/elementary worked trip; moved here on 2026-09-25 (redirects in
   next.config.ts send /trips/elementary/open/* to /open/harborview-elementary/*).

   Source: the eti360-rebuild repo, not V3. Built by
   dev/field-trip-register/build_register.py --clean --web, which renders both
   papers from one HTML (V3 ADR-024) into out/ (gitignored there, so rebuild
   before a sync on a fresh machine). `--publish` also writes the site copies,
   public/docs/field-trip-risk-assessment-pack-harborview-2026-27-{letter,a4}.pdf.
   The paths below are relative to the V3 root, as sync:trip-pdfs expects;
   the rebuild repo sits beside V3 (../00 - eti360-rebuild).

   Images: import-trip.py harborview-elementary --root versions, from the A4
   clean-web edition of 2026-09-27 20:36 (re-cut the same evening), pages
   cover, 5, 6 and 8. */

const REBUILD_OUT = "../00 - eti360-rebuild/dev/field-trip-register/out";
const DOC = "field-trip-risk-assessment-pack";
const TITLE = "Annual Elementary Field Trip Risk Assessment Pack";

const { cover, inside, editions } = docPaths({
  slug: "harborview-elementary",
  letter: "field-trip-risk-assessment-pack-harborview-2026-27-letter.pdf",
  a4: "field-trip-risk-assessment-pack-harborview-2026-27-a4.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const harborviewElementary: Version = {
  slug: "harborview-elementary",
  product: "field-trip-package",
  title: "Elementary Field Trips, Singapore",
  school: "Harborview International School",
  schoolType: "International",
  place: "Singapore",
  // [draft] second sentence (review fix, 2026-09-27): what Harborview issues
  // beside the pack (its page 6), which the Firholm pack does not.
  summary:
    "The pack covers a school year of one-day elementary field trips in Singapore, with one page per trip and a calendar for each month. Each trip's itinerary, parent letter, risk-assessment working documents, and weather note are issued separately from the pack.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Elementary leaders",
      decision: "Planning the year",
      cover: cover(DOC, TITLE),
      editions: editions(),
      insidePages: inside(DOC, TITLE, [
        [5, "The year at a glance: each grade's trips by date and unit of inquiry, with the class size, the supervision ratio, and the two semesters."],
        // [draft] updated for the 2026-09-25 edition
        [6, "What every trip carries: the itinerary, the parent letter, the risk-assessment working documents for the school to complete and approve, and the weather note from the 15-year record, then how the emergency departments on each trip page are listed."],
        // [draft] updated for the 2026-09-25 edition
        [8, "A Grade 1 trip page: Mount Faber Park and Henderson Waves, with the learning purpose, the schedule, notes for families, the route from school, and the emergency departments with the drive time from each stop."],
      ]),
      source: {
        letter: `${REBUILD_OUT}/harborview-field-trip-risk-assessment-pack-2026-27-clean-web-letter.pdf`,
        a4: `${REBUILD_OUT}/harborview-field-trip-risk-assessment-pack-2026-27-clean-web-a4.pdf`,
      },
    },
  ],
  pdfSource: {
    letterDir: REBUILD_OUT,
    a4Dir: REBUILD_OUT,
  },
};

export default harborviewElementary;
