/** Curseur qui suit la souris et affiche le libellé de data-cursor. Renvoie la fonction d'arrêt. */
export function initCursor() {
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const label = cursor?.querySelector<HTMLElement>('.cursor__label');
  if (!cursor || !label) return () => {};
  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;
  let frame = 0;

  const follow = () => {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1 ? requestAnimationFrame(follow) : 0;
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (!cursor.hasAttribute('data-visible')) {
      x = targetX;
      y = targetY;
      cursor.dataset.visible = '';
    }
    if (!frame) frame = requestAnimationFrame(follow);

    const target = (event.target as Element | null)?.closest?.<HTMLElement>(
      '[data-cursor], a, button, input, textarea, label',
    );
    const text = target?.dataset.cursor ?? '';
    let state = '';
    if (text) state = 'label';
    else if (target?.matches('input, textarea')) state = 'text';
    else if (target) state = 'link';

    cursor.dataset.state = state;
    if (label.textContent !== text) label.textContent = text;
  };
  const onLeave = () => cursor.removeAttribute('data-visible');

  document.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  return () => {
    cancelAnimationFrame(frame);
    document.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
  };
}
