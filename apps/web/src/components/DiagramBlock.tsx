import {SectionVisual} from '@/components/sections/sections/SectionVisual'
import type {SanityImageSource} from '@/lib/sanity/image'

type DiagramBlockValue = {
  image?: SanityImageSource
  alt?: string
  caption?: string
  placeholderLabel?: string
}

export function DiagramBlock({
  value,
  className,
}: {
  value?: DiagramBlockValue | null
  className?: string
}) {
  if (!value) return null

  return (
    <figure className={className}>
      <SectionVisual
        value={{
          style: 'diagram',
          image: value.image,
          alt: value.alt,
          placeholderLabel: value.placeholderLabel,
        }}
      />
      {value.caption ? (
        <figcaption className="mt-3 text-xs text-text-tertiary">{value.caption}</figcaption>
      ) : null}
    </figure>
  )
}
