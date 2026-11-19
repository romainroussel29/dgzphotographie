'use client';

import { useState } from 'react';
import Link from 'next/link';
import SplitText from '@/components/motion/SplitText';
import { ButtonArrow, buttonClass } from '@/components/ui/ButtonLink';
import { inputClass, labelClass } from '@/components/ui/form';

/**
 * Formulaire de contact.
 * ⚠ À brancher : pour l'instant le message n'est envoyé nulle part, seul le remerciement s'affiche.
 */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-ink text-paper p-10 md:p-16 animate-rise" role="status">
        <SplitText as="p" text="_Merci._" className="block font-serif text-5xl" />
        <p className="mt-6 text-white/70 leading-relaxed max-w-md">
          Votre message a bien été pris en compte. Je vous répondrai dans les plus brefs délais.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          data-magnetic
          className="btn-wipe mt-10 kicker !border-white/40 px-5 py-3"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper-deep p-6 md:p-10 space-y-6" data-stagger="up">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom
          </label>
          <input id="nom" name="nom" type="text" required autoComplete="name" className={inputClass} placeholder="Votre nom" />
        </div>
        <div>
          <label htmlFor="tel" className={labelClass}>
            Téléphone <span className="normal-case tracking-normal font-normal text-muted">(optionnel)</span>
          </label>
          <input id="tel" name="tel" type="tel" autoComplete="tel" className={inputClass} placeholder="06 12 34 56 78" />
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
          className={`${inputClass} resize-none`}
          placeholder="Parlez-moi de votre projet…"
        />
      </div>

      <button type="submit" className={`${buttonClass} w-full`}>
        Envoyer le message <ButtonArrow />
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
