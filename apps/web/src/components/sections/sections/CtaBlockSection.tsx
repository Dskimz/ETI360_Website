import Link from 'next/link'

import {Markdown} from '../../Markdown'

export function CtaBlockSection({value}: {value: any}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {value.headline}
          </h2>
          <div className="mt-4 max-w-3xl">
            <Markdown content={value.bodyMarkdown} />
          </div>
          {value.primaryCtaHref ? (
            <div className="mt-8">
              <Link
                href={value.primaryCtaHref}
                className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
              >
                {value.primaryCtaLabel ?? 'Start a conversation'}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

