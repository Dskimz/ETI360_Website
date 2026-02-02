import {createClient, type ClientConfig} from '@sanity/client'

import {getSanityPublicConfig} from './config'

export function getSanityClient(params: {draftMode: boolean}) {
  const publicConfig = getSanityPublicConfig()
  if (!publicConfig) return null

  const config: ClientConfig = {
    projectId: publicConfig.projectId,
    dataset: publicConfig.dataset,
    apiVersion: publicConfig.apiVersion,
    useCdn: !params.draftMode,
    perspective: params.draftMode ? 'previewDrafts' : 'published',
  }

  if (params.draftMode) {
    const token = process.env.SANITY_READ_TOKEN
    if (!token) {
      throw new Error('Missing env var: SANITY_READ_TOKEN (required for draft preview)')
    }
    config.token = token
  }

  return createClient(config)
}

