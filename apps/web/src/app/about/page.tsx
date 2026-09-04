import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "ETI360 PTE. LTD. is a Singapore-registered risk governance and intelligence consulting firm for educational travel, run by Dan Skimin.",
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
          <p className="subhead">Risk intelligence for school trips.</p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 works with international schools and educational travel providers,
            turning the information they already hold &mdash; itineraries, provider
            documents, dates, routes, hazards, and controls &mdash; into one consistent
            trip file, a standing organizational baseline, and working views the
            school&rsquo;s own staff operate on the days trips run.
          </p>

          <h2>The firm</h2>
          <p>
            ETI360 is Educational Travel Insights 360 &mdash; ETI360 PTE. LTD., a private
            limited company registered in Singapore (UEN 202302514C), at 1010 Dover Road,
            #01-360V, Singapore 139658. Dan Skimin, Co-Founder &amp; Principal Consultant,
            runs the firm day to day and works directly on every engagement.
          </p>

          <h2>What we cover</h2>
          <p>
            ETI360 works in trip governance &mdash; risk assessment, provider review,
            emergency documentation, and post-trip review. We do not cover safeguarding,
            on-campus health and safety, or liability management; those are distinct
            disciplines served by other specialist firms.
          </p>
          <p>
            The firm structures and supports work the school or provider remains
            accountable for. It is a decision support service: it does not approve trips,
            certify providers, insure anyone, or substitute its judgment for the
            governance bodies of the organizations it works with. The evidence is ours to
            structure; the judgment stays with the school.
          </p>

          <h2>How the work is shown</h2>
          <p>
            Everything shown publicly &mdash; every document page, dashboard view, and
            worked example on this site &mdash; comes from Harborview International
            School, a reference school that is fictitious by design. That is a deliberate
            choice: it means every page can be shown in full, and no real school&rsquo;s
            documents, staff, or students ever appear in ETI360&rsquo;s materials. Client
            work is produced the same way, in the client&rsquo;s own branding, from the
            client&rsquo;s own trip data &mdash; and stays theirs.
          </p>
        </div>
      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Arrange a briefing.</h2>
          <p>Briefings are conversations, not sales calls. We respond within two business days.</p>
          <Link href="/contact" className="cta-button ui">Get in touch</Link>
        </div>
      </section>
    </>
  );
}
