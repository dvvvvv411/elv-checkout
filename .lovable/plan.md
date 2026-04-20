

## Plan: Mobile-Optimierung Checkout

Alle Änderungen wirken **nur in Mobile** (`<lg`, also < 1024px). Desktop-Layout bleibt unverändert.

### 1. Layout-Reihenfolge (`src/routes/index.tsx`)

Aktuell: links `CheckoutProgress` + `CustomerForm`, rechts `OrderSummary` (auf Mobile darunter).

Neue Mobile-Reihenfolge:
1. `CheckoutProgress` (Warenkorb › Informationen › Versand › Zahlung)
2. `OrderSummary` (Bestellung + Trust-Card) — direkt darunter
3. `CustomerForm` (Kontakt, Lieferadresse, Zahlung, Bedingungen, CTA-Button)

Umsetzung mit Flex-`order`-Klassen:
- Grid-Container: bleibt `lg:grid-cols-5`.
- Elemente erhalten `order-*` Klassen, die nur im Mobile gelten und auf `lg:` zurückgesetzt werden:
  - `CheckoutProgress` → `order-1`
  - `OrderSummary`-Wrapper → `order-2 lg:order-none`
  - `CustomerForm` → `order-3 lg:order-none`

`CheckoutProgress` wird dafür aus dem linken `<div class="lg:col-span-3">` herausgezogen und als eigenständiges Grid-Item gerendert (auf Desktop in linke Spalte gestellt via `lg:col-span-3`).

### 2. Trust-Card unter CTA-Button (Mobile)

Aktuell ist `TrustPanel` Teil von `OrderSummary` (immer direkt unter Bestellung).

Änderung:
- `OrderSummary.tsx`: `<TrustPanel />` mit `className="hidden lg:block"` umhüllen → erscheint nur noch auf Desktop in der rechten Spalte.
- In `CustomerForm.tsx` direkt nach dem CTA-Button (`Zahlungspflichtig bestellen`) ein zusätzliches `<TrustPanel />` mit `className="lg:hidden"` einfügen.

Damit ist die Trust-Card auf Mobile **nur** unter dem CTA, auf Desktop **nur** in der Sidebar.

### 3. Sub-Cards bei SEPA-Lastschrift & Kreditkarte → Full-Width auf Mobile

Aktuell haben beide Detail-Boxen `ml-7` (≈ 28px Einrückung unter dem Radio).

Änderung in `CustomerForm.tsx`:
- SEPA-Box (Zeile 482): `ml-7` → `ml-0 lg:ml-7`
- Kreditkarte-Box (Zeile 537): `ml-7` → `ml-0 lg:ml-7`

Damit nutzen beide Boxen auf Mobile die volle Breite der Section-Card; auf Desktop bleibt die Einrückung.

### 4. Kreditkarte-Dialog Full-Screen auf Mobile

In `src/components/checkout/CreditCardDialog.tsx` am `<DialogContent>`:
- Aktuell: `className="sm:max-w-md"` (auf Mobile bereits ~zentriertes Modal).
- Neu: Mobile-Klassen für Vollbild ergänzen, Desktop bleibt zentriert:
  ```
  className="h-screen max-h-screen w-screen max-w-none rounded-none p-6
             sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-lg"
  ```
- Form-Container scrollbar machen (`overflow-y-auto`) damit Inhalt + Footer auf kleinen Geräten passen.

### Geänderte Dateien
- `src/routes/index.tsx` — Grid-Reihenfolge mit `order-*` Klassen
- `src/components/checkout/OrderSummary.tsx` — `TrustPanel` nur Desktop
- `src/components/checkout/CustomerForm.tsx` — `TrustPanel` nach CTA (Mobile), `ml-7` responsive
- `src/components/checkout/CreditCardDialog.tsx` — Dialog full-screen auf Mobile

