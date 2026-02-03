import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'diagramBlockSection',
  title: 'Diagram / visual block',
  type: 'object',
  fields: [
    defineField({
      name: 'diagramImage',
      title: 'Diagram image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'diagramAlt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.max(120),
      hidden: ({parent}) => !parent?.diagramImage,
    }),
    defineField({
      name: 'diagramCaption',
      title: 'Caption (optional)',
      type: 'string',
      validation: (Rule) => Rule.max(140),
    }),
    defineField({
      name: 'placeholderLabel',
      title: 'Placeholder second line',
      type: 'string',
      description:
        'Second line shown under “Diagram placeholder” when no image is provided (e.g., “From fragmented travel inputs…”).',
      validation: (Rule) => Rule.max(140),
    }),
  ],
  preview: {
    select: {title: 'diagramCaption', subtitle: 'placeholderLabel'},
    prepare: ({title, subtitle}) => ({
      title: title || 'Diagram block',
      subtitle,
    }),
  },
})

