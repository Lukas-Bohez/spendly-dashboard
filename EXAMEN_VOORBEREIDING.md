# 📋 Examenvoorbereiding — Interaction Design (Herexamen)

> Alles over het examen, de deadline, de evaluatie en wat er nog te doen staat.
> Bronnen: `docs/assignment/opdracht.md`, Leho ("Eindopdracht 2de zit"), `files/Introductie & evaluatie.pdf`, Howest academische kalender.

---

## 🗓️ Wanneer & Waar — ✅ BEVESTIGD via Leho ("Eindopdracht 2de zit")

| Wat | Detail |
|-----|--------|
| **Deadline indienen** | **Dinsdag 18 augustus 2026 om 12:00 (middag)** |
| **Waar indienen** | **Leho** (Canvas) → opdracht "Eindopdracht 2de zit" — **file upload**, bestandstype **zip** |
| **Punten** | 100 |
| **Indienvenster** | 26 juni 2026, 0:00 → **18 augustus 2026, 12:00** |
| **Opdracht zegt** | *"Deadline: dag van het examen"* — dus de examendag = **18 augustus 2026** |
| **Examenperiode** | **Derde examenperiode: 17 augustus – 5 september 2026** (bron: [Howest academische kalender](https://www.howest.be/nl/academische-kalender)) — jouw examen valt in **week 1** daarvan |
| **Deliberatie/punten** | Bekendmaking in de week van 1–5 september en 7–12 september 2026 |
| **Mondeling examen** | Na de deadline; **exact uur en lokaal** → check je persoonlijke examenrooster op Leho |
| **Lectoren** | Martijn Loth (moduleverantwoordelijke), Simon Coudeville |

⚠️ **Actie vereist:** zoek het precieze lokaal en tijdstip van het mondeling examen op in je rooster — dat staat niet in de cursus-PDF's, enkel in de officiële examenplanning.

> 📤 **Over het zip-bestandstype:** Leho accepteert **zip**. De opdracht vraagt 2 zaken: de `.fig` file + een zip van de frontend. In Canvas kan je bij één submission meerdere bestanden toevoegen — voeg dus **beide** toe (1. `Design Interaction Design.fig`, 2. `spendly-frontend.zip`). Lukt dat niet, maak dan één master-zip met daarin beide.

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
- [ ] Beide bestanden uploaden op Leho **voor dinsdag 18 augustus 2026, 12:00**
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

### ♿ Extra accessibility ronde 2 (2 aug avond)
10. **`prefers-reduced-motion` support** — wie "verminder beweging" aan heeft staan in zijn OS, krijgt quasi-instant animaties (eindtoestanden zoals de 48% gauge blijven correct).
11. **Chart tooltips nu ook met toetsenbord bereikbaar** — elk datapunt in de LineChart is focusbaar (Tab) en toont bij focus dezelfde tooltip als bij hover, met `aria-label` per punt.

**Build getest:** `npm run build` ✅ — dropdown, filter en dark mode geverifieerd in de browser ✅

---

## 🎯 100% Audit — status per rubric criterium

| # | Criterium (10 pts) | Status | Wat is geverifieerd / wat moet JIJ nog checken |
|---|--------------------|--------|-------------------------------------------------|
| 1 | Design checklist | ⚠️ **Check in Figma** | Design volgt de checklist (zie `docs/assignment/designChecklist.md`). Let op: in de Figma-extract staan chart-labels van **19.79px** (geen modular scale waarde) en een Cambria Math glyph (⌘F) — check of die bewust zo zijn. |
| 2 | Local variables | ⚠️ **Check in Figma** | De extract-plugin toonde `variables: []` — dat kan aan de plugin liggen, maar **verifieer zelf** dat je colors écht als local variables met 2 lagen (base + design tokens) staan en dat light/dark switch werkt in Figma. |
| 3 | Figma file (components/variants/text styles) | ⚠️ **Check in Figma** | Extract toonde `components: 0`, `instances: 16` — **check dat je stat card / table row echte components met variants zijn** en dat álle tekst een local text style gebruikt. Dit zijn samen met #2 en #4 **30 van de 100 punten**! |
| 4 | Auto layouts | ⚠️ **Check in Figma** | Test: sleep een card breder/smaller — schaalt de inhoud mee (geen vaste posities)? |
| 5 | Afwerking | ✅ Frontend af | Detailniveau in code: consistente spacing tokens, hover/focus states, dark mode contrast getabeld. |
| 6 | Accessibility | ✅ **Geverifieerd** | font-size 100% + rem overal, volledige keyboard-bediening (ook chart tooltips), focus-visible, skip link, landmarks, ARIA states, `prefers-reduced-motion`, `aria-live` tabel, `lang="en"` matcht content. |
| 7 | CSS variables | ✅ **Geverifieerd** | 2 lagen in `tokens.css` (base oklch tokens + semantic tokens), dark theme via `[data-theme]` + `prefers-color-scheme`, `light-dark()` als progressive enhancement. |
| 8 | Code quality | ✅ **Geverifieerd** | Component-structuur (jsx+css per component), CSS Grid layout (+ subgrid), responsive breakpoints + container queries, build zonder errors/warnings. |
| 9 | Interactions | ✅ **Geverifieerd** | 8 interacties (≥2 vereist): sidebar live search, transacties live search, **status filter**, maand-dropdown, theme toggle, mobile menu, chart tooltips, gauge animatie. |
| 10 | CSS features | ✅ **Geverifieerd** | 26 features gedocumenteerd in `FUTURE_CSS_FEATURES.md`; de Popover API feature was stiekem kapot en is **echt werkend** gemaakt + in browser getest. |

**Samengevat:** frontend (criteria 5–10, 50 pts) zit zo goed als zeker snor. De 50 Figma-punten (criteria 1–4 + deel van 5) kan alleen jij bevestigen in Figma — loop de ⚠️-punten hierboven na, vooral components/variants/local variables.

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
- [ ] Zip zonder `node_modules` maken en uploaden **voor 18/08 12:00**
- [ ] 2 CSS features kiezen en hardop kunnen uitleggen aan de hand van je eigen code
- [ ] Theorie-PDF's herlezen (tabel hierboven)
- [ ] Examenrooster checken voor lokaal + uur mondeling
