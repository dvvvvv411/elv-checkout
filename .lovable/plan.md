

## Plan: Payment-Icons über Vite-Asset-Imports einbinden

### Problem
Die SVGs liegen in `public/payment-icons/`, werden im Preview aber nicht ausgeliefert (Netzwerk-Tab zeigt keine Requests darauf). In dieser TanStack-Start + Cloudflare-Worker-Konfiguration ist der zuverlässigste Weg, statische SVGs als Vite-Asset-Module zu importieren — dann werden sie gehasht in den Build mitgenommen und sicher ausgeliefert.

### Schritte

1. SVGs nach `src/assets/payment-icons/` verschieben:
   - `src/assets/payment-icons/visa.svg`
   - `src/assets/payment-icons/mastercard.svg`
   - `src/assets/payment-icons/amex.svg`
   - alte Dateien unter `public/payment-icons/` löschen.

2. In `src/components/checkout/CustomerForm.tsx` die drei SVGs am Datei-Anfang als URL-Module importieren und als `src` an die `<img>` Tags übergeben:
   ```tsx
   import visaIcon from "@/assets/payment-icons/visa.svg";
   import mastercardIcon from "@/assets/payment-icons/mastercard.svg";
   import amexIcon from "@/assets/payment-icons/amex.svg";
   ```
   Dann `<img src={visaIcon} ... />` etc.

### Geänderte/verschobene Dateien
- neu: `src/assets/payment-icons/visa.svg`, `mastercard.svg`, `amex.svg`
- gelöscht: `public/payment-icons/*`
- geändert: `src/components/checkout/CustomerForm.tsx`

