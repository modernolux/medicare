import type { LucideIcon } from 'lucide-react';
import { Clock } from 'lucide-react';
import { highlightSegments } from '@/lib/serviceSearch';

export interface SearchRow {
  id: string;
  label: string;
  detail?: string;
  icon?: LucideIcon;
  variant: 'result' | 'chip' | 'recent' | 'link';
  onSelect: () => void;
}

export interface SearchSection {
  title?: string;
  action?: { label: string; onClick: () => void };
  rows: SearchRow[];
}

interface SearchResultsPanelProps {
  listboxId: string;
  sections: SearchSection[];
  activeIndex: number;
  query: string;
  onHover: (index: number) => void;
}

export const optionIdFor = (listboxId: string, index: number) => `${listboxId}-option-${index}`;

const rowBase = 'flex w-full cursor-pointer items-center gap-3 rounded-xl text-left transition-colors duration-150';
const rowActive = 'bg-brand-green/10';

function RowContent({ row, query }: { row: SearchRow; query: string }) {
  const Icon = row.icon ?? Clock;

  if (row.variant === 'chip') {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-black">
        <Icon className="h-4 w-4 text-brand-green" aria-hidden="true" />
        {row.label}
      </span>
    );
  }

  if (row.variant === 'link') {
    return <span className="text-sm font-semibold text-brand-green-dark">{row.label}</span>;
  }

  if (row.variant === 'recent') {
    return (
      <span className="flex min-w-0 items-center gap-3 text-sm text-brand-black">
        <Icon className="h-4 w-4 shrink-0 text-[#4B5563]" aria-hidden="true" />
        <span className="truncate">{row.label}</span>
      </span>
    );
  }

  return (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm text-brand-black">
          {highlightSegments(row.label, query).map((segment, index) =>
            segment.match ? <strong key={index} className="font-bold">{segment.text}</strong> : <span key={index}>{segment.text}</span>,
          )}
        </span>
        {row.detail && <span className="block truncate text-xs text-[#4B5563]">{row.detail}</span>}
      </span>
    </>
  );
}

export default function SearchResultsPanel({ listboxId, sections, activeIndex, query, onHover }: SearchResultsPanelProps) {
  const rows = sections.flatMap((section) => section.rows);

  return (
    <div id={listboxId} role="listbox" aria-label="Rezultatet e kërkimit" className="space-y-6">
      {sections.map((section, sectionIndex) => {
        const chipSection = section.rows.every((row) => row.variant === 'chip');
        return (
          <div key={section.title ?? `section-${sectionIndex}`} role="group" aria-label={section.title}>
            {section.title && (
              <div className="mb-2 flex items-center justify-between gap-3 px-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4B5563]">{section.title}</p>
                {section.action && (
                  <button
                    type="button"
                    onClick={section.action.onClick}
                    className="rounded text-xs font-semibold text-brand-green-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
                  >
                    {section.action.label}
                  </button>
                )}
              </div>
            )}
            <div className={chipSection ? 'flex flex-wrap gap-2 px-2' : 'flex flex-col gap-1'}>
              {section.rows.map((row) => {
                const index = rows.indexOf(row);
                const active = index === activeIndex;
                const common = {
                  id: optionIdFor(listboxId, index),
                  role: 'option' as const,
                  'aria-selected': active,
                  onMouseEnter: () => onHover(index),
                  onClick: row.onSelect,
                };

                if (row.variant === 'chip') {
                  return (
                    <div
                      key={row.id}
                      {...common}
                      className={`${rowBase} rounded-full border px-3 py-2 ${active ? 'border-brand-green bg-brand-green/10' : 'border-brand-green/40 bg-white hover:border-brand-green'}`}
                    >
                      <RowContent row={row} query={query} />
                    </div>
                  );
                }

                return (
                  <div
                    key={row.id}
                    {...common}
                    className={`${rowBase} px-3 py-2.5 ${active ? rowActive : 'hover:bg-brand-black/5'} ${row.variant === 'link' ? 'mt-1 justify-between' : ''}`}
                  >
                    <RowContent row={row} query={query} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
