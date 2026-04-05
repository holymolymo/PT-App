// Service Worker – Aprender Português PWA v2.0
const CACHE_NAME = 'pt-app-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/srs.js',
  '/js/storage.js',
  '/js/app.js',
  '/data/lessons.js',
  '/data/extra.js',
  '/data/modules.js',
  '/data/conversations.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
