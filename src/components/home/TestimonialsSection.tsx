import SectionHeading from '@/components/common/SectionHeading';
import { GoogleG, StarRow } from '@/components/common/GoogleBrand';
import ReviewsCarousel from '@/components/home/ReviewsCarousel';
import { GOOGLE_REVIEWS_CONFIG, TESTIMONIALS } from '@/data/testimonials';

export default function TestimonialsSection() {
  const reviews = TESTIMONIALS.filter((review) => review.published).sort((a, b) => a.order - b.order);
  if (reviews.length === 0) return null;

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-black/10 bg-white px-4 py-2 text-sm font-medium text-brand-ink shadow-sm">
            <GoogleG className="h-4 w-4" />
            <StarRow count={5} className="h-4 w-4" />
            <span>· {GOOGLE_REVIEWS_CONFIG.count} review</span>
          </span>
          <div className="mt-5">
            <SectionHeading title="Lini një review për klinikën tonë" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl">
          <ReviewsCarousel reviews={reviews} />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={GOOGLE_REVIEWS_CONFIG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green-dark px-7 py-3 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-green/40"
          >
            <GoogleG className="h-4 w-4 rounded-full bg-white p-0.5" />
            Lini një review
          </a>
        </div>
      </div>
    </section>
  );
}
