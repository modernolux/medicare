import type { LucideIcon } from 'lucide-react';

export interface FeatureItem {
  title: string;
  text?: string;
  icon: LucideIcon;
}

export default function FeatureStrip({ items }: { items: FeatureItem[] }) {
  return (
    <section className="bg-white py-14">
      <div className="container-page grid gap-8 md:grid-cols-3">
        {items.map(({ title, text, icon: Icon }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-black text-white shadow-md shadow-brand-black/20">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-brand-black">{title}</h3>
              {text && <p className="mt-2 text-brand-muted">{text}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
