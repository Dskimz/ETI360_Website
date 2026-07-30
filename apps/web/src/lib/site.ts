/**
 * Canonical site origin.
 *
 * The apex 307-redirects to www, so www is canonical. Preview deployments
 * should set NEXT_PUBLIC_SITE_URL to their own origin so canonicals, the
 * sitemap and OG URLs point at the deployment being previewed.
 *
 * Lives here rather than in layout.tsx because Next.js only permits a fixed
 * set of exports from a layout module.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eti360.com";
