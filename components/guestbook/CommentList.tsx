import { formatDate } from '@/lib/format';
import type { Comment } from '@/lib/types';

/** Messages du livre d'or, présentés en colonnes. */
export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return (
      <p className="py-16 text-center text-muted border border-dashed border-line">
        Aucun commentaire pour le moment. Soyez le premier à laisser un mot&nbsp;!
      </p>
    );
  }

  return (
    <ol className="sm:columns-2 gap-6" data-stagger="up">
      {comments.map((comment) => (
        <li key={comment.id} className="break-inside-avoid mb-6">
          <article className="bg-paper-deep p-7">
            <span aria-hidden className="block font-serif text-5xl leading-none text-line">
              “
            </span>
            <blockquote className="-mt-2 font-serif text-xl leading-relaxed whitespace-pre-line">
              {comment.content}
            </blockquote>
            <footer className="mt-6 pt-4 border-t border-line flex justify-between gap-4 kicker">
              <span>{comment.author}</span>
              <time dateTime={comment.created_at} className="text-muted font-normal">
                {formatDate(comment.created_at)}
              </time>
            </footer>
          </article>
        </li>
      ))}
    </ol>
  );
}
