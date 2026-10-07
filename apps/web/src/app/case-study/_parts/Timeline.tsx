"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Point } from "@/content/case-study-home";
import styles from "../timeline.module.css";

/** A point with its tier name resolved on the server, so this client
    component never pulls the case study content into the browser bundle. */
export type TimelinePoint = Point & { tierName: string | null };

/* The Case Study home's timeline (Dan, 2026-10-07): a line down the middle,
   a numbered bubble on the line for each point, and a card that comes out
   to the left or right with the point's name, two short sentences, the
   document's image and a link to the point's page. Below 900px the line
   moves to the left and every card sits to its right.

   Motion: each bubble and card pops in with a small overshoot as it scrolls
   into view. The content renders in full without JavaScript and for readers
   who ask for reduced motion; the animation is added only after mount. */

function tierClass(p: TimelinePoint): string {
  if (p.tier === 1) return styles.t1;
  if (p.tier === 2) return styles.t2;
  if (p.tier === 3) return styles.t3;
  return styles.t0;
}

function Item({ p, n, animate }: { p: TimelinePoint; n: number; animate: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  const side = n % 2 === 1 ? styles.left : styles.right;
  const motion = animate ? (seen ? styles.in : styles.waiting) : "";

  return (
    <li ref={ref} className={`${styles.item} ${side} ${tierClass(p)} ${motion}`} id={p.id}>
      <span className={`${styles.bubble} ui`} aria-hidden="true">
        {n}
      </span>
      <div className={styles.card}>
        <div className={styles.cardText}>
          {p.tierName ? <p className={`${styles.tier} ui`}>{p.tierName}</p> : null}
          <h3 className={styles.title}>
            <span className="sr-only">{`${n}. `}</span>
            {p.label}
          </h3>
          <p className={styles.short}>{p.short}</p>
          <p className={`${styles.more} ui`}>
            <Link href={p.href}>
              Learn more<span className="sr-only">{` about ${p.label.toLowerCase()}`}</span> →
            </Link>
          </p>
        </div>
        {p.image ? (
          <Link href={p.href} className={styles.thumb} tabIndex={-1} aria-hidden="true">
            <Image src={p.image.src} width={p.image.width} height={p.image.height} alt="" sizes="120px" />
          </Link>
        ) : null}
      </div>
    </li>
  );
}

export function Timeline({ points }: { points: TimelinePoint[] }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && "IntersectionObserver" in window) {
      // Start the motion after the first paint, so the server-rendered page
      // never hides its content.
      const id = window.requestAnimationFrame(() => setAnimate(true));
      return () => window.cancelAnimationFrame(id);
    }
  }, []);

  return (
    <ol className={styles.timeline}>
      {points.map((p, i) => (
        <Item key={p.id} p={p} n={i + 1} animate={animate} />
      ))}
    </ol>
  );
}
