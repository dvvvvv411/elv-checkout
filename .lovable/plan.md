

## Plan

### 1. Zurück-Button + Progress-Steps verschieben
- Aus `CheckoutHeader.tsx` entfernen: den `← Zurück` Button und die `Warenkorb › Informationen › Versand › Zahlung` Navigation. Header behält nur Logo + Trust-Badges (SSL, Käuferschutz).
- Neue Komponente `src/components/checkout/CheckoutProgress.tsx` mit Zurück-Button (links) und Progress-Steps (rechts daneben oder darunter).
- In `src/routes/index.tsx` einbinden: direkt unter dem `<h1>Bestellung abschließen</h1>` Block und über dem 60/40-Grid — also über der linken Spalte mit `<CustomerForm />` (= über der Kontakt-Card). Volle Breite.

### 2. Moderne Font für Zahlen
- Tabular, moderne Schrift für alle Preiszahlen in `OrderSummary.tsx`: Bruttopreis, Versand, Rabatt, Nettobetrag, MwSt, Item-Preise und vor allem den großen Gesamtbetrag.
- Lösung: Google Font **JetBrains Mono** oder **Space Grotesk** einbinden — für Zahlen finde ich **Space Grotesk** modern und seriös, mit `font-feature-settings: "tnum"` für tabular figures damit die Spalten sauber ausgerichtet sind.
- Einbindung über `<link>` in `__root.tsx` head, dann in `src/styles.css` eine Utility `.font-numeric { font-family: 'Space Grotesk', ui-sans-serif; font-feature-settings: 'tnum' 1; font-variant-numeric: tabular-nums; }`.
- Klasse `font-numeric` an alle `formatEUR(...)` Spans in `OrderSummary.tsx` hängen.

### Geänderte Dateien
- `src/components/checkout/CheckoutHeader.tsx` — Zurück + Steps entfernen
- `src/components/checkout/CheckoutProgress.tsx` — neu
- `src/routes/index.tsx` — `CheckoutProgress` einfügen, Font-Link in `__root.tsx` Head
- `src/routes/__root.tsx` — Google Fonts Link
- `src/styles.css` — `.font-numeric` Utility
- `src/components/checkout/OrderSummary.tsx` — `font-numeric` Klasse an Zahlen

