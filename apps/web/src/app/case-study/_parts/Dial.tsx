"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Stage } from "@/content/case-study-stages";
import styles from "../mock-a/dial.module.css";

/* MOCKUP A, the 360 dial (Dan, 2026-10-07). A ring of the five stages,
   colored by tier, with Harborview and 360 in the middle. Hover or click a
   segment and it lifts out; the panel beside the ring shows the stage's
   problem, a fan of its real document covers and links to its pages. The
   ring draws itself once on load, the last segment meeting the first. */

const C = 210; // center
const R = 150; // ring radius
const GAP = 3; // degrees between segments

function polar(deg: number, r: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}

function arc(i: number, n: number) {
  const span = 360 / n;
  const a0 = i * span + GAP / 2;
  const a1 = (i + 1) * span - GAP / 2;
  const p0 = polar(a0, R);
  const p1 = polar(a1, R);
  return `M ${p0.x} ${p0.y} A ${R} ${R} 0 0 1 ${p1.x} ${p1.y}`;
}

function tierClass(t: number) {
  return t === 1 ? styles.t1 : t === 2 ? styles.t2 : styles.t3;
}

export function Dial({ stages }: { stages: Stage[] }) {
  const [active, setActive] = useState(0);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const n = stages.length;
  const s = stages[active];

  return (
    <div className={styles.wrap}>
      <div className={styles.ringBox}>
        <svg viewBox="0 0 420 420" className={`${styles.ring} ${drawn ? styles.drawn : ""}`} role="group" aria-label="The five stages of Harborview’s year">
          <circle cx={C} cy={C} r={R - 46} className={styles.inner} />
          {stages.map((st, i) => {
            const mid = ((i + 0.5) * 360) / n;
            const lift = polar(mid, 12);
            const num = polar(mid, R);
            const on = i === active;
            return (
              <g
                key={st.id}
                className={`${styles.seg} ${tierClass(st.tier)} ${on ? styles.on : ""}`}
                style={{
                  transform: on ? `translate(${lift.x - C}px, ${lift.y - C}px)` : undefined,
                  ["--d" as string]: `${i * 0.28}s`,
                }}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${st.n}. ${st.label}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <path d={arc(i, n)} pathLength={100} className={styles.arc} />
                <text x={num.x} y={num.y} className={styles.num} dominantBaseline="central" textAnchor="middle">
                  {st.n}
                </text>
              </g>
            );
          })}
          <text x={C} y={C - 30} textAnchor="middle" className={styles.school}>
            Harborview
          </text>
          <text x={C} y={C + 18} textAnchor="middle" className={styles.big}>
            360
          </text>
          <text x={C} y={C + 48} textAnchor="middle" className={styles.sub}>
            one school year
          </text>
        </svg>
        <ol className={`${styles.labels} ui`}>
          {stages.map((st, i) => (
            <li key={st.id}>
              <button type="button" className={i === active ? styles.labelOn : ""} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}>
                <span className={`${styles.dot} ${tierClass(st.tier)}`} aria-hidden="true" />
                {st.n}. {st.label}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <section className={styles.panel} aria-live="polite" key={s.id}>
        <p className={`${styles.tier} ${tierClass(s.tier)} ui`}>{s.tierName}</p>
        <h2 className={styles.h2}>{s.label}</h2>
        <p className={styles.line}>{s.line}</p>
        <div className={styles.fan} data-count={s.docs.length}>
          {s.docs.map((d, i) => (
            <Link key={d.src + i} href={d.href} className={styles.card} style={{ ["--i" as string]: i - (s.docs.length - 1) / 2 }}>
              <Image src={d.src} width={d.width} height={d.height} alt={d.alt} sizes="150px" />
              <span className={`${styles.cardName} ui`}>{d.name}</span>
            </Link>
          ))}
        </div>
        <ul className={`${styles.links} ui`}>
          {s.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label} →</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
