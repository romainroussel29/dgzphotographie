'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR = '[data-reveal], [data-stagger] > *';

/**
 * Pilote les effets du site, sans rien afficher :
 * - apparitions au défilement (`data-reveal`, `data-stagger`) ;
 * - parallaxe (`data-parallax="0.1"`) ;
 * - boutons magnétiques (`data-magnetic`).
 * Les éléments ajoutés plus tard (données Supabase, navigation) sont pris en compte automatiquement.
 */
export default function Motion() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Après la première navigation, le rideau d'intro ne doit plus retarder les animations.
  useEffect(() => {
    if (pathname !== firstPath.current) document.documentElement.dataset.intro = 'seen';
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const introPlaying = root.dataset.intro === 'play' && !!document.querySelector('.intro');

    /* --- Apparitions au défilement --- */
    const seen = new WeakSet<Element>();
    // Élément surveillé → éléments à révéler quand il entre dans l'écran.
    const targetsOf = new Map<Element, HTMLElement[]>();

    const io = new IntersectionObserver(
      (entries) => {
        const toReveal = entries
          .filter((e) => e.isIntersecting)
          .flatMap((e) => {
            io.unobserve(e.target);
            const targets = targetsOf.get(e.target) ?? [];
            targetsOf.delete(e.target);
            return targets;
          })
          .map((el) => ({ el, rect: el.getBoundingClientRect() }))
          .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left);

        toReveal.forEach(({ el }, k) => {
          // Les éléments qui entrent ensemble apparaissent en cascade.
          el.style.setProperty('--io-d', `${Math.min(k, 8) * 90}ms`);
          el.classList.add('is-in');
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );

    /**
     * Les effets « clip », « sign » et « line » masquent l'élément (clip-path, échelle nulle) :
     * le navigateur le considère alors comme invisible et ne le signalerait jamais.
     * On surveille donc son parent, qui lui n'est pas masqué.
     */
    const watchedElementFor = (el: Element) => {
      const variant = el.getAttribute('data-reveal') ?? el.parentElement?.getAttribute('data-stagger');
      const masked = variant === 'clip' || variant === 'sign' || variant === 'line';
      return masked && el.parentElement && !el.parentElement.hasAttribute('data-stagger') ? el.parentElement : el;
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduce) {
          el.classList.add('is-in');
          return;
        }
        const watched = watchedElementFor(el);
        const targets = targetsOf.get(watched);
        if (targets) targets.push(el);
        else {
          targetsOf.set(watched, [el]);
          io.observe(watched);
        }
      });
    };

    let scheduled = false;
    const mo = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        scan();
      });
    });

    const start = () => {
      scan();
      mo.observe(document.body, { childList: true, subtree: true });
    };
    const startTimer = window.setTimeout(start, introPlaying ? 1300 : 0);

    /* --- Parallaxe --- */
    let ticking = false;
    const parallax = () => {
      ticking = false;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const offset = (r.top + r.height / 2 - vh / 2) * -speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(parallax);
    };
    if (!reduce) {
      parallax();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }

    /* --- Boutons magnétiques --- */
    let magnet: HTMLElement | null = null;
    const onPointerMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]') ?? null;
      if (magnet && magnet !== target) magnet.style.translate = '';
      magnet = target;
      if (!target) return;
      const r = target.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
      target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
    };
    if (!reduce && fine) document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.clearTimeout(startTimer);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  // La parallaxe doit se recalculer sur une nouvelle page.
  useEffect(() => {
    window.dispatchEvent(new Event('scroll'));
  }, [pathname]);

  return null;
}
