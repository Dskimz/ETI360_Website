export type SanityPublicConfig = {
  projectId: string
  dataset: string
  apiVersion: string
}

export function getSanityPublicConfig(): SanityPublicConfig | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

  if (!projectId || !dataset || !apiVersion) return null
  return {projectId, dataset, apiVersion}
}

