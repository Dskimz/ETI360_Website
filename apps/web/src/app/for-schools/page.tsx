import Link from "next/link";
import { forSchoolsPage } from "@/content/for-schools";

/* ── Shared Section Components ── */

function HeroSection({
  eyebrow,
  headline,
  subhead,
  cta,
  image,
}: {
  eyebrow?: string | null;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string } | null;
  image?: string | null;
}) {
  return (
    <section className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[var(--brand-navy)]/80" />
        </div>
      )}
      <div className={`relative section-padding ${image ? "py-28 md:py-36" : ""}`}>
        <div className="container-narrow">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className={`heading-display max-w-3xl ${image ? "text-white" : ""}`}>
            {headline}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-xl leading-relaxed ${
              image ? "text-white/80" : "body-text-secondary"
            }`}
          >
            {subhead}
          </p>
          {cta && (
            <div className="mt-10">
              <Link href={cta.href} className="btn-primary">
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

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

/* ── Page-specific Sections ── */

function WhatYouReceive() {
  const { eyebrow, statement, cards } = forSchoolsPage.whatYouReceive;
  return (
    <section className="section-padding bg-[var(--band-background)]">
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <p className="statement mb-10">{statement}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <div key={card.title} className="card">
              <h3 className="card-title">{card.title}</h3>
              <ul className="space-y-2">
                {card.outputs.map((item, i) => (
                  <li key={i} className="body-text-secondary flex gap-3">
                    <span
                      className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--brand-gold)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSteps() {
  const { eyebrow, headline, steps } = forSchoolsPage.process;
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section mb-10">{headline}</h2>
        <div className="max-w-2xl space-y-8">
          {steps.map((step) => (
            <div key={step.number} className="process-step">
              <div className="process-step-number">{step.number}</div>
              <div>
                <p className="process-step-title">{step.title}</p>
                <p className="process-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function ForSchoolsPage() {
  return (
    <main>
      <HeroSection {...forSchoolsPage.hero} />
      <OutputPanel
        eyebrow={forSchoolsPage.challenge.eyebrow}
        statement={forSchoolsPage.challenge.statement}
        outputs={forSchoolsPage.challenge.outputs}
      />
      <WhatYouReceive />
      <ProcessSteps />
      <OutputPanel
        eyebrow={forSchoolsPage.evidenceTrail.eyebrow}
        headline={forSchoolsPage.evidenceTrail.headline}
        statement={forSchoolsPage.evidenceTrail.statement}
        outputs={forSchoolsPage.evidenceTrail.outputs}
        accent
      />
      <CtaBlock {...forSchoolsPage.cta} />
    </main>
  );
}
