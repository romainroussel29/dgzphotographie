'use client';

import { useEffect, useRef } from 'react';

/**
 * Curseur qui suit la souris avec un léger retard.
 * Il grossit sur les liens et affiche un libellé sur les éléments `data-cursor="Voir"`.
 * Désactivé sur écran tactile et en mouvement réduit ; le curseur natif reste visible.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let visible = false;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        x = tx;
        y = ty;
        el.dataset.visible = '';
      }
      if (!raf) raf = requestAnimationFrame(loop);

      const target = (e.target as Element | null)?.closest?.('[data-cursor], a, button, input, textarea, select, label');
      const text = target?.getAttribute('data-cursor') ?? '';
      el.dataset.state = !target
        ? ''
        : text
          ? 'label'
          : target.matches('input, textarea, select')
            ? 'text'
            : 'link';
      if (label.textContent !== text) label.textContent = text;
    };

    const onLeave = () => {
      visible = false;
      delete el.dataset.visible;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <div className="cursor-ball">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
