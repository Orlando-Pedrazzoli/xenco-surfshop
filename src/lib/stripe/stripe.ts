import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY não está definida no .env.local");
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
  typescript: true,
  appInfo: {
    name: "Xen&Co Surf Shop",
    version: "1.0.0",
  },
});

type CheckoutPaymentMethod =
  | "card"
  | "multibanco"
  | "mb_way"
  | "klarna";

export const STRIPE_CONFIG = {
  currency: "eur",
  paymentMethods: [
    "card",
    "multibanco",
    "mb_way",
    "klarna",
  ] as CheckoutPaymentMethod[],
  locale: "pt" as const,

  applePayCountry: "PT",
  vatRate: Number(process.env.VAT_RATE) || 0.23,
} as const;

export function formatStripeAmount(amountInEuros: number): number {
  return Math.round(amountInEuros * 100);
}

export function fromStripeAmount(amountInCents: number): number {
  return amountInCents / 100;
}
