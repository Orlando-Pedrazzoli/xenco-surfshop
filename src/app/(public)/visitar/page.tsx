import { MapPin, Clock, Mail, Phone } from "lucide-react";

import { SITE_CONFIG } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function VisitarPage() {
  return (
    <Container className="py-20">
      <div className="max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-widest text-wood-600 mb-3">
          Visitar
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-charcoal-900 mb-6 leading-tight">
          Vem ter connosco.
        </h1>
        <p className="text-lg text-charcoal-700">
          A loja é pequena, mas tem alma. Aparece, fala connosco, experimenta
          uma prancha. O Guincho está logo ali à esquina.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex items-start gap-4 mb-3">
              <div className="size-10 rounded-lg bg-wood-100 text-wood-700 flex items-center justify-center shrink-0">
                <MapPin className="size-5" />
              </div>
              <div>
                <h2 className="font-display text-xl text-charcoal-900 mb-1">
                  Onde estamos
                </h2>
                <p className="text-charcoal-700">
                  {SITE_CONFIG.address.fullAddress}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="ml-14">
              <a
                href={SITE_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir no Google Maps
              </a>
            </Button>
          </div>

          <div>
            <div className="flex items-start gap-4 mb-3">
              <div className="size-10 rounded-lg bg-wood-100 text-wood-700 flex items-center justify-center shrink-0">
                <Clock className="size-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl text-charcoal-900 mb-3">
                  Horário
                </h2>
                <ul className="space-y-1.5">
                  {SITE_CONFIG.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between text-sm text-charcoal-700 border-b border-sand-200 pb-1.5"
                    >
                      <span className="font-medium">{h.day}</span>
                      <span>
                        {h.closed ? (
                          <span className="text-charcoal-400">Fechado</span>
                        ) : (
                          `${h.morning} · ${h.afternoon}`
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="size-10 rounded-lg bg-wood-100 text-wood-700 flex items-center justify-center shrink-0">
              <Mail className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-xl text-charcoal-900 mb-1">
                Contacto
              </h2>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-charcoal-700 hover:text-wood-600 transition-colors"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="aspect-square lg:aspect-auto rounded-lg overflow-hidden bg-sand-200">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=&q=Xen%26Co+Surf+Shop+Malveira+da+Serra&zoom=15`}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Xen&Co Surf Shop"
          />
        </div>
      </div>
    </Container>
  );
}
