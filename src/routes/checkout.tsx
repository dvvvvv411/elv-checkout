import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Toaster } from "@/components/ui/sonner";
import { useCheckoutSession } from "@/hooks/use-checkout-session";
import { CheckoutSessionProvider } from "@/lib/checkout-session-context";

type CheckoutSearch = { token?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    token: typeof search.token === "string" ? search.token : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sicher zur Kasse" },
      {
        name: "description",
        content:
          "Schließe deine Bestellung sicher und schnell ab. SSL-verschlüsselt, mit Käuferschutz.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { data, loading, error, token } = useCheckoutSession();

  useEffect(() => {
    if (data?.branding.company_name) {
      document.title = `Sicher zur Kasse — ${data.branding.company_name}`;
    }
  }, [data]);

  if (loading) {
    return <CheckoutLoadingState />;
  }

  if (error || !data) {
    return <CheckoutErrorState message={error?.message ?? "Unbekannter Fehler"} />;
  }

  return (
    <CheckoutSessionProvider session={data} token={token}>
      <div className="min-h-screen bg-background">
        <div className="animate-fade-in-down" style={{ animationDelay: "0ms", animationFillMode: "both" }}>
          <CheckoutHeader />
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div
            className="animate-fade-in-down mb-6 sm:mb-8"
            style={{ animationDelay: "80ms", animationFillMode: "both" }}
          >
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Bestellung abschließen
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Nur noch ein paar Schritte bis zum Abschluss.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
            <div
              className="order-1 animate-fade-in-down lg:col-span-3"
              style={{ animationDelay: "160ms", animationFillMode: "both" }}
            >
              <CheckoutProgress />
            </div>

            <div className="order-2 lg:order-3 lg:col-span-2">
              <div className="lg:sticky lg:top-24">
                <div
                  className="animate-fade-in-down"
                  style={{ animationDelay: "240ms", animationFillMode: "both" }}
                >
                  <OrderSummary />
                </div>
              </div>
            </div>

            <div className="order-3 lg:order-2 lg:col-span-3">
              <CustomerForm />
            </div>
          </div>

          <footer
            className="animate-fade-in-down mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground"
            style={{ animationDelay: "600ms", animationFillMode: "both" }}
          >
            © {new Date().getFullYear()} {data.branding.company_name} · Sicherer Checkout · SSL-verschlüsselt
          </footer>
        </main>

        <Toaster position="top-center" richColors />
      </div>
    </CheckoutSessionProvider>
  );
}

function CheckoutLoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="animate-fade-in flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" aria-hidden />
          <div className="absolute inset-0 rounded-full border-2 border-primary/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
          <div className="absolute inset-0 m-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Checkout wird geladen</p>
          <p className="mt-1 text-xs text-muted-foreground">Einen Moment bitte…</p>
        </div>
      </div>
    </div>
  );
}

function CheckoutErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 text-center shadow-card sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="text-lg font-bold text-foreground">Checkout nicht verfügbar</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          Bitte kehre zum Shop zurück und starte die Bestellung erneut.
        </p>
      </div>
    </div>
  );
}
