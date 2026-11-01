import PageBanner from '@/components/layout/PageBanner';
import FeatureStrip from '@/components/common/FeatureStrip';
import { ABOUT_HIGHLIGHTS, ABOUT_INTRO, MISSION_TEXT } from '@/data/about';
import { IMAGES } from '@/data/images';
import { useSeo } from '@/hooks/useSeo';

export default function AboutPage() {
  useSeo({
    title: 'Rreth Nesh',
    description: 'Historia dhe misioni i qendrës Medicare Durrës, e themeluar në vitin 2003 në qytetin e Durrësit.',
  });

  return (
    <>
      <PageBanner title="Rreth Nesh" />
      <section className="section-pad container-page">
        <h2 className="text-center text-3xl font-bold text-brand-green-dark sm:text-4xl">Rreth qendrës Medicare!</h2>
        <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-relaxed text-brand-muted">{ABOUT_INTRO}</p>
      </section>
      <FeatureStrip items={ABOUT_HIGHLIGHTS} />
      <section className="section-pad container-page grid items-center gap-12 lg:grid-cols-2">
        <img
          src={IMAGES.clinicFacade}
          alt="Fasada e qendrës Medicare Durrës"
          loading="lazy"
          className="h-[460px] w-full rounded-3xl object-cover shadow-card"
        />
        <div className="rounded-3xl border-2 border-brand-green bg-white p-10 text-brand-black shadow-card">
          <h3 className="text-2xl font-bold">Misioni ynë</h3>
          <p className="mt-4 leading-relaxed">{MISSION_TEXT}</p>
        </div>
      </section>
    </>
  );
}
