import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'

import {SectionRenderer} from '@/components/sections/SectionRenderer'
import {getSanityClient} from '@/lib/sanity/client'
import {pageBySlugQuery} from '@/lib/sanity/queries'

export default async function CmsPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params
  const isDraft = (await draftMode()).isEnabled
  const client = getSanityClient({draftMode: isDraft})

  if (!client) notFound()

  const page = await client.fetch(pageBySlugQuery, {slug})
  if (!page) notFound()

  return <SectionRenderer sections={page.sections ?? []} />
}
