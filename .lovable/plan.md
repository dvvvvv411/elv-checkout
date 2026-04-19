

## Problem

Validation triggert nicht beim Blur eines leeren Pflichtfelds. Grund: `react-hook-form` validiert mit `mode: "onBlur"` zwar beim Verlassen, aber bei initial leeren Feldern, die noch nie "dirty" waren, kann der Zod-Resolver je nach Setup keinen Fehler-State pro Feld zeigen, bevor `handleSubmit` läuft. Außerdem wird `errors.xxx` erst gesetzt, wenn das Feld als "touched" markiert ist UND ein Validierungslauf passiert ist — beim Blur eines leeren Feldes passiert das aktuell offenbar nicht zuverlässig.

Zusätzlich: Selbst wenn der Fehler korrekt im State landet, wird die Card-Rötung über `hasError` gesteuert, das auf `errors.xxx` schaut — funktioniert also nur, wenn der Blur-Validation-Lauf wirklich greift.

## Fix

### 1. Validierung beim Blur erzwingen (`CustomerForm.tsx`)
- `mode: "onTouched"` statt `"onBlur"` verwenden — triggert Validierung beim ersten Blur und re-validiert dann bei jedem Change. Das ist exakt das gewünschte Verhalten ("reinklicken, rausklicken → rot").
- Zusätzlich `register("feldname", { onBlur: () => trigger("feldname") })` als Sicherheitsnetz für die Pflichtfelder, damit auch bei initial leeren Feldern garantiert validiert wird.
- `trigger` aus `useForm()` destrukturieren.

### 2. Field-Komponente: rote Outline + Icon + Fehlertext sicherstellen
- Aktuell macht `Field` das schon via `data-invalid` und CSS-Selektor `[&[data-invalid=true]_input]:border-destructive ...`. Das funktioniert — sobald der Fehler im State ist, greift es. Ich verifiziere und verstärke:
  - Border-Width auf `border-2` bei Fehler (statt 1px Standard) für deutlichere Sichtbarkeit.
  - Ring sichtbarer (`ring-2 ring-destructive/30`).
  - AlertCircle ist bereits drin — bleibt.

### 3. Card-Rötung sichtbarer (`SectionCard.tsx`)
- Verifizieren dass `hasError`-Pfad korrekt rötlichen Border + Hintergrund + rotes Icon-Badge zeigt. Falls die Tönung zu subtil ist, etwas verstärken (`border-destructive` + `bg-destructive/5`, Icon-Circle in `bg-destructive`).

### 4. Section-Error-Detection robuster
- Die `shippingHasError`-Berechnung in `CustomerForm` schaut nur auf `errors.*`. Das ist korrekt, sobald onTouched greift. Keine Änderung nötig — wird durch Fix #1 automatisch funktionieren.

### Geänderte Dateien
- `src/components/checkout/CustomerForm.tsx` — `mode: "onTouched"`, `trigger` nutzen, ggf. `onBlur`-Handler an Pflichtfelder hängen.
- `src/components/checkout/SectionCard.tsx` — Card-Fehler-Styling verstärken (falls nötig).
- Field-Inline-Komponente in `CustomerForm.tsx` — Border/Ring bei Fehler verstärken.

