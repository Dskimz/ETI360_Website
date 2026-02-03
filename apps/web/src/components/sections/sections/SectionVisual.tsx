import {urlFor} from '@/lib/sanity/image'

type SectionVisualValue = {
  style?: 'diagram' | 'document' | 'illustration' | 'icon'
  image?: any
  alt?: string
  placeholderLabel?: string
}

function visualFrameClass(style: NonNullable<SectionVisualValue['style']>) {
  if (style === 'icon') {
    return 'h-11 w-11 rounded-xl border border-border bg-background'
  }

  if (style === 'document') {
    return 'w-full rounded-2xl border border-border bg-background'
  }

  return 'w-full rounded-2xl border border-dashed border-border bg-background'
}

export function SectionVisual({
  value,
  className,
  size = 'md',
}: {
  value?: SectionVisualValue | null
  className?: string
  size?: 'sm' | 'md'
}) {
  const style = (value?.style ?? 'diagram') as NonNullable<SectionVisualValue['style']>
  const url =
    value?.image && urlFor(value.image)?.width(style === 'icon' ? 96 : 1200).auto('format').url()
  const label = value?.placeholderLabel

  if (!url && !label) return null

  const frame = visualFrameClass(style)
  const padding = style === 'icon' ? '' : size === 'sm' ? 'p-5' : 'p-6'

  return (
    <div className={className}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={value?.alt ?? ''}
          className={`${frame} ${style === 'icon' ? 'object-contain p-2' : 'object-cover'} `}
          loading="lazy"
        />
      ) : (
        <div className={`${frame} ${padding} flex items-center justify-center`}>
          <div className="text-center text-sm text-text-tertiary">{label}</div>
        </div>
      )}
    </div>
  )
}

