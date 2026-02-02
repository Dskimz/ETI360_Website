import {Markdown} from '../../Markdown'

export function FramingBlockSection({value}: {value: any}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {value.headline}
        </h2>
        <div className="mt-4 max-w-3xl">
          <Markdown content={value.bodyMarkdown} />
        </div>
      </div>
    </section>
  )
}

