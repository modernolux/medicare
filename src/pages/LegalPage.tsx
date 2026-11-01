import PageBanner from '@/components/layout/PageBanner';
import type { LegalDocument } from '@/data/legal';
import { useSeo } from '@/hooks/useSeo';

export default function LegalPage({ document }: { document: LegalDocument }) {
  useSeo({ title: document.title, description: `${document.title} të Medicare Qendër Diagnostike Durrës.` });

  return (
    <>
      <PageBanner title={document.title} />
      <article className="section-pad container-page max-w-4xl">
        {document.sections.map((section) => (
          <section key={section.heading} className="mb-10">
            <h2 className="text-2xl font-bold text-brand-black">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 leading-relaxed text-brand-ink">{paragraph}</p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
