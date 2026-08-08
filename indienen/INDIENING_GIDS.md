# 📤 Indiening Gids — Interaction Design Eindopdracht (Herexamen)

**Indiener:** Lukas Bohez  
**Datum voorbereiding:** 8 augustus 2026  
**Deadline indiening:** 18 augustus 2026, 12:00 (middag)  
**Platform:** Leho (Canvas)

---

## 📋 Wat zit in deze map

```
indienen/
├── INDIENING_GIDS.md                          ← JIJ BENT HIER
├── submission_Lukas_Bohez.zip                 ← ZE HEBBEN DIT NODIG (2.4 MB)
└── submission_Lukas_Bohez_2026-08-08/         (geëxtraheerd uit zip, voor referentie)
    ├── Design Interaction Design.fig
    └── dashboard/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        ├── DOCUMENTATION.md
        ├── FUTURE_CSS_FEATURES.md
        ├── package-lock.json
        ├── public/
        └── src/
```

---

## ✅ Checklist voor indiening (Leho)

### Stap 1: Log in op Leho (Canvas)
- Ga naar https://leho.howest.be
- Zorg dat je bent ingelogd

### Stap 2: Navigeer naar de opdracht
- Ga naar jouw cursus "Interaction Design"
- Zoek de opdracht: **"Eindopdracht 2de zit"**
- Klik erop

### Stap 3: Upload het zip-bestand
- **Bestand:** `submission_Lukas_Bohez.zip`
- **Locatie:** `c:\development\herexamens\interaction\indienen\`
- **Klik op "Bestand uploaden"** en selecteer het zip-bestand
- **BELANGRIJK:** Zorg dat je **vóór dinsdag 18 augustus 2026 om 12:00** ingeleverd hebt

### Stap 4: Controleer dat het is ingediend
- Je ziet een bevestiging
- Je submission verschijnt in de lijst
- Optioneel: download hem terug om zeker te weten dat alles erin zit

---

## 📦 Wat zit ER IN het zip-bestand

### 1️⃣ **Design Interaction Design.fig** (2.3 MB)
- Je Figma design-bestand
- Bevat: design tokens, components, variants, layout, dark/light mode

### 2️⃣ **dashboard/** (rest van zip)
- Je complete frontend React-project
- **Zonder** `node_modules/` (niet opgenomen om zip klein te houden)
- **Zonder** `dist/` (build output, niet nodig)
- **Met:**
  - `index.html` — hoofd-HTML
  - `package.json` — dependencies & build scripts
  - `vite.config.js` — Vite configuratie
  - `DOCUMENTATION.md` — uitleg van je project
  - `FUTURE_CSS_FEATURES.md` — 26+ CSS features die je gebruikt
  - `public/` — statische assets
  - `src/` — React code + CSS

---

## 🔍 Hoe de docenten dit beoordelen

1. **Ze downloaden je zip**
2. **Ze openen de Figma file** en controleren:
   - Design checklist (alle eisen uit `docs/assignment/designChecklist.md`)
   - Local variables (2 lagen: base + semantic tokens)
   - Components met variants (stat card, table row, etc.)
   - Auto layouts (flexibel opgebouwd)
   - Afwerking & detail
3. **Ze controleren de frontend code:**
   - Zetten `npm install` → `npm run build` → `npm run dev`
   - Testen in browser: donker/licht mode, responsive, interactions
   - Lezen `DOCUMENTATION.md` & `FUTURE_CSS_FEATURES.md`
   - Controleren: accessibility (toetsenbord), CSS variables, code quality
4. **Mondeling examen** (later)
   - Vragen over je keuzes in design & code
   - Vragen uit de cursus (theorie)
   - Je moet 2+ CSS features kunnen uitleggen

---

## 🛠️ Na indiening — indien nodig aanpassen

**Scenario 1: Je hebt iets vergeten/fout**
- De indiening sluit **18 augustus 12:00**
- Je kan tot die tijd **opnieuw uploaden** (overschrijft je vorige submission)
- Zorg dat je goed test vóór je submit!

**Scenario 2: Hoe testten of alles in de zip zit**
```powershell
# PowerShell (op je pc)
Expand-Archive -Path "C:\development\herexamens\interaction\indienen\submission_Lukas_Bohez.zip" -DestinationPath "C:\Temp\test_unzip"
# Nu kan je alles checken in C:\Temp\test_unzip
```

---

## 📝 Inhoud controleren (vóór indiening!)

Zorg dat je zip deze bestanden bevat:

### In `submission_Lukas_Bohez_2026-08-08/` top-level:
- ✅ `Design Interaction Design.fig` (Figma file)
- ✅ `dashboard/` (folder)

### In `dashboard/`:
- ✅ `index.html`
- ✅ `package.json`
- ✅ `vite.config.js`
- ✅ `DOCUMENTATION.md`
- ✅ `FUTURE_CSS_FEATURES.md`
- ✅ `package-lock.json`
- ✅ `public/` (folder met assets)
- ✅ `src/` (folder met React code)
- ❌ **NIET:** `node_modules/`
- ❌ **NIET:** `dist/`

---

## 📞 Mondeling Examen voorbereiding

Na je indiening kom je voor het **mondeling examen** (naar verwachting dezelfde dag of volgende week).

### Wat voorbereiding

1. **Je eigen project kennen**
   - Elke regel code uitleggen
   - Waarom je bepaalde CSS features hebt gekozen
   - Hoe accessibility en dark mode werkt

2. **2 CSS features kiezen & voorbereiden**
   - Uit `dashboard/FUTURE_CSS_FEATURES.md`
   - Sterke kandidaten:
     - **Popover API** (maand-dropdown, filter popover)
     - **Container queries** (stat cards responsief)
     - **`:has()`** (focus-ring op search)
     - **Anchor positioning** (popover aan knop vastgeklikt)
     - **`oklch()` + `color-mix()`** (design tokens)
     - **`@starting-style`** (animaties bij open/close)
   - Je moet die _live_ aan je code kunnen aantonen en uitleggen

3. **Theorie terugkijken**
   - Bestanden in `files/Theorie/` en PDF's
   - Design principles, accessibility, design systems, animation, etc.

4. **Examenrooster checken**
   - Log in op Leho
   - Zoek je persoonlijke examenrooster
   - Let op: **lokaal + exacte tijd** voor het mondeling

---

## ✨ Succes!

Dit pakket bevat alles wat de docenten nodig hebben:
- ✅ Je design (Figma)
- ✅ Je code (React frontend)
- ✅ Je documentatie
- ✅ Alles netjes georganiseerd

**Upload `submission_Lukas_Bohez.zip` naar Leho** vóór **18 augustus 2026, 12:00**!

Veel sterkte met het mondeling examen! 🎓

---

## 📝 Noten

- **Je naam:** Lukas Bohez (voornaam: Lukas, achternaam: Bohez)
- **Bestand gemaakt:** 8 augustus 2026
- **Origineel project:** `c:\development\herexamens\interaction\`
- **Submission folder:** `c:\development\herexamens\interaction\indienen\submission_Lukas_Bohez_2026-08-08\`
- **Zip bestand:** `c:\development\herexamens\interaction\indienen\submission_Lukas_Bohez.zip`
