

## Plan: Bessere Checkbox für "Rechnung an Lieferadresse"

Switch-Toggle wieder durch eine **echte, aber gut gestaltete Checkbox** ersetzen — kompakte Zeile, größere Checkbox, klares Häkchen, kein Card-Look, kein Switch.

### Änderungen in `src/components/checkout/CustomerForm.tsx` (Zeilen 342–365)

- `Switch` → `Checkbox` (aus `@/components/ui/checkbox`).
- Checkbox links, größer (`h-5 w-5`), abgerundet (`rounded-md`), mit klarem Hover/Focus-Ring.
- Label rechts daneben, ein einziger klarer Satz — kein Hilfstext, kein Icon-Bubble (das war der überladene Teil).
- Klick auf gesamte Zeile toggelt weiterhin (via `<label htmlFor>`).
- Checked-State: dezenter farbiger Hintergrund auf der Zeile (`has-[:checked]:bg-primary/5 has-[:checked]:border-primary/30`) — gibt visuelles Feedback ohne aufdringlich zu sein.

### Beispiel-Markup

```tsx
<label
  htmlFor="billingSame"
  className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-3.5 transition-colors hover:bg-secondary/40 has-[:checked]:border-primary/30 has-[:checked]:bg-primary/5"
>
  <Checkbox
    id="billingSame"
    checked={billingSame}
    onCheckedChange={(c) => setValue("billingSame", c === true)}
    className="h-5 w-5 rounded-md"
  />
  <span className="text-sm font-medium text-foreground">
    Rechnungsadresse ist identisch mit Lieferadresse
  </span>
</label>
```

### Imports
- `Switch`-Import entfernen.
- `Checkbox`-Import sicherstellen (vermutlich noch vorhanden).
- `Building2`-Import nur entfernen, falls nicht mehr anderweitig verwendet — sonst belassen.

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx`

