import {CtaBlockSection, type CtaBlockSectionValue} from './sections/CtaBlockSection'
import {HeroSection, type HeroSectionValue} from './sections/HeroSection'
import {FramingBlockSection, type FramingBlockSectionValue} from './sections/FramingBlockSection'
import {CapabilityGridSection, type CapabilityGridSectionValue} from './sections/CapabilityGridSection'
import {ProofBlockSection, type ProofBlockSectionValue} from './sections/ProofBlockSection'
import {InsightFeedSection, type InsightFeedSectionValue} from './sections/InsightFeedSection'
import {StatsSection, type StatsSectionValue} from './sections/StatsSection'
import {DiagramBlockSection, type DiagramBlockSectionValue} from './sections/DiagramBlockSection'

export type Section = Record<string, unknown> & {_type: string; _key?: string}

export function SectionRenderer({sections}: {sections: Section[]}) {
  return (
    <>
      {sections.map((section, index) => {
        const key = section?._key || `${section?._type ?? 'unknown'}-${index}`
        const bandClass = index % 2 === 0 ? 'bg-background' : 'bg-band'
        const dividerClass = index === 0 ? '' : 'border-t border-border'

        let rendered: React.ReactNode = null
        switch (section._type) {
          case 'heroSection':
            rendered = <HeroSection value={section as unknown as HeroSectionValue} />
            break
          case 'diagramBlockSection':
            rendered = <DiagramBlockSection value={section as unknown as DiagramBlockSectionValue} />
            break
          case 'framingBlockSection':
            rendered = <FramingBlockSection value={section as unknown as FramingBlockSectionValue} />
            break
          case 'capabilityGridSection':
            rendered = <CapabilityGridSection value={section as unknown as CapabilityGridSectionValue} />
            break
          case 'proofBlockSection':
            rendered = <ProofBlockSection value={section as unknown as ProofBlockSectionValue} />
            break
          case 'insightFeedSection':
            rendered = <InsightFeedSection value={section as unknown as InsightFeedSectionValue} />
            break
          case 'statsSection':
            rendered = <StatsSection value={section as unknown as StatsSectionValue} />
            break
          case 'ctaBlockSection':
            rendered = <CtaBlockSection value={section as unknown as CtaBlockSectionValue} />
            break
          default:
            rendered = (
              <section className="mx-auto max-w-5xl px-6 py-16">
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                  Unknown section type: <code>{section?._type ?? 'missing _type'}</code>
                </div>
              </section>
            )
        }

        return (
          <div key={key} className={`${bandClass} ${dividerClass}`}>
            {rendered}
          </div>
        )
      })}
    </>
  )
}
