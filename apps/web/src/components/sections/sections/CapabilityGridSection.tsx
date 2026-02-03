import {Markdown} from '../../Markdown'
import {SectionVisual} from './SectionVisual'

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

        {layout === 'flow' ? (
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
