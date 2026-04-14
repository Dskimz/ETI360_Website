import Link from 'next/link'

const platformLinks = [
  {href: '/for-schools', label: 'For Schools'},
  {href: '/for-providers', label: 'For Providers'},
  {href: '/what-we-do', label: 'What We Do'},
]

const companyLinks = [
  {href: '/contact', label: 'Contact'},
]

const headingStyle: React.CSSProperties = {
  fontSize: '0.6875rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--brand-gold)',
  marginBottom: '1.25rem',
}

function FooterLinkList({links}: {links: {href: string; label: string}[]}) {
  return (
    <ul style={{listStyle: 'none', margin: 0, padding: 0}}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="footer-link"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        backgroundColor: 'var(--brand-navy)',
        color: '#ffffff',
        paddingTop: '4rem',
        paddingBottom: '4rem',
      }}
    >
      <div
        className="site-footer__grid"
        style={{
          maxWidth: '72rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: '3rem',
        }}
      >
        {/* Column 1 — Brand */}
        <div>
          <img
            src="/images/eti360-wordmark.png"
            alt="ETI360"
            style={{height: '36px', width: 'auto', marginBottom: '1.25rem', opacity: 0.9}}
          />
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.6,
              marginBottom: '1.5rem',
              maxWidth: '20rem',
            }}
          >
            Educational Travel Intelligence.
          </p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.45)',
            }}
          >
            &copy; {currentYear} ETI360. All rights reserved.
          </p>
        </div>

        {/* Column 2 — Platform */}
        <div>
          <h4 style={headingStyle}>Platform</h4>
          <FooterLinkList links={platformLinks} />
        </div>

        {/* Column 3 — Company */}
        <div>
          <h4 style={headingStyle}>Company</h4>
          <FooterLinkList links={companyLinks} />
        </div>

        {/* Column 4 — Legal */}
        <div>
          <h4 style={headingStyle}>Legal</h4>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.55)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            &copy; {currentYear} ETI360. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'rgba(255, 255, 255, 0.55)',
              lineHeight: 1.7,
              marginTop: '1rem',
            }}
          >
            Intellectual property of institutional audits remains with the commissioning body.
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.875rem;
          line-height: 1.8;
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: #ffffff;
        }
        @media (max-width: 768px) {
          .site-footer__grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .site-footer__grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
