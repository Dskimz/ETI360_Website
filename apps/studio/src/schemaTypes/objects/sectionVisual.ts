import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sectionVisual',
  title: 'Section visual',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Diagram', value: 'diagram'},
          {title: 'Document', value: 'document'},
          {title: 'Illustration', value: 'illustration'},
          {title: 'Icon', value: 'icon'},
        ],
      },
      initialValue: 'diagram',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      validation: (Rule) => Rule.max(120),
      hidden: ({parent}) => !parent?.image,
    }),
    defineField({
      name: 'placeholderLabel',
      title: 'Placeholder label',
      type: 'string',
      description: 'Shown when no image is provided (e.g., "[Diagram: …]").',
      validation: (Rule) => Rule.max(140),
    }),
  ],
})

