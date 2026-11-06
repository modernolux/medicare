import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Faqja nuk u gjet', description: 'Faqja që kërkuat nuk ekziston në faqen e Medicare Qendër Diagnostike Durrës.', noindex: true });
  return <section className="section-pad container-page text-center"><h1 className="text-4xl font-bold text-brand-black">Faqja nuk u gjet</h1><p className="mx-auto mt-4 max-w-xl text-brand-muted">Kjo adresë nuk është e disponueshme.</p><Link to="/" className="btn-primary mt-8 inline-flex">Kthehu në kryefaqe</Link></section>;
}
