type ResolvePreviewUrlParams = {
  doc: any
  schemaType: string
}

export function resolvePreviewUrl({doc, schemaType}: ResolvePreviewUrlParams): string {
  const baseUrl =
    process.env.SANITY_STUDIO_PREVIEW_URL ||
    process.env.SANITY_STUDIO_BASE_URL ||
    'http://localhost:3000'

  const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET
  if (!secret) return `${baseUrl}/`

  const slug = doc?.slug?.current

  if (schemaType === 'insight') {
    if (!slug) return `${baseUrl}/insights`
    return `${baseUrl}/api/draft?secret=${encodeURIComponent(secret)}&slug=${encodeURIComponent(
      `/insights/${slug}`,
    )}`
  }

  // schemaType === 'page'
  if (!slug || slug === 'home') {
    return `${baseUrl}/api/draft?secret=${encodeURIComponent(secret)}&slug=${encodeURIComponent('/')}`
  }

  return `${baseUrl}/api/draft?secret=${encodeURIComponent(secret)}&slug=${encodeURIComponent(`/${slug}`)}`
}

