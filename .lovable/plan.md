

## Plan: App-Download als Hauptelement der `/confirmation`

Voraussichtliche Lieferung und Versandart-Hinweise raus, stattdessen prominentes App-Download-CTA als Star-Element.

### Änderungen in `src/routes/confirmation.tsx`

**1. Hero-Section anpassen**
- Mini-Stat "Voraussichtliche Lieferung" aus dem 2er-Grid entfernen.
- Übrig bleibt: nur noch "Bestelldatum" — Grid auf 1 Spalte reduzieren (oder Stat in voller Breite).
- `Calendar`-Icon bleibt für Bestelldatum, `Clock`-Import entfernen.

**2. Lieferstatus-Card vereinfachen**
- Hilfstext darunter ändern von "Wir bereiten deine Bestellung gerade vor…" zu einem neutralen Hinweis ohne Liefertermin-Versprechen, z. B. "Deine Bestellung wurde erfolgreich aufgenommen und wird in Kürze bearbeitet."

**3. Lieferadresse-Card umbauen**
- Rechte Spalte "Versandart" (DHL Standard-Versand · Kostenlos · 2–3 Werktage) komplett entfernen.
- Card wird einspaltig, zeigt nur noch die Empfänger-Adresse.

**4. NEUES Hero-CTA: App-Download (Hauptbestandteil)**
- Neue, sehr prominente Card direkt nach dem Erfolgsbanner (vor dem Grid), volle Breite.
- Visuell: Gradient-Background (`bg-gradient-primary` oder `bg-gradient-soft` mit starkem Akzent), großes Smartphone-Icon (`Smartphone` aus lucide-react), Glow-Effekte, ähnlicher Look wie der Erfolgsbanner aber noch auffälliger.
- Inhalt links:
  - Eyebrow: "Wichtig — nur noch ein Schritt"
  - Headline (groß, fett): "Wähle deinen Wunsch-Liefertermin in der App"
  - Subline: "Lade die NovaShop App herunter, um deinen Liefertermin flexibel zu wählen, Pakete in Echtzeit zu verfolgen und exklusive Vorteile zu erhalten."
  - Feature-Liste (3 Bullets mit Check-Icons): "Liefertermin frei wählen", "Live-Sendungsverfolgung", "Exklusive App-Rabatte"
  - Zwei große Store-Buttons nebeneinander: "App Store" (Apple-Icon) und "Google Play" (Play-Icon) — beide als `Button` mit dunklem Background, weißem Text, Icon links, "Download im" klein darüber, Store-Name groß darunter.
- Inhalt rechts (ab `sm`): dekoratives Smartphone-Mockup oder großes `Smartphone`-Icon mit Pulse-/Glow-Animation, QR-Code-Platzhalter (einfaches `<div>` mit Grid-Pattern oder Lucide `QrCode` Icon) mit Beschriftung "Scanne mit der Kamera".
- Animation: `animate-fade-in-down` mit `animationDelay: 120ms`.

**5. Imports**
- Neu: `Smartphone`, `QrCode`, `Apple` aus lucide-react (Apple existiert nicht in lucide → stattdessen Inline-SVG für App-Store-Apple-Logo + Inline-SVG für Google-Play-Dreieck, oder generische Icons wie `Download`).
- Entfernen: `Clock`.

### Layout-Reihenfolge danach
```text
Header
└── Erfolgsbanner (mit nur Bestelldatum-Stat)
└── App-Download-Hero (NEU, full width, hauptelement)
└── Grid 3/2:
    ├── Links: Lieferstatus, Lieferadresse (ohne Versandart-Spalte), Zahlungsart
    └── Rechts sticky: Bestellübersicht, TrustPanel
└── Footer
```

### Geänderte Datei
- `src/routes/confirmation.tsx`

