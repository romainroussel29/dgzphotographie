'use client';

import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import LoadError from '@/components/ui/LoadError';
import { fetchComments } from '@/lib/data/comments';
import type { Comment } from '@/lib/types';

/** Livre d'or : liste des messages (chargée depuis Supabase) et formulaire de publication. */
export default function Guestbook() {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchComments().then(
      (data) => !cancelled && setComments(data),
      (error: unknown) => {
        console.error(error);
        if (!cancelled) setFailed(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const count = comments?.length ?? 0;

  return (
    <div className="grid md:grid-cols-12 gap-14 md:gap-10">
      <section aria-labelledby="titre-messages" className="md:col-span-8 order-2 md:order-1">
        <h2 id="titre-messages" className="kicker text-muted mb-8">
          {comments ? `${count} message${count > 1 ? 's' : ''}` : 'Messages'}
        </h2>

        {failed ? (
          <LoadError what="Le livre d'or" />
        ) : comments ? (
          <CommentList comments={comments} />
        ) : (
          <div className="grid sm:grid-cols-2 gap-6" aria-busy="true" aria-label="Chargement des messages">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-paper-deep animate-pulse" />
            ))}
          </div>
        )}
      </section>

      <aside className="md:col-span-4 order-1 md:order-2">
        <div className="md:sticky md:top-8 animate-rise [--d:300ms]">
          <CommentForm onPublished={(comment) => setComments((list) => [comment, ...(list ?? [])])} />
        </div>
      </aside>
    </div>
  );
}
