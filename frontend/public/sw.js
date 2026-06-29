// Self-unregistering service worker.
//
// clipboard.ninja no longer ships a service worker: it's a real-time app that
// needs a live server connection, so there is nothing useful to cache offline.
// This file exists only to evict any service worker that returning visitors may
// still have registered from a previous (next-pwa / Workbox) build. Once traffic
// has cycled it can be deleted.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Drop any caches left behind by the old Workbox service worker.
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch {
        // ignore
      }
      // Unregister this worker, then reload open clients so they run without one.
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: "window" });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
