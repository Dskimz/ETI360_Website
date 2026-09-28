#!/usr/bin/env python3
"""Upload the site's document PDFs to the public S3 bucket (Dan, 2026-09-25: "S3").

The site never links a PDF file directly: every document opens through a logged
route that redirects to the file. With DOCS_BASE_URL set in the site's
environment, that redirect goes to S3 instead of the site's own public/ folder.
This script mirrors exactly the editions the site links, as listed by the
version registry (apps/web/src/content/versions/, read through
`node scripts/sync-trip-pdfs.mjs --list`), so both addresses hold the same bytes:

    apps/web/public/trips/<slug>/letter|a4/<file>.pdf -> s3://<bucket>/trips/<slug>/letter|a4/<file>.pdf
    apps/web/public/docs/<file>.pdf                   -> s3://<bucket>/docs/<file>.pdf

Registry-driven (review fix, 2026-09-27), so a stale or retired file lying in
public/ is never published:
  - every linked edition must be present locally (run `npm run sync:trip-pdfs`
    and the Review sample's publish_baseline_report.py first), or nothing uploads;
  - any other PDF in public/docs or public/trips/*/letter|a4 stops the run
    (move it out; it is not linked and must not become public);
  - every file passes scripts/check-pdf-wording.py (V3 ADR-025: no document
    says a hospital is designated) before anything uploads.

Dry run by default. Unchanged files (same MD5 as the object's ETag) are skipped.
After an --execute run, every uploaded object is fetched anonymously over HTTPS
to prove the bucket policy lets the public read it. To check the whole bucket
against the registry at any time: `node scripts/sync-trip-pdfs.mjs --s3-check`.

Credentials: SITE_DOCS_AWS_ACCESS_KEY_ID / SITE_DOCS_AWS_SECRET_ACCESS_KEY if set,
otherwise AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY from the environment or from
the rebuild repo's .env.local (the uploader user, once it has the inline policy in
scripts/s3/uploader-inline-policy.json). One-time bucket setup: scripts/s3/README.md.

    python3 scripts/upload-docs-s3.py                   # dry run: what would upload
    python3 scripts/upload-docs-s3.py --execute         # upload every linked edition
    python3 scripts/upload-docs-s3.py --only washington-dc   # one version
("--docs" is still accepted and changes nothing: the linked /docs editions are
always included.)
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
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


def registry_editions() -> list[dict]:
    """Every edition the site links, from the version registry."""
    out = subprocess.run(
        ["node", str(ROOT / "scripts" / "sync-trip-pdfs.mjs"), "--list"],
        capture_output=True, text=True, cwd=ROOT,
    )
    if out.returncode != 0:
        sys.exit(f"Could not read the version registry:\n{out.stderr}")
    return json.loads(out.stdout)


def collect(only: str | None) -> tuple[list[tuple[Path, str]], list[str], list[Path]]:
    """(linked editions present locally, linked editions missing, unlinked PDFs in public/)."""
    editions = registry_editions()
    linked = {e["url"].lstrip("/") for e in editions}
    items: list[tuple[Path, str]] = []
    missing: list[str] = []
    for e in editions:
        if only and e["version"] != only:
            continue
        key = e["url"].lstrip("/")
        path = PUBLIC / key
        if path.is_file():
            items.append((path, key))
        else:
            missing.append(f"{e['version']}/{e['doc']} ({e['size']}): public/{key}")
    unlinked = [
        p for p in sorted([*(PUBLIC / "docs").glob("*.pdf"), *(PUBLIC / "trips").glob("*/*/*.pdf")])
        if p.relative_to(PUBLIC).as_posix() not in linked
        and (p.parent.name in ("letter", "a4") or p.parent.name == "docs")
    ]
    return items, missing, unlinked


def wording_check(paths: list[Path]) -> bool:
    r = subprocess.run([sys.executable, str(ROOT / "scripts" / "check-pdf-wording.py"), *map(str, paths)])
    return r.returncode == 0


def public_url(bucket: str, region: str, key: str) -> str:
    return f"https://{bucket}.s3.{region}.amazonaws.com/{key}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--bucket", default=os.environ.get("SITE_DOCS_BUCKET", DEFAULT_BUCKET))
    ap.add_argument("--region", default=os.environ.get("SITE_DOCS_REGION", DEFAULT_REGION))
    ap.add_argument("--execute", action="store_true", help="upload (default is a dry run)")
    ap.add_argument("--docs", action="store_true", help="accepted for old commands; the linked /docs editions are always included")
    ap.add_argument("--only", help="one version slug")
    ap.add_argument("--skip-wording-check", action="store_true", help="never before a publish")
    args = ap.parse_args()

    items, missing, unlinked = collect(args.only)
    if unlinked:
        print("PDFs in public/ that the site does not link (move them out; they must not become public):")
        for p in unlinked:
            print(f"  {p.relative_to(PUBLIC)}")
        return 4
    if missing:
        print("Linked editions missing locally (run `npm run sync:trip-pdfs`, and the Review sample's"
              " publish_baseline_report.py, then try again):")
        for m in missing:
            print(f"  {m}")
        return 1
    if not items:
        print("Nothing to upload.")
        return 1
    if not args.skip_wording_check and not wording_check([p for p, _ in items]):
        print("Wording check failed: nothing uploaded.")
        return 5

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
