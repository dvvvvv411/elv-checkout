

## Plan: Produktbilder aus Bestellübersicht entfernen

In der Bestellliste (Zone "Deine Bestellung") die Produkt-Thumbnails entfernen — sowohl auf `/checkout` als auch auf `/confirmation`. Die Mengen-Badge wird neben den Produktnamen verschoben, damit die Info erhalten bleibt.

### Änderungen

**`src/components/checkout/OrderSummary.tsx`** (genutzt in `/checkout`)
- In `MOCK_ITEMS`: `image`-Feld kann bleiben (wird nur nicht mehr gerendert) — keine Datenänderung nötig.
- Im `<li>`-Rendering den kompletten `<div>`-Block mit `h-14 w-14 rounded-xl bg-gradient-soft` (Emoji + Mengen-Badge) entfernen.
- Menge stattdessen als kleines neutrales Label vor dem Produktnamen anzeigen, z.B. `2 ×  Schnellladekabel USB-C`, in `text-muted-foreground font-medium`.
- Layout des `<li>` vereinfachen: nur noch zwei Spalten (Name links flexibel, Preis rechts).

**`src/routes/confirmation.tsx`** (Bestellzusammenfassung in Zone 3)
- Identisches Pattern: Falls dort eine eigene Items-Liste mit Bild-Thumbnails gerendert wird, denselben Thumbnail-Block entfernen und die Menge als `2 ×`-Prefix vor den Namen setzen.
- Falls die Confirmation-Seite den `OrderSummary`-Component wiederverwendet, ist mit der Änderung oben automatisch alles erledigt — sonst analoge Anpassung direkt in `confirmation.tsx`.

### Beibehalten
- Produktnamen, Menge (als `N ×`-Prefix), Einzelpreis-Summe rechts.
- Alle anderen Sektionen (Rabattcode, Kostenaufschlüsselung, Gesamt) bleiben unverändert.

### Geänderte Dateien
- `src/components/checkout/OrderSummary.tsx`
- `src/routes/confirmation.tsx` (nur falls dort eine eigene Items-Liste mit Bildern existiert)

