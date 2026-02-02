import Link from 'next/link'

import {Markdown} from '../../Markdown'

export function HeroSection({value}: {value: any}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {value.eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-zinc-600">{value.eyebrow}</p>
        ) : null}
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {value.headline}
        </h1>
        <div className="mt-6 max-w-2xl">
          <Markdown content={value.bodyMarkdown} />
        </div>
        {value.primaryCtaHref ? (
          <div className="mt-10">
            <Link
              href={value.primaryCtaHref}
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
            >
              {value.primaryCtaLabel ?? 'Start a conversation'}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

