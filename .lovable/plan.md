

## Plan: Kreditkarten-Badges durch echte SVG-Logos ersetzen

### Schritte
1. Drei SVGs in `public/payment-icons/` ablegen:
   - `public/payment-icons/visa.svg`
   - `public/payment-icons/mastercard.svg`
   - `public/payment-icons/amex.svg`
   (via `lov-copy` aus `user-uploads://`)

2. In `src/components/checkout/CustomerForm.tsx` im Kreditkarte-Label:
   - Die beiden alten `<span>VISA</span>` / `<span>MC</span>` Badges entfernen.
   - Ersetzen durch drei `<img>` Tags mit den SVGs, einheitlich auf Höhe `h-6` (Original-Aspect 200×120 → Breite ~`w-10`), `rounded-[3px]`, `flex gap-1.5`.

```tsx
<div className="flex items-center gap-1.5">
  <img src="/payment-icons/visa.svg" alt="Visa" className="h-6 w-10 rounded-[3px]" />
  <img src="/payment-icons/mastercard.svg" alt="Mastercard" className="h-6 w-10 rounded-[3px]" />
  <img src="/payment-icons/amex.svg" alt="American Express" className="h-6 w-10 rounded-[3px]" />
</div>
```

### Geänderte/neue Dateien
- neu: `public/payment-icons/visa.svg`, `mastercard.svg`, `amex.svg`
- geändert: `src/components/checkout/CustomerForm.tsx`

