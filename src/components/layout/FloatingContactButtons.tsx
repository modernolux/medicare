import { Phone } from 'lucide-react';
import { CONTACT } from '@/data/contact';
import { buildWhatsAppUrl } from '@/lib/links';

const floatingClass =
  'flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4';

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:hidden">
      <a
        href={buildWhatsAppUrl('Përshëndetje, dëshiroj informacion.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Na shkruani në WhatsApp"
        className={`${floatingClass} focus-visible:ring-brand-green/50`}
      >
        <img src="/dia.png" alt="" className="h-12 w-12" />
      </a>
      <a
        href={CONTACT.phoneHref}
        aria-label={`Telefononi: ${CONTACT.phone}`}
        className={`${floatingClass} bg-brand-black focus-visible:ring-brand-black/40`}
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
      </a>
    </div>
  );
}
