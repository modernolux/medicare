import { useParams } from 'react-router-dom';
import PageBanner from '@/components/layout/PageBanner';
import { ExamChecklist } from '@/components/services/ServiceHero';
import CtaBox from '@/components/services/CtaBox';
import NotFoundPage from '@/pages/NotFoundPage';
import { DOCTORS, getDoctorDisplayName } from '@/data/doctors';
import { getSpecialtyBySlug } from '@/data/specialties';
import { useSeo } from '@/hooks/useSeo';

export default function SpecialtyPage() {
  const { slug = '' } = useParams();
  const specialty = getSpecialtyBySlug(slug);
  useSeo({
    title: specialty ? `Konsulta me ${specialty.name}` : 'Konsulta',
    description: specialty?.intro ?? '',
  });

  if (!specialty) return <NotFoundPage />;

  const doctors = DOCTORS.filter((doctor) => doctor.specialty === specialty.doctorSpecialty);
  const Icon = specialty.icon;

  return (
    <>
      <PageBanner title={`Konsulta me ${specialty.name}`} parent={{ label: 'Mjekët Tanë', to: '/mjeket-tane' }} />
      <section className="section-pad container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="flex h-80 items-center justify-center rounded-3xl bg-white shadow-card">
          <Icon className="h-32 w-32 text-brand-green-dark" strokeWidth={1.25} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-green-dark sm:text-4xl">{specialty.name}</h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-muted">{specialty.intro}</p>
          <h3 className="mt-10 text-xl font-semibold text-brand-black">Mjekët specialistë</h3>
          {doctors.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {doctors.map((doctor) => (
                <li key={doctor.name} className="font-medium text-brand-ink">{getDoctorDisplayName(doctor)}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-brand-muted">TODO: Emrat e mjekëve për këtë specialitet do të shtohen së shpejti.</p>
          )}
        </div>
      </section>
      {specialty.services.length > 0 && <ExamChecklist title="Shërbimet" items={specialty.services} />}
      <CtaBox serviceLabel={`Konsulta: ${specialty.doctorSpecialty}`} />
    </>
  );
}
