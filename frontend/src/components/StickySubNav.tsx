import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StickySubNavProps {
  rating: number;
  reviewCount: number;
  totalPrice: number;
  nights: number;
}

const TABS = [
  { label: 'Photos', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Location', href: '#location' },
];

const StickySubNav: React.FC<StickySubNavProps> = ({
  rating,
  reviewCount,
  totalPrice,
  nights,
}) => {
  const [activeTab, setActiveTab] = useState('Photos');
  // visible = scrolled past navbar (80px threshold)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Section Tabs */}
          <div className="flex items-center">
            {TABS.map((tab) => (
              <a
                key={tab.label}
                href={tab.href}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-4 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.label
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>

          {/* Right: Compact pricing + Reserve */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-bold text-neutral-900">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-neutral-500 font-normal">for {nights} nights</span>
              <span className="mx-1 text-neutral-300">·</span>
              <Star size={12} className="fill-gray-900 text-gray-900" />
              <span className="font-semibold text-neutral-900">{rating.toFixed(2)}</span>
              <span className="text-neutral-400 mx-0.5">·</span>
              <span className="text-neutral-500 font-normal">{reviewCount} reviews</span>
            </div>
            <button className="bg-[#FF385C] hover:bg-[#e00b41] text-white font-semibold text-sm px-5 py-2 rounded-lg transition">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySubNav;
