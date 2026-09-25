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
