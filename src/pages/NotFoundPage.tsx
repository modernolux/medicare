import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Faqja nuk u gjet', description: 'Faqja që kërkoni nuk ekziston.' });

  return (
    <section className="section-pad container-page text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-3xl font-bold text-brand-black sm:text-4xl">Faqja nuk u gjet</h1>
      <p className="mx-auto mt-4 max-w-xl text-brand-muted">Faqja që kërkoni nuk ekziston ose është zhvendosur.</p>
      <Link to="/" className="btn-primary mt-8 inline-flex">Kthehu në kryefaqe</Link>
    </section>
  );
}
