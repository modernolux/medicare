import { ShieldCheck } from 'lucide-react';
import { IMAGES } from '@/data/images';
import { buildWhatsAppUrl } from '@/lib/links';

const DESKTOP_FADE =
  'md:bg-[linear-gradient(90deg,rgba(50,102,42,0.97)_0%,rgba(50,102,42,0.94)_38%,rgba(77,157,65,0.62)_56%,rgba(77,157,65,0.18)_74%,rgba(77,157,65,0)_100%)]';

export default function HeroSection() {
  return (
    <section className="hero-section relative isolate overflow-hidden bg-[#32662A] md:h-[clamp(540px,41.7vw,680px)]">
      <div className="relative h-[clamp(230px,62vw,320px)] w-full md:absolute md:inset-0 md:h-full">
        <img
          src={IMAGES.hero}
          alt="Hyrja e Qendrës Diagnostikuese Medicare në Durrës"
          fetchPriority="high"
          width={1672}
          height={941}
          className="h-full w-full object-cover object-[center_35%] md:object-[var(--hero-focus)]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[45%] md:hidden"
          style={{ backgroundImage: 'linear-gradient(0deg, #32662A 0%, rgba(50, 102, 42, 0) 100%)' }}
          aria-hidden="true"
        />
        <div className={`absolute inset-0 hidden ${DESKTOP_FADE} md:block`} aria-hidden="true" />
      </div>
      <div className="bg-[#32662A] text-white md:relative md:z-10 md:flex md:h-full md:items-center md:bg-transparent">
        <div className="container-page relative pb-14 pt-6 md:w-full md:pb-28 md:pt-0">
          <div className="md:max-w-[620px]">
            <h1 className="animate-fade-up max-w-3xl text-[30px] font-bold leading-[1.15] sm:text-5xl md:max-w-none md:animate-[hero-rise_500ms_ease-out_both] md:text-[clamp(40px,3.75vw,58px)] md:leading-[1.1] md:motion-reduce:animate-none">
              QENDËR <span className="text-[#C8F7C5]">DIAGNOSTIKE</span> ME SHËRBIME <span className="text-[#C8F7C5]">MJEKËSORE</span> TË PLOTA
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-base leading-[1.5] text-white/90 md:mt-6 md:max-w-[500px] md:animate-[hero-rise_500ms_ease-out_both] md:text-[18px] md:leading-[1.55] md:text-white/[0.92] md:motion-reduce:animate-none">
              Ne ofrojmë shërbim mjekësor efikas me pajisje moderne dhe staf të specializuar në Durrës.
            </p>
            <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 md:mt-7 md:animate-[hero-rise_500ms_ease-out_both] md:motion-reduce:animate-none">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-[#C8F7C5]" aria-hidden="true" />
                Kujdes shëndetësor i besueshëm që nga viti 2003
              </span>
              <a
                href={buildWhatsAppUrl('Përshëndetje, dua të rezervoj një takim.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full max-w-[320px] items-center justify-center self-center rounded-full bg-white px-7 text-sm font-semibold text-brand-green-dark shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-brand-green-dark hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 md:h-[52px] md:w-auto md:max-w-none md:self-start md:px-8 md:py-0 md:hover:!bg-brand-green-dark md:hover:!text-white"
              >
                Rezervo një Takim
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
