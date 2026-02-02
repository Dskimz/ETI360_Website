import {Markdown} from '../../Markdown'

export function CapabilityGridSection({value}: {value: any}) {
  const items = Array.isArray(value.items) ? value.items : []

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {value.headline}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item: any, index: number) => (
            <div key={item?._key ?? index} className="rounded-xl border border-zinc-200 p-6">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <div className="mt-3 text-sm text-zinc-700">
                <Markdown content={item.bodyMarkdown} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

