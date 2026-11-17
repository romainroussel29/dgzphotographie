import type { Metadata } from 'next';
import { LegalPage, Section } from '@/app/components/Legal';
import { EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Mentions légales',
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updated="17 novembre 2026">
      <p className="text-muted">
        Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
        numérique (LCEN), voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site.
      </p>

      <Section title="Éditeur du site">
        <p>
          <strong>DGZ Photographie</strong>
          <br />
          Didier Garnier
          <br />
          TVA non applicable, art. 293 B du CGI
          <br />
          Téléphone : <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
          <br />
          Email : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
        <p>
          Directeur de la publication : Didier Garnier
        </p>
      </Section>

      <Section title="Hébergement">
        <p>
          <strong>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          <br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
        </p>
        <p>
          Les données (galeries, photos, commentaires) sont stockées par <strong>Supabase Inc.</strong> (
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">supabase.com</a>).
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des photographies, textes et éléments graphiques présents sur ce site sont la propriété
          exclusive de DGZ Photographie, sauf mention contraire. Ils sont protégés par le Code de la propriété
          intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation
          écrite préalable est interdite (article L.122-4 du Code de la propriété intellectuelle). Pour toute
          demande d&apos;utilisation, écrivez à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </Section>

      <Section title="Droit à l'image">
        <p>
          Les personnes photographiées ont donné leur accord à la diffusion de leur image. Si vous apparaissez sur
          une photographie et souhaitez qu&apos;elle soit retirée, contactez-moi à{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> : la demande sera traitée dans les meilleurs délais.
        </p>
      </Section>

      <Section title="Liens externes">
        <p>
          Le site contient des liens vers des services tiers, notamment{' '}
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>. DGZ Photographie
          n&apos;est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
        </p>
      </Section>

      <Section title="Données personnelles">
        <p>
          Le traitement de vos données est détaillé dans la{' '}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>
      </Section>
    </LegalPage>
  );
}
