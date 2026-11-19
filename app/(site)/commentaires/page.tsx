import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import Guestbook from '@/components/guestbook/Guestbook';

export const metadata: Metadata = {
  title: "Livre d'or",
  description: 'Les mots laissés par les visiteurs et les personnes photographiées par DGZ Photographie.',
};

export default function GuestbookPage() {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title="Livre _d'or_">
        <p>Laissez un commentaire, une impression ou un mot sur l&apos;univers photographique.</p>
      </PageHeader>
      <Guestbook />
    </div>
  );
}
