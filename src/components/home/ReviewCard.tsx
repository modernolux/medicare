import { useState } from 'react';
import { GoogleG, StarRow } from '@/components/common/GoogleBrand';
import type { Testimonial } from '@/data/testimonials';

const AVATAR_COLORS = ['#2F6B3A', '#1F5F8B', '#8A4B0F', '#0F6E6E', '#5B4636', '#9A3B2E'];
const EXPAND_THRESHOLD = 140;

function avatarColor(name: string) {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export default function ReviewCard({ review }: { review: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > EXPAND_THRESHOLD;

  return (
    <article className="flex w-[85%] min-w-0 max-w-[320px] shrink-0 snap-start flex-col rounded-2xl border border-brand-black/10 bg-white p-5 shadow-card md:w-[320px]">
      <div className="flex items-center justify-between">
        <StarRow count={review.stars} />
        <GoogleG className="h-5 w-5" />
      </div>
      <div className="mt-4 min-w-0 max-w-full">
        <p className={`whitespace-normal text-[15px] leading-relaxed text-brand-ink [overflow-wrap:anywhere] ${expanded ? '' : 'line-clamp-5'}`}>{review.text}</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-2 text-sm font-semibold text-brand-green-dark underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
          >
            {expanded ? 'Shiko më pak' : 'Lexo më shumë'}
          </button>
        )}
      </div>
      <div className="mt-auto border-t border-brand-black/10 pt-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor(review.name) }}
            aria-hidden="true"
          >
            {review.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-brand-black">{review.name}</p>
            {review.timeLabel && <p className="text-xs text-[#5f6368]">{review.timeLabel}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
