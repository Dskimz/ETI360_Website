import type { Metadata } from "next";
import { CtaCard } from "@/components/CtaCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Trip Risk Register",
  description:
    "The home view of a school's portal: every scheduled trip for the year in one register, with seasonal risk signals and the status the school set for each trip's risk documentation.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/documents/trip-risk-register" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "Trip Risk Register — ETI360",
    description:
      "The home view of a school's portal: every scheduled trip for the year in one register, with seasonal risk signals and the status the school set for each trip's risk documentation.",
    type: "article",
  },
};

export default function TripRiskRegisterPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Documents &middot; Tier 2 &middot; Trip Readiness</p>
          <h1>The Trip Risk Register</h1>
          <p className="subtitle">
            The home view of a school&rsquo;s portal: every scheduled
            trip for the year in one register, with the risk work that surrounds
            each departure.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="bridge-line ui">
            <Link href="/travel-program-review" className="cta-link ui">
              &larr; All documents
            </Link>
          </p>

          <p className="lead">
            A school&rsquo;s travel program is a year of departures, and each one
            carries its own preparation. The Trip Risk Register holds that year on
            one screen &mdash; every scheduled trip in departure order, with
            seasonal risk signals and the status the school has set for each trip&rsquo;s
            risk documentation.
          </p>

          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/library/trip-risk-register.png"
              alt="The Trip Risk Register in the school portal: Harborview International School's 31 scheduled trips, month by month, each with departure date, seasonal risk signals, and the status the school set for its risk documentation"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            The register for Harborview International School: 31 scheduled trips
            across the academic year. Harborview International School is a
            fictional school; its location is shown for illustrative purposes.
          </p>

          <h2>Who works from it</h2>
          <p>
            Trip coordinators use the register week to week, starting from the
            next departure. Risk leads use it to plan review cycles &mdash; the
            register shows the status the school has set for each trip&rsquo;s
            risk documentation. For leadership, it is the
            year at a glance: one view that connects the school&rsquo;s standing
            governance to every trip on the calendar.
          </p>

          <h2>What the screen holds</h2>
          <ul>
            <li>
              <strong>The year in numbers.</strong> Trips scheduled, high-priority
              signals, and the status the school set for each trip&rsquo;s risk
              documentation across the program.
            </li>
            <li>
              <strong>Seasonal risk signals, per trip.</strong> Generated from
              destination intelligence, travel advisories, and time-of-year
              conditions, they indicate where to focus risk assessment first. The
              screen states its own boundary: signals are not a substitute for the
              school&rsquo;s risk assessment.
            </li>
            <li>
              <strong>Risk documentation status, per trip, as the school set it.</strong>
              Each trip links to its risk documentation, so the register is also the index to the Tier 2 work.
            </li>
            <li>
              <strong>The Tier 1 connection.</strong> The school&rsquo;s
              Organizational Readiness sits at the top of the register,
              keeping the standing review visible above the year it covers.
            </li>
          </ul>

          <div className="artifact-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marketing/library/trip-risk-register-detail.png"
              alt="A month group from the Trip Risk Register: two September departures, each with seasonal risk signals at high and review levels and a link to its risk documentation"
              loading="lazy"
            />
          </div>
          <p className="artifact-reader ui">
            September&rsquo;s departures with their seasonal risk signals. The
            guidance line above the table is part of the product: signals direct
            attention; the school&rsquo;s risk assessment remains the assessment.
          </p>

          <h2>Where it sits in the framework</h2>
          <p>
            The register is the bridge between tiers. Above it sits the
            Organizational Readiness &mdash; the four-yearly review of the
            school&rsquo;s own policies, roles, and standing arrangements. Below
            it, each trip carries its Tier 2 pack: the itineraries, route
            intelligence, risk assessment, and parent documents. When a group
            departs, the working view moves to the Duty Manager Dashboard, and
            after the trip the record returns through the Post-Trip Feedback
            Report.
          </p>
          <p>
            The register organizes these inputs and supports expert-led review.
            The judgments &mdash; which activities need a written risk assessment, what a signal
            means for a specific group, whether a trip is ready &mdash; remain
            with the school&rsquo;s own staff. We do not certify trips, and the
            decision stays with the school.
          </p>

          <p className="artifact-reader ui">
            The screens on this page show Harborview International School.
            Harborview International School is a fictional school; its location
            is shown for illustrative purposes.
          </p>
        </div>
      </section>

      <CtaCard title={'One entry in the set.'} copy={'The register is one part of the document library — the full set runs from the Travel Program Review to the Post-Trip Feedback Report.'} />
    </>
  );
}
