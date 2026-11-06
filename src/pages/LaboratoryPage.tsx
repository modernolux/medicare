import PageBanner from '@/components/layout/PageBanner';
import AnalysisBrowser from '@/components/laborator/AnalysisBrowser';
import CtaBox from '@/components/services/CtaBox';
import { ServiceHero } from '@/components/services/ServiceHero';
import NotFoundPage from '@/pages/NotFoundPage';
import { getServiceBySlug } from '@/data/services';
import { useSeo } from '@/hooks/useSeo';

export default function LaboratoryPage() {
  const service = getServiceBySlug('laborator');
  useSeo({ title: 'Laborator', description: service?.cardText ?? '', structuredData: service ? { '@type': 'Service', name: service.title, description: service.intro, provider: { '@id': 'https://www.medicaredurres.al/#clinic' }, areaServed: 'Durrës', url: 'https://www.medicaredurres.al/sherbimet/laborator' } : undefined });
  if (!service) return <NotFoundPage />;
  return <><PageBanner title={service.title} parent={{ label: 'Shërbimet', to: '/sherbimet' }} /><ServiceHero image={service.image} imageAlt={service.imageAlt} title={service.title} intro={service.intro} /><section className="bg-white py-16 md:py-20"><div className="container-page"><h2 className="text-center text-3xl font-bold text-brand-black sm:text-4xl">Analizat që ofrojmë</h2><div className="mt-12"><AnalysisBrowser /></div></div></section><CtaBox serviceLabel={service.title} /></>;
}
