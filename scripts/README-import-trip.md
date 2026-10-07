# Importing a trip

A worked trip on the site is three things: a content file
(`apps/web/src/content/trips/<slug>.ts`), page images under
`apps/web/public/trips/<slug>/` (committed), and PDFs under
`apps/web/public/trips/<slug>/letter/` and `.../a4/` (gitignored, restored from
the V3 repo by `npm run sync:trip-pdfs`).

`scripts/import-trip.py` does the file work, for worked trips (the default,
`--root trips`) and for single-document versions (`--root versions`, below). Run it with
`/Library/Frameworks/Python.framework/Versions/3.12/bin/python3` (Pillow and
PyMuPDF are installed there).

## What it writes

| Input | Output under `public/trips/<slug>/` |
| --- | --- |
| `--images PATH…` prepared page images or folders | `<stem>.jpg`, compressed, name kept (lowercased) |
| `--hero PATH [--hero-name NAME]` | `<NAME>.jpg` (default `hero.jpg`) |
| `--render DOC=PDF:PAGES` (repeatable) | `DOC-cover.jpg` for `cover` (page 1, 935 px wide), `DOC-p<N>.jpg` for page N (1105 px wide) |
| `--render-dir DIR --prefix P [--pages cover,2,3,4]` | the same, for every `P-<doc>.pdf` in DIR |
| `--letter PATH…` PDFs or folders | `letter/<file>.pdf` |
| `--a4 PATH…` PDFs or folders | `a4/<file>.pdf` |

Every JPEG: at most 1400 px wide (`--max-width`), quality 80 (`--quality`),
progressive, optimized. Page numbers are 1-based physical PDF pages, which is
what `?page=N` on the open link jumps to, so captions must use the same number.
`--match GLOB` filters PDFs taken from folders; the bound trip pack
(`*-trip-pack.pdf`) is excluded by default, because the site publishes separate
documents only. `--dry-run` writes nothing. The JSON report on stdout (also
`--manifest FILE`) gives each image's width and height: copy those into the
content file (`helpers.ts` has the standard Letter and A4 sizes).

## Examples

Costa Rica, rendering pages straight from the Letter PDFs and copying both
editions:

```sh
PY=/Library/Frameworks/Python.framework/Versions/3.12/bin/python3
V3="/Users/danskimin/00 - ETI360 - V3/customers/hrs-cleveland/outputs/pdf"
$PY scripts/import-trip.py costa-rica \
  --hero ~/Downloads/arenal.jpg --hero-name hero-arenal \
  --render "trip-leader-card=$V3/hrsc-ot02-costa-rica-trip-leader-card.pdf:cover,3,5,6" \
  --render "family-trip-brief=$V3/hrsc-ot02-costa-rica-family-trip-brief.pdf:cover,2,3,5" \
  --letter "$V3" --a4 "$V3/a4" --match "hrsc-ot02-costa-rica-*.pdf" \
  --manifest /tmp/costa-rica.json
```

Default pages for every document at once, then override the ones that need
chosen pages:

```sh
$PY scripts/import-trip.py costa-rica --render-dir "$V3" --prefix hrsc-ot02-costa-rica --pages cover,2,3,4
```

A trip whose page images were prepared in V3 (as Washington, DC was):

```sh
$PY scripts/import-trip.py washington-dc --images "/path/to/website/images/"
```

## Then

1. Write `apps/web/src/content/trips/<slug>.ts` (copy `washington-dc.ts`):
   `tripPaths({ slug, filePrefix })` builds the image and PDF paths, and
   `pdfSource` records the V3 folders, relative to the V3 root, for the sync.
   A document whose V3 file name differs from its published name sets
   `source: { letter, a4 }`. An edition not yet built is `editions(doc, { a4: false })`,
   and the page shows "A4 edition in preparation".
2. `npm run sync:trip-pdfs -- --check` confirms every linked PDF exists in V3.
3. `npm run lint -w @eti360/web && npm run build -w @eti360/web`.

## Restoring PDFs on a fresh checkout

```sh
npm run sync:trip-pdfs            # copy what is missing or changed
npm run sync:trip-pdfs -- --check # report only
npm run sync:trip-pdfs -- --force # recopy everything
```

The V3 root defaults to `/Users/danskimin/00 - ETI360 - V3`; set
`ETI360_V3_ROOT` elsewhere. The script reads every version from the registry,
`src/content/versions/index.ts`, so it copies exactly what the site links to
and exits non-zero if a linked PDF is missing at its source. A version with no
`pdfSource` is skipped (the Travel Program Review sample: only
`publish_baseline_report.py` in the rebuild repo writes it). An edition whose
URL is absolute (object storage) is skipped.

## Single-document versions (`--root versions`)

A product's other versions (the Travel Program Review sample, a Field Trip
Package pack, a Conference Travel Package guide) are one document each, shown
whole on the product page. Their content files live in
`apps/web/src/content/versions/<slug>.ts` and use `docPaths()` from
`src/content/trips/helpers.ts`. Their images go under
`apps/web/public/versions/<slug>/` (committed); their PDFs go to
`apps/web/public/docs/<file>.pdf`, written by the builder's publish step or by
`npm run sync:trip-pdfs`, so `--letter` and `--a4` are refused with this root.

```sh
PY=/Library/Frameworks/Python.framework/Versions/3.12/bin/python3
$PY scripts/import-trip.py harborview-review --root versions \
  --render "travel-program-review=apps/web/public/docs/travel-program-review-harborview-a4.pdf:cover,2,5,18"
```

Render from the version's default edition (US Letter for a US school, A4 for
an international school), and copy the reported sizes into the content file
(`A4_COVER`/`A4_PAGE` in `helpers.ts` for A4).

## Harborview's Queenstown set (`import-queenstown.py`)

Harborview's own trip (HIS-T07) was built in V3 under the Sep 29 document
names; some files may still carry the earlier names.
`scripts/import-queenstown.py` finds each document under either name in the
V3 Letter and A4 folders, copies both editions under the published names,
renders the cover and pages 2 and 3 from the A4 edition, and prints the
`source` lines for any file whose V3 name differs. Then fill the `V3:`
placeholders in `src/content/versions/queenstown.ts` and set `READY = true`;
the Case Study switches from Italy to Queenstown on its own
(`src/content/case-study-trip.ts`). The build fails while a
`V3` placeholder remains. Queenstown is Case Study only (Dan, 2026-10-07): no
/trips/queenstown page, not on Examples or in the sitemap.
