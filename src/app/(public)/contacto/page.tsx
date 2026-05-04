import { Mail, MessageCircle } from "lucide-react";

import { SITE_CONFIG } from "@/data/site-config";
import { Container } from "@/components/ui/Container";

export default function ContactoPage() {
  return (
    <Container className="py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-wood-600 mb-3">
        Contacto
      </p>
      <h1 className="font-display text-5xl sm:text-6xl text-charcoal-900 mb-8 leading-tight">
        Falar connosco.
      </h1>
      <p className="text-lg text-charcoal-700 mb-12">
        Dúvidas sobre uma prancha, encomendas custom, ou simplesmente trocar
        uma ideia sobre o Guincho — manda mensagem.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={`mailto:${SITE_CONFIG.contact.email}`}
          className="group p-6 bg-white border border-sand-300 rounded-xl hover:border-wood-400 transition-colors"
        >
          <div className="size-12 rounded-lg bg-wood-100 text-wood-700 flex items-center justify-center mb-4 group-hover:bg-wood-500 group-hover:text-sand-50 transition-colors">
            <Mail className="size-6" />
          </div>
          <h2 className="font-display text-xl text-charcoal-900 mb-2">
            Email
          </h2>
          <p className="text-sm text-charcoal-700">
            {SITE_CONFIG.contact.email}
          </p>
        </a>

        <a
          href={SITE_CONFIG.address.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-white border border-sand-300 rounded-xl hover:border-wood-400 transition-colors"
        >
          <div className="size-12 rounded-lg bg-ocean-100 text-ocean-700 flex items-center justify-center mb-4 group-hover:bg-ocean-500 group-hover:text-sand-50 transition-colors">
            <MessageCircle className="size-6" />
          </div>
          <h2 className="font-display text-xl text-charcoal-900 mb-2">
            Aparece na loja
          </h2>
          <p className="text-sm text-charcoal-700">
            {SITE_CONFIG.address.fullAddress}
          </p>
        </a>
      </div>

      <div className="mt-16 p-8 bg-sand-100 rounded-xl">
        <p className="text-sm text-charcoal-700 italic">
          Em breve: formulário de contacto direto. Por agora, manda email ou
          aparece na loja — dá-te o mesmo trabalho e sai mais rápido.
        </p>
      </div>
    </Container>
  );
}
