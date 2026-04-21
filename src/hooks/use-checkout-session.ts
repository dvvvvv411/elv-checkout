import { useEffect, useState } from "react";
import type {
  CheckoutSession,
  CheckoutSessionError,
  CheckoutSessionErrorCode,
} from "@/lib/checkout-types";

const ENDPOINT =
  "https://jpielhyfzzznicvcanci.supabase.co/functions/v1/get-checkout-session";

interface State {
  data: CheckoutSession | null;
  loading: boolean;
  error: CheckoutSessionError | null;
  token: string | null;
}

function mapStatus(status: number, message?: string): CheckoutSessionError {
  if (status === 400)
    return { code: "invalid_token", message: message ?? "Ungültiger oder fehlender Token" };
  if (status === 404)
    return { code: "not_found", message: message ?? "Sitzung nicht gefunden" };
  if (status === 410)
    return { code: "already_used", message: message ?? "Sitzung wurde bereits verwendet" };
  return { code: "unknown", message: message ?? "Unbekannter Fehler" };
}

export function useCheckoutSession(): State {
  const [state, setState] = useState<State>({
    data: null,
    loading: true,
    error: null,
    token: null,
  });

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("token")
        : null;

    if (!token) {
      setState({
        data: null,
        loading: false,
        token: null,
        error: { code: "missing_token", message: "Kein Checkout-Token in der URL gefunden" },
      });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, token }));

    fetch(`${ENDPOINT}?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        } & Partial<CheckoutSession>;
        if (!res.ok) {
          const err = mapStatus(res.status, json.error);
          if (!cancelled) setState({ data: null, loading: false, error: err, token });
          return;
        }
        if (!cancelled)
          setState({ data: json as CheckoutSession, loading: false, error: null, token });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : "Netzwerkfehler";
        setState({
          data: null,
          loading: false,
          error: { code: "unknown" as CheckoutSessionErrorCode, message },
          token,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
