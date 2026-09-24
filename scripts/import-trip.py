#!/usr/bin/env python3
"""Import one trip's images and PDFs into the website.

Run with /Library/Frameworks/Python.framework/Versions/3.12/bin/python3.
Needs Pillow and PyMuPDF (pip3 install pillow pymupdf).

Writes under apps/web/public/trips/<slug>/:
  <name>.jpg              prepared page images and the hero, compressed
  <doc>-cover.jpg         rendered from a PDF's first page (cover width)
  <doc>-p<N>.jpg          rendered from PDF page N, 1-based physical page
  letter/<file>.pdf       US Letter editions (gitignored; restored by sync:trip-pdfs)
  a4/<file>.pdf           A4 editions (gitignored)

Every JPEG is at most --max-width px wide (default 1400), quality 80,
progressive. The bound trip pack (*-trip-pack.pdf) is excluded by default:
the site publishes separate documents only.

Usage and examples: scripts/README-import-trip.md
"""
from __future__ import annotations

import argparse
import fnmatch
import json
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required: pip3 install pillow")

REPO = Path(__file__).resolve().parent.parent
PUBLIC = REPO / "apps" / "web" / "public"
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}


def save_jpeg(img: Image.Image, dest: Path, max_width: int, quality: int, dry: bool) -> dict:
    if img.mode not in ("RGB", "L"):
        bg = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
            bg.paste(img, mask=img.split()[-1])
        else:
            bg.paste(img.convert("RGB"))
        img = bg
    elif img.mode == "L":
        img = img.convert("RGB")
    if img.width > max_width:
        h = round(img.height * max_width / img.width)
        img = img.resize((max_width, h), Image.LANCZOS)
    if not dry:
        dest.parent.mkdir(parents=True, exist_ok=True)
        img.save(dest, "JPEG", quality=quality, progressive=True, optimize=True)
    return {"file": dest.name, "width": img.width, "height": img.height}


def expand(paths: list[str], exts: set[str], match: str, exclude: list[str]) -> list[Path]:
    out: list[Path] = []
    for raw in paths:
        p = Path(raw).expanduser()
        if p.is_dir():
            candidates = sorted(c for c in p.iterdir() if c.is_file())
        elif p.is_file():
            candidates = [p]
        else:
            sys.exit(f"Not found: {p}")
        for c in candidates:
            if c.suffix.lower() not in exts:
                continue
            if p.is_dir() and not fnmatch.fnmatch(c.name, match):
                continue
            if any(fnmatch.fnmatch(c.name, x) for x in exclude):
                continue
            out.append(c)
    return out


def parse_pages(spec: str) -> list[str]:
    pages = [s.strip() for s in spec.split(",") if s.strip()]
    for s in pages:
        if s != "cover" and not s.isdigit():
            sys.exit(f"Bad page '{s}': use 'cover' or a 1-based page number")
    return pages


def render(pdf: Path, doc: str, pages: list[str], outdir: Path, args) -> list[dict]:
    try:
        import fitz  # PyMuPDF
    except ImportError:  # pragma: no cover
        sys.exit("PyMuPDF is required for --render: pip3 install pymupdf")
    written = []
    with fitz.open(pdf) as d:
        for spec in pages:
            n = 1 if spec == "cover" else int(spec)
            if not 1 <= n <= d.page_count:
                sys.exit(f"{pdf.name} has {d.page_count} pages; asked for {spec}")
            page = d[n - 1]
            width = min(args.cover_width if spec == "cover" else args.page_width, args.max_width)
            # Render at twice the target and downsample, for clean type.
            zoom = 2 * width / page.rect.width
            pix = page.get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
            img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
            h = round(img.height * width / img.width)
            img = img.resize((width, h), Image.LANCZOS)
            name = f"{doc}-cover.jpg" if spec == "cover" else f"{doc}-p{n}.jpg"
            info = save_jpeg(img, outdir / name, args.max_width, args.quality, args.dry_run)
            info["from"] = f"{pdf.name} page {n}"
            written.append(info)
    return written


def main() -> None:
    ap = argparse.ArgumentParser(description="Import one trip's images and PDFs into apps/web/public/trips/<slug>/.")
    ap.add_argument("slug", help="trip slug, e.g. costa-rica")
    ap.add_argument("--images", nargs="+", default=[], metavar="PATH",
                    help="prepared page images, or folders of them; copied and compressed, names kept")
    ap.add_argument("--hero", metavar="PATH", help="hero photograph")
    ap.add_argument("--hero-name", default="hero", help="file name for the hero, without .jpg (default: hero)")
    ap.add_argument("--render", action="append", default=[], metavar="DOC=PDF:PAGES",
                    help="render pages from a PDF when no prepared images exist, e.g. "
                         "trip-leader-card=/path/x.pdf:cover,3,5,6 (repeatable)")
    ap.add_argument("--render-dir", metavar="DIR",
                    help="render every <prefix>-<doc>.pdf in DIR with --pages (needs --prefix)")
    ap.add_argument("--prefix", help="PDF file-name prefix for --render-dir, e.g. hrsc-ot02-costa-rica")
    ap.add_argument("--pages", default="cover,2,3,4", help="pages for --render-dir (default: cover,2,3,4)")
    ap.add_argument("--letter", nargs="+", default=[], metavar="PATH", help="US Letter PDFs or folders")
    ap.add_argument("--a4", nargs="+", default=[], metavar="PATH", help="A4 PDFs or folders")
    ap.add_argument("--match", default="*.pdf", help="only PDFs in folders whose name matches (default: *.pdf)")
    ap.add_argument("--exclude", action="append", default=None,
                    help="skip files matching this pattern (repeatable; default: *-trip-pack.pdf)")
    ap.add_argument("--max-width", type=int, default=1400)
    ap.add_argument("--quality", type=int, default=80)
    ap.add_argument("--cover-width", type=int, default=935, help="rendered cover width (default 935, as Washington, DC)")
    ap.add_argument("--page-width", type=int, default=1105, help="rendered page width (default 1105, as Washington, DC)")
    ap.add_argument("--manifest", metavar="FILE", help="also write the JSON report to FILE")
    ap.add_argument("--dry-run", action="store_true", help="report what would be written; write nothing")
    args = ap.parse_args()

    exclude = args.exclude if args.exclude is not None else ["*-trip-pack.pdf"]
    outdir = PUBLIC / "trips" / args.slug
    report: dict = {"slug": args.slug, "public": f"/trips/{args.slug}", "images": [], "letter": [], "a4": []}

    for src in expand(args.images, IMAGE_EXT, "*", exclude):
        with Image.open(src) as img:
            info = save_jpeg(img, outdir / f"{src.stem.lower()}.jpg", args.max_width, args.quality, args.dry_run)
        info["from"] = str(src)
        report["images"].append(info)

    if args.hero:
        with Image.open(args.hero) as img:
            info = save_jpeg(img, outdir / f"{args.hero_name}.jpg", args.max_width, args.quality, args.dry_run)
        info["from"] = args.hero
        report["images"].append(info)

    for spec in args.render:
        if "=" not in spec or ":" not in spec:
            sys.exit(f"Bad --render '{spec}': use DOC=PDF:PAGES")
        doc, rest = spec.split("=", 1)
        pdf, pages = rest.rsplit(":", 1)
        report["images"] += render(Path(pdf).expanduser(), doc, parse_pages(pages), outdir, args)

    if args.render_dir:
        if not args.prefix:
            sys.exit("--render-dir needs --prefix")
        pages = parse_pages(args.pages)
        for pdf in expand([args.render_dir], {".pdf"}, f"{args.prefix}-*.pdf", exclude):
            doc = pdf.stem[len(args.prefix) + 1:]
            report["images"] += render(pdf, doc, pages, outdir, args)

    for edition in ("letter", "a4"):
        for pdf in expand(getattr(args, edition), {".pdf"}, args.match, exclude):
            dest = outdir / edition / pdf.name
            if not args.dry_run:
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(pdf, dest)
            report[edition].append({
                "url": f"/trips/{args.slug}/{edition}/{pdf.name}",
                "bytes": pdf.stat().st_size,
                "from": str(pdf),
            })

    text = json.dumps(report, indent=2)
    print(text)
    if args.manifest:
        Path(args.manifest).write_text(text + "\n")
    n_img, n_l, n_a = len(report["images"]), len(report["letter"]), len(report["a4"])
    verb = "Would write" if args.dry_run else "Wrote"
    print(f"{verb} {n_img} images, {n_l} Letter PDFs, {n_a} A4 PDFs to {outdir}", file=sys.stderr)


if __name__ == "__main__":
    main()
