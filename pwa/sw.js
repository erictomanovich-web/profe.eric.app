const CACHE_NAME = "panel-alumnos-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./config.js",
  "./chart.min.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./foto-perfil.jpg"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network-first para HTML/JS/JSON (así siempre trae la última versión si hay señal),
// con fallback a caché si no hay conexión.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
