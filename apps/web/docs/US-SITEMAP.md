# ETI360 US site: sitemap and page plan

Reconciled 2026-09-22 to the V3 implementation plan of 2026-09-18
(`brain/plan/school-travel-preparation-service-implementation.html`, "approved direction").
The 2026-09-17 tree (seven destination trips with seven documents each, `/us/ohio`) is superseded;
what was dropped is listed at the end so nothing is lost.

Dan's rulings, 2026-09-22:

1. **National, never state-scoped.** No `/us/ohio` and no state landing pages. Every US page is
   written as if it applies to any state. The state relationship lives in the email and in the
   sample school. The business address still appears on every US page:
   412 Avon Belden Rd, Avon Lake, OH 44012.
2. **Separate documents, never one PDF.** A school files, prints and sends the documents to different
   people, so each trip is delivered as individual documents: School Trip Record (the office),
   Trip Leader Card (the leader and chaperones), Family Trip Brief (families). The website presents
   them that way: three files per trip, each with its own thumbnail, view and download. The combined
   pack stays an internal working layout and is never offered on the site.
3. **Annual pack: yes.** Read from Dan's "Yes. I would like to do this." against the per-trip-or-annual
   question. Per-trip documents and the annual field-trip pack (one pack per school year, one page
   per trip, a calendar for each month, as the elementary Field Trip Risk Assessment Pack in the
   parts bin) are both offered. Confirm the reading before the offer page is written.
4. **The ten Cleveland destinations** are the queue's ten (below). Playhouse Square and the Orchestra,
   named in the Sep 18 plan, are out: performance venues are date-specific, which the plan itself
   flagged as a risk. Cuyahoga Valley tests outdoor movement, weather and communications; Lake Erie
   Nature & Science Center tests a near-suburban westbound route.

Sample school on every US page: **Horizon Ridge School of Cleveland** (fictional; ADR-013 to 015),
never "Harborview School". Required disclosure on the collection page, every trip page, every PDF
cover, the map and the metadata: "Horizon Ridge School of Cleveland is a fictional school; its location
is shown for illustrative purposes."

## URL tree

```
/us                                          market page (live, unlinked from nav until Dan says live)
/us/field-trips                              field-trip offer: the three documents, inputs, who uses each, annual pack, contact
/us/field-trips/cleveland                    Cleveland collection: sample school, disclosure, map, one card per built trip
/us/field-trips/cleveland/{slug}             worked trip page, one template, three separate PDFs
/us/trips/washington-dc                      wave 2: the overnight example (HRC-CLE-OT01), four separate PDFs
```

`/us/trips` exists only as the home of overnight and multi-day examples; it gets an index page only when
a second overnight example is built. Field trips and overnight trips never share a list.

### The ten Cleveland field trips

| # | Slug | Destination | Learning lens | Operating pattern tested | Official starting source | Status |
|--:|---|---|---|---|---|---|
| 01 | `great-lakes-science-center` | Great Lakes Science Center | STEM and engineering | Downtown lakefront; timed workshop; 1:5 ratio; group lunch; bus parking | greatscience.com field-trip planning | Documents built (golden-master candidate) |
| 02 | `cleveland-metroparks-zoo` | Cleveland Metroparks Zoo | Wildlife and conservation | Large outdoor site; weather; subgroups; extended walking | clevelandmetroparks.com school and youth visits | Documents built |
| 03 | `cleveland-museum-of-art` | Cleveland Museum of Art | Visual literacy and culture | Indoor galleries; free-admission model; group conduct; 1:10 ratio | clevelandart.org guided school tours | Queue |
| 04 | `cuyahoga-valley-national-park` | Cuyahoga Valley National Park | Outdoor education and ecology | Outdoor movement; trail choice; weather and communications | nps.gov/cuva/learn/education/classrooms/fieldtrips.htm | Queue |
| 05 | `cleveland-museum-of-natural-history` | Cleveland Museum of Natural History | Natural science and human health | Museum program; current group entry; University Circle | cmnh.org at-the-museum programs | Queue |
| 06 | `greater-cleveland-aquarium` | Greater Cleveland Aquarium | Aquatic life and conservation | Timed indoor visit; capacity caps; bus movement to the Flats | greaterclevelandaquarium.com school field trips | Queue |
| 07 | `cleveland-history-center` | Cleveland History Center | Local history and civic identity | Historic site; rotating program; University Circle | wrhs.org education | Queue |
| 08 | `cleveland-botanical-garden` | Cleveland Botanical Garden | Plant science and urban ecology | Indoor/outdoor mix; seasonal conditions; footwear and weather | holdenfg.org schools and groups | Queue |
| 09 | `rock-and-roll-hall-of-fame` | Rock & Roll Hall of Fame | Music, history and social movements | Downtown lakefront; structured school visit; event traffic | rockhall.com onsite education programs | Queue |
| 10 | `lake-erie-nature-science-center` | Lake Erie Nature & Science Center | Nature science and local wildlife | Near-suburban nature program; longer westbound route | lensc.org/learn/field-trips | Queue |

Trip IDs follow the V3 record: `HRC-CLE-FT01` to `FT10`; the overnight example is `HRC-CLE-OT01`.
Source URLs and verification dates live in each trip's V3 source log, not on the page copy; the trip
page shows the official link and the reviewed date.

Rules carried from the first version: the collection and the map show only trips whose three documents
exist (no placeholders, no "coming soon"); `/us` joins the header nav only when Dan says the section is
live; every PDF is Letter size; American English; Fahrenheit and miles; 911; the FERPA line on the
Family Trip Brief and the Trip Leader Card; no ISO naming; no em-dashes; no document counts as a selling
point; no prices; the responsibility line on every page ("ETI360 prepares and organizes the supporting
information. The school and its providers retain responsibility for decisions, supervision, live
assessment, and final approval.").

## Page plans

### /us (exists; body recut pending)

The first viewport already carries the locked category and headline (applied 2026-09-21). The body is
still the 2026-09-16 build and changes as follows.

| Section | Now | Becomes |
|---|---|---|
| Hero | Locked category, headline, explanation | Unchanged; add the proof bridge ("See how one Cleveland school could prepare ten familiar field trips, from the art museum and zoo to the Science Center and the Cuyahoga Valley.") and the two CTAs: Explore the Cleveland field trips · Contact ETI360 |
| "Per trip · Seven documents" line | Present | Removed (document count as a sell) |
| TierBand "Trip Readiness for US schools" with "Is this trip ready for the Head to approve?" | Present | Removed (assumes one approval structure) |
| Seven Harborview DocRows | Present | Replaced by the three field-trip documents from the Great Lakes Science Center set, each with who uses it and its page-1 thumbnail, linking to `/us/field-trips` |
| Wider trip range | Absent | One line under the documents: local field trips, Washington trips, service immersion, outdoor education, language travel, international programs. Links to `/us/trips/washington-dc` once built |
| Broader document framework | Leads the page | Moves below the field-trip proof as a short block: the longer-trip documents (working file, itinerary, medical access, family pack, field pack, weather, post-trip) in one paragraph with a link to `/for-schools`, no thumbnails, no count |
| Q&A | Operator, standard, FERPA, who does the work, pricing without numbers | Keep operator, FERPA, who does the work. "Which standard" answers with the Operational Capability Framework line, never ISO. Drop the pricing answer until the offer is set |
| Trip list in page source and metadata | Names New York and Chicago | Replaced by the ten Cleveland field trips and the Washington overnight |
| Sample school | Harborview thumbnails | Horizon Ridge School of Cleveland throughout |
| Where we are · Dan's paragraph · CtaCard | Present | Unchanged |

### /us/field-trips (new)

| Section | Content spine | Visual |
|---|---|---|
| Hero | Category line; "Field trip documents for the trips your school runs every year"; one sentence: ETI360 works from the school's booking, itinerary and requirements to prepare the documents the office, the trip leader and families each need | Collection photo (reuse `public/us/images/ohio-hero.jpg`, Lake Erie shoreline; the file name is only a file name) |
| The three documents | One block each: School Trip Record (office: facts, bookings, transport, responsibilities, approval line); Trip Leader Card (two printed sides: day plan, groups, phones, emergency sequence, nearest ER and route); Family Trip Brief (letter, schedule, what to bring, permission slip). Who uses it, what it holds, what the school completes | Page-1 plate of each from the GLSC set |
| What the school sends | Booking confirmation or venue page, the day's plan, chaperone and student counts (never names), school requirements and forms. Documents arrive by email | None |
| The annual pack | One pack per school year: one page per trip and a calendar for each month, built from the same records (ruling 3; confirm) | One spread plate from the parts-bin Field Trip Risk Assessment Pack, re-rendered for Horizon Ridge |
| Who does the work | ETI360 prepares and organizes; the school reviews, completes, amends and approves; the responsibility line | None |
| See the work | Link to `/us/field-trips/cleveland` | None |
| Closing | Dan's paragraph · CtaCard. No prices, turnaround or revision terms until the offer is set (plan phase 7) | None |

Open naming decision for the offer page title: the Sep 18 plan calls the artifact the "Field Trip
Preparation Report", which reads as one document and now contradicts ruling 2. Until Dan names the set,
copy says "field trip documents" and never "report" or "pack" for the deliverable.

### /us/field-trips/cleveland (new)

| Section | Content spine | Visual |
|---|---|---|
| Hero | "Ten field trips, one sample school"; the fictional disclosure in the first viewport | Full-width Mapbox map in the ETI360 document style: the school marker at the locked origin (41.486542, -81.755906) and one marker per built trip, school-to-venue routes |
| The sample school | Horizon Ridge School of Cleveland: K–12, west side, one locked origin, the same school record behind every trip; why a sample school (no real student data, every fact traceable to an official venue source); one line that the same documents apply to any school's local field trips in any state | Horizon Ridge wordmark, small |
| Trip cards | One card per built trip: destination photo, learning lens, grade band, the one operating pattern it tests, "three documents" as a label not a count sell. Cards appear as trips land; never a placeholder | Card grid, 2 across on desktop |
| How a trip is prepared | Booking and itinerary in, three documents out, approval stays with the school | The existing preparation flow, no new diagram |
| Closing | Dan's paragraph · CtaCard | None |

### /us/field-trips/cleveland/{slug} (new, one template)

| Section | Content spine | Visual |
|---|---|---|
| Hero | Destination name, grade band, date window, day pattern; "Horizon Ridge School of Cleveland (sample school)" and the disclosure | Destination photo, full bleed, no people in focus |
| The day | Door-to-door timeline summarized from the School Trip Record: depart, arrive, program, lunch, regroup, return | Route map plate (school to venue, nearest ER marked) |
| The documents | Three DocRows, each its own PDF with view and download: School Trip Record, Trip Leader Card, Family Trip Brief. Who uses each and what the school completes | Page-1 thumbnail per document |
| What is different about this trip | Two or three operational specifics from the record (ratio, timed workshop, weather exposure, capacity cap, walking distance) | None |
| Sources and review | The official venue page, the date the facts were reviewed, the responsibility line | None |
| Closing | Dan's paragraph · CtaCard | None |

### /us/trips/washington-dc (wave 2)

Same template with four documents (School Trip Record, Trip Leader Card, Family Trip Brief, Educational
Journey) and the three day-by-day site pages as the visual. Built only after the DC pack is split into
its documents and its open items close (photos, USHMM option).

## Data contract per trip

Delivered by V3 (`customers/hrs-cleveland/`, rendered by `render_pdf.py`, which gains per-document
output: one PDF per deliverable from the same HTML, split on the existing bookmarks or rendered per
section). Files land at `public/us/field-trips/cleveland/{slug}/`:

```
HRC-CLE-FT01-school-trip-record.pdf      HRC-CLE-FT01-trip-leader-card.pdf      HRC-CLE-FT01-family-trip-brief.pdf
thumb-school-trip-record.png             thumb-trip-leader-card.png             thumb-family-trip-brief.png
route.png                                hero.jpg
```

The page template reads a `usFieldTrips` entry in `src/content/usFieldTrips.ts`:
`slug, id, title, venue, gradeBand, window, learningLens, operatingPattern[], day[], documents[{key, title, users, completes, pdf, thumb, pages}], plates{route}, hero{src, alt}, sources[{label, url, reviewed}]`.
The overnight page reads the same shape from `usTrips.ts` with four documents and `dayPages[]`.

## Images the section needs

The 2026-09-17 US Website Image Set (Canva `DAHVdTho3hM`, 17 files in `public/us/images/`) stays for
`/us` and the Washington overnight page (`washington-dc-hero.jpg`, `washington-dc-2.jpg`). The Cleveland
section needs one destination photo per built trip: landscape, no people in focus, no logos, licensed
stock from Canva, exported 1600x900 to `public/us/field-trips/cleveland/{slug}/hero.jpg`. Add a
"Cleveland Field Trips" page set to the same Canva folder (Trip Images `FAHRAuL7yJM`), one labeled slot
per destination. Governance documents on the trip pages carry no decorative photography; the photos
are for the web pages only.

## Sitemap entries (`src/app/sitemap.ts`)

`/us` 0.8 monthly (present). Add on launch: `/us/field-trips` 0.8 monthly, `/us/field-trips/cleveland`
0.8 monthly, `/us/field-trips/cleveland/{slug}` 0.7 monthly for each built trip, `/us/trips/washington-dc`
0.7 monthly when built. No `/us/ohio`.

## Build order

1. V3: per-document PDF output from `render_pdf.py`; split the GLSC and Zoo packs into three files each;
   Dan approves GLSC as the golden master (unlocks the batch and the US LinkedIn post).
2. `usFieldTrips.ts` and the `/us/field-trips/cleveland/[slug]` template, built against GLSC.
3. `/us/field-trips/cleveland` with the Mapbox map (two cards at launch, growing as trips land).
4. `/us/field-trips` offer page (after ruling 3 is confirmed and the deliverable set is named).
5. `/us` body recut per the table above.
6. Sitemap entries; nav link when Dan says live.
7. Wave 2: `/us/trips/washington-dc` after the DC documents are split.
8. Remaining eight Cleveland trips in the plan's batch order, each landing as its own card and page.

## Superseded on 2026-09-22

From the 2026-09-17 version, dropped by the Sep 18 direction and Dan's rulings: the seven-destination
trip set HUS-T01 to T07 (Washington DC, Appalachia, Hocking Hills, El Salvador, Costa Rica, Quebec City,
Italy) with seven documents each and a departure city per trip; `/us/trips` as their index; `/us/ohio`
and the "one thin state landing page per state" model; "Harborview School, northeast Ohio" as the sample
school. The exported images for those destinations remain in `public/us/images/` unused. An overnight
or international example returns only as a built set of documents under `/us/trips/{slug}`.
