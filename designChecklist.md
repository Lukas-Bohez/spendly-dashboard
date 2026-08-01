Design checklist
Kleurgebruik
60-30-10 rule toepassen
Niet meer dan 2 hoofdkleuren 
Hoofdkleur overheerst niet maar wordt goed toegepast op elementen die zeker moeten opvallen
Hoofdkleur = accentkleur voor zaken die mogen/moeten opvallen: Buttons, labels, actieve items...
Hoofdkleur: niet te flets of te donker
Light mode of dark mode, niets er tussenin
System kleuren bv groen voor positief of rood voor negatief
Grijswaarden
Gebruik een grayscale van een tiental grijswaarden gaande van heel donker (zwart of bijna zwart) tot heel lichtgrijs
Steek een klein beetje saturation van de hoofdkleur in de grijswaarden
Gebruiken voor achtergrond - voorgrond, bv lichts grijze achtergrond + witte kaders
Borders: niet te hard, niet te zacht
Belangrijke tekst: donkerder
Meta tekst: lichter (niet te licht, zie contrast)
Contrast
Leestekst: minstens 4.5:1
UI elementen of meta tekst: minstens 3:0
Tekst op foto’s: oppassen voor contrast, eventueel gradient overlay op toepassen of text shadow
Typografie
font-family
Geen standaard lettertype op Windows of Mac.
Lettertype is geschikt voor UI:
Goed leesbaar op kleine schermen
hoge x-height
Geen serifs voor UI elementen, voor tekst of titels eventueel wel voor body copy
Geen display font voor body tekst
Geen 2 gelijkaardige sans-serifs door elkaar gebruiken
font-size
Font-size is niet te klein: 12px minimum, eventueel 10-11px uppercase
bv: 14px-16px voor gewone tekst, buttons, 12px voor kleine buttons, meta tekst
Consistentie: Geen 15 verschillende font-sizes op 1 scherm of
Consistentie over meerdere schermen. Geen nieuwe styles uitvinden per scherm
Gebruik waardes uit een modular scale voor de font-size
font-weight
Geen light (100, 200, 300) voor body tekst
Consistentie: Geen 7 verschillende font-weights
Line-height
Line-height is ok voor de leesbaarheid
Minstens 1.5 voor kleine tekst (1.4 kan ook nog)
Niet kleiner dan de font-size voor grote tekst
Gebaseerd op de baseline grid
Layout
Whitespace
Alles is afgelijnd op dezelfde afstand van de rand van het scherm
Genoeg witruimte overal, niets plakt tegen een rand
bv tekst in buttons
bv tekst in cards
When in doubt: add more whitespace
Consistent gebruik van dezelfde waarden gebaseerd op een baseline grid voor:
Witruimte tussen elementen verticaal en horzitontaal
Witruimte in elementen
line-height van elementen
grootte van icons
Groeperen
Elementen zijn duidelijk gegroepeerd door middel van whitespace
Groeperen van elementen: whitespace verkleinen
Scheiden van elementen: whitespace te vergroten
Indien nodig toevoegen van common ground
Cards
Borders
Hiërarchie
Juiste, duidelijke hiërarchie met behulp van:
font-size
font-weight
kleur
grootte/oppervlakte
positie
Icons
Monotoon
Alle icons uit dezelfde set
Met dezelfde pixel grid
Met dezelfde bounding box
Altijd SVG icons geen raster icons
Icons zijn op ware grootte (dus niet opgeblazen)
Design file
De design file heeft een nette, overzichtelijke layer structuur.
Alles is opgebouwd aan de hand van een duidelijke layout, guides en een baseline grid.
Alles zit zo veel mogelijk in Auto layouts.
Alle gebruikte text styles zitten in de local styles
Alle gebruikte kleuren zitten in de local styles of komen uit een library zoals Open color. Gebruik variables voor light-dark theme
Slim gebruik gemaakt van componenten en varianten
