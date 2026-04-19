

## Plan: Validation-Styling dezenter

Aktuell sind die Fehler-Indikatoren zu dominant (border-2 + ring-2 + bg-destructive/5 auf der ganzen Card). Ziel: weiterhin klar erkennbar, aber subtiler und visuell ruhiger.

### Änderungen

**1. `Field`-Komponente in `CustomerForm.tsx`**
- Input-Border: von `border-2` zurück auf normale `border` (1px) in Destructive-Farbe.
- Ring: von `ring-2 ring-destructive/30` auf `ring-1 ring-destructive/20` reduzieren — oder ganz entfernen, nur die rote Border belassen.
- Fehlertext und `AlertCircle` bleiben unverändert (sind bereits dezent).

**2. `SectionCard.tsx`**
- Border bei `hasError`: bleibt `border-destructive`, aber Border-Width wieder auf 1px (`border` statt `border-2`).
- Hintergrund-Tönung: von `bg-destructive/5` auf `bg-destructive/[0.02]` oder ganz entfernen — nur die rote Border + rotes Icon-Badge als Signal.
- Icon-Circle: bleibt `bg-destructive` (kleiner Akzent, nicht störend).

**Geänderte Dateien**
- `src/components/checkout/CustomerForm.tsx` (Field-Styling)
- `src/components/checkout/SectionCard.tsx` (Card-Styling)

