import type { OrderConfirmationData } from "./checkout-types";

const ENDPOINT =
  "https://jpielhyfzzznicvcanci.supabase.co/functions/v1/get-order-confirmation";

export type OrderFetchErrorKind =
  | "invalid_input"
  | "not_found"
  | "network"
  | "unknown";

export class OrderFetchError extends Error {
  kind: OrderFetchErrorKind;
  status?: number;
  constructor(kind: OrderFetchErrorKind, message: string, status?: number) {
    super(message);
    this.kind = kind;
    this.status = status;
  }
}

const ORDER_NUMBER_RE = /^\d{7}$/;

export async function fetchOrderConfirmation(
  orderNumber: string,
): Promise<OrderConfirmationData> {
  if (!ORDER_NUMBER_RE.test(orderNumber)) {
    throw new OrderFetchError(
      "invalid_input",
      "Ungültige Bestellnummer (muss 7 Ziffern haben)",
    );
  }

  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}?order_number=${encodeURIComponent(orderNumber)}`, {
      method: "GET",
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Netzwerkfehler";
    throw new OrderFetchError("network", `Netzwerkfehler: ${msg}`);
  }

  if (res.status === 404) {
    throw new OrderFetchError(
      "not_found",
      "Bestellung nicht gefunden",
      404,
    );
  }

  const json = (await res.json().catch(() => ({}))) as
    | OrderConfirmationData
    | { error?: string; message?: string };

  if (!res.ok) {
    const errMsg =
      (json as { error?: string; message?: string }).error ??
      (json as { error?: string; message?: string }).message ??
      `Unbekannter Fehler (HTTP ${res.status})`;
    throw new OrderFetchError("unknown", errMsg, res.status);
  }

  return json as OrderConfirmationData;
}
