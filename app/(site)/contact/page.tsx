import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import ContactDetails from '@/components/contact/ContactDetails';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Réserver une séance photo, proposer une collaboration ou commander un tirage : contactez DGZ Photographie.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title="Contact" letters />

      <div className="grid md:grid-cols-12 gap-14 md:gap-10">
        <section aria-labelledby="titre-coordonnees" className="md:col-span-4 space-y-10" data-stagger="up">
          <h2 id="titre-coordonnees" className="font-serif italic text-3xl leading-snug">
            Une question, un projet de collaboration ou une demande de tirage&nbsp;?
          </h2>
          <p className="text-muted leading-relaxed">
            N&apos;hésitez pas à m&apos;écrire. Je réponds personnellement à chaque message.
          </p>
          <ContactDetails />
        </section>

        <section aria-label="Formulaire de contact" className="md:col-span-7 md:col-start-6">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
