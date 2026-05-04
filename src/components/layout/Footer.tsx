import Link from "next/link";
import { MapPin, Phone, Mail, Youtube } from "lucide-react";

import {
  SITE_CONFIG,
  SHOP_CATEGORIES,
  NAV_LINKS,
} from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-900 text-sand-200 mt-20">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="full" href={null} className="brightness-0 invert" />
            </div>
            <p className="text-sm text-sand-300 mb-6 leading-relaxed font-script text-xl">
              {SITE_CONFIG.tagline}.
            </p>
            <p className="text-xs text-sand-400 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wide text-sand-50 mb-5">
              Loja
            </h3>
            <ul className="space-y-2.5">
              {SHOP_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-sand-300 hover:text-wood-300 transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wide text-sand-50 mb-5">
              Navegar
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-300 hover:text-wood-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contacto"
                  className="text-sm text-sand-300 hover:text-wood-300 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg uppercase tracking-wide text-sand-50 mb-5">
              Visitar
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-sand-300 hover:text-wood-300 transition-colors group"
                >
                  <MapPin className="size-4 shrink-0 mt-0.5 group-hover:text-wood-300" />
                  <span>{SITE_CONFIG.address.fullAddress}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2.5 text-sm text-sand-300 hover:text-wood-300 transition-colors"
                >
                  <Mail className="size-4" />
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-charcoal-700">
              <p className="text-xs uppercase tracking-widest text-sand-400 mb-3">
                Horário
              </p>
              <ul className="space-y-1 text-xs">
                {SITE_CONFIG.hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between gap-4 text-sand-300"
                  >
                    <span>{h.day}</span>
                    <span className="text-right">
                      {h.closed
                        ? "Fechado"
                        : `${h.morning} · ${h.afternoon}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={SITE_CONFIG.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-sand-300 hover:text-wood-300 transition-colors"
            >
              <Youtube className="size-5" />
              {SITE_CONFIG.podcast.name}
            </a>
          </div>
        </div>

        <div className="border-t border-charcoal-700 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand-400">
          <p>
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/termos"
              className="hover:text-wood-300 transition-colors"
            >
              Termos
            </Link>
            <Link
              href="/privacidade"
              className="hover:text-wood-300 transition-colors"
            >
              Privacidade
            </Link>
            <Link
              href="/cookies"
              className="hover:text-wood-300 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
