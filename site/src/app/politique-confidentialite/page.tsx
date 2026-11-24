import PageHeader from '@/components/layout/PageHeader';
import { EMAIL } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Politique de confidentialité — DGZ Photographie',
  description:
    'Données personnelles collectées sur dgzphotographie.fr (formulaire de contact, livre d’or) et vos droits.',
  path: '/politique-confidentialite/',
});

const Mail = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export default function PrivacyPage() {
  return (
    <article className="page container">
      <PageHeader title="Confidentialité" long>
        <p className="kicker">Mise à jour : 22 novembre 2026</p>
      </PageHeader>

      <div className="legal" data-stagger="up">
        <p>
          Cette page explique quelles données personnelles sont collectées sur ce site, pourquoi, et quels sont vos
          droits, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et
          Libertés.
        </p>
        <section>
          <h2>Responsable du traitement</h2>
          <div>
            <p>
              DGZ Photographie — Didier Garnier
              <br />
              Contact : <Mail />
            </p>
          </div>
        </section>
        <section>
          <h2>Données collectées et finalités</h2>
          <div>
            <p>
              <strong>Formulaire de contact</strong> : nom, adresse email, téléphone (facultatif) et message. Ces
              données servent uniquement à répondre à votre demande (devis, séance, tirage, collaboration). Base
              légale : votre demande et l&apos;intérêt légitime à y répondre.
            </p>
            <p>
              <strong>Livre d&apos;or</strong> : adresse e-mail, nom ou pseudo et message, envoyés par e-mail. Seuls le
              nom ou pseudo, le message et sa date sont publiés, après relecture. Base légale : votre consentement,
              exprimé dans votre e-mail.
            </p>
            <p>Aucune donnée n&apos;est vendue, louée ou utilisée à des fins publicitaires.</p>
          </div>
        </section>
        <section>
          <h2>Durée de conservation</h2>
          <div>
            <ul>
              <li>Demandes de contact : 3 ans à compter du dernier échange.</li>
              <li>Messages du livre d&apos;or : jusqu&apos;à ce que vous en demandiez la suppression.</li>
            </ul>
          </div>
        </section>
        <section>
          <h2>Destinataires et hébergement</h2>
          <div>
            <p>
              Les données sont destinées à DGZ Photographie et, pour la maintenance du site et la publication du livre
              d&apos;or, à son prestataire Roussel Dev. Elles transitent par des prestataires techniques : OVH
              SAS (hébergement du site, en France) et Google (messagerie Gmail). Google peut traiter des données hors de
              l&apos;Union européenne ; ces transferts sont encadrés par les garanties prévues par le RGPD.
            </p>
          </div>
        </section>
        <section>
          <h2>Cookies</h2>
          <div>
            <p>
              Ce site n&apos;utilise ni cookies publicitaires ni outil de mesure d&apos;audience. Aucun bandeau de
              consentement n&apos;est donc nécessaire. Les liens vers Instagram vous redirigent vers ce service, soumis
              à sa propre politique.
            </p>
          </div>
        </section>
        <section>
          <h2>Vos droits</h2>
          <div>
            <p>
              Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, d&apos;opposition, de
              limitation et de portabilité de vos données. Pour les exercer, écrivez à <Mail />. Une réponse vous sera
              apportée sous un mois.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
                cnil.fr
              </a>
              ).
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
