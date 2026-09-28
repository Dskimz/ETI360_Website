import type { Metadata } from "next";
import Link from "next/link";

const DESCRIPTION =
  "What ETI360 collects through this website, why, how long it is kept, and how to ask for it to be removed.";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy notice — ETI360",
    description: DESCRIPTION,
    type: "website",
    images: ["/marketing/og-default.png"],
  },
};

// Last substantive review of this notice. Update when what we collect changes.
// September 2026 (four-product site, spec §4.8): the form's "School" field and
// product note, document opens, and document storage on AWS.
const UPDATED = "September 27, 2026";

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
            <strong>The contact form.</strong> When you use the contact form we collect your
            name, school, role, email address, country, and what you would like to
            discuss. If you reach the form from a product page, it also notes which
            product. We use these details only to answer your inquiry and to find a time
            to talk if you want one. The lawful basis is our legitimate interest in
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
            cookies and without identifying individual visitors. Google Analytics runs only if
            you accept it when asked, and records pages viewed, approximate location, and
            referring source; we do not use it to build advertising profiles, and we do not
            combine analytics data with anything you submit through the form.
          </p>
          <p>
            When we write to a school, the links in that email carry a tag naming the school
            and the topic, so we can tell which material was of interest. The tag records the
            school, never a person, and we do not use tracking pixels to detect whether an
            email has been opened. Opening a document from the site is recorded the same
            way, as the document, the paper size, and the approximate location. That record
            holds no name, email address, or IP address.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Inquiries are kept for two years from our last exchange with you, so that we have
            the context of a prior conversation, then deleted. Aggregate analytics are retained
            for fourteen months. Ask us at any point and we will delete your inquiry sooner.
          </p>

          <h2>Where it goes</h2>
          <p>
            This site is hosted by Vercel and email is delivered by Resend. Both process data
            on our behalf under their own terms, and both may process it outside your country
            of residence. Documents open from ETI360&rsquo;s storage on Amazon Web Services. We
            use no other third-party service that receives what you submit.
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
            This site sets no advertising or profiling cookies. Vercel Analytics is cookieless
            and runs on every visit. Google Analytics sets measurement cookies and loads only
            after you accept it; declining changes nothing about how the site works. Your
            choice is remembered in your own browser and you can change it at any time through
            Cookie settings in the footer.
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
