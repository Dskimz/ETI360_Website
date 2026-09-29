import Image from "next/image";
import Link from "next/link";
import { liveProducts, tierNames, type Product } from "@/content/products";
import { getVersion, publicNotice, versionsOf } from "@/content/versions";
import styles from "./productdoors.module.css";

/* The four products as the home page's doors (Dan, 2026-09-25): a 2×2 grid
   in tier order, one column on phones. Each door carries its tier label(s)
   in the tier's color, the product name, one moment-first sentence, the
   cover of its lead version, its versions named in one line, and one link.
   Only live products get a door (spec S18). Under the grid, the notice for
   every school whose cover is shown, once per school, verbatim. */

const TIER_CLASS = { 1: styles.tier1, 2: styles.tier2, 3: styles.tier3 } as const;

function leadCover(p: Product) {
  const version = getVersion(p.lead.version);
  const doc = version?.documents.find((d) => d.slug === p.lead.doc) ?? version?.documents[0];
  return version && doc ? { version, doc } : null;
}

export function ProductDoors({ products = liveProducts() }: { products?: Product[] }) {
  const leads = products.map(leadCover);
  const notices = Array.from(
    new Map(
      leads.filter((l): l is NonNullable<typeof l> => l !== null).map((l) => [l.version.school, l.version.disclosure]),
    ).values(),
  ).filter((d) => publicNotice(d) !== null);
  return (
    <div className={styles.wrap}>
      <div className={styles.doors}>
        {products.map((p, i) => {
          const lead = leads[i];
          const names = versionsOf(p.slug).map((v) => v.title);
          return (
            <article key={p.slug} className={styles.door}>
              <div className={styles.text}>
                <p className={`${styles.tiers} ui`}>
                  {p.tiers.map((t, j) => (
                    <span key={t} className={`${styles.tier} ${TIER_CLASS[t]}`}>
                      {tierNames(p)[j]}
                    </span>
                  ))}
                </p>
                <h3>{p.name}</h3>
                <p className={styles.body}>{p.door}</p>
                {names.length > 0 ? <p className={`${styles.versions} ui`}>{names.join(" · ")}</p> : null}
                <p className={`${styles.link} ui`}>
                  <Link href={p.href} className="cta-link">
                    See the {p.name}&nbsp;&rarr;
                  </Link>
                </p>
              </div>
              {lead ? (
                <Link href={p.href} className={styles.cover} tabIndex={-1} aria-hidden="true">
                  <Image
                    src={lead.doc.cover.src}
                    width={lead.doc.cover.width}
                    height={lead.doc.cover.height}
                    alt=""
                    sizes="(max-width: 640px) 110px, 150px"
                  />
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
      {notices.length > 0 ? (
        <div className={`${styles.notices} ui`}>
          {notices.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
