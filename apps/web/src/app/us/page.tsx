import type { Metadata } from "next";
import Link from "next/link";
import { CtaCard, MiniCta } from "@/components/CtaCard";
import { DocRow, TierBand, type DocEntry } from "../../components/DocShowcase";

/* ETI360 for US independent and religious schools (Dan, 2026-09-16).
   One page, seven documents. Vocabulary follows the US buyer: risk management
   plan, administrator on call, chaperones, Head of School, Board of Trustees,
   emergency room. The athletics conference guide is deliberately absent.
   The sample documents are the Harborview set until the US working documents
   (Washington DC, Appalachia service, Hocking Hills, El Salvador, Costa Rica,
   Quebec City, Italy; docs/US-SITEMAP.md) are built; swap the entries below
   when they land. Hero and CTA images come from the US Website Image Set. */

export const metadata: Metadata = {
  title: "ETI360 for US Schools",
  description:
    "Trip risk documentation for US independent and religious schools: seven documents prepared from your itinerary and your operator's paperwork, for the Head, the trip leaders, and the families. Approval stays with the school.",
  alternates: { canonical: "/us" },
  openGraph: {
    title: "ETI360 for US Schools",
    description:
      "Seven trip documents for US independent and religious schools, prepared from your itinerary. Approval stays with the school.",
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

const US_ADDRESS = "412 Avon Belden Rd, Avon Lake, OH 44012";

const usDocuments: DocEntry[] = [
  {
    anchor: "trip-risk-working-file",
    pdf: "/showcase/pdfs/04-rams-report.pdf",
    stage: "1 · For the approval",
    name: "Trip Risk Working File",
    reader: "Head of School · Trip leader · Business office",
    desc: "The information behind your risk management plan, organized one section per activity group: what students will do and where, the hazards, the controls your operator already describes, the controls the school may add, and the emergency actions for each place. Prepared for the school to review, complete, and approve. ETI360 does not approve or certify it.",
    image: {
      src: "/marketing/library/rams-report.png",
      alt: "Trip Risk Working File risk register page: named risks with inherent and residual ratings, controls, and emergency actions",
    },
  },
  {
    anchor: "itinerary-report",
    pdf: "/showcase/pdfs/02-1-calendar-view.pdf",
    stage: "2 · The operational record",
    name: "Itinerary Report and Calendar",
    reader: "Trip leaders · Chaperones · Front office",
    desc: "The trip as designed, hour by hour and gap-free: a color-coded calendar for the scan and a day-by-day table for the detail, with every transfer, meal, and overnight in place. The same record the other six documents are built from, so they agree with each other.",
    image: {
      src: "/showcase/pages/02-1-calendar-view/2.png",
      alt: "Itinerary Report calendar view: four days as hour-by-hour blocks covering activities, meals, transport, and accommodation",
    },
  },
  {
    anchor: "medical-access",
    pageHref: "/for-schools/medical-access",
    stage: "3 · Where care comes from",
    name: "Medical Access",
    reader: "Trip leader · School nurse · Administrator on call",
    desc: "The emergency rooms and urgent care nearest each place on the itinerary, with drive times from the hotel and from each activity site, verified contact details, and notes on what each facility can handle. Connected to the actual route, not the city in general.",
    image: {
      src: "/marketing/solutions/medical-access.png",
      alt: "Medical Access page: verified facility profiles with travel times from the itinerary locations",
    },
  },
  {
    anchor: "parent-pack",
    pdf: "/docs/parent-itinerary.pdf",
    stage: "4 · For families",
    name: "Parent Information Pack",
    reader: "Parents",
    desc: "The trip written for families in the school's own voice: the days, the supervision, meals and rooming, how the school communicates while the group is away, and what to send. Summarizes the controls; the working file itself stays school-side.",
    image: {
      src: "/email/card-parent.png",
      alt: "Parent Information Pack day pages with photographs and day-by-day plans",
    },
  },
  {
    anchor: "field-pack",
    pdf: "/docs/teacher-operational-guide.pdf",
    stage: "5 · What travels with the group",
    name: "Trip Leader Field Pack",
    reader: "Trip leaders · Chaperones",
    desc: "A daily brief for every day of the trip, the contacts and escalation chain, the emergency room details per location, and the emergency procedure cards, in one printed pack sized for a backpack. Emailed to your coordinator to forward to the staff who travel.",
    image: {
      src: "/email/page-teacher.png",
      alt: "Trip Leader Field Pack daily brief page",
    },
  },
  {
    anchor: "weather",
    pdf: "/showcase/pdfs/01-1-weather-brief-sydney.pdf",
    stage: "6 · Conditions",
    name: "Weather and Climate Briefing",
    reader: "Trip leaders · Coordinator",
    desc: "The travel window quantified from fifteen years of records for the destination and dates: temperature range by day, rain, daylight, and the conditions that would prompt a change of plan. Historical, never a forecast, so it can be prepared months ahead.",
    image: {
      src: "/showcase/pages/01-1-weather-brief-sydney/1.png",
      alt: "Weather and Climate Briefing: fifteen-year temperature overview, daily outlook, and planning notes",
    },
  },
  {
    anchor: "post-trip",
    pdf: "/docs/post-trip-feedback-loop.pdf",
    stage: "7 · After return",
    name: "Post-Trip Feedback Report",
    reader: "Head of School · Trip leader · Next year's planner",
    desc: "How the trip actually ran: check-ins, deviations from plan, incidents recorded, and what students, parents, and chaperones said in four questions. Returned as a short PDF so next year's trip starts from what this one learned.",
    image: {
      src: "/email/card-posttrip.png",
      alt: "Post-Trip Feedback Report page",
    },
  },
];

const trips = [
  "Washington, DC (8th grade, four days)",
  "New York City arts and theater",
  "Chicago architecture and museums",
  "Outdoor education week (state park or camp)",
  "Appalachia service week (West Virginia)",
  "Costa Rica service and ecology",
  "Montreal and Quebec City language trip",
];

export default function UsPage() {
  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/us/images/washington-dc-hero.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">ETI360 in the United States</p>
          <h1>Seven documents for the trips your school actually runs.</h1>
          <p className="subtitle">
            Prepared from your itinerary and your operator&rsquo;s paperwork, for the Head who
            signs, the teachers who travel, and the families who ask. Approval stays with the
            school.
          </p>
        </div>
        <MiniCta />
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            Most independent and religious schools run the same handful of trips every year:
            the 8th-grade Washington trip, a language trip to Europe or Quebec, a service week in
            Appalachia or Central America, an outdoor education week, and the senior trip. Each is
            planned by a teacher, a campus minister, or a department chair, booked through an
            operator, and approved by the Head. ETI360 prepares the documents that sit between
            those three: the risk management working file, the itinerary record, the medical access
            page, the parent pack, the field pack the chaperones carry, the weather briefing, and
            the report that closes the trip.
          </p>
          <p>
            We work from what you already have. You email us the operator&rsquo;s itinerary and
            documents and your trip policy; we return the seven documents, in your school&rsquo;s
            name and branding, at Letter size. The operator runs the trip. The school approves it.
            ETI360 prepares what the school reads.
          </p>
          <p className="artifact-reader ui">
            The documents below are from a fully worked example for Harborview, our sample school.
            It is not a real school, so every page can be shown in full. US example trips are in
            preparation: {trips.join("; ")}.
          </p>
        </div>

        <TierBand
          n={2}
          id="documents"
          eyebrow="Per trip · Seven documents"
          name="Trip Readiness for US schools"
          desc="Is this trip ready for the Head to approve? One consistent set for every departure, from the working file the risk management plan draws on to the report that comes home."
        />
        <div className="doc-rows">
          {usDocuments.map((e, i) => (
            <DocRow key={e.anchor} e={e} eager={i === 0} />
          ))}
        </div>

        <div className="container measure">
          <h2 className="section-heading rule-gold">What US schools ask us first</h2>
          <p>
            <strong>We book through an operator. What does this add?</strong> Your operator&rsquo;s
            documents are the starting point, not a competitor. ETI360 organizes them, with your
            policy and the itinerary, into the file your Head reviews and the pack your chaperones
            carry. Nothing the operator does is replaced.
          </p>
          <p>
            <strong>Which standard is this against?</strong> There is no national school-trip statute
            in the United States. Schools work to their accreditor&rsquo;s standards, their
            insurer&rsquo;s requirements, NAIS guidance on off-campus programs, and for
            international travel the State Department advisories. The ETI360 Operational Capability
            Framework organizes your documents against those references without replacing them.
          </p>
          <p>
            <strong>Student data.</strong> ETI360 does not receive student records or personally
            identifiable student information. Trip files name places, dates, providers, and staff
            roles. Your FERPA obligations are not transferred to us.
          </p>
          <p>
            <strong>Who does the work.</strong> Dan Skimin, Principal Consultant, worked in schools
            for 23 years, most of them in American-curriculum international schools, and has spent
            the past 15 years on the preparation, documentation, and oversight of school travel.
            Seb Wong, Senior Consultant, is part of every engagement.
          </p>
          <p>
            <strong>Pricing.</strong> Per trip, in US dollars: the number of trip days times a per-day
            rate covers the seven documents. A one-day trip is a flat rate. Nothing is free, and
            there is no first-trip fee.
          </p>
          <p>
            <strong>Where we are.</strong> ETI360 PTE. LTD. is a Singapore company with a US office at{" "}
            {US_ADDRESS}. We respond within two business days.
          </p>
          <p>
            I would love to talk with you about your school&rsquo;s travel programs and how ETI360
            could help. Send me a message, and we&rsquo;ll find a time that works for you.{" "}
            <Link href="/contact">Contact us &rarr;</Link>
          </p>
          <p className="artifact-reader ui">
            ETI360 prepares and organizes the supporting information. The school and its providers
            retain responsibility for risk decisions, live assessments, and final approval.
          </p>
        </div>
      </section>

      <CtaCard
        title={"Contact us."}
        copy={"Tell us about the trips your school runs and we will show you the seven documents for one of them."}
        image={"/us/images/appalachia-hero.jpg"}
      />
    </>
  );
}
