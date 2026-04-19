

## Plan: TrustPanel — Animation, nur Firmenname, zackiger Stern

### Änderungen in `src/components/checkout/TrustPanel.tsx`

**1. Footer-Zeile auf nur Firmenname**
- `„NovaShop GmbH · Seit 2018 · Made in Germany"` → nur `NovaShop GmbH`.
- Trennpunkte (`·`) und Zusatztexte komplett raus.

**2. Sterne-Lade-Animation (sequenziell)**
- Aktuell: alle 5 Sterne nutzen `animate-count-up` mit Delay → fade-in von unten.
- Neu: Pop-/Scale-Effekt, sequenziell von links nach rechts, deutlich sichtbarer.
- Neue Keyframe in `src/styles.css`: `star-pop` — von `scale(0) rotate(-30deg) opacity:0` → kurz `scale(1.3)` → `scale(1) rotate(0) opacity:1` (cubic-bezier mit leichtem Overshoot).
- Utility `.animate-star-pop { animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }`.
- Im Panel: `animate-count-up` der 5 Sterne ersetzen durch `animate-star-pop`, Delays auf `i * 120ms` erhöhen für deutlicheres Sequenzing.
- Die Zahl `4,9 / 5` bekommt zusätzlich Delay `~700ms` (nach letztem Stern) mit `animate-fade-in`.
- Die Kunden-Zeile "Über 12.487..." Delay `~850ms`.

**3. Zackigerer Stern (Icon)**
- Lucide `Star` ist relativ rund/weich. Ersetzen durch `Sparkle` oder besser: eigenes spitzes 5-Zack-SVG inline, mit längeren Spitzen und schmalerem Body.
- Pragmatischer Weg: Lucide `Star` behalten, aber `strokeWidth={1}` + `className` mit `[clip-path]` ist zu fragil → stattdessen inline-SVG für ALLE 6 Sterne (großer Container-Stern + 5 Bewertungssterne) mit einem schärferen Pfad (klassischer 5-Zack mit tiefen Einkerbungen, z.B. innerer Radius ~0.38 statt Lucides ~0.5).
- Als kleines wiederverwendbares `SharpStar`-SVG-Komponente oben in der Datei definieren, gleiche `className`-API wie Lucide-Icon.

### Geänderte Dateien
- `src/components/checkout/TrustPanel.tsx` — Footer-Text, SharpStar-Komponente, neue Animation-Klassen + Delays
- `src/styles.css` — neue Keyframe `star-pop` + Utility `.animate-star-pop`

