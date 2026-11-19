'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InstagramIcon from './InstagramIcon';
import Logo from './Logo';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/contact';

const links = [
  { href: '/galerie', label: 'Galeries' },
  { href: '/commentaires', label: "Livre d'or" },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string | null, href: string) {
  return !!pathname && pathname.startsWith(href);
}

function HeaderInner({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
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
        <nav className="hidden md:flex gap-8" aria-label="Navigation principale">
          {links.slice(0, 2).map((l) => (
            <NavItem key={l.href} {...l} active={isActive(pathname, l.href)} />
          ))}
        </nav>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="DGZ Photographie — Accueil"
          className="col-start-2 justify-self-center block"
        >
          <Logo light priority decorative sizes="(min-width: 768px) 160px, 120px" className="w-[120px] md:w-[160px] animate-sign [--d:150ms]" />
        </Link>

        <div className="hidden md:flex justify-end">
          <Link
            href="/contact"
            aria-current={isActive(pathname, '/contact') ? 'page' : undefined}
            data-magnetic
            className="btn-wipe group kicker !border-paper px-5 py-3"
          >
            Réserver une séance <span className="btn-arrow">→</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden col-start-3 justify-self-end kicker"
          aria-expanded={open}
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden absolute inset-x-0 top-full h-[100svh] bg-ink text-paper border-t border-white/15 px-6 py-10 flex flex-col gap-6 [animation:unveil_0.8s_var(--ease-io)_both]"
          aria-label="Navigation mobile"
        >
          {[{ href: '/', label: 'Accueil' }, ...links].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block overflow-hidden"
            >
              <span
                className={`block font-serif text-5xl animate-[word-up_0.9s_var(--ease-out)_both] ${
                  l.href !== '/' && isActive(pathname, l.href) ? 'italic' : ''
                }`}
                style={{ animationDelay: `${150 + i * 80}ms` }}
              >
                {l.label}
              </span>
            </Link>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 kicker text-white/70 animate-rise [--d:500ms]"
          >
            <InstagramIcon /> @{INSTAGRAM_HANDLE}
          </a>
        </nav>
      )}
    </header>
  );
}

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`kicker link-draw pb-1 transition-colors ${active ? 'text-paper' : 'text-white/60 hover:text-paper'}`}
    >
      {label}
    </Link>
  );
}

function HeaderWithPath() {
  const pathname = usePathname();
  return <HeaderInner pathname={pathname} />;
}

export default function SiteHeader() {
  return (
    <Suspense fallback={<HeaderInner pathname={null} />}>
      <HeaderWithPath />
    </Suspense>
  );
}
