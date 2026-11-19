import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import CommentList from '@/components/guestbook/CommentList';
import CommentForm from '@/components/guestbook/CommentForm';
import { getComments } from '@/lib/data/comments';

export const metadata: Metadata = {
  title: "Livre d'or",
  description: "Les mots laissés par les visiteurs et les personnes photographiées par DGZ Photographie.",
};

export default async function GuestbookPage() {
  const comments = await getComments();
  const count = comments.length;

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-10 py-14 md:py-20">
      <PageHeader title="Livre _d'or_">
        <p>Laissez un commentaire, une impression ou un mot sur l&apos;univers photographique.</p>
      </PageHeader>

      <div className="grid md:grid-cols-12 gap-14 md:gap-10">
        <section aria-labelledby="titre-messages" className="md:col-span-8 order-2 md:order-1">
          <h2 id="titre-messages" className="kicker text-muted mb-8">
            {count} message{count > 1 ? 's' : ''}
          </h2>
          <CommentList comments={comments} />
        </section>

        <aside className="md:col-span-4 order-1 md:order-2">
          <div className="md:sticky md:top-8 animate-rise [--d:300ms]">
            <CommentForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
