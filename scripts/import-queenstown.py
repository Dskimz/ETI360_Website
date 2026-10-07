#!/usr/bin/env python3
"""Import Harborview's Queenstown trip set (HIS-T07) from V3 into the site.

Run on Dan's Mac, from the website repo root:

    PY=/Library/Frameworks/Python.framework/Versions/3.12/bin/python3
    $PY scripts/import-queenstown.py --hero ~/path/to/queenstown-photo.jpg
    $PY scripts/import-queenstown.py --dry-run          # report only

It finds each of the six documents in the V3 Letter and A4 folders under
its Sep 29 name or its earlier name, copies both editions into
apps/web/public/trips/queenstown/{letter,a4}/ under the published names
(his-t07-queenstown-<doc>.pdf), then runs scripts/import-trip.py to render
the cover and pages 2 and 3 of each document from the A4 edition (an
international school's default), and the hero if one is passed (unused while
Queenstown is Case Study only).

Afterwards: check the inside pages, set the page numbers and captions in
apps/web/src/content/versions/queenstown.ts, fill its V3 placeholders, set
the `source` of any document whose V3 file name differs from its published
name (this script prints the lines), set READY = true, and build.
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SLUG = "queenstown"
PREFIX = "his-t07-queenstown"
OUT = REPO / "apps" / "web" / "public" / "trips" / SLUG

# Sep 29 name (published slug) → earlier names the V3 files may still carry.
DOCS: dict[str, list[str]] = {
    "off-campus-travel-report": ["school-trip-record"],
    "risk-assessment-report": ["trip-risk-working-file", "rams-report"],
    "student-and-parent-trip-report": ["family-trip-brief"],
    "trip-leaders-brief": ["trip-leader-card"],
    "educational-travel-fieldbook": ["student-journey-guide"],
    "post-trip-report": ["post-trip-feedback-report"],
}


def find(folder: Path, names: list[str]) -> Path | None:
    """The PDF in folder whose name ends in -<name>.pdf and mentions queenstown or his-t07."""
    if not folder.is_dir():
        return None
    pdfs = [p for p in folder.iterdir() if p.suffix.lower() == ".pdf" and "trip-pack" not in p.name]
    for name in names:
        hits = [
            p for p in pdfs
            if p.name.lower().endswith(f"-{name}.pdf")
            and ("queenstown" in p.name.lower() or "his-t07" in p.name.lower())
        ]
        if len(hits) == 1:
            return hits[0]
        if len(hits) > 1:
            sys.exit(f"More than one match for {name} in {folder}: {[h.name for h in hits]}")
    return None


def main() -> None:
    v3_root = Path(os.environ.get("ETI360_V3_ROOT", "/Users/danskimin/00 - ETI360 - V3"))
    ap = argparse.ArgumentParser()
    ap.add_argument("--letter-dir", default=str(v3_root / "customers/his/outputs/pdf"))
    ap.add_argument("--a4-dir", default=None, help="default: <letter-dir>/a4")
    ap.add_argument("--hero", help="the hero photo (saved as hero-queenstown.jpg)")
    ap.add_argument("--pages", default="cover,2,3", help="pages to render from each A4 PDF")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    letter_dir = Path(args.letter_dir).expanduser()
    a4_dir = Path(args.a4_dir).expanduser() if args.a4_dir else letter_dir / "a4"
    print(f"Letter folder: {letter_dir}\nA4 folder:     {a4_dir}\n")

    missing, renders, sources = [], [], []
    for doc, earlier in DOCS.items():
        names = [doc, *earlier]
        for size, folder in (("letter", letter_dir), ("a4", a4_dir)):
            src = find(folder, names)
            dest = OUT / size / f"{PREFIX}-{doc}.pdf"
            if not src:
                missing.append(f"{size}: {doc} (or {', '.join(earlier)})")
                continue
            print(f"{size:6} {doc:32} ← {src.name}")
            if src.name != dest.name:
                rel = os.path.relpath(src, v3_root)
                sources.append(f'      {doc}: {size}: "{rel}"')
            if not args.dry_run:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dest)
            if size == "a4":
                renders += ["--render", f"{doc}={dest if not args.dry_run else src}:{args.pages}"]

    if missing:
        print("\nNot found (build these in V3, or pass --letter-dir / --a4-dir):")
        for m in missing:
            print(f"  {m}")
    if sources:
        print("\nV3 names differ from the published names; set `source` on these documents:")
        print("\n".join(sources))

    cmd = [sys.executable, str(REPO / "scripts" / "import-trip.py"), SLUG, *renders]
    if args.hero:
        cmd += ["--hero", args.hero, "--hero-name", "hero-queenstown"]
    if args.dry_run:
        cmd.append("--dry-run")
    if renders or args.hero:
        print("\n" + " ".join(f'"{c}"' if " " in c else c for c in cmd) + "\n")
        subprocess.run(cmd, check=True)
    sys.exit(1 if missing else 0)


if __name__ == "__main__":
    main()
