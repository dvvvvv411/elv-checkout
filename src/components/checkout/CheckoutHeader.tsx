import { ShieldCheck, Lock } from "lucide-react";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Nova<span className="text-gradient-primary">Shop</span>
            </span>
          </a>

          {/* Trust Badges */}
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-foreground/70" />
              <span className="hidden sm:inline">SSL-verschlüsselt</span>
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-foreground/70" />
              <span className="hidden sm:inline">Käuferschutz</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
