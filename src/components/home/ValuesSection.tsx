import { MISSION_TEXT, ABOUT_HIGHLIGHTS, VISION_TEXT } from '@/data/about';
import SectionHeading from '@/components/common/SectionHeading';

export default function ValuesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Pse ne" title="Pse të na zgjidhni ne?" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ABOUT_HIGHLIGHTS.map(({ title, text }, index) => (
            <article key={title} className="rounded-3xl border border-brand-black/10 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-green hover:shadow-card-hover">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green text-lg font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-brand-black">{title}</h3>
              <p className="mt-3 text-brand-black">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-brand-green bg-white p-10 text-brand-black shadow-card-hover">
            <h3 className="text-2xl font-bold">Misioni Ynë</h3>
            <p className="mt-4 leading-relaxed">{MISSION_TEXT}</p>
          </div>
          <div className="rounded-3xl bg-brand-green p-10 text-white shadow-card-hover">
            <h3 className="text-2xl font-bold">Vizioni Ynë</h3>
            <p className="mt-4 leading-relaxed text-white/90">{VISION_TEXT}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
