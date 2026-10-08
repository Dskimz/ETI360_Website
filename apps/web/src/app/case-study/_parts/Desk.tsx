import Image from "next/image";
import Link from "next/link";
import type { Stage } from "@/content/case-study-stages";
import styles from "../desk.module.css";

/* The Case Study home's document desk (Dan, 2026-10-07: "I think this is
   the best view. I like it.", chosen over the timeline and the 360 dial). Each stage is a
   stack of its real document covers on the parchment ground, joined by a
   gold thread. Hover opens the fan; a click on a cover opens that point's
   page. CSS only, no client JavaScript. */

function tierClass(t: number) {
  return t === 1 ? styles.t1 : t === 2 ? styles.t2 : styles.t3;
}

export function Desk({ stages }: { stages: Stage[] }) {
  return (
    <>
      <ol className={styles.desk}>
        {stages.map((s) => (
          <li key={s.id} className={styles.stage}>
            <div className={styles.stack}>
              {s.docs.map((d, i) => (
                <Link key={d.src + i} href={d.href} className={styles.cover} style={{ ["--i" as string]: i - (s.docs.length - 1) / 2 }} aria-label={d.name}>
                  <Image src={d.src} width={d.width} height={d.height} alt="" sizes="132px" loading="eager" />
                </Link>
              ))}
            </div>
            <span className={`${styles.pin} ${tierClass(s.tier)}`} aria-hidden="true">
              {s.n}
            </span>
            <p className={`${styles.tier} ui`}>{s.tierName}</p>
            <h2 className={styles.label}>{s.label}</h2>
            <p className={styles.line}>{s.line}</p>
            <ul className={`${styles.links} ui`}>
              {s.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{`${l.label}\u00a0→`}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className={`${styles.loop} ui`}>The year then comes back around to the first stage.</p>
    </>
  );
}
