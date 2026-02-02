import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'insightFeedSection',
  title: 'Insight listing',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'maxItems',
      title: 'Max items',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.required().min(1).max(24),
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title, subtitle: 'Insight listing'}),
  },
})

