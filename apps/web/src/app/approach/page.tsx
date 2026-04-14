import { HeroSection } from "@/components/HeroSection";
import { OutputPanel, CtaBlock } from "@/components/Blocks";
import { approachPage } from "@/content/approach";

export default function ApproachPage() {
  return (
    <main>
      <HeroSection {...approachPage.hero} />
      <OutputPanel
        eyebrow={approachPage.currentState.eyebrow}
        statement={approachPage.currentState.statement}
        outputs={approachPage.currentState.outputs}
      />
      {approachPage.methods.map((method, i) => (
        <OutputPanel
          key={method.eyebrow}
          eyebrow={method.eyebrow}
          headline={method.headline}
          statement={method.statement}
          outputs={method.outputs}
          band={i % 2 === 0}
        />
      ))}
      <CtaBlock {...approachPage.cta} />
    </main>
  );
}
