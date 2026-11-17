import type { Metadata } from 'next';
import { LegalPage, Section } from '@/app/components/Legal';
import { EMAIL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité" updated="17 novembre 2026">
      <p className="text-muted">
        Cette page explique quelles données personnelles sont collectées sur ce site, pourquoi, et quels sont vos
        droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
        Libertés.
      </p>

      <Section title="Responsable du traitement">
        <p>
          DGZ Photographie — Didier Garnier
          <br />
          Contact : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </Section>

      <Section title="Données collectées et finalités">
        <p>
          <strong>Formulaire de contact</strong> : nom, adresse email, téléphone (facultatif) et message. Ces
          données servent uniquement à répondre à votre demande (devis, séance, tirage, collaboration). Base
          légale : votre demande et l&apos;intérêt légitime à y répondre.
        </p>
        <p>
          <strong>Livre d&apos;or</strong> : nom ou pseudo, commentaire et date de publication. Ces informations sont
          affichées publiquement sur le site. Base légale : votre consentement, exprimé en publiant le message.
        </p>
        <p>Aucune donnée n&apos;est vendue, louée ou utilisée à des fins publicitaires.</p>
      </Section>

      <Section title="Durée de conservation">
        <ul>
          <li>Demandes de contact : 3 ans à compter du dernier échange.</li>
          <li>Commentaires du livre d&apos;or : jusqu&apos;à ce que vous en demandiez la suppression.</li>
        </ul>
      </Section>

      <Section title="Destinataires et hébergement">
        <p>
          Les données sont destinées uniquement à DGZ Photographie. Elles sont hébergées par des prestataires
          techniques : Vercel Inc. (hébergement du site) et Supabase Inc. (base de données). Ces prestataires
          peuvent être situés hors de l&apos;Union européenne ; dans ce cas, les transferts sont encadrés par les
          clauses contractuelles types de la Commission européenne.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Ce site n&apos;utilise ni cookies publicitaires ni outil de mesure d&apos;audience. Aucun bandeau de
          consentement n&apos;est donc nécessaire. Les liens vers Instagram vous redirigent vers ce service, soumis
          à sa propre politique.
        </p>
      </Section>

      <Section title="Vos droits">
        <p>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de
          limitation et de portabilité de vos données. Pour les exercer, écrivez à{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Une réponse vous sera apportée sous un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>
      </Section>
    </LegalPage>
  );
}
