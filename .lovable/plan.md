

## Plan: TrustPanel — weiß mit dezenten grünen Akzenten

Statt gelblich jetzt sehr helles Weiß mit subtilen grünen Akzenten (passend zum Primary-Grün der Seite).

### Änderungen in `src/components/checkout/TrustPanel.tsx`

**Hintergrund**
- `bg-[linear-gradient(...)]` (gelb) → `bg-white` mit ganz dezentem grünen Schimmer:
  `bg-[linear-gradient(135deg,#ffffff,oklch(0.99_0.015_160))]` (fast weiß, minimal grün rechts unten).

**Border**
- `border-amber-200/60` → `border-primary/20` (sehr dezenter grüner Rand).

**Star-Icon-Container (großes Quadrat links)**
- Zurück auf grünen Akzent: `bg-gradient-to-br from-amber-400 to-yellow-500` → `bg-gradient-primary` (nutzt das vorhandene grüne Primary-Gradient).
- Star-Icon bleibt weiß gefüllt → guter Kontrast auf grün.

**Sterne (Bewertung)**
- Bleiben gelb (`fill-yellow-400 text-yellow-400`) — Sterne sollen Sterne-Farbe behalten, das ist UX-Konvention.

**Trennpunkte im Footer**
- Bleiben wie sie sind (`opacity-50`).

### Geänderte Datei
- `src/components/checkout/TrustPanel.tsx`

