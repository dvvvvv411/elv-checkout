

## Plan: Font für Zahlen ändern

Aktuell nutzen die Zahlen `Space Grotesk`. Der User möchte etwas wie **Roboto** — schlage **Roboto Mono** vor, weil:
- echte Monospace → Preise sind in Tabellen perfekt ausgerichtet
- modern, neutral, sehr clean
- vom Google-Roboto-Universum, sehr bekannt/seriös

Alternative wäre **JetBrains Mono** (technischer) oder **Roboto** (proportional, weniger Tabellen-Feeling).

### Änderungen

**1. `src/routes/__root.tsx`**
- Google-Fonts-Link von `Space+Grotesk` auf `Roboto+Mono:wght@400;500;600;700` umstellen.

**2. `src/styles.css`**
- `.font-numeric` Utility: `font-family` von `"Space Grotesk"` auf `"Roboto Mono"` ändern. `tabular-nums`/`tnum` bleiben (bei Monospace ohnehin redundant, schadet nicht). Letter-spacing leicht reduzieren (`-0.005em`).

Keine Änderungen an Komponenten nötig — die `.font-numeric` Klasse ist überall gesetzt.

### Geänderte Dateien
- `src/routes/__root.tsx`
- `src/styles.css`

