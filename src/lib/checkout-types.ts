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
