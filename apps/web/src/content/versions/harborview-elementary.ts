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
   the rebuild repo sits beside V3 (/Users/danskimin/00 - eti360-rebuild).

   Images: import-trip.py harborview-elementary --root versions, from the A4
   clean-web edition (2026-09-25), pages cover, 5, 6 and 8. */

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
  summary:
    "A school year of one-day elementary field trips in Singapore: one page per trip and a calendar for each month, for the school's elementary leaders, trip coordinators, teachers, and families.",
  paperDefault: "a4",
  disclosure:
    "Harborview International School is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Planning the year",
      note: "The year at a glance by grade, and a calendar for each month with the school's breaks and holidays marked and every trip dated to a school day.",
    },
    {
      title: "Approving each day trip",
      note: "Each trip's page and its risk-assessment working documents, one per activity group, for the school to review, complete, and approve. The pack records that the working documents were prepared, not that a trip is approved.",
    },
    {
      title: "Briefing teachers and chaperones",
      note: "The learning purpose the teachers wrote, the schedule timed to the bus, the supervision ratio, the two venues with their addresses, and the trip coordinator.",
    },
    {
      title: "Telling families",
      note: "Notes for families on every trip page, and a parent information letter, in the school's own name, in each trip's documentation set.",
    },
    {
      title: "Getting a child to care",
      // [draft] updated for the 2026-09-25 edition, which lists three departments per trip
      note: "Singapore's two children's emergency departments and the general department with the shortest drive from each stop, with the drive times and addresses; the school confirms which one the group uses. For the Pulau Ubin trip, the route is the island ferry, then the road.",
    },
  ],
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Elementary leaders",
      decision: "Planning the year",
      blurb:
        "The elementary school's single list of the year's one-day trips: the year at a glance by grade, a calendar for each month, and one page per trip with its learning purpose, schedule, notes for families, venues, the route from school, and the emergency department with the drive time. A trip that moves keeps its page.",
      cover: cover(DOC, TITLE),
      editions: editions(),
      insidePages: inside(DOC, TITLE, [
        [5, "The year at a glance: each grade's trips by date and unit of inquiry, with the class size, the supervision ratio, and the two semesters."],
        // [draft] updated for the 2026-09-25 edition
        [6, "What every trip carries: the itinerary, the parent letter, the risk-assessment working documents for the school to complete and approve, and the weather note from the 15-year record, then how the emergency departments on each trip page are chosen."],
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
