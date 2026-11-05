import type { ReactNode } from 'react';

interface ServiceHeroProps {
  image: string;
  imageAlt: string;
  title: string;
  intro: string;
  subtitle?: string;
  imageContent?: ReactNode;
}

export function ServiceHero({ image, imageAlt, title, intro, subtitle, imageContent }: ServiceHeroProps) {
  return (
    <section className="section-pad container-page grid items-center gap-12 lg:grid-cols-2">
      {imageContent ?? <img src={image} alt={imageAlt} className="h-[420px] w-full rounded-3xl object-cover shadow-card md:h-[520px]" />}
      <div>
        <h2 className="text-3xl font-bold text-brand-green-dark sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-xl font-semibold text-brand-black">{subtitle}</p>}
        <p className="mt-6 text-lg leading-relaxed text-brand-muted">{intro}</p>
      </div>
    </section>
  );
}

export function ExamChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <h2 className="text-center text-3xl font-bold text-brand-black sm:text-4xl">{title}</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-4 rounded-2xl bg-white px-6 py-4 font-medium text-brand-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-green" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
