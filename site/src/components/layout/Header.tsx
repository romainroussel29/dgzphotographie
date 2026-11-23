'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Arrow from '@/components/ui/Arrow';
import InstagramIcon from '@/components/ui/InstagramIcon';
import Logo from '@/components/ui/Logo';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/config/site';
import { cssVars } from '@/lib/css';

const NAV = [
  { href: '/galerie/', label: 'Galerie' },
  { href: '/services/', label: 'Services' },
  { href: '/a-propos/', label: 'À propos' },
  { href: '/commentaires/', label: "Livre d'or" },
];
const MOBILE_NAV = [{ href: '/', label: 'Accueil' }, ...NAV, { href: '/contact/', label: 'Contact' }];

/** « page » sur la page elle-même, « true » sur une rubrique parente (Services pour /services/portrait/). */
function current(pathname: string, href: string) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (path === href) return 'page';
  if (href !== '/' && path.startsWith(href)) return 'true';
  return undefined;
}

/** En-tête du site : bandeau, navigation, logo et menu mobile. */
export default function Header() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  // Menu ouvert : la page ne défile plus (body.menu-open) et Échap le referme.
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    const wide = matchMedia('(min-width: 48rem)');
    const onWide = (event: MediaQueryListEvent) => event.matches && close();

    wide.addEventListener('change', onWide);
    // Retour arrière du navigateur : la page revient avec le menu fermé.
    addEventListener('pagehide', close);
    return () => {
      wide.removeEventListener('change', onWide);
      removeEventListener('pagehide', close);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__top">
        <div className="site-header__top-inner container kicker">
          <span>Marseille</span>
          <span className="site-header__wide">Portrait · Street · Paysage</span>
          <a
            className="site-header__social"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram (nouvel onglet)"
          >
            <InstagramIcon />
            <span className="site-header__wide">Instagram</span>
          </a>
        </div>
      </div>

      <div className="site-header__bar container">
        <nav className="site-header__nav" aria-label="Navigation principale">
          <ul>
            {NAV.map((link) => (
              <li key={link.href}>
                <a className="kicker link-draw" href={link.href} aria-current={current(pathname, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="site-header__logo" href="/" aria-label="DGZ Photographie — Accueil">
          <Logo
            className="animate-sign"
            sizes="(min-width: 48rem) 160px, 120px"
            style={cssVars({ '--d': '150ms' })}
            fetchPriority="high"
          />
        </a>

        <div className="site-header__action">
          <a className="button kicker" href="/contact/" aria-current={current(pathname, '/contact/')} data-magnetic="">
            Réserver une séance <Arrow />
          </a>
        </div>

        <button
          ref={toggle}
          className="site-header__toggle kicker"
          type="button"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Fermer' : 'Menu'}
        </button>
      </div>

      <nav
        className="mobile-menu"
        id="menu-mobile"
        aria-label="Navigation mobile"
        hidden={!open}
        onClick={(event) => (event.target as Element).closest('a') && setOpen(false)}
      >
        <ul>
          {MOBILE_NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href} aria-current={current(pathname, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="mobile-menu__social kicker" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <InstagramIcon /> @{INSTAGRAM_HANDLE}
        </a>
      </nav>
    </header>
  );
}
