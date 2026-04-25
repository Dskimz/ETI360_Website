// Showcase service worker — cache-first for PDFs + thumbs, so a tap opens instantly.
// Bump CACHE_VERSION whenever showcase content changes.

const CACHE_VERSION = "showcase-v1";
const BASE = "/showcase/";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      try {
        const resp = await fetch(BASE + "manifest.json", { cache: "no-store" });
        if (!resp.ok) return;
        const { docs } = await resp.json();
        const urls = [];
        for (const d of docs) {
          urls.push(BASE + d.thumb);
          urls.push(BASE + d.pdf);
        }
        await Promise.all(urls.map((u) => cache.add(u).catch(() => null)));
      } catch (_) { /* swallow — page still works online */ }
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      );
      self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (!url.pathname.startsWith(BASE)) return;
  if (url.pathname === BASE || url.pathname === BASE.replace(/\/$/, "")) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(event.request);
      if (cached) return cached;
      try {
        const net = await fetch(event.request);
        if (net.ok) cache.put(event.request, net.clone());
        return net;
      } catch (_) {
        if (cached) return cached;
        return new Response("", { status: 504 });
      }
    })()
  );
});
