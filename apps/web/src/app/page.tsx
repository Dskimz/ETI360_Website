import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/HeroSection";
import {
  SectionIntro,
  OutputPanel,
  OutputCardGrid,
  CtaBlock,
} from "@/components/Blocks";
import { homePage } from "@/content/home";
import { documents } from "@/content/documents";

/* ── Governance Cycle — page-specific visual ── */

function GovernanceCycle() {
  const { eyebrow, headline, statement, stages } = homePage.governanceCycle;
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} lead={statement} />
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

/* ── Audience Routing — page-specific cards ── */

function AudienceRouting() {
  const { schools, providers } = homePage.audienceRouting;
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid gap-8 md:grid-cols-2">
          {[schools, providers].map((audience) => (
            <div key={audience.eyebrow} className="output-card">
              <p className="eyebrow mb-4">{audience.eyebrow}</p>
              <p
                className="statement mb-6"
                style={{ fontSize: "1.125rem" }}
              >
                {audience.statement}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {audience.outputs.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      color: "var(--text-primary)",
                      paddingLeft: "1.25rem",
                      position: "relative" as const,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
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

/* ── Document Showcase — page-specific cards ── */

function DocumentShowcase() {
  const { eyebrow, headline, linkLabel, linkHref } = homePage.documentShowcase;
  const showcase = documents.slice(0, 4);
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} headline={headline} />
        <div className="grid gap-6 md:grid-cols-2">
          {showcase.map((doc) => (
            <div key={doc.title} className="output-card">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="output-card-title mb-0" style={{ marginBottom: 0 }}>
                  {doc.title}
                </h3>
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
        band
      />
      <CtaBlock {...homePage.cta} />
    </main>
  );
}
