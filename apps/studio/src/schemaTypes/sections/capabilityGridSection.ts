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
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Grid', value: 'grid'},
          {title: 'Flow (vertical)', value: 'flow'},
          {title: 'List', value: 'list'},
        ],
      },
      initialValue: 'grid',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'visual',
      title: 'Section visual (optional)',
      type: 'sectionVisual',
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
              name: 'icon',
              title: 'Icon (optional)',
              type: 'sectionVisual',
              description: 'Use for restrained schematic icons (monochrome).',
            }),
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
            select: {title: 'title', subtitle: 'icon.placeholderLabel'},
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
