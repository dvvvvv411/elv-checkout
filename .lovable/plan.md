

## Plan: "Aktion erforderlich"-Badge auffälliger machen

Das Badge geht aktuell auf dem Gradient-Hintergrund unter, weil es zu zurückhaltend gestaltet ist (semi-transparent, dünner Ring, kleine Schrift).

### Änderungen in `src/routes/confirmation.tsx` (Zone-2 App-Hero)

**Badge-Styling deutlich verstärken**
- Hintergrund: von `bg-destructive/30` (transparent, geht unter) → **solides `bg-destructive` mit `text-destructive-foreground`** für maximalen Kontrast zum Primary-Gradient.
- Padding größer: `px-3 py-1` → `px-3.5 py-1.5`.
- Schrift größer + lesbarer: `text-[11px]` → `text-xs`, bleibt `font-bold uppercase tracking-wider`.
- Icon größer: `h-3.5 w-3.5` → `h-4 w-4`.
- Stärkerer Schatten für "Pop"-Effekt: `shadow-lg shadow-destructive/40`.
- Ring entfernen (nicht mehr nötig bei solidem Hintergrund) oder durch weißen Akzent-Ring ersetzen: `ring-2 ring-primary-foreground/60`.
- Pulsierende Animation bleibt (`animate-trust-pulse`), zusätzlich kleiner Glow per `before:` Pseudo-Element optional — pragmatisch: einfach den Schatten pulsieren lassen reicht.
- Pulsing-Dot davor (NEU): kleiner `h-2 w-2 rounded-full bg-primary-foreground animate-pulse` Punkt links vom Icon als zusätzlicher Eyecatcher.

**Ergebnis**: Badge wird zu einem echten knallroten "Alert"-Chip, der sofort ins Auge springt und sich klar vom blauen/lila Gradient abhebt.

### Geänderte Datei
- `src/routes/confirmation.tsx` (nur das Badge-Element in Zone 2, ca. Zeile 158–166)

