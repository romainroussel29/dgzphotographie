/** Boutons qui suivent légèrement la souris : data-magnetic. Renvoie la fonction d'arrêt. */
export function initMagnetic() {
  let current: HTMLElement | null = null;

  const onMove = (event: PointerEvent) => {
    const target = (event.target as Element | null)?.closest?.<HTMLElement>('[data-magnetic]') ?? null;
    if (current && current !== target) current.style.translate = '';
    current = target;
    if (!target) return;
    const box = target.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * 0.3;
    const y = (event.clientY - box.top - box.height / 2) * 0.4;
    target.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  return () => document.removeEventListener('pointermove', onMove);
}
