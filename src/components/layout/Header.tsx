import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { MAIN_NAV } from '@/data/navigation';
import ServicesMenu from '@/components/layout/ServicesMenu';
import MobileMenu from '@/components/layout/MobileMenu';
import ServiceSearch from '@/components/search/ServiceSearch';
import { navLinkClass } from '@/components/layout/navStyles';
import { LOGO } from '@/data/logo';
import { buildWhatsAppUrl } from '@/lib/links';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const toggleMenu = () => {
    setSearchOpen(false);
    setMenuOpen((value) => !value);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-black/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="shrink-0 transition hover:opacity-90">
          <img src={LOGO} alt="Medicare Qendër Diagnostike Durrës" className="logo-header" />
        </Link>

        <nav aria-label="Menu kryesore" className="hidden flex-1 items-center justify-center gap-9 lg:flex">
          {MAIN_NAV.map((item) =>
            item.to === '/sherbimet' ? (
              <ServicesMenu key={item.to} />
            ) : (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className={navLinkClass}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Kërko shërbime"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand-green-dark transition hover:bg-brand-green/10"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <a href={buildWhatsAppUrl('Përshëndetje, dua të rezervoj një takim.')} target="_blank" rel="noopener noreferrer" className="btn-primary hidden px-5 py-2.5 text-sm md:inline-flex">
            Rezervo Një Takim
          </a>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Mbyll menunë' : 'Hap menunë'}
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand-black transition hover:bg-white lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {searchOpen && <ServiceSearch onClose={closeSearch} />}
    </header>
  );
}
