import { useState } from "react";
import { Tag, Package, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { applyDiscountCode, calculatePrices, formatEUR } from "@/lib/checkout-utils";
import { TrustPanel } from "./TrustPanel";
import { toast } from "sonner";

// Mock-Daten — werden später vom Backend übergeben
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

const VAT_RATE = 0.19; // vom Backend
const SHIPPING_GROSS = 0; // 0 = Kostenlos

export function OrderSummary() {
  const [code, setCode] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  const itemsGross = MOCK_ITEMS.reduce((sum, i) => sum + i.priceGross * i.quantity, 0);

  const prices = calculatePrices({
    itemsGross,
    shippingGross: SHIPPING_GROSS,
    discountGross: discount,
    vatRate: VAT_RATE,
  });

  const handleApply = () => {
    const value = applyDiscountCode(code, itemsGross);
    if (value > 0) {
      setDiscount(value);
      setAppliedCode(code.trim().toUpperCase());
      toast.success(`Rabattcode aktiv — du sparst ${formatEUR(value)}`);
    } else {
      toast.error("Ungültiger Rabattcode");
    }
  };

  return (
    <aside className="space-y-4">
      {/* Bestellung */}
      <div className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-foreground">
          <Package className="h-4 w-4 text-primary" />
          Deine Bestellung
        </h2>

        <ul className="space-y-3">
          {MOCK_ITEMS.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">
                  <span className="font-numeric font-medium text-muted-foreground">{item.quantity} ×</span>{" "}
                  {item.name}
                </p>
              </div>
              <div className="font-numeric text-sm font-semibold text-foreground">
                {formatEUR(item.priceGross * item.quantity)}
              </div>
            </li>
          ))}
        </ul>

        {/* Rabattcode */}
        <div className="mt-5">
          <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Tag className="h-3.5 w-3.5" />
            Rabattcode
          </label>
          <div className="flex gap-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Rabattcode"
              className="h-10 rounded-lg"
            />
            <Button
              type="button"
              onClick={handleApply}
              variant="outline"
              className="h-10 shrink-0 rounded-lg border-primary/30 text-primary hover:bg-primary/5"
            >
              Einlösen
            </Button>
          </div>
          {appliedCode && (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-trust">
              <Check className="h-3.5 w-3.5" />
              Code <span className="font-bold">{appliedCode}</span> aktiv
            </p>
          )}
        </div>

        <div className="my-5 h-px bg-border" />

        {/* Kostenaufschlüsselung */}
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <dt>Bruttobetrag</dt>
            <dd className="font-numeric font-medium text-foreground">{formatEUR(prices.subtotalGross)}</dd>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <dt>Versand</dt>
            <dd className="font-medium">
              {prices.shippingGross === 0 ? (
                <span className="text-trust">Kostenlos</span>
              ) : (
                <span className="font-numeric text-foreground">{formatEUR(prices.shippingGross)}</span>
              )}
            </dd>
          </div>
          {prices.discountGross > 0 && (
            <div className="flex justify-between">
              <dt className="text-trust">Rabatt</dt>
              <dd className="font-numeric font-medium text-trust">−{formatEUR(prices.discountGross)}</dd>
            </div>
          )}
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
          <span className="text-sm font-medium text-muted-foreground">Gesamt</span>
          <span className="font-numeric text-3xl font-bold text-gradient-primary">
            {formatEUR(prices.totalGross)}
          </span>
        </div>
      </div>

      <div className="hidden lg:block">
        <TrustPanel />
      </div>
    </aside>
  );
}
