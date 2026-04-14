import React from "react";
import Link from "next/link";
import { homePage } from "@/content/home";
import { documents } from "@/content/documents";

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

function GovernanceCycle() {
  const { eyebrow, headline, statement, stages } = homePage.governanceCycle;
  return (
    <section className="section-padding bg-[var(--band-background)]">
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section mb-4">{headline}</h2>
        <p className="statement">{statement}</p>
        <div className="mt-12 flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.number}>
              <div
                className={`flex flex-col items-center text-center ${
                  stage.active ? "" : "opacity-40"
                }`}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold"
                  style={{
                    background: stage.active
                      ? "var(--brand-gold)"
                      : "var(--border-color)",
                    color: stage.active
                      ? "var(--brand-navy)"
                      : "var(--text-tertiary)",
                  }}
                >
                  {stage.number}
                </div>
                <span
                  className="mt-3 text-sm font-medium"
                  style={{
                    color: stage.active
                      ? "var(--brand-navy)"
                      : "var(--text-tertiary)",
                  }}
                >
                  {stage.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="w-10 h-px bg-[var(--border-color)]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceRouting() {
  const { schools, providers } = homePage.audienceRouting;
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid gap-8 md:grid-cols-2">
          {[schools, providers].map((audience) => (
            <div key={audience.eyebrow} className="card">
              <p className="eyebrow mb-4">{audience.eyebrow}</p>
              <p className="statement mb-6" style={{ fontSize: "1.125rem" }}>
                {audience.statement}
              </p>
              <ul className="space-y-2 mb-6">
                {audience.outputs.map((item, i) => (
                  <li key={i} className="body-text-secondary flex gap-3">
                    <span
                      className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--brand-gold)" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={audience.cta.href}
                className="text-sm font-semibold"
                style={{ color: "var(--brand-navy)" }}
              >
                {audience.cta.label} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentShowcase() {
  const { eyebrow, headline, linkLabel, linkHref } = homePage.documentShowcase;
  const showcase = documents.slice(0, 4);
  return (
    <section className="section-padding bg-[var(--band-background)]">
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section mb-10">{headline}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {showcase.map((doc) => (
            <div key={doc.title} className="card">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="card-title mb-0">{doc.title}</h3>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-sm whitespace-nowrap"
                  style={{
                    background: "var(--accent-surface)",
                    color: "var(--brand-gold)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  {doc.stage}
                </span>
              </div>
              <p className="body-text-secondary">{doc.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href={linkHref}
            className="text-sm font-semibold"
            style={{ color: "var(--brand-navy)" }}
          >
            {linkLabel} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */

export default function HomePage() {
  return (
    <main>
      <HeroSection {...homePage.hero} />
      <OutputPanel
        eyebrow={homePage.wedge.eyebrow}
        headline={homePage.wedge.headline}
        statement={homePage.wedge.statement}
        outputs={homePage.wedge.outputs}
      />
      <GovernanceCycle />
      <AudienceRouting />
      <DocumentShowcase />
      <OutputPanel
        eyebrow={homePage.independence.eyebrow}
        statement={homePage.independence.statement}
        outputs={homePage.independence.outputs}
      />
      <CtaBlock {...homePage.cta} />
    </main>
  );
}
