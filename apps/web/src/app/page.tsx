import {draftMode} from 'next/headers'

import {SectionRenderer} from '@/components/sections/SectionRenderer'
import {getSanityClient} from '@/lib/sanity/client'
import {pageBySlugQuery} from '@/lib/sanity/queries'

export default async function HomePage() {
  const isDraft = (await draftMode()).isEnabled
  const client = getSanityClient({draftMode: isDraft})

  if (!client) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">ETI360</h1>
        <p className="mt-4 text-zinc-600">
          Sanity is not configured yet. Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
          `NEXT_PUBLIC_SANITY_API_VERSION` in `apps/web/.env.local`.
        </p>
      </main>
    )
  }

  const page = await client.fetch(pageBySlugQuery, {slug: 'home'})
  if (!page) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-3xl font-semibold tracking-tight">ETI360</h1>
        <p className="mt-4 text-zinc-600">
          No `page` document found with slug `home` in Sanity.
        </p>
      </main>
    )
  }

  return <SectionRenderer sections={page.sections ?? []} />
}
