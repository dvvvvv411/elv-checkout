

## Plan: "Aktion erforderlich"-Badge optisch aufwerten (gelb/amber statt rot)

Das Badge ist aktuell knallrot (`bg-destructive`) und wirkt aggressiv + farblich unpassend zum Primary-Gradient. Stattdessen ein warmes **Amber/Gelb** verwenden — signalisiert weiterhin "Achtung", harmoniert aber besser mit dem Hero-Gradient und sieht hochwertiger aus.

### Änderungen in `src/routes/confirmation.tsx` (Badge in Zone 2, ca. Zeile 158–168)

**Farbpalette umstellen auf Amber/Gelb**
- Hintergrund: `bg-destructive` → `bg-amber-400` (warmes, helles Gelb mit gutem Kontrast auf dem Primary-Gradient).
- Textfarbe: `text-destructive-foreground` → `text-amber-950` (sehr dunkles Braun) für maximale Lesbarkeit auf gelbem Grund.
- Schatten: `shadow-destructive/40` → `shadow-amber-400/50`.

**Optik aufwerten (weniger "Sticker", mehr "Premium-Chip")**
- Pulsing-Dot links: `bg-primary-foreground` → `bg-amber-950` (passt zur dunklen Schrift, wirkt stimmiger).
- Ring: `ring-2 ring-primary-foreground/60` → dezenter `ring-1 ring-amber-950/20` (weniger laut, edler).
- Icon: `AlertCircle` durch `Bell` oder `Zap` ersetzen — wirkt weniger "Fehler" und mehr "wichtige Info"; alternativ `AlertCircle` behalten in `text-amber-950`.
- Padding minimal anpassen: `px-3.5 py-1.5` → `px-3 py-1.5` (kompakter, eleganter).
- Schrift: `text-xs font-bold uppercase tracking-wider` bleibt — passt.
- `animate-trust-pulse` bleibt für sanftes Atmen.

**Zusätzlicher Glow-Effekt** (optional, dezent)
- Subtiler äußerer Glow per zweitem `shadow`: zusätzlich `shadow-lg` mit Amber-Tint, damit das Badge auf dem Gradient leicht "schwebt".

### Geänderte Datei
- `src/routes/confirmation.tsx` (nur das Badge-Element, ~10 Zeilen)

