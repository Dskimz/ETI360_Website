import { A4_COVER, A4_PAGE, docPaths } from "@/content/trips/helpers";
import type { Version } from "@/content/trips/types";

/* The Athletics and Activities Trips Guide 2026–27, Wexcombe International
   School edition (Meridian Schools Conference), the Conference Travel
   Package's version. The document keeps the name its PDF carries.

   PDFs: public/docs/athletics-activities-trips-guide-wexcombe-{a4,letter}.pdf,
   49 pages each, the same page on the same page number on both papers. They
   are the web copies (images re-encoded, about 10 MB each), never edited by
   hand. Their source is the rebuild repo's builder,
   dev/league-guide/wexcombe/build_visits_guide.py, run with
   `--web-dir dev/league-guide/wexcombe/out/web` (review fix, 2026-09-27: the
   web copies used to be written straight into a checkout's public/docs,
   where no sync could restore them); `npm run sync:trip-pdfs` copies them
   from there like every other version's PDFs. The canonical print files
   stay in the builder's out/ folder (README there). Built 2026-09-25 with
   the fictional-school notice on both covers, the conference line, and the
   emergency departments listed by drive time from the host school (V3
   ADR-025). The older single-paper copy,
   athletics-activities-trips-guide-wexcombe.pdf (Sep 14, no notice), is
   superseded and redirected.

   Images: import-trip.py wexcombe-meridian --root versions, from the A4
   edition (the default: Wexcombe is an international school), 2026-09-27,
   pages cover, 7, 8 and 9.

   Copy marked [draft] passed the tone review on 2026-09-27 (Stage D) and
   awaits Dan's preview. */

const WEB_OUT = "../00 - eti360-rebuild/dev/league-guide/wexcombe/out/web";
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
    "The guide gives the staff who travel with the school's teams and delegations the conference calendar and a chapter for every host city.",
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
      cover: cover(DOC, TITLE),
      editions: editions(),
      // [draft] captions
      insidePages: inside(DOC, TITLE, [
        // Review fix 2026-09-27: page 7, not page 4. Pages 2 to 5 carry the
        // edition's "Version 0.1 draft" running header (Dan's call), and
        // page 4 names a per-trip fixture guide that is not one of the four
        // products. The year page returns when the label comes off.
        [7, "Arriving in Paris: Charles de Gaulle by RER B to the garden gate and the Eurostar to Gare du Nord, the road times to the host school and the hotel, and how to move a team with its gear."],
        [8, "The hotels in Paris: three within a walk of the host school, each with its walk, its drive to the emergency department, and its drive from the airport and the station."],
        [9, "The medical page for Paris: the adult and the children's emergency departments and a private hospital, listed by drive time from the host school, and what to expect at an emergency department in France. The school confirms which one the group uses."],
      ]),
    },
  ],
  // Relative to the V3 root, as sync:trip-pdfs expects; the rebuild repo
  // sits beside V3. The builder's web copies carry the published names.
  pdfSource: {
    letterDir: WEB_OUT,
    a4Dir: WEB_OUT,
  },
};

export default wexcombeMeridian;
