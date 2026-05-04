import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn(
    "[Resend] RESEND_API_KEY não definida. Emails não serão enviados."
  );
}

export const resend = new Resend(RESEND_API_KEY ?? "re_placeholder");

export const EMAIL_CONFIG = {
  from: `${process.env.RESEND_FROM_NAME ?? "Xen&Co Surf Shop"} <${
    process.env.RESEND_FROM_EMAIL ?? "encomendas@xencosurfshop.pt"
  }>`,
  replyTo: "xenico1@gmail.com",
} as const;
