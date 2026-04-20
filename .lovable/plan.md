

## Plan: Dringlichkeit in App-Download-Card erhöhen

In `src/routes/confirmation.tsx` die Zone-2 App-Hero-Section umbauen, damit klar wird: **App-Download ist Pflicht, nicht optional** — ohne App keine Lieferung.

### Inhaltliche Änderungen

**Eyebrow-Badge** (oben links)
- Vorher: "Nächster Schritt" (neutral, freundlich)
- Nachher: "Aktion erforderlich" mit `AlertCircle`-Icon statt `Sparkles`
- Farblich auffälliger: Badge-Hintergrund auf warnenden Akzent (z. B. `bg-destructive/20` mit `text-destructive-foreground` oder gelb-orange Glow), pulsierende Animation (`animate-trust-pulse`)

**Headline**
- Vorher: "Wähle deinen Wunsch-Liefertermin in der App"
- Nachher: "Lade die App, um deinen Liefertermin zu bestätigen"
- Bleibt groß und fett, gleiche Größenklassen

**Subline (klare Dringlichkeit)**
- Vorher: "Lade die NovaShop App, um deinen Liefertermin flexibel zu wählen, Pakete in Echtzeit zu verfolgen und exklusive Vorteile zu erhalten."
- Nachher: "**Deine Bestellung wird erst versendet, sobald du den Liefertermin in der App bestätigt hast.** Lade jetzt die NovaShop App herunter, um fortzufahren."
- Erste Hälfte fett (`font-semibold`) für visuelle Betonung

**Hinweis-Box (NEU)** — direkt unter Subline, vor Feature-Liste
- Kleine Inline-Box mit Warn-Look: `bg-primary-foreground/10 border border-primary-foreground/30 rounded-xl p-3`
- Icon: `AlertCircle` oder `Clock` (klein)
- Text: "Ohne Bestätigung in der App kann deine Bestellung nicht zugestellt werden."

**Feature-Liste umformulieren** (von "nice-to-have" zu "was du tun musst")
- "Liefertermin frei wählen" → "Liefertermin in der App bestätigen"
- "Live-Sendungsverfolgung" → "Sendung live verfolgen"
- "Exklusive App-Rabatte" → "Bonus: Exklusive App-Rabatte sichern"

**Store-Buttons**
- Bleiben optisch gleich, aber kleines "Jetzt herunterladen" als visueller Akzent darüber im Section-Header denkbar — alternativ Buttons unverändert lassen, da bereits prominent.

### Visuelle Akzente für Dringlichkeit
- Border der Card verstärken: `border-2 border-primary/30` → `border-2 border-primary-foreground/40` mit zusätzlich subtiler `ring-2 ring-primary/20 ring-offset-2 ring-offset-background` für "wichtig"-Look
- QR-Code-Block (Desktop): Label "Mit Kamera scannen" → "Jetzt scannen & herunterladen"

### Imports
- Neu: `AlertCircle` aus `lucide-react`
- Entfernen: `Sparkles` (durch `AlertCircle` ersetzt)

### Geänderte Datei
- `src/routes/confirmation.tsx`

