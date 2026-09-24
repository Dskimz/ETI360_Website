import type { Metadata } from "next";
import { CtaCard, MiniCta } from "@/components/CtaCard";
import { FOUNDERS_LINE, POSITIONING_STATEMENT } from "@/content/voice";

export const metadata: Metadata = {
  title: "About",
  description:
    "ETI360 provides risk intelligence for school trips. ETI360 PTE. LTD. is a Singapore-registered company founded by Dan Skimin and Seb Wong.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section
        className="hero hero-inner-page"
        style={{ ["--hero-bg" as string]: "url('/marketing/hero/about.jpg')" } as React.CSSProperties}
      >
        <div className="hero-inner">
          <p className="label label-light ui">About</p>
          <h1>About ETI360.</h1>
          <p className="subhead">
            Over 30 years of combined experience in educational travel safety
            and learning.
          </p>
        </div>
        <MiniCta />
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">{POSITIONING_STATEMENT}</p>

          <h2>The firm</h2>
          <p>
            ETI360 is Educational Travel Insights 360 &mdash; ETI360 PTE. LTD., a private
            limited company registered in Singapore (UEN 202302514C), at 1010 Dover Road,
            #01-360V, Singapore 139658.
          </p>

          <h2>Who does the work</h2>
          <p>{FOUNDERS_LINE}</p>
          <p>
            <strong>Dan Skimin &mdash; Principal Consultant.</strong>{" "}
            Twenty-three years as an international school educator, the past fifteen of
            them focused on helping schools simplify educational travel. Dan runs the firm
            day to day and works directly on every engagement.
          </p>
          <p>
            <strong>Seb Wong &mdash; Senior Consultant.</strong>
          </p>

          <h2>What we cover</h2>
          <p>
            ETI360 works in trip governance &mdash; risk assessment, provider review,
            emergency documentation, and post-trip review. We do not cover safeguarding,
            on-campus health and safety, or liability management; those are distinct
            disciplines served by other specialist firms.
          </p>
          <p>
            The firm supports work the school or provider remains accountable for. It is a
            decision support service: it does not approve trips, certify providers, insure
            anyone, or substitute its judgment for the governance bodies of the
            organizations it works with. Schools and providers retain responsibility for
            decisions and approvals.
          </p>

          <h2>How the work is shown</h2>
          <p>
            Everything shown publicly &mdash; every document page, dashboard view, and
            worked example on this site &mdash; comes from Harborview International
            School, our sample school. Harborview is not a real school, and that is a deliberate
            choice: it means every page can be shown in full, and no real school&rsquo;s
            documents, staff, or students ever appear in ETI360&rsquo;s materials. Client
            work is produced the same way, in the client&rsquo;s own branding, from the
            client&rsquo;s own trip data &mdash; and stays theirs.
          </p>
        </div>
      </section>

      <CtaCard title={'Arrange a briefing.'} copy={'Briefings are conversations, not sales calls.'} image={'/marketing/hero/about.jpg'} />
    </>
  );
}
