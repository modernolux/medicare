import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ABOUT_INTRO } from '@/data/about';
import { IMAGES } from '@/data/images';

const introExcerpt = ABOUT_INTRO.split('. ').slice(0, 2).join('. ') + '.';

const aboutSlideAlts = [
  'Salla e pritjes së qendrës Medicare me ngjyra jeshile',
  'Mjek duke kryer ekzaminim ekografik me aparaturë moderne',
];

export default function AboutPreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const slides = IMAGES.aboutSlides;

  useEffect(() => {
    if (isPaused || slides.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    touchStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.clientX - touchStartX.current;
    if (Math.abs(distance) > 40) {
      setActiveIndex((current) => (current + (distance < 0 ? 1 : -1) + slides.length) % slides.length);
    }
    touchStartX.current = null;
  };

  return (
    <section className="section-pad container-page grid items-center gap-12 lg:grid-cols-2">
      <div
        className="relative w-full overflow-hidden rounded-3xl shadow-card"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { touchStartX.current = null; }}
      >
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {slides.map((image, index) => (
            <img
              key={image}
              src={image}
              width={800}
              height={1000}
              alt={aboutSlideAlts[index] ?? 'Pamje nga qendra Medicare Durrës'}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="aspect-[4/5] w-full shrink-0 object-cover object-center"
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-[14px] left-1/2 flex -translate-x-1/2 items-center gap-2" role="group" aria-label="Zgjidhni foton">
          {slides.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Foto ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-2 rounded-full bg-white transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === activeIndex ? 'w-[22px]' : 'w-2 opacity-55 hover:opacity-100'}`}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3">Rreth Nesh</p>
        <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">Medicare Klinik, një emër i besuar në Durrës</h2>
        <p className="mt-6 text-lg text-brand-muted">{introExcerpt}</p>
        <Link to="/rreth-nesh" className="btn-primary mt-8">
          Lexo më shumë
        </Link>
      </div>
    </section>
  );
}
