/** Apparitions au défilement : data-reveal et data-stagger. Renvoie la fonction d'arrêt. */
export function initReveal(reduce: boolean) {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger] > *');
  if (reduce) {
    elements.forEach((element) => element.classList.add('is-in'));
    return () => {};
  }

  // Élément surveillé → éléments à révéler quand il entre dans l'écran.
  const targets = new Map<Element, HTMLElement[]>();
  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .flatMap((entry) => {
          observer.unobserve(entry.target);
          return targets.get(entry.target) ?? [];
        })
        .map((element) => ({ element, box: element.getBoundingClientRect() }))
        .sort((a, b) => a.box.top - b.box.top || a.box.left - b.box.left)
        .forEach(({ element }, index) => {
          // Les éléments qui entrent ensemble apparaissent en cascade.
          element.style.setProperty('--io-d', `${Math.min(index, 8) * 90}ms`);
          element.classList.add('is-in');
        });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  elements.forEach((element) => {
    // Un élément masqué par clip-path ou scale(0) n'est jamais signalé : on surveille son parent.
    const parent = element.parentElement;
    const variant = element.dataset.reveal ?? parent?.dataset.stagger;
    const masked = variant === 'clip' || variant === 'sign' || variant === 'line';
    const watched = masked && parent && !parent.hasAttribute('data-stagger') ? parent : element;
    targets.set(watched, [...(targets.get(watched) ?? []), element]);
  });

  // Pendant le rideau d'introduction, les apparitions attendent qu'il se lève.
  const introPlaying = document.documentElement.dataset.intro === 'play' && !!document.querySelector('.intro');
  const timer = setTimeout(() => targets.forEach((_, watched) => observer.observe(watched)), introPlaying ? 1300 : 0);

  return () => {
    clearTimeout(timer);
    observer.disconnect();
  };
}
