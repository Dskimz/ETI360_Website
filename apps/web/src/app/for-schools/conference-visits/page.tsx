import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.conferenceVisits;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 prepares one Athletics and Activities Trips Guide for a school's traveling coaches and staff, in the school's own name and colors: every host city in the conference year, with arrival by air and rail, hotels within a walk of the host, the emergency departments, and a contacts page, prepared once for the year.",
  alternates: { canonical: "/for-schools/conference-visits" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "conference-visits",
  question: "When your teams travel to the other schools in your conference, what do your coaches carry?",
  heroLine:
    "The Athletics and Activities Trips Guide goes to the coaches, advisors, and administrators who travel with a school's teams: the conference year, then a chapter for every host city — how the party arrives, where it stays within a walk of the host, which emergency department, and one page of numbers to photograph — prepared once for the year, issued in the school's own name and colors.",
  editorial: [
    "An athletics director sends teams away far more often than the school hosts. In a six-school conference the year runs to eleven away movements against two hosting duties: three parallel departures on a Wednesday in October, the same again in January, March, and April, and a Model United Nations delegation in November. Each coach who travels carries the same questions into a new city — which emergency department, where the team sleeps, how the party moves from the airport or the station to the host school, and who answers the phone at midnight.",
    "ETI360 prepares one guide for the year, in the school's name and the school's colors, for the staff who travel: a contents page with every start page, the conference calendar, the pages that hold for every trip — entry, health cover, the phones — and then a chapter per host city in the same seven-page order, each chapter set in the host school's colors with the host's mark on the page. Every distance is measured from the host school's own point: the airport and the main station by road, three hotels on foot, the emergency department of record and the separate children's department where the country runs one, a numbered eating list around the first hotel, ten years of climate records for the conference windows, and a contacts page with blanks for the numbers only the school holds. Each trip's own fixture guide cites the chapter instead of repeating it.",
  ],
  spreadTitle: "One chapter of the Wexcombe edition: the hotels and the medical page for Paris",
  plates: [
    {
      src: "/marketing/solutions/conference-visits-hotels.png",
      width: 1920,
      height: 2716,
      alt: "The hotels page of the Paris chapter: three hotels within a walk of the host school with their front-desk numbers, walk to the host, drive to the emergency department, and drive from the airport and the station; a map of the host school and the three hotels with walking routes; the nearest pharmacies",
      label: "The hotels",
      note: "Three hotels within a walk of the host, each with its walk, its drive to the emergency department, and its drive from the airport and the station.",
    },
    {
      src: "/marketing/solutions/conference-visits-medical.png",
      width: 1920,
      height: 2716,
      alt: "The medical page of the Paris chapter: the adult emergency department at Hôpital Cochin, the children's emergency department at Necker, and the American Hospital of Paris, each with measured taxi times from the host and the first hotel; a map of the host school, the first hotel, and the emergency department; what to expect at an emergency department in France",
      label: "Medical",
      note: "The adult and the children's emergency departments with measured times, a map from the host and the hotel, and four lines on what to expect at the desk.",
    },
  ],
  disclosure:
    "Shown for the Wexcombe International School edition, 2026–27. Wexcombe and the other Meridian Schools Conference members are sample schools, not real ones — their names, marks, and colors were created for this showcase — and each sits at a public landmark in its city. The hotels, hospitals, pharmacies, stations, and eating places are real, and every distance comes from Mapbox Directions.",
  pdfHref: "/docs/athletics-activities-trips-guide-wexcombe.pdf",
  claims: [
    {
      lead: "Measured from the host's own point",
      body: "Three hotels within a walk of each host school, each with its walk to the host, its drive to the emergency department, and its drive from the airport and from the station: in Paris, the Hôtel Trianon Rive Gauche is 0.7 km on foot from the Jardin du Luxembourg and 2.3 km from Hôpital Cochin. Times come from Mapbox walking and driving directions.",
    },
    {
      lead: "The medical page knows the country",
      body: "Where a city runs a separate children's emergency department — Paris, Berlin, Madrid, Rome, Geneva — the chapter carries both, and the out-of-hours rule the country uses: SAMU 15, 116 117, the Dutch huisartsenpost. Four lines say what to bring, how triage runs, what the GHIC covers at the desk, and who speaks English.",
    },
    {
      lead: "Arrival by air and by rail",
      body: "Half the legs in a European conference are trains. Each chapter opens with one plate carrying both the airport and the main station to the host school, with the road figure for each and the rail link the party actually uses: RER B from Charles de Gaulle stops at the Luxembourg gate.",
    },
    {
      lead: "One document for the year",
      body: "A contents page with every start page, then six chapters in one fixed order — the medical page is always the fourth page of a chapter — so a coach who has used the Paris chapter reads the Madrid chapter without learning it. The schedule, the squad, and the rooming list stay with each trip's own fixture guide; the city does not change between visits, so it is written once.",
    },
    {
      lead: "The school's document, not ours",
      body: "The guide carries the school's own name, colors, and mark on every page, and each host city's chapter takes the host school's colors and mark; the cover carries all six. ETI360 appears once, as the preparer. What the coaches hold looks like something their own school issued, because it is.",
    },
  ],
  boundary:
    "The guide organizes public information; the school chooses the hotel, holds the medical summaries and the insurance, and completes every field marked for confirmation.",
  stripLine: "The Athletics and Activities Trips Guide sits within Tier 2 Trip Readiness, beside the field trip register and the fixture guide for each trip.",
  ctaTitle: "See your conference year as the guide your coaches would carry.",
  ctaCopy:
    "Would you be open to a 20-minute conversation about the cities your teams travel to this year, and what your coaching staff would receive before the first departure?",
};

export default function ConferenceVisitsPage() {
  return <SolutionEvidence data={data} />;
}
