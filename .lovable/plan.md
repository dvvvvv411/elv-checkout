

## Plan: Staggered Fade-in von oben nach unten

Beim Laden der Seite sollen die Hauptbereiche nacheinander sanft von oben nach unten eingeblendet werden (Staggered Fade-in).

### Reihenfolge der Animation
1. `CheckoutHeader` (0ms)
2. `<h1>Bestellung abschließen</h1>` Block (80ms)
3. `CheckoutProgress` (160ms)
4. `CustomerForm` Sections — jede SectionCard mit eigenem Stagger (240ms, 320ms, 400ms, 480ms)
5. `OrderSummary` (240ms, parallel zur ersten Section)
6. Footer (600ms)

### Umsetzung

**1. Neue Keyframe-Animation in `src/styles.css`**
- Bestehende `fade-in` Animation nutzt `translateY(8px)` → leicht erhöhen auf `translateY(-12px)` damit es klarer "von oben" kommt. Da `fade-in` schon woanders genutzt wird: stattdessen neue Utility `animate-fade-in-down` mit `translateY(-16px)` → `0` und Dauer 0.6s `ease-out`.

**2. Stagger via inline `style={{ animationDelay: "..." }}`**
- An die zu animierenden Container die Klasse `animate-fade-in-down` und einen `style={{ animationDelay: "Xms", animationFillMode: "both" }}` hängen.

### Geänderte Dateien
- `src/styles.css` — neue Keyframe `fade-in-down` + Utility `.animate-fade-in-down`
- `src/routes/index.tsx` — Animation + Delays auf Header-Bereich, h1-Block, Progress, Footer-Wrapper
- `src/components/checkout/CustomerForm.tsx` — Wrapper jeder SectionCard mit gestaffelten Delays
- `src/components/checkout/OrderSummary.tsx` — Container mit Delay
- `src/components/checkout/CheckoutHeader.tsx` — leichter Fade-in oben

