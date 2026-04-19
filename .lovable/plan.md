
# Modern Checkout-Seite (60/40 Layout)

Eine konversionsoptimierte, vertrauensbildende Checkout-Seite im Stil von Shopify – modern, farbenfroh und seriös.

## Layout-Visualisierung

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]                                  🔒 SSL gesichert  ✓ Käuferschutz   │  ← Header (sticky, white/blur)
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────┐  │
│  │  LINKE SPALTE (60%)              │  │  RECHTE SPALTE (40%)           │  │
│  │                                  │  │  (sticky on scroll)            │  │
│  │  ① Kontakt                       │  │                                │  │
│  │  ┌────────────────────────────┐  │  │  📦 Deine Bestellung           │  │
│  │  │ E-Mail*                    │  │  │  ┌──────────────────────────┐  │  │
│  │  └────────────────────────────┘  │  │  │ [img] Produkt 1    49,99€│  │  │
│  │                                  │  │  │       Menge: 2           │  │  │
│  │  ② Lieferadresse 🚚              │  │  │ [img] Produkt 2    29,99€│  │  │
│  │  ┌────────────────────────────┐  │  │  └──────────────────────────┘  │  │
│  │  │ Firmenname (optional)      │  │  │                                │  │
│  │  └────────────────────────────┘  │  │  🎟️ Rabattcode                 │  │
│  │  ┌─────────────┐ ┌────────────┐  │  │  ┌──────────────┐ ┌────────┐  │  │
│  │  │ Vorname*    │ │ Nachname*  │  │  │  │ CODE         │ │Einlösen│  │  │
│  │  └─────────────┘ └────────────┘  │  │  └──────────────┘ └────────┘  │  │
│  │  ┌────────────────────────────┐  │  │                                │  │
│  │  │ Telefonnummer*             │  │  │  ─────────────────────────     │  │
│  │  └────────────────────────────┘  │  │  Zwischensumme       109,98 € │  │
│  │  ┌────────────────────────────┐  │  │  Versand             Kostenlos│  │
│  │  │ Straße und Hausnummer*     │  │  │  MwSt (19%)*          17,57 € │  │
│  │  └────────────────────────────┘  │  │  Netto                92,41 € │  │
│  │  ┌─────────┐ ┌──────────────┐    │  │  ─────────────────────────     │  │
│  │  │ PLZ*    │ │ Stadt*       │    │  │  GESAMT          109,98 € 🎯  │  │
│  │  └─────────┘ └──────────────┘    │  │                                │  │
│  │                                  │  │  ┌──────────────────────────┐  │  │
│  │  ☑ Rechnungsadresse identisch    │  │  │ ⭐⭐⭐⭐⭐  4.9/5         │  │  │
│  │     mit Lieferadresse            │  │  │ "Über 12.000 zufriedene  │  │  │
│  │                                  │  │  │  Kunden"                 │  │  │
│  │  [▼ Wenn deaktiviert: weitere    │  │  │                          │  │  │
│  │     Rechnungsadress-Felder       │  │  │ 🔒 SSL-Verschlüsselung   │  │  │
│  │     mit slide-down Animation]    │  │  │ 🛡️ Käuferschutz          │  │  │
│  │                                  │  │  │ 🚚 Schneller Versand     │  │  │
│  │  ③ Zahlungsart 💳                │  │  │ ↩️ 30 Tage Rückgabe      │  │  │
│  │  ┌────────────────────────────┐  │  │  │                          │  │  │
│  │  │ ⦿ Lastschrift              │  │  │  │ [animierter Trust-Pulse] │  │  │
│  │  │   ↓ Kontoinhaber, IBAN     │  │  │  └──────────────────────────┘  │  │
│  │  │ ○ Kreditkarte              │  │  │                                │  │
│  │  │   ↓ [Karte hinterlegen]    │  │  └────────────────────────────────┘  │
│  │  └────────────────────────────┘  │                                       │
│  │                                  │                                       │
│  │  ④ Bedingungen                   │                                       │
│  │  ┌────────────────────────────┐  │                                       │
│  │  │ ☐ Ich stimme den AGB &     │  │                                       │
│  │  │   Datenschutz zu           │  │                                       │
│  │  └────────────────────────────┘  │                                       │
│  │                                  │                                       │
│  │  ┌────────────────────────────┐  │                                       │
│  │  │  🔒 BESTELLUNG ABSCHICKEN  │  │  ← großer CTA, Gradient, Hover-Glow  │
│  │  └────────────────────────────┘  │                                       │
│  └──────────────────────────────────┘                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Design-System

- **Farben** (modern, bunt, seriös): Primär Indigo→Violett Gradient (`#6366F1 → #8B5CF6`), Akzent Smaragd `#10B981` für Success/Trust, sanfter Off-White Hintergrund `#FAFAFC`, Karten reines Weiß mit subtilem Shadow.
- **Typografie**: Inter (Body), große Headings für Sektionen.
- **Sektionen** als nummerierte Cards mit kleinem farbigen Circle-Badge (1, 2, 3, 4) – klare visuelle Schritte.
- **Inputs**: Floating Labels, abgerundet (radius-lg), Focus-Ring in Primary, sanfte Übergänge.
- **Animationen**: fade-in beim Laden, slide-down für Rechnungsadresse & Zahlungs-Details, hover-scale auf CTA, pulsierender Trust-Badge unten rechts.

## Funktionalität

1. **Form State** mit React Hook Form + Zod Validierung (Pflichtfelder, E-Mail, IBAN-Format, PLZ).
2. **Conditional Rendering**:
   - Checkbox "Rechnungsadresse identisch" → bei Deaktivierung: 6 zusätzliche Felder mit Slide-Animation.
   - Radio "Lastschrift" → IBAN + Kontoinhaber Felder.
   - Radio "Kreditkarte" → Mockup-Button "Kreditkarte hinterlegen".
3. **Bestellzusammenfassung** (rechts):
   - Mock-Produkte (2 Artikel) als Beispieldaten.
   - Rabattcode-Input mit "Einlösen"-Button (Mock-Validierung, z. B. `WILLKOMMEN10` = 10% Rabatt).
   - **Preisberechnung**: Eingaben sind Bruttopreis + MwSt-Satz (props/state, simuliert vom Backend, Default 19%). Netto = Brutto / (1 + Satz). MwSt = Brutto − Netto. Versand: Wert oder "Kostenlos" wenn 0.
   - Gesamtpreis hervorgehoben (groß, Gradient-Text).
4. **Trust-Element** unten rechts: Sterne-Bewertung (animiertes Einblenden), Kundenzahl-Counter, 4 Trust-Icons mit pulse-Animation, Live "🔒 Sichere Verbindung"-Indikator.
5. **Submit**: Validierung → Loading-State auf Button → Success-Toast (Sonner).

## Datei-Struktur

- `src/routes/index.tsx` — Checkout-Seite (Platzhalter ersetzen)
- `src/components/checkout/CheckoutHeader.tsx` — Logo + Trust-Badges
- `src/components/checkout/CustomerForm.tsx` — Linke Spalte (alle Formularsektionen)
- `src/components/checkout/OrderSummary.tsx` — Rechte Spalte (Bestellung, Rabatt, Kosten)
- `src/components/checkout/TrustPanel.tsx` — Animiertes Trust-Element
- `src/components/checkout/SectionCard.tsx` — Wiederverwendbare nummerierte Section-Card
- `src/lib/checkout-utils.ts` — Preisberechnung (Brutto/Netto/MwSt)
- `src/styles.css` — Farb-Tokens (Indigo/Violett/Emerald), Gradient-Utilities, Shadow-Tokens
- Head-Meta in `index.tsx`: Titel "Sicher zur Kasse", Description, og:title

## Responsive

- Desktop (≥1024px): 60/40 Grid, rechte Spalte sticky.
- Tablet/Mobile: Einspaltig — Bestellzusammenfassung als ausklappbares Akkordeon oben, Formular darunter, Sticky-CTA am unteren Rand.
