/** Parallaxe : data-parallax="0.05" (vitesse). Renvoie la fonction d'arrêt. */
export function initParallax() {
  const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!elements.length) return () => {};
  let scheduled = false;

  const update = () => {
    scheduled = false;
    elements.forEach((element) => {
      const box = element.getBoundingClientRect();
      if (box.bottom < -200 || box.top > innerHeight + 200) return;
      const speed = parseFloat(element.dataset.parallax || '0.1');
      const offset = (box.top + box.height / 2 - innerHeight / 2) * -speed;
      element.style.translate = `0 ${offset.toFixed(1)}px`;
    });
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  };

  update();
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  return () => {
    removeEventListener('scroll', schedule);
    removeEventListener('resize', schedule);
  };
}
