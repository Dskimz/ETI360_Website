# Site documents on S3: one-time setup

Dan chose S3 for the trip PDFs on 2026-09-25. The existing bucket (`eti360-assets-prod`, Sydney) holds private school documents behind signed links, and the key in `.env.local` cannot read or change its settings. A public prefix there would sit beside confidential files. The site's PDFs get their own public bucket instead. It holds only sample documents for fictional schools.

## In the AWS console (about ten minutes, Dan)

1. **Create the bucket.** S3, Create bucket.
   - Name: `eti360-site-documents` (checked free on 2026-09-25).
   - Region: US East (N. Virginia) `us-east-1`, close to US schools.
   - Object Ownership: ACLs disabled.
   - Block Public Access: untick "Block all public access" and tick the acknowledgement. This applies to this bucket only.
   - Leave everything else at its default and create it.
2. **Let the public read it.** Open the bucket, Permissions, Bucket policy, Edit. Paste `site-documents-bucket-policy.json` and save. It allows reading files and nothing else.
3. **Let the uploader write to it.** IAM, Users, `eti360-render-uploader-prod`, Add permissions, Create inline policy, JSON. Paste `uploader-inline-policy.json`, name it `eti360-site-documents-upload` and create it. It covers this bucket only.

Then tell Claude the bucket is ready.

## After the console steps (Claude)

```bash
npm run sync:trip-pdfs
python3 scripts/upload-docs-s3.py --execute --docs
```

The script skips unchanged files, and it checks that every upload can be read without a login. It prints the address for the site's `DOCS_BASE_URL` setting:

```
DOCS_BASE_URL=https://eti360-site-documents.s3.us-east-1.amazonaws.com
```

That value goes in Vercel's environment settings when the site is published. The site's open routes redirect to it and still log every open. Locally, without the setting, documents keep opening from `public/`.

## Private route pages

The private route pages (`/routes/<token>`, the outdoor day maps' online version) are the opposite of the sample documents: nothing about them may be public. This repository is public, so a route page's address, its password hash and its data never enter it. Locally they live in `apps/web/private/routes/<token>/` (gitignored), written from V3 by `npm run sync:route-private`. The deployed site reads the same files from a private bucket, with a read-only key. Without that bucket, a deployed route page answers 404; without `ROUTES_SESSION_SECRET`, it shows the password form and opens for nobody.

### In the AWS console (Dan)

1. **Create the bucket.** Name `eti360-site-private` (or another; the site reads `ROUTES_S3_BUCKET`), region US East (N. Virginia) `us-east-1`, ACLs disabled, **Block all public access left on**. No bucket policy. It is a separate bucket from `eti360-site-documents` (public) and from `eti360-assets-prod` (school documents).
2. **Let the uploader write to it.** IAM, Users, `eti360-render-uploader-prod`, Add permissions, Create inline policy, JSON: paste `route-private-uploader-policy.json`, name it `eti360-site-private-upload`.
3. **Make a reader for the site.** IAM, Users, Create user `eti360-site-route-reader` (no console access). Attach an inline policy from `route-private-reader-policy.json` (GetObject on `routes/*` only). Create an access key for it ("Application running outside AWS").
4. **Mapbox.** In the Mapbox account, Tokens, Create a token: public scopes only, URL restrictions `https://www.eti360.com/routes/*` and `https://eti360.com/routes/*` (plus the Vercel preview domain if wanted). The local `.env.local` copies the rebuild repo's general public token; that one should not reach the deployed site, because the unlocked page puts the token in the browser.

### Vercel environment settings

| Setting | Value |
|---|---|
| `ROUTES_SESSION_SECRET` | `openssl rand -hex 32`, not the local one |
| `ROUTES_S3_BUCKET` | `eti360-site-private` |
| `ROUTES_S3_REGION` | `us-east-1` |
| `ROUTES_S3_ACCESS_KEY_ID`, `ROUTES_S3_SECRET_ACCESS_KEY` | the reader's key |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | the URL-restricted token from step 4 |
| `NEXT_PUBLIC_MAPBOX_STYLE` | the field-briefing style URL (as in `.env.local`) |
| `REVIEW_PASSWORD` | a new password for `/review` and `/guides`; the old one is public in this repository's history |

### Each time a route page changes (Claude)

```bash
npm run sync:route-private                       # V3 -> apps/web/private/routes/
python3 scripts/upload-route-private-s3.py         # dry run
python3 scripts/upload-route-private-s3.py --execute
```

After uploading, the script requests every file without credentials and stops with an error if any of them can be read. A new route page starts in V3 as `customers/<school>/trips/<set>/site/route-page.json` (token, words, brand, file sources) with a gate block from `npm run route-password`. `python3 scripts/s3/check_sigv4.py` checks the site's hand-written S3 signer against botocore, offline.
