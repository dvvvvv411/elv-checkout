

## Plan: `/confirmation` Bestellbestätigungsseite

Neue Route nach erfolgreichem Checkout. Selber Look & Feel wie der Checkout (Cards, Gradient-Icons, Trust-Elemente, Animationen, deutsche Sprache, EUR-Formatierung).

### Navigation aus dem Checkout
- `src/components/checkout/CustomerForm.tsx`: Nach `await … setTimeout` per `useNavigate({ to: "/confirmation" })` weiterleiten (statt nur Toast). Toast bleibt als kurzes Feedback.

### Neue Datei: `src/routes/confirmation.tsx`

Struktur (alles innerhalb `max-w-7xl` Layout, gleicher Header `<CheckoutHeader />` + Footer wie index):

**1. Hero / Erfolgsbanner (full width)**
- Gradient-Card (`bg-gradient-primary` Akzent) mit großem animierten Check-Icon (`CheckCircle2`, `animate-star-pop`).
- Überschrift "Vielen Dank für deine Bestellung!" + Untertitel mit Bestellnummer (Mock: `NS-2026-XXXXXX`) und E-Mail-Hinweis ("Bestätigung an … gesendet").
- Zwei Mini-Stats: Bestelldatum, voraussichtliche Lieferung (heute + 3 Werktage).

**2. Grid 2-spaltig (lg), 1-spaltig mobile**

Linke Spalte (lg:col-span-3):
- **Lieferstatus-Card** mit horizontalem Stepper: `Bestellung eingegangen` ✓ → `In Bearbeitung` (aktiv, pulsierender Punkt) → `Versendet` → `Zugestellt`. Fortschrittslinie mit `bg-gradient-primary` bis zum aktiven Step.
- **Lieferadresse-Card** (Truck-Icon): Mock-Adresse formatiert + "Standard-Versand DHL · 0,00 €".
- **Zahlungsart-Card** (CreditCard-Icon): "SEPA-Lastschrift · DE•• •••• •••• •••• 1234" oder "Visa •••• 4242", Mandat-Hinweis.
- **Was passiert als Nächstes?** Card mit 3 Schritten (Mail-Icon → Package-Icon → Truck-Icon), kurz erklärt.

Rechte Spalte sticky (lg:col-span-2):
- **Bestellübersicht-Card** (gleiche Mock-Items wie `OrderSummary`, gleiche Preisaufschlüsselung via `calculatePrices`, `formatEUR`).
- **TrustPanel** darunter.
- **Aktions-Buttons**: "Rechnung als PDF herunterladen" (outline, FileText-Icon, nur visuell), "Bestellung verfolgen" (primary).

**3. Hilfe-Sektion (full width unten)**
- 3-Spalten-Grid mit Cards: "Fragen zur Bestellung?" (Mail-Link), "Rückgabe & Umtausch" (30 Tage Hinweis), "Käuferschutz" (ShieldCheck).

**4. CTA-Banner**
- Card mit Gradient: "Weiter einkaufen" Button → `Link to="/"`.

### Mock-Daten
Inline im Route-File, gleiche Items wie `OrderSummary` (Wireless Kopfhörer + USB-C Kabel), gleicher VAT (19%). Bestellnummer per `useMemo` zufällig generiert beim Mount.

### Styling-Konsistenz
- `SectionCard` wiederverwenden für alle Detail-Cards.
- Animationen: `animate-fade-in-down` mit gestaffelten `animationDelay` (80/160/240/320ms) wie auf index.
- Tokens: `bg-gradient-primary`, `text-gradient-primary`, `shadow-card`, `text-trust`, `font-numeric`.

### Route-Konfiguration
```tsx
export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Bestellbestätigung — NovaShop" },
      { name: "description", content: "Deine Bestellung wurde erfolgreich aufgegeben." },
      { property: "og:title", content: "Bestellbestätigung — NovaShop" },
      { property: "og:description", content: "Vielen Dank für deinen Einkauf bei NovaShop." },
    ],
  }),
  component: ConfirmationPage,
});
```

### Geänderte / neue Dateien
- **Neu**: `src/routes/confirmation.tsx`
- **Edit**: `src/components/checkout/CustomerForm.tsx` — `useNavigate` Import + Redirect nach Submit.

