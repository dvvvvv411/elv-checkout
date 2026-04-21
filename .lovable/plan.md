

## Plan: Checkout zu `/checkout` verschieben + neue Landingpage als Payment-Gateway

### 1. Checkout-Seite verschieben
- **Neue Datei**: `src/routes/checkout.tsx` — Inhalt 1:1 aus aktueller `src/routes/index.tsx`, nur die Route-Definition ändern: `createFileRoute("/checkout")`.
- Meta-Tags bleiben identisch.

### 2. Neue Landingpage `/` erstellen
Neue `src/routes/index.tsx` mit seriöser Hero-Section, die NovaPay (oder ähnlich) als professionelles Payment-Gateway präsentiert.

**Aufbau (eine Seite, klar strukturiert)**:
- **Header** (sticky, transparent/blur): Logo links, Navigation rechts (`Lösungen`, `Sicherheit`, `Preise`, `Kontakt`), CTA-Button "Demo testen" → `/checkout`
- **Hero-Section** (mittig, viel Whitespace):
  - Trust-Badge oben: "PCI DSS Level 1 zertifiziert · PSD2-konform"
  - H1: "Zahlungen, denen Ihre Kunden vertrauen"
  - Subline: Kurzer seriöser Pitch (1–2 Sätze) zu sicheren Transaktionen, SEPA/Kreditkarte, europäischem Datenschutz
  - Zwei CTAs nebeneinander: Primary "Live-Checkout testen" → `/checkout`, Secondary "Vertrieb kontaktieren"
  - Trust-Row darunter: Icons + Mini-Labels (SSL/TLS 1.3, 3D-Secure 2, DSGVO, ISO 27001)
- **Stats-Strip** (4 KPIs in Reihe): "99,99% Uptime", "150+ Länder", "<200ms Latenz", "12.487+ Händler"
- **Feature-Grid** (3 Karten): "Sichere Zahlungen" (Lock-Icon), "Schnelle Integration" (Code-Icon), "Käuferschutz inklusive" (ShieldCheck-Icon)
- **Footer**: kompakt, Copyright + Links (Impressum, Datenschutz, AGB)

**Design-Sprache**:
- Konsistent mit bestehendem Theme (Tailwind-Tokens aus `src/styles.css`, gleiche Schriftgrößen, gleicher Gradient `text-gradient-primary`)
- Seriös: viel Whitespace, klare Hierarchie, keine spielerischen Animationen — nur dezente `animate-fade-in-down`
- Lucide-Icons: `ShieldCheck`, `Lock`, `Zap`, `Globe`, `Code2`, `CheckCircle2`

### 3. Header-CTA verlinkt auf Checkout
- "Live-Checkout testen" und Header-CTA nutzen `<Link to="/checkout">` aus `@tanstack/react-router`.

### Geänderte / neue Dateien
- **Neu**: `src/routes/checkout.tsx`
- **Überschrieben**: `src/routes/index.tsx` (neue Landingpage)

### Hinweis
`routeTree.gen.ts` wird automatisch durch das TanStack-Plugin aktualisiert — nicht manuell anfassen.

