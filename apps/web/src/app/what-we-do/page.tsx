import { HeroSection } from "@/components/HeroSection";
import { SectionIntro, OutputCardGrid, CtaBlock } from "@/components/Blocks";
import { whatWeDoPage } from "@/content/what-we-do";
import { approachPage } from "@/content/approach";

/* ── Methodology — absorbed from Approach page ── */

function Methodology() {
  /* Use the 4 methods (skip Independence — it appears on homepage) */
  const methods = approachPage.methods.slice(0, 4);
  return (
    <section className="section-padding section-band">
      <div className="container-narrow">
        <SectionIntro
          eyebrow="THE METHODOLOGY"
          headline="Traceable Methods. Sourced Scores."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {methods.map((method) => (
            <div key={method.eyebrow} className="methodology-block">
              <p className="eyebrow mb-2">{method.eyebrow}</p>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--brand-navy)",
                  marginBottom: "0.5rem",
                }}
              >
                {method.headline}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                  color: "var(--text-tertiary)",
                  marginBottom: "0.75rem",
                }}
              >
                {method.statement}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                {method.outputs.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.5,
                      color: "var(--text-primary)",
                      paddingLeft: "1rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.55em",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--brand-gold)",
                      }}
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

/* ── Page ── */

export default function WhatWeDoPage() {
  return (
    <main>
      <HeroSection {...whatWeDoPage.hero} />
      {whatWeDoPage.stages.map((stage, i) => (
        <OutputCardGrid
          key={stage.eyebrow}
          eyebrow={stage.eyebrow}
          lead={stage.statement}
          cards={stage.cards}
          columns={stage.cards.length >= 3 ? 3 : undefined}
          band={i % 2 === 1}
        />
      ))}
      <Methodology />
      <CtaBlock {...whatWeDoPage.cta} />
    </main>
  );
}
