import Link from 'next/link'

const footerLinks = [
  {href: '/perspective', label: 'Perspective'},
  {href: '/for-schools', label: 'For Schools'},
  {href: '/for-providers', label: 'For Providers'},
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact'},
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <Link href="/" className="brand-mark ui">
          <span className="eti">ETI</span>
          <span className="three-sixty">360</span>
        </Link>
        <ul className="ui">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="copyright ui">&copy; {year} Educational Travel Insights 360.</div>
    </footer>
  )
}
