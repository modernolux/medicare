import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '@/data/contact';
import { DOCTORS, getDoctorDisplayName } from '@/data/doctors';
import { SERVICES } from '@/data/services';
import { SPECIALTIES } from '@/data/specialties';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/links';

const SERVICE_OPTIONS = [
  ...SERVICES.filter((service) => service.slug !== 'konsulta').map((service) => service.title),
  ...SPECIALTIES.map((specialty) => `Konsulta: ${specialty.doctorSpecialty}`),
];

interface BookingFormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  message: string;
}

type BookingFormErrors = Partial<Record<keyof BookingFormState, string>>;

interface BookingLinks {
  whatsapp: string;
  mailto: string;
}

const inputClass =
  'w-full rounded-xl border border-brand-black/15 bg-white px-4 py-3 text-brand-ink outline-none transition placeholder:text-brand-muted/60 focus:border-brand-black focus:ring-4 focus:ring-brand-black/10';
const labelClass = 'mb-2 block text-sm font-medium text-brand-ink';
const errorClass = 'mt-2 text-sm text-red-700';

function validate(form: BookingFormState): BookingFormErrors {
  const errors: BookingFormErrors = {};
  if (!form.name.trim()) errors.name = 'Ju lutemi shkruani emrin dhe mbiemrin.';
  if (!/^\+?[0-9\s]{6,20}$/.test(form.phone.trim())) errors.phone = 'Ju lutemi shkruani një numër telefoni të vlefshëm.';
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = 'Email-i nuk është i vlefshëm.';
  if (!form.service) errors.service = 'Zgjidhni shërbimin.';
  if (!form.date) errors.date = 'Zgjidhni një datë.';
  return errors;
}

function buildMessage(form: BookingFormState): string {
  const lines = [
    'Përshëndetje, dëshiroj të rezervoj një takim.',
    `Emri: ${form.name.trim()}`,
    `Telefoni: ${form.phone.trim()}`,
  ];
  if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
  lines.push(`Shërbimi: ${form.service}`);
  if (form.doctor) lines.push(`Mjeku: ${form.doctor}`);
  lines.push(`Data e preferuar: ${form.date}`);
  if (form.message.trim()) lines.push(`Mesazhi: ${form.message.trim()}`);
  return lines.join('\n');
}

interface BookingFormProps {
  initialService?: string;
}

export default function BookingForm({ initialService = '' }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormState>({
    name: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS.includes(initialService) ? initialService : '',
    doctor: '',
    date: '',
    message: '',
  });
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [links, setLinks] = useState<BookingLinks | null>(null);
  const today = new Date().toISOString().split('T')[0];

  const updateField = (key: keyof BookingFormState) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((previous) => ({ ...previous, [key]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const message = buildMessage(form);
    const whatsapp = buildWhatsAppUrl(message);
    const mailto = buildMailtoUrl(`Rezervim takimi - ${form.service}`, message);
    window.open(whatsapp, '_blank', 'noopener,noreferrer');
    setLinks({ whatsapp, mailto });
  };

  if (links) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-green-dark" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold text-brand-black">Faleminderit!</h3>
        <p className="mt-3 text-brand-ink">
          Kërkesa juaj për takim u përgatit. Nëse dritarja e WhatsApp nuk u hap, dërgoni mesazhin direkt në numrin{' '}
          {CONTACT.phone} ose na shkruani në email.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Dërgo në WhatsApp
          </a>
          <a href={links.mailto} className="btn-outline">
            <Mail className="h-4 w-4" aria-hidden="true" />
            Dërgo me email
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="booking-name" className={labelClass}>Emri dhe Mbiemri *</label>
        <input id="booking-name" className={inputClass} value={form.name} onChange={updateField('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="booking-phone" className={labelClass}>Telefoni *</label>
        <input id="booking-phone" type="tel" className={inputClass} value={form.phone} onChange={updateField('phone')} autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="booking-email" className={labelClass}>Email (opsionale)</label>
        <input id="booking-email" type="email" className={inputClass} value={form.email} onChange={updateField('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="booking-date" className={labelClass}>Data e preferuar *</label>
        <input id="booking-date" type="date" min={today} className={inputClass} value={form.date} onChange={updateField('date')} aria-invalid={Boolean(errors.date)} />
        {errors.date && <p className={errorClass}>{errors.date}</p>}
      </div>
      <div>
        <label htmlFor="booking-service" className={labelClass}>Shërbimi *</label>
        <select id="booking-service" className={inputClass} value={form.service} onChange={updateField('service')} aria-invalid={Boolean(errors.service)}>
          <option value="">Zgjidhni shërbimin</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.service && <p className={errorClass}>{errors.service}</p>}
      </div>
      <div>
        <label htmlFor="booking-doctor" className={labelClass}>Mjeku (opsionale)</label>
        <select id="booking-doctor" className={inputClass} value={form.doctor} onChange={updateField('doctor')}>
          <option value="">Pa preferencë</option>
          {DOCTORS.map((doctor) => (
            <option key={doctor.name} value={getDoctorDisplayName(doctor)}>
              {getDoctorDisplayName(doctor)} - {doctor.specialty}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="booking-message" className={labelClass}>Mesazhi</label>
        <textarea id="booking-message" rows={4} className={inputClass} value={form.message} onChange={updateField('message')} />
      </div>
      <div className="sm:col-span-2 flex flex-col items-start gap-3">
        <button type="submit" className="btn-primary w-full sm:w-auto">Dërgo kërkesën</button>
        <p className="text-sm text-brand-muted">Fushat me * janë të detyrueshme.</p>
      </div>
    </form>
  );
}
