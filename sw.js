// Hoja: funciona sin conexión. Los datos del usuario NO pasan por aquí (están en el almacenamiento del navegador).
const CACHE = 'hoja-202610212000';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png', './vendor/zxing.min.js'];
const NET_TIMEOUT = 3500; // con mala cobertura la red puede tardar muchísimo en fallar; pasado este tiempo se usa la copia guardada

// Safari no acepta como respuesta de una navegación una respuesta que venga de una redirección.
// Por eso se guarda siempre una copia limpia.
async function plain(r) {
  if (!r.redirected) return r;
  return new Response(await r.blob(), {status: r.status, statusText: r.statusText, headers: r.headers});
}
// Los archivos se guardan uno a uno: si uno falla, los demás se guardan igualmente.
async function precache() {
  const c = await caches.open(CACHE);
  await Promise.all(ASSETS.map(async u => { try { const r = await fetch(u, {cache: 'reload'}); if (r.ok) await c.put(u, await plain(r)); } catch (e) {} }));
}
self.addEventListener('install', e => { e.waitUntil(precache().then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

async function appShell() {
  const c = await caches.open(CACHE);
  return (await c.match('./index.html')) || (await c.match('./')) || (await caches.match('./index.html')) || (await caches.match('./'));
}
async function navigate(e) {
  const cached = await appShell();
  const net = fetch(e.request).then(async r => {
    if (r.ok) { const c = await caches.open(CACHE); await c.put('./index.html', await plain(r.clone())); }
    return r;
  });
  if (!cached) return net; // primera visita: todavía no hay nada guardado
  e.waitUntil(net.catch(() => {})); // si se agota el tiempo, la descarga sigue y deja lista la próxima versión
  try {
    return await Promise.race([net, new Promise((_, no) => setTimeout(no, NET_TIMEOUT))]);
  } catch (err) {
    return cached;
  }
}
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Open Food Facts va directo a la red
  if (req.mode === 'navigate') { e.respondWith(navigate(e)); return; }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(async r => {
    if (r.ok) { const cp = await plain(r.clone()); caches.open(CACHE).then(c => c.put(req, cp)); }
    return r;
  })));
});
