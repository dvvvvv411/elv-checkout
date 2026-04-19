import { ArrowLeft } from "lucide-react";

const STEPS = ["Warenkorb", "Informationen", "Versand", "Zahlung"] as const;
const ACTIVE_STEP = "Informationen";

export function CheckoutProgress() {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück
      </button>

      <nav
        aria-label="Checkout-Fortschritt"
        className="flex items-center gap-1.5 overflow-x-auto text-sm sm:gap-2"
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
    </div>
  );
}
