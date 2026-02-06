import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'bodyMarkdown',
      title: 'Body (Markdown)',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'mediaAlt',
      title: 'Media alt text',
      type: 'string',
      validation: (Rule) => Rule.max(120),
      hidden: ({parent}) => !parent?.media,
    }),
    defineField({
      name: 'showMediaPlaceholder',
      title: 'Show media placeholder (if no image)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mediaPlaceholderLabel',
      title: 'Media placeholder label',
      type: 'string',
      description: 'Shown when no image is provided (e.g., "[Diagram: …]").',
      validation: (Rule) =>
        Rule.max(140).custom((value, context) => {
          const parent = context?.parent as any
          if (!parent?.showMediaPlaceholder) return true
          if (typeof value === 'string' && value.trim().length > 0) return true
          return 'Provide a placeholder label or disable “Show media placeholder”.'
        }),
      hidden: ({parent}) => !parent?.showMediaPlaceholder,
    }),
    defineField({
      name: 'sideCard',
      title: 'Side card (optional)',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.max(80),
        }),
        defineField({
          name: 'bodyMarkdown',
          title: 'Body (Markdown)',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.max(600),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'CTA label',
          type: 'string',
          validation: (Rule) => Rule.max(40),
        }),
        defineField({
          name: 'ctaHref',
          title: 'CTA link',
          type: 'string',
          validation: (Rule) => Rule.max(200),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value: any) => {
          if (!value) return true
          const hasHref = typeof value.ctaHref === 'string' && value.ctaHref.trim().length > 0
          const hasLabel = typeof value.ctaLabel === 'string' && value.ctaLabel.trim().length > 0
          if (hasHref && !hasLabel) return 'Side card CTA label is required when a CTA link is set.'
          if (hasLabel && !hasHref) return 'Side card CTA link is required when a CTA label is set.'
          return true
        }),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      options: {list: [{title: 'Start a conversation', value: 'Start a conversation'}]},
      initialValue: 'Start a conversation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA link',
      type: 'string',
      initialValue: '/contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label (optional)',
      type: 'string',
      initialValue: 'Read Insights',
      validation: (Rule) =>
        Rule.max(40).custom((value, context) => {
          const parent = context?.parent as any
          const hasHref = typeof parent?.secondaryCtaHref === 'string' && parent.secondaryCtaHref.trim().length > 0
          const hasLabel = typeof value === 'string' && value.trim().length > 0
          if (hasHref && !hasLabel) return 'Secondary CTA label is required when a secondary CTA link is set.'
          return true
        }),
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA link (optional)',
      type: 'string',
      initialValue: '/insights',
      validation: (Rule) =>
        Rule.max(200).custom((value, context) => {
          const parent = context?.parent as any
          const hasLabel =
            typeof parent?.secondaryCtaLabel === 'string' && parent.secondaryCtaLabel.trim().length > 0
          const hasHref = typeof value === 'string' && value.trim().length > 0
          if (hasLabel && !hasHref) return 'Secondary CTA link is required when a secondary CTA label is set.'
          return true
        }),
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title, subtitle: 'Hero'}),
  },
})
