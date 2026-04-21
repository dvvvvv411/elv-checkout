import { createFileRoute } from "@tanstack/react-router";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutProgress } from "@/components/checkout/CheckoutProgress";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Sicher zur Kasse — NovaShop" },
      {
        name: "description",
        content:
          "Schließe deine Bestellung sicher und schnell ab. SSL-verschlüsselt, mit Käuferschutz und 30 Tage Rückgaberecht.",
      },
      { property: "og:title", content: "Sicher zur Kasse — NovaShop" },
      {
        property: "og:description",
        content: "Moderner, sicherer Checkout mit Lastschrift & Kreditkarte.",
      },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
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
          © {new Date().getFullYear()} NovaShop · Sicherer Checkout · SSL-verschlüsselt
        </footer>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
