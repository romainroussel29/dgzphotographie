'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import SplitText from '@/components/motion/SplitText';
import { ButtonArrow, buttonClass } from '@/components/ui/ButtonLink';
import { inputClass, labelClass } from '@/components/ui/form';
import { EMAIL } from '@/lib/site';

/** Script PHP qui envoie le message par e-mail (public/contact.php, exécuté par l'hébergement OVH). */
const ENDPOINT = '/contact.php';

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string };

/** Formulaire de contact : le message est envoyé par e-mail au photographe. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  // Heure d'affichage du formulaire (côté navigateur) : le script ignore les envois trop rapides (robots).
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending' });

    try {
      const data = new FormData(form);
      data.set('debut', String(startedAt.current));
      const response = await fetch(ENDPOINT, { method: 'POST', body: data });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? `Le message n'a pas pu être envoyé. Vous pouvez m'écrire directement à ${EMAIL}.`);
      }
      form.reset();
      setStatus({ state: 'sent' });
    } catch (error) {
      setStatus({
        state: 'error',
        message:
          error instanceof Error && error.message !== 'Failed to fetch'
            ? error.message
            : `Connexion impossible. Vous pouvez m'écrire directement à ${EMAIL}.`,
      });
    }
  };

  if (status.state === 'sent') {
    return (
      <div className="bg-ink text-paper p-10 md:p-16 animate-rise" role="status">
        <SplitText as="p" text="_Merci._" className="block font-serif text-5xl" />
        <p className="mt-6 text-white/70 leading-relaxed max-w-md">
          Votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ state: 'idle' })}
          data-magnetic
          className="btn-wipe mt-10 kicker !border-white/40 px-5 py-3"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const sending = status.state === 'sending';

  return (
    <form onSubmit={handleSubmit} className="bg-paper-deep p-6 md:p-10 space-y-6" data-stagger="up">
      {/* Champs techniques anti-spam : invisibles pour les visiteurs. */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="site_web">Ne pas remplir ce champ</label>
        <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className={inputClass}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="tel" className={labelClass}>
            Téléphone <span className="normal-case tracking-normal font-normal text-muted">(optionnel)</span>
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            maxLength={30}
            autoComplete="tel"
            className={inputClass}
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="votre.email@exemple.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          maxLength={5000}
          className={`${inputClass} resize-none`}
          placeholder="Parlez-moi de votre projet…"
        />
      </div>

      <div aria-live="polite">
        {status.state === 'error' && (
          <p className="border border-red-800 text-red-800 px-4 py-3 text-sm animate-rise">{status.message}</p>
        )}
      </div>

      <button type="submit" disabled={sending} className={`${buttonClass} w-full disabled:opacity-50`}>
        {sending ? (
          'Envoi en cours…'
        ) : (
          <>
            Envoyer le message <ButtonArrow />
          </>
        )}
      </button>
      <p className="text-xs text-muted leading-relaxed">
        Les informations saisies servent uniquement à répondre à votre demande. Voir la{' '}
        <Link href="/confidentialite" className="underline underline-offset-2 hover:text-ink">
          politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
