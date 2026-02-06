import imageUrlBuilder from '@sanity/image-url'

import {getSanityPublicConfig} from './config'

type ImageUrlBuilder = ReturnType<typeof imageUrlBuilder>
export type SanityImageSource = Parameters<ImageUrlBuilder['image']>[0]

export function urlFor(source: SanityImageSource) {
  const cfg = getSanityPublicConfig()
  if (!cfg) return null

  const builder = imageUrlBuilder({
    projectId: cfg.projectId,
    dataset: cfg.dataset,
  })

  return builder.image(source)
}
