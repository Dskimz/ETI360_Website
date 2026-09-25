import Link from "next/link";
import { SERVICES } from "@/content/services";
import styles from "./twoservices.module.css";

/* The two services as the main doors (Dan, 2026-09-25). Used on the home
   page and For Schools. For trip providers is linked from the footer. */

export function TwoServices() {
  return (
    <div className={styles.wrap}>
      <div className={styles.doors}>
        {SERVICES.map((s) => (
          <article key={s.name} className={styles.door}>
            <p className={`${styles.tiers} ui`}>{s.tiers}</p>
            <h3>{s.name}</h3>
            <p>{s.body}</p>
            <p className={`${styles.links} ui`}>
              <Link href={s.link.href} className="cta-link">
                {s.link.label} &rarr;
              </Link>
              {s.more ? (
                <Link href={s.more.href} className="cta-link">
                  {s.more.label} &rarr;
                </Link>
              ) : null}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
