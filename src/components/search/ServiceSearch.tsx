import { useEffect, useId, useMemo, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone, Search, Stethoscope, X } from 'lucide-react';
import { CONTACT } from '@/data/contact';
import { SERVICES } from '@/data/services';
import { buildWhatsAppUrl } from '@/lib/links';
import { addRecentSearch, clearRecentSearches, loadRecentSearches } from '@/lib/searchHistory';
import { buildSearchIndex, isSearchableQuery, searchSiteIndex } from '@/lib/serviceSearch';
import SearchResultsPanel, { optionIdFor, type SearchRow, type SearchSection } from '@/components/search/SearchResultsPanel';

const DEBOUNCE_MS = 150;
const FREQUENT_SERVICES = SERVICES.slice(0, 6);
const SECONDARY_BUTTON =
  'inline-flex items-center justify-center gap-2 rounded-full border border-brand-green px-6 py-3 text-sm font-semibold text-brand-green-dark transition hover:bg-brand-green/10';

interface ServiceSearchProps {
  onClose: () => void;
}

export default function ServiceSearch({ onClose }: ServiceSearchProps) {
  const navigate = useNavigate();
  const listboxId = useId();
  const index = useMemo(buildSearchIndex, []);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recent, setRecent] = useState<string[]>(loadRecentSearches);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const searchable = isSearchableQuery(debouncedQuery);
  const matches = useMemo(() => searchSiteIndex(debouncedQuery, index), [debouncedQuery, index]);
  const trimmedQuery = query.trim();

  const go = (to: string) => {
    addRecentSearch(trimmedQuery);
    onClose();
    navigate(to);
  };

  const sections: SearchSection[] = [];
  if (searchable) {
    if (matches.services.length > 0) {
      sections.push({
        title: 'Shërbime',
        rows: matches.services.map((entry, position) => ({
          id: `service-${position}`,
          label: entry.label,
          icon: entry.icon,
          variant: 'result',
          onSelect: () => go(entry.to),
        })),
      });
    }
    if (matches.doctors.length > 0) {
      sections.push({
        title: 'Mjekë',
        rows: matches.doctors.map((doctor, position) => ({
          id: `doctor-${position}`,
          label: doctor.label,
          detail: doctor.specialty,
          icon: Stethoscope,
          variant: 'result',
          onSelect: () => go(doctor.to),
        })),
      });
    }
    if (matches.categories.length > 0) {
      sections.push({
        title: 'Kategori',
        rows: matches.categories.map((category) => ({
          id: `category-${category.slug}`,
          label: category.title,
          icon: category.icon,
          variant: 'chip',
          onSelect: () => go(category.path),
        })),
      });
    }
    if (matches.services.length + matches.doctors.length + matches.categories.length > 0) {
      sections.push({
        rows: [{ id: 'all-services', label: 'Shiko të gjitha shërbimet', variant: 'link', onSelect: () => go('/sherbimet') }],
      });
    }
  } else {
    sections.push({
      title: 'Shërbime të kërkuara shpesh',
      rows: FREQUENT_SERVICES.map((service): SearchRow => ({
        id: `frequent-${service.slug}`,
        label: service.title,
        icon: service.icon,
        variant: 'chip',
        onSelect: () => go(service.path),
      })),
    });
    if (recent.length > 0) {
      sections.push({
        title: 'Kërkimet e fundit',
        action: {
          label: 'Pastro',
          onClick: () => {
            clearRecentSearches();
            setRecent([]);
          },
        },
        rows: recent.map((term) => ({
          id: `recent-${term}`,
          label: term,
          variant: 'recent',
          onSelect: () => updateQuery(term),
        })),
      });
    }
  }

  const rows = sections.flatMap((section) => section.rows);
  const safeActive = activeIndex < rows.length ? activeIndex : -1;
  const showNoResults = searchable && rows.length === 0;

  function updateQuery(value: string) {
    setQuery(value);
    setActiveIndex(-1);
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(rows.length ? (safeActive + 1) % rows.length : -1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(rows.length ? (safeActive <= 0 ? rows.length - 1 : safeActive - 1) : -1);
    } else if (event.key === 'Enter') {
      const target = safeActive >= 0 ? rows[safeActive] : searchable ? rows[0] : undefined;
      if (target) {
        event.preventDefault();
        target.onSelect();
      }
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Mbyll kërkimin"
        onClick={onClose}
        className="absolute inset-0 hidden bg-brand-black/40 md:block"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Kërko shërbime"
        className="absolute inset-0 flex flex-col bg-white md:inset-x-0 md:bottom-auto md:top-20 md:max-h-[min(680px,calc(100vh-5rem))] md:rounded-b-3xl md:border-b md:border-brand-black/10 md:shadow-2xl"
      >
        <div className="container-page flex min-h-0 flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-3xl items-center gap-3 py-4 md:py-5">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#4B5563]" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-label="Kërko shërbim, analizë ose mjek"
                aria-expanded={rows.length > 0}
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={safeActive >= 0 ? optionIdFor(listboxId, safeActive) : undefined}
                placeholder="Kërko shërbim, analizë ose mjek"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                className="h-12 w-full rounded-2xl border border-brand-black/15 bg-white pl-12 pr-12 text-[16px] text-brand-black placeholder:text-[#6B7280] focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/30 md:text-sm"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Pastro kërkimin"
                  onClick={() => updateQuery('')}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#4B5563] transition hover:bg-brand-black/5"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full px-3 py-2 text-sm font-semibold text-brand-black transition hover:bg-brand-black/5"
            >
              Mbyll
            </button>
          </div>

          <div className="mx-auto min-h-0 w-full max-w-3xl flex-1 overflow-y-auto overscroll-contain pb-6">
            {showNoResults ? (
              <div className="px-2 py-10 text-center">
                <p className="text-base font-semibold text-brand-black">Nuk u gjet asgjë për "{trimmedQuery}"</p>
                <p className="mt-2 text-sm text-[#4B5563]">Provoni një fjalë tjetër ose na kontaktoni direkt.</p>
                <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
                  <a href={CONTACT.phoneHref} className="btn-primary">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Telefononi
                  </a>
                  <a
                    href={buildWhatsAppUrl(`Përshëndetje, po kërkoj informacion për: ${trimmedQuery}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={SECONDARY_BUTTON}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                  <button type="button" onClick={() => go('/rezervo')} className={SECONDARY_BUTTON}>
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Rezervo një Takim
                  </button>
                </div>
              </div>
            ) : (
              <SearchResultsPanel
                listboxId={listboxId}
                sections={sections}
                activeIndex={safeActive}
                query={debouncedQuery}
                onHover={setActiveIndex}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
