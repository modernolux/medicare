import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { DOCTORS } from '@/data/doctors';
import { getSpecialtyBySlug } from '@/data/specialties';

const specialtyOrder = [
  'gastrohepatologji',
  'pneumologji',
  'kardiologji',
  'ortopedi',
  'endokrinologji',
  'hematologji',
  'orl',
  'urologji',
  'reumatologji',
  'neurologji',
  'alergologji',
  'pediatri',
  'dermatologji',
  'radiologji',
  'gjinekologji',
];

export default function DoctorsPreview() {
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-page px-4 sm:px-8 lg:px-10">
        <SectionHeading eyebrow="Ekipi ynë" title="Mjekët Tanë" description="Ekip mjekësh specialistë, pranë jush në Durrës." />
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {specialtyOrder.map((slug, index) => {
            const specialty = getSpecialtyBySlug(slug);
            if (!specialty) return null;
            const doctorCount = DOCTORS.filter((doctor) => doctor.specialty === specialty.doctorSpecialty).length;
            const Icon = specialty.icon;
            const visibility = index >= 10 ? 'hidden' : index >= 6 ? 'hidden sm:flex' : 'flex';

            return (
              <Link
                key={specialty.slug}
                to={`/mjeket-tane?specialty=${encodeURIComponent(specialty.doctorSpecialty)}`}
                className={`${visibility} min-h-32 flex-col rounded-2xl border border-brand-black/10 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-card`}
              >
                <Icon className="h-5 w-5 text-brand-green" aria-hidden="true" />
                <span className="mt-4 text-sm font-bold leading-tight text-brand-black">{specialty.name}</span>
                <span className="mt-auto pt-2 text-xs font-medium text-brand-green">{doctorCount} {doctorCount === 1 ? 'mjek' : 'mjekë'}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/mjeket-tane" className="btn-primary">
            Shiko të gjithë Mjekët
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
