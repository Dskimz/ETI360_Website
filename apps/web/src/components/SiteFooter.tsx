import Link from 'next/link'

const exploreLinks = [
  {href: '/framework', label: "ETI360's 3-Tier Risk Framework"},
  {href: '/for-schools', label: 'For Schools'},
  {href: '/for-providers', label: 'For Providers'},
  {href: '/showcase', label: 'Sample Pack'},
]

const firmLinks = [
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact'},
  {href: '/privacy', label: 'Privacy'},
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <Link href="/" className="brand-mark ui">
            <span className="eti">ETI</span>
            <span className="three-sixty">360</span>
          </Link>
          <p className="site-footer-name ui">Educational Travel Insights 360</p>
          <p className="site-footer-desc">
            The documents and working systems that support school travel
            decisions.
          </p>
        </div>
        <div className="site-footer-cols">
          <div className="site-footer-col">
            <h3 className="ui">Explore</h3>
            <ul className="ui">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer-col">
            <h3 className="ui">ETI360</h3>
            <ul className="ui">
              {firmLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright ui">&copy; {year} Educational Travel Insights 360.</div>
    </footer>
  )
}
