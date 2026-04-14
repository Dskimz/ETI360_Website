import { HeroSection } from "@/components/HeroSection";
import {
  OutputPanel,
  OutputCardGrid,
  ProcessSteps,
  CtaBlock,
} from "@/components/Blocks";
import { forSchoolsPage } from "@/content/for-schools";

export default function ForSchoolsPage() {
  return (
    <main>
      <HeroSection {...forSchoolsPage.hero} />
      <OutputPanel
        eyebrow={forSchoolsPage.challenge.eyebrow}
        statement={forSchoolsPage.challenge.statement}
        outputs={forSchoolsPage.challenge.outputs}
      />
      <OutputCardGrid
        id="what-you-receive"
        eyebrow={forSchoolsPage.whatYouReceive.eyebrow}
        lead={forSchoolsPage.whatYouReceive.statement}
        cards={forSchoolsPage.whatYouReceive.cards}
        band
      />
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
