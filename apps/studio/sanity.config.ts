import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {Iframe} from 'sanity-plugin-iframe-pane'

import {schemaTypes} from './src/schemaTypes'
import {resolvePreviewUrl} from './src/preview/resolvePreviewUrl'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing env var: SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID fallback)',
  )
}

export default defineConfig({
  name: 'default',
  title: 'ETI360 Content',
  projectId,
  dataset,
  plugins: [
    deskTool({
      defaultDocumentNode: (S, {schemaType}) => {
        if (schemaType === 'page' || schemaType === 'insight') {
          return S.document().views([
            S.view.form(),
            S.view
              .component(Iframe)
              .options({
                url: (doc: any) => resolvePreviewUrl({doc, schemaType}),
                reload: {button: true},
              })
              .title('Preview'),
          ])
        }

        return S.document().views([S.view.form()])
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
