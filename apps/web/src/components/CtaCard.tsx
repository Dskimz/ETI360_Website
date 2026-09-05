import Link from "next/link";
import styles from "./ctacard.module.css";

export function CtaCard({ title, copy }: { title: string; copy: string }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageZone} />
          <div className={styles.logoDisc}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/marketing/cta/eti360-circle.png" alt="ETI360" />
          </div>
          <div className={styles.copy}>
            <h2>{title}</h2>
            <p>{copy}</p>
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

export function MiniCta() {
  return (
    <div className={styles.mini}>
      <div className={styles.miniDisc}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/marketing/cta/eti360-circle.png" alt="ETI360" />
      </div>
      <div>
        <b>Arrange a briefing.</b>
        <Link href="/contact">Get in touch &rarr;</Link>
      </div>
    </div>
  );
}
