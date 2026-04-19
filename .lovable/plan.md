

## Plan: Checkout-Verfeinerung

### 1. Farbsystem auf Grün umstellen (`src/styles.css`)
- Primär-Farbe von Indigo/Violett auf seriöses Grün ändern (z.B. `#059669` Emerald 600 → `#10B981` Emerald 500 als Gradient).
- `--primary`, `--gradient-primary`, `--shadow-glow`, `--ring` und `--trust` Tokens anpassen — Trust kann etwas dunkler/sattgrün bleiben für Differenzierung (z.B. Teal `#0D9488`).
- Destructive-Token bleibt rot, aber neuer Token `--destructive-soft` für rötlichen Card-Hintergrund bei Fehlern hinzufügen.

### 2. Section-Cards: Icons statt Zahlen (`SectionCard.tsx`)
- Prop `step` entfernen (oder ignorieren), den nummerierten Circle durch das `icon`-Prop in einem grünen Gradient-Circle ersetzen.
- In `CustomerForm.tsx` die `step={1..4}` Props entfernen.

### 3. Platzhaltertexte überarbeiten (`CustomerForm.tsx`, `OrderSummary.tsx`)
- `email`: `ihre@email.de`
- `shipFirstName`: `Vorname`, `shipLastName`: `Nachname`
- `shipPhone`: `Telefonnummer` (statt `+49 ...`)
- `shipStreet`: `Straße und Hausnummer`
- `shipZip`: `PLZ`, `shipCity`: `Stadt`
- `shipCompany`: `Firmenname` (Label sagt bereits "optional")
- Gleiche Logik für alle Bill-Felder
- `accountHolder`: `Kontoinhaber`, `iban`: `DE00 0000 0000 0000 0000 00` bleibt (fachlich sinnvoll)
- Rabattcode-Input: Platzhalter nur `Rabattcode`

### 4. Verbesserte Inline-Validierungs-UI
- In `Field`-Komponente: wenn `error` gesetzt ist:
  - Container bekommt eine rötliche Hintergrund-Tönung (`bg-destructive/5`) und linken Akzent-Border oder Ring.
  - Input bekommt rote Outline (`border-destructive ring-2 ring-destructive/20`) — via `aria-invalid` Attribut, das im Input-Style honoriert wird, oder per zusätzlicher Klasse die wir an `children` weitergeben (kleine Helper-Anpassung: Field rendert Wrapper mit data-invalid und CSS targetiert `[data-invalid] input`).
  - Fehlertext mit `AlertCircle`-Icon (Lucide) statt nur Text.
- Section-Card bekommt einen Modus, der bei mindestens einem Fehler in dieser Section einen rötlichen Rand und sanfte rote Tönung zeigt. Umsetzung: `SectionCard` erhält neue Prop `hasError?: boolean`. In `CustomerForm` berechnen wir pro Section, ob ein relevantes `errors.*`-Feld touched+invalid ist, und übergeben das.
- Validierungs-Mode bleibt `onBlur` (passt zur Anforderung "klickt rein und wieder raus"); zusätzlich `reValidateMode: "onChange"` damit Fehler beim Tippen verschwinden.

### 5. Header: Zurück-Button + Progress-Steps (`CheckoutHeader.tsx`)
- Linke Seite: `← Zurück` Button (ghost variant, navigiert mit `window.history.back()` oder Link zu `/`).
- Mittig (oder unter Logo-Reihe auf Mobile): Breadcrumb-artige Steps:
  ```
  Warenkorb  ›  Informationen  ›  Versand  ›  Zahlung
  ```
  - `Informationen` ist `font-bold text-primary`, andere Steps `text-muted-foreground`.
  - Trennzeichen `›` in muted Farbe.
- Trust-Badges (SSL, Käuferschutz) bleiben rechts.
- Layout: auf Desktop dreispaltig (Zurück | Steps zentriert | Trust); auf Mobile gestapelt.

### 6. Order-Summary Beschriftungen (`OrderSummary.tsx`)
- "Zwischensumme" → **"Bruttopreis"**
- "davon Netto" → **"Nettobetrag"**
- "davon MwSt (19 %)" → **"MwSt (19%)"** (ohne "davon", ohne Leerzeichen vor %)

### Dateien, die geändert werden
- `src/styles.css` — Farb-Tokens auf Grün
- `src/components/checkout/SectionCard.tsx` — Icon statt Nummer, hasError-State
- `src/components/checkout/CustomerForm.tsx` — Platzhalter, Field-Fehler-UI, Section-Fehler-Propagierung, step-Props entfernen
- `src/components/checkout/CheckoutHeader.tsx` — Zurück-Button + Progress-Steps
- `src/components/checkout/OrderSummary.tsx` — Rabattcode-Platzhalter, neue Beschriftungen

