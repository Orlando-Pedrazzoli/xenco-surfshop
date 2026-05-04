import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, Wrench, Recycle } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <section className='relative w-full aspect-[16/9] overflow-hidden'>
        <Image
          src='/images/hero-guincho.jpg'
          alt='Xen&Co Surf Shop - Histórias, Ondas, Gente, Guincho'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
          quality={90}
        />
      </section>

      <section className='py-20 bg-sand-50'>
        <Container>
          <div className='text-center mb-14 max-w-2xl mx-auto'>
            <p className='text-xs uppercase tracking-widest text-wood-600 mb-3'>
              Como compras
            </p>
            <h2 className='font-display text-4xl sm:text-5xl text-charcoal-900 mb-4'>
              Três formas de levares a tua prancha
            </h2>
            <p className='text-charcoal-700'>
              Cada surfista tem a sua história — e o seu orçamento. Encontra a
              forma que faz sentido para ti.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <FeatureCard
              icon={<Wrench className='size-7' />}
              title='Sob encomenda Semente'
              description='22 modelos para configurares ao teu peso e estilo. Pronta em 30 dias, shapada em Portugal pela Semente.'
              cta='Configurar a tua'
              href='/loja/encomenda'
              accent='wood'
            />
            <FeatureCard
              icon={<Compass className='size-7' />}
              title='Pranchas novas em stock'
              description='Para quem não quer esperar. Pranchas Semente, Ghia e outras marcas, prontas para sair pela porta hoje mesmo.'
              cta='Ver disponíveis'
              href='/loja/pranchas/novas'
              accent='ocean'
            />
            <FeatureCard
              icon={<Recycle className='size-7' />}
              title='Pranchas usadas'
              description='Cada uma com a sua história. Inspecionadas, fotografadas em detalhe, com histórico completo de reparações.'
              cta='Encontrar uma'
              href='/loja/pranchas/usadas'
              accent='charcoal'
            />
          </div>
        </Container>
      </section>

      <section className='py-20 bg-charcoal-900 text-sand-50'>
        <Container>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <p className='text-xs uppercase tracking-widest text-wood-300 mb-3'>
                Xenico Podcast
              </p>
              <h2 className='font-display text-4xl sm:text-5xl mb-6 leading-tight'>
                Se há coisa que o tempo me ensinou, é que uma onda nunca se
                repete.
              </h2>
              <p className='text-sand-300 mb-8 leading-relaxed'>
                Histórias do Guincho contadas por quem o surfa há 40 anos.
                Caldos memoráveis, encontros improváveis e entrevistas com quem
                vive para o mar.
              </p>
              <Button size='lg' variant='secondary' asChild>
                <Link href='/historias'>
                  Ouvir as histórias
                  <ArrowRight className='size-5' />
                </Link>
              </Button>
            </div>
            <div className='aspect-video bg-charcoal-700 rounded-lg flex items-center justify-center text-sand-400 text-sm'>
              [Vídeo destaque do Xenico Podcast]
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  cta,
  href,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: 'wood' | 'ocean' | 'charcoal';
}) {
  const accentClasses = {
    wood: 'bg-wood-100 text-wood-700 group-hover:bg-wood-500 group-hover:text-sand-50',
    ocean:
      'bg-ocean-100 text-ocean-700 group-hover:bg-ocean-500 group-hover:text-sand-50',
    charcoal:
      'bg-sand-200 text-charcoal-900 group-hover:bg-charcoal-900 group-hover:text-sand-50',
  };

  return (
    <Link
      href={href}
      className='group block bg-white rounded-xl p-8 border border-sand-300 hover:border-wood-400 transition-colors'
    >
      <div
        className={`size-14 rounded-lg flex items-center justify-center mb-6 transition-colors ${accentClasses[accent]}`}
      >
        {icon}
      </div>
      <h3 className='font-display text-2xl text-charcoal-900 mb-3'>{title}</h3>
      <p className='text-sm text-charcoal-700 leading-relaxed mb-6'>
        {description}
      </p>
      <span className='inline-flex items-center gap-2 text-sm font-medium text-wood-600 group-hover:gap-3 transition-all'>
        {cta}
        <ArrowRight className='size-4' />
      </span>
    </Link>
  );
}
