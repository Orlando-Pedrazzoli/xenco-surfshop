import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Xen&Co Surf Shop · Malveira da Serra · Guincho",
    template: "%s · Xen&Co Surf Shop",
  },
  description:
    "Surf shop emblemática da Malveira da Serra. Pranchas Semente sob encomenda, pranchas usadas, wetsuits e acessórios. 40 anos de surf no Guincho.",
  keywords: [
    "surf shop",
    "Guincho",
    "Malveira da Serra",
    "Cascais",
    "pranchas Semente",
    "pranchas usadas",
    "wetsuits Rip Curl",
    "FCS Futures",
  ],
  authors: [{ name: "Xenico" }],
  creator: "Xen&Co Surf Shop",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: "/",
    siteName: "Xen&Co Surf Shop",
    title: "Xen&Co Surf Shop · 40 anos de surf no Guincho",
    description:
      "Pranchas Semente sob encomenda, pranchas usadas, wetsuits e acessórios. Malveira da Serra, Cascais.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${caveat.variable}`}>
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
