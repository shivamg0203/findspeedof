const CACHE = "findspeedof-v1";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  // ignore chrome-extension and other unsupported schemes
  if (!event.request.url.startsWith("http")) return;

  event.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // only cache valid responses
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(() => response);
        return response || fetchPromise;
      })
    )
  );

});