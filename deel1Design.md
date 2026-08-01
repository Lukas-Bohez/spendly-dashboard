Dit is een stevige, professionele checklist voor je UI/UX opdracht! Het dwingt je om niet zomaar "een mooi plaatje" te maken, maar een schaalbaar, development-ready design op te zetten.

Omdat ik een AI ben, kan ik niet fysiek in Figma klikken om het bestand voor je te bouwen, maar ik kan je wel een gestructureerd stappenplan geven waarmee je dit efficiënt aanpakt en gegarandeerd elk puntje van die rubric aftikt.

Hier is je strijdplan om dit dashboard op te bouwen volgens de regels van de kunst:

### Stap 1: De juiste referentie kiezen

Zoek op Dribbble of Behance naar termen als **"SaaS dashboard"**, **"Analytics dashboard"** of **"Admin panel"**.

* **Tip:** Kies een design dat al relatief clean is. Vermijd designs met veel 3D-elementen, zware illustraties of extreme "neomorphism", want die maken het erg lastig om aan de strikte contrast- en hiërarchie-regels te voldoen.
* Kies iets met een duidelijke sidebar of topbar, een paar datakaarten (cards) en een tabel of lijst.

### Stap 2: De Fundering (Variabelen & Styles configureren)

Begin **niet** meteen met het tekenen van rechthoeken. Zet eerst je basis op, dit bespaart je later uren werk.

* **Kleuren (60-30-10):** Kies één sterke accentkleur (bijv. een heldere blauw of paars) voor je actieve items en buttons.
* **Grijswaarden Tinten:** Maak 10 grijswaarden aan (van bijna wit tot bijna zwart). Selecteer ze allemaal en voeg een héél klein beetje van je accentkleur toe aan de 'saturation' (bijv. 2%). Sla deze op als **Color Variables** in Figma.
* **Typografie:** Kies een UI-vriendelijk font met een hoge x-height (zoals *Inter, Roboto, of SF Pro*). Maak **Local Text Styles** aan op basis van een modular scale. Bijvoorbeeld:
* *Micro / Meta:* 12px (Regular)
* *Body:* 14px of 16px (Regular / Medium, line-height 1.5)
* *H3 / Card Titles:* 18px of 20px (Semibold)
* *H1 / Page Titles:* 24px of 32px (Bold)



### Stap 3: Component-Driven Design & Auto Layout

Figma's Auto Layout werkt in de basis exact hetzelfde als het bouwen met flexbox, of met `Row` en `Column` widgets in Flutter. Gebruik het voor álles om die strakke uitlijning en whitespace te garanderen.

* **Atomic Design:** Begin klein. Ontwerp eerst een button. Zet er Auto Layout op (bijv. 16px horizontale padding, 8px verticale padding). Maak er een **Component** van met varianten (Default, Hover, Active, Disabled).
* **Cards:** Bouw een datakaart. Zet je tekst, een eventueel icoon en een button bij elkaar. Gebruik Auto Layout om de interne whitespace consistent te houden (bijv. altijd 16px of 24px afstand tussen elementen binnen een card).
* **Grid:** Hanteer een 4pt of 8pt baseline grid. Zorg dat al je afmetingen, padding en margins veelvouden zijn van 4 of 8 (8, 16, 24, 32, 64...). Dit zorgt voor perfecte visuele rust.

### Stap 4: Iconen en Contrast

* **Iconen:** Gebruik een Figma plugin zoals *Phosphor Icons*, *Feather Icons* of *Lucide*. Deze zijn monotoon, SVG en hebben een perfecte consistente bounding box (meestal 24x24px). Trek ze niet zomaar groter of kleiner zonder de constraints of box mee te schalen.
* **Contrast Testen:** Installeer een Figma plugin zoals *Stark* of *Contrast*. Controleer tijdens het ontwerpen of je meta-tekst (die lichtgrijze tekst onder een titel) de 3:1 of 4.5:1 ratio haalt ten opzichte van de achtergrond. Vaak moet je je lichtgrijze tekst net iets donkerder maken dan je in eerste instantie mooi vindt.

### Stap 5: Structuur in je Design File

Zorg dat je docent niet hoeft te zoeken.

* Maak aparte pages aan in je Figma file: `Cover`, `🔗 Design System / Components`, en `💻 Dashboard Design`.
* Geef je lagen duidelijke namen. Dus geen `Rectangle 42` of `Frame 128`, maar `Card / User Stats` of `Sidebar / Navigation`.

---

Heb je al een specifiek type dashboard of een bepaald thema (bijvoorbeeld e-commerce, server-management, of een media library) in gedachten om na te maken, of wil je dat ik met je meedenk over een geschikt concept dat goed bij deze checklist past?


Een **Media Server & Playlist Management Dashboard** of een **IoT Hardware Monitor** zijn voor deze specifieke checklist absoluut de beste keuzes.

Stel je een strakke interface voor waarin je actieve downloads (zoals torrents), afspeellijsten, of de status van aangesloten hardware (zoals ESP32 controllers of Raspberry Pi servers) beheert. Dit soort technische dashboards dwingen je namelijk om alle elementen uit je school-checklist perfect toe te passen, zonder dat het een onoverzichtelijke kermis wordt.

Omdat directe links naar individuele Dribbble-shots vaak offline gaan of stiekem betaalde UI-kits blijken te zijn, heb ik de perfecte zoekopdrachten voor je klaargezet die direct de juiste stijl filteren.

Hier zijn de twee beste richtingen en de links naar de designs:

### 1. Media & File Management Dashboard

Dit type dashboard is ideaal omdat het complexe data overzichtelijk moet presenteren.

* **Waarom het de checklist aftikt:** Je hebt hier ruimte voor een zijbalk, opslag-grafieken (perfect voor je 10% accentkleur), en uitgebreide tabellen voor afspeellijsten of downloads. Tabellen zijn de ultieme test voor je *baseline grid*, *line-height*, en subtiele grijswaarden (voor borders en meta-tekst).
* **De link:** [Bekijk Media Management Dashboards op Dribbble](https://www.google.com/search?q=https://dribbble.com/search/shots/popular%3Fq%3Dmedia-management-dashboard-saas)

### 2. IoT & Hardware Admin Panel

Een controlepaneel om externe apparaten en servers te monitoren.

* **Waarom het de checklist aftikt:** Dit is de perfecte plek om je "System kleuren" (groen voor online/actief, rood voor offline/errors) toe te passen in combinatie met je neutrale grijswaarden. Je kunt werken met 'Cards' voor elk apparaat, wat ideaal is om je vaardigheden rondom *Auto Layout* en *whitespace* te bewijzen.
* **De link:** [Bekijk IoT Admin Dashboards op Dribbble](https://www.google.com/search?q=https://dribbble.com/search/shots/popular%3Fq%3Diot-admin-dashboard-clean)

---

**Waar je op moet letten bij het kiezen van jouw definitieve voorbeeld:**

1. **Kies voor Clean, niet voor Fancy:** Negeer designs met zware schaduwen, 'glassmorphism' (wazige doorzichtige panelen) of neon glow-effecten. Deze maken het nagenoeg onmogelijk om de 4.5:1 contrastregel voor tekst te halen.
2. **Let op de 60-30-10 regel:** Kies een voorbeeld met veel wit/lichtgrijs (of donkergrijs voor dark mode) als basis (60%), een duidelijke secundaire kleur voor panelen/cards (30%), en één felle accentkleur voor je actieve knoppen en grafieken (10%).

Welke van deze twee richtingen (media of IoT hardware) spreekt je het meeste aan om in Figma vanaf nul op te bouwen?