

## Plan: Header aufräumen — Logo & Trust Badges

In `src/components/checkout/CheckoutHeader.tsx`:

### 1. Logo
- Den `<div>` mit dem grünen "N"-Quadrat (Gradient-Kreis) **entfernen**.
- Nur den Text `Nova Shop` mit dem Gradient auf "Shop" beibehalten, etwas größer (`text-xl`) und gewichtiger (`font-bold tracking-tight`).

### 2. Trust Badges — seriöser
Aktuell: zwei pillenförmige, leicht bunte Badges (grün/teal Tönung). Wirken wie Marketing-Sticker.

Neuer Stil — dezent & seriös:
- Kein farbiger Hintergrund mehr, kein farbiger Border.
- Stattdessen schlichte Inline-Items: kleines Icon + Text in `text-muted-foreground`, `text-xs font-medium`.
- Trennung durch dünnen vertikalen Divider (`<span className="h-4 w-px bg-border" />`) zwischen den Items statt zwei separate Pills.
- Icons in `text-foreground/70`, leicht kleiner (`h-3.5 w-3.5`).
- Auf Mobile: nur Icons sichtbar, Text ab `sm:` einblenden (wie bisher).

Beispielstruktur:
```tsx
<div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
  <span className="flex items-center gap-1.5">
    <Lock className="h-3.5 w-3.5" />
    <span className="hidden sm:inline">SSL-verschlüsselt</span>
  </span>
  <span className="hidden h-4 w-px bg-border sm:block" />
  <span className="flex items-center gap-1.5">
    <ShieldCheck className="h-3.5 w-3.5" />
    <span className="hidden sm:inline">Käuferschutz</span>
  </span>
</div>
```

### Geänderte Datei
- `src/components/checkout/CheckoutHeader.tsx`

