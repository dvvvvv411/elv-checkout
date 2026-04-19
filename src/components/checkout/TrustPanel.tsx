import { Star } from "lucide-react";

export function TrustPanel() {
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-amber-200/60 bg-[linear-gradient(135deg,oklch(0.985_0.04_90),oklch(0.97_0.05_85))] p-5 shadow-card">
      {/* Bewertung */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-elegant">
          <Star className="h-6 w-6 fill-white text-white" />
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

      {/* Unternehmensname */}
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        NovaShop GmbH <span className="mx-1 opacity-50">·</span> Seit 2018{" "}
        <span className="mx-1 opacity-50">·</span> Made in Germany
      </p>
    </div>
  );
}
