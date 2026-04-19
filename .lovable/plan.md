

## Plan: IBAN Auto-Formatierung beim Tippen

In `CustomerForm.tsx` das IBAN-Feld so erweitern, dass die Eingabe live im Format `DE00 0000 0000 0000 0000 00` (Vierergruppen, getrennt durch Leerzeichen) angezeigt wird — exakt wie im Placeholder.

### Umsetzung

1. **Controlled-Wert für IBAN**: Statt `{...reg("iban")}` einen `Controller` aus `react-hook-form` benutzen (oder `watch("iban")` + `setValue`), damit wir den Anzeigewert beim Tippen formatieren können.
2. **Formatter-Funktion** lokal in der Datei:
   - Buchstaben groß, alle Nicht-Alphanumerischen entfernen.
   - Auf 34 Zeichen begrenzen (max IBAN-Länge).
   - In 4er-Gruppen mit Leerzeichen joinen: `match(/.{1,4}/g)?.join(" ")`.
3. **onChange**: Eingabe formatieren, formatierten String in das Feld setzen (`setValue("iban", formatted, { shouldValidate: true })`).
4. **Caret-Verhalten**: Einfaches Append am Ende reicht hier (Cursor immer ans Ende setzen ist meist okay; bei Bedarf nur Default-Browserverhalten lassen — ist für ein Mockup ausreichend).
5. **Validierung**: Im bestehenden `superRefine` werden Leerzeichen schon mit `.replace(/\s+/g, "")` entfernt → bleibt unverändert kompatibel.
6. **inputMode**: `inputMode="text"` + `autoComplete="off"` + `spellCheck={false}` ergänzen für saubere UX.

### Geänderte Datei
- `src/components/checkout/CustomerForm.tsx`

