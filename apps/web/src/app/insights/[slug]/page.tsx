import {notFound} from 'next/navigation'
import Link from 'next/link'
import {draftMode} from 'next/headers'

import {Markdown} from '@/components/Markdown'
import {getSanityClient} from '@/lib/sanity/client'
import {insightBySlugQuery} from '@/lib/sanity/queries'

export default async function InsightPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const isDraft = (await draftMode()).isEnabled
  const client = getSanityClient({draftMode: isDraft})

  if (!client) notFound()

  const insight = await client.fetch(insightBySlugQuery, {slug})
  if (!insight) notFound()

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-baseline justify-between gap-6">
        <Link href="/insights" className="text-sm text-zinc-600 underline underline-offset-4">
          Back to Insights
        </Link>
        <Link href="/api/disable-draft" className="text-sm text-zinc-600 underline underline-offset-4">
          Exit preview
        </Link>
      </div>
      <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight">{insight.title}</h1>
      <p className="mt-4 text-zinc-600">{insight.excerpt}</p>
      <div className="mt-10">
        <Markdown content={insight.contentMarkdown} />
      </div>
    </main>
  )
}
