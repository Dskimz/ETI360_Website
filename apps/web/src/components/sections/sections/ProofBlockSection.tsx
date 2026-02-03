import {Markdown} from '../../Markdown'
import {SectionVisual} from './SectionVisual'

export function ProofBlockSection({value}: {value: any}) {
  const visual = value.visual
  const isGovernance =
    typeof value.headline === 'string' && value.headline.toLowerCase().includes('governance')

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div
          className={[
            'rounded-2xl border border-border bg-secondary p-8',
            isGovernance ? 'border-l-4 border-l-accent' : '',
          ].join(' ')}
        >
          <div className={visual ? 'grid gap-10 lg:grid-cols-12 lg:items-start' : ''}>
            <div className={visual ? 'lg:col-span-7' : ''}>
              <h2 className="text-balance text-xl font-semibold tracking-tight text-text-secondary sm:text-2xl">
                {value.headline}
              </h2>
              <div className="mt-4 max-w-3xl">
                <Markdown content={value.bodyMarkdown} />
              </div>
            </div>

            {visual ? (
              <div className="lg:col-span-5">
                <SectionVisual value={visual} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
