import PageBanner from '@/components/layout/PageBanner';
import BookingForm from '@/components/booking/BookingForm';
import { useSeo } from '@/hooks/useSeo';

export default function BookingPage() {
  useSeo({ title: 'Rezervo një Takim', description: 'Rezervoni një takim në Medicare Qendër Diagnostike Durrës.' });

  return (
    <>
      <PageBanner title="Rezervo një Takim" />
      <section className="section-pad container-page">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-card sm:p-10">
          <p className="eyebrow mb-2">Rezervim online</p>
          <h2 className="text-2xl font-bold text-brand-black sm:text-3xl">Plotësoni formularin</h2>
          <p className="mt-2 text-brand-muted">Do t'ju kontaktojmë për konfirmimin e takimit.</p>
          <div className="mt-8">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
