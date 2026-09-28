"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import type { RouteBundle } from "@/content/routes/bundle-types";
import type { RouteSet } from "@/content/routes/types";
import { SchoolMark } from "./BrandFrame";
import { DayView } from "./DayView";
import { WeekView } from "./WeekView";
import { fmtNumber, gradeStudents, tripSlug } from "./format";
import s from "./routes.module.css";

/* The private route page, after the password: the school's header, a switcher
   for the two trips and the week, the day views, the pocket route cards and
   the school's footer with ETI360 as the named preparer. The view lives in the
   address fragment (#white-mountains/day-2, #casco-bay/day-5, #week), so a
   link can point at one day. */

export type CardLink = { slug: string; label: string; size: string; href: string; available: boolean };
export type MapboxSettings = { token: string; style: string };

type View = { kind: "trip"; trip: number; day: number } | { kind: "week" };

const VIEW_EVENT = "route-view-change";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(VIEW_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(VIEW_EVENT, onChange);
  };
}

function parseView(hash: string, slugs: string[], dayCounts: number[]): View {
  const clean = hash.replace(/^#/, "");
  if (clean === "week") return { kind: "week" };
  const [slug, dayPart] = clean.split("/");
  const trip = slugs.indexOf(slug);
  if (trip === -1) return { kind: "trip", trip: 0, day: 1 };
  const day = Number((dayPart ?? "").replace("day-", ""));
  return { kind: "trip", trip, day: day >= 1 && day <= dayCounts[trip] ? day : 1 };
}

function viewHash(view: View, slugs: string[]) {
  return view.kind === "week" ? "#week" : `#${slugs[view.trip]}/day-${view.day}`;
}

export function RouteDemo({
  set,
  bundle,
  cards,
  mapbox,
}: {
  set: RouteSet;
  bundle: RouteBundle;
  cards: CardLink[];
  mapbox: MapboxSettings;
}) {
  const { register } = bundle;
  const slugs = useMemo(() => register.trips.map((t) => tripSlug(t.name)), [register.trips]);
  const dayCounts = useMemo(() => register.trips.map((t) => t.days.length), [register.trips]);
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );
  const view = parseView(hash, slugs, dayCounts);
  // The day last shown on each trip, so switching trips returns to it.
  const [lastDay, setLastDay] = useState<number[]>(() => register.trips.map(() => 1));

  const go = useCallback(
    (next: View, scroll = false) => {
      const from = parseView(window.location.hash, slugs, dayCounts);
      setLastDay((prev) =>
        prev.map((d, i) => {
          if (next.kind === "trip" && i === next.trip) return next.day;
          if (from.kind === "trip" && i === from.trip) return from.day;
          return d;
        }),
      );
      history.replaceState(null, "", viewHash(next, slugs));
      window.dispatchEvent(new Event(VIEW_EVENT));
      if (scroll) document.getElementById("route-views")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [slugs, dayCounts],
  );

  const tabs = [
    ...register.trips.map((trip, i) => ({
      id: `view-${slugs[i]}`,
      title: trip.name.split(" ").slice(0, 2).join(" "),
      sub: `${trip.mode === "foot" ? "On foot" : "On the water"}, ${trip.days.length} days`,
      view: { kind: "trip", trip: i, day: view.kind === "trip" && view.trip === i ? view.day : lastDay[i] } as View,
      selected: view.kind === "trip" && view.trip === i,
    })),
    {
      id: "view-week",
      title: "Week at a glance",
      sub: "Every day, one scale",
      view: { kind: "week" } as View,
      selected: view.kind === "week",
    },
  ];

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    const target =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    go(tabs[target].view);
    document.getElementById(tabs[target].id)?.focus();
  };

  const selectedTab = tabs.find((t) => t.selected) ?? tabs[0];
  const walking = register.trips.find((t) => t.mode === "foot");
  const paddling = register.trips.find((t) => t.mode === "water");
  const reference = register.references.walking;

  return (
    <div className={s.page}>
      <header className={s.head}>
        <div className={s.running}>
          <SchoolMark token={set.token} brand={set.brand} />
          <p className={s.runningRight}>
            Outdoor route days
            <br />
            Private page · {set.issued}
          </p>
        </div>
        <div className={s.titleBlock}>
          <h1 className={s.title}>{set.title}</h1>
          <p className={s.meta}>{set.meta}</p>
          <div className={s.coverRule} aria-hidden="true">
            <span />
            <span />
          </div>
          <p className={s.intro}>
            {set.intro} {set.purposeLine}
          </p>
          <dl className={s.metaRow}>
            {walking ? (
              <div>
                <dt>On foot</dt>
                <dd>
                  {walking.name}, {walking.dates}, {gradeStudents(walking.school_grade)}
                </dd>
              </div>
            ) : null}
            {paddling ? (
              <div>
                <dt>On the water</dt>
                <dd>
                  {paddling.name}, {paddling.dates}, {gradeStudents(paddling.school_grade)}
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Reference walk</dt>
              <dd>
                The {reference.name}, {fmtNumber(reference.distance.mi, 1)} mi, from {reference.start}
              </dd>
            </div>
          </dl>
          <p className={s.notice}>{set.notice}</p>
          <p className={s.skipCards}>
            <a href="#pocket-cards">Pocket route cards to print</a>
          </p>
        </div>
      </header>

      <div id="route-views" className={s.viewTabs} role="tablist" aria-label="Trips and the week">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            id={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.selected}
            aria-controls="route-panel"
            tabIndex={tab.selected ? 0 : -1}
            className={s.viewTab}
            onClick={() => go(tab.view)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <span className={s.viewTabTitle}>{tab.title}</span>
            <span className={s.viewTabSub}>{tab.sub}</span>
          </button>
        ))}
      </div>

      <div id="route-panel" role="tabpanel" aria-labelledby={selectedTab.id} className={s.panel}>
        {view.kind === "week" ? (
          <WeekView
            bundle={bundle}
            mapbox={mapbox}
            colors={set.brand.colors}
            purposeLine={set.purposeLine}
            onOpenDay={(trip, day) => go({ kind: "trip", trip, day }, true)}
          />
        ) : (
          <DayView
            bundle={bundle}
            tripIndex={view.trip}
            day={view.day}
            slug={slugs[view.trip]}
            mapbox={mapbox}
            colors={set.brand.colors}
            sourceLabels={set.sourceLabels}
            purposeLine={set.purposeLine}
            onDay={(day) => go({ kind: "trip", trip: view.trip, day })}
          />
        )}
      </div>

      <section id="pocket-cards" className={s.cards} aria-labelledby="pocket-cards-title">
        <h2 id="pocket-cards-title" className={s.sectionTitle}>
          Pocket route cards
        </h2>
        <p className={s.sectionLede}>{set.cardsNote}</p>
        <ul className={s.cardList}>
          {cards.map((card) => (
            <li key={card.slug}>
              <span className={s.cardName}>{card.label}</span>
              <span className={s.cardSize}>{card.size}</span>
              {card.available ? (
                <a className={s.cardLink} href={card.href} target="_blank" rel="noopener">
                  Open the PDF
                </a>
              ) : (
                <span className={s.cardPending}>In preparation</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <footer className={s.foot}>
        <div className={s.footRow}>
          <p>
            {set.brand.wordmark} / {set.brand.wordmarkSub}
          </p>
          <p className={s.footPrepared}>
            {set.preparedBy} · {set.issued}
          </p>
        </div>
        <p className={s.footNotice}>{set.notice}</p>
        <p className={s.footCredits}>{set.credits}</p>
      </footer>
    </div>
  );
}
