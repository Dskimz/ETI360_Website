import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Italy (Horizon Ridge School of Cleveland, trip HRC-CLE-OT03), ported from the
   V3 prototype (customers/hrs-cleveland/website/build_italy_page.py) and checked
   against the issued PDFs and the trip record
   (customers/hrs-cleveland/trips/italy-2027/italy-trip-record.md). Letter PDFs:
   customers/hrs-cleveland/outputs/pdf/hrsc-ot03-italy-*.pdf; A4 PDFs:
   outputs/pdf/a4/ (V3 ADR-024). Both editions have the same page count, so the
   page numbers below hold for either. The bound trip pack is not published.
   Hero: trips/italy-2027/assets/photo-cover.jpg (the Florence Duomo, from the
   trip's Canva image set). Restore the PDFs locally with `npm run sync:trip-pdfs`. */

const { base, cover, inside, editions } = tripPaths({
  slug: "italy",
  filePrefix: "hrsc-ot03-italy",
});

const italy: Trip = {
  slug: "italy",
  product: "trip-package",
  title: "Italy",
  h1: "The documents for an eleven-day trip to Italy.",
  school: "Horizon Ridge School of Cleveland",
  schoolType: "US",
  tripKind: "Language and culture",
  tripType: "Overnight trip, eleven days",
  region: "Europe",
  place: "Europe",
  dates: "Saturday, June 12 to Tuesday, June 22, 2027",
  group: "20 students from Italian II and III and four chaperones",
  paperDefault: "letter",
  lede:
    "Horizon Ridge School of Cleveland is taking twenty tenth and eleventh graders from Italian II and III to Rome, Florence, and Venice for eleven days in June, with three mornings at a language school in Florence at the center of the trip. ETI360 brought together the school's itinerary, the operator's, hotels', and language school's arrangements, and the school's own procedures, checked passports and entry against the current rules for U.S. citizens, checked group sizes, timed entry, and dress rules against each venue's own guidance, timed the coach transfers and the walks between places, and found the emergency department for each place, with the travel time. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "An eleven-day language and culture trip to Rome, Florence, and Venice: the documents for the office, the trip leader and chaperones, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "Italy Language and Culture Journey, Saturday, June 12 to Tuesday, June 22, 2027" },
    {
      label: "Group",
      value:
        "20 students in tenth and eleventh grade from Italian II and III, and four chaperones, one adult for every five students",
    },
    {
      label: "Program",
      value:
        "Fourteen places in Rome, Florence, Siena, and Venice: the Pantheon, the San Cosimato market in Trastevere, the Vatican, the Colosseum and the Forum; three mornings at a language school in Florence, with the Baptistery, the Uffizi, and the Accademia; a day in Siena; the Doge's Palace, Murano, and a boat route students navigate in Italian",
    },
    {
      label: "Travel",
      value:
        "Flights from Cleveland through Newark to Rome and home from Venice, high-speed rail between the cities, and a private coach for the airport transfers and the Siena day",
    },
    {
      label: "Lodging",
      value: "Three nights in Rome, four in Florence, and two in Venice, each hotel a short walk from its station",
    },
    { label: "School", value: "Horizon Ridge School of Cleveland, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-florence.jpg`,
    width: 1400,
    height: 656,
    alt: "The dome of Florence Cathedral and Giotto's bell tower above the rooftops of Florence, with hills behind.",
  },
  disclosure:
    "Horizon Ridge School of Cleveland is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Approving the trip",
      note: "The record the office files, and the Trip Risk Working File for the school to review, complete, and approve.",
    },
    {
      title: "Telling families",
      note: "The letter home, passports and insurance, the days at a glance, and the forms that come back to the office.",
    },
    {
      title: "Preparing the leader and chaperones",
      note: "Day plans for every day of the trip, the procedures, and the emergency department for each place, with the travel time.",
    },
    {
      title: "Connecting the trip to learning",
      note: "One inquiry question and a language task for every day, carried from the classroom to Italy and back.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, families, the leaders, and the operator said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Trip facts and contacts, passports, entry, and insurance with the consular contacts for Rome, Florence, and Venice, then the reservations, the trip calendar, and the flights, trains, and coach transfers. Filed with the contracts, confirmations, roster, health records, and signed permission slips.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "Trip facts and the purpose of the trip, who is responsible for what, and the school's approval lines."],
        [3, "Passports against the entry rule, the insurance and its 24-hour assistance line, and the U.S. consular contacts for each city, with where an emergency passport is issued."],
        [5, "The flights through Newark, the two high-speed trains, and the coach transfers, planned at typical traffic plus a fifth, with margin on top."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, from the flights to the boats in Venice, with the emergency care for each group and the live-assessment prompts for the day. The school completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [1, "The trip summary, the emergency care in each city, and how the file is used: review, complete, approve, carry."],
        [13, "On foot in crowded cities: a student separated in a crowd and theft from the person, each with its controls, its emergency actions, and a rating the school can change."],
        [26, "Water transport in Venice: the emergency department and the walking route from the hotel, where an ambulance is a boat, then the live-assessment prompts for the day and the school's review lines."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The letter home, passports, insurance, and health, the days at a glance with the hotels, how to reach the group from Cleveland, the packing list, the student agreement, and the permission slip and health update that come back to the school office.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [2, "The letter home leads with the dates, the cost, and the day the forms are due, then explains what students will do in Italian each day."],
        [3, "Passports, insurance, and health: the validity rule in plain words, the date passport copies are due, and the photograph and fingerprints that replaced passport stamps at the border."],
        [6, "The permission slip and health update, returned to the school office by Friday, October 16, 2026."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Groups, contacts, and standards, the airport and rail procedures, a plan for every day of the trip, and the emergency plan: the emergency department for each place, with the travel time.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [3, "Airports, rail, and moving the group: the moments when twenty-four people and their luggage have to arrive somewhere together."],
        [5, "The Florence days, timed around three mornings at the language school, the Uffizi and the Accademia in two groups of twelve, and the day in Siena."],
        [7, "The emergency plan: 112 and the action sequence first, then the emergency department in each city, with the travel time, and the walking route in Venice, where an ambulance is a boat."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Emergency Card",
      reader: "Chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "For the adults who keep the same group of students for the whole trip: their role, the head count, the rhythm of the days, hotel and travel duties, and the procedures for when something goes wrong, with a card to print, cut, and fold that carries the emergency sequence and every working number.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card", [
        [1, "Each chaperone's group and role, the head-count rule, and what their five students need from them on each day of the trip."],
        [2, "Hotels and movements, then the four procedures: a student separated, a student hurt or unwell, an evacuation or security instruction, and a behavior or welfare concern."],
        [4, "The pocket card at finished size: 112 and the emergency sequence, the emergency department for each city with its distance and time, the hotels, and a line for the day's regroup point."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "One inquiry question, the places day by day with a map for each city and what students do at each, the language task for every day, and the field journal and assessment guide.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "Language in Place: the question students carry for eleven days, the three strands, the route on one map, and the fourteen places in visit order."],
        [4, "Florence and Siena: the language school, the Baptistery, the Uffizi, the Accademia, and the day in Siena, each place with what students do there."],
        [6, "Learning by Day: what students do and produce each day, and the language tasks, each finished in Italian with someone who is not a teacher."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The book students carry every day: the question, the days ahead, how the group travels with a cut-out trip card, a page for each city with the map, the places, and journal prompts, a log for the daily language task, and the final synthesis with its grading guide.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [3, "How We Travel: the rules in the order students meet them, the daily backpack, and the trip card to cut out and carry, with a line of Italian to show if they lose the group."],
        [4, "Rome in the guide: the map, the places and what students do at each, and the first journal prompts with room to write."],
        [7, "Your Italian, Day by Day: one task a day, with a column for what the student actually said rather than what they meant to say."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "After the trip",
      decision: "Improving next year's trip",
      blurb:
        "A short set of questions asked of students, parents, the leaders, and the operator after the trip: what each group said, the moments people described with the day they belong to, and what the answers show. It states; it does not recommend.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [1, "What the report looks like, with example responses because the trip has not yet run: the rated questions for students and parents, with the count under every answer, and the three moments most people raised, each with its day."],
        [2, "What the answers show, in three statements that are not recommendations, and the one place parents and students diverge."],
        [4, "One moment, in their words: the answers to the open question, grouped where people described the same thing, with the day and the part of the plan it belongs to."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/hrs-cleveland/outputs/pdf",
    a4Dir: "customers/hrs-cleveland/outputs/pdf/a4",
  },
};

export default italy;
