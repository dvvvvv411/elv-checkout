import { createFileRoute } from "@tanstack/react-router";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
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
      <CheckoutHeader />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Bestellung abschließen
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Nur noch ein paar Schritte bis zu deinem neuen Lieblingsprodukt.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Linke Spalte 60% */}
          <div className="lg:col-span-3">
            <CustomerForm />
          </div>

          {/* Rechte Spalte 40% — sticky auf Desktop */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </div>
        </div>

        <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovaShop · Sicherer Checkout · SSL-verschlüsselt
        </footer>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
