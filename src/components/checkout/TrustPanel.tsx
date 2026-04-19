import { Star } from "lucide-react";

export function TrustPanel() {
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,#ffffff,oklch(0.99_0.015_160))] p-5 shadow-card">
      {/* Bewertung */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <Star className="h-6 w-6 fill-white text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="inline-flex animate-star-pop"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </span>
            ))}
            <span
              className="ml-1.5 animate-fade-in text-sm font-bold text-foreground"
              style={{ animationDelay: "700ms" }}
            >
              4,9 / 5
            </span>
          </div>
          <p
            className="mt-0.5 animate-fade-in text-xs text-muted-foreground"
            style={{ animationDelay: "850ms" }}
          >
            Über <span className="font-semibold text-foreground">12.487</span> zufriedene Kunden
          </p>
          <p
            className="mt-1 animate-fade-in text-[10px] text-muted-foreground/70"
            style={{ animationDelay: "1000ms" }}
          >
            – NovaShop GmbH
          </p>
        </div>
      </div>
    </div>
  );
}
