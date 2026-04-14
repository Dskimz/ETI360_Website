'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

type NavItem = {href: string; label: string}

const navItems: NavItem[] = [
  {href: '/for-schools', label: 'For Schools'},
  {href: '/what-we-do', label: 'What We Do'},
  {href: '/contact', label: 'Contact'},
]

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
            <img
              src="/images/eti360-wordmark.png"
              alt="ETI360"
              style={{height: '40px', width: 'auto'}}
            />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="site-nav-mobile"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.5rem',
              height: '2.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
            }}
            className="site-header__hamburger"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--brand-navy)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="site-header__desktop-nav"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
            }}
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                    color: active ? 'var(--brand-navy)' : 'var(--text-tertiary)',
                    borderBottom: active ? '2px solid var(--brand-gold)' : '2px solid transparent',
                    paddingBottom: '0.25rem',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--brand-navy)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-tertiary)'
                    }
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Gold accent line — outside header, full width */}
      <div
        style={{
          width: '100%',
          height: '3px',
          backgroundColor: 'var(--brand-gold)',
          position: 'sticky',
          top: '4rem',
          zIndex: 49,
        }}
      />

      {/* Mobile nav overlay */}
      {open && (
        <nav
          id="site-nav-mobile"
          aria-label="Primary mobile"
          className="site-header__mobile-nav"
          style={{
            position: 'fixed',
            top: 'calc(4rem + 3px)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 48,
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              maxWidth: '72rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                    color: active ? 'var(--brand-navy)' : 'var(--text-tertiary)',
                    borderLeft: active ? '3px solid var(--brand-gold)' : '3px solid transparent',
                    padding: '0.75rem 1rem',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .site-header__desktop-nav {
            display: none !important;
          }
          .site-header__hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
