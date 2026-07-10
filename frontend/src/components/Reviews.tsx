import { API_BASE_URL } from "../config/api";
import React from 'react';
import type { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}

// Sub-ratings categories with ratings and matching icons
const SUB_RATINGS = [
  {
    label: 'Cleanliness',
    score: '5.0',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="currentColor">
        <path d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm0 28a13 13 0 1 1 13-13 13 13 0 0 1-13 13zm-3.5-12.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm7 0a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zM16 23a7 7 0 0 0 5.5-2.7h-11A7 7 0 0 0 16 23z"/>
      </svg>
    )
  },
  {
    label: 'Accuracy',
    score: '5.0',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="12" />
        <polyline points="12 16 15 19 20 13" />
      </svg>
    )
  },
  {
    label: 'Check-in',
    score: '5.0',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="7" />
        <path d="M17 17l8 8M19 23l4-4" />
      </svg>
    )
  },
  {
    label: 'Communication',
    score: '5.0',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  },
  {
    label: 'Location',
    score: '4.8',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 10 3 22 6 29 3 29 26 22 29 10 26 3 29" />
        <line x1="10" y1="3" x2="10" y2="26" />
        <line x1="22" y1="6" x2="22" y2="29" />
      </svg>
    )
  },
  {
    label: 'Value',
    score: '4.8',
    icon: (
      <svg viewBox="0 0 32 32" className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 4.5l7 7L16 23.5l-7-7z" />
        <circle cx="22.5" cy="9.5" r="1.5" fill="currentColor" />
        <path d="M9 16.5L3 22.5v5h5l6-6" />
      </svg>
    )
  }
];

// Highlight chips at the bottom of the rating overview
const CHIPS = [
  { label: 'Comfort', count: 6, emoji: '🛋️' },
  { label: 'Accuracy', count: 5, emoji: '✅' },
  { label: 'Hot tub', count: 5, emoji: '🛁' },
  { label: 'Condition', count: 4, emoji: '🧼' },
  { label: 'Hospitality', count: 8, emoji: '👑' },
  { label: 'Cleanliness', count: 4, emoji: '🧹' },
  { label: 'Amenities', count: 2, emoji: '🎁' }
];

const Reviews: React.FC<ReviewsProps> = ({ reviews, rating, reviewCount }) => {
  return (
    <div className="py-8 border-b border-neutral-200">
      {/* ── Laurel Guest Favorite Header ── */}
      <div className="flex flex-col items-center justify-center text-center mb-8 relative">
        <div className="flex items-center justify-center gap-6 select-none">
          <img
            src={`${API_BASE_URL}/assets/laurel-left.png`}
            alt=""
            className="w-16 h-16 object-contain opacity-90"
            aria-hidden="true"
          />
          <div className="text-[96px] font-bold text-neutral-900 tracking-tighter leading-none select-text">
            {rating.toFixed(2)}
          </div>
          <img
            src={`${API_BASE_URL}/assets/laurel-right.png`}
            alt=""
            className="w-16 h-16 object-contain opacity-90"
            aria-hidden="true"
          />
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mt-4 mb-2">Guest favourite</h3>
        <p className="text-sm text-neutral-500 font-normal max-w-md leading-relaxed">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="text-sm font-semibold text-neutral-900 underline hover:text-neutral-700 mt-2">
          How reviews work
        </button>
      </div>

      {/* ── Sub-ratings Dashboard Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-4 border-b border-neutral-100 pb-8 mb-8 text-neutral-800">
        
        {/* Overall rating histogram column */}
        <div className="col-span-2 sm:col-span-1 flex flex-col border-r border-neutral-100 pr-4">
          <span className="text-xs font-semibold text-neutral-800 mb-3 uppercase tracking-wider select-none">
            Overall rating
          </span>
          <div className="flex flex-col gap-1.5 justify-center flex-1 py-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-neutral-500 font-medium">{stars}</span>
                <div className="flex-1 h-[4px] bg-neutral-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neutral-950 rounded-full" 
                    style={{ width: stars === 5 ? '92%' : stars === 4 ? '6%' : '1%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories columns */}
        {SUB_RATINGS.map((sub, idx) => (
          <div key={sub.label} className={`flex flex-col justify-between p-1 pl-4 ${idx < 5 ? 'border-r border-neutral-100' : ''}`}>
            <div>
              <span className="text-xs font-semibold text-neutral-500 select-none block mb-1">
                {sub.label}
              </span>
              <span className="text-lg font-bold text-neutral-900 leading-tight">
                {sub.score}
              </span>
            </div>
            <div className="mt-4 pt-1">
              {sub.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Highlight Chips Strip ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide select-none">
        {CHIPS.map((chip) => (
          <div 
            key={chip.label}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-full bg-white text-sm font-semibold text-neutral-800 hover:border-neutral-400 cursor-default transition"
          >
            <span>{chip.emoji}</span>
            <span>{chip.label}</span>
            <span className="text-neutral-400 font-normal">{chip.count}</span>
          </div>
        ))}
        {/* Placeholder image chip mimicking the thumbnail at the end of the strip */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 shrink-0">
          <img src={`${API_BASE_URL}/assets/0622ab42-b851-4d55-9d9f-df3143bc5909.jpg`} alt="Review thumbnail" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ── Grid of Reviews (2 columns on wide screens) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
        {reviews.slice(0, 6).map((review) => (
          <div key={review.id} className="flex flex-col gap-3">
            {/* Reviewer Header info row */}
            <div className="flex items-center gap-3">
              {review.avatar ? (
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-100"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-800 border border-neutral-200">
                  {review.name[0]}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-base text-neutral-900 leading-tight">
                  {review.name}
                </span>
                <span className="text-xs text-neutral-500 font-normal mt-0.5">
                  {review.name === 'Amit' ? '2 months on Airbnb' : review.name === 'Aheesh' ? '3 years on Airbnb' : review.name === 'Samiksha' ? '8 months on Airbnb' : review.name === 'Vedant' ? '4 years on Airbnb' : '3 years on Airbnb'} · {review.date}
                </span>
              </div>
            </div>

            {/* Stars rendering */}
            <div className="flex items-center gap-0.5 text-neutral-900 select-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>

            {/* Review Content */}
            <p className="text-[14px] text-neutral-600 leading-relaxed font-normal whitespace-pre-line">
              {review.text}
            </p>

            {/* Optional Show More button for longer reviews */}
            {review.text.length > 200 && (
              <button className="text-sm font-semibold text-neutral-900 underline hover:text-neutral-700 self-start mt-1">
                Show more
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Show All Reviews Button ── */}
      <div className="mt-8">
        <button className="px-6 py-3 border border-neutral-800 rounded-lg text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition active:scale-95">
          Show all {reviewCount} reviews
        </button>
      </div>
    </div>
  );
};

export default Reviews;
