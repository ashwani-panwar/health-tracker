// ── bump this version on EVERY deploy to force cache refresh ──
const CACHE = 'vitalcore-v5';

// Only cache static assets — NOT index.html (always fetch fresh)
const STATIC_ASSETS = [
  './nutrition-db.js',
  './ocr-engine.js',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(STATIC_ASSETS.map(url => c.add(url).catch(() => {})))
    )
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', e => {
  // Delete ALL old caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k))) // delete everything, not just old
    ).then(() => caches.open(CACHE)) // re-open fresh cache
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isHTML = e.request.destination === 'document' ||
                 url.pathname.endsWith('.html') ||
                 url.pathname.endsWith('/');

  if (isHTML) {
    // HTML: always try network first, fall back to cache
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Cache the fresh version
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Static assets: cache first, network fallback
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        }).catch(() => new Response('Offline'));
      })
    );
  }
});
