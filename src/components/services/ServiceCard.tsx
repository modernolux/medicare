import { Link } from 'react-router-dom';
import type { Service } from '@/data/services';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="h-56 overflow-hidden">
        <img src={service.image} alt={service.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold text-brand-black">{service.title}</h3>
        <p className="mt-3 flex-1 text-brand-muted">{service.cardText}</p>
        <Link to={service.path} className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-green-dark transition hover:gap-2 hover:text-brand-black">
          Më shumë <span aria-hidden="true">-&gt;</span>
          <span className="sr-only"> rreth {service.title}</span>
        </Link>
      </div>
    </article>
  );
}
