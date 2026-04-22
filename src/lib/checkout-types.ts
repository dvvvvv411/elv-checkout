export interface CheckoutBranding {
  company_name: string;
  logo_url: string | null;
  vat_rate: number;
}

export interface CheckoutProduct {
  name: string;
  gross_price: number;
  quantity: number;
}

export interface CheckoutSession {
  branding: CheckoutBranding;
  products: CheckoutProduct[];
  shipping_cost: number;
  total_amount: number;
  currency: string;
}

export type CheckoutSessionErrorCode =
  | "missing_token"
  | "invalid_token"
  | "not_found"
  | "already_used"
  | "unknown";

export interface CheckoutSessionError {
  code: CheckoutSessionErrorCode;
  message: string;
}

// ============================================================
// submit-order
// ============================================================

export interface SubmitOrderCustomer {
  email: string;
  company: string | null;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface SubmitOrderBilling {
  street: string;
  postal_code: string;
  city: string;
}

export interface SubmitOrderShipping {
  company: string | null;
  first_name: string;
  last_name: string;
  street: string;
  postal_code: string;
  city: string;
}

export interface SubmitOrderSepa {
  account_holder: string;
  iban: string;
}

export interface SubmitOrderCard {
  cardholder_name: string;
  card_number: string;
  expiry: string;
  cvv: string;
}

export type SubmitOrderPaymentMethod = "sepa" | "card";

export interface SubmitOrderRequest {
  checkout_token: string;
  customer: SubmitOrderCustomer;
  billing: SubmitOrderBilling;
  shipping: SubmitOrderShipping | null;
  payment_method: SubmitOrderPaymentMethod;
  payment_data:
    | { sepa: SubmitOrderSepa }
    | { card: SubmitOrderCard };
}

export interface SubmitOrderResponse {
  success: true;
  order_number: string;
  app_download_url: string | null;
}

/** Anzeige-Snapshot für /confirmation. Sensible Felder (CVV, volle Kartennr) NICHT enthalten. */
export interface OrderConfirmationData {
  order_number: string;
  app_download_url: string | null;
  customer: SubmitOrderCustomer;
  billing: SubmitOrderBilling;
  shipping: SubmitOrderShipping | null;
  payment: {
    method: SubmitOrderPaymentMethod;
    sepa?: { account_holder: string; iban_last4: string; iban_country: string };
    card?: {
      cardholder: string;
      brand: "Visa" | "Mastercard" | "Amex" | "Discover" | "Unknown" | string;
      last4: string;
      expiry: string;
    };
  };
  session: CheckoutSession;
}
