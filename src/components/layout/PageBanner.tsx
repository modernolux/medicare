import { Link } from 'react-router-dom';

interface PageBannerProps {
  title: string;
  parent?: { label: string; to: string };
}

export default function PageBanner({ title, parent }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/60" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-brand-green/10" aria-hidden="true" />
      <div className="container-page relative py-14 md:py-20">
        <nav aria-label="Shtegu" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-brand-muted">
          <Link to="/" className="transition hover:text-brand-black">Kryefaqja</Link>
          {parent && (
            <>
              <span aria-hidden="true">/</span>
              <Link to={parent.to} className="transition hover:text-brand-black">{parent.label}</Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span className="font-medium text-brand-black" aria-current="page">{title}</span>
        </nav>
        <h1 className="text-3xl font-bold text-brand-black sm:text-4xl lg:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
