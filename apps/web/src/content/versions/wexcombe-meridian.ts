import { docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Athletics and Activities Trips Guide 2026–27, Wexcombe International
   School edition (Meridian Schools Conference), the Conference Travel
   Package's version. The document keeps the name its PDF carries.

   PDF: public/docs/athletics-activities-trips-guide-wexcombe.pdf (A4, 49
   pages, 9.6 MB), a compressed web copy of the rebuild repo's
   dev/league-guide/wexcombe/out/Meridian-Visits-Guide-2026-27-Wexcombe.pdf
   (17.7 MB). No pdfSource yet: record which file is canonical when the
   fictional-school notice is added to the cover and back page (the gate in
   the four-product site spec, §5.3), then point the sync at it. US Letter is
   not built.

   Images: import-trip.py wexcombe-meridian --root versions, from the A4
   edition, pages cover, 4, 8 and 9.

   Copy marked [draft] goes through the tone review before Dan's preview. */

const DOC = "athletics-activities-trips-guide";
const TITLE = "Athletics and Activities Trips Guide";

const A4_COVER = { width: 935, height: 1322 };
const A4_PAGE = { width: 1105, height: 1563 };

const { cover, inside, editions } = docPaths({
  slug: "wexcombe-meridian",
  letter: null,
  a4: "athletics-activities-trips-guide-wexcombe.pdf",
  coverSize: A4_COVER,
  pageSize: A4_PAGE,
});

const wexcombeMeridian: Version = {
  slug: "wexcombe-meridian",
  product: "conference-travel-package",
  title: "Meridian Schools Conference, 2026–27",
  school: "Wexcombe International School",
  schoolType: "International",
  place: "London",
  // [draft]
  summary:
    "One guide for the year for the staff who travel with the school's teams and delegations: the conference calendar, then a chapter for every host city.",
  paperDefault: "a4",
  disclosure:
    "Shown for the Wexcombe International School edition, 2026–27. Wexcombe International School is a fictional school; its location is shown for illustrative purposes. The other Meridian Schools Conference members are fictional too: their names, marks, and colors were created for this showcase, and each sits at a public landmark in its city. The hotels, hospitals, pharmacies, stations, and eating places are real, and every distance comes from Mapbox Directions.",
  documents: [
    {
      slug: DOC,
      title: TITLE,
      reader: "Coaches and traveling staff",
      decision: "Traveling with teams and delegations",
      // [draft]
      blurb:
        "One guide for the year for the coaches, advisors, and administrators who travel with the school's teams: the conference calendar, then a chapter for every host city with arrival by air and by rail, three hotels within a walk of the host, the emergency departments, and one page of numbers to photograph, issued in the school's own name and colors.",
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft] captions
      insidePages: inside(DOC, TITLE, [
        [4, "The year: every conference weekend, Wednesday out and Sunday home, with each event, its host school, and the city."],
        [8, "The hotels in Paris: three within a walk of the host school, each with its walk, its drive to the emergency department, and its drive from the airport and the station."],
        [9, "The medical page for Paris: the adult and the children's emergency departments with measured times from the host and the first hotel, and what to expect at an emergency department in France."],
      ]),
    },
  ],
};

export default wexcombeMeridian;
