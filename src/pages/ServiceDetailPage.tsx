import { useParams } from 'react-router-dom';
import PageBanner from '@/components/layout/PageBanner';
import FeatureStrip from '@/components/common/FeatureStrip';
import { ExamChecklist, ServiceHero } from '@/components/services/ServiceHero';
import CtaBox from '@/components/services/CtaBox';
import NotFoundPage from '@/pages/NotFoundPage';
import { getServiceBySlug, SERVICE_PAGE_HIGHLIGHTS } from '@/data/services';
import { useSeo } from '@/hooks/useSeo';

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const service = getServiceBySlug(slug);
  useSeo({ title: service?.title ?? 'Shërbimi', description: service?.cardText ?? '' });

  if (!service || service.items.length === 0) return <NotFoundPage />;

  return (
    <>
      <PageBanner title={service.title} parent={{ label: 'Shërbimet', to: '/sherbimet' }} />
      <ServiceHero image={service.image} imageAlt={service.imageAlt} title={service.title} intro={service.intro} />
      <ExamChecklist title="Ekzaminimet që ofrojmë" items={service.items} />
      <CtaBox serviceLabel={service.title} />
      <FeatureStrip items={SERVICE_PAGE_HIGHLIGHTS} />
    </>
  );
}
