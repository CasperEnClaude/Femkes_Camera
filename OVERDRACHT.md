# Overdracht — Femke's Camera doorgeven aan iemand anders

Zo kan iemand anders (bv. Caspers broertje) dit project overnemen en er met zijn/haar
**eigen Claude-account** aan verder werken, ook als Casper stopt met zijn abonnement.

Belangrijk: de website "hangt" niet aan een Claude-abonnement. Claude is alleen het
gereedschap waarmee je aan de code werkt. De website zelf leeft in **GitHub** (de code)
en op **Netlify** (de hosting + het beheerscherm). Die twee moet je overdragen; Claude
kan iedereen met een eigen account gebruiken.

---

## Wat de nieuwe beheerder nodig heeft
1. **Claude Code** geïnstalleerd, ingelogd met een **eigen Claude-account** (eigen abonnement).
2. **Node.js** (versie 20+) — om de site lokaal te bouwen.
3. **Git** + een **GitHub-account** met toegang tot de repo (zie stap 1).
4. De projectmap (via `git clone`, zie stap 4).

Zodra Claude Code in de projectmap draait, leest het automatisch `CLAUDE.md` in en heeft
het meteen alle context. De losse gespreksgeschiedenis van Casper reist NIET mee, maar
alles wat nodig is staat nu in `CLAUDE.md`, `README.md` (no-code handleiding voor Femke)
en `TECH.md`.

---

## Stap 1 — GitHub (de code)
Repo: **github.com/CasperEnClaude/Femkes_Camera**

Kies één van twee:
- **Toevoegen als medewerker** (als de `CasperEnClaude`-account blijft bestaan): repo →
  Settings → Collaborators → nieuwe beheerder uitnodigen. Die kan dan pushen.
- **Volledig overdragen** (aanrader als Casper helemaal stopt): repo → Settings → General →
  onderaan "Transfer ownership" → naar het GitHub-account van de nieuwe beheerder.

Zorg dat de nieuwe beheerder lokaal kan pushen (GitHub-login of een Personal Access Token).

## Stap 2 — Netlify (hosting + beheerscherm)
Het Netlify-project **femkescamera** verzorgt: de hosting, het boekingsformulier (Forms),
én het CMS-inloggen (Identity + Git Gateway). Dit is het belangrijkste om over te dragen,
want als Casper zijn Netlify-account verwijdert, verdwijnt dit mee.

Kies één van twee:
- **Site overdragen / teamlid maken:** maak de nieuwe beheerder lid van het Netlify-team
  (Team settings → Members) en draag de site over aan zijn team (Site → Site configuration →
  General → Transfer). Dan blijft alles (URL, Forms, Identity) intact.
- **Opnieuw koppelen op eigen account:** de nieuwe beheerder maakt een eigen Netlify-account
  en doet "Add new site → Import from Git" → kiest deze repo. Dan moet hij de Netlify-dingen
  éénmalig opnieuw instellen (alles staat al in de repo klaar):
  1. **Identity** aanzetten (voor CMS-login), en **Git Gateway** aanzetten (Identity → Services).
  2. **Forms → "Form detection" AAN** zetten + een deploy draaien (zodat het boekingsformulier registreert).
  3. Een **notificatie-mail** instellen (Forms → Add notification → Email) naar Femke's adres.
  4. Beheerders **uitnodigen** in Identity (zie stap 3).
  Let op: bij deze route verandert de standaard-URL (tenzij je een eigen domein koppelt).

## Stap 3 — Beheerscherm-login (/admin) voor Femke
In Netlify → **Identity** → **Invite users** → e-mailadres van Femke (en evt. de beheerder).
Zij krijgen een uitnodigingsmail, kiezen een wachtwoord en loggen daarna in op
`https<...>/admin`. Zet registratie op **Invite only** zodat niemand anders zich kan aanmelden.

## Stap 4 — Lokaal aan de slag met (jouw eigen) Claude
```bash
git clone https://github.com/CasperEnClaude/Femkes_Camera.git
cd Femkes_Camera
npm install
```
Open Claude Code in deze map. Het leest `CLAUDE.md` en je kunt vragen om wijzigingen.
Publiceren = een **git push naar `main`**; Netlify bouwt en zet het live.

---

## Belangrijke aandachtspunten (staan ook in CLAUDE.md)
- **Netlify gratis-credits:** publiceer niet na élke kleine tweak — bundel wijzigingen, anders
  raken de maandelijkse build-credits op en pauzeren de deploys tot de reset.
- **Boekingsformulier:** werkt alleen met **Forms → "Form detection" aan** (niet "Emails") + een deploy.
- **Domein:** er is nog geen eigen domein. Wil je `femkescamera.nl`? Koop het en koppel het in Netlify.

## Checklist vóór opzeggen abonnement / vertrek
- [ ] GitHub-repo overgedragen of medebeheerder toegevoegd
- [ ] Netlify-site overgedragen (of opnieuw gekoppeld op eigen account, incl. Identity/Git Gateway/Forms)
- [ ] Femke (+ nieuwe beheerder) uitgenodigd in Netlify Identity → kunnen op /admin
- [ ] Nieuwe beheerder heeft de repo lokaal gekloond en één keer een testwijziging gepusht + live gezien
