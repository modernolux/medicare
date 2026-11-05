import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const AMBULANCE_GALLERY = [
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869899/Modern_Ambulance_Interior_with_Stretcher.png',
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869900/Yellow_Ambulance_Outside_Hospital.png',
  'https://res.cloudinary.com/l5tyqnmr/image/upload/v1793869900/Ambulanze_davanti_all_ospedale_italiano.png',
];

export default function ServiceGallery({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const visibleImages = images.filter((image) => !failedImages.has(image));
  const currentImage = visibleImages[activeIndex] ?? visibleImages[0];

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + visibleImages.length) % visibleImages.length);
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % visibleImages.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, visibleImages.length]);

  const move = (direction: number) => {
    setActiveIndex((index) => (index + direction + visibleImages.length) % visibleImages.length);
  };

  const hideImage = (image: string) => {
    setFailedImages((current) => new Set(current).add(image));
    setActiveIndex(0);
  };

  if (!currentImage) return null;

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-brand-green/10 shadow-card md:h-[520px]">
      <button type="button" onClick={() => setLightboxOpen(true)} className="group block h-full w-full focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40" aria-label={`Shiko foton ${activeIndex + 1} të transportit me ambulancë`}>
        <img src={currentImage} alt={`Transport me ambulancë ${activeIndex + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={() => hideImage(currentImage)} />
      </button>
      {visibleImages.length > 1 && <>
        <button type="button" onClick={() => move(-1)} aria-label="Fotoja e mëparshme" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-green-dark shadow-md transition hover:bg-white"><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
        <button type="button" onClick={() => move(1)} aria-label="Fotoja e ardhshme" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-brand-green-dark shadow-md transition hover:bg-white"><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="tablist" aria-label="Fotot e ambulancës">
          {visibleImages.map((image, index) => <button key={image} type="button" onClick={() => setActiveIndex(index)} aria-label={`Shko te fotoja ${index + 1}`} aria-selected={index === activeIndex} className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/60'}`} />)}
        </div>
      </>}
      {lightboxOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-brand-black/90 p-4" role="dialog" aria-modal="true" aria-label="Galeria e transportit me ambulancë" onClick={() => setLightboxOpen(false)} onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0]?.clientX - touchStartX.current;
        if (Math.abs(distance) > 40) move(distance < 0 ? 1 : -1);
        touchStartX.current = null;
      }}>
        <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Mbyll galerinë" className="absolute right-4 top-4 rounded-full p-3 text-white hover:bg-white/10"><X className="h-7 w-7" aria-hidden="true" /></button>
        <img src={currentImage} alt={`Transport me ambulancë ${activeIndex + 1}`} className="max-h-[85vh] max-w-[90vw] object-contain" onClick={(event) => event.stopPropagation()} />
      </div>}
    </div>
  );
}
