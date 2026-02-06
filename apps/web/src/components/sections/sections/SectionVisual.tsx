import {urlFor} from '@/lib/sanity/image'
import type {SanityImageSource} from '@/lib/sanity/image'

export type SectionVisualValue = {
  style?: 'diagram' | 'document' | 'illustration' | 'icon'
  image?: SanityImageSource
  alt?: string
  placeholderLabel?: string
}

function visualFrameClass(style: NonNullable<SectionVisualValue['style']>) {
  if (style === 'icon') {
    return 'h-11 w-11 rounded-xl border border-border bg-background'
  }

  if (style === 'document') {
    return 'h-[220px] w-full rounded-2xl border border-border bg-background sm:h-[320px]'
  }

  return 'h-[220px] w-full rounded-2xl border border-dashed border-border bg-secondary sm:h-[320px]'
}

export function SectionVisual({
  value,
  className,
  size = 'md',
  frameClassName,
}: {
  value?: SectionVisualValue | null
  className?: string
  size?: 'sm' | 'md'
  frameClassName?: string
}) {
  const style = (value?.style ?? 'diagram') as NonNullable<SectionVisualValue['style']>
  const url =
    value?.image && urlFor(value.image)?.width(style === 'icon' ? 96 : 1200).auto('format').url()
  if (style === 'icon' && !url) return null

  const placeholderLabel = value?.placeholderLabel?.trim() || null

  if (!url && !placeholderLabel) return null

  const frame = frameClassName || visualFrameClass(style)
  const padding = style === 'icon' ? '' : size === 'sm' ? 'p-5' : 'p-6'

  return (
    <div className={className}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={value?.alt ?? ''}
          className={`${frame} ${style === 'icon' ? 'object-contain p-2' : 'object-contain'} `}
          loading="lazy"
        />
      ) : (
        <div className={`${frame} ${padding} flex items-center justify-center`}>
          <div className="whitespace-pre-line text-center text-sm text-text-tertiary">{placeholderLabel}</div>
        </div>
      )}
    </div>
  )
}
