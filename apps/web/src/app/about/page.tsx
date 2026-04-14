import { HeroSection } from "@/components/HeroSection";
import { OutputPanel, CtaBlock } from "@/components/Blocks";
import { aboutPage } from "@/content/about";

export default function AboutPage() {
  return (
    <main>
      <HeroSection {...aboutPage.hero} />
      <OutputPanel
        eyebrow={aboutPage.definition.eyebrow}
        statement={aboutPage.definition.statement}
        outputs={aboutPage.definition.outputs}
      />
      <OutputPanel
        eyebrow={aboutPage.independence.eyebrow}
        statement={aboutPage.independence.statement}
        outputs={aboutPage.independence.outputs}
        band
      />
      <OutputPanel
        eyebrow={aboutPage.standards.eyebrow}
        statement={aboutPage.standards.statement}
        outputs={aboutPage.standards.outputs}
      />
      <CtaBlock {...aboutPage.cta} />
    </main>
  );
}
