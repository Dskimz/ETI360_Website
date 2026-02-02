'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useMemo, useState} from 'react'

type NavItem = {href: string; label: string}

const navItems: NavItem[] = [
  {href: '/', label: 'Home'},
  {href: '/approach', label: 'ETI360’s Approach'},
  {href: '/what-we-do', label: 'What We Do'},
  {href: '/triprisk360', label: 'TripRisk360'},
  {href: '/insights', label: 'Insights'},
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact'},
]

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  const activeHref = useMemo(() => {
    return navItems.find((item) => isActivePath(pathname, item.href))?.href ?? null
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-base font-semibold tracking-tight">
          ETI360
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-zinc-200 px-3 py-2 text-sm sm:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav id="site-nav" className="hidden items-center gap-4 text-sm sm:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'rounded-md px-2 py-1 transition-colors',
                item.href === activeHref ? 'bg-secondary text-text-secondary' : 'text-text-tertiary hover:bg-secondary',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {open ? (
        <nav className="border-t border-border bg-background sm:hidden" aria-label="Primary mobile">
          <div className="mx-auto max-w-5xl px-6 py-3">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    'rounded-md px-3 py-2 text-sm transition-colors',
                    item.href === activeHref ? 'bg-secondary text-text-secondary' : 'text-text-tertiary hover:bg-secondary',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
