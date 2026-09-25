import Link from "next/link";
import { SERVICE_LINKS, SERVICES } from "@/content/services";
import styles from "./twoservices.module.css";

/* The two services as the main doors (Dan, 2026-09-25), with the smaller
   doors under them. Used on the home page and For Schools. */

export function TwoServices() {
  return (
    <div className={styles.wrap}>
      <div className={styles.doors}>
        {SERVICES.map((s) => (
          <article key={s.name} className={styles.door}>
            <p className={`${styles.tiers} ui`}>{s.tiers}</p>
            <h3>{s.name}</h3>
            <p>{s.body}</p>
            <Link href={s.link.href} className="cta-link ui">
              {s.link.label} &rarr;
            </Link>
          </article>
        ))}
      </div>
      <p className={`${styles.more} ui`}>
        {SERVICE_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="cta-link">
            {l.label} &rarr;
          </Link>
        ))}
      </p>
    </div>
  );
}
