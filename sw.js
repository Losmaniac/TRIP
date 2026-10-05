/* Service worker: vše potřebné se uloží při prvním otevření, pak aplikace běží i bez signálu. */
const VERSION = "tos26-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "img/aerial-road.jpg",
  "img/bagno-vignoni.jpg",
  "img/borgo.jpg",
  "img/cantina.jpg",
  "img/crete.jpg",
  "img/ferrari-sheep.jpg",
  "img/gladiator.jpg",
  "img/hero.jpg",
  "img/hills.jpg",
  "img/montalcino.jpg",
  "img/montepulciano.jpg",
  "img/mulino.jpg",
  "img/oil.jpg",
  "img/pienza.jpg",
  "img/prosciutto.jpg",
  "img/street.jpg",
  "img/villa-hill.jpg",
  "img/villa-interior.jpg",
  "img/villa-pool.jpg",
  "img/villa.jpg",
  "img/wine.jpg",
  "img/cars/alfa-4c.jpg",
  "img/cars/alfa-giulia.jpg",
  "img/cars/aston-vantage.jpg",
  "img/cars/audi-r8.jpg",
  "img/cars/corvette-c8.jpg",
  "img/cars/ferrari-f8.jpg",
  "img/cars/ferrari-sf90.jpg",
  "img/cars/lamborghini-huracan.jpg",
  "img/cars/lotus-emira.jpg",
  "img/cars/maserati-mc20.jpg",
  "img/cars/porsche-boxster.jpg",
  "img/cars/porsche-gt3.jpg",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.open-meteo.com") return; // počasí: jen online, aplikace si drží poslední předpověď
  // Stránka: nejdřív síť (ať se dostanou opravy), offline z cache.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Ostatní (obrázky, ikony, Google Fonts): cache, pak síť a uložit.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return r;
  })));
});
