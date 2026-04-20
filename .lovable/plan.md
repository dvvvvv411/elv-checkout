

## Plan: Produktbeschreibung in OrderSummary entfernen

In `src/components/checkout/OrderSummary.tsx`:

- Die Zeile mit `item.variant` (z.B. "Mitternachtsschwarz", "2m, geflochten") aus der Produktliste entfernen.
- Nur noch der Produkttitel (`item.name`) wird unter "Deine Bestellung" angezeigt.

### Geänderte Datei
- `src/components/checkout/OrderSummary.tsx`

