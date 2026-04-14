import { HeroSection } from "@/components/HeroSection";
import {
  SectionIntro,
  OutputCard,
  OutputPanel,
  ProcessSteps,
  CtaBlock,
} from "@/components/Blocks";
import { forSchoolsPage } from "@/content/for-schools";

/* ── What You Receive — custom layout with TOB image ── */

function WhatYouReceive() {
  const { eyebrow, statement, cards } = forSchoolsPage.whatYouReceive;
  const [tobCard, ...otherCards] = cards;
  return (
    <section id="what-you-receive" className="section-padding section-band">
      <div className="container-narrow">
        <SectionIntro eyebrow={eyebrow} lead={statement} />
        {/* Trip Options Brief — featured with document image */}
        <div className="grid gap-8 md:grid-cols-2 items-start mb-6">
          <OutputCard title={tobCard.title} outputs={tobCard.outputs} />
          <div className="flex justify-center">
            <div
              style={{
                width: "100%",
                maxWidth: "240px",
                aspectRatio: "210 / 297",
                background: "var(--page-background)",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(1.5deg)",
                boxShadow:
                  "0 12px 40px rgba(13, 53, 88, 0.10), 0 4px 16px rgba(13, 53, 88, 0.06)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  textAlign: "center",
                  padding: "1.5rem",
                }}
              >
                Trip Options Brief image
              </p>
            </div>
          </div>
        </div>
        {/* Remaining cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {otherCards.map((card) => (
            <OutputCard key={card.title} title={card.title} outputs={card.outputs} />
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
      <ProcessSteps
        eyebrow={forSchoolsPage.process.eyebrow}
        headline={forSchoolsPage.process.headline}
        steps={forSchoolsPage.process.steps}
      />
      <OutputPanel
        eyebrow={forSchoolsPage.evidenceTrail.eyebrow}
        headline={forSchoolsPage.evidenceTrail.headline}
        statement={forSchoolsPage.evidenceTrail.statement}
        outputs={forSchoolsPage.evidenceTrail.outputs}
        band
      />
      <CtaBlock {...forSchoolsPage.cta} />
    </main>
  );
}
