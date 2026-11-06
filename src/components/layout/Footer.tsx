import { Link } from 'react-router-dom';
import { Clock, Instagram, Mail, MapPin, Phone, Facebook } from 'lucide-react';
import { CONTACT, FULL_ADDRESS } from '@/data/contact';
import { FOOTER_MAIN_LINKS } from '@/data/navigation';
import { SERVICES } from '@/data/services';
import { SPECIALTIES } from '@/data/specialties';
import { LOGO } from '@/data/logo';

const columnTitleClass = 'mb-5 text-base font-semibold text-brand-green';
const linkClass = 'text-brand-black transition hover:translate-x-1 hover:text-brand-green';
const contactIconClass = 'mt-0.5 h-5 w-5 shrink-0 text-brand-green';
const bottomLinkClass = 'rounded transition hover:text-brand-green md:hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green';

export default function Footer() {
  const copyrightText = `© ${new Date().getFullYear()} Qendra Diagnostikuese Medicare. Të gjitha të drejtat e rezervuara.`;
  return <footer className="bg-white px-4 pb-[110px] pt-6 sm:px-6 sm:py-10 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-brand-green bg-white shadow-card"><div className="grid gap-12 p-6 sm:p-10 md:grid-cols-2 lg:grid-cols-4 lg:p-14">
    <div><Link to="/" className="inline-block"><img src={LOGO} alt="Medicare Qendër Diagnostike Durrës" className="h-12 w-auto" loading="lazy" /></Link><p className="mt-5 max-w-xs text-brand-black">Qendër diagnostike me shërbime mjekësore të plota, me staf të specializuar dhe aparaturë moderne në Durrës.</p><div className="mt-6 flex gap-3"><a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Faqja jonë në Facebook" className="text-brand-green transition hover:text-brand-green-dark"><Facebook className="h-5 w-5" aria-hidden="true" /></a><a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Profili ynë në Instagram" className="text-brand-green transition hover:text-brand-green-dark"><Instagram className="h-5 w-5" aria-hidden="true" /></a></div></div>
    <div><h2 className={columnTitleClass}>Kryesoret</h2><ul className="space-y-3">{FOOTER_MAIN_LINKS.map((link) => <li key={link.to}><Link to={link.to} className={linkClass}>{link.label}</Link></li>)}</ul></div>
    <div><h2 className={columnTitleClass}>Shërbimet</h2><ul className="max-h-72 space-y-3 overflow-y-auto pr-2">{SERVICES.filter((service) => service.slug !== 'konsulta').map((service) => <li key={service.slug}><Link to={service.path} className={linkClass}>{service.title}</Link></li>)}{SPECIALTIES.map((specialty) => <li key={specialty.slug}><Link to={`/sherbimet/konsulta/${specialty.slug}`} className={linkClass}>Konsulta {specialty.name}</Link></li>)}</ul></div>
    <div><h2 className={columnTitleClass}>Kontakte</h2><ul className="space-y-4 text-brand-black"><li className="flex gap-3"><MapPin className={contactIconClass} aria-hidden="true" /><span>{FULL_ADDRESS}</span></li><li className="flex gap-3"><Mail className={contactIconClass} aria-hidden="true" /><a href={`mailto:${CONTACT.email}`} className="break-all transition hover:text-brand-green">{CONTACT.email}</a></li><li className="flex gap-3"><Phone className={contactIconClass} aria-hidden="true" /><a href={CONTACT.phoneHref} className="transition hover:text-brand-green">{CONTACT.phone}</a></li><li className="flex gap-3"><Clock className={contactIconClass} aria-hidden="true" /><span>{CONTACT.hours}</span></li></ul></div>
  </div><div className="border-t border-brand-black/10 px-6 py-5 text-[13px] leading-[1.5] text-[#4B5563] sm:px-10 lg:px-14"><div className="flex flex-col items-center gap-2.5 text-center md:flex-row md:justify-between md:text-left"><div className="flex flex-nowrap items-center justify-center gap-x-2 sm:gap-x-3"><Link to="/rregullat-dhe-kushtet" className={bottomLinkClass}>Rregullat dhe Kushtet</Link><span className="h-3.5 w-px bg-brand-black/20" aria-hidden="true" /><Link to="/politikat-e-privatesise" className={bottomLinkClass}>Politikat e Privatësisë</Link></div><p>{copyrightText}</p></div><p className="mt-2.5 text-center">Website u krijua nga <a href="https://webgreal.com/" target="_blank" rel="noopener" className="font-semibold text-brand-green-dark underline-offset-4 transition hover:underline">Webgreal.com</a></p></div></div></footer>;
}
