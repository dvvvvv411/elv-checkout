

## Plan: Rechnungsadresse-Toggle besser gestalten

Die aktuelle Checkbox in einer Card mit Hilfstext wirkt schwerfällig. Ersetzen durch einen modernen, schlanken **Switch-Toggle** im Stil iOS/Apple — passt besser zum Checkout.

### Änderungen in `src/components/checkout/CustomerForm.tsx`

**Zeilen 341–360** ersetzen:
- `Checkbox` → `Switch` (`@/components/ui/switch`, bereits im Projekt verfügbar).
- Layout: kompakte Zeile mit Icon links, Label + dezenter Hilfstext mittig, Switch rechts.
- Hover/Active-State subtil, kein dicker Card-Look mehr.
- Klick auf gesamte Zeile toggelt weiterhin.

### Beispiel-Markup (vereinfacht)

```tsx
<label
  htmlFor="billingSame"
  className="mt-5 flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border/60 bg-background px-4 py-3 transition-colors hover:bg-secondary/40"
>
  <div className="flex items-center gap-3 min-w-0">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Building2 className="h-4 w-4" />
    </div>
    <div className="min-w-0">
      <p className="text-sm font-medium text-foreground">
        Rechnung an Lieferadresse
      </p>
      <p className="text-xs text-muted-foreground">
        Ausschalten für abweichende Rechnungsadresse
      </p>
    </div>
  </div>
  <Switch
    id="billingSame"
    checked={billingSame}
    onCheckedChange={(c) => setValue("billingSame", c)}
  />
</label>
```

### Imports
- `Switch` aus `@/components/ui/switch` ergänzen.
- `Checkbox`-Import bleibt (wird ggf. an anderer Stelle weiter genutzt — vorher prüfen, sonst entfernen).

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx`

