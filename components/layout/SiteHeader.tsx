'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InstagramIcon from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';
import { ButtonArrow } from '@/components/ui/ButtonLink';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/site';

const NAV_LINKS = [
  { href: '/galerie', label: 'Galeries' },
  { href: '/commentaires', label: "Livre d'or" },
  { href: '/contact', label: 'Contact' },
];

const MOBILE_MENU_ID = 'menu-mobile';

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

function HeaderContent({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Menu mobile ouvert : on bloque le défilement de la page et Échap le referme.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className="relative z-40 bg-ink text-paper">
      {/* Bandeau supérieur */}
      <div className="border-b border-white/15">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-9 flex items-center justify-between kicker text-white/50">
          <span>Marseille</span>
          <span className="hidden sm:inline">Portrait · Street · Paysage</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-paper transition"
            aria-label="Instagram (nouvel onglet)"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-6 md:py-8 grid grid-cols-3 items-center">
        <nav className="hidden md:block" aria-label="Navigation principale">
          <ul className="flex gap-8">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                  className="kicker link-draw pb-1 transition-colors text-white/60 hover:text-paper aria-[current=page]:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/"
          onClick={close}
          aria-label="DGZ Photographie — Accueil"
          className="col-start-2 justify-self-center block"
        >
          <Logo
            light
            priority
            decorative
            sizes="(min-width: 768px) 160px, 120px"
            className="w-[120px] md:w-[160px] animate-sign [--d:150ms]"
          />
        </Link>

        <div className="hidden md:flex justify-end">
          <Link
            href="/contact"
            aria-current={isActive(pathname, '/contact') ? 'page' : undefined}
            data-magnetic
            className="btn-wipe group kicker !border-paper px-5 py-3"
          >
            Réserver une séance <ButtonArrow />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden col-start-3 justify-self-end kicker"
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          id={MOBILE_MENU_ID}
          className="md:hidden absolute inset-x-0 top-full h-[100svh] bg-ink text-paper border-t border-white/15 px-6 py-10 [animation:unveil_0.8s_var(--ease-io)_both]"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-6">
            {[{ href: '/', label: 'Accueil' }, ...NAV_LINKS].map((link, i) => (
              <li key={link.href} className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                  className="block font-serif text-5xl aria-[current=page]:italic animate-[word-up_0.9s_var(--ease-out)_both]"
                  style={{ animationDelay: `${150 + i * 80}ms` }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 kicker text-white/70 animate-rise [--d:500ms]"
          >
            <InstagramIcon /> @{INSTAGRAM_HANDLE}
          </a>
        </nav>
      )}
    </header>
  );
}

function HeaderWithPathname() {
  return <HeaderContent pathname={usePathname()} />;
}

/** En-tête du site : navigation, logo et menu mobile. */
export default function SiteHeader() {
  return (
    <Suspense fallback={<HeaderContent pathname={null} />}>
      <HeaderWithPathname />
    </Suspense>
  );
}
