import { Package } from "lucide-react";
import { breakdownFromTotal, formatEUR } from "@/lib/checkout-utils";
import { TrustPanel } from "./TrustPanel";
import { useCheckoutSessionContext } from "@/lib/checkout-session-context";

export function OrderSummary() {
  const { session } = useCheckoutSessionContext();
  const { branding, products, shipping_cost, total_amount } = session;

  const subtotalGross = products.reduce((sum, p) => sum + p.gross_price * p.quantity, 0);
  const { totalNet, totalVat } = breakdownFromTotal(total_amount, branding.vat_rate);

  return (
    <aside className="space-y-4">
      {/* Bestellung */}
      <div className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
          <Package className="h-4 w-4 text-primary" />
          Deine Bestellung
        </h2>

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

        <div className="my-5 h-px bg-border" />

        {/* Kostenaufschlüsselung */}
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Bruttobetrag</dt>
            <dd className="font-numeric font-medium text-foreground">{formatEUR(subtotalGross)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Versand</dt>
            <dd className="font-medium">
              {shipping_cost === 0 ? (
                <span className="text-trust">Kostenlos</span>
              ) : (
                <span className="font-numeric text-foreground">{formatEUR(shipping_cost)}</span>
              )}
            </dd>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <dt>Nettobetrag</dt>
            <dd className="font-numeric">{formatEUR(totalNet)}</dd>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <dt>MwSt ({Math.round(branding.vat_rate * 100)}%)</dt>
            <dd className="font-numeric">{formatEUR(totalVat)}</dd>
          </div>
        </dl>

        <div className="my-4 h-px bg-border" />

        <div className="flex items-end justify-between">
          <span className="text-sm font-medium text-muted-foreground">Gesamt</span>
          <span className="font-numeric text-3xl font-bold text-gradient-primary">
            {formatEUR(total_amount)}
          </span>
        </div>
      </div>

      <div className="hidden lg:block">
        <TrustPanel />
      </div>
    </aside>
  );
}
