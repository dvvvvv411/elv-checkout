

## Plan: Abstand zwischen CTA-Button und Trust-Card (Mobile)

In `src/components/checkout/CustomerForm.tsx` beim mobilen `<TrustPanel />` (das mit `lg:hidden` direkt unter dem "Zahlungspflichtig bestellen"-Button steht):

- Wrapper-Klasse um `mt-4` (oder `mt-6`) ergänzen, sodass auf Mobile sichtbarer Abstand zwischen Button und Trust-Card entsteht.
- Beispiel: `<div className="mt-4 lg:hidden"><TrustPanel /></div>`

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx`

