import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import MapEmbed from '@/components/location/MapEmbed';
import { CONTACT, FULL_ADDRESS } from '@/data/contact';
import { MAPS_LINK } from '@/data/location';

export default function LocationSection() {
  return (
    <section className="relative bg-white md:min-h-[620px]">
      <div className="h-[320px] md:absolute md:inset-0 md:h-auto">
        <MapEmbed />
      </div>
      <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-white/40 to-transparent md:block" aria-hidden="true" />
      <div className="container-page relative py-8 md:flex md:min-h-[620px] md:items-center md:justify-start md:py-0">
        <div className="pointer-events-auto w-full max-w-md rounded-3xl bg-white p-8 shadow-card-hover sm:p-10">
          <h2 className="text-2xl font-bold text-brand-black sm:text-3xl">Ku mund të na gjeni?</h2>
          <p className="mt-2 font-semibold text-brand-ink">Medicare Durrës</p>
          <ul className="mt-6 space-y-4 text-brand-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span>{FULL_ADDRESS}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`} className="break-all transition hover:text-brand-black">{CONTACT.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <a href={CONTACT.phoneHref} className="transition hover:text-brand-black">{CONTACT.phone}</a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
          <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full">
            Hap në Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
