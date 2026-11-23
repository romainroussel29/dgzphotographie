import PageHeader from '@/components/layout/PageHeader';
import Arrow from '@/components/ui/Arrow';
import JsonLd from '@/components/ui/JsonLd';
import { EMAIL } from '@/config/site';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: "Livre d'or — DGZ Photographie",
  description:
    'Les mots laissés par les visiteurs et les personnes photographiées par DGZ Photographie, photographe portraitiste à Marseille.',
  path: '/commentaires/',
});

/**
 * MESSAGES DU LIVRE D'OR, publiés avec l'accord de leur auteur.
 * Ajouter un objet en tête de liste (le plus récent en premier) :
 *   { name: 'Prénom', date: '2026-11-22', text: 'Le message.' },
 */
const MESSAGES: { name: string; date: string; text: string }[] = [];

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Livre d'or")}&body=${encodeURIComponent(
  "Nom ou pseudo à afficher :\n\nMon message :\n\nJ'accepte que ce nom et ce message soient publiés sur le site.",
)}`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));

export default function GuestbookPage() {
  return (
    <div className="page container">
      <JsonLd data={breadcrumb({ name: "Livre d'or", path: '/commentaires/' })} />
      <PageHeader title="Livre _d'or_">
        <p>Laissez un commentaire, une impression ou un mot sur l&apos;univers photographique.</p>
      </PageHeader>

      <div className="guestbook">
        <section className="guestbook__messages" aria-labelledby="titre-messages">
          <h2 className="kicker" id="titre-messages">
            {MESSAGES.length} message{MESSAGES.length > 1 ? 's' : ''}
          </h2>
          {MESSAGES.length === 0 ? (
            <p className="guestbook__empty">Aucun message pour le moment. Soyez le premier à laisser un mot&nbsp;!</p>
          ) : (
            <ol className="guestbook__list" data-stagger="up">
              {MESSAGES.map((message) => (
                <li key={`${message.date}-${message.name}`} className="message">
                  <article>
                    <span className="message__mark" aria-hidden="true">
                      “
                    </span>
                    <blockquote>{message.text}</blockquote>
                    <footer className="kicker">
                      <span>{message.name}</span>
                      <time dateTime={message.date}>{formatDate(message.date)}</time>
                    </footer>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </section>

        <aside className="guestbook__aside">
          <div className="animate-rise">
            <section className="guestbook__invite" aria-labelledby="titre-invitation">
              <h2 id="titre-invitation">Laisser un mot</h2>
              <p>
                Envoyez votre message par e-mail, avec le nom ou le pseudo à afficher. Il sera publié ici après
                relecture.
              </p>
              <a className="button button--block kicker" href={MAILTO}>
                Envoyer mon mot <Arrow />
              </a>
              <p className="guestbook__note">
                Ou écrivez directement à <span>{EMAIL}</span> Voir la{' '}
                <a className="link-underline" href="/politique-confidentialite/">
                  politique de confidentialité
                </a>
                .
              </p>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}
