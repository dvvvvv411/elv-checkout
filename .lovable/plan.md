

## Plan: Custom-Domain im Vite-Dev-Server erlauben

Der Fehler `Blocked request. This host ("checkout.antpiregmbh.de") is not allowed.` kommt vom Host-Check des Vite-Dev-Servers. Die Custom-Domain muss in `server.allowedHosts` eingetragen werden.

### Änderung

**`vite.config.ts`**
- Zusätzliche Vite-Konfiguration via `defineConfig({ vite: { server: { allowedHosts: [...] } } })` ergänzen.
- Eingetragen werden:
  - `"checkout.antpiregmbh.de"` (die aktuell genutzte Custom-Domain)
  - `".lovable.app"` (Subdomain-Wildcard für Lovable-Preview/Published-URLs, damit nichts bricht)
  - `".antpiregmbh.de"` (Wildcard für weitere Subdomains derselben Hauptdomain, falls später z.B. `staging.checkout.antpiregmbh.de` dazukommt)

### Resultat

```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      allowedHosts: ["checkout.antpiregmbh.de", ".antpiregmbh.de", ".lovable.app"],
    },
  },
});
```

### Hinweise (technisch)

- `allowedHosts` betrifft nur den Dev-/Preview-Server. Für das produktive Deployment (Cloudflare Worker / Published URL) ist diese Einstellung irrelevant.
- Punkt-Prefix (`.antpiregmbh.de`) erlaubt alle Subdomains. Alternativ kann man `true` setzen, das deaktiviert den Schutz komplett — wird hier bewusst **nicht** gemacht (DNS-Rebinding-Schutz bleibt aktiv).
- Die bestehenden, vom Lovable-Preset injizierten Server-Optionen (Port, Host, StrictPort, Sandbox-Detection) bleiben erhalten — `vite.server.allowedHosts` wird nur ergänzt, nichts überschrieben.

### Geänderte Datei
- `vite.config.ts`

