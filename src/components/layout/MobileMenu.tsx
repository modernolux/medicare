import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { MAIN_NAV, SERVICE_MENU } from '@/data/navigation';
import { buildWhatsAppUrl } from '@/lib/links';

interface MobileMenuProps { open: boolean; onClose: () => void; }

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  if (!open) return null;
  const linkClass = 'block rounded-xl px-4 py-3 text-base font-medium text-brand-ink transition hover:bg-white hover:text-brand-black';
  return (
    <div id="mobile-menu" className="absolute inset-x-0 top-full max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-brand-black/10 bg-white shadow-xl lg:hidden">
      <nav aria-label="Menu mobile" className="container-page flex flex-col gap-1 py-4">
        {MAIN_NAV.map((item) => item.to === '/sherbimet' ? (
          <div key={item.to}>
            <button type="button" onClick={() => setServicesOpen((value) => !value)} aria-expanded={servicesOpen} className={`${linkClass} flex w-full items-center justify-between`}>
              {item.label}<ChevronDown className={`h-5 w-5 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {servicesOpen && <div className="ml-4 space-y-4 border-l-2 border-brand-green py-3 pl-4">
              <Link to="/sherbimet" onClick={onClose} className="block text-sm font-semibold text-brand-black">Të gjitha shërbimet</Link>
              {SERVICE_MENU.map((group) => <div key={group.label}>{group.children ? <><p className="mb-1 px-1 text-sm font-semibold text-brand-green-dark">{group.label}</p>{group.children.map((child) => <Link key={`${child.label}-${child.to}`} to={child.to} onClick={onClose} className="block rounded-lg px-1 py-2 text-sm text-brand-ink hover:text-brand-black">{child.label}</Link>)}</> : <Link to={group.to ?? '/sherbimet'} onClick={onClose} className="block px-1 py-1 text-sm font-semibold text-brand-green-dark">{group.label}</Link>}</div>)}
            </div>}
          </div>
        ) : <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={onClose} className={({ isActive }) => `${linkClass} ${isActive ? 'text-brand-black' : ''}`}>{item.label}</NavLink>)}
        <a href={buildWhatsAppUrl('Përshëndetje, dua të rezervoj një takim.')} target="_blank" rel="noopener noreferrer" onClick={onClose} className="btn-primary mt-4">Rezervo Një Takim</a>
      </nav>
    </div>
  );
}
