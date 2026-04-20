

## Plan: Cards auf `/confirmation` entfernen

In `src/routes/confirmation.tsx` folgende Sektionen ersatzlos entfernen:

1. **"Was passiert als Nächstes?"** SectionCard (linke Spalte, ca. Zeilen 257–298) inkl. umschließendem animierten Wrapper.
2. **Hilfe-Sektion** (3-Spalten-Grid mit "Fragen zur Bestellung?", "Rückgabe & Umtausch", "Käuferschutz", ca. Zeilen 372–414).
3. **CTA-Banner** "Entdecke noch mehr bei NovaShop" inkl. "Weiter einkaufen"-Button (ca. Zeilen 416–438).

### Imports aufräumen
Nicht mehr verwendete Icons aus `lucide-react` entfernen: `Mail`, `Package` (falls nirgendwo sonst genutzt — `Package` bleibt für die Bestellübersicht-Überschrift), `FileText` (bleibt für PDF-Button), `ShieldCheck`, `RotateCcw`, `HelpCircle`, `ArrowRight`, `Clock` (bleibt für Mini-Stat). Auch `Link` aus `@tanstack/react-router` entfernen, falls nur im CTA-Banner verwendet.

Footer mit Copyright bleibt erhalten.

### Geänderte Datei
- `src/routes/confirmation.tsx`

