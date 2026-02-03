import {CtaBlockSection} from './sections/CtaBlockSection'
import {HeroSection} from './sections/HeroSection'
import {FramingBlockSection} from './sections/FramingBlockSection'
import {CapabilityGridSection} from './sections/CapabilityGridSection'
import {ProofBlockSection} from './sections/ProofBlockSection'
import {InsightFeedSection} from './sections/InsightFeedSection'
import {StatsSection} from './sections/StatsSection'
import {DiagramBlockSection} from './sections/DiagramBlockSection'

export type Section = Record<string, any> & {_type: string}

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
            rendered = <HeroSection value={section} />
            break
          case 'diagramBlockSection':
            rendered = <DiagramBlockSection value={section} />
            break
          case 'framingBlockSection':
            rendered = <FramingBlockSection value={section} />
            break
          case 'capabilityGridSection':
            rendered = <CapabilityGridSection value={section} />
            break
          case 'proofBlockSection':
            rendered = <ProofBlockSection value={section} />
            break
          case 'insightFeedSection':
            rendered = <InsightFeedSection value={section} />
            break
          case 'statsSection':
            rendered = <StatsSection value={section} />
            break
          case 'ctaBlockSection':
            rendered = <CtaBlockSection value={section} />
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
