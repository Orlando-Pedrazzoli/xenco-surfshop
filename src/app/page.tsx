export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-sand-50 px-6">
      <div className="max-w-2xl text-center">
        <p className="text-sm uppercase tracking-widest text-wood-600 mb-4">
          Sprint 0 · Setup completo
        </p>
        <h1 className="text-6xl md:text-8xl font-display text-charcoal-900 mb-6">
          XEN&CO.
        </h1>
        <p className="text-xl text-charcoal-700 mb-2">Surf Shop</p>
        <p className="text-lg italic text-wood-700 mb-12 font-script text-3xl">
          40 anos de surf no Guincho.
        </p>

        <div className="bg-white border border-wood-200 rounded-lg p-8 text-left space-y-3">
          <h2 className="font-sans text-base font-medium text-charcoal-900 mb-4">
            Sistema operacional:
          </h2>
          <CheckItem label="Next.js 16 + React 19 + TypeScript" />
          <CheckItem label="Tailwind v4 com tokens da identidade Xen&Co" />
          <CheckItem label="MongoDB Atlas (Mongoose 9)" />
          <CheckItem label="NextAuth v5 (credentials + Google)" />
          <CheckItem label="Stripe (cartão · MB WAY · Multibanco · Klarna)" />
          <CheckItem label="Cloudinary para fotos" />
          <CheckItem label="Resend para emails" />
          <CheckItem label="22 modelos Semente prontos para carregar" />
        </div>

        <p className="mt-8 text-sm text-charcoal-400">
          Em breve: Sprint 1 — Catálogo, página inicial, navegação
        </p>
      </div>
    </main>
  );
}

function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3 text-charcoal-700">
      <span className="text-ocean-500 font-medium mt-0.5">✓</span>
      <span className="font-sans text-sm">{label}</span>
    </div>
  );
}
