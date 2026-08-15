// Koppelt een pad uit de CMS (bijv. "/src/assets/uploads/rex.jpg") aan de
// echte, geïmporteerde afbeelding, zodat Astro deze kan optimaliseren
// (webp/avif, meerdere formaten, lazy loading).
//
// Femke ziet hier niets van: zij uploadt gewoon een foto in het /admin-scherm
// en Decap slaat het pad op. Deze functie zoekt de bijbehorende afbeelding op.

const images = import.meta.glob(
  '/src/assets/uploads/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
);

export function resolveImage(path) {
  if (!path) return undefined;
  // Normaliseer: Decap kan het pad met of zonder leading slash opslaan.
  let key = path.trim();
  if (!key.startsWith('/')) key = '/' + key;
  if (images[key]) return images[key];
  // Fallback: match op bestandsnaam als het volledige pad net afwijkt.
  const base = key.split('/').pop();
  const hit = Object.keys(images).find((k) => k.endsWith('/' + base));
  return hit ? images[hit] : undefined;
}
