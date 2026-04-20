

## Plan: Kreditkarten-Dialog — Font & Öffnungs-Animation

### 1. Font in `CreditCardDialog.tsx`
Aktuell nutzen Kartennummer, Ablaufdatum und CVV `font-mono`. Das soll durch die normale Sans-Schrift (wie der restliche Checkout) ersetzt werden:
- `font-mono tracking-wider` → entfernen bei Kartennummer-Input
- `font-mono` → entfernen bei Ablaufdatum-Input
- `font-mono` → entfernen bei CVV-Input

Damit Ziffern trotzdem sauber & ruhig wirken, behalten wir leichten Letter-Spacing (`tracking-wide`) bei Kartennummer.

### 2. Öffnungs-Animation in `src/components/ui/dialog.tsx`
Aktueller `DialogContent` nutzt:
- `data-[state=open]:slide-in-from-left-1/2`
- `data-[state=open]:slide-in-from-top-[48%]`
- `data-[state=closed]:slide-out-to-left-1/2`
- `data-[state=closed]:slide-out-to-top-[48%]`

Diese Slide-Klassen erzeugen den "von links-oben in die Mitte"-Effekt. **Entfernen**, sodass nur noch `fade-in-0` + `zoom-in-95` (open) bzw. `fade-out-0` + `zoom-out-95` (closed) übrig bleiben — der Dialog erscheint dann sanft mittig per Fade + leichtem Zoom.

### Geänderte Dateien
- `src/components/ui/dialog.tsx` — Slide-Klassen aus `DialogContent` entfernen
- `src/components/checkout/CreditCardDialog.tsx` — `font-mono` aus den drei Zahleneingaben entfernen

