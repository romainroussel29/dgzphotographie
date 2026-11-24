import PageHeader from '@/components/layout/PageHeader';
import { EMAIL, INSTAGRAM_URL, PHONE, PHONE_LINK } from '@/config/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Mentions légales — DGZ Photographie',
  description:
    "Mentions légales du site dgzphotographie.fr : éditeur, hébergeur et propriété intellectuelle des photographies.",
  path: '/mentions-legales/',
});

const Mail = () => <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export default function LegalNoticePage() {
  return (
    <article className="page container">
      <PageHeader title="Mentions légales">
        <p className="kicker">Mise à jour : 22 novembre 2026</p>
      </PageHeader>

      <div className="legal" data-stagger="up">
        <p>
          Conformément à l&apos;article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
          numérique (LCEN), voici les informations relatives à l&apos;éditeur et à l&apos;hébergeur du site.
        </p>
        <section>
          <h2>Éditeur du site</h2>
          <div>
            <p>
              <strong>DGZ Photographie</strong>
              <br />
              Didier Garnier
              <br />
              TVA non applicable, art. 293 B du CGI
              <br />
              Téléphone : <a href={PHONE_LINK}>{PHONE}</a>
              <br />
              Email : <Mail />
            </p>
            <p>Directeur de la publication : Didier Garnier</p>
          </div>
        </section>
        <section>
          <h2>Conception du site</h2>
          <div>
            <p>
              <strong>Roussel Dev</strong>
              <br />
              Romain Roussel
              <br />
              <a href="https://roussel-dev.fr/" target="_blank" rel="nofollow noopener">
                roussel-dev.fr<span className="sr-only"> (nouvel onglet)</span>
              </a>
            </p>
          </div>
        </section>
        <section>
          <h2>Hébergement</h2>
          <div>
            <p>
              <strong>OVH SAS</strong>
              <br />
              2 rue Kellermann, 59100 Roubaix, France
              <br />
              <a href="https://www.ovhcloud.com" target="_blank" rel="noopener noreferrer">
                ovhcloud.com
              </a>
            </p>
          </div>
        </section>
        <section>
          <h2>Propriété intellectuelle</h2>
          <div>
            <p>
              L&apos;ensemble des photographies, textes et éléments graphiques présents sur ce site sont la propriété
              exclusive de DGZ Photographie, sauf mention contraire. Ils sont protégés par le Code de la propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation
              écrite préalable est interdite (article L.122-4 du Code de la propriété intellectuelle). Pour toute
              demande d&apos;utilisation, écrivez à <Mail />.
            </p>
          </div>
        </section>
        <section>
          <h2>Droit à l&apos;image</h2>
          <div>
            <p>
              Les personnes photographiées ont donné leur accord à la diffusion de leur image. Si vous apparaissez sur
              une photographie et souhaitez qu&apos;elle soit retirée, contactez-moi à <Mail /> : la demande sera
              traitée dans les meilleurs délais.
            </p>
          </div>
        </section>
        <section>
          <h2>Liens externes</h2>
          <div>
            <p>
              Le site contient des liens vers des services tiers, notamment{' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              . DGZ Photographie n&apos;est pas responsable du contenu de ces sites ni de leur politique de
              confidentialité.
            </p>
          </div>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <div>
            <p>
              Le traitement de vos données est détaillé dans la{' '}
              <a href="/politique-confidentialite/">politique de confidentialité</a>.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
