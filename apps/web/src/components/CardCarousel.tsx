'use client'

import {useEffect, useRef, useState, type ReactNode} from 'react'
import styles from './cardcarousel.module.css'

/* A sideways row of cards that snaps card by card, like the document pages
   on a worked-trip page (Dan, 2026-10-01: "the scroll like we have in the
   Washington DC page"). The next card always shows at the edge, so the row
   reads as scrollable; the arrow buttons move one card, swipe and trackpad
   work as usual, and the row never moves on its own. */
export function CardCarousel({label, children}: {label: string; children: ReactNode}) {
  const track = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  function update() {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
  }

  useEffect(() => {
    update()
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', update, {passive: true})
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function move(dir: 1 | -1) {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8
    el.scrollBy({left: dir * step, behavior: 'smooth'})
  }

  return (
    <div className={styles.carousel}>
      <ul ref={track} className={styles.track} aria-label={label}>
        {children}
      </ul>
      <div className={`${styles.controls} ui`}>
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
