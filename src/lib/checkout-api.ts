import type { SubmitOrderRequest, SubmitOrderResponse } from "./checkout-types";

const ENDPOINT =
  "https://jpielhyfzzznicvcanci.supabase.co/functions/v1/submit-order";

function mapError(status: number, body: { error?: string; message?: string }): string {
  const fallback = body.error ?? body.message;
  if (status === 400) return fallback ?? "Validierung fehlgeschlagen";
  if (status === 404) return fallback ?? "Sitzung nicht gefunden";
  if (status === 410) return fallback ?? "Sitzung wurde bereits verwendet";
  if (status === 405) return fallback ?? "Methode nicht erlaubt";
  if (status >= 500) return fallback ?? "Serverfehler — bitte später erneut versuchen";
  return fallback ?? `Unbekannter Fehler (HTTP ${status})`;
}

export async function submitOrder(payload: SubmitOrderRequest): Promise<SubmitOrderResponse> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Netzwerkfehler";
    throw new Error(`Netzwerkfehler: ${msg}`);
  }

  const json = (await res.json().catch(() => ({}))) as {
    error?: string;
    message?: string;
  } & Partial<SubmitOrderResponse>;

  if (!res.ok) {
    throw new Error(mapError(res.status, json));
  }

  return json as SubmitOrderResponse;
}
