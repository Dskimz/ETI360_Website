import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'capabilityGridSection',
  title: 'Capability grid',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'bodyMarkdown',
              title: 'Body (Markdown)',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().max(500),
            }),
          ],
          preview: {
            select: {title: 'title'},
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(12),
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title, subtitle: 'Capability grid'}),
  },
})

