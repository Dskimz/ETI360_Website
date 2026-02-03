import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'

function truncate(value, max) {
  const v = (value ?? '').trim().replace(/\s+/g, ' ')
  if (v.length <= max) return v
  return `${v.slice(0, max - 1)}…`
}

function parseMarkdownSections(markdown) {
  const parts = markdown.split(/\n---\n/g)
  const top = (parts[0] ?? '').trim()
  const rest = parts.slice(1).join('\n---\n')

  const h1Match = top.match(/^#\s+(.+)$/m)
  const h2Match = top.match(/^##\s+(.+)$/m)
  const h1 = h1Match?.[1]?.trim()
  const h2 = h2Match?.[1]?.trim()

  const lead = top
    .replace(/^#\s+.+$/m, '')
    .replace(/^##\s+.+$/m, '')
    .trim()

  const sections = []
  const chunks = rest.split(/\n##\s+/g).map((s) => s.trim()).filter(Boolean)
  for (const chunk of chunks) {
    const [headingLine, ...bodyLines] = chunk.split('\n')
    const heading = (headingLine ?? '').trim()
    const body = bodyLines.join('\n').trim()
    if (!heading) continue
    sections.push({heading, body})
  }

  return {h1, h2, lead, sections}
}

function bulletsFromMarkdown(body) {
  return body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '))
    .map((l) => l.slice(2).trim())
}

function makeSeo({title, description}) {
  return {
    _type: 'seo',
    title: truncate(title, 60),
    description: truncate(description, 160),
    noIndex: false,
  }
}

function firstParagraph(markdown) {
  const text = (markdown ?? '').trim()
  if (!text) return ''
  const parts = text.split(/\n\s*\n/g).map((p) => p.trim()).filter(Boolean)
  return parts[0] ?? ''
}

function toHero({eyebrow, headline, bodyMarkdown}) {
  return {
    _type: 'heroSection',
    eyebrow: eyebrow || undefined,
    headline: truncate(headline, 90),
    bodyMarkdown: bodyMarkdown?.trim() || ' ',
    primaryCtaLabel: 'Start a conversation',
    primaryCtaHref: '/contact',
  }
}

function toFraming({headline, bodyMarkdown}) {
  return {
    _type: 'framingBlockSection',
    headline: truncate(headline, 90),
    bodyMarkdown: bodyMarkdown?.trim() || ' ',
  }
}

function toProof({headline, bodyMarkdown}) {
  return {
    _type: 'proofBlockSection',
    headline: truncate(headline, 90),
    bodyMarkdown: bodyMarkdown?.trim() || ' ',
  }
}

function toCta({headline, bodyMarkdown}) {
  return {
    _type: 'ctaBlockSection',
    headline: truncate(headline, 90),
    bodyMarkdown: bodyMarkdown?.trim() || ' ',
    primaryCtaLabel: 'Start a conversation',
    primaryCtaHref: '/contact',
  }
}

function toCapabilityGrid({headline, bodyMarkdown}) {
  const bullets = bulletsFromMarkdown(bodyMarkdown)
  const items = bullets.slice(0, 12).map((line) => {
    const bold = line.match(/\*\*(.+?)\*\*/)
    const title = truncate((bold?.[1] ?? line).replace(/\*\*/g, ''), 60)
    const body = bold ? line.replace(bold[0], '').trim().replace(/^[-–—:]\s*/, '') : line
    return {_type: 'item', title, bodyMarkdown: body || ' '}
  })

  return {
    _type: 'capabilityGridSection',
    headline: truncate(headline, 90),
    items:
      items.length >= 2
        ? items
        : [
            {_type: 'item', title: 'Clarity', bodyMarkdown: bodyMarkdown?.trim() || ' '},
            {_type: 'item', title: 'Documentation', bodyMarkdown: bodyMarkdown?.trim() || ' '},
          ],
  }
}

function pageDoc({id, slug, title, seoTitle, seoDescription, sections}) {
  return {
    _id: id,
    _type: 'page',
    title,
    slug: {current: slug},
    seo: makeSeo({title: seoTitle, description: seoDescription}),
    sections,
  }
}

function insightDoc({id, slug, title, excerpt, contentMarkdown, publishedAt}) {
  return {
    _id: id,
    _type: 'insight',
    title,
    slug: {current: slug},
    excerpt: truncate(excerpt, 240),
    contentMarkdown,
    publishedAt,
  }
}

async function loadMarkdown(relPath) {
  const filePath = path.join(process.cwd(), relPath)
  return readFile(filePath, 'utf8')
}

async function main() {
  const homeMd = await loadMarkdown('01 - Website Pages/ETI360_Home_Page.md')
  const approachMd = await loadMarkdown('01 - Website Pages/ETI360_Approach_Page.md')
  const whatWeDoMd = await loadMarkdown('01 - Website Pages/ETI360_What_We_Do_Page.md')
  const aboutMd = await loadMarkdown('01 - Website Pages/ETI360_About_Page.md')
  const contactMd = await loadMarkdown('01 - Website Pages/ETI360_Contact_Page.md')
  const insightsMd = await loadMarkdown('01 - Website Pages/ETI360_Insights_Page.md')
  const tripRiskMd = await loadMarkdown('01 - Website Pages/ETI360_TripRisk360_Page.md')

  const home = parseMarkdownSections(homeMd)
  const approach = parseMarkdownSections(approachMd)
  const whatWeDo = parseMarkdownSections(whatWeDoMd)
  const about = parseMarkdownSections(aboutMd)
  const contact = parseMarkdownSections(contactMd)
  const insights = parseMarkdownSections(insightsMd)
  const tripRisk = parseMarkdownSections(tripRiskMd)

  const homeSections = []
  homeSections.push(
    toHero({
      eyebrow: home.h1 || 'ETI360',
      headline: home.h2 || home.h1 || 'ETI360',
      bodyMarkdown: home.lead,
    }),
  )
  for (const s of home.sections) {
    if (s.heading.toLowerCase().includes('how eti360 supports')) {
      homeSections.push(toCapabilityGrid({headline: s.heading, bodyMarkdown: s.body}))
    } else if (s.heading.toLowerCase().includes('built for leadership')) {
      homeSections.push(toProof({headline: s.heading, bodyMarkdown: s.body}))
    } else if (s.heading.toLowerCase().includes('start a conversation')) {
      homeSections.push(toCta({headline: s.heading, bodyMarkdown: s.body}))
    } else {
      homeSections.push(toFraming({headline: s.heading, bodyMarkdown: s.body}))
    }
  }

  const approachSections = [
    toHero({
      eyebrow: 'ETI360',
      headline: approach.h1 || 'ETI360’s approach',
      bodyMarkdown: approach.lead || firstParagraph(approachMd),
    }),
    ...approach.sections.map((s) => {
      if (s.heading.toLowerCase().includes('governance')) {
        return toProof({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('start a conversation')) {
        return toCta({headline: s.heading, bodyMarkdown: s.body})
      }
      return toFraming({headline: s.heading, bodyMarkdown: s.body})
    }),
  ]

  const whatWeDoSections = [
    toHero({
      eyebrow: 'ETI360',
      headline: whatWeDo.h1 || 'What we do',
      bodyMarkdown: whatWeDo.lead || firstParagraph(whatWeDoMd),
    }),
    ...whatWeDo.sections.map((s) => {
      if (s.heading.toLowerCase().includes('preparing trips')) {
        return toCapabilityGrid({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('governance')) {
        return toProof({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('start a conversation')) {
        return toCta({headline: s.heading, bodyMarkdown: s.body})
      }
      return toFraming({headline: s.heading, bodyMarkdown: s.body})
    }),
  ]

  const aboutSections = [
    toHero({
      eyebrow: 'ETI360',
      headline: about.h1 || 'About',
      bodyMarkdown: about.lead || firstParagraph(aboutMd),
    }),
    ...about.sections.map((s) => {
      if (s.heading.toLowerCase().includes('governance')) {
        return toProof({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('start a conversation')) {
        return toCta({headline: s.heading, bodyMarkdown: s.body})
      }
      return toFraming({headline: s.heading, bodyMarkdown: s.body})
    }),
  ]

  const contactSections = [
    toHero({
      eyebrow: 'ETI360',
      headline: contact.h1 || 'Contact',
      bodyMarkdown: contact.lead || firstParagraph(contactMd),
    }),
    ...contact.sections.map((s) => {
      if (s.heading.toLowerCase().includes('start a conversation')) {
        return toCta({headline: s.heading, bodyMarkdown: s.body})
      }
      return toFraming({headline: s.heading, bodyMarkdown: s.body})
    }),
  ]

  const insightsSections = [
    toHero({
      eyebrow: 'Insights',
      headline: insights.h1 || 'Insights',
      bodyMarkdown: insights.lead || firstParagraph(insightsMd),
    }),
    ...insights.sections
      .filter((s) => !s.heading.toLowerCase().includes('explore insights'))
      .map((s) => toFraming({headline: s.heading, bodyMarkdown: s.body})),
    {_type: 'insightFeedSection', headline: 'Explore Insights', maxItems: 12},
    toCta({
      headline: 'Start a conversation',
      bodyMarkdown:
        'If you have questions about how these ideas apply to your context, a conversation is the appropriate next step.',
    }),
  ]

  const tripRiskSections = [
    toHero({
      eyebrow: 'TripRisk360',
      headline: tripRisk.h1 || 'TripRisk360',
      bodyMarkdown: tripRisk.lead || firstParagraph(tripRiskMd),
    }),
    ...tripRisk.sections.map((s) => {
      if (s.heading.toLowerCase().includes('what triprisk360 produces')) {
        return toCapabilityGrid({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('governance')) {
        return toProof({headline: s.heading, bodyMarkdown: s.body})
      }
      if (s.heading.toLowerCase().includes('start a conversation')) {
        return toCta({headline: s.heading, bodyMarkdown: s.body})
      }
      return toFraming({headline: s.heading, bodyMarkdown: s.body})
    }),
  ]

  const docs = [
    pageDoc({
      id: 'home-page',
      slug: 'home',
      title: 'Home',
      seoTitle: home.h2 || 'ETI360',
      seoDescription: firstParagraph(home.lead || homeMd),
      sections: homeSections,
    }),
    // Prevent duplicate `home` slugs from earlier seeds by moving the old doc off `/`.
    pageDoc({
      id: 'page-home',
      slug: 'home-legacy',
      title: 'Home (legacy)',
      seoTitle: 'Home (legacy)',
      seoDescription: 'Legacy placeholder content (kept only to avoid slug collisions).',
      sections: [
        toHero({
          eyebrow: 'Legacy',
          headline: 'Home (legacy)',
          bodyMarkdown:
            'This document exists to avoid a duplicate `home` slug. It is not linked from navigation.',
        }),
      ],
    }),
    pageDoc({
      id: 'page-approach',
      slug: 'approach',
      title: 'ETI360’s Approach',
      seoTitle: 'ETI360’s Approach',
      seoDescription: firstParagraph(approach.lead || approachMd),
      sections: approachSections,
    }),
    pageDoc({
      id: 'page-what-we-do',
      slug: 'what-we-do',
      title: 'What We Do',
      seoTitle: 'What We Do',
      seoDescription: firstParagraph(whatWeDo.lead || whatWeDoMd),
      sections: whatWeDoSections,
    }),
    pageDoc({
      id: 'page-about',
      slug: 'about',
      title: 'About',
      seoTitle: 'About ETI360',
      seoDescription: firstParagraph(about.lead || aboutMd),
      sections: aboutSections,
    }),
    pageDoc({
      id: 'page-contact',
      slug: 'contact',
      title: 'Contact',
      seoTitle: 'Contact',
      seoDescription: firstParagraph(contact.lead || contactMd),
      sections: contactSections,
    }),
    pageDoc({
      id: 'page-insights',
      slug: 'insights',
      title: 'Insights',
      seoTitle: 'Insights',
      seoDescription: firstParagraph(insights.lead || insightsMd),
      sections: insightsSections,
    }),
    pageDoc({
      id: 'page-triprisk360',
      slug: 'triprisk360',
      title: 'TripRisk360',
      seoTitle: 'TripRisk360',
      seoDescription: firstParagraph(tripRisk.lead || tripRiskMd),
      sections: tripRiskSections,
    }),
    insightDoc({
      id: 'insight-hello-world',
      slug: 'preparation-and-review',
      title: 'Preparation and review: what leadership needs',
      excerpt:
        'A practical overview of what decision-ready travel documentation should make clear at the point of leadership review.',
      contentMarkdown:
        '# Preparation and review: what leadership needs\n\nSchool-sponsored travel decisions improve when leadership reviews a coherent, decision-ready picture of the trip.\n\n## What decision-ready materials clarify\n\n- What students will be doing, by day and by activity\n- Where activities, accommodations, meals, and movements take place\n- How the trip progresses over time\n- What documentation supports oversight and contingency planning\n\n## What this enables\n\nDecision-ready documentation helps leadership discuss approvals with clarity, maintain a traceable record of review, and reference decisions after the fact.\n',
      publishedAt: new Date().toISOString(),
    }),
  ]

  const outPath = path.join(process.cwd(), 'apps/studio/seed-content.ndjson')
  const ndjson = docs.map((d) => JSON.stringify(d)).join('\n') + '\n'
  await writeFile(outPath, ndjson, 'utf8')

  console.log(`Wrote ${docs.length} documents to ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
