'use client'

import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import styles from './examples.module.css'

/* The Examples library's switch and tiles. The page builds every item on
   the server; this component only filters them. The switch reads
   ?schools=us|international on load, so a link can open the library on one
   set (the home page's Horizon Ridge card links ?schools=us). An area with
   no example for the chosen set shows the other set's, with one line saying
   so, rather than an empty block. */

export type Filter = 'all' | 'International' | 'US'

export type ExampleItem = {
  key: string
  area: string
  group?: string
  title: string
  school: string
  place: string
  schoolType: 'US' | 'International'
  cover: {src: string; width: number; height: number; alt: string}
  href: string
  tripHref?: string
  tripTitle?: string
}

export type ExampleArea = {
  id: string
  title: string
  line: string
  tier: 1 | 2 | 3
  tierTag: string
  groups?: {id: string; label: string}[]
  notices: string[]
}

const OPTIONS: {value: Filter; label: string}[] = [
  {value: 'all', label: 'All schools'},
  {value: 'International', label: 'International schools'},
  {value: 'US', label: 'Independent schools'},
]

const OTHER: Record<'International' | 'US', string> = {
  International: 'This area has independent school examples only for now; the documents take the same form for an international school.',
  US: 'This area has international examples only for now; the documents take the same form for an independent school.',
}

function Tile({item}: {item: ExampleItem}) {
  return (
    <li className={styles.tile}>
      <a href={item.href} className={styles.cover}>
        <Image src={item.cover.src} width={item.cover.width} height={item.cover.height} alt={`Cover of the ${item.title}`} sizes="140px" />
      </a>
      <a href={item.href} className={`${styles.docTitle} ui`}>
        {item.title}
      </a>
      <span className={`${styles.meta} ui`}>
        {item.school}
        {item.place && item.place !== item.tripTitle ? ` · ${item.place}` : ''}
      </span>
      {item.tripHref ? (
        <Link href={item.tripHref} className={`${styles.tripLink} ui`}>
          {item.tripTitle} trip page &rarr;
        </Link>
      ) : null}
    </li>
  )
}

export function ExamplesLibrary({areas, items}: {areas: ExampleArea[]; items: ExampleItem[]}) {
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('schools')
    if (q === 'us') setFilter('US')
    else if (q === 'international') setFilter('International')
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) requestAnimationFrame(() => el.scrollIntoView())
    }
  }, [])

  function choose(f: Filter) {
    setFilter(f)
    const url = new URL(window.location.href)
    if (f === 'all') url.searchParams.delete('schools')
    else url.searchParams.set('schools', f === 'US' ? 'us' : 'international')
    window.history.replaceState(null, '', url.toString())
  }

  return (
    <>
      <div className={styles.switchBar}>
        <div className="container">
          <div className={`${styles.switch} ui`} role="group" aria-label="Show examples for">
            {OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={filter === o.value}
                className={filter === o.value ? styles.on : undefined}
                onClick={() => choose(o.value)}
              >
                {o.label}
              </button>
            ))}
          </div>
          <nav className={`${styles.jump} ui`} aria-label="Areas">
            {areas.map((a, i) => (
              <a key={a.id} href={`#${a.id}`}>
                {String(i + 1).padStart(2, '0')} {a.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {areas.map((a, i) => {
        const all = items.filter((it) => it.area === a.id)
        const chosen = filter === 'all' ? all : all.filter((it) => it.schoolType === filter)
        const fallback = filter !== 'all' && chosen.length === 0
        const shown = fallback ? all : chosen
        return (
          <section key={a.id} id={a.id} className={i % 2 ? styles.bandLight : styles.band}>
            <div className="container">
              <div className={styles.areaHead}>
                <span className={styles.areaNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2>{a.title}</h2>
                  <p>{a.line}</p>
                </div>
                <span className={`${styles.tierTag} ${styles[`tier${a.tier}`]} ui`}>{a.tierTag}</span>
              </div>
              {fallback ? <p className={`${styles.fallback} ui`}>{OTHER[filter as 'International' | 'US']}</p> : null}
              {a.groups ? (
                a.groups.map((g) => {
                  const gi = shown.filter((it) => it.group === g.id)
                  if (gi.length === 0) return <span key={g.id} id={g.id} />
                  return (
                    <div key={g.id} id={g.id} className={styles.group}>
                      <h3 className="ui">{g.label}</h3>
                      <ul className={styles.tiles}>
                        {gi.map((it) => (
                          <Tile key={it.key} item={it} />
                        ))}
                      </ul>
                    </div>
                  )
                })
              ) : (
                <ul className={styles.tiles}>
                  {shown.map((it) => (
                    <Tile key={it.key} item={it} />
                  ))}
                </ul>
              )}
              {a.notices.map((n) => (
                <p key={n} className={`${styles.notice} ui`}>
                  {n}
                </p>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}
