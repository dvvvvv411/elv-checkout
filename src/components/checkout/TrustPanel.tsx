import { Star, ShieldCheck, Lock, Truck, RotateCcw } from "lucide-react";

export function TrustPanel() {
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-border bg-gradient-soft p-5 shadow-card">
      {/* Bewertung */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <Star className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 animate-count-up fill-yellow-400 text-yellow-400"
                style={{ animationDelay: `${i * 70}ms` }}
              />
            ))}
            <span className="ml-1.5 text-sm font-bold text-foreground">4,9 / 5</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Über <span className="font-semibold text-foreground">12.487</span> zufriedene Kunden
          </p>
        </div>
      </div>

      <div className="my-4 h-px bg-border" />

      {/* Trust-Icons */}
      <ul className="grid grid-cols-2 gap-3">
        {[
          { Icon: Lock, label: "SSL-Verschlüsselung" },
          { Icon: ShieldCheck, label: "Käuferschutz" },
          { Icon: Truck, label: "Schneller Versand" },
          { Icon: RotateCcw, label: "30 Tage Rückgabe" },
        ].map(({ Icon, label }, i) => (
          <li
            key={label}
            className="flex animate-count-up items-center gap-2 rounded-lg bg-card/60 px-2.5 py-2 text-xs font-medium text-foreground"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-trust/10 text-trust">
              <Icon className="h-3.5 w-3.5" />
            </span>
            {label}
          </li>
        ))}
      </ul>

      {/* Live Indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-card/70 px-3 py-2.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trust opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-trust" />
        </span>
        <span className="text-xs font-semibold text-foreground">Sichere Verbindung aktiv</span>
      </div>
    </div>
  );
}
