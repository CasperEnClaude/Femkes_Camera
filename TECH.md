# Technische notitie (voor Casper)

Korte uitleg van hoe de site in elkaar zit, mocht er ooit iets aangepast moeten worden buiten de CMS om.

## Stack

- **Astro** (static site generator) — bouwt een volledig statische site naar `dist/`.
- **Decap CMS** (voorheen Netlify CMS) op `/admin` — no-code beheer voor Femke.
- **Netlify Identity + Git Gateway** — login + schrijfrechten naar de Git-repo vanuit de CMS.
- **Netlify hosting** (gratis tier) — auto-deploy bij elke push naar `main`.
- Geen database, geen backend, geen server-side rendering.

## Mappenstructuur

```
src/
  data/                 # bewerkbare content (JSON), gekoppeld aan CMS
    site.json           # naam, plaats, contact, instagram
    prijzen.json        # alle pakketten/prijzen
    teksten.json        # teksten Home / Over mij / Voorbereiding
  content/galleries/    # één JSON per portfolio-categorie (photos-lijst)
  assets/uploads/       # hier landen de foto's uit de CMS (Astro optimaliseert deze)
  components/           # Header, Footer, Gallery, PackageCard
  layouts/Base.astro    # HTML-skelet, SEO-meta, Netlify Identity redirect
  lib/images.js         # koppelt CMS-pad -> geïmporteerde afbeelding (via import.meta.glob)
  pages/                # één .astro per pagina (routes)
  styles/global.css     # volledige styling; motor-subthema via body.theme-motor
public/
  admin/                # Decap CMS: index.html + config.yml
  favicon.svg
netlify.toml            # build + headers
astro.config.mjs        # site-URL, sitemap, image-optimalisatie
```

## Hoe afbeeldingen werken

Decap slaat uploads op in `src/assets/uploads/` en zet in de JSON het pad
`/src/assets/uploads/<bestand>`. `src/lib/images.js` mapt dat pad via
`import.meta.glob(..., { eager: true })` naar de echte import, zodat Astro's
`<Image>` het kan optimaliseren (webp/avif, meerdere breedtes, lazy loading).
Als een pad (nog) geen bestand heeft, wordt de foto simpelweg overgeslagen.

## Lokaal draaien

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # productie-build naar dist/
npm run preview    # bekijk de build lokaal
```

### CMS lokaal testen (optioneel)
Zet tijdelijk bovenaan `public/admin/config.yml`: `local_backend: true`,
draai in een tweede terminal `npx decap-server`, en open `/admin`.
**Niet committen met `local_backend: true` aan.**

## Deploy / eerste keer opzetten op Netlify

1. Push deze map naar een GitHub-repo (aparte repo, los van andere projecten).
2. Netlify → *Add new site* → *Import from Git* → kies de repo.
   Build command `npm run build`, publish dir `dist` (staat ook in `netlify.toml`).
3. Zet **Netlify Identity** aan (Site settings → Identity → Enable).
   - Registration: **Invite only**.
   - Enable **Git Gateway** (Identity → Services → Git Gateway).
4. Nodig Femke uit via Identity → *Invite users* (haar e-mailadres).
5. Pas `site:` in `astro.config.mjs` aan naar de definitieve URL (voor sitemap/SEO).

## Placeholders die nog ingevuld moeten worden

Staan als `[...]` in `src/data/site.json` en in de reiskosten-regel van
`src/data/prijzen.json`. Kunnen via de CMS ingevuld worden, of direct in de JSON:
plaatsnaam, reiskosten-straal, e-mail, WhatsApp-nummer, Instagram-handles.

## Aandachtspunten

- **Node 20** in `netlify.toml` (`sharp` heeft dat nodig voor beeldoptimalisatie).
- Bij hernoemen van een categorie-bestand ook `config.yml` en de import in
  `src/pages/portfolio.astro` aanpassen.
- Foto's alleen met toestemming van de eigenaar plaatsen (herinner Femke hieraan).
