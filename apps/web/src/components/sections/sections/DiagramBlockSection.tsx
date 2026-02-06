import {DiagramBlock} from '@/components/DiagramBlock'
import type {SanityImageSource} from '@/lib/sanity/image'

export type DiagramBlockSectionValue = {
  diagramImage?: SanityImageSource
  diagramAlt?: string
  diagramCaption?: string
  placeholderLabel?: string
}

export function DiagramBlockSection({value}: {value: DiagramBlockSectionValue}) {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <DiagramBlock
          value={{
            image: value.diagramImage,
            alt: value.diagramAlt,
            caption: value.diagramCaption,
            placeholderLabel: value.placeholderLabel,
          }}
        />
      </div>
    </section>
  )
}
