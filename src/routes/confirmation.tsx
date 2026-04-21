import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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
  ShoppingBag,
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
import { breakdownFromTotal, formatEUR } from "@/lib/checkout-utils";
import { cn } from "@/lib/utils";
import { CheckoutSessionProvider } from "@/lib/checkout-session-context";
import type { OrderConfirmationData } from "@/lib/checkout-types";

export const Route = createFileRoute("/confirmation")({
  head: () => ({
    meta: [
      { title: "Bestellbestätigung" },
      {
        name: "description",
        content: "Deine Bestellung wurde erfolgreich aufgegeben. Vielen Dank für deinen Einkauf.",
      },
    ],
  }),
  component: ConfirmationPage,
});

const STEPS = [
  { key: "received", label: "Eingegangen", icon: Check },
  { key: "processing", label: "Bearbeitung", icon: Package },
  { key: "shipped", label: "Versendet", icon: Truck },
  { key: "delivered", label: "Zugestellt", icon: CheckCircle2 },
] as const;

const ACTIVE_STEP = 1;

const BRAND_LABELS: Record<string, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
};

function ConfirmationPage() {
  const [order, setOrder] = useState<OrderConfirmationData | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("checkout:lastOrder");
      if (raw) setOrder(JSON.parse(raw) as OrderConfirmationData);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (order?.session.branding.company_name) {
      document.title = `Bestellbestätigung — ${order.session.branding.company_name}`;
    }
  }, [order]);

  if (!hydrated) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Keine Bestelldaten gefunden</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Diese Seite zeigt Details deiner letzten Bestellung. Bitte starte eine neue Bestellung
            über den Shop.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant"
          >
            Zur Startseite
          </Link>
        </main>
      </div>
    );
  }

  return (
    <CheckoutSessionProvider session={order.session} token={null}>
      <ConfirmationContent order={order} />
    </CheckoutSessionProvider>
  );
}

function ConfirmationContent({ order }: { order: OrderConfirmationData }) {
  const [addressOpen, setAddressOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const { session, customer, billing, shipping, payment, order_number, app_download_url } = order;
  const products = session.products;
  const subtotalGross = products.reduce((sum, p) => sum + p.gross_price * p.quantity, 0);
  const totalGross = session.total_amount;
  const vatRate = session.branding.vat_rate;
  const shippingCost = session.shipping_cost;
  const companyName = session.branding.company_name;
  const { totalVat } = breakdownFromTotal(totalGross, vatRate);

  // Lieferadresse: explizite Lieferadresse, sonst Rechnungsadresse + Customer-Name
  const deliveryAddress = shipping
    ? {
        name: `${shipping.first_name} ${shipping.last_name}`.trim(),
        company: shipping.company,
        street: shipping.street,
        zip: shipping.postal_code,
        city: shipping.city,
      }
    : {
        name: `${customer.first_name} ${customer.last_name}`.trim(),
        company: customer.company,
        street: billing.street,
        zip: billing.postal_code,
        city: billing.city,
      };

  const paymentSummary =
    payment.method === "sepa" && payment.sepa
      ? `IBAN: ${payment.sepa.iban_country}•• •••• ${payment.sepa.iban_last4}`
      : payment.card
        ? `${BRAND_LABELS[payment.card.brand] ?? payment.card.brand} · •••• ${payment.card.last4}`
        : "—";

  const paymentDetailLine =
    payment.method === "sepa"
      ? `Der Betrag von ${formatEUR(totalGross)} wird in den nächsten 1–2 Werktagen von deinem Konto abgebucht.`
      : `Der Betrag von ${formatEUR(totalGross)} wurde von deiner Kreditkarte autorisiert.`;

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
                  <span className="font-semibold text-foreground">{customer.email}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bestellnr.{" "}
                  <span className="font-numeric font-bold text-foreground">{order_number}</span>
                </p>
              </div>
            </div>
          </section>

          {/* ZONE 2 — App-Hero (Hauptfokus) — nur wenn App-Link vorhanden */}
          {app_download_url && (
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
                  Lade jetzt die App von {companyName} herunter, um fortzufahren.
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
                    href={app_download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-foreground px-5 py-3 text-background shadow-elegant transition-transform hover:scale-[1.02] sm:w-auto"
                  >
                    <Download className="h-5 w-5" strokeWidth={2.5} />
                    <div className="flex flex-col items-start leading-tight">
                      <span className="text-base font-bold">App herunterladen</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">
                        Direkt von {companyName}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* ZONE 3 — Deine Bestellung */}
          <section
            className="animate-fade-in-down rounded-3xl border border-border bg-card shadow-card"
            style={{ animationDelay: "240ms", animationFillMode: "both" }}
          >
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
              {products.length === 0 ? (
                <p className="text-sm text-muted-foreground">Keine Artikelinformationen verfügbar.</p>
              ) : (
                <ul className="space-y-3">
                  {products.map((item, idx) => (
                    <li key={`${item.name}-${idx}`} className="flex items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          <span className="font-numeric font-medium text-muted-foreground">
                            {item.quantity} ×
                          </span>{" "}
                          {item.name}
                        </p>
                      </div>
                      <div className="font-numeric text-sm font-semibold text-foreground">
                        {formatEUR(item.gross_price * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Pricing */}
            <div className="px-5 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Zwischensumme</dt>
                  <dd className="font-numeric font-medium text-foreground">
                    {formatEUR(subtotalGross)}
                  </dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Versand</dt>
                  <dd className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-trust">Kostenlos</span>
                    ) : (
                      <span className="font-numeric text-foreground">{formatEUR(shippingCost)}</span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <dt>MwSt ({Math.round(vatRate * 100)}%)</dt>
                  <dd className="font-numeric">{formatEUR(totalVat)}</dd>
                </div>
              </dl>
              <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                <span className="text-sm font-medium text-muted-foreground">Betrag</span>
                <span className="font-numeric text-3xl font-bold text-gradient-primary">
                  {formatEUR(totalGross)}
                </span>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Address */}
            <Collapsible open={addressOpen} onOpenChange={setAddressOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Lieferadresse</p>
                    <p className="text-xs text-muted-foreground">
                      {deliveryAddress.name}
                      {deliveryAddress.city ? `, ${deliveryAddress.city}` : ""}
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
                  <span className="font-semibold">{deliveryAddress.name}</span>
                  <br />
                  {deliveryAddress.company && (
                    <>
                      {deliveryAddress.company}
                      <br />
                    </>
                  )}
                  {deliveryAddress.street}
                  <br />
                  {deliveryAddress.zip} {deliveryAddress.city}
                  <br />
                  Deutschland
                </address>
              </CollapsibleContent>
            </Collapsible>

            <div className="h-px bg-border" />

            {/* Payment */}
            <Collapsible open={paymentOpen} onOpenChange={setPaymentOpen}>
              <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-secondary/40 sm:px-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">Zahlungsart</p>
                    <p className="font-numeric text-xs text-muted-foreground">{paymentSummary}</p>
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
                <p className="ml-7 text-xs text-muted-foreground">{paymentDetailLine}</p>
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
          © {new Date().getFullYear()} {companyName} · Sicherer Checkout · SSL-verschlüsselt
        </footer>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
