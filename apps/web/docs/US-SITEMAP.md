# ETI360 US site: sitemap and page plan

Dan, 2026-09-17: the US market gets its own section of eti360.com, marketed to US independent and religious schools from the Ohio scan outward. Trips are published by destination, national, never state-scoped (an Ohio school and a Pennsylvania school run the same Washington trip with the same Working File). The state relationship lives in the email, the sample school, and one thin state landing page per state we work.

US business address on every US page: 412 Avon Belden Rd, Avon Lake, OH 44012.

## URL tree

```
/us                          market page (built 2026-09-16, unlinked from nav until Dan says live)
/us/trips                    index: Mapbox map of the example trips, one card per trip with documents ready
/us/trips/washington-dc      HUS-T01  8th grade, 4 days, late March           departs Chicago, IL
/us/trips/appalachia         HUS-T02  service week, WV, 6 days, mid June       departs Pittsburgh, PA
/us/trips/hocking-hills      HUS-T03  outdoor week, OH, 5 days, mid September  departs Columbus, OH
/us/trips/el-salvador        HUS-T04  service immersion, 8 days, mid June      departs Houston, TX
/us/trips/costa-rica         HUS-T05  service and ecology, 9 days, mid June    departs Los Angeles, CA
/us/trips/quebec-city        HUS-T06  Montreal and Quebec City, 5 days, May    departs Boston, MA
/us/trips/italy              HUS-T07  Rome and Florence, 10 days, mid June     departs Atlanta, GA
/us/ohio                     thin state landing for the Ohio email wave
```

Departure cities (Dan, 2026-09-17): each trip starts from the center of a different US city so the sample school never geocodes onto a real building and the set reads as national. The sample school stays "Harborview School", northeast Ohio, on the `/us` page; on a trip page the departure city is the trip's own.

Rules: the index and the nav show only trips whose seven documents exist (no placeholders, no "coming soon"); `/us` is added to the header nav only when Dan says the section is live; every US page is Letter-size in its PDFs, American English, Fahrenheit and miles, 911 (112 in Italy), FERPA line on the Parent Pack and Field Pack, no ISO naming, no em-dashes.

## Page plans

### /us (exists)
Hero "Seven documents for the trips your school actually runs." · TierBand Trip Readiness for US schools · the seven DocRows · Q&A (operator, standard, FERPA, who does the work, pricing without numbers) · Where we are (address, two business days) · Dan's closing paragraph · CtaCard. Change when trips land: the seven DocRow thumbnails swap from the Harborview International set to the US set (Appalachia Working File first), and a "See the example trips" link to `/us/trips` goes under the TierBand.

### /us/trips (new)
| Section | Content spine | Visual |
|---|---|---|
| Hero | The trips US schools run, prepared the same way every time | Full-width Mapbox map (ETI360 document style), seven markers, departure city to destination arcs |
| Trip cards | One card per trip: destination photo, grade, days, window, movement, the two documents that matter most for that trip | Card grid, 2 across on desktop |
| How a trip is prepared | Itinerary in, seven documents out, approval stays with the school | The existing preparation flow, no new diagram |
| Closing | Dan's paragraph · CtaCard | No imagery |

### /us/trips/{slug} (new, one template)
| Section | Content spine | Visual |
|---|---|---|
| Hero | Trip name, grade, days, window, departure city | Destination photo, full bleed, no people in focus |
| The trip | Day-by-day summary from the Itinerary Report; movement and lodging | Calendar view plate from the Itinerary Report |
| What the school receives | The seven documents for this trip, each with its page-1 thumbnail and a reader link | DocRows (reuse `DocShowcase`) |
| Why this trip needs the file | Two or three concrete moments from the Working File (the roofline crew, the border crossing, the rainforest walk) | One Working File page plate |
| Medical access | Nearest ER and urgent care per location, drive times | Medical Access map plate |
| Closing | Dan's paragraph · CtaCard | No imagery |

Data contract per trip (delivered by the trip-building session, `dev/us-trips/output/`): seven PDFs, page-1 PNGs at the library size, the calendar plate, the Working File plate, the Medical Access plate, and one hero photo chosen in Canva. The page template reads a `usTrips` entry in `src/content/usTrips.ts` (slug, id, title, grade, days, window, departure, movement, documents[], plates{}, hero{}).

### /us/ohio (new, thin)
Roughly 300 words: ETI360 is in Avon Lake; the Ohio trips Ohio schools run (Hocking Hills, Appalachia, Washington, El Salvador from the diocesan relationship); departure from Cleveland, Columbus, Cincinnati; a link to `/us/trips` and to the seven documents on `/us`; Dan's paragraph. Same template for each later state with the state's own departure points and outdoor trip. Link target for the Ohio email wave (`utm_term` per school as before).

## Images the section needs

Canva design "ETI360 US Website Image Set" (`DAHVdTho3hM`, folder Trip Images `FAHRAuL7yJM`) carries the shot list, one 1600x900 page per slot with a gray label. Every image: landscape, no people in focus, no logos, licensed stock from Canva. Governance documents on the trip pages carry no decorative photography; the photos below are for the web pages and the two-page covers only.

| Slot | Place | Shot |
|---|---|---|
| Index hero (fallback if the map is not full-bleed) | United States | Continental US from altitude, or a highway at dawn |
| washington-dc | Washington, DC | National Mall from the Lincoln Memorial steps toward the Capitol, or the Capitol dome; Metro platform as secondary |
| appalachia | New River Gorge, WV | Gorge and bridge from Grandview or the overlook; coalfield valley road as secondary |
| hocking-hills | Hocking Hills State Park, OH | Old Man's Cave gorge with the sandstone recess; Lake Logan at dawn as secondary |
| el-salvador | El Salvador | Volcanic highlands above Santa Ana or Izalco; rural parish street as secondary |
| costa-rica | Monteverde or Jaco | Cloud forest canopy walkway, or the Pacific coast at Jaco; river float as secondary |
| quebec-city | Quebec City | Chateau Frontenac and the Old Town from the Terrasse Dufferin; Montreal Old Port as secondary |
| italy | Rome and Florence | Florence from Piazzale Michelangelo at dusk; Roman Forum as secondary |
| ohio landing | Avon Lake, OH | Lake Erie shoreline at Avon Lake; Cleveland skyline from the lake as secondary |
| departure cities (small, optional) | Chicago, Pittsburgh, Columbus, Houston, Los Angeles, Boston, Atlanta | Skyline or airport approach, used at card size only if the design wants them |

## Sitemap entries (`src/app/sitemap.ts`)

`/us` 0.8 monthly (present). Add on launch: `/us/trips` 0.8 monthly, `/us/trips/{slug}` 0.7 monthly for each built trip, `/us/ohio` 0.6 monthly.

## Build order

1. `usTrips.ts` content module and the `/us/trips/[slug]` template, built against HUS-T02 Appalachia as soon as its seven documents exist.
2. `/us/trips` index with the Mapbox map (reuse the tile style and marker treatment from the Ohio scan map).
3. `/us/ohio` landing.
4. `/us` thumbnail swap and nav link when Dan says live.
