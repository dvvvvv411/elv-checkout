type SharpStarProps = {
  className?: string;
  filled?: boolean;
};

// Spitzer 5-Zack-Stern mit tiefen Einkerbungen (innerer Radius ~0.38)
function SharpStar({ className, filled = true }: SharpStarProps) {
  // Punkte berechnet auf viewBox 24x24, center (12,12), outer r=11, inner r=4.2
  // 10 Punkte: alternating outer/inner, start at top (-90deg)
  const points = [
    "12,1",
    "13.45,8.36",
    "20.78,7.54",
    "15.16,12.34",
    "18.89,18.71",
    "12,15.6",
    "5.11,18.71",
    "8.84,12.34",
    "3.22,7.54",
    "10.55,8.36",
  ].join(" ");
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points={points} />
    </svg>
  );
}

export function TrustPanel() {
  return (
    <div className="animate-fade-in overflow-hidden rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,#ffffff,oklch(0.99_0.015_160))] p-5 shadow-card">
      {/* Bewertung */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
          <SharpStar className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <SharpStar
                key={i}
                className="h-4 w-4 animate-star-pop text-yellow-400"
                {...({ style: { animationDelay: `${i * 120}ms` } } as object)}
              />
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
        </div>
      </div>

      {/* Unternehmensname */}
      <p className="mt-4 text-center text-[11px] text-muted-foreground">NovaShop GmbH</p>
    </div>
  );
}
