import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Truck,
  Calendar,
  CreditCard,
  Package,
  FileText,
  Check,
  AlertCircle,
  Download,
  ChevronDown,
  MapPin,
} from "lucide-react";

import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { TrustPanel } from "@/components/checkout/TrustPanel";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Toaster } from "@/components/ui/sonner";
import { calculatePrices, formatEUR } from "@/lib/checkout-utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Bestellbestätigung — NovaShop" },
      {
        name: "description",
        content: "Deine Bestellung wurde erfolgreich aufgegeben. Vielen Dank für deinen Einkauf.",
      },
      { property: "og:title", content: "Bestellbestätigung — NovaShop" },
      {
        property: "og:description",
        content: "Vielen Dank für deinen Einkauf bei NovaShop.",
      },
    ],
  }),
  component: ConfirmationPage,
});

const MOCK_ITEMS = [
  {
    id: "1",
    name: "Premium Wireless Kopfhörer",
    variant: "Mitternachtsschwarz",
    quantity: 1,
    priceGross: 79.99,
    image: "🎧",
  },
  {
    id: "2",
    name: "Schnellladekabel USB-C",
    variant: "2m, geflochten",
    quantity: 2,
    priceGross: 14.995,
    image: "🔌",
  },
];

const VAT_RATE = 0.19;
const SHIPPING_GROSS = 0;

const MOCK_ADDRESS = {
  name: "Max Mustermann",
  street: "Hauptstraße 42",
  zip: "10115",
  city: "Berlin",
  country: "Deutschland",
};

const MOCK_EMAIL = "max.mustermann@example.com";

const STEPS = [
  { key: "received", label: "Eingegangen", icon: Check },
  { key: "processing", label: "Bearbeitung", icon: Package },
  { key: "shipped", label: "Versendet", icon: Truck },
  { key: "delivered", label: "Zugestellt", icon: CheckCircle2 },
] as const;

const ACTIVE_STEP = 1;

function ConfirmationPage() {
  const orderNumber = useMemo(() => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `NS-2026-${random}`;
  }, []);

  const [addressOpen, setAddressOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const itemsGross = MOCK_ITEMS.reduce((sum, i) => sum + i.priceGross * i.quantity, 0);
  const prices = calculatePrices({
    itemsGross,
    shippingGross: SHIPPING_GROSS,
    discountGross: 0,
    vatRate: VAT_RATE,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="animate-fade-in-down" style={{ animationFillMode: "both" }}>
        <CheckoutHeader />
      </div>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 xl:max-w-3xl">
        <div className="space-y-5 sm:space-y-6">
          {/* ZONE 1 — Erfolg (kompakt) */}
          <section
            className="animate-fade-in-down relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-soft p-5 shadow-card sm:p-8"
            style={{ animationDelay: "80ms", animationFillMode: "both" }}
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
            <div className="relative flex items-start gap-4 sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary shadow-elegant sm:h-20 sm:w-20">
                <CheckCircle2
                  className="animate-star-pop h-10 w-10 text-primary-foreground sm:h-12 sm:w-12"
                  strokeWidth={2.5}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-trust">
                  Bestellung bestätigt
                </p>
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Vielen Dank!
                </h1>
                <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                  Bestätigung an{" "}
                  <span className="font-semibold text-foreground">{MOCK_EMAIL}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bestellnr.{" "}
                  <span className="font-numeric font-bold text-foreground">{orderNumber}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ZONE 2 — App-Hero (Hauptfokus) */}
          <section
            className="animate-fade-in-down relative overflow-hidden rounded-3xl border-2 border-primary-foreground/40 bg-gradient-primary p-5 shadow-elegant ring-2 ring-primary/20 ring-offset-2 ring-offset-background sm:p-8"
            style={{ animationDelay: "160ms", animationFillMode: "both" }}
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-glow opacity-30 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-background/20 blur-3xl" />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <div className="inline-flex animate-trust-pulse items-center gap-2 rounded-full bg-warning px-3 py-1.5 text-warning-foreground shadow-lg shadow-warning/50 ring-1 ring-warning-foreground/20">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-warning-foreground" />
                <AlertCircle className="h-3.5 w-3.5 text-warning-foreground" strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-wider text-warning-foreground">
                  Aktion erforderlich
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-3xl lg:text-4xl">
                Lade die App, um deinen Liefertermin zu bestätigen
              </h2>
              <p className="mt-3 max-w-xl text-sm text-primary-foreground/90">
                <span className="font-semibold text-primary-foreground">
                  Deine Bestellung wird erst versendet, sobald du den Liefertermin in der App
                  bestätigt hast.
                </span>{" "}
                Lade jetzt die NovaShop App herunter, um fortzufahren.
              </p>

              <div className="mt-4 flex max-w-md items-start gap-2.5 rounded-xl border border-primary-foreground/30 bg-primary-foreground/10 p-3 text-left backdrop-blur-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground" />
                <p className="text-xs font-medium text-primary-foreground">
                  Ohne Bestätigung in der App kann deine Bestellung nicht zugestellt werden.
                </p>
              </div>

              <ul className="mt-4 w-fit space-y-2 text-left">
                {[
                  "Liefertermin in der App bestätigen",
                  "Sendung live verfolgen",
                  "Bonus: Exklusive App-Rabatte sichern",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-primary-foreground"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 backdrop-blur-sm">
                      <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <a
                  href="#"
                  download
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-foreground px-5 py-3 text-background shadow-elegant transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  <Download className="h-5 w-5" strokeWidth={2.5} />
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-base font-bold">App herunterladen</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                      Direkt von NovaShop
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* ZONE 3 — Deine Bestellung (alles in einer Card) */}
          <section
            className="animate-fade-in-down rounded-3xl border border-border bg-card shadow-card"
            style={{ animationDelay: "240ms", animationFillMode: "both" }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-border px-5 py-4 sm:px-6">
              <Package className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold text-foreground">Deine Bestellung</h2>
            </div>

            {/* Stepper */}
            <div className="px-5 py-5 sm:px-6">
              <div className="relative">
                <div className="absolute left-0 right-0 top-4 mx-5 h-0.5 bg-border" />
                <div
                  className="absolute left-0 top-4 ml-5 h-0.5 bg-gradient-primary transition-all"
                  style={{
                    width: `calc(${(ACTIVE_STEP / (STEPS.length - 1)) * 100}% - 1.25rem)`,
                  }}
                />
                <ol className="relative grid grid-cols-4 gap-1">
                  {STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    const isComplete = idx < ACTIVE_STEP;
                    const isActive = idx === ACTIVE_STEP;
                    return (
                      <li key={step.key} className="flex flex-col items-center">
                        <div
                          className={cn(
                            "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all sm:h-9 sm:w-9",
                            isComplete &&
                              "border-primary bg-gradient-primary text-primary-foreground",
                            isActive &&
                              "animate-trust-pulse border-primary bg-background text-primary",
                            !isComplete &&
                              !isActive &&
                              "border-border bg-background text-muted-foreground",
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span
                          className={cn(
                            "mt-1.5 text-center text-[10px] font-medium leading-tight sm:text-xs",
                            isComplete || isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {step.label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Items */}
            <div className="px-5 py-5 sm:px-6">
              <ul className="space-y-3">
                {MOCK_ITEMS.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-soft text-xl">
                      {item.image}
                      <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shadow">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    </div>
                    <div className="font-numeric text-sm font-semibold text-foreground">
                      {formatEUR(item.priceGross * item.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px bg-border" />

            {/* Pricing */}
            <div className="px-5 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Zwischensumme</dt>
                  <dd className="font-numeric font-medium text-foreground">
                    {formatEUR(prices.subtotalGross)}
                  </dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Versand</dt>
                  <dd className="font-medium text-trust">Kostenlos</dd>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <dt>MwSt ({Math.round(prices.vatRate * 100)}%)</dt>
                  <dd className="font-numeric">{formatEUR(prices.totalVat)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                <span className="text-sm font-medium text-muted-foreground">Bezahlt</span>
                <span className="font-numeric text-3xl font-bold text-gradient-primary">
                  {formatEUR(prices.totalGross)}
                </span>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Address — Collapsible */}
            <Collapsible open={addressOpen} onOpenChange={setAddressOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Lieferadresse</p>
                    <p className="text-xs text-muted-foreground">
                      {MOCK_ADDRESS.name}, {MOCK_ADDRESS.city}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    addressOpen && "rotate-180",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-4 sm:px-6">
                <address className="ml-7 text-sm not-italic text-foreground">
                  <span className="font-semibold">{MOCK_ADDRESS.name}</span>
                  <br />
                  {MOCK_ADDRESS.street}
                  <br />
                  {MOCK_ADDRESS.zip} {MOCK_ADDRESS.city}
                  <br />
                  {MOCK_ADDRESS.country}
                </address>
              </CollapsibleContent>
            </Collapsible>

            <div className="h-px bg-border" />

            {/* Payment — Collapsible */}
            <Collapsible open={paymentOpen} onOpenChange={setPaymentOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Zahlungsart</p>
                    <p className="font-numeric text-xs text-muted-foreground">
                      SEPA · DE•• •••• 1234
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    paymentOpen && "rotate-180",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-4 sm:px-6">
                <p className="ml-7 text-xs text-muted-foreground">
                  Der Betrag von{" "}
                  <span className="font-semibold text-foreground">
                    {formatEUR(prices.totalGross)}
                  </span>{" "}
                  wird in den nächsten 1–2 Werktagen von deinem Konto abgebucht.
                </p>
              </CollapsibleContent>
            </Collapsible>

            <div className="h-px bg-border" />

            {/* Actions */}
            <div className="space-y-2 px-5 py-5 sm:px-6">
              <Button
                type="button"
                className="w-full justify-center gap-2 bg-gradient-primary shadow-elegant"
              >
                <Calendar className="h-4 w-4" />
                Liefertermin wählen
              </Button>
              <Button type="button" variant="outline" className="w-full justify-center gap-2">
                <FileText className="h-4 w-4" />
                Rechnung als PDF
              </Button>
            </div>
          </section>

          {/* TrustPanel */}
          <div
            className="animate-fade-in-down"
            style={{ animationDelay: "320ms", animationFillMode: "both" }}
          >
            <TrustPanel />
          </div>
        </div>

        <footer className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovaShop · Sicherer Checkout · SSL-verschlüsselt
        </footer>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
