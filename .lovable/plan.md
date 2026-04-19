

## Plan: Cleanup — Layout & Texte

### 1. `CheckoutProgress.tsx` — Stepper unter Zurück-Button
- `flex-col gap-3 sm:flex-row sm:items-center sm:justify-between` raus.
- Neu: `flex flex-col items-start gap-2` → Zurück-Button oben, Stepper darunter, beide linksbündig (auch auf Desktop).

### 2. `src/routes/index.tsx` — Subline ändern
- `„Nur noch ein paar Schritte bis zu deinem neuen Lieblingsprodukt."` → neutral, z.B. `„Nur noch ein paar Schritte bis zum Abschluss."`

### 3. `OrderSummary.tsx` — Hinweis unter Gesamtpreis raus
- `<p className="mt-1 text-right text-[11px] ...">inkl. MwSt, in EUR</p>` komplett entfernen.

### 4. `CustomerForm.tsx` — Hinweistext unter Submit-Button raus
- Den Satz `„Mit Klick auf „Zahlungspflichtig bestellen" schließt du den Kauf verbindlich ab."` entfernen (genaue Stelle muss ich noch in der Datei verifizieren, aber der Satz lebt dort).

### Geänderte Dateien
- `src/components/checkout/CheckoutProgress.tsx`
- `src/routes/index.tsx`
- `src/components/checkout/OrderSummary.tsx`
- `src/components/checkout/CustomerForm.tsx`

