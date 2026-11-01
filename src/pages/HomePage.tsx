import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesShowcase from '@/components/home/ServicesShowcase';
import ValuesSection from '@/components/home/ValuesSection';
import DoctorsPreview from '@/components/home/DoctorsPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LocationSection from '@/components/location/LocationSection';
import { useSeo } from '@/hooks/useSeo';

export default function HomePage() {
  useSeo({
    title: 'Kryefaqja',
    description: 'Qendër diagnostike me shërbime mjekësore të plota në Durrës: tomografi, radiografi, ekografi, konsulta me specialistë dhe laborator.',
  });

  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutPreview />
      <ServicesShowcase />
      <ValuesSection />
      <DoctorsPreview />
      <TestimonialsSection />
      <LocationSection />
    </>
  );
}
