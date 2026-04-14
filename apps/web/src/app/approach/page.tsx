import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import { approachPage } from "@/content/approach";

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

/* ── Method Block ── */

function MethodBlock({
  eyebrow,
  headline,
  statement,
  outputs,
  accent,
}: {
  eyebrow: string;
  headline: string;
  statement: string;
  outputs: string[];
  accent?: boolean;
}) {
  return (
    <section className={`section-padding ${accent ? "bg-[var(--band-background)]" : ""}`}>
      <div className="container-narrow">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="heading-section mb-4">{headline}</h2>
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

/* ── Page ── */

export default function ApproachPage() {
  return (
    <main>
      <HeroSection {...approachPage.hero} />
      <OutputPanel
        eyebrow={approachPage.currentState.eyebrow}
        statement={approachPage.currentState.statement}
        outputs={approachPage.currentState.outputs}
      />
      {approachPage.methods.map((method, i) => (
        <MethodBlock
          key={method.eyebrow}
          eyebrow={method.eyebrow}
          headline={method.headline}
          statement={method.statement}
          outputs={method.outputs}
          accent={i % 2 === 0}
        />
      ))}
      <CtaBlock {...approachPage.cta} />
    </main>
  );
}
