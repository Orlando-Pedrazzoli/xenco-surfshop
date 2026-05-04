'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search } from 'lucide-react';

import { NAV_LINKS } from '@/data/site-config';
import { cn } from '@/lib/utils/utils';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/layout/Logo';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { StoreStatus } from '@/components/layout/StoreStatus';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='absolute top-0 left-0 right-0 z-40'>
      <div className='bg-charcoal-900 text-sand-200 text-xs'>
        <Container>
          <div className='flex items-center justify-between h-9'>
            <StoreStatus className='text-sand-200' />
            <div className='hidden lg:flex items-center gap-6'>
              <span>Envio para Portugal continental</span>
              <span>·</span>
              <a
                href='mailto:xenico1@gmail.com'
                className='hover:text-wood-300 transition-colors'
              >
                xenico1@gmail.com
              </a>
            </div>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-sand-50/95 backdrop-blur-sm border-b border-sand-300 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <Container>
          <div
            className={cn(
              'flex items-center justify-between h-16 lg:h-20',
              scrolled ? 'text-charcoal-900' : 'text-sand-50',
            )}
          >
            <Logo
              variant='full'
              className={cn(
                'transition-all',
                !scrolled && '[&_span]:!text-sand-50 brightness-0 invert',
              )}
            />

            <nav className='hidden lg:flex items-center gap-1'>
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors',
                    scrolled
                      ? 'text-charcoal-900 hover:text-wood-600'
                      : 'text-sand-50 hover:text-wood-300',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className='flex items-center gap-1'>
              <button
                aria-label='Procurar'
                className={cn(
                  'hidden sm:flex p-2 rounded-md transition-colors',
                  scrolled
                    ? 'text-charcoal-900 hover:bg-sand-200'
                    : 'text-sand-50 hover:bg-sand-50/10',
                )}
              >
                <Search className='size-5' />
              </button>

              <Link
                href='/conta'
                aria-label='Conta'
                className={cn(
                  'hidden sm:flex p-2 rounded-md transition-colors',
                  scrolled
                    ? 'text-charcoal-900 hover:bg-sand-200'
                    : 'text-sand-50 hover:bg-sand-50/10',
                )}
              >
                <User className='size-5' />
              </Link>

              <Link
                href='/carrinho'
                aria-label='Carrinho'
                className={cn(
                  'relative p-2 rounded-md transition-colors',
                  scrolled
                    ? 'text-charcoal-900 hover:bg-sand-200'
                    : 'text-sand-50 hover:bg-sand-50/10',
                )}
              >
                <ShoppingBag className='size-5' />
              </Link>

              <MobileMenu invertColors={!scrolled} />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
