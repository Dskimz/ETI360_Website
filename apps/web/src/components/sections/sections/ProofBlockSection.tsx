import {Markdown} from '../../Markdown'

export function ProofBlockSection({value}: {value: any}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-border bg-secondary p-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-text-secondary sm:text-3xl">
            {value.headline}
          </h2>
          <div className="mt-4 max-w-3xl">
            <Markdown content={value.bodyMarkdown} />
          </div>
        </div>
      </div>
    </section>
  )
}
