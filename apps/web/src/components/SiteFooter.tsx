import Image from 'next/image'
import Link from 'next/link'
import {liveProducts} from '@/content/products'
import {BRAND_LINE} from '@/content/voice'

const firmLinks = [
  {href: '/contact', label: 'Contact'},
  {href: '/privacy', label: 'Privacy'},
]

// Cookie settings only exists while Google Analytics is configured: without a
// measurement ID there is no notice for the link to reopen.
const firmLinksWithConsent = process.env.NEXT_PUBLIC_GA_ID
  ? [...firmLinks, {href: '#cookie-settings', label: 'Cookie settings'}]
  : firmLinks

/* The footer on every page: the brand block, the live products and the Case
   Study (the four products in one illustrative school year), the firm's
   links, and both postal addresses (Dan, 2026-09-25: "We can put both").
   Unsubscribe stays out: it is reached from the email only. */
export function SiteFooter() {
  const year = new Date().getFullYear()
  const products = liveProducts()
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-bento">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              {/* The reverse-white logo file, as in the header. */}
              <Link href="/" className="brand-mark" aria-label="ETI360 home">
                <Image src="/brand/eti360-logo-reverse-white.png" alt="ETI360" width={635} height={144} />
              </Link>
              <p className="site-footer-name ui">Educational Travel Insights 360</p>
              <p className="site-footer-desc">{BRAND_LINE}</p>
            </div>
            <div className="site-footer-cols">
              {products.length > 0 ? (
                <div className="site-footer-col">
                  <h3 className="ui">Products</h3>
                  <ul className="ui">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <Link href={p.href}>{p.name}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/case-study">Case Study</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
              <div className="site-footer-col">
                <h3 className="ui">ETI360</h3>
                <ul className="ui">
                  {firmLinksWithConsent.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="site-footer-rule" />
          <div className="site-footer-small ui">
            <span>&copy; {year} Educational Travel Insights 360.</span>
            <span>ETI360 PTE. LTD. &middot; 1010 Dover Road, #01-360V, Singapore 139658 &middot; UEN 202302514C</span>
            <span>US office &middot; 412 Avon Belden Rd, Avon Lake, OH 44012</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
