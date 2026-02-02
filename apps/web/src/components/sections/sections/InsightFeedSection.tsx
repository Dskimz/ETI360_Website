import Link from 'next/link'

export function InsightFeedSection({value}: {value: any}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {value.headline}
          </h2>
          <Link href="/insights" className="text-sm font-medium text-foreground underline underline-offset-4">
            View all
          </Link>
        </div>
        <p className="mt-4 text-sm text-zinc-600">
          This section is content-driven. Once Sanity is connected, it will list the latest Insights.
        </p>
      </div>
    </section>
  )
}

