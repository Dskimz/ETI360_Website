'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

type NavItem = {href: string; label: string}

const navItems: NavItem[] = [
  {href: '/for-schools', label: 'For Schools'},
  {href: '/for-providers', label: 'For Providers'},
  {href: '/framework', label: 'The Framework'},
  {href: '/about', label: 'About'},
]

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname() || '/'

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-mark ui">
          <span className="eti">ETI</span>
          <span className="three-sixty">360</span>
        </Link>
        <nav className="site-nav ui" aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(pathname, item.href) ? 'active' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className={'nav-action' + (isActive(pathname, '/contact') ? ' active' : '')}
              >
                Arrange a briefing
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
