// Kleine helpers zodat elke pagina dezelfde, veilige logica gebruikt voor
// Instagram-handle en plaatsnaam (placeholders uit site.json vallen netjes weg).
import site from '../data/site.json';

const raw = (site.instagram_dieren || '').trim();
export const igHandle = raw && !raw.startsWith('[') ? raw.replace(/^@/, '') : null;
export const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

export const plaats = site.plaatsnaam && !site.plaatsnaam.startsWith('[')
  ? site.plaatsnaam
  : null;
