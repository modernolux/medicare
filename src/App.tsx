import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteLayout from '@/components/layout/SiteLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import DoctorsPage from '@/pages/DoctorsPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import LaboratoryPage from '@/pages/LaboratoryPage';
import SpecialtyPage from '@/pages/SpecialtyPage';
import BookingPage from '@/pages/BookingPage';
import ContactPage from '@/pages/ContactPage';
import LegalPage from '@/pages/LegalPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { PRIVACY_DOCUMENT, TERMS_DOCUMENT } from '@/data/legal';
import { FAVICON } from '@/data/logo';

export default function App() {
  useEffect(() => {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = FAVICON;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/rreth-nesh" element={<AboutPage />} />
          <Route path="/mjeket-tane" element={<DoctorsPage />} />
          <Route path="/sherbimet" element={<ServicesPage />} />
          <Route path="/sherbimet/laborator" element={<LaboratoryPage />} />
          <Route path="/sherbimet/konsulta/:slug" element={<SpecialtyPage />} />
          <Route path="/sherbimet/:slug" element={<ServiceDetailPage />} />
          <Route path="/rezervo" element={<BookingPage />} />
          <Route path="/kontakti" element={<ContactPage />} />
          <Route path="/rregullat-dhe-kushtet" element={<LegalPage document={TERMS_DOCUMENT} />} />
          <Route path="/politikat-e-privatesise" element={<LegalPage document={PRIVACY_DOCUMENT} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
