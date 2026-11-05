import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const AMBULANCE_GALLERY = [
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869899/Modern_Ambulance_Interior_with_Stretcher.png',
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869900/Yellow_Ambulance_Outside_Hospital.png',
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869900/Ambulanze_davanti_all_ospedale_italiano.png',
];

export default function ServiceGallery({ images }: { images: string[] }) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const visibleImages = images.filter((image) => !failedImages.has(image));

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index === null ? null : (index - 1 + visibleImages.length) % visibleImages.length));
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index === null ? null : (index + 1) % visibleImages.length));
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, visibleImages.length]);

  const hideImage = (image: string) => {
    setFailedImages((current) => new Set(current).add(image));
    setActiveIndex(null);
  };

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-brand-black sm:text-4xl">Galeria</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {visibleImages.map((image, index) => (
            <button key={image} type="button" onClick={() => setActiveIndex(index)} className="group overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40">
              <img src={image} alt={`Transport me ambulancë ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" onError={() => hideImage(image)} />
            </button>
          ))}
        </div>
      </div>
      {activeIndex !== null && visibleImages.length > 0 && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-black/90 p-4" role="dialog" aria-modal="true" aria-label="Galeria e transportit me ambulancë" onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const distance = event.changedTouches[0]?.clientX - touchStartX.current;
          if (Math.abs(distance) > 40) setActiveIndex((index) => (index === null ? null : (index + (distance < 0 ? 1 : -1) + visibleImages.length) % visibleImages.length));
          touchStartX.current = null;
        }}>
          <button type="button" onClick={() => setActiveIndex(null)} aria-label="Mbyll galerinë" className="absolute right-4 top-4 rounded-full p-3 text-white hover:bg-white/10"><X className="h-7 w-7" aria-hidden="true" /></button>
          <button type="button" onClick={() => setActiveIndex((index) => (index === null ? null : (index - 1 + visibleImages.length) % visibleImages.length))} aria-label="Fotoja e mëparshme" className="absolute left-3 rounded-full p-3 text-white hover:bg-white/10 sm:left-8"><ChevronLeft className="h-8 w-8" aria-hidden="true" /></button>
          <img src={visibleImages[activeIndex]} alt={`Transport me ambulancë ${activeIndex + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain" onError={() => hideImage(visibleImages[activeIndex])} />
          <button type="button" onClick={() => setActiveIndex((index) => (index === null ? null : (index + 1) % visibleImages.length))} aria-label="Fotoja e ardhshme" className="absolute right-3 rounded-full p-3 text-white hover:bg-white/10 sm:right-8"><ChevronRight className="h-8 w-8" aria-hidden="true" /></button>
        </div>
      )}
    </section>
  );
}
