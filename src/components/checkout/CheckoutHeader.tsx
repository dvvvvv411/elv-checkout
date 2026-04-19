import { ShieldCheck, Lock } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-elegant">
            <span className="text-base font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Nova<span className="text-gradient-primary">Shop</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 rounded-full border border-trust/30 bg-trust/10 px-3 py-1.5 text-xs font-medium text-trust sm:flex">
            <Lock className="h-3.5 w-3.5" />
            SSL gesichert
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Käuferschutz
          </div>
        </div>
      </div>
    </header>
  );
}
