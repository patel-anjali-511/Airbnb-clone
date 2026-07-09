import React from 'react';
import type { Listing } from '../types';
import { Search, Plus, Minus } from 'lucide-react';

interface LocationSectionProps {
  listing: Listing;
}

const LocationSection: React.FC<LocationSectionProps> = ({ listing }) => {
  return (
    <div className="py-8 border-b border-neutral-200">
      <h3 className="text-xl font-semibold mb-2">Where you'll be</h3>
      <p className="text-sm font-normal text-neutral-800 mb-6">{listing.location || 'Candolim, Goa, India'}</p>

      {/* Styled Map Container */}
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-neutral-200 bg-[#E8ECE9] select-none">
        
        {/* Custom Grid Map Visual */}
        <div className="absolute inset-0 opacity-80" style={{
          backgroundImage: 'radial-gradient(#d5dcd6 1.5px, transparent 1.5px), linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px, 40px 40px, 40px 40px',
        }} />

        {/* Diagonal Coastline/Water Division Simulation */}
        <div 
          className="absolute inset-0 bg-[#A6CBE3] pointer-events-none" 
          style={{ clipPath: 'polygon(0 0, 45% 0, 15% 100%, 0 100%)' }}
        />

        {/* Green highlight areas simulating parks or points of interest */}
        <div className="absolute top-[40%] left-[30%] w-24 h-24 bg-[#C8E4C4]/60 rounded-full blur-[2px]" />
        <div className="absolute bottom-[20%] right-[25%] w-32 h-32 bg-[#C8E4C4]/60 rounded-full blur-[2px]" />

        {/* Home/Pin Location Marker */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10">
          {/* Subtle Outer pulsing ring */}
          <div className="absolute w-[80px] h-[80px] rounded-full bg-black/5 animate-pulse" />
          <div className="absolute w-[50px] h-[50px] rounded-full bg-black/10" />
          
          {/* Black circle housing house icon */}
          <div className="w-12 h-12 rounded-full bg-[#222222] shadow-xl border border-white flex items-center justify-center text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
        </div>

        {/* Zoom In/Out Controls */}
        <div className="absolute right-6 top-6 flex flex-col bg-white rounded-lg shadow-md border border-neutral-200 overflow-hidden z-10">
          <button className="p-2 hover:bg-neutral-100 border-b border-neutral-100 transition text-neutral-600 active:bg-neutral-200" aria-label="Zoom in">
            <Plus size={18} />
          </button>
          <button className="p-2 hover:bg-neutral-100 transition text-neutral-600 active:bg-neutral-200" aria-label="Zoom out">
            <Minus size={18} />
          </button>
        </div>

        {/* Search Control */}
        <div className="absolute left-6 top-6 z-10">
          <div className="w-10 h-10 bg-white rounded-full shadow-md border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition cursor-pointer">
            <Search size={18} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs text-neutral-500 font-normal mt-1 select-none">
          Exact location will be provided after booking.
        </p>
      </div>

      {/* Neighborhood info section */}
      <div className="mt-6 max-w-2xl">
        <h4 className="font-semibold text-sm text-neutral-800 mb-1">Neighbourhood highlights</h4>
        <p className="text-sm text-neutral-500 font-normal leading-relaxed">
          The apartment is located in a quiet lane just off the main Candolim-Calangute road, offering the perfect mix of peaceful privacy and easy walking access to supermarkets, local restaurants, and Candolim beach.
        </p>
      </div>
    </div>
  );
};

export default LocationSection;
