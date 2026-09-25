#!/usr/bin/env python3
"""Upload the site's document PDFs to the public S3 bucket (Dan, 2026-09-25: "S3").

The site never links a PDF file directly: every document opens through a logged
route that redirects to the file. With DOCS_BASE_URL set in the site's
environment, that redirect goes to S3 instead of the site's own public/ folder.
This script mirrors the files so both addresses hold the same bytes:

    apps/web/public/trips/<slug>/letter/<file>.pdf -> s3://<bucket>/trips/<slug>/letter/<file>.pdf
    apps/web/public/trips/<slug>/a4/<file>.pdf     -> s3://<bucket>/trips/<slug>/a4/<file>.pdf
    apps/web/public/docs/<file>.pdf                -> s3://<bucket>/docs/<file>.pdf     (with --docs)

Dry run by default. Unchanged files (same MD5 as the object's ETag) are skipped.
After an --execute run, every uploaded object is fetched anonymously over HTTPS
to prove the bucket policy lets the public read it.

Credentials: SITE_DOCS_AWS_ACCESS_KEY_ID / SITE_DOCS_AWS_SECRET_ACCESS_KEY if set,
otherwise AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY from the environment or from
the rebuild repo's .env.local (the uploader user, once it has the inline policy in
scripts/s3/uploader-inline-policy.json). One-time bucket setup: scripts/s3/README.md.

    python3 scripts/upload-docs-s3.py                  # dry run: what would upload
    python3 scripts/upload-docs-s3.py --execute        # upload trip PDFs
    python3 scripts/upload-docs-s3.py --execute --docs # also public/docs/*.pdf
    python3 scripts/upload-docs-s3.py --only washington-dc
"""
from __future__ import annotations

import argparse
import hashlib
import os
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "apps" / "web" / "public"
REBUILD_ENV = Path("/Users/danskimin/00 - eti360-rebuild/.env.local")
DEFAULT_BUCKET = "eti360-site-documents"
DEFAULT_REGION = "us-east-1"


def load_env_file(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip().strip('"').strip("'")
    return values


def credentials() -> tuple[str, str]:
    env = {**load_env_file(REBUILD_ENV), **os.environ}
    key = env.get("SITE_DOCS_AWS_ACCESS_KEY_ID") or env.get("AWS_ACCESS_KEY_ID")
    secret = env.get("SITE_DOCS_AWS_SECRET_ACCESS_KEY") or env.get("AWS_SECRET_ACCESS_KEY")
    if not key or not secret:
        sys.exit("No AWS credentials: set SITE_DOCS_AWS_ACCESS_KEY_ID and SITE_DOCS_AWS_SECRET_ACCESS_KEY.")
    return key, secret


def md5(path: Path) -> str:
    h = hashlib.md5()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def collect(include_docs: bool, only: str | None) -> list[tuple[Path, str]]:
    items: list[tuple[Path, str]] = []
    for pdf in sorted((PUBLIC / "trips").glob("*/*/*.pdf")):
        slug, paper = pdf.parent.parent.name, pdf.parent.name
        if paper not in ("letter", "a4"):
            continue
        if only and slug != only:
            continue
        items.append((pdf, f"trips/{slug}/{paper}/{pdf.name}"))
    if include_docs and not only:
        for pdf in sorted((PUBLIC / "docs").glob("*.pdf")):
            items.append((pdf, f"docs/{pdf.name}"))
    return items


def public_url(bucket: str, region: str, key: str) -> str:
    return f"https://{bucket}.s3.{region}.amazonaws.com/{key}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--bucket", default=os.environ.get("SITE_DOCS_BUCKET", DEFAULT_BUCKET))
    ap.add_argument("--region", default=os.environ.get("SITE_DOCS_REGION", DEFAULT_REGION))
    ap.add_argument("--execute", action="store_true", help="upload (default is a dry run)")
    ap.add_argument("--docs", action="store_true", help="also upload public/docs/*.pdf")
    ap.add_argument("--only", help="one trip slug")
    args = ap.parse_args()

    items = collect(args.docs, args.only)
    if not items:
        print("Nothing to upload. Run `npm run sync:trip-pdfs` first so public/trips holds the PDFs.")
        return 1

    import boto3
    from boto3.s3.transfer import TransferConfig
    from botocore.exceptions import ClientError

    # Single-part uploads up to 200 MB, so each object's ETag is its MD5 and
    # unchanged files are skipped on the next run.
    single_part = TransferConfig(multipart_threshold=200 * 1024 * 1024)

    key_id, secret = credentials()
    s3 = boto3.client("s3", aws_access_key_id=key_id, aws_secret_access_key=secret, region_name=args.region)

    total = sum(p.stat().st_size for p, _ in items)
    print(f"{len(items)} PDFs, {total / 1e6:.1f} MB -> s3://{args.bucket} ({args.region})"
          f"{'' if args.execute else '  [DRY RUN]'}")
    uploaded, skipped = [], 0
    for path, key in items:
        digest = md5(path)
        try:
            head = s3.head_object(Bucket=args.bucket, Key=key)
            if head.get("ETag", "").strip('"') == digest:
                skipped += 1
                continue
        except ClientError as err:
            code = err.response.get("Error", {}).get("Code", "")
            if code not in ("404", "NoSuchKey", "NotFound"):
                print(f"  cannot read {key}: {code} (check the uploader's inline policy)")
                return 2
        print(f"  {'upload' if args.execute else 'would upload'} {key} ({path.stat().st_size / 1e6:.1f} MB)")
        if args.execute:
            s3.upload_file(
                str(path), args.bucket, key,
                ExtraArgs={
                    "ContentType": "application/pdf",
                    "ContentDisposition": "inline",
                    "CacheControl": "public, max-age=3600",
                },
                Config=single_part,
            )
            uploaded.append(key)
    print(f"{len(uploaded)} uploaded, {skipped} unchanged")

    if args.execute and uploaded:
        failures = 0
        for key in uploaded:
            url = public_url(args.bucket, args.region, key)
            try:
                with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=20) as resp:
                    ok = resp.status == 200 and resp.headers.get("Content-Type") == "application/pdf"
            except Exception:
                ok = False
            if not ok:
                failures += 1
                print(f"  NOT PUBLIC: {url}")
        print("public check:", "every upload reads anonymously" if not failures else f"{failures} failed; check the bucket policy")
        if failures:
            return 3
    print(f"DOCS_BASE_URL for the site: https://{args.bucket}.s3.{args.region}.amazonaws.com")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
