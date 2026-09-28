#!/usr/bin/env python3
"""Mirror the private route pages' folders to the private S3 bucket.

The deployed site reads each private route page (/routes/<token>) from a
private bucket, never from this repository, which is public:

    apps/web/private/routes/<token>/<file> -> s3://<bucket>/routes/<token>/<file>

Run `npm run sync:route-private` first so the local folders are current.
Dry run by default. Unchanged files (same MD5 as the object's ETag) are
skipped. After an --execute run, every uploaded object is requested without
credentials and must be refused (403): the proof that the bucket is private.

Credentials: ROUTES_S3_UPLOAD_ACCESS_KEY_ID / ROUTES_S3_UPLOAD_SECRET_ACCESS_KEY
if set, otherwise AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY from the
environment or the rebuild repo's .env.local (the uploader user, once it has
scripts/s3/route-private-uploader-policy.json). One-time setup:
scripts/s3/README.md, "Private route pages".

    python3 scripts/upload-route-private-s3.py                 # dry run
    python3 scripts/upload-route-private-s3.py --execute       # upload
    python3 scripts/upload-route-private-s3.py --only <token>  # one route page
"""
from __future__ import annotations

import argparse
import hashlib
import mimetypes
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PRIVATE = ROOT / "apps" / "web" / "private" / "routes"
REBUILD_ENV = Path("/Users/danskimin/00 - eti360-rebuild/.env.local")
DEFAULT_BUCKET = "eti360-site-private"
DEFAULT_REGION = "us-east-1"
DEFAULT_PREFIX = "routes/"
TYPES = {".json": "application/json; charset=utf-8", ".png": "image/png", ".pdf": "application/pdf"}


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
    key = env.get("ROUTES_S3_UPLOAD_ACCESS_KEY_ID") or env.get("AWS_ACCESS_KEY_ID")
    secret = env.get("ROUTES_S3_UPLOAD_SECRET_ACCESS_KEY") or env.get("AWS_SECRET_ACCESS_KEY")
    if not key or not secret:
        sys.exit("No AWS credentials: set ROUTES_S3_UPLOAD_ACCESS_KEY_ID and ROUTES_S3_UPLOAD_SECRET_ACCESS_KEY.")
    return key, secret


def md5(path: Path) -> str:
    h = hashlib.md5()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def collect(prefix: str, only: str | None) -> list[tuple[Path, str]]:
    items: list[tuple[Path, str]] = []
    if not PRIVATE.exists():
        return items
    for folder in sorted(p for p in PRIVATE.iterdir() if p.is_dir()):
        if only and folder.name != only:
            continue
        if not (folder / "route.json").exists():
            print(f"  skipped {folder.name}: no route.json (run npm run sync:route-private)")
            continue
        for path in sorted(folder.rglob("*")):
            if path.is_file() and path.suffix in TYPES:
                items.append((path, f"{prefix}{folder.name}/{path.relative_to(folder).as_posix()}"))
    return items


def refused_anonymously(url: str) -> bool:
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="HEAD"), timeout=20):
            return False
    except urllib.error.HTTPError as err:
        return err.code == 403
    except Exception:
        return False


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--bucket", default=os.environ.get("ROUTES_S3_BUCKET", DEFAULT_BUCKET))
    ap.add_argument("--region", default=os.environ.get("ROUTES_S3_REGION", DEFAULT_REGION))
    ap.add_argument("--prefix", default=os.environ.get("ROUTES_S3_PREFIX", DEFAULT_PREFIX))
    ap.add_argument("--execute", action="store_true", help="upload (default is a dry run)")
    ap.add_argument("--only", help="one route page's token")
    args = ap.parse_args()
    prefix = args.prefix if not args.prefix or args.prefix.endswith("/") else f"{args.prefix}/"

    items = collect(prefix, args.only)
    if not items:
        print("Nothing to upload. Run `npm run sync:route-private` first.")
        return 1

    import boto3
    from botocore.exceptions import ClientError

    key_id, secret = credentials()
    s3 = boto3.client("s3", aws_access_key_id=key_id, aws_secret_access_key=secret, region_name=args.region)

    total = sum(p.stat().st_size for p, _ in items)
    print(f"{len(items)} files, {total / 1e6:.1f} MB -> s3://{args.bucket}/{prefix} ({args.region})"
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
                print(f"  cannot read {key}: {code} (check the uploader's policy)")
                return 2
        print(f"  {'upload' if args.execute else 'would upload'} {key} ({path.stat().st_size / 1e3:.0f} KB)")
        if args.execute:
            s3.put_object(
                Bucket=args.bucket,
                Key=key,
                Body=path.read_bytes(),
                ContentType=TYPES.get(path.suffix) or mimetypes.guess_type(path.name)[0] or "application/octet-stream",
                CacheControl="private, no-store",
            )
            uploaded.append(key)
    print(f"{len(uploaded)} uploaded, {skipped} unchanged")

    if args.execute and uploaded:
        leaks = [k for k in uploaded if not refused_anonymously(f"https://{args.bucket}.s3.{args.region}.amazonaws.com/{k}")]
        for key in leaks:
            print(f"  READABLE WITHOUT CREDENTIALS: {key}")
        print("private check:", "every upload is refused without credentials" if not leaks
              else f"{len(leaks)} readable; turn on Block Public Access for the bucket now")
        if leaks:
            return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
