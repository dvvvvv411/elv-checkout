

## Plan: Dynamischer Checkout via Supabase Edge Function

`/checkout` lädt Daten beim Mount via Token aus URL → Edge Function `get-checkout-session`. Branding (Firmenname, Logo, MwSt-Satz), Produkte, Versand und Gesamtbetrag kommen vom Backend. Netto/MwSt-€ werden client-seitig nur **angezeigt** (aus `total_amount` und `vat_rate`), nicht für Submit verwendet.

### 1. Datenflow & State

**Neuer Hook**: `src/hooks/use-checkout-session.ts`
- Liest `token` aus `window.location.search` (kein Router-Validator, da Token optional & einfach).
- `fetch("https://jpielhyfzzznicvcanci.supabase.co/functions/v1/get-checkout-session?token=" + token)`
- Returnt `{ data, loading, error }` mit typisiertem `CheckoutSession`.
- Fehlerstates: kein Token → `"missing_token"`, 400/404/410 → entsprechende Codes/Messages aus Response.

**Typen** (in `src/lib/checkout-types.ts`, neu):
```ts
type CheckoutSession = {
  branding: { company_name: string; logo_url: string | null; vat_rate: number };
  products: { name: string; gross_price: number; quantity: number }[];
  shipping_cost: number;
  total_amount: number;
  currency: string;
};
```

### 2. `src/routes/checkout.tsx` umbauen
- Hook `useCheckoutSession()` aufrufen.
- **Loading**: Skeleton-Layout (Header-Logo-Skeleton + zwei Karten-Skeletons via `Skeleton`-Komponente).
- **Error**: Volle Error-Card mit passender Message (`Token fehlt`, `Session nicht gefunden`, `Session bereits verwendet`, `Unbekannter Fehler`) + Hinweis Shop neu zu öffnen.
- **Success**: Session via React Context (`CheckoutSessionContext`, neu in `src/lib/checkout-session-context.tsx`) an `CheckoutHeader`, `OrderSummary`, `TrustPanel`, `CustomerForm` weitergeben.

### 3. `CheckoutHeader.tsx` dynamisch
- Wenn `logo_url` vorhanden: `<img src={logo_url} alt={company_name} className="h-8 w-auto object-contain">` statt `NovaShop`-Textlogo.
- Wenn `logo_url` null: Fallback = `company_name` als Textlogo (ohne Gradient-Span, neutral fett).
- Same für `/confirmation` (auch dort Hook nutzen falls Token weiter mitgegeben wird — siehe unten).

### 4. `OrderSummary.tsx` dynamisch
- `MOCK_ITEMS`, `VAT_RATE`, `SHIPPING_GROSS` entfernen.
- Items aus `session.products` rendern: `{quantity} × {name}` + `formatEUR(gross_price * quantity)`.
- Versand aus `session.shipping_cost` (0 → „Kostenlos", sonst formatiert).
- **Preisberechnung neu** in `src/lib/checkout-utils.ts`: Helferfunktion `breakdownFromTotal(totalGross, vatRate)` → `{ totalNet, totalVat }`. Subtotal = Summe Items, Total = `session.total_amount` (server-truth, **nicht** clientseitig neu summieren).
- Anzeige: Bruttobetrag (Subtotal Items), Versand, Nettobetrag, MwSt (`vat_rate * 100`%), Gesamt = `total_amount`.
- **Rabattcode-Block komplett entfernen** (Backend liefert keinen Discount → nicht mehr unterstützt in dieser Iteration).

### 5. `TrustPanel.tsx` dynamisch
- `– NovaShop GmbH` → `– {company_name}` aus Context.

### 6. `CustomerForm.tsx`
- Im `onSubmit` statt `setTimeout` später echtes Backend-Call vorbereitet — in dieser Iteration: bleibt Mock, aber `total_amount` aus Session wird im Toast angezeigt.
- Navigate zu `/confirmation` hängt Token mit dran: `navigate({ to: "/confirmation", search: { token } })` (damit Confirmation auch Branding hat).

### 7. `/confirmation` (analog, kürzer)
- `useCheckoutSession()` aufrufen, Header-Logo + Items + Preise + TrustPanel-Firmenname dynamisch.
- Fallback wenn kein Token: weiter mit „—"-Platzhaltern (kein harter Error, da Page nach Bestellung steht).
- `MOCK_ITEMS`/`VAT_RATE` raus, `App-Hero`-Block (Zone 2) bleibt unverändert (NovaShop-Text dort wird zu `{company_name}`).
- Stepper, Adresse-Mock, Zahlungs-Mock bleiben (kommen nicht von dieser Edge Function).

### 8. Meta-Tags
- Title in `checkout.tsx`/`confirmation.tsx`: `"Sicher zur Kasse"` bzw. `"Bestellbestätigung"` ohne Markenname (dynamischer Title via `useEffect` + `document.title` mit `company_name` nach Load).

### Geänderte / neue Dateien
**Neu**:
- `src/hooks/use-checkout-session.ts`
- `src/lib/checkout-types.ts`
- `src/lib/checkout-session-context.tsx`

**Bearbeitet**:
- `src/routes/checkout.tsx` (Loading/Error/Success-Wrapping, Provider)
- `src/routes/confirmation.tsx` (Provider, dynamische Werte, Mocks raus)
- `src/components/checkout/CheckoutHeader.tsx` (Logo dynamisch)
- `src/components/checkout/OrderSummary.tsx` (Items/Preise/Versand dynamisch, Rabatt raus)
- `src/components/checkout/TrustPanel.tsx` (Firmenname dynamisch)
- `src/components/checkout/CustomerForm.tsx` (Token an Confirmation weitergeben)
- `src/lib/checkout-utils.ts` (`breakdownFromTotal` Helfer)

### Hinweise (technisch)
- Edge Function ist öffentlich (keine Auth-Header) → einfacher `fetch`, keine Supabase-Client-Lib nötig.
- CORS muss serverseitig in der Edge Function konfiguriert sein (`Access-Control-Allow-Origin: *` o.ä.) — falls Fehler im Browser auftreten, liegt es dort, nicht am Frontend.
- Server-truth: `total_amount` wird unverändert angezeigt; `totalNet = total / (1 + vat_rate)`, `totalVat = total - totalNet` rein zur Anzeige.
- Logo-URL: `object-contain` + `max-h-10`, damit beliebige Seitenverhältnisse sauber im Header sitzen.

