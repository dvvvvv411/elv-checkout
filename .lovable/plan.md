

## Plan: TrustPanel überarbeiten

### Änderungen in `src/components/checkout/TrustPanel.tsx`

**1. Trust-Icons entfernen**
- Die 4er-Grid mit `Lock / ShieldCheck / Truck / RotateCcw` komplett raus (sind im Header schon als Badges + werden weiter unten in den Bedingungen abgedeckt).
- Auch der untere "Sichere Verbindung aktiv" Live-Indicator raus → ist redundant zum Header.

**2. Was bleibt + neu**
- **Bewertungsblock** (Sterne + 4,9/5 + "Über 12.487 zufriedene Kunden") bleibt als Hauptinhalt.
- **Neu:** dezenter Unternehmensname unter der Bewertung, z.B. kleine Zeile:  
  `„NovaShop GmbH · Seit 2018 · Made in Germany"` in `text-[11px] text-muted-foreground` mit kleinem Trennpunkt.

**3. Hintergrundfarbe gelblich statt grün**
- Aktuell: `bg-gradient-soft` (nutzt grünliche Töne aus dem Primary-Farbsystem).
- Neu: warmer, sehr dezenter gelblicher Verlauf direkt inline via Tailwind arbitrary values, z.B.  
  `bg-[linear-gradient(135deg,oklch(0.985_0.04_90),oklch(0.97_0.05_85))]`  
  → sehr helles Cream/Amber, passt zu den Sternen (yellow-400) und nimmt den grünen Eindruck raus.
- Border ebenfalls leicht wärmer: `border-amber-200/60` statt `border-border`.
- Star-Icon-Container (das große Quadrat links): von `bg-gradient-primary` (grün) auf `bg-gradient-to-br from-amber-400 to-yellow-500` umstellen, damit es zum neuen Look passt.

### Geänderte Datei
- `src/components/checkout/TrustPanel.tsx`

