

## Plan: AGB- und Datenschutz-Links nicht klickbar machen

In `src/components/checkout/CustomerForm.tsx` (Zeilen 707 und 711) die beiden `<a href="#">`-Links für "Allgemeinen Geschäftsbedingungen" und "Datenschutzerklärung" durch `<span>`-Elemente ersetzen.

### Änderung

- Tag von `<a href="#">` → `<span>`
- Klassen bleiben **gleich** (`font-medium text-primary underline-offset-2 hover:underline`), damit die Texte weiterhin grün (primary) erscheinen.
- `hover:underline` entfernen, damit der Hover-Effekt nicht mehr suggeriert, dass es klickbar ist. Finale Klasse: `font-medium text-primary`.

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx` (nur die zwei Link-Zeilen 707 und 711)

### Ergebnis
Die Texte "Allgemeinen Geschäftsbedingungen" und "Datenschutzerklärung" bleiben grün hervorgehoben, sind aber kein Link mehr — kein Cursor-Pointer, kein Hover-Underline, kein Klick-Verhalten. Die Checkbox-Logik bleibt unverändert.

