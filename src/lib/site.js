// Centrale helpers zodat elke pagina dezelfde, veilige logica gebruikt.
// Lege of placeholder-waarden ([...] of "") vallen overal netjes weg.
import site from '../data/site.json';

function clean(v) {
  const s = (v || '').toString().trim();
  return s && !s.startsWith('[') ? s : null;
}

// Instagram
const rawIg = clean(site.instagram_dieren);
export const igHandle = rawIg ? rawIg.replace(/^@/, '') : null;
export const igUrl = igHandle ? `https://instagram.com/${igHandle}` : null;

// Contact
export const email = clean(site.email);
export const mailLink = email ? `mailto:${email}` : null;
const rawWa = clean(site.whatsapp);
export const waNumber = rawWa ? rawWa.replace(/[^0-9]/g, '') : null;
export const waLink = (waNumber && waNumber.length >= 8) ? `https://wa.me/${waNumber}` : null;

// Locatie / werkgebied
export const plaats = clean(site.plaatsnaam);
export const werkgebiedBasis = clean(site.werkgebied_basis) || (plaats ? `${plaats} en omgeving` : null);
export const werkgebiedOpAanvraag = clean(site.werkgebied_op_aanvraag);
export const reiskostenStraal = clean(site.reiskosten_straal_km) || '20';
export const reiskostenKmPrijs = clean(site.reiskosten_km_prijs) || '0,30';
export const reiskostenRegel = plaats
  ? `Reiskosten: binnen ${reiskostenStraal} km van ${plaats} inbegrepen, daarbuiten €${reiskostenKmPrijs} per km`
  : `Reiskosten: binnen ${reiskostenStraal} km inbegrepen, daarbuiten €${reiskostenKmPrijs} per km (regio in overleg)`;

// Bedrijfsgegevens (juridisch — pas verplicht zodra structureel betaald werk)
export const bedrijfsnaam = clean(site.bedrijfsnaam);
export const kvk = clean(site.kvk);
export const googleProfiel = clean(site.google_bedrijfsprofiel);
