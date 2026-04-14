import { HeroSection } from "@/components/HeroSection";
import { OutputCardGrid, CtaBlock } from "@/components/Blocks";
import { whatWeDoPage } from "@/content/what-we-do";

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
      <CtaBlock {...whatWeDoPage.cta} />
    </main>
  );
}
