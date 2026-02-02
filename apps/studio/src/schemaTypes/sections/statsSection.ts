import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsSection',
  title: 'Stats strip',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Stat',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(90),
            }),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
  ],
  preview: {
    select: {title: 'items.0.value', subtitle: 'items.0.label'},
    prepare: ({title, subtitle}) => ({
      title: title ? `Stats (${title})` : 'Stats strip',
      subtitle,
    }),
  },
})

