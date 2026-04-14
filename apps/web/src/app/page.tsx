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

function FramingBlock({
  eyebrow,
  headline,
  body,
  accent,
}: {
  eyebrow?: string;
  headline?: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <section className={`section-padding ${accent ? "bg-[var(--accent-surface)]" : ""}`}>
      <div className="container-narrow max-w-3xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        {headline && <h2 className="heading-section mb-4">{headline}</h2>}
        {body.split("\n\n").map((p, i) => (
          <p key={i} className="body-text mt-4">
            {p}
          </p>
        ))}
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

/* ── Page-specific Sections ── */

function GovernanceCycle() {
  const { eyebrow, headline, body, stages } = homePage.governanceCycle;
  return (
    <section className="section-padding bg-[var(--band-background)]">
      <div className="container-narrow">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section mb-4">{headline}</h2>
        <p className="body-text max-w-3xl">{body}</p>
        <div className="mt-10 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
          {stages.map((stage, i) => (
            <React.Fragment key={stage.number}>
              <div
                className={`flex flex-col items-center text-center ${
                  stage.active ? "" : "opacity-50"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
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
                  className="mt-2 text-xs font-medium"
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
                <div className="w-8 h-px bg-[var(--border-color)]" />
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
        <div className="grid gap-6 md:grid-cols-2">
          {[schools, providers].map((audience) => (
            <div key={audience.eyebrow} className="card">
              <p className="eyebrow mb-3">{audience.eyebrow}</p>
              <p className="body-text-secondary">{audience.body}</p>
              <div className="mt-6">
                <Link
                  href={audience.cta.href}
                  className="text-sm font-semibold"
                  style={{ color: "var(--brand-navy)" }}
                >
                  {audience.cta.label} &rarr;
                </Link>
              </div>
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
        <h2 className="heading-section mb-8">{headline}</h2>
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
        <div className="mt-8">
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
      <FramingBlock
        eyebrow={homePage.wedge.eyebrow}
        headline={homePage.wedge.headline}
        body={homePage.wedge.body}
      />
      <GovernanceCycle />
      <AudienceRouting />
      <DocumentShowcase />
      <FramingBlock body={homePage.independence.body} eyebrow={homePage.independence.eyebrow} />
      <CtaBlock {...homePage.cta} />
    </main>
  );
}
