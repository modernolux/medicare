import { Link, useParams } from 'react-router-dom';
import PageBanner from '@/components/layout/PageBanner';
import NotFoundPage from '@/pages/NotFoundPage';
import { getDoctorBySlug, getDoctorDisplayName } from '@/data/doctors';
import { useSeo } from '@/hooks/useSeo';

export default function DoctorDetailPage() {
  const { slug = '' } = useParams();
  const doctor = getDoctorBySlug(slug);
  useSeo({ title: doctor ? getDoctorDisplayName(doctor) : 'Mjeku nuk u gjet', description: doctor ? `${getDoctorDisplayName(doctor)} është mjek specialist ${doctor.specialty} në Medicare Qendër Diagnostike Durrës.` : 'Mjeku që kërkuat nuk ekziston në faqen e Medicare Qendër Diagnostike Durrës.' });
  if (!doctor) return <NotFoundPage />;
  return <><PageBanner title={getDoctorDisplayName(doctor)} parent={{ label: 'Mjekët Tanë', to: '/mjeket-tane' }} /><section className="section-pad container-page"><h2 className="text-3xl font-bold text-brand-green-dark">{doctor.specialty}</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-muted">Konsultohuni me mjekun specialist {getDoctorDisplayName(doctor)} në Medicare Qendër Diagnostike Durrës.</p><Link to={`/sherbimet/konsulta/${doctor.specialty.toLocaleLowerCase()}`} className="btn-primary mt-8 inline-flex">Shiko konsultat</Link></section></>;
}
