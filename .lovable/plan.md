

## Plan: `submit-order` Edge Function einbinden + dynamische Confirmation

Die Bestellung wird nach Submit an `submit-order` POSTed. Die `/confirmation`-Seite erhält die Order-Daten (Bestellnummer, App-Download-Link) sowie alle eingegebenen Customer/Address/Payment-Daten und stellt sie dynamisch dar. Token wird **nicht mehr** an Confirmation weitergegeben (Token ist nach Submit verbraucht → 410-Fehler beim erneuten Fetch).

### 1. API-Layer

**Neu: `src/lib/checkout-api.ts`**
- `submitOrder(payload): Promise<SubmitOrderResponse>` — POST an `https://jpielhyfzzznicvcanci.supabase.co/functions/v1/submit-order`, JSON body, kein Auth-Header.
- Fehler-Mapping analog zu `use-checkout-session.ts`: 400 → "Validierung fehlgeschlagen" (mit `details`), 404 → "Sitzung nicht gefunden", 410 → "Sitzung bereits verwendet", 405/500 → "Serverfehler".
- Wirft `Error` mit lesbarer Message bei Non-2xx; gibt `{ success, order_number, app_download_url }` zurück.

**Neu in `src/lib/checkout-types.ts`**: Typen `SubmitOrderRequest`, `SubmitOrderResponse`, `OrderConfirmationData` (= submitted Daten + Response, für Übergabe an Confirmation-Page).

### 2. CustomerForm: echter Submit

`src/components/checkout/CustomerForm.tsx`
- `onSubmit` umbauen:
  - Token aus Context lesen → wenn fehlt: Toast-Error "Kein Checkout-Token", abbrechen.
  - Payload mappen:
    - `customer`: `email`, `company` (von `shipCompany`, leer → `null`), `first_name` = `shipFirstName`, `last_name` = `shipLastName`, `phone` = `shipPhone`.
    - `billing`: wenn `billingSame` → `{ street: shipStreet, postal_code: shipZip, city: shipCity }`; sonst aus `bill*`-Feldern.
    - `shipping`: wenn `billingSame` → `null`; sonst Lieferadresse aus `ship*`-Feldern (mit `company`, `first_name`, `last_name`, `street`, `postal_code`, `city`).
    - `payment_method`: `"sepa"` (für `lastschrift`) oder `"card"` (für `kreditkarte`).
    - `payment_data`: SEPA → `{ sepa: { account_holder, iban: iban.replace(/\s+/g,'') } }`. Card → `{ card: { cardholder_name, card_number, expiry, cvv } }` aus `cardData` (Felder werden im `CreditCardDialog` schon erfasst — siehe Punkt 3).
  - `submitOrder()` aufrufen, bei Erfolg → `sessionStorage`-Schlüssel `checkout:lastOrder` mit `OrderConfirmationData` (eingegebene Customer/Adress/Payment-Anzeigewerte + `order_number` + `app_download_url` + Snapshot von `products`/`totals`/`branding`) befüllen, dann `navigate({ to: "/confirmation" })` (ohne Token).
  - Fehlerfall: Toast `toast.error(message)`, Submit-Button wieder aktivieren.

### 3. CreditCardDialog: vollständige Karten-Daten zurückgeben

`src/components/checkout/CreditCardDialog.tsx`
- `SavedCardData` um `card_number` (raw, ohne Leerzeichen) und `cvv` erweitern (für API-Submit zwingend).
- `onSave` liefert die zusätzlichen Felder mit (intern bereits vorhanden, müssen nur durchgereicht werden).
- Hinweis (technisch): rohe Kartendaten im Memory sind bewusst — der Endpoint erwartet sie genau so. Keine Persistierung außerhalb von React-State.

### 4. Confirmation-Seite dynamisch

`src/routes/confirmation.tsx`
- `validateSearch`/`useCheckoutSession` **entfernen** — Daten kommen jetzt aus `sessionStorage["checkout:lastOrder"]`.
- Beim Mount: `useEffect` liest `sessionStorage`, parsed JSON, setzt State. Schlüssel danach **nicht** löschen (Reload soll funktionieren).
- Wenn keine Daten gefunden → Empty-State-Card "Keine Bestelldaten gefunden — bitte starte eine neue Bestellung." (kein Crash).
- Dynamisch ersetzen:
  - **MOCK_EMAIL** → `order.customer.email`.
  - **orderNumber** (aktuell zufällig generiert) → `order.order_number` aus API-Response.
  - **MOCK_ADDRESS** in der Lieferadress-Collapsible → echte Daten: wenn `shipping` gesendet wurde, diese; sonst `billing` + Customer-Name als Lieferadresse. Anzeige: Name (+ Firma falls vorhanden), Straße, PLZ + Stadt, "Deutschland".
  - **Zahlungsart-Collapsible**: SEPA → `IBAN: DE•• •••• <last4>` aus `iban`. Card → `<Brand> · •••• <last4>`.
  - **App-Download-Button** (Zone 2): `href` = `order.app_download_url`. Wenn `null`: gesamte App-Hero-Section ausblenden (Backend hat keinen Link hinterlegt → kein Download-Block). Bestellungs-Erfolg + Stepper + Bestelldetails bleiben.
  - **Branding** (`companyName`, Header-Logo): aus dem in `sessionStorage` gespeicherten `branding`-Snapshot — `CheckoutSessionProvider` mit der gespeicherten Session umhüllen, damit `CheckoutHeader` und `TrustPanel` weiter funktionieren.
  - **Items / Pricing / VAT**: aus gespeichertem Session-Snapshot (gleiche Berechnungen wie bisher).
- "Rechnung als PDF" + "Liefertermin wählen" Buttons bleiben als nicht-funktionale Demo-Buttons.

### 5. Checkout-Route

`src/routes/checkout.tsx`
- Keine Änderung nötig (Token-Handling für Submit liegt in CustomerForm).

### Geänderte / neue Dateien

**Neu:**
- `src/lib/checkout-api.ts` — `submitOrder()` Fetch-Wrapper + Fehler-Mapping.

**Bearbeitet:**
- `src/lib/checkout-types.ts` — `SubmitOrderRequest`, `SubmitOrderResponse`, `OrderConfirmationData`.
- `src/components/checkout/CustomerForm.tsx` — echter API-Call, Payload-Mapping, sessionStorage-Übergabe, Navigate ohne Token.
- `src/components/checkout/CreditCardDialog.tsx` — `SavedCardData` um `card_number` + `cvv` erweitern.
- `src/routes/confirmation.tsx` — sessionStorage-Lesen, dynamische Adresse/Email/Zahlung/Bestellnr/App-Link, conditional App-Hero.

### Hinweise (technisch)

- `sessionStorage` (nicht `localStorage`): Daten verschwinden mit dem Tab → keine Datenleichen zwischen Sessions.
- Token wird bewusst nicht zur Confirmation mitgegeben: nach `submit-order` ist er verbraucht (410). Branding/Items werden aus dem zum Submit-Zeitpunkt gespeicherten Snapshot bedient.
- IBAN wird vor Submit von Leerzeichen befreit (Server normalisiert zwar — wir senden trotzdem sauber).
- `shipping: null` wird **explizit** gesendet, wenn `billingSame`.
- `app_download_url`-Check: Vor jeglicher Anzeige `if (order.app_download_url)` prüfen — bei `null` wird die ganze Aktions-Sektion ausgeblendet.
- Card-Daten werden nur im React-State gehalten und bei Submit direkt an die API gegeben — keine Persistierung in Storage.

