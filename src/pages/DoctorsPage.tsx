import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBanner from '@/components/layout/PageBanner';
import DoctorCard from '@/components/doctors/DoctorCard';
import { DOCTORS } from '@/data/doctors';
import { SPECIALTIES } from '@/data/specialties';
import { useSeo } from '@/hooks/useSeo';

const ALL_LABEL = 'Të gjithë';

export default function DoctorsPage() {
  useSeo({ title: 'Mjekët Tanë', description: 'Mjekët specialistë të Medicare Durrës, të grupuar sipas specialitetit.' });
  const [searchParams] = useSearchParams();
  const requestedSpecialty = searchParams.get('specialty');
  const [filter, setFilter] = useState(requestedSpecialty ?? ALL_LABEL);

  const specialties = useMemo(
    () => SPECIALTIES.map((specialty) => specialty.doctorSpecialty).filter((name) => DOCTORS.some((doctor) => doctor.specialty === name)),
    [],
  );
  const visibleDoctors = filter === ALL_LABEL ? DOCTORS : DOCTORS.filter((doctor) => doctor.specialty === filter);

  return (
    <>
      <PageBanner title="Mjekët Tanë" />
      <section className="section-pad container-page">
        <div role="group" aria-label="Filtro sipas specialitetit" className="mb-12 flex flex-wrap justify-center gap-3">
          {[ALL_LABEL, ...specialties].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 ${
                filter === item
                  ? 'bg-brand-black text-white shadow-md'
                  : 'border border-brand-black/20 bg-white text-brand-black hover:-translate-y-0.5 hover:bg-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visibleDoctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>
      </section>
    </>
  );
}
