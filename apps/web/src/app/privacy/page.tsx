import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "What ETI360 collects through this website, why, how long it is kept, and how to ask for it to be removed.",
  alternates: { canonical: "/privacy" },
};

// Last substantive review of this notice. Update when what we collect changes.
const UPDATED = "31 July 2026";

export default function PrivacyPage() {
  return (
    <>
      <section className="hero hero-inner-page">
        <div className="hero-inner">
          <p className="label label-light ui">Privacy</p>
          <h1>Privacy notice.</h1>
          <p className="subhead">
            What this website collects, why, and how to have it removed.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            ETI360 collects as little as the work requires. This notice describes everything
            this website gathers and what happens to it. Last updated {UPDATED}.
          </p>

          <h2>Who is responsible</h2>
          <p>
            Educational Travel Insights 360 (ETI360) is the data controller for this website.
            For any question about this notice, or to ask us to correct or delete what we hold
            about you, write to{" "}
            <Link href="mailto:danskimin@eti360.com">danskimin@eti360.com</Link>. We answer
            within five business days.
          </p>

          <h2>What we collect, and why</h2>
          <p>
            <strong>The briefing form.</strong> When you use the contact form we collect your
            name, organization, role, email address, country, and what you would like to
            discuss. We use these details only to answer your enquiry and to arrange a
            briefing if you want one. The lawful basis is our legitimate interest in
            responding to someone who has asked us to get in touch.
          </p>
          <p>
            Form submissions are delivered to us by email through Resend, our email delivery
            provider, and are held in our own mailbox. They are not added to a mailing list,
            not used for marketing unless you ask us to keep in touch, and not sold or shared
            with anyone else.
          </p>
          <p>
            <strong>Site analytics.</strong> We measure how the site is used so we know which
            material is worth producing. Vercel Analytics records aggregate page views without
            cookies and without identifying individual visitors. Where Google Analytics is
            enabled it records aggregate usage such as pages viewed, approximate region, and
            referring source; we do not use it to build advertising profiles, and we do not
            combine analytics data with anything you submit through the form.
          </p>
          <p>
            We do not attempt to identify individual visitors, and we do not track individual
            recipients of our emails.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiries are kept for two years from our last exchange with you, so that we have
            the context of a prior conversation, then deleted. Aggregate analytics are retained
            for fourteen months. Ask us at any point and we will delete your enquiry sooner.
          </p>

          <h2>Where it goes</h2>
          <p>
            This site is hosted by Vercel and email is delivered by Resend. Both process data
            on our behalf under their own terms, and both may process it outside your country
            of residence. We use no other third-party service that receives what you submit.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live &mdash; including under the UK and EU GDPR, and under
            Brazil&rsquo;s LGPD &mdash; you may have the right to ask for a copy of what we
            hold about you, to have it corrected or deleted, to object to how we use it, or to
            complain to your national data protection authority. Write to{" "}
            <Link href="mailto:danskimin@eti360.com">danskimin@eti360.com</Link> and we will
            act on it.
          </p>

          <h2>Cookies</h2>
          <p>
            This site sets no advertising or profiling cookies. Vercel Analytics is cookieless.
            If Google Analytics is enabled it sets its own measurement cookies; you can block
            these in your browser without affecting how the site works.
          </p>

          <h2>Changes</h2>
          <p>
            If what we collect changes, we update this notice and the date at the top of it.
          </p>
        </div>
      </section>
    </>
  );
}
