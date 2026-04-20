

## Plan: Desktop-Layout der App-Hero vereinfachen

In `src/routes/confirmation.tsx` (Zone 2, App-Hero) die rechte Spalte mit Smartphone-Icon und QR-Code auf Desktop entfernen. Der gesamte Inhalt rückt in eine einzelne, mittig zentrierte Spalte.

### Änderungen

**Grid-Layout entfernen** (~Zeile 154)
- `grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-center` → einfacher Block, mittig zentriert: `mx-auto max-w-2xl text-center` (oder `text-left` falls Inhalte linksbündig bleiben sollen — empfohlen: **mittig zentriert**, da User explizit "alles mittig zentriert" geschrieben hat).

**Linke Spalte umbauen** (~Zeile 155)
- Wrapper `lg:col-span-3` entfällt.
- Inhalte zentrieren: Badge, Headline, Beschreibung, Warnhinweis-Box, Feature-Liste und Download-Button bekommen `mx-auto` bzw. `text-center` / `justify-center` wo nötig.
- Feature-Liste (`<ul>`): `items-center` statt linksbündig, Liste selbst `inline-block` oder `mx-auto w-fit` damit Bullets zentriert wirken aber linksbündig lesbar bleiben.
- Download-Button: bleibt `w-full sm:w-auto`, durch `mx-auto` zentriert.
- Warnhinweis-Box (`Ohne Bestätigung...`): `max-w-md mx-auto`.

**Rechte Spalte komplett entfernen** (~Zeilen mit Smartphone + QR-Code Block)
- Den gesamten `<div className="hidden lg:col-span-2 lg:flex ...">`-Block löschen (Smartphone-Icon, QR-Code, Label "Jetzt scannen & herunterladen").

**Imports bereinigen**
- `Smartphone` und `QrCode` aus `lucide-react`-Import entfernen (werden nicht mehr verwendet).

### Geänderte Datei
- `src/routes/confirmation.tsx`

