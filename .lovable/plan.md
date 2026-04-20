

## Plan: Karteninhaber-Pflichtfeld im Kreditkarten-Dialog

Erweiterung des bereits geplanten `CreditCardDialog.tsx`: Feld **Karteninhaber** wird zum **Pflichtfeld** (statt optional).

### Änderungen

1. **`CreditCardDialog.tsx`** (neu, wie zuvor geplant) — Zod-Schema erweitern:
   ```ts
   cardholder: z.string().trim().min(2, "Name des Karteninhabers ist erforderlich").max(80),
   ```
   - Input-Feld `Karteninhaber` als erstes Feld im Dialog (über Kartennummer), `autoComplete="cc-name"`, Placeholder `Max Mustermann`.
   - Validierung blockiert Speichern, wenn leer.

2. **`CustomerForm.tsx`** — `cardData`-State erweitern:
   ```ts
   cardData: { last4, brand, expiry, cardholder } | null
   ```
   - In der Saved-Card-Anzeige zusätzlich den Karteninhaber-Namen klein über/unter der maskierten Nummer anzeigen.

### Card-Design (aktualisiert)
```
┌─────────────────────────────────────────────┐
│ [VISA]   •••• •••• •••• 4242        [✎]    │
│          Max Mustermann                      │
│          Gültig bis 12/27                    │
└─────────────────────────────────────────────┘
```

### Geänderte/neue Dateien
- **neu**: `src/components/checkout/CreditCardDialog.tsx` (mit Karteninhaber-Pflichtfeld)
- **geändert**: `src/components/checkout/CustomerForm.tsx`

