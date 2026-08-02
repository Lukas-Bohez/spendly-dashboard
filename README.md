# Spendly Dashboard — Interaction Design (Herexamen)

Eindopdracht voor het opleidingsonderdeel **Interaction Design** (MCT — Howest), herexamenperiode augustus 2026.
Bestaat uit **Deel 1: Design** (Figma) en **Deel 2: Frontend** (React + Vite), een nabouw van het [Spendly SaaS dashboard](https://dribbble.com/shots/25270785-SaaS-Dashboard-for-Business-Payments-Web-Application).

> 👉 **Deadline: dinsdag 18 augustus 2026, 12:00** (Leho — "Eindopdracht 2de zit", file upload, zip) — zie [`EXAMEN_VOORBEREIDING.md`](EXAMEN_VOORBEREIDING.md) voor exameninfo, rubric, indienchecklist en studielijst.

## 📁 Structuur

```
├── EXAMEN_VOORBEREIDING.md   # ⭐ Exameninfo (wanneer/waar/hoe), rubric, checklists, studielijst
├── dashboard/                # Deel 2 — React + Vite frontend
│   ├── DOCUMENTATION.md      #   Projectdocumentatie (architectuur, componenten, accessibility)
│   ├── FUTURE_CSS_FEATURES.md#   26 moderne CSS features met uitleg + codevoorbeelden
│   ├── public/               #   Favicon
│   └── src/                  #   Componenten, styles (design tokens, reset, global)
├── figma/                    # Deel 1 — Figma design
│   ├── Design Interaction Design.fig   # De in te dienen Figma file
│   ├── Design Interaction Design.pdf   # PDF-export van het design
│   └── extract/              # JSON-extract van de Figma file
├── docs/
│   └── assignment/           # Opdrachtfiche, design checklist, notities, CSS features lijst
└── design.webp               # Render van het design (light mode)
```

> 📚 De theorie-PDF's en oefenmappen uit de cursus (`files/`) staan **bewust niet** in deze
> publieke repo (cursusmateriaal van de lectoren). Ze blijven lokaal beschikbaar voor eigen studie.

## 🚀 Quick start (frontend)

```bash
cd dashboard
npm install
npm run dev      # http://localhost:5173
npm run build    # productie build
```

## ✨ Kernfeatures

- **2-laags design system** met design tokens (base + semantic) in `oklch()`, als CSS variables
- **Light/dark theme** — volgt OS-instelling, handmatige toggle met `localStorage`, geen flash
- **Toegankelijk**: volledig bedienbaar met toetsenbord, `rem`-based (respecteert font-size instelling), correcte landmarks/ARIA, contrast ≥ 4.5:1
- **Responsive** met CSS Grid, container queries en subgrid
- **Interacties**: live navigatie-search, transacties search + statusfilter (native Popover API), maand-dropdown, theme toggle, chart tooltips
- **26 moderne/"future" CSS features** — o.a. `@container`, `:has()`, Popover API, `@starting-style`, anchor positioning, `@scope`, `@property`, `light-dark()` — gedocumenteerd in [`dashboard/FUTURE_CSS_FEATURES.md`](dashboard/FUTURE_CSS_FEATURES.md)
