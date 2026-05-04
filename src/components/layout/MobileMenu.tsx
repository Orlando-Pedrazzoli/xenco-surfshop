'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X, ShoppingBag, User, MapPin } from 'lucide-react';

import { NAV_LINKS, SHOP_CATEGORIES, SITE_CONFIG } from '@/data/site-config';
import { cn } from '@/lib/utils/utils';
import { Logo } from '@/components/layout/Logo';
import { StoreStatus } from '@/components/layout/StoreStatus';

interface MobileMenuProps {
  invertColors?: boolean;
}

export function MobileMenu({ invertColors = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            'lg:hidden p-2 -mr-2 rounded-md transition-colors',
            invertColors
              ? 'text-sand-50 hover:bg-sand-50/10'
              : 'text-charcoal-900 hover:bg-sand-200',
          )}
          aria-label='Abrir menu'
        >
          <Menu className='size-6' />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm data-[state=open]:animate-fade-in' />

        <Dialog.Content className='fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-sand-50 shadow-xl flex flex-col data-[state=open]:animate-slide-up'>
          <div className='flex items-center justify-between p-5 border-b border-sand-300'>
            <Logo variant='full' />
            <Dialog.Close className='p-2 -mr-2 text-charcoal-900 hover:bg-sand-200 rounded-md transition-colors'>
              <X className='size-5' />
              <span className='sr-only'>Fechar</span>
            </Dialog.Close>
          </div>

          <nav className='flex-1 overflow-y-auto px-5 py-6'>
            <div className='mb-8'>
              <p className='text-xs uppercase tracking-widest text-charcoal-400 mb-3'>
                Navegar
              </p>
              <ul className='space-y-1'>
                {NAV_LINKS.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className='block py-3 text-lg font-medium text-charcoal-900 hover:text-wood-600 transition-colors'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='mb-8'>
              <p className='text-xs uppercase tracking-widest text-charcoal-400 mb-3'>
                Loja
              </p>
              <ul className='space-y-1'>
                {SHOP_CATEGORIES.map(cat => (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      onClick={() => setOpen(false)}
                      className='block py-2.5 text-base text-charcoal-700 hover:text-wood-600 transition-colors'
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='mb-8 space-y-2'>
              <Link
                href='/conta'
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 py-3 text-base text-charcoal-700 hover:text-wood-600 transition-colors'
              >
                <User className='size-5' />A minha conta
              </Link>
              <Link
                href='/carrinho'
                onClick={() => setOpen(false)}
                className='flex items-center gap-3 py-3 text-base text-charcoal-700 hover:text-wood-600 transition-colors'
              >
                <ShoppingBag className='size-5' />
                Carrinho
              </Link>
            </div>
          </nav>

          <div className='border-t border-sand-300 p-5 space-y-3'>
            <StoreStatus />
            <a
              href={SITE_CONFIG.address.googleMapsUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-start gap-2 text-xs text-charcoal-700 hover:text-wood-600 transition-colors'
            >
              <MapPin className='size-4 shrink-0 mt-0.5' />
              <span>{SITE_CONFIG.address.fullAddress}</span>
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
