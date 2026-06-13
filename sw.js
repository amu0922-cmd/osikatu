const CACHE = 'oshikatsu-log-v25';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './splash-640x1136.png', './splash-750x1334.png', './splash-1125x2436.png',
  './splash-1170x2532.png', './splash-1179x2556.png', './splash-1284x2778.png', './splash-1290x2796.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
