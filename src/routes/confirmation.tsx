import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Truck,
  CreditCard,
  Mail,
  Package,
  FileText,
  ShieldCheck,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  Calendar,
  Clock,
  Check,
} from "lucide-react";

import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { SectionCard } from "@/components/checkout/SectionCard";
import { TrustPanel } from "@/components/checkout/TrustPanel";
import { Button } from "@/components/ui/button";
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
  { key: "processing", label: "In Bearbeitung", icon: Package },
  { key: "shipped", label: "Versendet", icon: Truck },
  { key: "delivered", label: "Zugestellt", icon: CheckCircle2 },
] as const;

const ACTIVE_STEP = 1; // 0-indexed

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function ConfirmationPage() {
  const orderNumber = useMemo(() => {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `NS-2026-${random}`;
  }, []);

  const today = new Date();
  const deliveryDate = addBusinessDays(today, 3);

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

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Hero / Success Banner */}
        <section
          className="animate-fade-in-down relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-soft p-6 shadow-card sm:p-10"
          style={{ animationDelay: "80ms", animationFillMode: "both" }}
        >
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary-glow opacity-10 blur-3xl" />

          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-primary shadow-elegant">
              <CheckCircle2 className="animate-star-pop h-12 w-12 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-trust">
                Bestellung bestätigt
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                Vielen Dank für deine Bestellung!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Eine Bestätigung wurde an{" "}
                <span className="font-semibold text-foreground">{MOCK_EMAIL}</span> gesendet.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs text-muted-foreground">Bestellnummer:</span>
                <span className="font-numeric text-sm font-bold text-foreground">{orderNumber}</span>
              </div>
            </div>
          </div>

          {/* Mini Stats */}
          <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/80 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bestelldatum</p>
                <p className="text-sm font-semibold text-foreground">{formatDate(today)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/80 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Voraussichtliche Lieferung</p>
                <p className="text-sm font-semibold text-foreground">bis {formatDate(deliveryDate)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Left column */}
          <div className="space-y-5 lg:col-span-3">
            {/* Lieferstatus Stepper */}
            <div
              className="animate-fade-in-down"
              style={{ animationDelay: "160ms", animationFillMode: "both" }}
            >
              <SectionCard title="Lieferstatus" icon={<Truck className="h-4 w-4" />}>
                <div className="relative">
                  {/* Background line */}
                  <div className="absolute left-0 right-0 top-5 mx-6 h-0.5 bg-border" />
                  {/* Progress line */}
                  <div
                    className="absolute left-0 top-5 ml-6 h-0.5 bg-gradient-primary transition-all"
                    style={{
                      width: `calc(${(ACTIVE_STEP / (STEPS.length - 1)) * 100}% - 1.5rem)`,
                    }}
                  />
                  <ol className="relative grid grid-cols-4 gap-2">
                    {STEPS.map((step, idx) => {
                      const Icon = step.icon;
                      const isComplete = idx < ACTIVE_STEP;
                      const isActive = idx === ACTIVE_STEP;
                      return (
                        <li key={step.key} className="flex flex-col items-center">
                          <div
                            className={cn(
                              "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                              isComplete && "border-primary bg-gradient-primary text-primary-foreground",
                              isActive &&
                                "animate-trust-pulse border-primary bg-background text-primary",
                              !isComplete && !isActive && "border-border bg-background text-muted-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span
                            className={cn(
                              "mt-2 text-center text-[11px] font-medium leading-tight sm:text-xs",
                              isComplete || isActive ? "text-foreground" : "text-muted-foreground",
                            )}
                          >
                            {step.label}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <p className="mt-5 rounded-lg bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                  Wir bereiten deine Bestellung gerade vor. Du erhältst eine E-Mail, sobald das Paket
                  unterwegs ist.
                </p>
              </SectionCard>
            </div>

            {/* Lieferadresse */}
            <div
              className="animate-fade-in-down"
              style={{ animationDelay: "240ms", animationFillMode: "both" }}
            >
              <SectionCard title="Lieferadresse" icon={<Truck className="h-4 w-4" />}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Empfänger
                    </p>
                    <address className="text-sm not-italic text-foreground">
                      <span className="font-semibold">{MOCK_ADDRESS.name}</span>
                      <br />
                      {MOCK_ADDRESS.street}
                      <br />
                      {MOCK_ADDRESS.zip} {MOCK_ADDRESS.city}
                      <br />
                      {MOCK_ADDRESS.country}
                    </address>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Versandart
                    </p>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Truck className="h-4 w-4 text-primary" />
                      <span className="font-medium">DHL Standard-Versand</span>
                    </div>
                    <p className="mt-1 text-xs text-trust font-medium">Kostenlos · 2–3 Werktage</p>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Zahlungsart */}
            <div
              className="animate-fade-in-down"
              style={{ animationDelay: "320ms", animationFillMode: "both" }}
            >
              <SectionCard title="Zahlungsart" icon={<CreditCard className="h-4 w-4" />}>
                <div className="flex items-start gap-4 rounded-xl border border-border/60 bg-secondary/30 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">SEPA-Lastschrift</p>
                    <p className="font-numeric mt-0.5 text-sm text-muted-foreground">
                      DE•• •••• •••• •••• 1234
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Der Betrag von{" "}
                      <span className="font-semibold text-foreground">{formatEUR(prices.totalGross)}</span>{" "}
                      wird in den nächsten 1–2 Werktagen von deinem Konto abgebucht.
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Was passiert als Nächstes */}
            <div
              className="animate-fade-in-down"
              style={{ animationDelay: "400ms", animationFillMode: "both" }}
            >
              <SectionCard title="Was passiert als Nächstes?" icon={<Clock className="h-4 w-4" />}>
                <ol className="space-y-4">
                  {[
                    {
                      icon: Mail,
                      title: "Bestätigungs-E-Mail",
                      desc: "Du erhältst in wenigen Minuten eine E-Mail mit allen Details zu deiner Bestellung.",
                    },
                    {
                      icon: Package,
                      title: "Wir verpacken deine Bestellung",
                      desc: "Unser Team kommissioniert und verpackt deine Artikel sorgfältig — meist innerhalb von 24 Stunden.",
                    },
                    {
                      icon: Truck,
                      title: "Versand & Tracking",
                      desc: "Sobald das Paket unterwegs ist, bekommst du eine Sendungsnummer zum Verfolgen.",
                    },
                  ].map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <li key={idx} className="flex gap-4">
                        <div className="relative">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="font-numeric absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-bold text-primary-foreground shadow">
                            {idx + 1}
                          </div>
                        </div>
                        <div className="flex-1 pt-0.5">
                          <p className="text-sm font-semibold text-foreground">{step.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{step.desc}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </SectionCard>
            </div>
          </div>

          {/* Right sticky column */}
          <aside className="space-y-5 lg:col-span-2">
            <div className="lg:sticky lg:top-24 space-y-4">
              {/* Bestellübersicht */}
              <div
                className="animate-fade-in-down rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6"
                style={{ animationDelay: "200ms", animationFillMode: "both" }}
              >
                <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  Bestellübersicht
                </h2>

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
                        <p className="truncate text-xs text-muted-foreground">{item.variant}</p>
                      </div>
                      <div className="font-numeric text-sm font-semibold text-foreground">
                        {formatEUR(item.priceGross * item.quantity)}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="my-4 h-px bg-border" />

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
                    <dt>Nettobetrag</dt>
                    <dd className="font-numeric">{formatEUR(prices.totalNet)}</dd>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <dt>MwSt ({Math.round(prices.vatRate * 100)}%)</dt>
                    <dd className="font-numeric">{formatEUR(prices.totalVat)}</dd>
                  </div>
                </dl>

                <div className="my-4 h-px bg-border" />

                <div className="flex items-end justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Bezahlt</span>
                  <span className="font-numeric text-3xl font-bold text-gradient-primary">
                    {formatEUR(prices.totalGross)}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <Button type="button" variant="outline" className="w-full justify-center gap-2">
                    <FileText className="h-4 w-4" />
                    Rechnung als PDF
                  </Button>
                  <Button type="button" className="w-full justify-center gap-2 bg-gradient-primary shadow-elegant">
                    <Truck className="h-4 w-4" />
                    Bestellung verfolgen
                  </Button>
                </div>
              </div>

              <TrustPanel />
            </div>
          </aside>
        </div>

        {/* Help Section */}
        <section
          className="animate-fade-in-down mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
          style={{ animationDelay: "480ms", animationFillMode: "both" }}
        >
          {[
            {
              icon: HelpCircle,
              title: "Fragen zur Bestellung?",
              desc: "Unser Support hilft dir gerne weiter — werktags von 8 bis 20 Uhr.",
              cta: "Support kontaktieren",
            },
            {
              icon: RotateCcw,
              title: "Rückgabe & Umtausch",
              desc: "30 Tage kostenlose Rückgabe — ohne Wenn und Aber.",
              cta: "Mehr erfahren",
            },
            {
              icon: ShieldCheck,
              title: "Käuferschutz",
              desc: "Deine Bestellung ist durch unseren Käuferschutz vollständig abgesichert.",
              cta: "Details ansehen",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/40 hover:shadow-elegant"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  {item.cta}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </section>

        {/* CTA Banner */}
        <section
          className="animate-fade-in-down mt-8 overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center shadow-elegant sm:p-12"
          style={{ animationDelay: "560ms", animationFillMode: "both" }}
        >
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            Entdecke noch mehr bei NovaShop
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary-foreground/90 sm:text-base">
            Stöbere durch unser Sortiment und finde dein nächstes Lieblingsprodukt.
          </p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-6 gap-2 bg-background text-foreground shadow hover:bg-background/90"
          >
            <Link to="/">
              Weiter einkaufen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>

        <footer className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NovaShop · Sicherer Checkout · SSL-verschlüsselt
        </footer>
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
