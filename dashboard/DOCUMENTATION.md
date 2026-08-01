# Spendly Dashboard — Documentatie

## Project overzicht

Dit is een React + Vite frontend project dat het **Spendly** financieel dashboard nabouwt op basis van het Figma design in `../figma/`. Het project voldoet aan alle eisen uit `opdracht.md` voor Deel 2: Frontend.

## Starten

```bash
cd dashboard
npm install
npm run dev      # Development server op http://localhost:5173/
npm run build    # Productie build in dist/
```

## Project structuur

```
dashboard/
├── index.html                          # HTML entry point (Spendly titel, Inter font, favicon, anti-flash script)
├── package.json                        # React 19, Vite 6, lucide-react
├── vite.config.js                      # Vite configuratie met React plugin
├── DOCUMENTATION.md                    # Dit bestand
├── FUTURE_CSS_FEATURES.md              # Complete lijst van 26 CSS features met uitleg
├── public/
│   └── favicon.svg                     # Spendly logo (blauw met witte cirkel)
└── src/
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Hoofd component (layout, theme toggle, mobile nav)
    ├── App.css                         # CSS Grid layout, responsive, subgrid, scroll-snapping
    ├── styles/
    │   ├── tokens.css                  # Design system (2-laags: base + semantic tokens, dark theme)
    │   ├── reset.css                   # CSS reset met @layer
    │   └── global.css                  # Globale stijlen (typografie, accessibility, smooth transitions)
    └── components/
        ├── Sidebar.jsx/.css            # Navigatie sidebar met functionele zoekbalk, menu secties
        ├── Header.jsx/.css             # Header met breadcrumb, month dropdown (Popover API), user info
        ├── UpgradeBanner.jsx/.css      # Promotie banner met Upgrade knop
        ├── StatCard.jsx/.css           # Statistiek kaarten (4× met change badges)
        ├── LineChart.jsx/.css          # Cash Flow Analytics (Income/Expense lijnen)
        ├── GaugeChart.jsx/.css         # Financial Balance (270° gauge met 48%)
        ├── TransactionsTable.jsx/.css  # Recent Transactions tabel met functionele search/filter
        ├── TaxLiabilities.jsx/.css     # Tax Liabilities met stacked bar + tabel
        ├── DonutChart.jsx/.css         # Donut grafiek voor opslag data
        ├── BarChart.jsx/.css           # Bar chart component
        ├── ActivityTimeline.jsx/.css   # Activiteit tijdlijn component
        └── SystemMonitor.jsx/.css      # Systeem monitor component
```

## Design System

Het design system is opgebouwd volgens het **Atlassian model** met 2 lagen:

### Laag 1: Base tokens (ruwe waarden)
- Kleuren in `oklch()` color space (wide-gamut, perceptueel uniform)
- Accent blauw: `--color-blue-50` t/m `--color-blue-900`
- Grijswaarden met subtiele blauwe tint: `--color-neutral-0` t/m `--color-neutral-950`
- Systeemkleuren: groen (success), rood (error), oranje (warning)
- Sidebar specifieke kleuren: `--color-sidebar-bg`, `--color-sidebar-fg`, etc.

### Laag 2: Semantic tokens (toegepast op elementen)
- Achtergrond: `--color-bg-app`, `--color-bg-surface`, `--color-bg-card`
- Tekst: `--color-text-primary`, `--color-text-secondary`, `--color-text-meta`
- Accent: `--color-accent-primary`, `--color-accent-primary-hover`
- Status: `--color-status-success`, `--color-status-error`, `--color-status-warning`
- Chart: `--color-chart-income`, `--color-chart-expense`, `--color-chart-profit`, etc.
- Spacing: `--space-1` t/m `--space-16` (8px baseline grid)
- Typografie: `--font-size-*`, `--font-weight-*`, `--line-height-*`
- Color Functions: `--color-accent-soft` (color-mix), `--color-accent-tinted` (relative color)

### Light/Dark theme
- **Handmatige toggle**: Knop rechtsonder op het scherm (Maan/Zon icoon)
- **Automatisch via OS**: `prefers-color-scheme: dark` media query + `:not([data-theme='light'])`
- **Persistentie**: Thema keuze opgeslagen in `localStorage` onder key `spendly-theme`
- **Geen flash**: Inline `<script>` in `index.html` zet `data-theme` voor React mount
- **Real-time OS changes**: `matchMedia('change')` event listener in `App.jsx`
- **Smooth transition**: `transition: background-color 0.3s ease, color 0.3s ease` op `body`

### Dark mode contrast (geoptimaliseerd)
| Element | Lightness | Contrast ratio |
|---------|-----------|---------------|
| Primaire tekst | 0.95 | ~12:1 op 0.14 bg |
| Secundaire tekst | 0.78 | ~7:1 |
| Meta tekst | 0.68 | ~5.5:1 |
| Sidebar muted | 0.68 | ~5.7:1 op 0.11 bg |
| Status badges | 0.24 bg | Goed leesbaar |

## Componenten

Elke component is opgebouwd als een aparte module met eigen `.jsx` en `.css` bestand. Dit maakt het makkelijk om componenten te hergebruiken en te onderhouden.

### Sidebar
- Light achtergrond met zoekbalk (⌘F shortcut)
- **Functionele zoekbalk**: Filtert live alle 3 menu secties (MENU, ACCOUNT, SUPPORT)
- Toont "No matches found" wanneer geen resultaten
- Actief item heeft blauwe accent links + blauwe tekst
- Badges voor notificaties (8, 18, 13)
- Logout knop onderaan
- Mobile: off-canvas met overlay + smooth slide animatie (translate)
- Sluit met Escape toets of klik op overlay

### Header
- Breadcrumb: "Spendly > Dashboard"
- "Welcome back, Christina" titel
- Month dropdown met `popover="auto"` (Popover API) + `@starting-style` animatie
- Share knop
- User avatar (CP) + naam + email

### StatCard
- 4 kaarten: Total Balance, Total Saving, Revenue, Credit
- Title met info icon (Lucide)
- Grote waarde in bold
- Change badge (groen/rood) + "vs last month"
- Three-dot menu knop
- Hover: subtle lift met translate + scale

### LineChart
- Cash Flow Analytics met Income (groen) en Expense (blauw) lijnen
- 8 maanden data (May-Dec)
- Rechte lijnen (polyline, niet smooth)
- Y-as: $100 t/m $900
- Tooltip op hover met datum + waarden (X geclamped zodat altijd zichtbaar)
- Legend onderaan

### GaugeChart
- Financial Balance — 48% from yesterday
- 270° boog (3/4 cirkel) die onder het midden doorloopt
- Grote radius (120), strokeWidth 18
- 42px percentage tekst, 13px "from yesterday"
- Detail knop absoluut gepositioneerd in de cirkel
- Legend: Total Profit, Profit Today, For Week
- Vult volledige hoogte van adjacent LineChart card

### TransactionsTable
- **Functionele search**: Filtert live op Order ID
- Filter knop (JS-positioned popover)
- Tabel met: checkbox, Order ID, Amount, Status, row menu
- Status badges: Paid (groen), Pending (oranje)
- Hover: rij highlight
- Toont "No transactions found" bij geen resultaten

### TaxLiabilities
- $32.872,00 Total Tax /2024
- Stacked horizontal bar: VAT 44%, Employee 36%, Services 20%
- Legend met percentages
- Tabel met Tax Type, Date, Amount, Status

### UpgradeBanner
- Blauwe banner met info icon
- "Unlock the full potential..." tekst
- Upgrade knop (blauw, rounded)
- Sluit knop (X icon)

## Interactive elementen

1. **Sidebar zoekbalk**: Filtert 10+ navigatie items live (useMemo + useState)
2. **Transactions zoekbalk**: Filtert 4 transacties op Order ID
3. **Month dropdown**: Popover met 12 maanden, sluit op scroll/resize/Escape
4. **Theme toggle**: Switch tussen light/dark met localStorage persistentie
5. **Mobile hamburger menu**: Opent off-canvas sidebar met overlay
6. **LineChart hover tooltips**: Toont Income/Expense waarden per maand
7. **GaugeChart animatie**: Geanimeerde gauge fill via @property CSS Houdini

## Accessibility

- `font-size: 100%` op `html` — respecteert browser instelling
- Alle sizes in `rem` — schaalt met gebruiker font-size
- Skip link "Ga direct naar inhoud"
- `:focus-visible` voor keyboard focus ring (alleen bij Tab navigatie)
- `aria-label` op alle interactieve elementen
- `role="navigation"`, `role="img"`, `role="banner"` waar van toepassing
- `aria-expanded`, `aria-current`, `aria-controls` voor state
- Contrast ratio's: minstens 4.5:1 voor tekst, 3:1 voor UI elementen
- Keyboard navigatie: Tab, Enter, Space, Escape
- `hanging-punctuation: first last` voor mooiere typografie

## Responsive

- Desktop (>1200px): sidebar + 4-col stats + 2-col analytics + 2-col bottom
- Tablet (1024-1200px): sidebar + 2-col stats + 1-col analytics + 1-col bottom
- Mobile (≤1024px): off-canvas sidebar + hamburger toggle (rechtsboven) + 2-col stats
- Small mobile (≤768px): 1-col stats, extra top padding voor hamburger knop

## Future CSS features

Zie `FUTURE_CSS_FEATURES.md` voor een volledige lijst van **26 CSS features** met locaties, uitleg, en codevoorbeelden die je aan je docent kan tonen.