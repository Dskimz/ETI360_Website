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
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title, subtitle: 'Hero'}),
  },
})
