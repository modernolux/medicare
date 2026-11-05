import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useParams } from 'react-router-dom';
import PageBanner from '@/components/layout/PageBanner';
import FeatureStrip from '@/components/common/FeatureStrip';
import { ExamChecklist, ServiceHero } from '@/components/services/ServiceHero';
import ServiceGallery, { AMBULANCE_GALLERY } from '@/components/services/ServiceGallery';
import CtaBox from '@/components/services/CtaBox';
import NotFoundPage from '@/pages/NotFoundPage';
import { getServiceBySlug, SERVICE_PAGE_HIGHLIGHTS } from '@/data/services';
import { CONTACT } from '@/data/contact';
import { buildWhatsAppUrl } from '@/lib/links';
import { useSeo } from '@/hooks/useSeo';

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const service = getServiceBySlug(slug);
  useSeo({ title: service?.title ?? 'Shërbimi', description: service?.cardText ?? '' });
  if (!service || (service.items.length === 0 && service.slug !== 'vizita-ne-shtepi')) return <NotFoundPage />;
  const isHomeVisit = service.slug === 'vizita-ne-shtepi';
  return (
    <>
      <PageBanner title={service.title} parent={{ label: 'Shërbimet', to: '/sherbimet' }} />
      <ServiceHero image={service.image} imageAlt={service.imageAlt} title={service.title} subtitle={service.subtitle} intro={service.intro} />
      {service.slug === 'transport-me-ambulance' && <ServiceGallery images={AMBULANCE_GALLERY} />}
      {service.slug === 'sherbime-infermierore' && <p className="container-page pb-10 text-lg text-brand-muted">Ky shërbim ofrohet edhe në <Link to="/sherbimet/vizita-ne-shtepi" className="font-semibold text-brand-green-dark underline">shtëpi</Link>.</p>}
      {service.items.length > 0 && <ExamChecklist title="Ekzaminimet që ofrojmë" items={service.items} />}
      {isHomeVisit ? <section className="container-page flex flex-wrap gap-4 pb-16"><a href={CONTACT.phoneHref} className="btn-primary"><Phone className="h-4 w-4" aria-hidden="true" />Telefono</a><a href={buildWhatsAppUrl(`Përshëndetje, dua të rezervoj një takim për shërbimin: ${service.title}.`)} target="_blank" rel="noopener noreferrer" className="btn-primary">Rezervo një takim</a></section> : <CtaBox serviceLabel={service.title} />}
      <FeatureStrip items={SERVICE_PAGE_HIGHLIGHTS} />
    </>
  );
}
