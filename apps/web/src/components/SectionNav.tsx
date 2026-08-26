"use client";

import { useEffect, useState } from "react";

/* On-page section navigation: a slim sticky bar under the site header that
   names the sections of the current page and highlights the one in view.
   Squarespace-style orientation, held to the brand's restraint. */

export type SectionNavItem = { href: string; label: string };

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = items
      .map((i) => i.href)
      .filter((h) => h.startsWith("#"))
      .map((h) => h.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const pick = () => {
      // The active section is the last one whose top has passed the
      // upper third of the viewport.
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, [items]);

  return (
    <nav className="section-nav ui" aria-label="On this page">
      <div className="section-nav-inner">
        <span className="section-nav-label">On this page</span>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={
                  item.href === `#${active}` ? "active" : undefined
                }
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
