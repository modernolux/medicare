import { useEffect } from 'react';
import { X } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';

interface BookingModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
}

export default function BookingModal({ isOpen, initialService, onClose }: BookingModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-brand-ink/60 backdrop-blur-sm animate-[fade-in_0.2s_ease-out]" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Mbyll dritaren"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-brand-muted transition hover:bg-white hover:text-brand-black"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <p className="eyebrow mb-2">Rezervim online</p>
        <h2 id="booking-modal-title" className="pr-10 text-2xl font-bold text-brand-black sm:text-3xl">
          Rezervo një takim
        </h2>
        <p className="mt-2 text-brand-muted">Plotësoni formularin dhe do t'ju kontaktojmë për konfirmim.</p>
        <div className="mt-6">
          <BookingForm initialService={initialService} />
        </div>
      </div>
    </div>
  );
}
