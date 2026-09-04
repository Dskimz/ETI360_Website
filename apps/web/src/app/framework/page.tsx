import type { Metadata } from "next";
import Link from "next/link";
import { DocRow, TierBand } from "../../components/DocShowcase";
import { DocRowsExpander } from "../../components/DocRowsExpander";
import {
  schoolTier1,
  schoolTier2Featured,
  schoolTier2More,
  schoolTier3,
} from "../../components/docLibrary";

export const metadata: Metadata = {
  title: "ETI360’s 3-Tier Risk Framework",
  description:
    "The three tiers of the ETI360 framework shown as what a school actually receives — the annual Organizational Baseline, the Tier 2 Trip Risk Review pack, and Tier 3 Dynamic Risk Operations — every document openable as a real PDF.",
  alternates: { canonical: "/framework" },
  openGraph: {
    images: ["/marketing/og-default.png"],
    title: "ETI360’s 3-Tier Risk Framework",
    description:
      "The three tiers of the ETI360 framework shown as what a school actually receives — every document openable as a real PDF.",
    type: "website",
  },
};

export default function FrameworkPage() {
  return (
    <>
      <section
        className="article-header"
        style={{
          ["--hero-bg" as string]: "url('/marketing/hero/trip-approval.jpg')",
        } as React.CSSProperties}
      >
        <div className="container measure">
          <p className="label label-light ui">The Framework</p>
          <h1>Three questions every school answers about travel. One framework.</h1>
          <p className="subtitle">
            Each tier answers one of them &mdash; and every answer is a document
            you can open.
          </p>
        </div>
      </section>

      <section className="article-body">
        <div className="container measure">
          <p className="lead">
            A school trip is a sequence of decisions: whether the program fits,
            how the days will run, what families should know, what has been
            assessed and what stands ready, who watches while the group travels,
            and what next year&rsquo;s planning learns from this one. ETI360
            prepares a document for each of those decisions. Open any thumbnail
            to read the document itself.
          </p>
          <p className="artifact-reader ui">
            The documents shown are from a fully worked example for Harborview
            International School. It is fictitious by design, so every page can
            be shown in full &mdash; no real school&rsquo;s or provider&rsquo;s
            documents are ever shown. For your school, every document is
            produced the same way: in your branding and your voice, from your
            trip&rsquo;s own data.
          </p>
        </div>

        <TierBand
          n={1}
          id="tier1"
          eyebrow="Tier One · Annual"
          name="Organizational Baseline"
          desc="Where does our travel governance stand? One documented review of where the school and its providers stand before the year's trips begin — policies, roles, evidence, and standing arrangements across ten operational capability areas."
        />
        <div className="doc-rows">
          {schoolTier1.map((e) => (
            <DocRow key={e.anchor} e={e} eager />
          ))}
        </div>

        <TierBand
          n={2}
          id="tier2"
          eyebrow="Tier Two · Every trip"
          name="Trip Risk Review"
          desc="Is this trip ready for approval? A consistent set of documents for leadership review, from the trip overview to the information parents receive."
        />
        <div className="doc-rows">
          {schoolTier2Featured.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>
        <DocRowsExpander
          items={schoolTier2More}
          label="See five more Tier 2 documents"
        />

        <TierBand
          n={3}
          id="tier3"
          eyebrow="Tier Three · During and after"
          name="Dynamic Risk Operations"
          desc="Do we know what's happening while they're away? The working views for the days away, and the record the trip carries home into next year's planning."
        />
        <div className="doc-rows">
          {schoolTier3.map((e) => (
            <DocRow key={e.anchor} e={e} />
          ))}
        </div>

      </section>

      <section className="cta-section">
        <div className="container measure">
          <h2>Contact us.</h2>
          <p>
            Tell us about your program and we will show you the connected
            outputs that fit it. We respond within two business days.
          </p>
          <p>
            <Link href="/contact" className="cta-button ui">
              Get in touch
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
