# ETI360 US site: sitemap (retired)

The `/us` tree this file described (reconciled 2026-09-22) is retired. Since
2026-09-25 the site is four product pages for schools, each showing its
versions, with no audience pages (Dan: "each page should be one of the 4
products and then we show off multiple versions of the product from that
page"). `/us` and every `/for-schools` address redirect to the product pages
(`apps/web/next.config.ts`, `src/lib/redirects.ts`).

Where the site map lives now:

- Build spec: `/Users/danskimin/00 - eti360-rebuild/dev/website-outputs/four-product-site-spec.md`
- Canonical site map: `/Users/danskimin/00 - eti360-rebuild/content/vault/Marketing/ETI360-Site-Map-2026-09.html`
- The routes themselves: `apps/web/src/app/sitemap.ts`, built from the product
  and version registries (`src/content/products.ts`, `src/content/versions/`).

The 2026-09-22 version of this file is in git history.
