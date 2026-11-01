import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewCard from '@/components/home/ReviewCard';
import type { Testimonial } from '@/data/testimonials';

const SCROLL_GAP_PX = 16;
const EDGE_TOLERANCE_PX = 4;

export default function ReviewsCarousel({ reviews }: { reviews: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const showArrows = reviews.length > 3;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateEdges = () => {
      setCanScrollPrev(scroller.scrollLeft > EDGE_TOLERANCE_PX);
      setCanScrollNext(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - EDGE_TOLERANCE_PX);
    };

    updateEdges();
    scroller.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      scroller.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [reviews.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const card = scroller?.firstElementChild as HTMLElement | null | undefined;
    if (!scroller || !card) return;
    scroller.scrollBy({ left: direction * (card.offsetWidth + SCROLL_GAP_PX), behavior: 'smooth' });
  };

  const arrowClass =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-brand-black/15 bg-white text-brand-black shadow-card transition hover:bg-brand-black hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-brand-black md:flex';

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="Vlerësimet e klientëve"
        className={`flex snap-x snap-mandatory overflow-x-auto pb-2 scroll-px-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:scroll-px-14 ${showArrows ? 'md:px-14' : ''}`}
      >
        <div className={`flex gap-4 ${showArrows ? '' : 'md:mx-auto md:w-max'}`}>
          {reviews.map((review) => (
            <ReviewCard key={`${review.order}-${review.name}`} review={review} />
          ))}
        </div>
      </div>
      {showArrows && canScrollNext && (
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 bg-gradient-to-l from-white to-transparent md:block" aria-hidden="true" />
      )}
      {showArrows && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Vlerësimi i mëparshëm"
            className={`${arrowClass} left-0`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Vlerësimi tjetër"
            className={`${arrowClass} right-0`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}
