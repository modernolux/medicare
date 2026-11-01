import { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { ANALYSIS_CATEGORIES } from '@/data/analizat';

export default function AnalysisBrowser() {
  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([]);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleCategories = useMemo(
    () =>
      ANALYSIS_CATEGORIES.map((category) => {
        const tests = normalizedQuery
          ? category.tests.filter((test) => test.toLowerCase().includes(normalizedQuery))
          : category.tests;
        return { ...category, tests };
      }).filter((category) => !normalizedQuery || category.tests.length > 0 || category.title.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  const toggle = (id: string) =>
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div>
      <label htmlFor="analysis-search" className="sr-only">Kërko analizën</label>
      <div className="relative mx-auto max-w-2xl">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
        <input
          id="analysis-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Kërko një analizë (p.sh. glukoza)"
          className="w-full rounded-full border border-brand-black/15 bg-white py-4 pl-14 pr-6 outline-none transition focus:border-brand-black focus:ring-4 focus:ring-brand-black/10"
        />
      </div>

      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        {visibleCategories.map((category) => {
          const isOpen = normalizedQuery ? true : openIds.includes(category.id);
          const panelId = `analysis-${category.id}`;
          return (
            <section key={category.id} className="overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-sm">
              <h2>
                <button
                  type="button"
                  onClick={() => toggle(category.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white"
                >
                  <span className="text-lg font-semibold text-brand-black">{category.title}</span>
                  <span className="flex items-center gap-3">
                    <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-brand-black">{category.tests.length}</span>
                    <ChevronDown className={`h-5 w-5 text-brand-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </span>
                </button>
              </h2>
              {isOpen && (
                <div id={panelId} className="border-t border-brand-black/10 px-6 py-5">
                  {category.tests.length > 0 ? (
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {category.tests.map((test) => (
                        <li key={test} className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-brand-ink">{test}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-muted">
                      TODO: Lista e analizave për kategorinë "{category.title}" do të shtohet së shpejti.
                    </p>
                  )}
                </div>
              )}
            </section>
          );
        })}
        {visibleCategories.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-center text-brand-ink">Nuk u gjet asnjë analizë me këtë emër.</p>
        )}
      </div>
    </div>
  );
}
