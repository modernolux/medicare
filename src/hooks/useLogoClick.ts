import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useLogoClick() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isHome = pathname === '/';

    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      });
    }
  }, [pathname, navigate]);
}
