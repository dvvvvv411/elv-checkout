import { createContext, useContext, type ReactNode } from "react";
import type { CheckoutSession } from "./checkout-types";

interface CheckoutSessionContextValue {
  session: CheckoutSession;
  token: string | null;
}

const CheckoutSessionContext = createContext<CheckoutSessionContextValue | null>(null);

export function CheckoutSessionProvider({
  session,
  token,
  children,
}: {
  session: CheckoutSession;
  token: string | null;
  children: ReactNode;
}) {
  return (
    <CheckoutSessionContext.Provider value={{ session, token }}>
      {children}
    </CheckoutSessionContext.Provider>
  );
}

export function useCheckoutSessionContext(): CheckoutSessionContextValue {
  const ctx = useContext(CheckoutSessionContext);
  if (!ctx)
    throw new Error("useCheckoutSessionContext must be used inside CheckoutSessionProvider");
  return ctx;
}

/** Optionaler Zugriff — gibt null zurück, wenn kein Provider vorhanden ist (z.B. /confirmation ohne Token). */
export function useOptionalCheckoutSession(): CheckoutSessionContextValue | null {
  return useContext(CheckoutSessionContext);
}
