import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaCard, MiniCta } from "@/components/CtaCard";
import { getTrip } from "@/content/trips";
import { BRAND_LINE, CLOSING_SENTENCE, FOUNDERS_LINE, WHAT_WE_DO_LINE, WHO_DECIDES } from "@/content/voice";

/* ETI360 for US independent and religious schools (Dan, 2026-09-16).
   One voice (Dan, 2026-09-24): the first viewport carries the home page's lines
   unchanged, "Risk intelligence for school trips." and "Decision-ready evidence
   for every trip."; "school travel preparation service" appears only as a plain
   descriptor in body copy. No document counts. Vocabulary follows the US buyer:
   risk management plan, chaperones, Head of School, Board of Trustees.
   The worked example is the Washington, DC trip at /trips/washington-dc
   (Horizon Ridge School of Cleveland, fictional; docs/US-SITEMAP.md). The
   Harborview document list that stood here is retired in its favor. Hero and
   CTA images come from the US Website Image Set. */

export const metadata: Metadata = {
  title: "ETI360 for US Schools",
  description:
    "Risk intelligence for school trips, for US independent and religious schools. ETI360 brings together your itinerary, your operator's documents, and your school's procedures and prepares the documents administrators, trip leaders, and families use. Approval stays with the school.",
  alternates: { canonical: "/us" },
  openGraph: {
    title: "ETI360 for US Schools",
    description: "Risk intelligence for school trips. Decision-ready evidence for every trip. Approval stays with the school.",
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

const US_ADDRESS = "412 Avon Belden Rd, Avon Lake, OH 44012";

export default function UsPage() {
  const example = getTrip("washington-dc");
  const exampleCover = example?.documents.find((d) => d.slug === "school-trip-record")?.cover;

  return (
    <>
      <section
        className="article-header"
        style={{ ["--hero-bg" as string]: "url('/us/images/washington-dc-hero.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">For US schools</p>
          <h1>{BRAND_LINE}</h1>
          <p className="hero-line">{WHAT_WE_DO_LINE}</p>
          <p className="subtitle">
            ETI360 is a school travel preparation service for US independent and religious schools. We
            bring together your itinerary, your operator&rsquo;s documents, and your school&rsquo;s
            procedures, add what the group needs to know about each place, and prepare the documents
            administrators, trip leaders, and families use. Approval stays with the school.
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
            those three, each for the person who uses it: the record the office files, the working
            file the school completes and approves, the brief families read, the card the trip leader
            carries, and the report that closes the trip.
          </p>
          <p>
            You email us the operator&rsquo;s itinerary and documents and your trip policy. We add
            what the group needs to know along the way, such as venue entry rules and the emergency
            department for each place, with the drive time, and return the documents in your
            school&rsquo;s name and branding, each built to US Letter and A4. The operator runs the
            trip. The school approves it.
          </p>

          <h2 className="section-heading rule-gold" id="example">A worked example</h2>
        </div>

        {example ? (
          <div className="doc-row">
            <Link href={`/trips/${example.slug}`} className="doc-row-thumb" aria-label={`See the ${example.title} trip documents`}>
              {exampleCover ? (
                <Image
                  src={exampleCover.src}
                  width={exampleCover.width}
                  height={exampleCover.height}
                  alt={exampleCover.alt}
                  sizes="220px"
                />
              ) : null}
            </Link>
            <div className="doc-row-body">
              <p className="artifact-stage ui">Washington, DC &middot; 8th grade &middot; Five days</p>
              <h3 style={{ marginTop: 0 }}>{example.h1}</h3>
              <p>
                {example.summary} Every document opens in full, and each shows the decision it
                supports.
              </p>
              <p className="artifact-reader ui">{example.disclosure}</p>
              <p>
                <Link href={`/trips/${example.slug}`} className="cta-link ui">
                  See the Washington, DC trip &rarr;
                </Link>{" "}
                <Link href="/trips" className="cta-link ui">
                  All trips &rarr;
                </Link>
              </p>
            </div>
          </div>
        ) : null}

        <div className="container measure">
          <h2 className="section-heading rule-gold">What US schools ask us first</h2>
          <p>
            <strong>We book through an operator. What does this add?</strong> Your operator&rsquo;s
            documents are the starting point, not a competitor. ETI360 brings them together with your
            policy and the itinerary, adds what the group needs to know about each place, and prepares
            the file your Head reviews and the card your trip leader carries. Nothing the operator does
            is replaced.
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
            <strong>Who does the work.</strong> {FOUNDERS_LINE} Dan Skimin, Principal Consultant,
            worked in schools for 23 years, most of them in American-curriculum international schools,
            and has spent the past 15 years on the preparation, documentation, and oversight of school
            travel.
          </p>
          {
            // PENDING Dan N6: price display
          }
          <p>
            <strong>Pricing.</strong> Per trip, in US dollars: the number of trip days times a per-day
            rate covers the trip&rsquo;s documents. A one-day trip is a flat rate. Nothing is free, and
            there is no first-trip fee.
          </p>
          <p>
            <strong>Where we are.</strong> ETI360 PTE. LTD. is a Singapore company with a US office at{" "}
            {US_ADDRESS}. We respond within two business days.
          </p>
          <p className="artifact-reader ui">{WHO_DECIDES}</p>
        </div>
      </section>

      <CtaCard title={"Contact us."} copy={CLOSING_SENTENCE} image={"/us/images/appalachia-hero.jpg"} />
    </>
  );
}
