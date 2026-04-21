

## Plan: Landingpage `/` ohne Branding & ohne CTAs

In `src/routes/index.tsx` alle markenspezifischen Elemente und Verlinkungen zum Checkout entfernen. Übrig bleibt eine neutrale, seriöse Hero-Darstellung als Payment-Gateway.

### Entfernen
- **Header komplett**: Logo "NovaPay", Navigation, "Demo testen"-Button.
- **Hero-CTAs**: "Live-Checkout testen" und "Vertrieb kontaktieren" — beide Buttons raus.
- **Secondary-CTA-Section** (`#kontakt`): kompletter Block mit "Bereit, Zahlungen ernst zu nehmen?" und beiden Buttons raus.
- **Footer komplett**: Copyright "NovaPay GmbH", Impressum/Datenschutz/AGB-Links raus.
- **Meta-Tags**: "NovaPay" aus `title` und `og:title` entfernen → neutraler Titel wie "Sicheres Payment-Gateway für Europa".
- **Stats-Eintrag** "12.487+ Händler" entfernen (impliziert konkretes Unternehmen) — bleibt: Uptime, Länder, Latenz.

### Behalten (neutrale Inhalte)
- Trust-Badge "PCI DSS Level 1 zertifiziert · PSD2-konform"
- H1 "Zahlungen, denen Ihre Kunden vertrauen" + neutrale Subline (ohne Markenname)
- Trust-Row (SSL/TLS, 3D-Secure, DSGVO, ISO 27001)
- Stats-Strip (3 KPIs statt 4)
- Feature-Grid (3 Karten: Sichere Zahlungen, Schnelle Integration, Käuferschutz)

### Struktur danach
```text
[Hero: Badge → H1 → Subline → Trust-Row]
[Stats-Strip: 3 KPIs]
[Feature-Grid: 3 Karten]
```
Keine Header, keine Buttons, kein Footer — reine Info-Landingpage.

### Imports bereinigen
- `Link`, `Button`, `buttonVariants` entfernen (nicht mehr verwendet).
- `Zap`, `Globe` entfernen.
- Behalten: `ShieldCheck`, `Lock`, `Code2`, `CheckCircle2`.

### Geänderte Datei
- `src/routes/index.tsx`

