import { useState } from 'react';
import type { FormEvent } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageBanner from '@/components/layout/PageBanner';
import MapEmbed from '@/components/location/MapEmbed';
import { CONTACT, FULL_ADDRESS } from '@/data/contact';
import { buildMailtoUrl } from '@/lib/links';
import { useSeo } from '@/hooks/useSeo';

const INFO_ITEMS = [
  { icon: MapPin, label: 'Adresa', value: FULL_ADDRESS },
  { icon: Phone, label: 'Telefoni', value: CONTACT.phone, href: CONTACT.phoneHref },
  { icon: Mail, label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { icon: Clock, label: 'Orari', value: CONTACT.hours },
];

const inputClass =
  'w-full rounded-xl border border-brand-black/15 bg-white px-4 py-3 text-brand-ink outline-none transition focus:border-brand-black focus:ring-4 focus:ring-brand-black/10';

export default function ContactPage() {
  useSeo({ title: 'Kontakti', description: 'Kontaktoni Medicare Qendër Diagnostike Durrës: adresa, telefoni, email dhe orari i punës.' });
  const [mailto, setMailto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Ju lutemi plotësoni emrin dhe mesazhin.');
      return;
    }
    setError('');
    setMailto(buildMailtoUrl(`Mesazh nga ${name.trim()}`, `Emri: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`));
  };

  return (
    <>
      <PageBanner title="Kontakti" />
      <section className="section-pad container-page grid gap-8 lg:grid-cols-2">
        <div className="grid gap-4 sm:grid-cols-2">
          {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="rounded-2xl bg-white p-6 shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-black text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-brand-black">{label}</h3>
              {href ? (
                <a href={href} className="mt-2 block text-brand-ink transition hover:text-brand-black">{value}</a>
              ) : (
                <p className="mt-2 text-brand-ink">{value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-3xl shadow-card lg:min-h-full">
          <MapEmbed />
        </div>
      </section>
      <section className="container-page pb-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-brand-black">Na shkruani</h2>
          {mailto ? (
            <div role="status" className="mt-6 rounded-2xl bg-white p-6">
              <p className="text-brand-ink">Faleminderit! Mesazhi juaj u përgatit. Nëse nuk u hap aplikacioni i email-it, dërgojeni direkt në {CONTACT.email}.</p>
              <a href={mailto} className="btn-primary mt-6 inline-flex">Hap email-in</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-brand-ink">Emri dhe Mbiemri *</label>
                <input id="contact-name" className={inputClass} value={name} onChange={(event) => setName(event.target.value)} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-brand-ink">Email (opsionale)</label>
                <input id="contact-email" type="email" className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-brand-ink">Mesazhi *</label>
                <textarea id="contact-message" rows={5} className={inputClass} value={message} onChange={(event) => setMessage(event.target.value)} />
              </div>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button type="submit" className="btn-primary w-full sm:w-auto">Dërgo mesazhin</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
