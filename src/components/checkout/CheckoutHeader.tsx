import { ShieldCheck, Lock } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
              <span className="text-base font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Nova<span className="text-gradient-primary">Shop</span>
            </span>
          </a>

          {/* Trust Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 rounded-full border border-trust/30 bg-trust/10 px-2 py-1 text-[10px] font-medium text-trust sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">SSL gesichert</span>
              <span className="sm:hidden">SSL</span>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
              <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="hidden sm:inline">Käuferschutz</span>
              <span className="sm:hidden">Schutz</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
