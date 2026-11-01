import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BookingProvider } from '@/components/booking/BookingContext';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingContactButtons from '@/components/layout/FloatingContactButtons';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingContactButtons />
      </div>
    </BookingProvider>
  );
}
