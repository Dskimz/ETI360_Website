import {Markdown} from '../../Markdown'
import {SectionVisual} from './SectionVisual'
import {IconChain, IconChecklist, IconDocuments, IconTimeline} from '@/components/icons/ETIIcons'

function defaultCardIcon(index: number) {
  switch (index % 4) {
    case 0:
      return IconTimeline
    case 1:
      return IconDocuments
    case 2:
      return IconChecklist
    default:
      return IconChain
  }
}

export function CapabilityGridSection({value}: {value: any}) {
  const items = Array.isArray(value.items) ? value.items : []
  const layout = value.layout ?? 'grid'
  const visual = value.visual

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="border-t border-border pt-10">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-text-secondary sm:text-2xl">
            {value.headline}
          </h2>
        </div>

        {visual ? (
          <div className="mt-8">
            <SectionVisual value={visual} />
          </div>
        ) : null}

        {layout === 'cards' ? (
          <div
            className={[
              'mt-10 grid gap-6 sm:grid-cols-2',
              items.length <= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
            ].join(' ')}
          >
            {items.map((item: any, index: number) => {
              const Icon = defaultCardIcon(index)
              return (
                <div key={item?._key ?? index} className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-text-secondary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-text-secondary">{item.title}</h3>
                  </div>
                  <div className="mt-3 text-sm text-text-primary">
                    <Markdown content={item.bodyMarkdown} />
                  </div>
                </div>
              )
            })}
          </div>
        ) : layout === 'flow' ? (
          <div className="mt-10">
            <ol className="relative space-y-10 border-l border-border pl-6">
              {items.map((item: any, index: number) => (
                <li key={item?._key ?? index} className="relative">
                  <div className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-text-secondary">
                    {index + 1}
                  </div>
                  <div className="flex gap-4">
                    <SectionVisual value={item.icon} className="mt-0.5 shrink-0" size="sm" />
                    <div>
                      <h3 className="text-base font-semibold text-text-secondary">{item.title}</h3>
                      <div className="mt-2 text-sm text-text-primary">
                        <Markdown content={item.bodyMarkdown} />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : layout === 'list' ? (
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border">
            {items.map((item: any, index: number) => (
              <div key={item?._key ?? index} className="flex gap-4 p-6">
                <SectionVisual value={item.icon} className="mt-0.5 shrink-0" size="sm" />
                <div>
                  <h3 className="text-base font-semibold text-text-secondary">{item.title}</h3>
                  <div className="mt-2 text-sm text-text-primary">
                    <Markdown content={item.bodyMarkdown} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {items.map((item: any, index: number) => (
              <div key={item?._key ?? index} className="grid gap-4">
                {item.icon?.style === 'diagram' ? (
                  <SectionVisual
                    value={item.icon}
                    frameClassName="h-[180px] w-full rounded-2xl border border-dashed border-border bg-secondary"
                  />
                ) : item.icon ? (
                  <SectionVisual value={item.icon} className="shrink-0" size="sm" />
                ) : null}
                <div>
                  <h3 className="text-base font-semibold text-text-secondary">{item.title}</h3>
                  <div className="mt-2 text-sm text-text-primary">
                    <Markdown content={item.bodyMarkdown} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
