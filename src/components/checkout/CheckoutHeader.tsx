import { ShieldCheck, Lock } from "lucide-react";
import { useOptionalCheckoutSession } from "@/lib/checkout-session-context";

export function CheckoutHeader() {
  const ctx = useOptionalCheckoutSession();
  const branding = ctx?.session.branding;
  const companyName = branding?.company_name ?? "";
  const logoUrl = branding?.logo_url ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          {/* Logo / Firmenname */}
          <div className="flex items-center min-w-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={companyName || "Logo"}
                className="h-8 max-h-10 w-auto object-contain"
              />
            ) : (
              <span className="truncate text-xl font-bold tracking-tight text-foreground">
                {companyName || "\u00A0"}
              </span>
            )}
          </div>

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
