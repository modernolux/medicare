import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/common/SectionHeading';
import { IMAGES } from '@/data/images';
import { getServiceBySlug } from '@/data/services';
import { SERVICE_HUB_SEARCH_ITEMS } from '@/data/serviceHub';

const featuredCards = [
  { label: 'Imazheri', to: '/sherbimet', image: IMAGES.placeholderCt, alt: 'Aparat tomografie në klinikën Medicare' },
  { label: 'Elektrofiziologji', to: '/sherbimet/elektrofiziologji', image: 'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793466402/Gemini_Generated_Image_q04o7tq04o7tq04o.jpg', alt: 'Ekzaminim EEG i trurit' },
  { label: 'Konsulta', to: '/mjeket-tane', image: 'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793466187/Gemini_Generated_Image_sfoqszsfoqszsfoq.jpg', alt: 'Konsultë me mjekun specialist' },
];

const hubServiceSlugs = [
  'laborator',
  'endoskopi',
  'sherbime-infermierore',
  'transport-me-ambulance',
  'paisje-ortopedike',
];

const hubSpecialtySlugs = ['kardiologji', 'neurologji'];

const hubServices = [
  ...hubServiceSlugs.map((slug) => getServiceBySlug(slug)!),
  ...hubSpecialtySlugs.map((slug) => ({
    title: getServiceBySlug('konsulta')!.title,
    path: `/sherbimet/konsulta/${slug}`,
    icon: SERVICE_HUB_SEARCH_ITEMS.find((item) => item.to.endsWith(slug))!.icon,
    hubTitle: slug === 'kardiologji' ? 'Kardiologji' : 'Neurologji',
  })),
];

export default function ServicesShowcase() {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searchResults = useMemo(
    () => SERVICE_HUB_SEARCH_ITEMS.filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery)).slice(0, 6),
    [normalizedQuery],
  );

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading eyebrow="Shërbimet" title="Shërbimet Tona" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {featuredCards.map((card) => (
            <Link
              key={card.label}
              to={card.to}
              className="group relative block h-96 overflow-hidden rounded-3xl shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img src={card.image} alt={card.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-6 left-6 rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-brand-ink shadow-md">
                {card.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mx-[-4px] my-12 rounded-[32px] border border-brand-green bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.05)] sm:mx-0 sm:p-8 lg:my-20 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">Shërbimet e tjera</p>
          <h2 className="mt-3 text-[28px] font-bold text-[#111111] lg:text-4xl">Çfarë shërbimi po kërkoni?</h2>
          <p className="mt-3 max-w-2xl text-[#444444]">Zgjidhni shërbimin ose kërkoni ekzaminimin që ju nevojitet.</p>

          <div className="relative mt-8">
            <label htmlFor="service-search" className="sr-only">Kërko shërbim</label>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-green" aria-hidden="true" />
            <input
              id="service-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Kërko shërbim, p.sh. CT, EEG, analiza..."
              className="w-full rounded-full border border-brand-green bg-white py-4 pl-14 pr-5 text-brand-black outline-none placeholder:text-[#6B7280] focus:border-brand-green focus:ring-2 focus:ring-brand-green/70"
            />
            {normalizedQuery && (
              <div className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-xl">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={`${item.to}-${item.label}`}
                        to={item.to}
                        onClick={() => setQuery('')}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-brand-black transition hover:bg-brand-green/10"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-brand-green" aria-hidden="true" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })
                ) : (
                  <p className="px-3 py-3 text-sm text-brand-black">Nuk u gjet asnjë shërbim. Na kontaktoni.</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {hubServices.map((service) => {
              const Icon = service.icon;
              const label = 'hubTitle' in service ? service.hubTitle : service.title;
              return (
                <Link
                  key={label}
                  to={service.path}
                  className="group relative flex min-h-[120px] flex-col rounded-[20px] border border-brand-green/45 bg-white p-4 transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:min-h-[150px] lg:p-5 lg:hover:-translate-y-0.5 lg:hover:border-brand-green lg:hover:shadow-[0_6px_20px_rgba(77,157,65,0.15)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand-green/10 text-brand-green">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-auto max-w-[calc(100%-20px)] pt-5 text-sm font-bold leading-tight text-[#111111] lg:text-base">{label}</span>
                  <ArrowRight className="absolute bottom-4 right-4 h-4 w-4 text-brand-green transition duration-200 lg:group-hover:translate-x-1 lg:bottom-5 lg:right-5" aria-hidden="true" />
                </Link>
              );
            })}
            <Link
              to="/sherbimet"
              className="group flex min-h-[120px] flex-col justify-between rounded-[20px] bg-brand-green p-4 text-white transition duration-200 hover:bg-brand-green-dark active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green lg:min-h-[150px] lg:p-5"
            >
              <span className="text-sm font-bold leading-tight lg:text-base">Të gjitha shërbimet</span>
              <ArrowRight className="h-5 w-5 self-end transition duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
