'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    <header className="relative z-40 bg-paper">
      {/* Bandeau supérieur */}
      <div className="border-b border-line">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-9 flex items-center justify-between kicker text-muted">
          <span>Marseille</span>
          <span className="hidden sm:inline">Portrait · Street · Paysage</span>
          <span>Noir &amp; blanc</span>
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
          className="col-start-2 justify-self-center text-center leading-none"
        >
          <span className="block font-serif text-4xl md:text-5xl tracking-tight">DGZ</span>
          <span className="block kicker text-muted mt-2">Photographie</span>
        </Link>

        <div className="hidden md:flex justify-end">
          <Link
            href="/contact"
            aria-current={isActive(pathname, '/contact') ? 'page' : undefined}
            className="kicker border border-ink px-5 py-3 hover:bg-ink hover:text-paper transition"
          >
            Réserver une séance
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

      <div className="border-b border-ink" />

      {open && (
        <nav
          className="md:hidden absolute inset-x-0 top-full h-[100svh] bg-paper px-6 py-10 flex flex-col gap-6 animate-rise"
          aria-label="Navigation mobile"
        >
          <Link href="/" onClick={() => setOpen(false)} className="font-serif text-5xl">Accueil</Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-serif text-5xl ${isActive(pathname, l.href) ? 'italic' : ''}`}
            >
              {l.label}
            </Link>
          ))}
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
      className={`kicker transition ${active ? 'text-ink underline underline-offset-8' : 'text-muted hover:text-ink'}`}
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
