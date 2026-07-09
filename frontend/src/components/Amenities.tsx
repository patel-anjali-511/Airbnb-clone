import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Amenity } from "../types";

interface AmenitiesProps {
  amenities: Amenity[];
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const [showAllModal, setShowAllModal] = useState(false);

  // Show up to 10 amenities in the preview grid
  const previewAmenities = amenities.slice(0, 10);

  // Group all amenities by category for the modal view
  const groupedAmenities = amenities.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, Amenity[]>,
  );

  return (
    <div className="py-6 border-b-[1px] border-neutral-200">
      <h3 className="text-xl font-semibold mb-6">What this place offers</h3>

      {/* Grid of Preview Amenities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {previewAmenities.map((amenity) => {
          const nameLower = amenity.name.toLowerCase();
          const isNotReported =
            nameLower.includes("not reported") ||
            nameLower === "hot water" ||
            nameLower === "body soap" ||
            nameLower === "washing machine" ||
            nameLower === "books and reading material";

          return (
            <div
              key={amenity.id}
              className="flex flex-row items-center gap-4 text-sm font-normal text-neutral-600"
            >
              {/* Safe rendering of custom SVG icon hosted on server */}
              <img
                src={amenity.icon}
                alt=""
                className={`w-6 h-6 object-contain ${isNotReported ? "opacity-40" : ""}`}
                aria-hidden="true"
              />
              <span
                className={isNotReported ? "line-through text-neutral-400" : ""}
              >
                {amenity.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show All Button */}
      {amenities.length > 10 && (
        <button
          onClick={() => setShowAllModal(true)}
          className="border-[1px] border-neutral-800 text-neutral-800 font-semibold px-6 py-3 rounded-lg hover:bg-neutral-50 transition text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
        >
          Show all {amenities.length} amenities
        </button>
      )}

      {/* Fullscreen Amenities Modal Overlay */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            {/* Modal Backdrop click to close */}
            <div
              className="absolute inset-0"
              onClick={() => setShowAllModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white w-full max-w-3xl h-[80vh] rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b-[1px] border-neutral-200">
                <button
                  onClick={() => setShowAllModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800"
                  aria-label="Close amenities list"
                >
                  <X size={18} />
                </button>
                <h2
                  id="modal-title"
                  className="text-lg font-bold text-center flex-grow pr-8"
                >
                  What this place offers
                </h2>
              </div>

              {/* Modal Body / Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {Object.entries(groupedAmenities).map(([category, items]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="font-semibold text-base text-neutral-800">
                      {category}
                    </h4>
                    <div className="space-y-4">
                      {items.map((item) => {
                        const nameLower = item.name.toLowerCase();
                        const isNotReported =
                          nameLower.includes("not reported") ||
                          nameLower === "hot water" ||
                          nameLower === "hair dryer" ||
                          nameLower === "shampoo" ||
                          nameLower === "body soap" ||
                          nameLower === "washing machine" ||
                          nameLower === "extra pillows and blankets" ||
                          nameLower === "hangers" ||
                          nameLower === "iron" ||
                          nameLower === "tv with standard cable" ||
                          nameLower === "books and reading material";

                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 py-2 border-b border-neutral-100 last:border-0"
                          >
                            <img
                              src={item.icon}
                              alt=""
                              className={`w-6 h-6 object-contain ${isNotReported ? "opacity-40" : ""}`}
                              aria-hidden="true"
                            />
                            <span
                              className={`text-sm font-normal ${isNotReported ? "line-through text-neutral-400" : "text-neutral-600"}`}
                            >
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Amenities;
