import Link from 'next/link'

import {Markdown} from '../../Markdown'
import {urlFor} from '@/lib/sanity/image'
import type {SanityImageSource} from '@/lib/sanity/image'

export type HeroSideCard = {
  label?: string
  headline?: string
  bodyMarkdown?: string
  ctaLabel?: string
  ctaHref?: string
}

export type HeroSectionValue = {
  eyebrow?: string
  headline: string
  bodyMarkdown: string
  media?: SanityImageSource
  mediaAlt?: string
  showMediaPlaceholder?: boolean
  mediaPlaceholderLabel?: string
  sideCard?: HeroSideCard
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export function HeroSection({value}: {value: HeroSectionValue}) {
  const mediaUrl = value.media ? urlFor(value.media)?.width(900).height(700).fit('max').auto('format').url() : null
  const showPlaceholder = Boolean(value.showMediaPlaceholder)
  const placeholderLabel = typeof value.mediaPlaceholderLabel === 'string' ? value.mediaPlaceholderLabel.trim() : ''
  const sideCard = value.sideCard && (value.sideCard.headline || value.sideCard.bodyMarkdown || value.sideCard.ctaHref)
  const eyebrow =
    typeof value.eyebrow === 'string' && value.eyebrow.trim().toLowerCase() === 'eti360'
      ? null
      : value.eyebrow
  const secondaryCtaHref =
    typeof value.secondaryCtaHref === 'string' && value.secondaryCtaHref.trim().length > 0
      ? value.secondaryCtaHref
      : null
  const secondaryCtaLabel =
    typeof value.secondaryCtaLabel === 'string' && value.secondaryCtaLabel.trim().length > 0
      ? value.secondaryCtaLabel
      : null

  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            {eyebrow ? (
              <p className="text-sm font-medium uppercase tracking-wide text-text-tertiary">{eyebrow}</p>
            ) : null}
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text-secondary sm:text-5xl">
              {value.headline}
            </h1>
            <div className="mt-6 max-w-2xl">
              <Markdown content={value.bodyMarkdown} />
            </div>
            {value.primaryCtaHref ? (
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href={value.primaryCtaHref}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:opacity-90"
                >
                  {value.primaryCtaLabel}
                </Link>
                {secondaryCtaHref && secondaryCtaLabel ? (
                  <Link
                    href={secondaryCtaHref}
                    className="text-sm font-medium text-text-secondary underline underline-offset-4 hover:opacity-80"
                  >
                    {secondaryCtaLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            {sideCard ? (
              <aside className="rounded-2xl border border-border bg-secondary p-6">
                {value.sideCard?.label ? (
                  <div className="text-xs font-semibold uppercase tracking-wide text-text-tertiary">
                    {value.sideCard.label}
                  </div>
                ) : null}
                {value.sideCard?.headline ? (
                  <div className="mt-2 text-lg font-semibold tracking-tight text-text-secondary">
                    {value.sideCard.headline}
                  </div>
                ) : null}
                {value.sideCard?.bodyMarkdown ? (
                  <div className="mt-3 text-sm">
                    <Markdown content={value.sideCard.bodyMarkdown} />
                  </div>
                ) : null}
                {value.sideCard?.ctaHref && value.sideCard?.ctaLabel ? (
                  <div className="mt-5">
                    <Link
                      href={value.sideCard.ctaHref}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
                    >
                      {value.sideCard.ctaLabel}
                    </Link>
                  </div>
                ) : null}
              </aside>
            ) : null}

            {mediaUrl ? (
              <div className={sideCard ? 'mt-6' : ''}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaUrl}
                  alt={value.mediaAlt ?? ''}
                  className="h-auto w-full rounded-2xl border border-border bg-background object-cover"
                  loading="lazy"
                />
              </div>
            ) : showPlaceholder && placeholderLabel ? (
              <div className={sideCard ? 'mt-6' : ''}>
                <div className="flex h-[220px] items-center justify-center rounded-2xl border border-dashed border-border bg-secondary sm:h-[320px]">
                  <div className="px-6 text-center text-sm text-text-tertiary">
                    <span className="whitespace-pre-line">{placeholderLabel}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
