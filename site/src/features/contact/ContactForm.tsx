'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Arrow from '@/components/ui/Arrow';
import { EMAIL } from '@/config/site';

const FALLBACK = `Vous pouvez m'écrire directement à ${EMAIL}.`;

type ContactResponse = { ok: boolean; error?: string } | null;

/**
 * Formulaire de contact, envoyé à site/public/contact.php (exécuté par le PHP d'OVH),
 * qui transmet le message par e-mail. Anti-spam : champ piège invisible et délai minimal avant l'envoi.
 */
export default function ContactForm() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  // Le script PHP ignore les envois trop rapides (robots).
  const startedAt = useRef(0);
  const success = useRef<HTMLDivElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (sent) success.current?.focus();
    else name.current?.focus();
  }, [sent]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setError('');
    setSending(true);

    let message = '';
    try {
      const data = new FormData(form);
      data.set('debut', String(startedAt.current));
      const response = await fetch(form.action, { method: 'POST', body: data });
      const result: ContactResponse = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) message = result?.error ?? `Le message n'a pas pu être envoyé. ${FALLBACK}`;
    } catch {
      message = `Connexion impossible. ${FALLBACK}`;
    }

    setSending(false);
    if (message) {
      setError(message);
      return;
    }
    form.reset();
    setSent(true);
  };

  return (
    <section className="contact__form" aria-label="Formulaire de contact">
      <form className="contact-form" action="/contact.php" method="post" data-stagger="up" hidden={sent} onSubmit={submit}>
        <div className="contact-form__trap" aria-hidden="true">
          <label htmlFor="site_web">Ne pas remplir ce champ</label>
          <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="contact-form__row">
          <div>
            <label className="kicker" htmlFor="nom">Nom</label>
            <input ref={name} id="nom" name="nom" type="text" required maxLength={100} autoComplete="name" placeholder="Votre nom" />
          </div>
          <div>
            <label className="kicker" htmlFor="tel">
              Téléphone <span>(optionnel)</span>
            </label>
            <input id="tel" name="tel" type="tel" maxLength={30} autoComplete="tel" placeholder="06 12 34 56 78" />
          </div>
        </div>

        <div>
          <label className="kicker" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="votre.email@exemple.com" />
        </div>

        <div>
          <label className="kicker" htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={7} required maxLength={5000} placeholder="Parlez-moi de votre projet…" />
        </div>

        <div aria-live="polite">
          <p className="contact-form__error" hidden={!error}>
            {error}
          </p>
        </div>

        <button className="button button--block kicker" type="submit" disabled={sending}>
          {sending ? (
            'Envoi en cours…'
          ) : (
            <>
              Envoyer le message <Arrow />
            </>
          )}
        </button>
        <p className="contact-form__note">
          Les informations saisies servent uniquement à répondre à votre demande. Voir la{' '}
          <a className="link-underline" href="/politique-confidentialite/">politique de confidentialité</a>.
        </p>
      </form>

      <div ref={success} className="contact-success animate-rise" role="status" tabIndex={-1} hidden={!sent}>
        <h2>Merci.</h2>
        <p>Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.</p>
        <button className="button kicker" type="button" data-magnetic="" onClick={() => setSent(false)}>
          Envoyer un autre message
        </button>
      </div>
    </section>
  );
}
