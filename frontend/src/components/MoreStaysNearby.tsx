import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NearbyStay {
  id: number;
  title: string;
  price: string;
  rating: number;
  image: string;
  location?: string;
}

const NEARBY_STAYS_PAGE_1: NearbyStay[] = [
  {
    id: 1,
    title: "Beautiful Studio with a view to die for",
    price: "₹23,600",
    rating: 4.91,
    image: "http://localhost:3000/assets/0622ab42-b851-4d55-9d9f-df3143bc5909.jpg",
  },
  {
    id: 2,
    title: "NAQAB - 1bhk with private pool",
    price: "₹42,218",
    rating: 4.95,
    image: "http://localhost:3000/assets/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpg",
  },
  {
    id: 3,
    title: "Greentique Luxury Flat with plunge pool, Calangute",
    price: "₹44,506",
    rating: 4.94,
    image: "http://localhost:3000/assets/153aa732-4935-48b8-a6fe-b469b6af5efc.jpg",
  },
  {
    id: 4,
    title: "The Tropical Studio | 5 mins to Beach",
    price: "₹22,824",
    rating: 4.96,
    image: "http://localhost:3000/assets/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpg",
  },
  {
    id: 5,
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    price: "₹39,942",
    rating: 4.95,
    image: "http://localhost:3000/assets/2367476f-11c4-4a14-a7c6-267be62c1d59.jpg",
  },
];

const NEARBY_STAYS_PAGE_2: NearbyStay[] = [
  {
    id: 6,
    title: "Candolim Sunset Penthouse with Jacuzzi",
    price: "₹28,500",
    rating: 4.98,
    image: "http://localhost:3000/assets/23ea6621-6f74-4baa-acea-2fd03e312b41.jpg",
  },
  {
    id: 7,
    title: "Mirashya's Garden Villa | Walk to Candolim Beach",
    price: "₹35,200",
    rating: 4.93,
    image: "http://localhost:3000/assets/246bd88d-4dd6-4117-a401-02a36ebfcf16.jpg",
  },
  {
    id: 8,
    title: "Azure Private Suite with Plunge Pool & Deck",
    price: "₹31,400",
    rating: 4.92,
    image: "http://localhost:3000/assets/0622ab42-b851-4d55-9d9f-df3143bc5909.jpg",
  },
  {
    id: 9,
    title: "Boho Luxury Loft near Calangute Beach",
    price: "₹25,900",
    rating: 4.96,
    image: "http://localhost:3000/assets/153aa732-4935-48b8-a6fe-b469b6af5efc.jpg",
  },
  {
    id: 10,
    title: "Serene 1BHK Serviced Apartment in Candolim",
    price: "₹21,800",
    rating: 4.94,
    image: "http://localhost:3000/assets/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpg",
  },
];

const MoreStaysNearby: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [wishlist, setWishlist] = useState<Record<number, boolean>>({});

  const currentStays = page === 1 ? NEARBY_STAYS_PAGE_1 : NEARBY_STAYS_PAGE_2;

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-12 border-t border-gray-200">
      {/* Section Header with Title and Pagination Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          More stays nearby
        </h2>

        {/* Page Indicator and Arrows */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">
            {page} / 2
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                page === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-400 text-gray-800 hover:border-gray-900 hover:shadow-sm"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setPage(2)}
              disabled={page === 2}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition ${
                page === 2
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-400 text-gray-800 hover:border-gray-900 hover:shadow-sm"
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          {currentStays.map((stay) => (
            <div
              key={stay.id}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(stay.id, e)}
                    className="absolute top-3 right-3 p-1.5 rounded-full transition focus:outline-none"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      size={20}
                      className={
                        wishlist[stay.id]
                          ? "fill-rose-500 text-rose-500 transition-colors drop-shadow"
                          : "text-white fill-black/30 hover:scale-110 transition drop-shadow"
                      }
                    />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-medium text-sm text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:underline">
                  {stay.title}
                </h3>
              </div>

              {/* Price & Rating Row */}
              <div className="flex items-center justify-between text-sm mt-2 pt-1">
                <span className="font-semibold text-gray-900">{stay.price}</span>
                <div className="flex items-center gap-1 text-gray-800 font-medium">
                  <Star size={13} className="fill-gray-900 text-gray-900" />
                  <span>{stay.rating.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default MoreStaysNearby;
