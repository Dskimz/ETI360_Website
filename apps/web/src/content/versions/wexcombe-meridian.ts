import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Athletics and Activities Trips Guide 2026–27, Wexcombe International
   School edition (Meridian Schools Conference), the Conference Travel
   Package's version. The document keeps the name its PDF carries.

   PDFs: public/docs/athletics-activities-trips-guide-wexcombe-{a4,letter}.pdf,
   49 pages each, the same page on the same page number on both papers. They
   are the web copies (images re-encoded, about 10 MB each) that the rebuild
   repo's dev/league-guide/wexcombe/build_visits_guide.py writes with
   `--web-dir <site>/apps/web/public/docs`, never edited by hand. The canonical
   print files stay in that builder's out/ folder (README there). So there is
   no pdfSource and sync:trip-pdfs skips this version, as for the Review
   sample. Built 2026-09-25 with the fictional-school notice on both covers,
   the conference line, and the emergency departments listed by drive time
   from the host school (V3 ADR-025). The older single-paper copy,
   athletics-activities-trips-guide-wexcombe.pdf (Sep 14, no notice), is
   superseded.

   Images: import-trip.py wexcombe-meridian --root versions, from the A4
   edition (the default: Wexcombe is an international school), 2026-09-27,
   pages cover, 4, 8 and 9.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const DOC = "athletics-activities-trips-guide";
const TITLE = "Athletics and Activities Trips Guide";

const { cover, inside, editions } = docPaths({
  slug: "wexcombe-meridian",
  letter: "athletics-activities-trips-guide-wexcombe-letter.pdf",
  a4: "athletics-activities-trips-guide-wexcombe-a4.pdf",
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
  // The guide's own two cover lines, verbatim. Tone review 2026-09-27: the
  // Sep 14 third sentence (the real places, and the directions vendor) came
  // off, so the notice matches the other schools' and the PDF's.
  disclosure:
    "Wexcombe International School is a fictional school; its location is shown for illustrative purposes. The Meridian Schools Conference, its other member schools and the Geneva host school are fictional too.",
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
        [9, "The medical page for Paris: the adult and the children's emergency departments and a private hospital, listed by drive time from the host school, and what to expect at an emergency department in France. The school confirms which one the group uses."],
      ]),
    },
  ],
};

export default wexcombeMeridian;
