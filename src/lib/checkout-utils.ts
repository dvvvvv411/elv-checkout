/**
 * Preisberechnung für Checkout.
 * Frontend bekommt nur Bruttopreise + MwSt-Satz vom Backend.
 * Netto = Brutto / (1 + Satz). MwSt = Brutto - Netto.
 */

export function formatEUR(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export interface PriceBreakdown {
  subtotalGross: number; // Zwischensumme (Produkte, brutto)
  shippingGross: number; // Versand brutto (0 = kostenlos)
  discountGross: number; // Rabatt brutto
  totalGross: number; // Endsumme brutto
  totalNet: number; // Netto
  totalVat: number; // MwSt-Betrag
  vatRate: number; // z.B. 0.19
}

export function calculatePrices(args: {
  itemsGross: number;
  shippingGross: number;
  discountGross: number;
  vatRate: number;
}): PriceBreakdown {
  const subtotalGross = args.itemsGross;
  const totalGross = Math.max(0, subtotalGross + args.shippingGross - args.discountGross);
  const totalNet = totalGross / (1 + args.vatRate);
  const totalVat = totalGross - totalNet;
  return {
    subtotalGross,
    shippingGross: args.shippingGross,
    discountGross: args.discountGross,
    totalGross,
    totalNet,
    totalVat,
    vatRate: args.vatRate,
  };
}

/** Mock-Rabattcodes — später vom Backend validiert */
export function applyDiscountCode(code: string, subtotalGross: number): number {
  const normalized = code.trim().toUpperCase();
  if (normalized === "WILLKOMMEN10") return subtotalGross * 0.1;
  if (normalized === "SUMMER20") return subtotalGross * 0.2;
  return 0;
}

/**
 * Leitet Netto und MwSt-Betrag aus einem Bruttobetrag und MwSt-Satz ab.
 * Reine Anzeige-Helper — Server-Truth bleibt totalGross.
 */
export function breakdownFromTotal(
  totalGross: number,
  vatRate: number,
): { totalNet: number; totalVat: number } {
  const totalNet = totalGross / (1 + vatRate);
  const totalVat = totalGross - totalNet;
  return { totalNet, totalVat };
}
