# Spendly Dashboard — Documentatie

## Project overzicht

Dit is een React + Vite frontend project dat het **Spendly** financieel dashboard nabouwt. Het project voldoet aan alle eisen uit `opdracht.md` voor Deel 2: Frontend.

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
├── index.html                      # HTML entry point (Spendly titel, Inter font, favicon)
├── package.json                    # React 19, Vite 6, lucide-react
├── vite.config.js                  # Vite configuratie met React plugin
├── public/
│   └── favicon.svg                 # Spendly logo (blauw met witte cirkel)
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Hoofd component (layout, theme toggle, mobile nav)
    ├── App.css                     # CSS Grid layout, responsive, mobile nav toggle
    ├── styles/
    │   ├── tokens.css              # Design system (2-laags: base + semantic tokens)
    │   ├── reset.css               # CSS reset met @layer
    │   └── global.css              # Globale stijlen (typografie, accessibility)
    └── components/
        ├── Sidebar.jsx/.css        # Navigatie sidebar met zoekbalk, menu secties
        ├── Header.jsx/.css         # Header met breadcrumb, month dropdown, user info
        ├── UpgradeBanner.jsx/.css  # Promotie banner met Upgrade knop
        ├── StatCard.jsx/.css       # Statistiek kaarten (4× met change badges)
        ├── LineChart.jsx/.css      # Cash Flow Analytics (Income/Expense lijnen)
        ├── GaugeChart.jsx/.css     # Financial Balance (270° gauge met 48%)
        ├── TransactionsTable.jsx/.css  # Recent Transactions tabel met search/filter
        └── TaxLiabilities.jsx/.css     # Tax Liabilities met stacked bar + tabel
```

## Design System

Het design system is opgebouwd volgens het **Atlassian model** met 2 lagen:

### Laag 1: Base tokens (ruwe waarden)
- Kleuren in `oklch()` color space (wide-gamut)
- Accent blauw: `--color-blue-50` t/m `--color-blue-900`
- Grijswaarden met subtiele blauwe tint: `--color-neutral-0` t/m `--color-neutral-950`
- Systeemkleuren: groen (success), rood (error), oranje (warning)

### Laag 2: Semantic tokens (toegepast op elementen)
- Achtergrond: `--color-bg-app`, `--color-bg-surface`, `--color-bg-card`
- Tekst: `--color-text-primary`, `--color-text-secondary`, `--color-text-meta`
- Accent: `--color-accent-primary`, `--color-accent-primary-hover`
- Status: `--color-status-success`, `--color-status-error`, `--color-status-warning`
- Spacing: `--space-1` t/m `--space-16` (8px baseline grid)
- Typografie: `--font-size-*`, `--font-weight-*`, `--line-height-*`

### Light/Dark theme
- Automatisch via `@media (prefers-color-scheme: dark)`
- Manuele toggle via `data-theme` attribuut op `<html>`
- `light-dark()` CSS functie als fallback

## Componenten

Elke component is opgebouwd als een aparte module met eigen `.jsx` en `.css` bestand. Dit maakt het makkelijk om componenten te hergebruiken en te onderhouden.

### Sidebar
- Light achtergrond met zoekbalk (⌘F shortcut)
- Menu secties: MENU, ACCOUNT, SUPPORT
- Actief item heeft blauwe accent links + blauwe tekst
- Badges voor notificaties (8, 18, 13)
- Logout knop onderaan
- Mobile: off-canvas met overlay

### Header
- Breadcrumb: "Spendly > Dashboard"
- "Welcome back, Christina" titel
- Month dropdown (JS-positioned popover met `getBoundingClientRect()`)
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
- Search met ⌘F shortcut
- Filter knop (JS-positioned popover)
- Tabel met: checkbox, Order ID, Amount, Status, row menu
- Status badges: Paid (groen), Pending (oranje)
- Hover: rij highlight

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

## Accessibility

- `font-size: 100%` op `html` — respecteert browser instelling
- Alle sizes in `rem` — schaalt met gebruiker font-size
- Skip link "Ga direct naar inhoud"
- `:focus-visible` voor keyboard focus ring
- `aria-label` op alle interactieve elementen
- `role="navigation"`, `role="img"`, `role="banner"` waar van toepassing
- `aria-expanded`, `aria-current`, `aria-controls` voor state
- Contrast ratio's: 4.5:1 voor tekst, 3:1 voor UI elementen
- Keyboard navigatie: Tab, Enter, Space, Escape

## Responsive

- Desktop (>1200px): sidebar + 4-col stats + 2-col analytics + 2-col bottom
- Tablet (1024-1200px): sidebar + 2-col stats + 1-col analytics + 1-col bottom
- Mobile (<1024px): off-canvas sidebar + 1-col stats
- Mobile (<768px): hamburger menu toggle

## Future CSS features

Zie `FUTURE_CSS_FEATURES.md` voor een volledige lijst met locaties en uitleg.