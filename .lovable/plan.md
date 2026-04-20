

## Plan: Produktbeschreibung entfernen + CTA-Button umbenennen

In `src/routes/confirmation.tsx` zwei kleine Anpassungen:

### 1. Produktvariante (Beschreibung) ausblenden
In der Items-Liste (Zone 3, ca. Zeile 304) die Zeile mit `item.variant` entfernen, sodass nur noch der Produkttitel (`item.name`) angezeigt wird. Die `variant`-Daten in `MOCK_ITEMS` bleiben unverändert (nicht stören) — nur das `<p>`-Element mit `truncate text-xs text-muted-foreground` wird gelöscht.

### 2. "Bestellung verfolgen" → "Liefertermin wählen"
Im Actions-Bereich (Zone 3 unten, ca. Zeile 396) den Button-Text von **"Bestellung verfolgen"** zu **"Liefertermin wählen"** ändern. Icon `Truck` durch `Calendar` (lucide-react) ersetzen, da es jetzt um Terminwahl geht — passt thematisch besser und unterstützt die Dringlichkeits-Story (App-Download → Liefertermin wählen).

### Imports
- **Neu**: `Calendar` aus `lucide-react`.
- `Truck` bleibt erhalten (wird noch im Stepper verwendet).

### Geänderte Datei
- `src/routes/confirmation.tsx`

