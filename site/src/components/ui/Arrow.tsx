/** Flèche des boutons, animée au survol par le CSS. */
export default function Arrow({ back = false }: { back?: boolean }) {
  return (
    <span className={back ? 'arrow arrow--back' : 'arrow'} aria-hidden="true">
      {back ? '←' : '→'}
    </span>
  );
}
