import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SERVICE_MENU } from '@/data/navigation';
import type { NavGroup } from '@/data/navigation';
import { navLinkClass } from '@/components/layout/navStyles';

const panelClass =
  'invisible opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100';
const cardClass = 'rounded-2xl border border-brand-black/10 bg-white p-2 shadow-card-hover';
const itemClass =
  'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-brand-ink transition-colors duration-200 hover:bg-white hover:text-brand-black focus:outline-none focus-visible:bg-white';

function NestedGroup({ group }: { group: NavGroup }) {
  const Icon = group.icon;
  return (
    <li className="group/sub relative">
      <button type="button" className={`${itemClass} justify-between`} aria-haspopup="true">
        <span className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4 text-brand-green-dark" aria-hidden="true" />}
          {group.label}
        </span>
        <ChevronRight className="h-4 w-4 text-brand-muted" aria-hidden="true" />
      </button>
      <div className="invisible absolute left-full top-0 z-50 pl-2 opacity-0 transition duration-200 group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
        <ul className={`${cardClass} max-h-[70vh] w-72 overflow-y-auto`}>
          {group.children?.map((child) => (
            <li key={`${child.label}-${child.to}`}>
              <Link to={child.to} className={itemClass}>{child.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function ServicesMenu() {
  return (
    <div className="group relative">
      <NavLink to="/sherbimet" className={({ isActive }) => `${navLinkClass({ isActive })} inline-flex items-center gap-1.5`}>
        Shërbimet
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
      </NavLink>
      <div className={`${panelClass} absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4`}>
        <ul className={`${cardClass} w-72`}>
          {SERVICE_MENU.map((group) =>
            group.children ? (
              <NestedGroup key={group.label} group={group} />
            ) : (
              <li key={group.label}>
                <Link to={group.to ?? '/sherbimet'} className={itemClass}>
                  {group.icon && <group.icon className="h-4 w-4 text-brand-green-dark" aria-hidden="true" />}
                  {group.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
