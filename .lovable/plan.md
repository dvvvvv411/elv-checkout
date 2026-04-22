

## Plan: `allowedHosts` in `vite.config.ts` umstellen

In `vite.config.ts` die Hosts von `antpiregmbh.de` auf `piana-heizoel.de` ändern.

**Vorher:**
```ts
allowedHosts: ["checkout.antpiregmbh.de", ".antpiregmbh.de", ".lovable.app"],
```

**Nachher:**
```ts
allowedHosts: ["checkout.piana-heizoel.de", ".piana-heizoel.de", ".lovable.app"],
```

### Geänderte Datei
- `vite.config.ts` (nur die `allowedHosts`-Zeile)

