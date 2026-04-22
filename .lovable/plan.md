

## Problem

`src/routes/confirmation.tsx` ist eine Layout-Route für `/confirmation/$orderNumber`, rendert aber statt `<Outlet />` direkt den Stub "Keine Bestellnummer übergeben". Dadurch wird die Kind-Route `confirmation.$orderNumber.tsx` (die den Supabase-Request macht) nie ausgeführt — egal ob die Bestellnummer in der URL steht.

URL `https://checkout.piana-heizoel.de/confirmation/6159494` matcht zwar die Kind-Route, aber das Layout rendert den Stub statt dem Outlet, also sieht der Kunde immer "Keine Bestellnummer übergeben".

## Fix

`src/routes/confirmation.tsx` so umbauen, dass:

1. Wenn die URL eine Bestellnummer enthält (`/confirmation/6159494`) → `<Outlet />` rendern → `confirmation.$orderNumber.tsx` lädt → ruft `fetchOrderConfirmation(orderNumber)` auf → zeigt die Confirmation-Daten.
2. Wenn nur `/confirmation` (ohne Nummer) aufgerufen wird → weiterhin den Stub zeigen.

### Geänderte Datei

- `src/routes/confirmation.tsx`

### Technische Umsetzung

```tsx
import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";

export const Route = createFileRoute("/confirmation")({
  head: () => ({ /* ... unverändert ... */ }),
  component: ConfirmationLayout,
});

function ConfirmationLayout() {
  const matches = useMatches();
  const hasOrderNumber = matches.some(
    (m) => m.routeId === "/confirmation/$orderNumber",
  );
  return hasOrderNumber ? <Outlet /> : <ConfirmationStub />;
}

function ConfirmationStub() {
  // bisheriger Stub-Inhalt unverändert
}
```

### Ergebnis

- `/confirmation/6159494` → Outlet rendert `confirmation.$orderNumber.tsx` → Hook holt `orderNumber` aus URL → ruft Supabase Edge Function `get-order-confirmation?order_number=6159494` auf → zeigt Bestelldetails (Kunde, Adresse, Zahlung, App-Download-Link).
- `/confirmation` (ohne Nummer) → zeigt weiterhin den freundlichen Stub.

Keine Änderungen an `confirmation.$orderNumber.tsx` oder `order-api.ts` nötig — die Logik dort ist bereits korrekt, sie wurde nur nie ausgeführt.

