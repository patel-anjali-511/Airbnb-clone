import React from "react";
import { motion } from "framer-motion";
import { Grid2X2 } from "lucide-react";
import type { GalleryImage } from "../types";

interface ImageGalleryProps {
  images: GalleryImage[];
  onShowAll: () => void;
  onShowPhoto: (index: number) => void;
}

// ─── Single image tile with hover overlay ───────────────────────────────────
interface TileProps {
  image: GalleryImage;
  onClick: () => void;
  className?: string;
  priority?: boolean;
}

const ImageTile: React.FC<TileProps> = ({
  image,
  onClick,
  className = "",
  priority = false,
}) => (
  <motion.button
    onClick={onClick}
    className={`relative overflow-hidden bg-gray-100 group cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 ${className}`}
    aria-label={`View photo: ${image.alt}`}
    whileHover="hover"
  >
    <img
      src={image.url}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
    />
    {/* Hover overlay */}
    <motion.div
      className="absolute inset-0 bg-black"
      initial={{ opacity: 0 }}
      variants={{ hover: { opacity: 0.08 } }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
    />
  </motion.button>
);

// ─── Main Gallery Component ───────────────────────────────────────────────────
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onShowAll, onShowPhoto }) => {
  // Use first 5 images for the hero grid
  const heroImages = images.slice(0, 5);

  // Pad with placeholders if fewer than 5 images exist
  while (heroImages.length < 5) {
    heroImages.push(heroImages[0]!);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden"
    >
      {/* ── 5-image grid layout ── */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px]">
        {/* Left: large primary image spanning 2 cols × 2 rows */}
        <div className="col-span-2 row-span-2">
          <ImageTile
            image={heroImages[0]!}
            onClick={() => onShowPhoto(0)}
            className="w-full h-full"
            priority
          />
        </div>

        {/* Right: 4 smaller images in a 2×2 grid */}
        {heroImages.slice(1).map((img, i) => (
          <div key={img.id ?? i} className="col-span-1 row-span-1">
            <ImageTile
              image={img}
              onClick={() => onShowPhoto(i + 1)}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* ── "Show all photos" button ── */}
      <motion.button
        onClick={onShowAll}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="absolute bottom-4 right-4 flex items-center gap-2 bg-white border border-gray-800 text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        aria-label={`Show all ${images.length} photos`}
      >
        <Grid2X2 size={16} aria-hidden="true" />
        Show all photos
      </motion.button>
    </motion.div>
  );
};

export default ImageGallery;
