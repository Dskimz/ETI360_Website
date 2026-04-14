import { HeroSection } from "@/components/HeroSection";
import {
  OutputPanel,
  OutputCardGrid,
  ProcessSteps,
  ComparisonTable,
  CtaBlock,
} from "@/components/Blocks";
import { forProvidersPage } from "@/content/for-providers";

export default function ForProvidersPage() {
  return (
    <main>
      <HeroSection {...forProvidersPage.hero} />
      <OutputPanel
        eyebrow={forProvidersPage.challenge.eyebrow}
        statement={forProvidersPage.challenge.statement}
        outputs={forProvidersPage.challenge.outputs}
      />
      <OutputCardGrid
        id="what-you-receive"
        eyebrow={forProvidersPage.whatYouReceive.eyebrow}
        lead={forProvidersPage.whatYouReceive.statement}
        cards={forProvidersPage.whatYouReceive.cards}
        band
      />
      <ProcessSteps
        eyebrow={forProvidersPage.process.eyebrow}
        headline={forProvidersPage.process.headline}
        steps={forProvidersPage.process.steps}
      />
      <ComparisonTable
        eyebrow={forProvidersPage.comparison.eyebrow}
        rows={forProvidersPage.comparison.rows}
        band
      />
      <CtaBlock {...forProvidersPage.cta} />
    </main>
  );
}
