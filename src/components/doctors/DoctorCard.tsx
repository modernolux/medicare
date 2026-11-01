import { Stethoscope } from 'lucide-react';
import { getDoctorDisplayName } from '@/data/doctors';
import type { Doctor } from '@/data/doctors';
import { SPECIALTIES } from '@/data/specialties';

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const Icon = SPECIALTIES.find((specialty) => specialty.doctorSpecialty === doctor.specialty)?.icon ?? Stethoscope;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-brand-black/10 bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-white">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-brand-black shadow-sm transition duration-300 group-hover:bg-brand-black group-hover:text-white">
          <Icon className="h-9 w-9" aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-6 text-lg font-bold text-brand-ink">{getDoctorDisplayName(doctor)}</h3>
      <p className="mt-1 font-medium text-brand-green-dark">{doctor.specialty}</p>
    </article>
  );
}
