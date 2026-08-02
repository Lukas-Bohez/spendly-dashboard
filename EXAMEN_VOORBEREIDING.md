# 📋 Examenvoorbereiding — Interaction Design (Herexamen)

> Alles over het examen, de deadline, de evaluatie en wat er nog te doen staat.
> Bronnen: `opdracht.md`, `files/Introductie & evaluatie.pdf`, course slides in `files/`.

---

## 🗓️ Wanneer & Waar

| Wat | Detail |
|-----|--------|
| **Deadline indienen** | **Maandag 17 augustus 2026 om 9:00** |
| **Waar indienen** | Online via het digitale leerplatform van school (**Leho**/Canvas) — upload in de opdracht-module van Interaction Design |
| **Opdracht deadline** | Volgens de opdrachtfiche: *"Deadline: dag van het examen"* → dus 17 augustus, 9:00 's ochtends |
| **Examenperiode** | **Derde examenperiode: 17 augustus – 5 september 2026** (bron: [Howest academische kalender 2025-26](https://www.howest.be/nl/academische-kalender)) — jouw deadline valt op de **eerste dag** van die periode, je mondeling examen valt dus zeer waarschijnlijk in diezelfde eerste week |
| **Deliberatie/punten** | Bekendmaking in de week van 1–5 september en 7–12 september 2026 |
| **Mondeling examen** | Zelfde examenperiode; **exact uur en lokaal staan NIET in de cursusbestanden** → check je persoonlijke examenrooster op Leho / de Howest examenplanning |
| **Lectoren** | Martijn Loth (moduleverantwoordelijke), Simon Coudeville |

⚠️ **Actie vereist:** zoek het precieze lokaal en tijdstip van het mondeling examen op in je rooster — dat staat niet in de cursus-PDF's, enkel in de officiële examenplanning.

### 🔍 Online opzoekwerk (2 augustus 2026)
- Publieke zoekopdracht **"Lukas Bohez" Howest examen** → enkel je LinkedIn-profiel (MCT-student Howest) en je GitHub gevonden; **geen publieke examengegevens** (verwacht — roosters zitten achter login).
- **Howest academische kalender** bevestigt: derde examenperiode = **17/08 t/m 05/09/2026**, voorafgegaan door zomerverlof (week 10/08–15/08, ma 15/08 = O.L.V. Hemelvaart, feestdag).
- 📂 **Repo:** alles staat publiek op [github.com/Lukas-Bohez/spendly-dashboard](https://github.com/Lukas-Bohez/spendly-dashboard)

---

## ⚖️ Evaluatie (uit "Introductie & evaluatie")

- **60% opdracht** (deel 1 Design in Figma + deel 2 Frontend in React)
- **40% mondeling examen**, met:
  - **Vragen over de eindopdracht** — je moet je eigen keuzes kunnen verdedigen en je code kunnen uitleggen
  - **Vragen uit de cursus** — theorie (zie studielijst hieronder)
- Belangrijk uit de slides: je moet de **2 nieuwe CSS features kunnen toelichten op de dag van het examen**.

### Rubric (100 punten totaal — 10 × 10 pts)

| # | Criterium | Waar het op slaat |
|---|-----------|-------------------|
| 1 | Design checklist | Voldoet het design aan alle eisen uit de design checklist? |
| 2 | Local variables | Design tokens als local variables, light/dark switch, 2 lagen (base + design tokens) |
| 3 | Figma file | Verzorgde layer structuur, components met variants, alles local text styles |
| 4 | Auto layouts | Design is flexibel opgebouwd met auto layouts |
| 5 | Afwerking | Oog voor detail |
| 6 | Accessibility | Volledig bedienbaar met toetsenbord, font-size instelling gerespecteerd |
| 7 | CSS variables | Design tokens als CSS variables, light/dark switch, 2 lagen |
| 8 | Code quality | Efficiënt, gestructureerd, responsive goed uitgewerkt, CSS grid goed gebruikt |
| 9 | Interactions | Minstens 2 interactions, goed uitgewerkt (hover telt NIET) |
| 10 | CSS features | Minstens 2 nieuwe CSS features, aanwezig én goed gebruikt |

---

## 📦 Indienen — checklist

- [ ] **Figma file** exporteren als `.fig` (File > Save As .fig...) → `figma/Design Interaction Design.fig` (ligt al klaar)
- [ ] **Frontend zip** maken van de `dashboard/` map **ZONDER `node_modules`** (en zonder `dist/`)
- [ ] Beide bestanden uploaden op Leho **voor maandag 17 augustus 2026, 9:00**
- [ ] Dubbelcheck: de zip bevat `index.html`, `package.json`, `src/`, `public/`, `DOCUMENTATION.md`, `FUTURE_CSS_FEATURES.md`

```powershell
# Zip maken zonder node_modules / dist (PowerShell, vanuit de projectroot):
cd dashboard
npm run build   # check dat alles compileert
cd ..
Compress-Archive -Path dashboard\* -DestinationPath spendly-frontend.zip -Force
# ⚠️ verwijder eerst handmatig node_modules en dist uit de zip,
# of zip enkel: index.html, package.json, vite.config.js, public, src, *.md
```

---

## ✅ Wat er vandaag (2 aug) verbeterd is aan het project

Na een volledige audit tegen de rubric zijn deze zaken aangepakt:

### 🔴 Kritieke fix
1. **Maand-dropdown werkte niet** — het `popover="auto"` attribuut stond er wel, maar de popover werd nooit echt geopend (geen `showPopover()`/invoker), waardoor de browser hem verborg. Nu een **echte Popover API implementatie**: `popovertarget` invoker (native open/sluit/light-dismiss/Escape), `toggle` events die React state syncen, `:popover-open` + `@starting-style` animatie (nu ook met sluit-animatie), Anchor Positioning met JS fallback. De geselecteerde maand verschijnt nu ook op de knop.

### 🟢 Nieuwe interactie (rubric: Interactions)
2. **Transacties Filter knop is nu echt functioneel** — was een lege placeholder ("Filter opties"). Nu een native popover met **All / Paid / Pending** statusfilter, check-icoon op de actieve optie, filter-badge op de knop, en combineert met de live search.

### ♿ Accessibility (rubric: Accessibility — 10 pts)
3. **Heading-hiërarchie gefixt**: was `h1` → `h3` (skip), nu overal netjes `h1` → `h2`.
4. **Landmarks opgeruimd**: dubbele `role="navigation"` op sidebar weg (nu één `<nav>` landmark), overbodige `role="banner"` op de upgrade banner weg, `nav` + `aria-label` op de breadcrumb, `aria-label` op de drie grid-secties.
5. **`lang="en"`** i.p.v. `lang="nl"` — matcht nu de Engelse UI (belangrijk voor screen reader uitspraak); skip link en aria-labels mee verEngelst.
6. **Betere ARIA**: `aria-haspopup="listbox"` + `role="listbox"/"option"` + `aria-selected` op de maanddropdown, `aria-pressed` op filter-opties, `aria-live="polite"` op de tabel (screen reader kondigt filterresultaten aan), `sr-only` labels op lege tabelkoppen, beschrijvende `aria-label` op theme-toggle en menu-knoppen.

### 🧹 Code quality (rubric: Code quality)
7. Dode code verwijderd: `_temp.ps1`, ongebruikte `popoverPos`/`filterPos` state, `useCallback` imports waar niet nodig.
8. Inline styles voor "No transactions found" vervangen door een echte CSS class.
9. `DOCUMENTATION.md` en `FUTURE_CSS_FEATURES.md` geüpdatet zodat ze exact overeenkomen met de code (belangrijk: de docent leest die mee!).

**Build getest:** `npm run build` ✅ — dropdown, filter en dark mode geverifieerd in de browser ✅

---

## 📚 Studielijst mondeling examen (40%)

Vragen komen **over je eindopdracht** én **uit de cursus**. De theorie-PDF's in `files/` zijn je leerstof:

| Onderwerp | Bestand | Kern dat je moet kennen |
|-----------|---------|------------------------|
| Design herhaling | `Design herhaling.pdf` | Design checklist: 60-30-10, grijswaarden, contrast 4.5:1/3:1, typografie, whitespace, baseline grid, hiërarchie, iconen |
| Affordances | `Affordances.pdf` | Wat affordances/signifiers zijn, herkenbaarheid van interactieve elementen |
| Accessibility | `Accessibility.pdf` | Toetsenbordbediening, contrast, font-size respecteren, ARIA, semantische HTML |
| Design Systems | `Design Systems.pdf` | Design tokens, base vs semantic tokens (Atlassian-model), components/variants |
| Forms | `Focus on Forms.pdf` | Input types, validatie, usability, accessibility van forms |
| Animation | `Animation.pdf` | Animation basics, easing, wanneer (niet) animeren |
| Micro-interactions | `micro-interactions.pdf` | Trigger → rules → feedback → loops/modes; waarom micro-interactions |
| View transitions | `View transitions.pdf` | View Transitions API basis |
| CSS variables | `Theorie/CSS Variables.pdf` | Custom properties, cascade, theming |
| React | `react-intro.pdf`, `react-routing.pdf`, `react-motion.pdf` | Componenten, state, props, hooks die je gebruikt (useState/useEffect/useRef) |

> 📌 De `files/` map staat **bewust niet in de publieke GitHub repo** (cursusmateriaal van de lectoren) — hij staat nog gewoon lokaal op je pc, dus je studielijst blijft bruikbaar.

### CSS features die je moet kunnen toelichten (verplicht!)
Je hebt er **26** in je project zitten — kies er minstens 2 en oefen de uitleg hard. Sterke kandidaten uit je code:
- **Container queries** (`@container`) — stat cards/layout reageren op parent-breedte
- **`:has()`** — search wrapper krijgt focus-ring als de input focus heeft
- **Popover API + `@starting-style`** — de maand-dropdown en filter (top layer, light-dismiss, entry/exit animatie)
- **Anchor positioning** — popover "vastgeklikt" aan de knop
- **`oklch()` + `color-mix()`** — je hele token-systeem
- **Cascade layers** (`@layer`) — georganiseerde cascade zonder `!important`
- **Subgrid**, **logical properties**, **`@property`** (gauge animatie), **media query ranges**, **`dvh`**

👉 Volledige uitleg + codevoorbeelden per feature: `dashboard/FUTURE_CSS_FEATURES.md`

### AI-beleid (uit de slides)
- AI mag gebruikt worden, maar: **"Weet waarover je praat. Snap wat er wordt gegenereerd."**
- De docenten controleren dit door **vragen over je opdracht** te stellen — elke lijn code in je project moet je kunnen uitleggen.

---

## 🗒️ Laatste-week checklist

- [ ] Hele app eens doortesten met **alleen het toetsenbord** (Tab, Enter, Space, Escape)
- [ ] Dark/light mode testen + OS-instelling testen
- [ ] Responsive checken in DevTools (desktop → tablet → mobile)
- [ ] Figma `.fig` exporteren (laatste versie!)
- [ ] Zip zonder `node_modules` maken en uploaden **voor 17/08 9:00**
- [ ] 2 CSS features kiezen en hardop kunnen uitleggen aan de hand van je eigen code
- [ ] Theorie-PDF's herlezen (tabel hierboven)
- [ ] Examenrooster checken voor lokaal + uur mondeling
