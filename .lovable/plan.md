

## Plan: `/confirmation` mobile-first neu strukturieren — klarer roter Faden

Aktuell: 6+ separate Cards stapeln sich auf Mobile ohne Hierarchie (Erfolg → App-Hero → Lieferstatus → Adresse → Zahlung → Bestellübersicht → Trust). Das wirkt zusammengewürfelt.

Neue Idee: **Eine durchgehende Story in 3 klar getrennten Zonen**, mit reduzierten Card-Rändern auf Mobile und visuellen Verbindungen zwischen den Schritten.

### Neue Struktur (mobile-first)

```text
┌─────────────────────────────────┐
│ ZONE 1: Erfolg (kompakt)        │  ← schlanker, kein doppelter Stat-Block
│  ✓ Bestellung bestätigt         │
│  Bestellnr. + E-Mail inline     │
└─────────────────────────────────┘
            │ (vertikale Linie als roter Faden)
┌─────────────────────────────────┐
│ ZONE 2: APP-HERO (Hauptfokus)   │  ← bleibt prominent, etwas kompakter
│  Wähle Liefertermin in der App  │
│  [App Store] [Google Play]      │
└─────────────────────────────────┘
            │
┌─────────────────────────────────┐
│ ZONE 3: Deine Bestellung        │  ← EINE Card statt 4
│  ─ Status-Stepper (kompakt)     │
│  ─ Items-Liste                  │
│  ─ Preis-Summary                │
│  ─ Adresse (collapsible)        │
│  ─ Zahlung (collapsible)        │
│  [Rechnung PDF] [Verfolgen]     │
└─────────────────────────────────┘
            │
   TrustPanel (klein, am Ende)
   Footer
```

### Konkrete Änderungen in `src/routes/confirmation.tsx`

**Zone 1 — Erfolgsbanner verschlanken**
- Bestelldatum-Mini-Stat-Box entfernen (Datum nicht mehr nötig auf der Seite).
- Bestellnummer-Pill und E-Mail in den Subtitle integrieren statt separater Box.
- Padding auf Mobile reduzieren (`p-5 sm:p-8`).
- Großes Check-Icon etwas kleiner auf Mobile (`h-16 w-16 sm:h-20 sm:w-20`).

**Zone 2 — App-Hero anpassen**
- Eyebrow umformulieren: "Nächster Schritt" statt "Wichtig — nur noch ein Schritt".
- Headline auf Mobile etwas kleiner (`text-2xl sm:text-3xl lg:text-4xl`).
- Feature-Liste kompakter (kleinere Icons, engerer Abstand).
- Padding reduziert (`p-5 sm:p-8`).
- QR-Code-Block bleibt nur auf `lg`.

**Zone 3 — NEU: Eine zusammenhängende "Deine Bestellung"-Card**
- Statt `SectionCard` × 4 + sticky Sidebar-Card → **eine große Card** mit internen Sub-Sections (durch dünne Divider getrennt).
- Auf Desktop (`lg:`) wird diese Card zur sticky-Sidebar mit gleicher Reihenfolge — kein 2-Spalten-Grid mehr nötig, vereinfacht das Layout massiv.
- Innere Reihenfolge:
  1. **Mini-Stepper** (kompakter, horizontal, Step-Labels nur auf `sm:` sichtbar).
  2. **Items-Liste** (gleich wie bisher, kompakter Spacing).
  3. **Preis-Aufschlüsselung** + großer Endbetrag.
  4. **Lieferadresse** als Akkordeon (`Collapsible`, default geschlossen auf Mobile, offen auf `sm:`).
  5. **Zahlungsart** als Akkordeon (gleiche Logik).
  6. **Action-Buttons** (PDF + Verfolgen, full-width).

**Layout-Vereinfachung**
- Kein 2-Spalten-Grid mehr (`lg:grid-cols-5` raus). Stattdessen **single-column max-w-2xl** zentriert für Zone 1 + 2 + 3, dann TrustPanel darunter.
- Auf sehr großen Screens (`xl:`) optional `max-w-3xl` — bewusst schmal halten für Fokus.
- Vertikale Spacing zwischen Zonen: `space-y-5 sm:space-y-6`.

**Visueller "roter Faden"**
- Zwischen den Zonen kein sichtbarer Connector (zu kitschig), aber konsistente `rounded-3xl`, gleiche Border-Tokens, gleiche Shadow-Tiefe (`shadow-card`).
- Animationen bleiben (`animate-fade-in-down` mit Delays 80/160/240ms — eine pro Zone statt pro Card).

**Imports**
- `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` aus `@/components/ui/collapsible` neu hinzufügen.
- `ChevronDown` aus lucide-react für Akkordeon-Indikator.
- `Calendar` entfernen (Datum-Stat raus).
- `SectionCard` Import bleibt nicht nötig wenn nicht mehr verwendet — entfernen falls so.

### Geänderte Datei
- `src/routes/confirmation.tsx`

### Ergebnis
Statt 6+ gleichgewichtiger Cards auf Mobile gibt es nur noch **3 klare Zonen** in einer einzigen Spalte: Erfolg → App-CTA (Hauptfokus) → alle Bestelldetails gebündelt. Das schafft eine lesbare Top-Down-Story ohne visuelles Chaos.

