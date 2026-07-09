import React from "react";
import { Star, Share2, Heart, Award } from "lucide-react";
import { motion } from "framer-motion";
import type { Listing } from "../types";

interface PropertyHeaderProps {
  listing: Listing;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ listing }) => {
  const [saved, setSaved] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-6 pb-4"
    >
      {/* Section 2: Property Title */}
      <h1 className="text-[26px] font-semibold text-gray-900 leading-tight mb-3">
        {listing.title}
      </h1>

      {/* Sections 3 & 4: Rating, Location + Share/Save */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left — Rating, Superhost, Location */}
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
          {/* Rating */}
          <span className="flex items-center gap-1 font-semibold text-gray-900">
            <Star
              size={14}
              className="fill-gray-900 text-gray-900"
              aria-hidden="true"
            />
            {listing.rating.toFixed(2)}
          </span>

          <span className="text-gray-500 mx-1" aria-hidden="true">·</span>

          {/* Reviews */}
          <button
            className="underline font-semibold text-gray-900 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded"
            aria-label={`${listing.reviewCount} reviews`}
          >
            {listing.reviewCount} reviews
          </button>

          {listing.isSuperhost && (
            <>
              <span className="text-gray-500 mx-1" aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-semibold text-gray-900">
                <Award size={14} className="text-gray-900" aria-hidden="true" />
                Superhost
              </span>
            </>
          )}

          <span className="text-gray-500 mx-1" aria-hidden="true">·</span>

          {/* Location */}
          <button
            className="underline font-semibold text-gray-900 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded"
            aria-label={`Location: ${listing.location}`}
          >
            {listing.location}
          </button>
        </div>

        {/* Right — Share & Save */}
        <div className="flex items-center gap-2">
          {/* Share */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            aria-label="Share this listing"
          >
            <Share2 size={16} aria-hidden="true" />
            Share
          </motion.button>

          {/* Save */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSaved((s) => !s)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={saved}
          >
            <Heart
              size={16}
              aria-hidden="true"
              className={
                saved
                  ? "fill-rose-500 text-rose-500 transition-colors"
                  : "text-gray-700 transition-colors"
              }
            />
            {saved ? "Saved" : "Save"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyHeader;
