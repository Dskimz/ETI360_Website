#!/usr/bin/env python3
"""Refuse a PDF that says ETI360 designated a hospital (V3 ADR-025, Dan 2026-09-25).

The hospital rule: ETI360 lists the emergency departments by drive time; the
school or provider confirms which one the group uses. No document calls a
hospital or an emergency department "designated". Other uses of the word
stay ("designated welfare contact", "designated wilderness", "designated
sites"), so only "designat…" within a few words of a hospital word counts.

    python3 scripts/check-pdf-wording.py FILE.pdf [FILE.pdf …]

Prints each hit with its page and context and exits 1 if there is any, 2 if
PyMuPDF is missing. Run by scripts/sync-trip-pdfs.mjs before it copies or
links anything, and by scripts/upload-docs-s3.py before it uploads, so a PDF
with the old wording never reaches public/ or the bucket.
"""
from __future__ import annotations

import re
import sys

HOSPITAL = r"(?:emergency|hospital|department|medical|clinic|A&E|ER\b)"
PATTERN = re.compile(
    rf"designat\w*(?:\W+\w+){{0,3}}?\W+{HOSPITAL}"
    rf"|(?:emergency department|hospital|clinic)s?(?:\W+\w+){{0,3}}?\W+designat\w*",
    re.IGNORECASE,
)


def hits(path: str) -> list[tuple[int, str]]:
    import fitz  # PyMuPDF

    found: list[tuple[int, str]] = []
    with fitz.open(path) as doc:
        for number, page in enumerate(doc, start=1):
            text = re.sub(r"\s+", " ", page.get_text())
            for m in PATTERN.finditer(text):
                found.append((number, text[max(0, m.start() - 60): m.end() + 40]))
    return found


def main(paths: list[str]) -> int:
    try:
        import fitz  # noqa: F401
    except ImportError:
        print("PyMuPDF is required for the wording check: pip3 install pymupdf", file=sys.stderr)
        return 2
    bad = 0
    for path in paths:
        found = hits(path)
        if found:
            bad += 1
            print(f"{path}: {len(found)} hospital 'designated' hit(s)")
            for page, context in found[:5]:
                print(f"  p{page}: …{context}…")
    if bad:
        print(f"{bad} of {len(paths)} PDFs say a hospital is designated (ADR-025). Re-render them before publishing.")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
