import PageHeader from '@/components/layout/PageHeader';
import Arrow from '@/components/ui/Arrow';
import JsonLd from '@/components/ui/JsonLd';
import { breadcrumb, pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Séances photo et tirages à Marseille | DGZ',
  description:
    'Séances portrait en noir et blanc, tirages photo et collaborations : les services de DGZ Photographie, photographe à Marseille.',
  path: '/services/',
});

export default function ServicesPage() {
  return (
    <div className="page container">
      <JsonLd data={breadcrumb({ name: 'Services', path: '/services/' })} />
      <PageHeader title="Services" letters>
        <p>Portrait, tirages et collaborations, à Marseille et alentours.</p>
      </PageHeader>

      <div className="services" data-stagger="up">
        <article className="service-card">
          <p className="kicker muted">N° 01</p>
          <h2>
            Séance <em>portrait</em>
          </h2>
          <p>
            Des portraits sincères et naturels en noir et blanc, pour artistes, comédiens, musiciens, créateurs,
            professionnels et toute personne qui souhaite se reconnaître dans une image. Grâce à mon mini studio
            portable, la séance se fait où vous le souhaitez.
          </p>
          <a className="kicker" href="/services/portrait/">
            Découvrir la séance <Arrow />
          </a>
        </article>
        <article className="service-card">
          <p className="kicker muted">N° 02</p>
          <h2>Tirages</h2>
          <p>Une photographie vous touche ? Écrivez-moi pour une demande de tirage.</p>
          <a className="kicker" href="/contact/">
            Demander un tirage <Arrow />
          </a>
        </article>
        <article className="service-card">
          <p className="kicker muted">N° 03</p>
          <h2>Collaborations</h2>
          <p>Un projet de collaboration ? Parlez-m&apos;en : je réponds personnellement à chaque message.</p>
          <a className="kicker" href="/contact/">
            Proposer un projet <Arrow />
          </a>
        </article>
      </div>
    </div>
  );
}
