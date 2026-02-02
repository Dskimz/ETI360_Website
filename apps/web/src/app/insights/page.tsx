import Link from 'next/link'
import {draftMode} from 'next/headers'

import {SectionRenderer} from '@/components/sections/SectionRenderer'
import {getSanityClient} from '@/lib/sanity/client'
import {latestInsightsQuery, pageBySlugQuery} from '@/lib/sanity/queries'

export const dynamic = 'force-dynamic'

export default async function InsightsIndex() {
  const isDraft = (await draftMode()).isEnabled
  const client = getSanityClient({draftMode: isDraft})

  if (!client) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">Insights</h1>
        <p className="mt-4 text-zinc-600">
          Sanity is not configured yet.
        </p>
      </main>
    )
  }

  const cmsPage = await client.fetch(pageBySlugQuery, {slug: 'insights'})
  const items = await client.fetch(latestInsightsQuery, {limit: 30})

  return (
    <>
      {cmsPage?.sections?.length ? <SectionRenderer sections={cmsPage.sections} /> : null}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-baseline justify-between gap-6">
          <h1 className="text-3xl font-semibold tracking-tight">Insights</h1>
          <Link href="/api/disable-draft" className="text-sm text-zinc-600 underline underline-offset-4">
            Exit preview
          </Link>
        </div>
        <div className="mt-10 grid gap-6">
          {items.map((item: any) => (
            <article key={item._id} className="rounded-xl border border-zinc-200 p-6">
              <h2 className="text-xl font-semibold tracking-tight">
                <Link href={`/insights/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-zinc-600">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  )
}
