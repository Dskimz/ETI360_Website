import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { aboutPage } from "@/content/about";

/* ── Shared Section Components ── */

function OutputPanel({
  eyebrow,
  headline,
  statement,
  outputs,
  accent,
}: {
  eyebrow?: string;
  headline?: string;
  statement: string;
  outputs: string[];
  accent?: boolean;
}) {
  return (
    <section className={`section-padding ${accent ? "bg-[var(--band-background)]" : ""}`}>
      <div className="container-narrow">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          {headline && <h2 className="heading-section mb-5">{headline}</h2>}
          <p className="statement mb-8">{statement}</p>
          <div className="output-panel">
            <ul>
              {outputs.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBlock({
  headline,
  body,
  cta,
}: {
  headline: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="section-padding" style={{ background: "var(--brand-navy)" }}>
      <div className="container-narrow text-center">
        <h2 className="text-3xl font-semibold text-white mb-4">{headline}</h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">{body}</p>
        <Link
          href={cta.href}
          className="btn-primary"
          style={{ background: "var(--brand-gold)", color: "var(--brand-navy)" }}
        >
          {cta.label}
        </Link>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function AboutPage() {
  return (
    <main>
      <HeroSection {...aboutPage.hero} />
      <OutputPanel
        eyebrow={aboutPage.definition.eyebrow}
        statement={aboutPage.definition.statement}
        outputs={aboutPage.definition.outputs}
      />
      <OutputPanel
        eyebrow={aboutPage.independence.eyebrow}
        statement={aboutPage.independence.statement}
        outputs={aboutPage.independence.outputs}
        accent
      />
      <OutputPanel
        eyebrow={aboutPage.standards.eyebrow}
        statement={aboutPage.standards.statement}
        outputs={aboutPage.standards.outputs}
      />
      <CtaBlock {...aboutPage.cta} />
    </main>
  );
}
