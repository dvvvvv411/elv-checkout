

## Plan: Favicon austauschen + Meta-Daten aktualisieren

### 1. Favicon einbinden
- Hochgeladenes Bild (`checkout.png`) nach `public/favicon.png` kopieren.
- In `src/routes/__root.tsx` das `links`-Array um `{ rel: "icon", type: "image/png", href: "/favicon.png" }` ergänzen.

### 2. Globale Meta-Daten (`src/routes/__root.tsx`)
Generische, zum Checkout-Produkt passende Defaults:
- `title`: „Sicherer Checkout"
- `description`: „Schnell, sicher und DSGVO-konform bezahlen — SSL-verschlüsselt mit Käuferschutz."
- `og:title` / `og:description` analog
- `author` von „Lovable" → entfernen oder neutralisieren

### 3. Landing-Page (`src/routes/index.tsx`)
- Bereits eigener `head()` mit passendem Titel — bleibt unverändert.

### 4. Checkout-Seite (`src/routes/checkout.tsx`)
- Statischer `head().meta`-Title: `"Checkout"` (Fallback, solange Branding noch lädt).
- Bestehender `useEffect`, der `document.title` setzt, wird angepasst auf Format:
  `Checkout – ${data.branding.company_name}`
  (Gedankenstrich „–" statt „—" und ohne „Sicher zur Kasse").

### 5. Confirmation-Seite (`src/routes/confirmation.tsx`)
- `head()`-Title prüfen, ggf. auf `"Bestellbestätigung"` setzen, falls noch generisch.

### Geänderte / neue Dateien
- **Neu:** `public/favicon.png` (kopiert aus Upload)
- **Bearbeitet:** `src/routes/__root.tsx` (Favicon-Link + globale Meta-Defaults)
- **Bearbeitet:** `src/routes/checkout.tsx` (statischer + dynamischer Title im Format „Checkout – {Firma}")
- **Bearbeitet:** `src/routes/confirmation.tsx` (Title-Check, ggf. anpassen)

