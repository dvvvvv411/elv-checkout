

## Plan: Kartennummer auf max. 16 Ziffern begrenzen

In `src/components/checkout/CreditCardDialog.tsx`:

### Änderungen

1. **`formatCardNumber` Helper** — `slice(0, 19)` → `slice(0, 16)`. Dadurch kappt das Eingabefeld hart bei 16 Ziffern (zeigt `1234 5678 9012 3456`).

2. **Zod-Schema** — Regex `^\d{13,19}$` → `^\d{1,16}$` mit Fehlermeldung "Kartennummer darf maximal 16 Ziffern haben". Damit ist 16 das Maximum, kürzere Eingaben werden weiterhin durch andere Validierungen abgefangen.

### Geänderte Datei
- `src/components/checkout/CreditCardDialog.tsx`

