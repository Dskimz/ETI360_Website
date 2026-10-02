import {caseStudyLive} from '@/content/case-study'
import {SiteHeaderBar, type NavItem} from './SiteHeaderBar'

/* The primary nav (Dan, 2026-10-01 redesign): Services (the home page),
   Case Studies, Examples (every worked document, which absorbed the four
   product pages; the worked trips under /trips/* mark it active), Contact. */
export function SiteHeader() {
  const items: NavItem[] = [
    {href: '/', label: 'Services'},
    ...(caseStudyLive() ? [{href: '/case-study', label: 'Case Studies'}] : []),
    {href: '/examples', label: 'Examples', alsoActive: '/trips'},
    {href: '/contact', label: 'Contact'},
  ]
  return <SiteHeaderBar items={items} />
}
