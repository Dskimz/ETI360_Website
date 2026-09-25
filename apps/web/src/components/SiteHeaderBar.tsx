'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

export type NavItem = {
  href: string
  label: string
  /** Another path prefix that also marks the item active (the Trip
      Package's worked trips live under /trips/*). */
  alsoActive?: string
}

function under(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

function isActive(pathname: string, item: NavItem) {
  return under(pathname, item.href) || (item.alsoActive ? under(pathname, item.alsoActive) : false)
}

/* The header bar. The items come from the server (SiteHeader), so the
   product registry never ships to the browser. Below 1100px the nav folds
   behind a Menu button (one 56px header row); the list opens as a navy sheet
   under it. */
export function SiteHeaderBar({items}: {items: NavItem[]}) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-mark ui" onClick={() => setOpen(false)}>
          <span className="eti">ETI</span>
          <span className="three-sixty">360</span>
        </Link>
        <button
          type="button"
          className="site-menu-toggle ui"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={`site-nav ui${open ? ' open' : ''}`} aria-label="Primary">
          <ul>
            {items.map((item) => {
              const active = isActive(pathname, item)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={active ? 'active' : undefined}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
