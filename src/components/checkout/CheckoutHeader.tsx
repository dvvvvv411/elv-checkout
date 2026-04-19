import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";

const STEPS = ["Warenkorb", "Informationen", "Versand", "Zahlung"] as const;
const ACTIVE_STEP = "Informationen";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4">
          {/* Links: Zurück + Logo */}
          <div className="flex items-center justify-between gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </button>

            <a href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
                <span className="text-base font-bold text-primary-foreground">N</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Nova<span className="text-gradient-primary">Shop</span>
              </span>
            </a>

            {/* Trust Badges (mobil rechts) */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <div className="flex items-center gap-1 rounded-full border border-trust/30 bg-trust/10 px-2 py-1 text-[10px] font-medium text-trust">
                <Lock className="h-3 w-3" />
                SSL
              </div>
            </div>
          </div>

          {/* Mitte: Progress Steps */}
          <nav
            aria-label="Checkout-Fortschritt"
            className="flex items-center justify-center gap-1.5 overflow-x-auto text-sm sm:gap-2"
          >
            {STEPS.map((step, i) => {
              const isActive = step === ACTIVE_STEP;
              return (
                <div key={step} className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={
                      isActive
                        ? "font-bold text-primary"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    }
                  >
                    {step}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span aria-hidden className="text-muted-foreground/60">
                      ›
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Rechts: Trust Badges (Desktop) */}
          <div className="hidden items-center justify-end gap-2 lg:flex">
            <div className="flex items-center gap-1.5 rounded-full border border-trust/30 bg-trust/10 px-3 py-1.5 text-xs font-medium text-trust">
              <Lock className="h-3.5 w-3.5" />
              SSL gesichert
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              Käuferschutz
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
