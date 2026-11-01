import PageBanner from '@/components/layout/PageBanner';
import ServiceCard from '@/components/services/ServiceCard';
import { SERVICES } from '@/data/services';
import { useSeo } from '@/hooks/useSeo';

export default function ServicesPage() {
  useSeo({
    title: 'Shërbimet',
    description: 'Shërbimet diagnostikuese dhe mjekësore të Medicare Durrës: tomografi, radiografi, ekografi, laborator dhe më shumë.',
  });

  return (
    <>
      <PageBanner title="Shërbimet" />
      <section className="section-pad container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </section>
    </>
  );
}
