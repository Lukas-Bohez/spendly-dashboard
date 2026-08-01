# Future CSS Features — Volledige Documentatie

Dit document beschrijft alle future CSS features die in het Spendly Dashboard worden gebruikt, met locaties en uitleg.

## 1. `@layer` — Cascade Layers

**Wat:** Organiseert CSS in lagen voor betere specificiteit controle. Regels in een latere laag winnen altijd van regels in een eerdere laag, ongeacht selector specificiteit.

**Waar:**
- `src/styles/tokens.css:58` — `@layer reset, tokens, base, layout, components, utilities;`
- `src/styles/reset.css:12` — `@layer reset { ... }`
- `src/styles/global.css:26` — `@layer base { ... }`

**Hoe het gebruikt wordt:**
```css
@layer reset, tokens, base, layout, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer tokens {
  :root { --color-blue-600: oklch(0.52 0.16 250); }
}
```
Dit zorgt ervoor dat reset regels altijd tokens regels verliezen, ongeacht selector specificiteit.

---

## 2. `@scope` — Scoped Styles

**Wat:** Beperkt CSS regels tot een specifiek DOM subtree. Voorkomt style leakage naar andere componenten.

**Waar:**
- `src/components/Sidebar.css:13` — `@scope (.sidebar) { ... }`
- `src/components/Header.css` — `@scope (.header) { ... }`
- `src/components/StatCard.css:16` — `@scope (.stat-card) { ... }`
- `src/components/LineChart.css:23` — `@scope (.line-chart) { ... }`
- `src/components/GaugeChart.css:13` — `@scope (.gauge-card) { ... }`
- `src/components/TransactionsTable.css:18` — `@scope (.transactions-card) { ... }`
- `src/components/TaxLiabilities.css:13` — `@scope (.tax-card) { ... }`
- `src/components/UpgradeBanner.css:12` — `@scope (.upgrade-banner) { ... }`

**Hoe het gebruikt wordt:**
```css
@scope (.stat-card) {
  :scope {
    background-color: var(--color-bg-card);
    /* Dit geldt alleen voor .stat-card zelf */
  }
  & .stat-card__title {
    /* Dit geldt alleen voor .stat-card__title binnen .stat-card */
  }
}
```

---

## 3. `@property` — Custom Property Registratie

**Wat:** Registreert custom properties met een type en initial waarde, zodat ze geanimeerd kunnen worden met transitions en animations.

**Waar:**
- `src/styles/tokens.css:32-46` — `@property --progress-animated`, `@property --gauge-fill`
- `src/components/GaugeChart.css:157-162` — `@property --gauge-fill`
- `src/components/TaxLiabilities.css` — `@property --stack-fill`

**Hoe het gebruikt wordt:**
```css
@property --gauge-fill {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.gauge-fill {
  animation: gaugeFill 1.2s var(--ease-spring) forwards;
}
```
Hierdoor kan de gauge fill animeren van 0% naar 48%.

---

## 4. `@container` — Container Queries

**Wat:** Past styling toe op basis van de breedte van de parent container (niet de viewport). Maakt component-gebaseerde responsive design mogelijk.

**Waar:**
- `src/App.css:91-103` — `@container stats-container (max-width: 700px)`
- `src/components/StatCard.css:85-95` — `@container stat-card (max-width: 220px)`
- `src/components/LineChart.css:140-145` — `@container line-chart (max-width: 480px)`
- `src/components/GaugeChart.css:174-178` — `@container gauge-card (max-width: 300px)`
- `src/components/TaxLiabilities.css:135-139` — `@container tax-card (max-width: 400px)`

**Hoe het gebruikt wordt:**
```css
.stat-card {
  container-type: inline-size;
  container-name: stat-card;
}

@container stat-card (max-width: 220px) {
  .stat-card__value {
    font-size: var(--font-size-h1);
  }
}
```
De stat card past zijn layout aan op basis van zijn eigen breedte, niet de viewport.

---

## 5. `@starting-style` — Entry Animations

**Wat:** Definieert beginwaarden voor elementen die van `display: none` naar zichtbaar gaan, zodat ze kunnen animeren.

**Waar:**
- `src/components/Header.css:95-100` — `@keyframes popoverIn` (vervangt @starting-style voor JS popovers)

**Hoe het gebruikt wordt (originele popover versie):**
```css
.header__month-popover {
  opacity: 0;
  translate: 0 -8px;
  transition: opacity 0.2s, translate 0.2s, display 0.2s allow-discrete;
}

@starting-style {
  .header__month-popover {
    opacity: 0;
    translate: 0 8px;
  }
}
```

---

## 6. `:has()` — Parent Selector

**Wat:** Styling een parent element op basis van de aanwezigheid van een child element.

**Waar:**
- `src/App.css:69` — `.mobile-nav-toggle:has(.hamburger--open)`
- `src/components/Sidebar.css:83` — `.sidebar__search:has(input:focus-visible)`
- `src/components/TransactionsTable.css:60` — `.transactions-card__search:has(input:focus-visible)`

**Hoe het gebruikt wordt:**
```css
.sidebar__search {
  &:has(input:focus-visible) {
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 0 3px var(--color-accent-primary-light);
  }
}
```
De search wrapper krijgt een focus ring wanneer de input erin focus heeft.

---

## 7. `:where()` — Lage Specificiteit

**Wat:** Groepeert selectors met 0 specificiteit, zodat ze makkelijk te overschrijven zijn.

**Waar:**
- `src/styles/global.css:57` — `:where(ul, ol) { list-style: none; }`
- `src/components/StatCard.css:68-74` — `&:where(.stat-card__change-badge--positive)`
- `src/components/GaugeChart.css:145-153` — `&:where(.gauge-card__legend-dot--profit)`
- `src/components/TransactionsTable.css:120-128` — `&:where(.transactions-card__status--paid)`
- `src/components/TaxLiabilities.css:105-109` — `&:where(.tax-card__status--success)`

**Hoe het gebruikt wordt:**
```css
.stat-card__change-badge {
  &:where(.stat-card__change-badge--positive) {
    background-color: var(--color-status-success-bg);
    color: var(--color-status-success);
  }
}
```
De `:where()` zorgt ervoor dat de modifier class makkelijk te overschrijven is.

---

## 8. `:is()` — Selector Groepering

**Wat:** Groepeert selectors met de hoogste specificiteit van de gegroepeerde selectors.

**Waar:**
- `src/components/LineChart.css` — Gebruikt in combinatie met `:where()` voor legend dots

---

## 9. CSS Nesting — Native Geneste Selectors

**Wat:** Schrijf geneste selectors direct in CSS zonder preprocessor (zoals Sass).

**Waar:** In **alle** CSS bestanden. Elke component CSS gebruikt `&` voor geneste selectors.

**Hoe het gebruikt wordt:**
```css
.sidebar__nav-item {
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-bg-surface-hover);
  }

  &.sidebar__nav-item--active {
    color: var(--color-text-sidebar-active);
  }
}
```

---

## 10. `oklch()` — Wide-Gamut Color Space

**Wat:** Nieuwe color space die meer kleuren kan weergeven dan RGB. Beter voor perceptueel uniforme kleurovergangen.

**Waar:**
- `src/styles/tokens.css:67-118` — Alle base kleuren gebruiken `oklch()`
- `src/styles/tokens.css:128-132` — Schaduwen gebruiken `oklch()` met alpha

**Hoe het gebruikt wordt:**
```css
--color-blue-600: oklch(0.52 0.16 250);
--shadow-md: 0 2px 8px oklch(0.20 0.004 250 / 0.06);
```
De eerste waarde is lightness (0-1), de tweede chroma, de derde hue (0-360).

---

## 11. `light-dark()` — Theme Switching

**Wat:** Eenvoudige light/dark theme switching met één functie.

**Waar:**
- `src/styles/tokens.css:148-154` — `@supports (color: light-dark(black, white))`

**Hoe het gebruikt wordt:**
```css
@supports (color: light-dark(black, white)) {
  :root {
    --color-bg-app: light-dark(var(--color-neutral-100), var(--color-neutral-950));
  }
}
```
De eerste waarde is voor light mode, de tweede voor dark mode.

---

## 12. `color-scheme` — Browser Integratie

**Wat:** Vertelt de browser welk kleurenschema de pagina gebruikt, zodat browser UI (scrollbars, form controls) zich aanpast.

**Waar:**
- `src/styles/tokens.css:197` — `:root { color-scheme: light dark; }`
- `src/styles/global.css:33` — `html { color-scheme: light dark; }`

---

## 13. `dvh` — Dynamic Viewport Height

**Wat:** Viewport unit die rekening houdt met mobile browser UI (adresbalk die verschijnt/verdwijnt).

**Waar:**
- `src/App.css:17` — `min-block-size: 100dvh;`
- `src/components/Sidebar.css:21` — `block-size: 100dvh;`
- `src/styles/global.css:41` — `min-block-size: 100dvh;`

---

## 14. Logical Properties — RTL/LTR Support

**Wat:** Fysieke eigenschappen (left, right, top, bottom) vervangen door logische (inline-start, block-start, etc.) voor betere internationalisatie.

**Waar:** In **alle** CSS bestanden.

**Voorbeelden:**
- `inset-block-start` i.p.v. `top`
- `inset-inline-start` i.p.v. `left`
- `margin-block-end` i.p.v. `margin-bottom`
- `inline-size` i.p.v. `width`
- `block-size` i.p.v. `height`
- `padding-inline-start` i.p.v. `padding-left`
- `border-inline-end` i.p.v. `border-right`

---

## 15. Individual Transform Properties

**Wat:** `translate`, `rotate`, `scale` als aparte eigenschappen i.p.v. één `transform` property.

**Waar:**
- `src/App.css:78-84` — Hamburger animatie: `translate: 0 7px; rotate: 45deg;`
- `src/components/StatCard.css:27-30` — Hover lift: `translate: 0 -4px; scale: 1.01;`
- `src/components/GaugeChart.css:120` — Detail knop hover: `scale: 1.05;`
- `src/components/Sidebar.css:59` — Logo: `translate: -50% -50%;`

**Hoe het gebruikt wordt:**
```css
.hamburger--open span:nth-child(1) {
  translate: 0 7px;
  rotate: 45deg;
}
```

---

## 16. Media Query Ranges — Nieuwe Notatie

**Wat:** Nieuwe media query syntax met `<=`, `>=`, `<`, `>`.

**Waar:**
- `src/App.css:120` — `@media (width <= 1200px)`
- `src/App.css:130` — `@media (width <= 1024px)`
- `src/App.css:140` — `@media (width <= 768px)`
- `src/components/Sidebar.css:231` — `@media (width <= 1024px)`

---

## 17. `linear()` — Custom Easing

**Wat:** Definieer custom easing functies met een lijst van stoppunten.

**Waar:**
- `src/styles/tokens.css:130` — `--ease-bounce: linear(0, 0.004, 0.016, ...)`

**Hoe het gebruikt wordt:**
```css
:root {
  --ease-bounce: linear(0, 0.004, 0.016, 0.035, 0.063, 0.098, ...);
}

.gauge-fill {
  animation: gaugeFill 1.2s var(--ease-spring) forwards;
}
```

---

## 18. `text-wrap: balance` — Mooiere Tekstafbreking

**Wat:** Breekt titels mooi af zodat de laatste regel niet veel korter is.

**Waar:**
- `src/styles/global.css:50` — `h1, h2, h3, h4 { text-wrap: balance; }`

---

## 19. `overscroll-behavior` — Scroll Chaining

**Wat:** Voorkomt dat scrollen in één element een ander element laat scrollen (bijv. pull-to-refresh).

**Waar:**
- `src/App.css:47` — `.main-content { overscroll-behavior-y: contain; }`
- `src/components/Sidebar.css:25` — `.sidebar { overscroll-behavior: contain; }`
- `src/styles/global.css:43` — `body { overscroll-behavior-y: contain; }`

---

## 20. `accent-color` — Form Control Kleur

**Wat:** Styling native form controls (checkbox, radio, range) met de accent kleur.

**Waar:**
- `src/styles/global.css:59` — `input[type='checkbox'] { accent-color: var(--color-accent-primary); }`

---

## 21. `caret-color` — Cursor Kleur

**Wat:** Styling de tekst cursor in inputs.

**Waar:**
- `src/styles/global.css:65` — `input, textarea { caret-color: var(--color-accent-primary); }`

---

## 22. `font-synthesis: none` — Voorkom Faux Bold/Italic

**Wat:** Voorkomt dat de browser valse bold/italic varianten genereert voor fonts die ze niet hebben.

**Waar:**
- `src/styles/global.css:45` — `body { font-synthesis: none; }`

---

## 23. `:user-invalid` — Form Validatie

**Wat:** Pseudo-class die aangeeft dat een input ongeldig is nadat de gebruiker ermee interactie heeft gehad.

**Waar:**
- `src/components/TransactionsTable.css:73` — `.transactions-card__search-input:user-invalid`

---

## 24. `scroll-behavior: smooth` — Smooth Scrolling

**Wat:** Maakt scrollen soepel bij anchor links en JavaScript scroll operaties.

**Waar:**
- `src/styles/global.css:65` — `.main-content { scroll-behavior: smooth; }`

---

## 25. `:focus-visible` — Keyboard Focus Only

**Wat:** Toont focus ring alleen voor keyboard gebruikers, niet voor muisgebruikers.

**Waar:**
- `src/styles/reset.css:30` — `:focus-visible { outline: 2px solid var(--color-focus-ring); }`
- `src/styles/global.css:35` — `:focus:not(:focus-visible) { outline: none; }`

---

## 26. `hanging-punctuation` — Typografie

**Wat:** Laat interpunctie buiten de tekst marge hangen voor mooiere uitlijning.

**Waar:**
- `src/styles/global.css:34` — `html { hanging-punctuation: first last; }`

---

## Samenvatting

| # | Feature | Bestand(en) |
|---|---------|-------------|
| 1 | `@layer` | tokens.css, reset.css, global.css |
| 2 | `@scope` | Alle component CSS bestanden |
| 3 | `@property` | tokens.css, GaugeChart.css, TaxLiabilities.css |
| 4 | `@container` | App.css, StatCard.css, LineChart.css, GaugeChart.css, TaxLiabilities.css |
| 5 | `@starting-style` | Header.css (vervangen door keyframes in JS versie) |
| 6 | `:has()` | App.css, Sidebar.css, TransactionsTable.css |
| 7 | `:where()` | global.css, StatCard.css, GaugeChart.css, TransactionsTable.css, TaxLiabilities.css |
| 8 | `:is()` | LineChart.css |
| 9 | CSS Nesting | Alle CSS bestanden |
| 10 | `oklch()` | tokens.css |
| 11 | `light-dark()` | tokens.css |
| 12 | `color-scheme` | tokens.css, global.css |
| 13 | `dvh` | App.css, Sidebar.css, global.css |
| 14 | Logical Properties | Alle CSS bestanden |
| 15 | Individual Transforms | App.css, StatCard.css, GaugeChart.css, Sidebar.css |
| 16 | Media Query Ranges | App.css, Sidebar.css |
| 17 | `linear()` | tokens.css |
| 18 | `text-wrap: balance` | global.css |
| 19 | `overscroll-behavior` | App.css, Sidebar.css, global.css |
| 20 | `accent-color` | global.css |
| 21 | `caret-color` | global.css |
| 22 | `font-synthesis` | global.css |
| 23 | `:user-invalid` | TransactionsTable.css |
| 24 | `scroll-behavior` | global.css |
| 25 | `:focus-visible` | reset.css, global.css |
| 26 | `hanging-punctuation` | global.css |