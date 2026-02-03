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

        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={key} value={section} />
          case 'diagramBlockSection':
            return <DiagramBlockSection key={key} value={section} />
          case 'framingBlockSection':
            return <FramingBlockSection key={key} value={section} />
          case 'capabilityGridSection':
            return <CapabilityGridSection key={key} value={section} />
          case 'proofBlockSection':
            return <ProofBlockSection key={key} value={section} />
          case 'insightFeedSection':
            return <InsightFeedSection key={key} value={section} />
          case 'statsSection':
            return <StatsSection key={key} value={section} />
          case 'ctaBlockSection':
            return <CtaBlockSection key={key} value={section} />
          default:
            return (
              <section key={key} className="mx-auto max-w-5xl px-6 py-16">
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                  Unknown section type: <code>{section?._type ?? 'missing _type'}</code>
                </div>
              </section>
            )
        }
      })}
    </>
  )
}
