import imageUrlBuilder from '@sanity/image-url'

import {getSanityPublicConfig} from './config'

export function urlFor(source: any) {
  const cfg = getSanityPublicConfig()
  if (!cfg) return null

  const builder = imageUrlBuilder({
    projectId: cfg.projectId,
    dataset: cfg.dataset,
  })

  return builder.image(source)
}

