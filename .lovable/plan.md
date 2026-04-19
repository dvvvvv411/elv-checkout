

## Plan: Numerische Font auf System UI Sans Serif

User möchte `ui-sans-serif` statt Roboto Mono für die Zahlen — also die native System-Sans-Serif des Geräts (San Francisco auf macOS/iOS, Segoe UI auf Windows, Roboto auf Android). Modern, schnell (kein Webfont-Load), neutral.

### Änderungen

**1. `src/styles.css` — `.font-numeric` Utility**
- `font-family` auf `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` umstellen.
- `font-feature-settings: "tnum" 1` und `font-variant-numeric: tabular-nums` BEHALTEN — wichtig, damit Zahlen in Preistabellen trotz proportionaler Sans-Serif gleich breit ausgerichtet bleiben.
- `letter-spacing: -0.01em` für etwas tightere, modernere Optik.

**2. `src/routes/__root.tsx`**
- Google-Fonts-Link für Roboto Mono entfernen (wird nicht mehr gebraucht) → spart einen Network-Request.

### Geänderte Dateien
- `src/styles.css`
- `src/routes/__root.tsx`

