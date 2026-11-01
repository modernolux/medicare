import { STATS } from '@/data/stats';

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-8 container-page md:-mt-12">
      <dl className="grid grid-cols-1 divide-y divide-brand-black/10 rounded-3xl bg-white shadow-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-8 py-10 text-center transition duration-300 hover:-translate-y-1">
            <dt className="order-2 mt-2 text-sm font-semibold uppercase tracking-wide text-brand-muted">{stat.label}</dt>
            <dd className="text-4xl font-bold text-brand-green">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
