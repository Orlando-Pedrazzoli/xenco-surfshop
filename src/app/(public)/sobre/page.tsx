import { Container } from "@/components/ui/Container";

export default function SobrePage() {
  return (
    <Container className="py-20 max-w-3xl">
      <p className="text-xs uppercase tracking-widest text-wood-600 mb-3">
        Sobre nós
      </p>
      <h1 className="font-display text-5xl sm:text-6xl text-charcoal-900 mb-8 leading-tight">
        40 anos de Guincho.
      </h1>
      <div className="space-y-6 text-charcoal-700 leading-relaxed text-lg">
        <p>
          Chamo-me Xenico. Faço surf há 40 anos na Praia do Guincho. Tenho
          histórias que dariam para encher um bom livro — mas como sou mais de
          falar do que de escrever, hoje conto-as no podcast e, agora, também
          aqui.
        </p>
        <p>
          A Xen&Co Surf Shop é uma loja pequena, em madeira, na Avenida Nossa
          Senhora da Assunção em Malveira da Serra. Quem entra nota duas
          coisas: muita madeira velha e muitas pranchas antigas penduradas. As
          pranchas não estão lá por decoração — estão lá porque cada uma conta
          uma sessão, uma viagem, uma onda que valeu a pena.
        </p>
        <p>
          Vendemos pranchas novas e usadas, fazemos pranchas Semente sob
          encomenda, temos wetsuits Rip Curl, acessórios da FCS, Futures,
          Dakine, Ocean Earth, Sex Wax, Fuwax, e a nossa linha própria de
          roupa. Tudo escolhido por quem usa, para quem usa.
        </p>
        <p className="font-script text-3xl text-wood-600 pt-4">
          Ah pois não!
        </p>
      </div>
    </Container>
  );
}
