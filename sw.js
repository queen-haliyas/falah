/* Falah service worker: keeps the app itself available offline.
 *
 * Prayer times are NOT cached here. The page saves those in localStorage so it can
 * control when they are refreshed (for example after you change the calculation method).
 *
 * Bump CACHE when you change any file below, so old copies are replaced.
 */
const CACHE = "falah-shell-v1";
const SCOPE = self.registration.scope;
const INDEX = new URL("index.html", SCOPE).href;
const SHELL = [
  "index.html",
  "manifest.json",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL.map(p => new URL(p, SCOPE).href)))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("falah-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Serve from the cache straight away, and refresh the cached copy in the background,
// so an update shows up the next time the app is opened.
async function staleWhileRevalidate(event, request, cacheKey) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(cacheKey);
  const refresh = fetch(request)
    .then(res => { if (res && res.ok) cache.put(cacheKey, res.clone()); return res; })
    .catch(() => null);
  if (cached) { event.waitUntil(refresh); return cached; }
  return (await refresh) || Response.error();
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  // Aladhan, Open-Meteo and the reverse-geocoder go straight to the network.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(event, request, INDEX));
  } else {
    event.respondWith(staleWhileRevalidate(event, request, request));
  }
});
