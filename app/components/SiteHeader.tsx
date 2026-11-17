'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/galerie', label: 'Galeries' },
  { href: '/commentaires', label: "Livre d'or" },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

function NavLinks({
  pathname,
  onNavigate,
  mobile = false,
}: {
  pathname: string | null;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <>
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={
              mobile
                ? `font-serif text-4xl font-light transition ${active ? 'text-white' : 'text-neutral-500 hover:text-white'}`
                : `relative py-1 text-[11px] uppercase tracking-[0.25em] transition after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-white after:transition-all after:duration-500 ${
                    active
                      ? 'text-white after:w-full'
                      : 'text-neutral-400 hover:text-white after:w-0 hover:after:w-full'
                  }`
            }
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

function HeaderInner({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-baseline gap-3">
          <span className="font-serif text-2xl tracking-[0.2em] text-white">DGZ</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.35em] text-neutral-500 group-hover:text-neutral-300 transition">
            Photographie
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10" aria-label="Navigation principale">
          <NavLinks pathname={pathname} />
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          <span className={`block h-px w-6 bg-white transition duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-white transition duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-neutral-950 flex flex-col justify-center gap-8 px-8 animate-fade-up"
          aria-label="Navigation mobile"
        >
          <NavLinks pathname={pathname} mobile onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </header>
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
