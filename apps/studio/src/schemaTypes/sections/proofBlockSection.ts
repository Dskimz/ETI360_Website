import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'proofBlockSection',
  title: 'Credibility & rigor',
  type: 'object',
  fields: [
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
      rows: 8,
      validation: (Rule) => Rule.required().max(900),
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title, subtitle: 'Credibility & rigor'}),
  },
})

