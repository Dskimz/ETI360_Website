'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

type NavItem = {href: string; label: string}

const navItems: NavItem[] = [
  {href: '/framework', label: 'Framework'},
  {href: '/for-schools', label: 'For Schools'},
  {href: '/for-providers', label: 'For Providers'},
  {href: '/trips', label: 'Trips'},
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact'},
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/* Below 768px the nav folds behind a Menu button (one 56px header row);
   the list opens as a navy sheet under it. */
export function SiteHeader() {
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
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(pathname, item.href) ? 'active' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
