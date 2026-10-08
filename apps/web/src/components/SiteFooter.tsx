import Image from 'next/image'
import Link from 'next/link'
import {caseStudyLive} from '@/content/case-study'
import {BRAND_LINE, CLOSING_SIGNATURE, CONTACT_EMAIL} from '@/content/voice'

const firmLinks = [
  {href: '/contact', label: 'Contact'},
  {href: '/privacy', label: 'Privacy'},
]

// Cookie settings only exists while Google Analytics is configured: without a
// measurement ID there is no notice for the link to reopen.
const firmLinksWithConsent = process.env.NEXT_PUBLIC_GA_ID
  ? [...firmLinks, {href: '#cookie-settings', label: 'Cookie settings'}]
  : firmLinks

/* The footer on every page (Dan, 2026-10-08): one row of the brand block,
   the site's three sections (Services, Case Studies, Examples; Dan,
   2026-10-01), the firm's links, and a Contact column carrying the email
   and both offices (Dan, 2026-09-25: "We can put both"). The separate
   contact row and its button are gone (Dan, 2026-10-05: fewer contact
   buttons). Unsubscribe stays out: it is reached from the email only. */
export function SiteFooter() {
  const year = new Date().getFullYear()
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
              <p className="site-footer-desc">{BRAND_LINE}</p>
            </div>
            <div className="site-footer-cols">
              <div className="site-footer-col">
                <h3 className="ui">Services</h3>
                <ul className="ui">
                  <li>
                    <Link href="/">Services</Link>
                  </li>
                  {caseStudyLive() ? (
                    <li>
                      <Link href="/case-study">Case Studies</Link>
                    </li>
                  ) : null}
                  <li>
                    <Link href="/examples">Examples</Link>
                  </li>
                </ul>
              </div>
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
              <div className="site-footer-col site-footer-contact">
                <h3 className="ui">Contact</h3>
                <a className="site-footer-email" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                <p className="site-footer-who">{CLOSING_SIGNATURE}</p>
                <div className="site-footer-offices">
                  <address>
                    <b className="ui">Singapore</b>
                    ETI360 PTE. LTD.
                    <br />
                    1010 Dover Road, #01-360V
                    <br />
                    Singapore 139658
                  </address>
                  <address>
                    <b className="ui">United States</b>
                    412 Avon Belden Rd
                    <br />
                    Avon Lake, OH 44012
                  </address>
                </div>
              </div>
            </div>
          </div>
          <div className="site-footer-rule" />
          <div className="site-footer-small ui">
            <span>&copy; {year} Educational Travel Insights 360</span>
            <span>ETI360 PTE. LTD. &middot; UEN 202302514C</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
