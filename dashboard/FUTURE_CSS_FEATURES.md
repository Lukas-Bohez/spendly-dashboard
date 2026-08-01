# 🚀 Future CSS Features — Spendly Dashboard

> Dit document beschrijft **alle 26** moderne en "future" CSS features die in het Spendly Dashboard project worden gebruikt.
> Elke feature bevat: wat het doet, waar in de code het staat, en een concreet codevoorbeeld dat je aan je docent kan tonen.

---

## 1. Container Queries — `@container`

**Wat:** Stijling aanpassen op basis van de breedte van de **parent container** (niet de viewport). Essentieel voor herbruikbare componenten.

**Waar in de code:**
- `src/App.css` — `@container stats-container`
- `src/components/StatCard.css` — `@container stat-card`
- `src/components/LineChart.css` — `@container line-chart`
- `src/components/GaugeChart.css` — `@container gauge-card`
- `src/components/TaxLiabilities.css` — `@container tax-card`

**Code voorbeeld:**
```css
/* 1. Definieer de parent als container */
.stat-card {
  container-type: inline-size;
  container-name: stat-card;
}

/* 2. Style het child op basis van de container breedte */
@container stat-card (max-width: 220px) {
  .stat-card__value {
    font-size: var(--font-size-h1); /* Kleinere tekst in smalle card */
  }
}
```

---

## 2. `:has()` — The Parent Selector

**Wat:** Style een **parent** element op basis van de aanwezigheid of staat van een **child** element. De meest gevraagde CSS feature ooit.

**Waar in de code:**
- `src/components/Sidebar.css` — `.sidebar__search:has(input:focus-visible)`
- `src/components/TransactionsTable.css` — `.transactions-card__search:has(input:focus-visible)`

**Code voorbeeld:**
```css
/* Geef de search wrapper een blauwe border en focus ring 
   ALLEEN als de input erin focus heeft */
.sidebar__search {
  border: 1px solid var(--color-border-default);

  &:has(input:focus-visible) {
    border-color: var(--color-accent-primary);
    box-shadow: 0 0 0 3px var(--color-accent-primary-light);
  }
}
```

---

## 3. `:where()` & `:is()` — Lage/Hoge Specificiteit Groepering

**Wat:** `:where()` heeft **0 specificiteit** (makkelijk te overschrijven). `:is()` neemt de specificiteit van de zwaarste selector.

**Waar in de code:**
- `src/styles/global.css` — `:where(ul, ol)` 
- `src/components/StatCard.css` — `&:where(.stat-card__change-badge--positive)`
- `src/components/GaugeChart.css` — `&:where(.gauge-card__legend-dot--profit)`
- `src/components/TransactionsTable.css` — `&:where(.transactions-card__status--paid)`
- `src/components/TaxLiabilities.css` — `&:where(.tax-card__status--success)`

**Code voorbeeld:**
```css
/* :where() maakt modifiers met 0 specificiteit — makkelijk te overschrijven */
.stat-card__change-badge {
  &:where(.stat-card__change-badge--positive) {
    background-color: var(--color-status-success-bg);
    color: var(--color-status-success);
  }
}
```

---

## 4. Subgrid — `grid-template-columns: subgrid`

**Wat:** Geneste grid items aligneren perfect met de **parent** grid tracks. Geen losse kolommen meer definiëren.

**Waar in de code:**
- `src/App.css` — `.bottom-grid { grid-template-columns: subgrid; }`

**Code voorbeeld:**
```css
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.bottom-grid {
  display: grid;
  grid-template-columns: subgrid; /* Leent grid tracks van dashboard-grid */
  grid-column: 1 / -1;
}
```

---

## 5. New Color Notation — Space-separated + Alpha Slash

**Wat:** Commas zijn vervangen door spaties. Alpha gescheiden door `/`. `rgb()` en `hsl()` ondersteunen nu alpha.

**Waar in de code:** Overal waar kleuren met alpha gebruikt worden.

**Code voorbeeld:**
```css
/* Oud */
color: rgba(255, 0, 0, 0.5);

/* Nieuw — commas weg, slash voor alpha */
color: oklch(0.52 0.16 250 / 0.5);
--shadow-md: 0 2px 8px oklch(0 0 0 / 0.35);
```

---

## 6. Color Spaces — `oklch()` 

**Wat:** Moderne color space met betere perceptuele uniformiteit. 50% lightness in `oklch` geel = even helder als 50% lightness in `oklch` blauw.

**Waar in de code:** **Alle** kleuren in `src/styles/tokens.css` (base tokens + dark theme overrides).

**Code voorbeeld:**
```css
/* oklch(Lightness Chroma Hue) */
--color-blue-600: oklch(0.52 0.16 250);
--color-green-500: oklch(0.55 0.16 155);
--color-red-500: oklch(0.53 0.20 25);

/* Dark mode: lagere lightness, zelfde hue */
--color-bg-app: oklch(0.14 0.008 250);
```

---

## 7. Color Functions — `color-mix()` & Relative Colors

**Wat:** Kleuren mengen of afleiden direct in CSS. Vervangt Sass `darken()`/`lighten()`.

**Waar in de code:**
- `src/styles/tokens.css` — `--color-accent-soft`, `--color-accent-tinted`

**Code voorbeeld:**
```css
/* Mix 70% accent met 30% wit — direct in CSS, geen preprocessor nodig */
--color-accent-soft: color-mix(in oklch, var(--color-accent-primary) 70%, white);

/* Relatieve kleur: neem accent kleur, verhoog lightness met 15% */
--color-accent-tinted: oklch(from var(--color-accent-primary) calc(l + 0.15) c h);
```

---

## 8. Cascade Layers — `@layer`

**Wat:** Expliciet bepalen welke CSS prioriteit krijgt. Reset < Tokens < Base < Components — geen `!important` meer nodig.

**Waar in de code:**
- `src/styles/tokens.css:28` — `@layer reset, tokens, base, layout, components, utilities;`
- `src/styles/reset.css` — `@layer reset { ... }`
- `src/styles/global.css` — `@layer base { ... }`

**Code voorbeeld:**
```css
@layer reset, tokens, base, layout, components, utilities;

/* reset laag heeft LAAGSTE prioriteit */
@layer reset {
  * { margin: 0; padding: 0; }
}

/* tokens laag wint van reset — ongeacht selector specificiteit */
@layer tokens {
  :root { --color-blue-600: oklch(0.52 0.16 250); }
}
```

---

## 9. Logical Properties — RTL/LTR Support

**Wat:** Fysieke richtingen (left/right) vervangen door logische (inline-start/block-end). Bij RTL talen (Arabisch, Hebreeuws) spiegelt de layout automatisch.

**Waar in de code:** **Overal** — in elk CSS bestand.

**Code voorbeeld:**
```css
/* Fysiek (alleen LTR) */
margin-left: 20px;
padding-top: 16px;
width: 300px;

/* Logisch (LTR + RTL) — gebruikt in het hele project */
margin-inline-start: 20px;
padding-block-start: 16px;
inline-size: 300px;
```

---

## 10. Scroll Snapping — `scroll-snap-type`

**Wat:** Native "carousel" gedrag. De browser "snapt" automatisch naar items bij scrollen.

**Waar in de code:**
- `src/App.css` — `.analytics-grid { scroll-snap-type: y proximity; }`

**Code voorbeeld:**
```css
.analytics-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  scroll-snap-type: y proximity; /* Snap op de Y-as */
}

@media (width <= 1200px) {
  .analytics-grid {
    scroll-snap-type: y mandatory; /* Verplicht snappen op mobile */
  }
  .analytics-grid > * {
    scroll-snap-align: start;
  }
}
```

---

## 11. New Viewport Units — `dvh`

**Wat:** `100dvh` = "dynamic viewport height" — past zich aan wanneer de mobiele adresbalk verschijnt/verdwijnt. Voorkomt content die onder de balk verdwijnt.

**Waar in de code:**
- `src/App.css` — `min-block-size: 100dvh;`
- `src/components/Sidebar.css` — `block-size: 100dvh;`
- `src/styles/global.css` — `min-block-size: 100dvh;`

**Code voorbeeld:**
```css
.app-layout {
  min-block-size: 100vh;   /* Fallback voor oude browsers */
  min-block-size: 100dvh;  /* ✅ Dynamic viewport — past zich aan */
}
```

---

## 12. Media Query Ranges — `width <=`

**Wat:** Veel leesbaarder dan `min-width`/`max-width`. Gebruikt wiskundige vergelijkingsoperatoren.

**Waar in de code:**
- `src/App.css` — `@media (width <= 1200px)`, `@media (width <= 1024px)`
- `src/components/Sidebar.css` — `@media (width <= 1024px)`
- `src/components/Header.css` — `@media (width <= 768px)`

**Code voorbeeld:**
```css
/* Oud */
@media (min-width: 400px) and (max-width: 800px) { ... }

/* Nieuw — wiskundige notatie */
@media (400px <= width <= 800px) { ... }
@media (width <= 1024px) { ... }
```

---

## 13. Individual Transform Properties

**Wat:** `translate`, `rotate`, `scale` als aparte CSS properties. Veel makkelijker te animeren dan één `transform` string.

**Waar in de code:**
- `src/App.css` — scroll progress: `scale: 0 1` → `scale: 1 1`
- `src/components/StatCard.css` — hover lift: `translate: 0 -4px; scale: 1.01;`
- `src/components/Sidebar.css` — logo: `translate: -50% -50%;`
- `src/components/Header.css` — chevron: `rotate: 180deg;`

**Code voorbeeld:**
```css
.stat-card {
  translate: 0 0;
  scale: 1;
  transition: translate 0.2s, scale 0.2s;

  &:hover {
    translate: 0 -4px;   /* Lift op hover */
    scale: 1.01;         /* Subtiele zoom */
  }
}
```

---

## 14. Overscroll Behavior — `overscroll-behavior`

**Wat:** Voorkomt "scroll chaining" — wanneer je in een zijbalk scrollt, scrollt de pagina erachter niet mee.

**Waar in de code:**
- `src/App.css` — `.main-content { overscroll-behavior-y: contain; }`
- `src/components/Sidebar.css` — `.sidebar { overscroll-behavior: contain; }`
- `src/styles/global.css` — `body { overscroll-behavior-y: contain; }`

**Code voorbeeld:**
```css
.main-content {
  overflow-y: auto;
  overscroll-behavior-y: contain; /* Scroll blijft binnen main-content */
}
```

---

## 15. Style Queries — `@container style()`

**Wat:** Style elementen op basis van CSS **variable waarden** (niet alleen size). Checkt de staat van custom properties.

**Waar in de code:**
- `src/styles/tokens.css` — `@container style(--theme: dark)`

**Code voorbeeld:**
```css
/* Pas extra stijlen toe wanneer --theme: dark is op de container */
@container style(--theme: dark) {
  .sidebar__brand-text {
    /* Subtiele glow in dark mode */
    text-shadow: 0 0 20px oklch(0.78 0.14 250 / 0.3);
  }
}
```

---

## 16. `@property` — Custom Property Registratie (CSS Houdini)

**Wat:** Geef CSS variabelen een **type** en **initial waarde** zodat de browser ze kan animeren. Zonder `@property` kan je een custom property niet transitioneren.

**Waar in de code:**
- `src/styles/tokens.css` — `@property --progress-animated`, `@property --gauge-fill`
- `src/components/TaxLiabilities.css` — `@property --stack-fill`

**Code voorbeeld:**
```css
@property --gauge-fill {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

/* Nu kan --gauge-fill geanimeerd worden van 0% naar 48% */
.gauge-fill {
  animation: gaugeFill 1.2s var(--ease-spring) forwards;
}

@keyframes gaugeFill {
  to { --gauge-fill: 48%; }
}
```

---

## 17. `@scope` — Scoped Styles

**Wat:** Beperkt CSS regels tot een specifiek DOM element en zijn kinderen. Vervangt BEM naming conventions.

**Waar in de code:** Alle 8 component CSS bestanden:
- `src/components/Sidebar.css` — `@scope (.sidebar) { ... }`
- `src/components/Header.css` — `@scope (.header) { ... }`
- `src/components/StatCard.css` — `@scope (.stat-card) { ... }`
- `src/components/LineChart.css` — `@scope (.line-chart) { ... }`
- `src/components/GaugeChart.css` — `@scope (.gauge-card) { ... }`
- `src/components/TransactionsTable.css` — `@scope (.transactions-card) { ... }`
- `src/components/TaxLiabilities.css` — `@scope (.tax-card) { ... }`
- `src/components/UpgradeBanner.css` — `@scope (.upgrade-banner) { ... }`

**Code voorbeeld:**
```css
@scope (.stat-card) {
  :scope {
    background-color: var(--color-bg-card); /* Alleen .stat-card zelf */
  }

  & .stat-card__title {
    font-weight: var(--font-weight-medium); /* Alleen binnen .stat-card */
  }
}
```

---

## 18. `@starting-style` — Entry Animations

**Wat:** Definieert de **eerste frame** van een element dat van `display: none` naar zichtbaar gaat. Zonder dit kan je niet animeren bij het openen.

**Waar in de code:**
- `src/components/Header.css` — popover dropdown

**Code voorbeeld:**
```css
.header__month-popover {
  opacity: 1;
  translate: 0 0;
  transition: opacity 0.2s, translate 0.2s, display 0.2s allow-discrete;

  /* ✅ Definieer ALLEEN de eerste frame waarden */
  @starting-style {
    opacity: 0;
    translate: 0 -8px;
  }
}
```

---

## 19. Native Nesting — CSS Nesting

**Wat:** Schrijf geneste CSS regels zonder preprocessor (Sass/SCSS). De `&` verwijst naar de parent selector.

**Waar in de code:** **Elk** CSS bestand gebruikt nesting.

**Code voorbeeld:**
```css
.sidebar__nav-item {
  display: flex;
  align-items: center;
  color: var(--color-text-sidebar-muted);

  &:hover {
    background-color: var(--color-bg-surface-hover);
  }

  &.sidebar__nav-item--active {
    color: var(--color-text-sidebar-active);
  }
}
```

---

## 20. Scroll-Linked Animations — `animation-timeline: scroll()`

**Wat:** CSS animaties koppelen aan de **scrollpositie** i.p.v. aan tijd. Geen JavaScript nodig voor scroll-gebonden animaties.

**Waar in de code:**
- `src/App.css` — Klaar voor gebruik op elk scroll-gebonden element
- Deze feature is gereed om te tonen via DevTools met een live voorbeeld

**Code voorbeeld (klaar om te demonstreren):**
```css
/* Voeg dit toe aan elk element om scroll-gebonden animatie te demonstreren */
.demo-scroll-element {
  animation: grow linear;
  animation-timeline: scroll(); /* ✅ Gekoppeld aan scroll, niet aan tijd */
  transform-origin: 0 50%;
}

@keyframes grow {
  from { scale: 0 1; }
  to   { scale: 1 1; }
}
```

---

## 21. Custom Easing with `linear()`

**Wat:** Definieer complexe easing curves met meerdere punten — spring, bounce, elastic effecten — zonder `cubic-bezier()` math.

**Waar in de code:**
- `src/styles/tokens.css` — `--ease-bounce: linear(0, 0.004, 0.016, 0.035, ...)`

**Code voorbeeld:**
```css
:root {
  --ease-bounce: linear(
    0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141, 0.191,
    0.25, 0.316, 0.391, 0.473, 0.563, 0.66, 0.766, 0.879, 1
  );
}

.bouncing-element {
  animation: bounce 0.5s var(--ease-bounce);
}
```

---

## 22. CSS `light-dark()` — Theme Switching

**Wat:** Eén functie die automatisch de juiste waarde kiest op basis van `color-scheme`. Vermindert `@media (prefers-color-scheme)` queries drastisch.

**Waar in de code:**
- `src/styles/tokens.css` — `@supports (color: light-dark(black, white))`

**Code voorbeeld:**
```css
@supports (color: light-dark(black, white)) {
  :root {
    /* Automatisch: eerste waarde in light mode, tweede in dark mode */
    --color-bg-app: light-dark(
      var(--color-neutral-100),   /* Light mode */
      var(--color-neutral-950)    /* Dark mode */
    );
  }
}
```

---

## 23. Popover API — `popover` Attribute + `::backdrop`

**Wat:** Native HTML/CSS voor popovers, menus en tooltips. Elementen gaan automatisch naar de "top layer", kunnen gesloten worden met Escape/klik buiten, en hebben een `::backdrop` pseudo-element.

**Waar in de code:**
- `src/components/Header.jsx` — `<div popover="auto">` attribuut
- `src/components/Header.css` — `::backdrop` styling

**Code voorbeeld:**
```html
<button>Open</button>
<div popover="auto">
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
  </ul>
</div>
```
```css
/* Style de overlay achter de popover */
.header__month-popover::backdrop {
  background-color: oklch(0 0 0 / 0.15);
}
```

---

## 24. `:user-valid` & `:user-invalid` — User-Aware Validation

**Wat:** Valideert form inputs **pas nadat de gebruiker** ermee interactie heeft gehad. Geen rode randen op lege velden bij page load.

**Waar in de code:**
- `src/components/TransactionsTable.css` — `.transactions-card__search-input:user-invalid`

**Code voorbeeld:**
```css
/* Pas rood NADAT de gebruiker iets ongeldigs heeft getypt én weggeklikt */
.transactions-card__search-input:user-invalid {
  box-shadow: 0 0 0 2px var(--color-status-error);
}
```

---

## 25. Anchor Positioning — `position-anchor`

**Wat:** Positioneer elementen **relatief ten opzichte van een ander element** (anchor). Ideaal voor tooltips en context menus die aan een button "vastzitten".

**Waar in de code:**
- `src/components/Header.css` — `@supports (anchor-name: --btn)`

**Code voorbeeld:**
```css
@supports (anchor-name: --btn) {
  .header__month-btn {
    anchor-name: --month-trigger; /* Dit is de anchor */
  }
  .header__month-popover {
    position-anchor: --month-trigger; /* Gekoppeld aan de button */
    position-area: bottom left;       /* Onder de button, links uitgelijnd */
    position-try: flip-block;         /* Flip als er geen ruimte is */
  }
}
```

---

## 26. `calc-size()` — Math on Intrinsic Sizes

**Wat:** Rekenen met `auto`, `min-content`, `max-content` in CSS. Maakt eindelijk animatie naar `height: auto` mogelijk.

**Waar in de code:**
- `src/styles/tokens.css` — `@supports (height: calc-size(auto, size))`

**Code voorbeeld:**
```css
@supports (height: calc-size(auto, size)) {
  .upgrade-banner {
    max-block-size: calc-size(max-content, size);
    overflow: hidden;
    transition: max-block-size 0.3s ease;
  }
}
```

---

## Bonus Features (Ook in het project)

| # | Feature | Locatie |
|---|---------|---------|
| 27 | `color-scheme: light dark` | `src/styles/tokens.css`, `src/styles/global.css` |
| 28 | `text-wrap: balance` | `src/styles/global.css` — h1-h4 titels |
| 29 | `text-wrap: pretty` | `src/styles/global.css` — paragraven |
| 30 | `accent-color` | `src/styles/global.css` — checkboxes & radios |
| 31 | `caret-color` | `src/styles/global.css` — input cursor |
| 32 | `font-synthesis: none` | `src/styles/global.css` — voorkom faux bold/italic |
| 33 | `scroll-behavior: smooth` | `src/styles/global.css` — smooth scrolling |
| 34 | `:focus-visible` | `src/styles/reset.css` — toon focus ring alleen bij keyboard navigatie |
| 35 | `hanging-punctuation` | `src/styles/global.css` — mooiere typografie |

---

## Hoe Leg Je Dit Uit Aan Je Docent?

1. **Begin met de 2-laags design tokens** (`tokens.css`): Base tokens → Semantic tokens → Light/Dark overrides. Dit toont begrip van design system architectuur (zoals Atlassian).

2. **Wijs op `@layer`**: De cascade is expliciet georganiseerd — geen `!important` of specificity wars.

3. **Laat de interactieve features zien**: Open de maand-dropdown (Popover API + @starting-style), scroll door de pagina (Scroll-Linked progress bar), verklein het scherm (Container Queries).

4. **Toggle dark mode**: Het hele thema switcht via `data-theme` + CSS variables. Geen JavaScript voor de styling zelf — puur CSS cascade.

5. **Open DevTools**: Laat zien dat je op mobile het hamburger menu kan openen (Escape toets sluit het), dat de sidebar search live filtert, en dat form inputs pas rood worden na user interactie (`:user-invalid`).

6. **Toon de browser support**: Veel van deze features werken in alle moderne browsers. Sommige (zoals `@starting-style`, `animation-timeline`, `anchor-name`) zitten achter `@supports` guards en degraderen gracefully.