export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug]
    | order(_updatedAt desc)[0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    seo,
    sections
  }
`

export const insightBySlugQuery = `
  *[_type == "insight" && slug.current == $slug]
    | order(_updatedAt desc)[0]{
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    contentMarkdown,
    publishedAt
  }
`

export const latestInsightsQuery = `
  *[_type == "insight"]
    | order(publishedAt desc, _createdAt desc)[0...$limit]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt
    }
`
