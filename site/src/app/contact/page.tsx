import PageHeader from '@/components/layout/PageHeader';
import InstagramIcon from '@/components/ui/InstagramIcon';
import JsonLd from '@/components/ui/JsonLd';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE, PHONE_LINK } from '@/config/site';
import ContactForm from '@/features/contact/ContactForm';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Contact et réservation — DGZ Photographie',
  description:
    'Réserver une séance photo portrait à Marseille, proposer une collaboration ou commander un tirage : contactez DGZ Photographie.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <div className="page container">
      <JsonLd data={breadcrumb({ name: 'Contact', path: '/contact/' })} />
      <PageHeader title="Contact" letters />

      <div className="contact">
        <section className="contact__details" aria-labelledby="titre-coordonnees" data-stagger="up">
          <h2 id="titre-coordonnees">Une question, un projet de collaboration ou une demande de tirage&nbsp;?</h2>
          <p>N&apos;hésitez pas à m&apos;écrire. Je réponds personnellement à chaque message.</p>
          <address>
            <dl data-stagger="up">
              <div>
                <dt className="kicker muted">Téléphone</dt>
                <dd>
                  <a className="link-draw" href={PHONE_LINK}>{PHONE}</a>
                </dd>
              </div>
              <div>
                <dt className="kicker muted">Email</dt>
                <dd>
                  <a className="link-draw break-all" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="kicker muted">Instagram</dt>
                <dd>
                  <a className="link-draw link-inline" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />@{INSTAGRAM_HANDLE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="kicker muted">Lieu</dt>
                <dd>Marseille &amp; alentours</dd>
              </div>
              <div>
                <dt className="kicker muted">Spécialité</dt>
                <dd>Portrait noir &amp; blanc</dd>
              </div>
            </dl>
          </address>
        </section>

        <ContactForm />
      </div>
    </div>
  );
}
