

## Plan

### 1. Keine Zahlungsart vorausgewählt
- In `CustomerForm.tsx` `defaultValues.paymentMethod` von `"lastschrift"` auf `undefined` setzen.
- Zod-Schema: `paymentMethod` so anpassen, dass `undefined` erlaubt ist, aber beim Submit ein Fehler "Bitte Zahlungsart auswählen" erscheint (z.B. `z.enum([...]).optional()` + `superRefine`-Check).
- Logik für `iban`/`accountHolder`/`cardLinked`-Validierung bleibt — greift nur wenn jeweilige Methode gewählt ist.
- Die expandierten Detail-Bereiche (IBAN-Felder bzw. Kreditkarten-Button) erscheinen nur, wenn die jeweilige Option aktiv gewählt wurde — also initial gar nichts.

### 2. Grünen Hintergrund entfernen bei abweichender Rechnungsadresse + Zahlungs-Detailbereichen
Aktuell nutzen diese drei Container `bg-gradient-soft` (= grünlicher Verlauf, da Primärfarbe grün ist):
- Abweichende Rechnungsadresse Block
- SEPA-Lastschrift Detailbereich (IBAN + Kontoinhaber)
- Kreditkarte Detailbereich (Hinterlegen-Button)

Fix: `bg-gradient-soft` durch neutrales `bg-secondary/40` (oder `bg-muted/30`) ersetzen, gestrichelten Rand auf neutrales `border-border` statt `border-primary/30` setzen. So bleiben sie als "verschachtelter Bereich" erkennbar, aber farblich neutral.

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx`

