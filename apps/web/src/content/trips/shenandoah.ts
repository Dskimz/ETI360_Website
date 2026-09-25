import { tripPaths } from "./helpers";
import type { Trip } from "./types";

/* Shenandoah Appalachian Trail Trek (Horizon Ridge School of Philadelphia),
   ported from the V3 prototype (customers/hrs-philadelphia/website/
   build_shenandoah_page.py, 2026-09-22/23) and the trip record
   (customers/hrs-philadelphia/trips/shenandoah-2027/shenandoah-trip-record.md).
   Letter PDFs: customers/hrs-philadelphia/outputs/pdf/; A4 PDFs:
   outputs/pdf/a4/. Restore them locally with `npm run sync:trip-pdfs`.
   Hero: "The Point Overlook on Skyline Drive", Carol M. Highsmith Archive,
   Library of Congress (item 2011631743, public domain), the photo-cover.jpg
   crop in trips/shenandoah-2027/assets/. The guiding company in the
   documents is invented and is not named on this page. */

const { base, cover, inside, editions } = tripPaths({
  slug: "shenandoah",
  filePrefix: "hrsp-ot01-shenandoah",
});

const shenandoah: Trip = {
  slug: "shenandoah",
  title: "Shenandoah National Park",
  h1: "The documents for a five-day trip to Shenandoah National Park.",
  school: "Horizon Ridge School of Philadelphia",
  schoolType: "US",
  tripKind: "Outdoor",
  tripType: "Overnight trip, five days",
  region: "Virginia",
  dates: "Monday, October 4 to Friday, October 8, 2027",
  group: "20 tenth-grade students and four chaperones",
  paperDefault: "letter",
  lede:
    "Horizon Ridge School of Philadelphia is taking twenty tenth graders to walk the Appalachian Trail through Shenandoah National Park for five days in October. ETI360 brought together the school's itinerary, the coach, lodge, and guiding arrangements, and the school's own procedures, drew each walking day's route from National Park Service and OpenStreetMap trail data, with the elevation along it, computed the sun times for where the group will be each day, and found the emergency department for each half of the ridge, with the drive time. Each document below is written for the person who uses it, and each opens in full.",
  summary:
    "A five-day tenth-grade walk on the Appalachian Trail, with the coach on Skyline Drive all week: the documents for the office, the trip leader and chaperones, families, teachers, students, and next year's planning.",
  facts: [
    { label: "Trip", value: "Shenandoah Appalachian Trail Trek, Monday, October 4 to Friday, October 8, 2027" },
    {
      label: "Group",
      value:
        "20 tenth-grade students and four chaperones, one adult for every five students; on the Trail, two walking parties of thirteen, each with a guide and two school adults",
    },
    {
      label: "Program",
      value: "The outdoor education program and the American studies unit on the Appalachians",
    },
    {
      label: "On foot",
      value:
        "23.3 miles over four walking days and 4,744 feet of climb: Stony Man, Hawksbill at 4,051 feet, Dark Hollow Falls, and Rapidan Camp, with an optional rock scramble at Bearfence on Thursday afternoon",
    },
    {
      label: "Travel",
      value:
        "One motorcoach: about 215 road miles to the park on Monday and about 230 home on Friday, with the coach on Skyline Drive all week and meeting each walking party at the named road crossings",
    },
    { label: "Lodging", value: "Two nights at Skyland and two at Big Meadows Lodge, both inside the national park on Skyline Drive" },
    { label: "School", value: "Horizon Ridge School of Philadelphia, a fictional school" },
  ],
  hero: {
    src: `${base}/hero-point-overlook.jpg`,
    width: 1400,
    height: 656,
    alt: "Forested Blue Ridge hills in early autumn color, seen from The Point Overlook on Skyline Drive in Shenandoah National Park.",
  },
  heroCredit: "The Point Overlook on Skyline Drive. Photograph: Carol M. Highsmith Archive, Library of Congress.",
  disclosure:
    "Horizon Ridge School of Philadelphia is a fictional school; its location is shown for illustrative purposes.",
  decisions: [
    {
      title: "Approving the trip",
      note: "The record the office files, and the Trip Risk Working File for the school to review, complete, and approve.",
    },
    {
      title: "Telling families",
      note: "The letter home, the week day by day, and the forms that come back with the deposit, including the backcountry consent.",
    },
    {
      title: "Preparing the leader and chaperones",
      note: "Groups and walking parties, the procedures on the Trail and at the lodges, and the emergency department for each half of the ridge, with the drive time.",
    },
    {
      title: "Deciding each day's route and turnaround",
      note: "The Route Intelligence page for each walking day in the Trip Leader Card, with its turnaround times, and the sun times and tree cover for where the group will be. The trip leader makes the call on the day.",
    },
    {
      title: "Connecting the trip to learning",
      note: "One question about who decides what a place is for, carried from the classroom to the places on the ridge and back.",
    },
    {
      title: "Improving next year's trip",
      note: "What students, families, the leaders, and the guides said, set out for the school's review.",
    },
  ],
  documents: [
    {
      slug: "school-trip-record",
      title: "School Trip Record",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Trip facts, contacts, and the approval line, then what is held at each lodge, the dates the office works to, and the road journey. Filed with the contracts, confirmations, roster, health records, and signed permission slips.",
      cover: cover("school-trip-record", "School Trip Record"),
      editions: editions("school-trip-record"),
      insidePages: inside("school-trip-record", "School Trip Record", [
        [2, "Trip facts, the contacts table, and the approval line, with supervision and medical arrangements set out for the office."],
        [3, "What is held at each lodge, every date the office works to, and what the trip cost covers and does not."],
        [4, "The road journey with its rest stops, the Monday and Friday schedules, and how the coach works inside the park."],
      ]),
    },
    {
      slug: "trip-risk-working-file",
      title: "Trip Risk Working File",
      reader: "School",
      decision: "Approving the trip",
      blurb:
        "Hazards, controls, and emergency actions organized one section per activity group, from the road to the open rock and the optional scramble, with the emergency care for each group and the live-assessment prompts for the day. The school completes it, amends it, and approves it.",
      cover: cover("trip-risk-working-file", "Trip Risk Working File"),
      editions: editions("trip-risk-working-file"),
      insidePages: inside("trip-risk-working-file", "Trip Risk Working File", [
        [1, "The trip summary the file is built on, and the activity groups from the road to the rock, each with its own section."],
        [13, "Summits and open rock: a fall from the rock and lightning on exposed ground, each with its controls, its emergency actions, and its rating."],
        [16, "The optional Bearfence rock scramble: the emergency department for the south of the ridge, with the drive time, the live-assessment prompts for the day, and the school's review lines."],
      ]),
    },
    {
      slug: "family-trip-brief",
      title: "Family Trip Brief",
      reader: "Families",
      decision: "Telling families",
      blurb:
        "The letter home, the week day by day, the lodges and how families reach the group from a ridge with little signal, the packing list and the student agreement, and the forms that come back to the office.",
      cover: cover("family-trip-brief", "Family Trip Brief"),
      editions: editions("family-trip-brief"),
      insidePages: inside("family-trip-brief", "Family Trip Brief", [
        [2, "The letter home leads with the deposit, the forms, and the information evening, then says what the week is for."],
        [3, "The week day by day, the lodges, supervision and medical arrangements, and how families stay in touch with a group on the ridge."],
        [5, "The permission slip, backcountry consent, fitness confirmation, and health update, returned to the school office with the deposit."],
      ]),
    },
    {
      slug: "trip-leader-card",
      title: "Trip Leader Card",
      reader: "Trip leader",
      decision: "Preparing the leader and chaperones",
      blurb:
        "Groups, walking parties, contacts, and standards, the week in outline, a Route Intelligence page for each walking day, and the emergency plan: the emergency department for each half of the ridge, with the drive time.",
      cover: cover("trip-leader-card", "Trip Leader Card"),
      editions: editions("trip-leader-card"),
      insidePages: inside("trip-leader-card", "Trip Leader Card", [
        [2, "Groups of five and two walking parties of thirteen, fifteen minutes apart, each with a guide and two school adults, and the working contacts."],
        [5, "Route Intelligence for the longest day: the map, the legs, where the coach meets the group, the turnaround times, the elevation profile, and the daylight left at the finish."],
        [8, "The emergency plan: the park's dispatch number first, then the emergency department for each half of the ridge, with the drive time, and the route out through Thornton Gap."],
      ]),
    },
    {
      slug: "chaperone-briefing",
      title: "Chaperone Briefing and Pocket Emergency Card",
      reader: "Chaperones",
      decision: "Preparing the leader and chaperones",
      blurb:
        "For the adults who each take five students: their group and walking party, the shape of a walking day, what they do on the Trail, at the lodge, and on the coach, and a card to print, cut, and fold that carries the emergency sequence and every working number.",
      cover: cover("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card"),
      editions: editions("chaperone-briefing"),
      insidePages: inside("chaperone-briefing", "Chaperone Briefing and Pocket Emergency Card", [
        [1, "Each chaperone's group, walking party, and role, and the shape of every walking day from breakfast to the corridor check."],
        [2, "Walking, open rock, the optional scramble, the lodge, and the coach, including the rule for thunder on the rock."],
        [4, "The pocket emergency card at finished size: the park's dispatch number and the sequence on one side, the emergency departments, the steps for a student out of sight, and where the coach is on the other."],
      ]),
    },
    {
      slug: "daylight-and-cover-report",
      title: "Daylight and Cover Report",
      reader: "Trip leader",
      decision: "Deciding each day's route and turnaround",
      blurb:
        "Sunrise, sunset, and the last usable light for every day of the trip, computed for where the group will be, with the planned times set against them and the tree cover along each day's route.",
      cover: cover("daylight-and-cover-report", "Daylight and Cover Report"),
      editions: editions("daylight-and-cover-report"),
      insidePages: inside("daylight-and-cover-report", "Daylight and Cover Report", [
        [1, "The week against the sun: sunrise, sunset, and the margin between each day's planned end and sunset, with the canopy along each route."],
        [3, "Wednesday, the long day: the sun times for where the group will be, the margin to sunset, and the ground and canopy along the route."],
        [6, "Where each figure comes from, how it is computed, and what the figures do not describe."],
      ]),
    },
    {
      slug: "educational-journey",
      title: "Educational Journey",
      reader: "Teachers",
      decision: "Connecting the trip to learning",
      blurb:
        "One question, the places on the ridge that answer parts of it, the walking days with a map for each, and the field journal and assessment guide.",
      cover: cover("educational-journey", "Educational Journey"),
      editions: editions("educational-journey"),
      insidePages: inside("educational-journey", "Educational Journey", [
        [2, "The week's question, the three strands, and the eight places in the order the group reaches them."],
        [5, "Thursday: Dark Hollow Falls in the morning, the park's own account of its founding at the visitor center, and the optional scramble in the afternoon."],
        [7, "The daily journal entry, a prompt for each walking day, and what a strong response does."],
      ]),
    },
    {
      slug: "student-journey-guide",
      title: "Student Journey Guide",
      reader: "Students",
      decision: "Connecting the trip to learning",
      blurb:
        "The guide students carry all week: the question, the week and the road, how the group walks, one page for each walking day with the map and journal prompts with room to write, and what happens afterward.",
      cover: cover("student-journey-guide", "Student Journey Guide"),
      editions: editions("student-journey-guide"),
      insidePages: inside("student-journey-guide", "Student Journey Guide", [
        [3, "How We Walk, in the student's voice: the two parties, the pace, the counts, the blazes, the rock, the water, and the bears."],
        [5, "Wednesday in the guide: the route map, where the coach is, the places in a student's words, and the journal prompt with room to write."],
        [8, "After the Trip: the response due October 22, what makes a strong one, and who to ask about what."],
      ]),
    },
    {
      slug: "post-trip-feedback-report",
      title: "Post-Trip Feedback Report",
      reader: "After the trip",
      decision: "Improving next year's trip",
      blurb:
        "Four questions asked of students, parents, the leaders, and the guides after the trip: what each group said, the moments that did not go to plan with the day they belong to, and what in the trip each one touches. It states; it does not recommend.",
      cover: cover("post-trip-feedback-report", "Post-Trip Feedback Report"),
      editions: editions("post-trip-feedback-report"),
      insidePages: inside("post-trip-feedback-report", "Post-Trip Feedback Report", [
        [1, "What the report looks like, with example responses because the trip has not yet run: the three rated questions for students and parents, the counts at every step, and the moments most raised, each with its day."],
        [2, "For the school's review: what the answers show, where parents and students differ, and who answered, with no recommendation."],
        [4, "The moments people raised, each with its day, whether it points at the plan or at how the day was run, and the words as written."],
      ]),
    },
  ],
  pdfSource: {
    letterDir: "customers/hrs-philadelphia/outputs/pdf",
    a4Dir: "customers/hrs-philadelphia/outputs/pdf/a4",
  },
};

export default shenandoah;
