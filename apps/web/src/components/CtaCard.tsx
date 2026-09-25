import Link from "next/link";
import styles from "./ctacard.module.css";

/* The contact band. `image` is accepted for existing callers and ignored:
   the band is flat navy (Website v1 review, 2026-09-25). */
export function CtaCard({ title, copy }: { title: string; copy?: string; image?: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.copy}>
            <h2>{title}</h2>
            {copy ? <p>{copy}</p> : null}
            <Link className={styles.btn} href="/contact">
              Get in touch &rarr;
            </Link>
            <span className={styles.sub}>We respond within two business days.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
