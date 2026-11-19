import InstagramIcon from '@/components/ui/InstagramIcon';
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_LINK } from '@/lib/site';

const rowClass = 'flex justify-between gap-4 py-4 border-b border-line';

/** Coordonnées du photographe sous forme de liste de définitions. */
export default function ContactDetails() {
  return (
    <address className="not-italic">
      <dl className="border-t border-ink" data-stagger="up">
        <div className={rowClass}>
          <dt className="kicker text-muted">Téléphone</dt>
          <dd>
            <a href={PHONE_LINK} className="link-draw">{PHONE_DISPLAY}</a>
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="kicker text-muted">Email</dt>
          <dd>
            <a href={`mailto:${EMAIL}`} className="link-draw break-all">{EMAIL}</a>
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="kicker text-muted">Instagram</dt>
          <dd>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 link-draw"
            >
              <InstagramIcon />@{INSTAGRAM_HANDLE}
            </a>
          </dd>
        </div>
        <div className={rowClass}>
          <dt className="kicker text-muted">Lieu</dt>
          <dd>Marseille &amp; alentours</dd>
        </div>
        <div className={rowClass}>
          <dt className="kicker text-muted">Spécialité</dt>
          <dd>Portrait noir &amp; blanc</dd>
        </div>
      </dl>
    </address>
  );
}
