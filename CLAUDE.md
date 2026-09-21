# CLAUDE.md — context voor Claude Code (Femke's Camera)

Dit bestand wordt automatisch ingelezen door Claude Code zodra je in deze map werkt.
Het bevat alle context + valkuilen om aan dit project te kunnen doorwerken, óók vanaf
een nieuw/ander Claude-account. Lees dit eerst.

## Wat is dit
**Femke's Camera** — een portfolio- + boekingswebsite voor dierenfotografie (Femke, regio
Rotterdam). Losstaand hobbyproject, GEEN onderdeel van andere projecten.
- **Live:** https://femkescamera.netlify.app
- **Repo:** github.com/CasperEnClaude/Femkes_Camera (branch `main`)
- **Beheer/CMS:** https://femkescamera.netlify.app/admin

## Stack
- **Astro** (static site generator) → bouwt volledig statische HTML naar `dist/`. Geen backend/DB/SSR.
- **Decap CMS** op `/admin` (config: `public/admin/config.yml`) — no-code beheer voor Femke.
- **Netlify Identity + Git Gateway** — CMS-login + schrijfrechten naar de repo.
- **Netlify hosting** (gratis) — auto-deploy bij elke push naar `main`.
- **Netlify Forms** — vangt het boekingsformulier op (zie "Formulier" hieronder).

## Lokaal draaien / bouwen
```bash
npm install        # eenmalig (of na het klonen)
npm run dev        # lokale preview
npm run build      # productiebuild naar dist/  (Netlify draait dit ook, met Node 20)
```

## Deployen
Deploy = **git push naar `main`** → Netlify bouwt en publiceert automatisch.
Werkwijze (belangrijk, zie valkuilen): bouw eerst lokaal groen, commit, push, en
**verifieer daarna LIVE** (curl of in de browser) — niet alleen deployen.

## Waar staat de content
Alles is data-driven en zowel via het CMS als direct in de bestanden te bewerken:
- `src/data/site.json` — merknaam, plaats, werkgebied, reiskosten, e-mail, whatsapp, instagram, KvK-placeholders.
- `src/data/prijzen.json` — alle pakketten/prijzen (dieren, puppy, fokkers/nestreportage, rookfakkels, motor, clubs, samen boeken, cadeaubon).
- `src/data/teksten.json` — Home-titel/intro, Over-mij, Voorbereiding, **home_hero_foto** (hoofdafbeelding).
- `src/data/reviews.json` — reviews (veld `voorbeeld:false` = tonen; `sterren` = 1–5).
- `src/galleries/*.json` — foto's per categorie (honden, puppys, agility, paarden, creative=rookfakkels, motor); elk met optionele `intro`.
- `src/assets/uploads/` — de eigenlijke fotobestanden. In JSON verwezen als `/src/assets/uploads/<naam>` en opgelost via `src/lib/images.js` (import.meta.glob).
- `src/lib/site.js` — helpers die placeholders/lege waarden netjes verbergen (igHandle/igUrl, email/mailLink, waLink, plaats, werkgebied, reiskostenRegel, bedrijfsnaam/kvk).

## Pagina's & componenten
- Pagina's: `src/pages/*.astro` — o.a. index, portfolio, prijzen, over-mij, voorbereiding, contact, bedankt, en de SEO-categoriepagina's: hondenfotografie, puppyshoot, agility-fotografie, paardenfotografie, rookfakkels, motor, plus cadeaubon, privacy, voorwaarden, 404.
- Layout `src/layouts/Base.astro` — `<head>`, SEO (title/description/canonical/OG/Twitter), **JSON-LD** (ProfessionalService/LocalBusiness), lightbox-script, tab-titel-script.
- Componenten: Header, Footer, Gallery, PackageCard, Reviews, Faq, Walkthrough, InstaFollow, InstaIcon, WhatsIcon.

## Toon & stijl (belangrijk — geen "AI-teksten")
- Warm, persoonlijk, nuchter, in Femke's eigen (jonge, losse) stijl. Zonder typfouten.
- **GEEN em-dashes (—)** in zichtbare teksten — dat voelt AI-achtig. Gebruik gewone interpunctie.
- Geen schaarste-/urgentie-marketing. Geen waardeverlagende taal ("hobby", "af en toe", "leuke extra", "bescheiden geprijsd").
- **Mobiel-first is prioriteit nummer 1.** Desktop moet óók goed, maar mobiel gaat voor.

## Valkuilen / hard geleerde lessen
- **Netlify gratis-credits:** deploys kosten build-credits. NA ELKE KLEINE TWEAK publiceren
  put het maandtegoed uit → deploys worden dan "skipped" tot de reset (dat is één keer gebeurd).
  → **Bundel wijzigingen** in zo weinig mogelijk deploys.
- **Na een credit-reset hervatten geskipte deploys NIET vanzelf** → push een (desnoods lege) commit om een nieuwe build te triggeren.
- **Boekingsformulier (Netlify Forms):** vereist dat in Netlify **Forms → "Form detection" AAN** staat
  (NIET bij "Emails"; dat is een losse extensie met Postmark/SendGrid/Mailgun die we niet gebruiken).
  Daarna moet één verse deploy draaien om het formulier "boeking" te registreren. `public/__forms.html`
  is een statische kopie zodat detectie betrouwbaar werkt. Notificatie-mail staat op femkeverheggen@hotmail.com.
- **WhatsApp-nummer** in `site.json` mag met `+` en spaties; `lib/site.js` haalt alle niet-cijfers eruf → `wa.me/<cijfers>`.
- **Foto's die "slecht" ogen: BEKIJK de foto eerst** met de Read-tool vóór je aan CSS gaat sleutelen
  (zo is de over-mij-foto opgelost: het was een wijde scène → portret-crop op Femke gemaakt met sharp).
- **Vaste beeldverhouding: zet `aspect-ratio` op de CONTAINER, niet op een Astro `<Image>`** (die zet
  eigen width/height → beeld blijft anders rechthoekig). Gebruik `object-fit:cover` + `object-position`.
- **Gelijke prijskaarten:** grid met `repeat(N, minmax(0,1fr))` (gewone `1fr` maakt kolommen ongelijk bij lange regels).
- **CMS-config YAML (`public/admin/config.yml`):** apostrof in een single-quoted string escape je met `''`,
  NIET met `\'` (dat brak Decap eerder). Of gebruik double-quotes.
- Alleen scripts/CSS van de toegestane bronnen; geen externe libraries nodig (alles is inline/statisch).

## Accounts (voor beheer/overdracht) — zie OVERDRACHT.md
- GitHub: `CasperEnClaude/Femkes_Camera`
- Netlify: project `femkescamera` (hosting + Forms + Identity/CMS)
- Instagram-handle in de site: `femkes_camera`

## Status (2026-09-21)
Volledig live en functioneel: boekingsformulier werkt (mailt naar Femke), WhatsApp/e-mail/
Instagram-knoppen werken, SEO/structured data staan, 17 pagina's. Nog niet gedaan (bewust,
Casper): eigen domein (femkescamera.nl), Google Search Console + Bedrijfsprofiel (vereist actie
van de eigenaar), en KvK-afhankelijke bedrijfsgegevens (placeholders staan klaar in site.json).
