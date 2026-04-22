

## Plan: `shipping`-Block immer mitsenden

### Problem
Aktuell sendet `onSubmit` in `CustomerForm.tsx` `shipping: null`, wenn „Rechnungsadresse = Lieferadresse" angekreuzt ist. Folge: Die DB-Spalten `shipping_company`, `shipping_first_name`, `shipping_last_name` (sowie street/postal_code/city) bleiben in diesem Fall leer.

### Lösung (Einzeiler-Logik)
In `src/components/checkout/CustomerForm.tsx`, Funktion `onSubmit`:

- `shipping` wird **immer** aus den `ship*`-Feldern befüllt — unabhängig von `billingSame`.
- Nur `billing` schaltet zwischen „aus `ship*`" (wenn `billingSame=true`) und „aus `bill*`" (wenn `false`).

### Konkrete Änderung

Block (aktuell Zeilen 258–267):

```ts
const shipping = billingSame
  ? null
  : { company: …, first_name: …, …ship*-Felder };
```

→ ersetzen durch:

```ts
const shipping = {
  company: company.length > 0 ? company : null,
  first_name: values.shipFirstName.trim(),
  last_name: values.shipLastName.trim(),
  street: values.shipStreet.trim(),
  postal_code: values.shipZip.trim(),
  city: values.shipCity.trim(),
};
```

### Auswirkung auf den Confirmation-Snapshot
Der `OrderConfirmationData`-Snapshot übernimmt `shipping` weiterhin direkt → `/confirmation` zeigt jetzt **immer** den Lieferadress-Block, nicht mehr den Fallback aus `customer + billing`. Da bei `billingSame=true` Liefer- und Rechnungsadresse ohnehin identisch sind, ist die Anzeige semantisch korrekt.

### Typ-Anpassung (klein)
`SubmitOrderRequest.shipping` ist aktuell `SubmitOrderShipping | null`. Wir lassen den Typ wie er ist — nur das Mapping ändert sich. Kein Backend- oder Type-Breaking-Change.

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx` (nur `shipping`-Konstante in `onSubmit`)

