# Analytics

Two measurement layers, both wired in `src/app/layout.tsx`, both inert until configured.

## Layers

- **Vercel Analytics** (`@vercel/analytics`, `<Analytics />`) — cookieless, edge-measured pageviews. No env var; enable it per project in the Vercel dashboard (Project → Analytics). It survives the ad blockers and school networks that eat a large share of GA events, so treat it as the pageview ground truth GA4 gets checked against.
- **GA4** (`@next/third-parties`, `<GoogleAnalytics />`) — renders only when `NEXT_PUBLIC_GA_ID` is set, so local and preview builds stay uninstrumented until the property exists.

## Environment variables

| Variable | Value | Where |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). Unset = GA4 not loaded. | Vercel project env (Production) |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap/canonicals/OG URLs. Defaults to `https://www.eti360.com`; preview deploys may set their own origin. | Vercel project env (optional) |

## UTM convention

Every campaign link uses exactly these parameters:

utm_source=school-outreach|linkedin|leavebehind, utm_medium=email|social|print, utm_campaign=latam-w1, utm_content=<variant or asset>, utm_term=t1|t2|t3

`utm_term` carries the tier the link speaks to (t1/t2/t3), not a keyword.

## GA4 event plan (conversion events)

Five conversion events. This is the plan of record — the wiring ships in a later phase; nothing emits these yet.

| Event | Fires when |
|---|---|
| `pack_open` | A document pack is opened on the site |
| `pack_download` | A pack PDF is downloaded |
| `demo_click` | A demo/showcase CTA is clicked |
| `contact_submit` | The contact form submits successfully |
| `tier_section_75` | A tier section on the homepage reaches 75% scroll depth |
