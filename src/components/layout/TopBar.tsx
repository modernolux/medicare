import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';
import { CONTACT, FULL_ADDRESS } from '@/data/contact';

export default function TopBar() {
  return (
    <div className="border-b border-brand-black/20 bg-brand-green text-sm text-white">
      <div className="container-page flex h-11 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a href={CONTACT.phoneHref} className="flex items-center gap-2 font-medium text-white transition hover:text-white focus:text-white active:text-white">
            <Phone className="h-4 w-4 text-brand-black" aria-hidden="true" />
            {CONTACT.phone}
          </a>
          <span className="hidden items-center gap-2 md:flex">
            <MapPin className="h-4 w-4 text-brand-black" aria-hidden="true" />
            {FULL_ADDRESS}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Faqja jonë në Facebook" className="flex h-8 w-8 items-center justify-center rounded-full text-brand-black transition hover:bg-brand-black hover:text-white">
            <Facebook className="h-4 w-4" aria-hidden="true" />
          </a>
          <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Profili ynë në Instagram" className="flex h-8 w-8 items-center justify-center rounded-full text-brand-black transition hover:bg-brand-black hover:text-white">
            <Instagram className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
