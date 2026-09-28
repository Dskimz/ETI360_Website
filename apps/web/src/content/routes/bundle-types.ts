/* The shape of the web bundle a private route page reads (V3
   customers/tideline-school/trips/outdoor-route-demo-2027/web/, built by
   build_register.py, register version 1.1). Only the fields the page uses are
   typed; the files carry more. Distances in miles, heights in feet, clock
   times as "HH:MM" local.

   The figure rule (register.figure_rule, decided 2026-09-27): every printed
   figure is the one the trip's own documents print (basis "trip_documents"),
   or the measurement shown as measured where the documents give none (basis
   "tool"). Where the Appalachian Mountain Club publishes a different figure,
   it sits in `beside` with its own label ("AMC: 7.7 mi"); it is never the
   printed value. */

export type SourceIds = string[];

export type Stop = {
  name: string;
  kind: string;
  lon: number;
  lat: number;
  on_route: boolean;
  at_mi?: number | null;
  note?: string | null;
};

export type DayGeometry = {
  day: number;
  date: string;
  mode: "foot" | "water";
  /** [lon, lat, elevation_m] at stations about 50 m apart; cum_mi along the drawn line. */
  line: { coordinates: [number, number, number][]; cum_mi: number[] };
  elevation: { cum_mi: number[]; elev_ft: number[] } | null;
  stops: Stop[];
  crossing_spans_mi?: { from_mi: number; to_mi: number }[];
};

export type TripGeometry = {
  trip: string;
  name: string;
  notice: string;
  days: DayGeometry[];
  register_sha256: string;
};

export type ReferenceGeometry = {
  id: string;
  name: string;
  line: { coordinates: [number, number, number][]; cum_mi: number[]; elev_ft: number[] };
  stops: Stop[];
  register_sha256: string;
};

/** A figure the Appalachian Mountain Club publishes that differs from the
    printed one: shown only beside it, with its label. */
export type Beside = {
  label: string;
  mi?: number;
  ft?: number;
  as_published?: string;
  span?: string;
  publisher: string;
  source: SourceIds;
} | null;

export type Basis = "trip_documents" | "tool";

export type DayDistance = {
  mi: number;
  km: number;
  nm?: number;
  basis: Basis;
  trip_documents?: { mi: number; nm?: number; as_printed: string; document: string; what: string; source: SourceIds };
  beside: Beside;
  tool: { mi: number; km: number; source: SourceIds };
  note?: string;
};

export type Daylight = {
  sunrise: string;
  sunset: string;
  civil_dusk: string;
  daylight_h: number;
  planned_start: string;
  planned_finish: string;
  source: SourceIds;
};

export type EmergencyDepartment = {
  name: string;
  document_line: string;
  nearest: boolean;
  who_confirms: string;
  source: SourceIds;
};

export type ExitToRoad = {
  mi: number;
  basis: Basis;
  as_printed?: string;
  /** Two lengths the Trip Leader Card prints separately for one way off. */
  parts?: { from?: string; to?: string; trail?: string; mi: number; as_printed: string }[];
  tool_mi?: number;
  beside?: Beside;
  source: SourceIds;
};

export type FootBailOut = {
  name: string;
  how: string;
  at_mi_measured: number;
  exit_to_road?: ExitToRoad;
  road_access: string;
  drive_to_ed_min: number;
  drive_to_ed_mi: number;
  note?: string;
  source: SourceIds;
};

export type WaterBailOut = {
  name: string;
  kind: string;
  note: string;
  at_mi_measured: number;
  off_line_mi: number;
  off_line: {
    mi: number;
    basis: Basis;
    /** The documents' own words for the distance, where they give one. */
    as_printed?: string;
    source: SourceIds;
  } | null;
  position_basis: string;
  source: SourceIds;
};

export type Crossing = {
  n: number;
  name: string;
  mi: number;
  nm: number;
  minutes_at_2_5_kt: number;
  from_mi: number;
  to_mi: number;
  window: string;
  current_station: string;
  max_current_in_window_kt: number;
  set: string;
  slack: string[];
  source: SourceIds;
};

/** The trip's own words for a day's ways off, as the Trip Leader Card prints them. */
export type DocumentText = { text: string; document: string; source: SourceIds };

export type RegisterDay = {
  trip: string;
  day: number;
  date: string;
  weekday: string;
  title: string;
  mode: "foot" | "water";
  start: string;
  end: string;
  night: string;
  distance: DayDistance;
  ascent: {
    ft: number;
    basis: Basis;
    beside: Beside;
    tool: { ft: number; source: SourceIds };
  } | null;
  descent: { ft: number; basis: string; source?: SourceIds } | null;
  high_point_ft?: { ft: number; basis: string; source: SourceIds };
  above_4500_ft?: { from_mi: number; to_mi: number; basis: string; source: SourceIds } | null;
  moving_time_group: {
    h: number;
    text: string;
    basis: string;
    beside?: Beside;
    source: SourceIds;
  };
  naismith: { h: number; text: string; basis: string; source: SourceIds } | null;
  time_on_water?: { planned_start: string; planned_finish: string; planned_window_h: number; source: SourceIds };
  vs_reference: {
    reference: string | null;
    reason?: string;
    distance?: number;
    moving_time_group?: number;
    naismith?: number;
    climb?: {
      ratio: number | null;
      reason: string;
      climb_time_vs_reference_time: number;
      climb_time_basis: string;
      day_ft: number;
      reference_ft: number;
    };
    basis?: string;
  };
  vs_trip_days?: {
    basis: string;
    longest_day: number;
    distance_share_of_longest_day: number;
    moving_time_share_of_longest_day: number;
    rank_by_distance: number;
    source: SourceIds;
  };
  crossings?: {
    count: number;
    total_mi: number;
    total_minutes_at_2_5_kt: number;
    longest: Omit<Crossing, "n" | "from_mi" | "to_mi" | "current_station" | "slack" | "source"> | null;
    list: Crossing[];
    note: string | null;
  };
  tide?: {
    station: string;
    datum: string;
    events_05_to_21: { time: string; type: "high" | "low"; ft: number }[];
    source: SourceIds;
  };
  daylight: Daylight;
  cover: {
    measured: boolean;
    canopy_mean_pct?: number;
    under_canopy_pct_of_route?: number;
    open_pct_of_route?: number;
    longest_open_mi?: number;
    longest_open_at_mi?: number;
    longest_open_name?: string | null;
    raster?: string;
    not_measured: string[];
    source: SourceIds;
  };
  /** Walking days: the Trip Leader Card's exits and road access text. */
  exits_text?: DocumentText;
  /** Water days: the Trip Leader Card's bail-out and boat access text. */
  bail_out_text?: DocumentText;
  bail_outs: (FootBailOut | WaterBailOut)[];
  emergency_department: EmergencyDepartment;
};

export type RegisterTrip = {
  trip: string;
  name: string;
  dates: string;
  mode: "foot" | "water";
  school_grade: number;
  days: RegisterDay[];
  totals: {
    /** The totals as the Trip Leader Card prints them. */
    as_printed: string;
    crossings?: number;
    source: SourceIds;
  };
  water_temperature?: {
    mean_f: number;
    low_f: number;
    high_f: number;
    years: string;
    window: string;
    station: string;
    source: SourceIds;
  };
};

export type WalkingReference = {
  id: string;
  name: string;
  why: string;
  start: string;
  surface: { text: string; source: SourceIds };
  distance: {
    mi: number;
    km: number;
    basis: string;
    published: { mi: number; as_published: string; source: SourceIds } | null;
    tool: { mi: number; km: number; source: SourceIds };
    agreement?: string;
  };
  ascent_ft: number;
  ascent_note: string;
  ascent_ft_deck_as_straight_line: number;
  high_point_ft: number;
  moving_time_group: { h: number; text: string; basis: string; source: SourceIds };
  naismith: { h: number; text: string; basis: string; source: SourceIds };
};

export type Register = {
  version: string;
  school: { name: string; notice: string; location: { lat: number; lon: number; description: string } };
  purpose_line: string;
  references: {
    walking: WalkingReference;
    paddling: { reference: null; decision: string; reasons: string[]; instead: string };
  };
  trips: RegisterTrip[];
  sources: Record<string, { what: string; publisher?: string; url?: string; accessed?: string; citation?: string }>;
};

/** Everything the page's client view receives, after the password check. */
export type RouteBundle = {
  register: Register;
  trips: TripGeometry[];
  reference: ReferenceGeometry;
};
