/**
 * EduHelp service worker — minimal app-shell cache so the homepage and
 * static assets work offline. API routes are NEVER cached (privacy +
 * always-fresh pricing/AI calls).
 */

const VERSION = "eduhelp-v0.2.0";
const SHELL = ["/", "/manifest.webmanifest", "/icon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL).catch(() => {})),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache API or analysis endpoints — privacy + always fresh.
  if (url.pathname.startsWith("/api/")) return;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((res) => {
          // Only cache successful responses for our own origin
          if (res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches
              .open(VERSION)
              .then((cache) => cache.put(request, copy))
              .catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});
