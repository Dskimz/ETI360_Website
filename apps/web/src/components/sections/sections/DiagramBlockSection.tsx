import {DiagramBlock} from '@/components/DiagramBlock'

export function DiagramBlockSection({value}: {value: any}) {
  return (
    <section className="bg-background">
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

