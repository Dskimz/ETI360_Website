'use client'

import {useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode} from 'react'
import styles from './cardcarousel.module.css'

/* A sideways row of cards that snaps card by card, like the document pages
   on a worked-trip page (Dan, 2026-10-01: "the scroll like we have in the
   Washington DC page"). The next card always shows at the edge; the arrow
   buttons move one card, and swipe and trackpad work as usual.

   Slow progression (Dan, 2026-10-02): the row moves on by one card every
   ADVANCE_MS and returns to the first card after the last. It holds still
   while the pointer is over it or focus is inside it, after any arrow click,
   swipe or scroll by the reader (until they leave the row), while the row is
   off screen or the tab is hidden, and never moves for a reader who asks
   their system for reduced motion. The Pause button stops it for good, as
   WCAG 2.2.2 asks of moving content. */

const ADVANCE_MS = 6000

const REDUCED = '(prefers-reduced-motion: reduce)'
function onReducedChange(cb: () => void) {
  const mq = window.matchMedia(REDUCED)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function CardCarousel({label, children}: {label: string; children: ReactNode}) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)
  // The reader's reduced-motion setting, kept current; the server assumes
  // motion is allowed, and the timer only starts in the browser anyway.
  const reduced = useSyncExternalStore(onReducedChange, () => window.matchMedia(REDUCED).matches, () => false)
  // Holds that clear on their own: pointer over the row, focus inside it,
  // the row off screen, the reader just moved it.
  const hold = useRef({hover: false, focus: false, hidden: true, touched: false})
  const autoScrolling = useRef(false)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }, [])

  const step = useCallback(() => {
    const el = track.current
    const card = el?.querySelector('li')
    return card ? card.getBoundingClientRect().width + 20 : (el?.clientWidth ?? 0) * 0.8
  }, [])

  function move(dir: 1 | -1) {
    hold.current.touched = true
    track.current?.scrollBy({left: dir * step(), behavior: 'smooth'})
  }

  useEffect(() => {
    update()
    const el = track.current
    const box = root.current
    if (!el || !box) return
    const onScroll = () => {
      update()
      if (!autoScrolling.current) hold.current.touched = true
    }
    const onUserInput = () => {
      hold.current.touched = true
    }
    el.addEventListener('scroll', onScroll, {passive: true})
    el.addEventListener('pointerdown', onUserInput)
    el.addEventListener('wheel', onUserInput, {passive: true})
    window.addEventListener('resize', update)
    const io = new IntersectionObserver(([e]) => {
      hold.current.hidden = !e.isIntersecting
    }, {threshold: 0.4})
    io.observe(box)
    return () => {
      el.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', onUserInput)
      el.removeEventListener('wheel', onUserInput)
      window.removeEventListener('resize', update)
      io.disconnect()
    }
  }, [update])

  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => {
      const el = track.current
      const h = hold.current
      if (!el || h.hover || h.focus || h.hidden || h.touched || document.hidden) return
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      autoScrolling.current = true
      if (end) el.scrollTo({left: 0, behavior: 'smooth'})
      else el.scrollBy({left: step(), behavior: 'smooth'})
      window.setTimeout(() => {
        autoScrolling.current = false
      }, 900)
    }, ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, reduced, step])

  return (
    <div
      ref={root}
      className={styles.carousel}
      onMouseEnter={() => (hold.current.hover = true)}
      onMouseLeave={() => {
        hold.current.hover = false
        hold.current.touched = false
      }}
      onFocus={() => (hold.current.focus = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          hold.current.focus = false
          hold.current.touched = false
        }
      }}
    >
      <ul ref={track} className={styles.track} aria-label={label}>
        {children}
      </ul>
      <div className={`${styles.controls} ui`}>
        {reduced ? null : (
          <button
            type="button"
            className={styles.pause}
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={paused ? 'Play the cards' : 'Pause the cards'}
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        )}
        <button type="button" onClick={() => move(-1)} disabled={atStart} aria-label="Previous cards">
          &larr;
        </button>
        <button type="button" onClick={() => move(1)} disabled={atEnd} aria-label="Next cards">
          &rarr;
        </button>
      </div>
    </div>
  )
}
