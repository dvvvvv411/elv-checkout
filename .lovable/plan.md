

## Plan: Trustpilot-Stern als großes Icon im TrustPanel

Den großen Lucide-`Star` im grünen Quadrat ersetzen durch das hochgeladene Trustpilot-Stern-SVG (5-Zack mit charakteristischer Einkerbung unten rechts), in Weiß.

### Schritte
1. Hochgeladenes Bild als SVG-Komponente nachbauen (inline im File, kein Asset-Import nötig — ist eine simple Polygon-Form). Komponente `TrustStar` mit `className`-Prop.
2. In `TrustPanel.tsx` nur den **großen** Stern (h-6 w-6 im grünen Container) auf `<TrustStar className="h-7 w-7 text-white" />` umstellen, `fill="currentColor"`.
3. Die 5 Bewertungssterne darunter bleiben Lucide `Star` gelb (unverändert).

### Geänderte Datei
- `src/components/checkout/TrustPanel.tsx`

