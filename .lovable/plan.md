

## Plan: Sterne wieder schön + Footer-Layout fixen

### 1. Stern-Icon: zurück zu schöner Form
Die aktuelle `SharpStar` SVG hat zu tiefe Einkerbungen → wirkt krakelig/dünn. Lösung: Lucide `Star` wieder verwenden (klassische, saubere Sternform), aber mit `fill-current` für solide Optik.

- `SharpStar`-Komponente entfernen
- Wieder `import { Star } from "lucide-react"` 
- Bewertungssterne: `<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />`
- Großer Container-Stern: `<Star className="h-6 w-6 fill-white text-white" />`
- Animation (`animate-star-pop` mit Delays) BLEIBT — die war gut.

### 2. Footer „NovaShop GmbH" — Whitespace fixen
Aktuell: `mt-4 text-center` → riesiger Abstand + zentriert wirkt verloren.

Neu: Firmenname kompakter und rechts neben/unter der Bewertung integrieren statt als separater Footer.
- Variante: ganz weglassen aus dem Panel und stattdessen ans Ende von `OrderSummary` als kleine Zeile setzen → aber User wollte ihn ja im TrustPanel.
- Bessere Variante: Direkt unter "Über 12.487 zufriedene Kunden" als verifizierter Hinweis: `„– NovaShop GmbH"` in `text-[10px] text-muted-foreground/70 mt-1` — links ausgerichtet, kein extra `mt-4`-Block.
- Den separaten `<p className="mt-4 text-center ...">` Block komplett entfernen.

### Geänderte Datei
- `src/components/checkout/TrustPanel.tsx`

