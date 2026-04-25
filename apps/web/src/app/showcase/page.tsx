"use client";

import { useEffect, useState } from "react";

type Doc = {
  slug: string;
  title: string;
  variant: string | null;
  pdf: string;
  thumb: string;
  pageImages: string[];
  width: number;
  height: number;
  pages: number;
};

const BASE = "/showcase";

export default function ShowcasePage() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [openDoc, setOpenDoc] = useState<Doc | null>(null);

  // Fetch manifest (cached by service worker after first load)
  useEffect(() => {
    fetch(`${BASE}/manifest.json`)
      .then((r) => r.json())
      .then((m: { docs: Doc[] }) => setDocs(m.docs))
      .catch(() => setDocs([]));
  }, []);

  // Register service worker for offline caching of PDFs + thumbs
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${BASE}/sw.js`, { scope: BASE + "/" })
        .catch(() => { /* ignore in dev */ });
    }
  }, []);

  // Escape closes the lightbox
  useEffect(() => {
    if (!openDoc) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenDoc(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openDoc]);

  return (
    <div className="showcase-root">
      <header className="showcase-header">
        <div className="brand">
          <span className="brand-eti">ETI</span><span className="brand-360">360</span>
        </div>
        <div className="tag">Document showcase</div>
      </header>

      {docs === null ? (
        <div className="loading">Loading…</div>
      ) : docs.length === 0 ? (
        <div className="loading">No documents found.</div>
      ) : (
        <main className="grid">
          {docs.map((d) => (
            <button
              key={d.slug}
              className="tile"
              type="button"
              onClick={() => setOpenDoc(d)}
              aria-label={`Open ${d.title}${d.variant ? ` — ${d.variant}` : ""}`}
            >
              <div className="tile-thumb">
                <img src={`${BASE}/${d.thumb}`} alt="" loading="lazy" />
                {d.pages > 1 && <span className="tile-pages">{d.pages} pages</span>}
              </div>
              <div className="tile-meta">
                <div className="tile-title">{d.title}</div>
                {d.variant && <div className="tile-variant">{d.variant}</div>}
              </div>
            </button>
          ))}
        </main>
      )}

      {openDoc && (
        <div
          className="lightbox"
          onClick={() => setOpenDoc(null)}
          role="dialog"
          aria-modal="true"
          aria-label={openDoc.title}
        >
          <div className="lightbox-bar" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-title">
              {openDoc.title}
              {openDoc.variant && <span className="lightbox-variant"> · {openDoc.variant}</span>}
              {openDoc.pages > 1 && <span className="lightbox-pagecount"> · {openDoc.pages} pages</span>}
            </div>
            <button
              className="lightbox-close"
              onClick={(e) => { e.stopPropagation(); setOpenDoc(null); }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="lightbox-scroll" onClick={(e) => e.stopPropagation()}>
            {openDoc.pageImages.map((src, i) => (
              <img
                key={src}
                className="lightbox-page"
                src={`${BASE}/${src}`}
                alt={`${openDoc.title} — page ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            ))}
            <div className="lightbox-end" onClick={() => setOpenDoc(null)}>
              Tap to close
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root { color-scheme: dark; }
        html, body {
          margin: 0; padding: 0;
          background: #0a2a45;
          font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }
        .showcase-root { min-height: 100vh; padding: 20px 20px 60px; }

        .showcase-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 4px 24px;
          border-bottom: 1px solid rgba(201, 162, 77, 0.3);
          margin-bottom: 24px;
        }
        .brand { font-weight: 700; letter-spacing: -0.02em; font-size: 26px; }
        .brand-eti { color: #fff; }
        .brand-360 { color: #C9A24D; }
        .tag {
          font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.55); font-weight: 500;
        }

        .loading {
          color: rgba(255,255,255,0.55); text-align: center; padding: 60px 20px;
          font-size: 14px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 20px;
        }
        @media (min-width: 768px) {
          .grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 24px; }
        }
        @media (min-width: 1100px) {
          .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
        }

        .tile {
          appearance: none; -webkit-appearance: none;
          background: transparent; border: 0; padding: 0; text-align: left;
          color: inherit; cursor: pointer; font: inherit;
          display: flex; flex-direction: column;
          transition: transform 140ms ease;
          touch-action: manipulation;
        }
        .tile:active { transform: scale(0.97); }
        .tile-thumb {
          position: relative;
          background: #fff;
          border: 1px solid rgba(201, 162, 77, 0.25);
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 8px 18px rgba(0,0,0,0.35);
          aspect-ratio: 708 / 1000;
        }
        .tile-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .tile-pages {
          position: absolute; right: 8px; bottom: 8px;
          background: rgba(10,42,69,0.88);
          color: #C9A24D;
          font-size: 11px; font-weight: 500; letter-spacing: 0.06em;
          padding: 4px 8px; border-radius: 3px;
          border-left: 2px solid #C9A24D;
        }
        .tile-meta { padding: 10px 2px 0; }
        .tile-title {
          font-size: 14px; font-weight: 500; color: #fff; line-height: 1.3;
        }
        .tile-variant {
          font-size: 12px; color: rgba(201,162,77,0.9); margin-top: 2px;
          letter-spacing: 0.02em;
        }

        .lightbox {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(4, 16, 28, 0.96);
          display: flex; flex-direction: column;
          animation: fadein 160ms ease;
        }
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }

        .lightbox-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(201,162,77,0.25);
          background: rgba(10,42,69,0.9);
        }
        .lightbox-title {
          color: #fff; font-size: 15px; font-weight: 500; letter-spacing: 0.01em;
        }
        .lightbox-variant { color: #C9A24D; font-weight: 400; }
        .lightbox-pagecount {
          color: rgba(255,255,255,0.5); font-weight: 400; font-size: 13px;
        }
        .lightbox-close {
          appearance: none; -webkit-appearance: none;
          background: rgba(201,162,77,0.12);
          border: 1px solid rgba(201,162,77,0.4);
          color: #C9A24D;
          width: 44px; height: 44px; border-radius: 50%;
          font-size: 18px; font-weight: 400;
          cursor: pointer; touch-action: manipulation;
          display: flex; align-items: center; justify-content: center;
        }
        .lightbox-close:active { background: rgba(201,162,77,0.22); }
        .lightbox-scroll {
          flex: 1; width: 100%;
          overflow-y: auto; overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 18px 0 60px;
          display: flex; flex-direction: column; align-items: center;
          gap: 14px;
          background: rgba(8, 24, 38, 0.5);
        }
        .lightbox-page {
          display: block;
          width: min(96%, 1100px);
          height: auto;
          background: #fff;
          box-shadow: 0 14px 30px rgba(0,0,0,0.45);
          border-radius: 2px;
          user-select: none; -webkit-user-select: none;
        }
        .lightbox-end {
          color: rgba(201,162,77,0.6);
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 16px 20px; cursor: pointer;
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}
