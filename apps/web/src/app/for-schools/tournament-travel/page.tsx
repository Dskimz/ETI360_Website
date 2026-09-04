import type { Metadata } from "next";
import { SolutionEvidence, type SolutionEvidenceData } from "@/components/SolutionEvidence";
import { reportCatalog } from "@/content/solutions";

const report = reportCatalog.tournamentTravel;

export const metadata: Metadata = {
  title: `${report.name} Problem and Solution`,
  description:
    "How ETI360 prepares a host school's guide for the coaching staff of a visiting team: the week, the hospitals, the homestays, the hotel, and where to eat, issued under the host's name.",
  alternates: { canonical: "/for-schools/tournament-travel" },
  openGraph: { type: "website", images: ["/marketing/og-default.png"] },
};

const data: SolutionEvidenceData = {
  slug: "tournament-travel",
  question: "What do a visiting team's coaches receive before they travel to your tournament?",
  heroLine:
    "The Tournament Travel Guide goes to the visiting coaching staff under the host school's name: the welcome, the week, the hospitals, the homestays, the hotel, and where to eat, prepared before the team boards.",
  editorial: [
    "An invitational puts an athletics director on both sides of a trip at once. The visiting coaches land on the Wednesday afternoon with ten players and a team manager, and every question they carry has its answer on the host's ground: which emergency department, whose phone is on all night, where the players sleep, how the party moves from the airport to the court and back to the hotel.",
    "ETI360 prepares that guide once, under the host school's name, from the host's own campus record and the tournament week: the welcome and the week at a glance, an emergency page written to be photographed, both hospitals with measured taxi times, the arrival transfers, the homestay roster and the coaches' hotel on the same footing, and two eating lists with real places numbered on a map. The fields only the visiting school can supply are marked, so nothing is left blank without saying so.",
  ],
  spreadTitle: "One Harborview Invitational: the welcome and the medical page",
  plates: [
    {
      src: "/Claude/Questions/assets/tournament-travel-welcome.png",
      width: 1920,
      height: 2716,
      alt: "The welcome page of a visiting coaches' guide: a Singapore skyline hero, the host athletics director's welcome, where the host, the visiting team, players and coaches are placed, five day cards for the tournament week, and the guide's index",
      label: "Welcome and the week",
      note: "The host's welcome, the five days as day cards, where each party stays, and the guide's index.",
    },
    {
      src: "/Claude/Questions/assets/tournament-travel-medical.png",
      width: 1920,
      height: 2716,
      alt: "The medical and hospitals page: two 24-hour emergency departments with distances and taxi times from the campus and the hotel, what to expect at a Singapore emergency department, clinics and pharmacies, and a map from the sports complex to National University Hospital",
      label: "Medical and hospitals",
      note: "Two 24-hour emergency departments, one for the campus by day and one for the hotel by night, with taxi times and a map from the sports complex.",
    },
  ],
  disclosure:
    "Shown for a Harborview Invitational demonstration week. Harborview International School and Ohori International School are fictitious by design; the hospitals, hotel, and eating places are real Singapore locations.",
  pdfHref: "/docs/tournament-travel-guide.pdf",
  claims: [
    {
      lead: "Measured, not estimated",
      body: "Each emergency department carries its distance and taxi time from the campus and from the hotel: National University Hospital at 2.4 km, about six minutes from the sports complex. Times come from Mapbox driving directions.",
    },
    {
      lead: "Issued under the host's name",
      body: "The welcome is signed by the host athletics director; the campus, the contacts, the visitor passes, and the homestay program are the host's own, so the visiting coaches read one school's voice throughout.",
    },
    {
      lead: "Homestays and the hotel on the same footing",
      body: "The players' week with host families has its house rules, a nightly check-in, and a roster line per player; the coaches' hotel has its check-in, its pharmacies, and its own nearest emergency department.",
    },
    {
      lead: "Real places, historical climate",
      body: "Twelve eating places around the hotel and eleven around the campus, each with its walk time and its number on a map plate. The weather page reads ten years of Singapore climate records for November, not a forecast.",
    },
  ],
  boundary:
    "The guide organizes information; approval, safeguarding decisions, and every field marked for confirmation stay with the host and the visiting school.",
  stripLine: "The Tournament Travel Guide sits within Tier 2 Trip Risk Review, beside the expedition file and the field trip register.",
  ctaTitle: "See your next invitational as the guide its visiting coaches would receive.",
  ctaCopy:
    "Would you be open to a 20-minute conversation about a tournament you are hosting this year, and what its visiting teams would receive before they travel?",
};

export default function TournamentTravelPage() {
  return <SolutionEvidence data={data} />;
}
