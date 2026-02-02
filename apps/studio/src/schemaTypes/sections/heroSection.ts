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

