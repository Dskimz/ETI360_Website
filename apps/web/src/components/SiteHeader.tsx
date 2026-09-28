import {liveProducts} from '@/content/products'
import {SiteHeaderBar, type NavItem} from './SiteHeaderBar'

/* The primary nav (four-product site, Dan 2026-09-25): the four products by
   their full names, in tier order, then the Case Study (Dan, 2026-09-28: one
   illustrative school year across the four products), then Contact. Flat:
   no dropdown, no audience entries. Only live products appear (spec S18: a
   product is live once it has a version). */
export function SiteHeader() {
  const items: NavItem[] = [
    ...liveProducts().map((p) => ({
      href: p.href,
      label: p.name,
      alsoActive: p.slug === 'trip-package' ? '/trips' : undefined,
    })),
    {href: '/case-study', label: 'Case Study'},
    {href: '/contact', label: 'Contact'},
  ]
  return <SiteHeaderBar items={items} />
}
