

## Plan: Store-Buttons durch einen einzigen generischen Download-Button ersetzen

In `src/routes/confirmation.tsx` (Zone 2, App-Hero) die zwei Store-Buttons (App Store + Google Play) durch **einen** prominenten, generischen "App herunterladen"-Button ersetzen, der auf einen eigenen Server-Download zeigt.

### Änderungen in `src/routes/confirmation.tsx`

**Buttons-Container ersetzen** (~Zeilen 192–238)
- Beide `<a>`-Tags inkl. der App-Store- und Google-Play-SVGs komplett entfernen.
- Stattdessen **ein** Button:
  - Element: `<a href="#" download>` (Platzhalter-URL, später vom User mit echter Download-URL ersetzbar).
  - Styling: solides, kontraststarkes CTA — `bg-foreground text-background`, `rounded-xl`, `px-5 py-3`, `shadow-elegant`, Hover-Scale (`hover:scale-[1.02]`), `transition-transform`.
  - Volle Breite auf Mobile (`w-full`), auf Desktop kompakter (`sm:w-auto`).
  - Inhalt: `Download`-Icon (lucide) + Label **"App herunterladen"** + kleiner Sub-Text "Direkt von NovaShop".
  - Layout: `inline-flex items-center justify-center gap-3`.
- Container von `flex-col gap-2.5 sm:flex-row` → einfacher Block, da nur noch 1 Button.

**QR-Code-Block (Desktop, rechts)**
- Bleibt erhalten, Label kann unverändert bleiben ("Jetzt scannen & herunterladen") — passt weiterhin, da QR ebenfalls auf den eigenen Download-Link zeigen würde.

### Imports
- **Neu**: `Download` aus `lucide-react`.
- Keine Entfernungen nötig (Inline-SVGs verschwinden mit dem JSX).

### Geänderte Datei
- `src/routes/confirmation.tsx`

