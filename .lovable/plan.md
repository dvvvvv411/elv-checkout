

## Plan: `/confirmation` von Edge Function laden, Bestellnummer in URL

Die Confirmation-Seite holt Daten künftig **immer** von der Edge Function `get-order-confirmation` per Bestellnummer aus der URL. `sessionStorage` entfällt komplett.

### 1. Neue Route mit URL-Parameter
- **Neue Datei:** `src/routes/confirmation.$orderNumber.tsx`
  - Liest `orderNumber` via `Route.useParams()`.
  - Übernimmt das gesamte UI (Hero, Stepper, Items, Pricing, Adressen, Zahlung, Actions, TrustPanel) aus der bisherigen `confirmation.tsx` — keine UI-Änderungen.
  - Datenquelle: TanStack Query (`useQuery`) → ruft `fetchOrderConfirmation(orderNumber)`.
  - Loading-State: zentrierter, moderner Spinner im gleichen Stil wie `/checkout` (volle Höhe, mittig).
  - Error-States:
    - **404 / „Bestellung nicht gefunden"** → freundliche Karte mit Link zur Startseite (analog zur aktuellen „Keine Bestelldaten"-Karte).
    - **Netzwerk / unbekannt** → Karte mit Retry-Button (`refetch`).

### 2. Stub-Route `src/routes/confirmation.tsx`
- Auf einen Hinweis-Stub reduzieren: „Keine Bestellnummer übergeben — bitte Direktlink aus deiner Bestätigungsmail nutzen" + Link zur Startseite.
- Kein `sessionStorage`-Lesen mehr.

### 3. Neue API-Layer-Datei
- **Neu:** `src/lib/order-api.ts`
  - `fetchOrderConfirmation(orderNumber: string): Promise<OrderConfirmationData>`
  - `GET https://jpielhyfzzznicvcanci.supabase.co/functions/v1/get-order-confirmation?order_number=…`
  - Keine Header.
  - Strukturierte Fehler: `{ kind: "not_found" | "invalid_input" | "network" | "unknown", message }` analog zu `checkout-api.ts`.
  - Validierung: `order_number` muss exakt 7 Ziffern sein (sonst `invalid_input` ohne Request).

### 4. Typ-Anpassung
- **`src/lib/checkout-types.ts`** — kleine Anpassungen am `OrderConfirmationData`-Typ:
  - `payment.card.brand` Werte erweitern: `"Visa" | "Mastercard" | "Amex" | "Discover" | "Unknown"` (Edge gibt Capitalized + zusätzliche Brands zurück).
  - `BRAND_LABELS`-Map in der neuen Confirmation-Route entsprechend anpassen (Keys auf neue Schreibweise, plus `Discover`, `Unknown`).

### 5. Submit-Flow im Checkout anpassen
- **`src/routes/checkout.tsx`**:
  - Nach erfolgreichem `submitOrder` statt `navigate({ to: "/confirmation" })` → `navigate({ to: "/confirmation/$orderNumber", params: { orderNumber: result.order_number } })`.
  - `sessionStorage.setItem("checkout:lastOrder", …)` entfernen — Single Source of Truth ist jetzt die Edge Function.

### 6. Cleanup
- Alle Referenzen auf `sessionStorage["checkout:lastOrder"]` entfernen (Checkout + alte Confirmation).
- `OrderConfirmationData`-Snapshot-Logik im Submit-Flow entfernen (wird nicht mehr gebaut).

### Geänderte / neue Dateien
- **Neu:** `src/routes/confirmation.$orderNumber.tsx` (Hauptseite mit Edge-Function-Fetch)
- **Neu:** `src/lib/order-api.ts` (Fetch + Fehler-Mapping + 7-Ziffern-Validierung)
- **Bearbeitet:** `src/routes/confirmation.tsx` (auf Hinweis-Stub reduziert)
- **Bearbeitet:** `src/routes/checkout.tsx` (Navigation mit `orderNumber`, kein sessionStorage mehr)
- **Bearbeitet:** `src/lib/checkout-types.ts` (Brand-Enum erweitern)

### Hinweise (technisch)
- TanStack Query ist bereits provided (laut `__root.tsx`-Setup in der tanstack-start-Doku) — `useQuery` direkt nutzbar.
- Keine Auth-Header für die Edge Function (public endpoint).
- `payment.card.brand` kommt jetzt capitalized („Visa" statt „visa") — `BRAND_LABELS`-Map entsprechend anpassen oder direkt als Anzeigewert nutzen (Mapping wird quasi überflüssig).
- `shipping` kann `null` sein (laut Doku: wenn Liefer = Rechnung) → bestehender Fallback in der UI (`deliveryAddress` aus `customer + billing`) bleibt erhalten und greift dann.

