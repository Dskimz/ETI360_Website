import type { Stop } from "@/content/routes/bundle-types";

/* Formatting and small lookups for the route page. Nothing here makes a
   figure: every number shown comes from the bundle, and the only arithmetic is
   the difference between two printed clock times. */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function fmtNumber(value: number, digits = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function fmtMiles(value: number) {
  return `${fmtNumber(value, 1)} mi`;
}

/** "16:00" → "4:00 p.m." (the trips' documents print times this way). */
export function fmtClock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "a.m." : "p.m.";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function clockMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fmtDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** "2027-09-08" + "Wednesday" → "Wednesday, September 8, 2027". */
export function fmtLongDate(iso: string, weekday: string) {
  const [y, mo, d] = iso.split("-").map(Number);
  return `${weekday}, ${MONTHS[mo - 1]} ${d}, ${y}`;
}

/** "2027-09-08" + "Wednesday" → "Wed Sep 8". */
export function fmtShortDate(iso: string, weekday: string) {
  const [, mo, d] = iso.split("-").map(Number);
  return `${weekday.slice(0, 3)} ${SHORT_MONTHS[mo - 1]} ${d}`;
}

/** End a sentence with one full stop, even after "p.m." or "a.m.". */
export function fullStop(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

const DIRECTIVE = /^(treat|keep|stay|carry|bring|use|avoid|check|wear|do not|don't|never|always)\b/i;

/** A place note as a statement of fact: a clause that tells the group what to
    do ("treat before drinking") is left out, since the page states figures and
    gives no directions. */
export function factualNote(note: string | null) {
  if (!note) return null;
  const kept = note
    .split(/;\s+/)
    .filter((clause) => !DIRECTIVE.test(clause.trim()))
    .join("; ");
  return kept || null;
}

/** First letter up, the rest as written: "the Old Bridle Path" → "The Old Bridle Path". */
export function sentence(text: string) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
}

/** "Grade 9 students", as the school's documents name the year group: a
    school year, never a difficulty grade. */
export function gradeStudents(grade: number) {
  return `Grade ${grade} students`;
}

export function fmtRatio(value: number) {
  return `${fmtNumber(value, 1)}×`;
}

export type MarkerTone = "primary" | "accent" | "muted";

export type LetteredStop = {
  letter: string;
  name: string;
  kind: string;
  label: string;
  tone: MarkerTone;
  lon: number;
  lat: number;
  onRoute: boolean;
  /** Miles along the drawn line, as measured; a loop's start and end share a letter. */
  atMi: number[];
  note: string | null;
};

function kindLabel(kind: string, onRoute: boolean, mode: "foot" | "water") {
  switch (kind) {
    case "bus_meeting":
      return "coach meeting point";
    case "night_stop":
      return mode === "water" ? "campsite" : "hut";
    case "summit":
      return "summit";
    case "bail_out":
      if (mode === "water") return "bail-out landing";
      return onRoute ? "exit junction" : "exit trailhead, road access";
    case "water":
      return "water source";
    case "viewpoint":
      return mode === "water" ? "waypoint" : "viewpoint";
    case "launch":
      return "launch and landing";
    case "lunch":
      return "lunch";
    case "hospital":
      return "emergency department";
    case "ranger":
      return "rescue station";
    default:
      return kind.replace(/_/g, " ");
  }
}

function tone(kind: string): MarkerTone {
  if (kind === "summit") return "accent";
  if (kind === "bus_meeting" || kind === "night_stop" || kind === "launch") return "primary";
  return "muted";
}

/** Letter the day's places in route order (then the places off the route), one
    letter per place: a loop that starts and ends at the same camp keeps one. */
export function letterStops(stops: Stop[], mode: "foot" | "water"): LetteredStop[] {
  const out: LetteredStop[] = [];
  const ordered = [...stops.filter((s) => s.on_route), ...stops.filter((s) => !s.on_route)];
  for (const stop of ordered) {
    const same = out.find(
      (s) => s.name === stop.name && Math.abs(s.lon - stop.lon) < 1e-5 && Math.abs(s.lat - stop.lat) < 1e-5,
    );
    if (same) {
      if (typeof stop.at_mi === "number") same.atMi.push(stop.at_mi);
      continue;
    }
    out.push({
      letter: String.fromCharCode(65 + out.length),
      name: stop.name,
      kind: stop.kind,
      label: kindLabel(stop.kind, stop.on_route, mode),
      tone: tone(stop.kind),
      lon: stop.lon,
      lat: stop.lat,
      onRoute: stop.on_route,
      atMi: typeof stop.at_mi === "number" ? [stop.at_mi] : [],
      note: factualNote(stop.note ?? null),
    });
  }
  return out;
}

/** Index of the station nearest a mile value (cum ascending). */
export function nearestIndex(cum: number[], mi: number) {
  let lo = 0;
  let hi = cum.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < mi) lo = mid;
    else hi = mid;
  }
  return Math.abs(cum[lo] - mi) <= Math.abs(cum[hi] - mi) ? lo : hi;
}

/** Every source id found anywhere inside a register entry. */
export function collectSources(value: unknown, into = new Set<string>()) {
  if (Array.isArray(value)) {
    for (const item of value) collectSources(item, into);
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      if ((key === "source" || key === "tool_source") && Array.isArray(item)) {
        for (const id of item) if (typeof id === "string") into.add(id);
      } else {
        collectSources(item, into);
      }
    }
  }
  return into;
}

export function tripSlug(name: string) {
  return name.toLowerCase().split(/\s+/).slice(0, 2).join("-");
}
