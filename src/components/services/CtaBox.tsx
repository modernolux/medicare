import { buildWhatsAppUrl } from '@/lib/links';

interface CtaBoxProps {
  serviceLabel?: string;
}

export default function CtaBox({ serviceLabel }: CtaBoxProps) {
  const message = serviceLabel
    ? `Përshëndetje, dua të rezervoj një takim për shërbimin: ${serviceLabel}.`
    : 'Përshëndetje, dua të rezervoj një takim.';

  return (
    <section className="container-page py-16 md:py-20">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand-green-dark p-10 text-center text-white shadow-card-hover md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Rezervo një takim</h2>
          <p className="mt-2 max-w-xl text-white/90">Na shkruani në WhatsApp dhe ekipi ynë do t'ju konfirmojë orarin e takimit.</p>
        </div>
        <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 !bg-white !text-brand-green-dark hover:!bg-[#C8F7C5]">
          Rezervo në WhatsApp
        </a>
      </div>
    </section>
  );
}
