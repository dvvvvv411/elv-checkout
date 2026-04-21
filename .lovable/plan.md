

## Plan: Moderner, mittig zentrierter Loading-State für /checkout

Den bestehenden Skeleton-Layout-Loader in `src/routes/checkout.tsx` durch einen vollflächig vertikal & horizontal zentrierten, modernen Loader ersetzen.

### Änderung in `CheckoutLoadingState` (`src/routes/checkout.tsx`)

Komplett ersetzen durch eine zentrierte Variante:

- **Container**: `min-h-screen` mit `flex items-center justify-center` → perfekt mittig (vertikal + horizontal), kein Header-/Skeleton-Gerüst mehr.
- **Spinner-Element** (modern statt simples `Loader2`):
  - Doppelter konzentrischer Ring: äußerer dezenter Ring `border-2 border-primary/15` als Track, innerer rotierender Ring `border-2 border-transparent border-t-primary border-r-primary` mit `animate-spin`, Größe `h-14 w-14`, `rounded-full`.
  - Optional weicher Glow dahinter via `shadow-glow` + `blur`-Pseudo, damit's nach Brand-Style aussieht.
  - Pulsierender Kern-Dot in der Mitte (`h-2 w-2 rounded-full bg-primary animate-pulse`).
- **Text darunter**: kleiner, dezenter zweizeiliger Block:
  - Zeile 1: „Checkout wird geladen" (`text-sm font-medium text-foreground`)
  - Zeile 2: „Einen Moment bitte…" (`text-xs text-muted-foreground`)
- **Eintritts-Animation**: `animate-fade-in` auf den Wrapper.

### Bereinigung
- `Skeleton`-Import in `checkout.tsx` entfernen (wird im Loading-State nicht mehr genutzt; an keiner anderen Stelle in der Datei verwendet).
- `Loader2`-Import bleibt entfernt (durch CSS-Ringe ersetzt).

### Resultierendes Markup (vereinfacht)
```tsx
<div className="flex min-h-screen items-center justify-center bg-background px-4">
  <div className="animate-fade-in flex flex-col items-center gap-5">
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
      <div className="absolute inset-0 m-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-foreground">Checkout wird geladen</p>
      <p className="mt-1 text-xs text-muted-foreground">Einen Moment bitte…</p>
    </div>
  </div>
</div>
```

### Geänderte Datei
- `src/routes/checkout.tsx` (nur `CheckoutLoadingState` + ungenutzte Imports)

