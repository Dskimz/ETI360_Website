import Link from "next/link";
import { whatWeDoPage } from "@/content/what-we-do";

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
      <div className={`relative section-padding ${image ? "py-24 md:py-32" : ""}`}>
        <div className="container-narrow">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className={`heading-display max-w-3xl ${image ? "text-white" : ""}`}>
            {headline}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed ${
              image ? "text-white/80" : "body-text-secondary"
            }`}
          >
            {subhead}
          </p>
          {cta && (
            <div className="mt-8">
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

function CapabilityGrid({
  eyebrow,
  intro,
  cards,
  accent,
}: {
  eyebrow: string;
  intro?: string;
  cards: Array<{ title: string; body: string }>;
  accent?: boolean;
}) {
  return (
    <section className={`section-padding ${accent ? "bg-[var(--band-background)]" : ""}`}>
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        {intro && <p className="body-text-secondary mb-8 max-w-2xl">{intro}</p>}
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <div key={i} className="card">
              <h3 className="card-title">{card.title}</h3>
              <p className="body-text-secondary">{card.body}</p>
            </div>
          ))}
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
        <p className="text-white/70 max-w-xl mx-auto mb-8">{body}</p>
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

export default function WhatWeDoPage() {
  return (
    <main>
      <HeroSection {...whatWeDoPage.hero} />
      {whatWeDoPage.stages.map((stage, i) => (
        <CapabilityGrid
          key={stage.eyebrow}
          eyebrow={stage.eyebrow}
          intro={stage.intro}
          cards={stage.cards}
          accent={i % 2 === 1}
        />
      ))}
      <CtaBlock {...whatWeDoPage.cta} />
    </main>
  );
}
