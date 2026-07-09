import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  LayoutGrid,
  X,
} from "lucide-react";
import type { GalleryImage } from "../types";
import { useActiveSection } from "../hooks/useActiveSection";

// ─── Room metadata ─────────────────────────────────────────────────────────
interface RoomMeta {
  title: string;
  amenities: string;
}

const ROOM_META: Record<string, RoomMeta> = {
  "Living room 1": {
    title: "Living room 1",
    amenities: "Sofa · Air conditioning · Ceiling fan · TV",
  },
  "Living room 2": {
    title: "Living room 2",
    amenities: "Ceiling fan · Hot tub",
  },
  "Full kitchen": {
    title: "Full kitchen",
    amenities:
      "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
  },
  Bedroom: {
    title: "Bedroom",
    amenities:
      "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
  },
  "Full bathroom": {
    title: "Full bathroom",
    amenities:
      "Bathtub · Hot water · Hair dryer · Shampoo · Body soap · Towels · Toilet paper",
  },
  Gym: {
    title: "Gym",
    amenities: "Free weights · Exercise equipment · Cardio machines",
  },
  Exterior: {
    title: "Exterior",
    amenities:
      "Private balcony · Outdoor furniture · Garden · Building security",
  },
  Pool: {
    title: "Pool",
    amenities: "Shared outdoor pool · Sun loungers · Pool towels",
  },
  "Additional photos": {
    title: "Additional photos",
    amenities: "",
  },
};

const mkId = (cat: string) => `pt-${cat.replace(/\s+/g, "-").toLowerCase()}`;

// ─── Motion Variants ───────────────────────────────────────────────────────
const headerVariant = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: "easeOut" as const },
  },
};

const lightboxOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const lightboxImg = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.26, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.18 } },
};

// ─── PhotoHeader ────────────────────────────────────────────────────────────
interface PhotoHeaderProps {
  onClose: () => void;
}
const PhotoHeader: React.FC<PhotoHeaderProps> = ({ onClose }) => (
  <motion.header
    variants={headerVariant}
    initial="hidden"
    animate="visible"
    className="bg-white border-b border-gray-100 h-[72px] flex items-center"
  >
    <div className="max-w-[1280px] mx-auto w-full px-12 flex items-center justify-between">
      <button
        onClick={onClose}
        aria-label="Go back"
        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft size={20} className="text-gray-800" strokeWidth={2.2} />
      </button>

      <span className="text-[15px] font-semibold text-gray-900 tracking-tight select-none">
        Photo tour
      </span>

      <div className="flex items-center gap-0.5">
        <button
          aria-label="Share this listing"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <Share2 size={17} className="text-gray-700" />
        </button>
        <button
          aria-label="Save to wishlist"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <Heart size={17} className="text-gray-700" />
        </button>
      </div>
    </div>
  </motion.header>
);

// ─── CategoryStrip ──────────────────────────────────────────────────────────
interface CategoryStripProps {
  categories: string[];
  grouped: Record<string, GalleryImage[]>;
  activeId: string;
  onScrollToCategory: (cat: string) => void;
}
const CategoryStrip: React.FC<CategoryStripProps> = ({
  categories,
  grouped,
  activeId,
  onScrollToCategory,
}) => {
  const stripRef = useRef<HTMLDivElement>(null);

  // Auto-scroll strip horizontally to keep active thumb centered without affecting vertical coordinates
  useEffect(() => {
    const activeCat = categories.find((c) => mkId(c) === activeId);
    if (!activeCat || !stripRef.current) return;
    const idx = categories.indexOf(activeCat);
    const child = stripRef.current.children[idx] as HTMLElement | undefined;
    if (child && child.parentElement) {
      child.parentElement.scrollTo({
        left: child.offsetLeft - child.parentElement.offsetWidth / 2 + child.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeId, categories]);

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-12 py-5">
        <div
          ref={stripRef}
          className="flex items-start gap-4 overflow-x-auto scrollbar-hide pb-1"
        >
          {categories.map((cat) => {
            const thumb = grouped[cat]?.[0];
            const isActive = mkId(cat) === activeId;
            return (
              <motion.button
                key={cat}
                onClick={() => onScrollToCategory(cat)}
                aria-label={`Jump to ${cat}`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`rounded-[14px] overflow-hidden transition-shadow duration-200 ${
                    isActive
                      ? "ring-2 ring-gray-900 shadow-md"
                      : "ring-1 ring-gray-200 group-hover:ring-gray-300 group-hover:shadow-sm"
                  }`}
                  style={{ width: 130, height: 100 }}
                >
                  {thumb ? (
                    <img
                      src={thumb.url}
                      alt={cat}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100" />
                  )}
                </div>
                <span
                  className={`text-[12px] leading-tight text-center max-w-[120px] transition-colors ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600 font-normal group-hover:text-gray-900"
                  }`}
                >
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── PhotoCard ──────────────────────────────────────────────────────────────
interface PhotoCardProps {
  image: GalleryImage;
  onClick: () => void;
  className?: string;
}
const PhotoCard: React.FC<PhotoCardProps> = ({
  image,
  onClick,
  className = "",
}) => (
  <motion.div
    className={`overflow-hidden rounded-[18px] cursor-pointer ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.22, ease: "easeOut" }}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`Open photo: ${image.alt}`}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
  >
    <img
      src={image.url}
      alt={image.alt}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  </motion.div>
);

// ─── GallerySection ─────────────────────────────────────────────────────────
interface GallerySectionProps {
  category: string;
  images: GalleryImage[];
  onImageClick: (idx: number) => void;
  globalIndex: (img: GalleryImage) => number;
}
const GallerySection: React.FC<GallerySectionProps> = ({
  images,
  onImageClick,
  globalIndex,
}) => {
  const [hero, ...rest] = images;
  return (
    <motion.section
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-10"
    >
      {/* Hero image */}
      {hero && (
        <PhotoCard
          image={hero}
          onClick={() => onImageClick(globalIndex(hero))}
          className="h-[340px]"
        />
      )}

      {/* Grid of remaining images */}
      {rest.length > 0 && (
        <div
          className={`mt-5 grid gap-5 ${
            rest.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {rest.map((img) => (
            <PhotoCard
              key={img.id}
              image={img}
              onClick={() => onImageClick(globalIndex(img))}
              className="h-[220px]"
            />
          ))}
        </div>
      )}
    </motion.section>
  );
};

// ─── Lightbox ───────────────────────────────────────────────────────────────
interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onIndexChange: (i: number) => void;
  onBackToTour: () => void;
  onClose: () => void;
}
const Lightbox: React.FC<LightboxProps> = ({
  images,
  index,
  onIndexChange,
  onClose,
  onBackToTour,
}) => {
  const img = images[index];
  const total = images.length;
  const closeRef = useRef<HTMLButtonElement>(null);

  const prev = useCallback(() => {
    if (index > 0) onIndexChange(index - 1);
  }, [index, onIndexChange]);

  const next = useCallback(() => {
    if (index < total - 1) onIndexChange(index + 1);
  }, [index, total, onIndexChange]);

  // Keyboard + focus
  useEffect(() => {
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBackToTour();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [prev, next, onBackToTour]);

  return (
    <motion.div
      key="lightbox"
      variants={lightboxOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[60] bg-black/92 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Lightbox header */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0">
        <button
          onClick={onBackToTour}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white cursor-pointer"
          aria-label="Back to photo tour"
        >
          <LayoutGrid size={20} />
        </button>

        <span className="text-sm font-semibold text-white select-none">
          {img?.category}
        </span>

        <div className="flex items-center gap-4">
          <span className="text-sm text-white/60 select-none tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white cursor-pointer"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Image + arrows */}
      <div className="flex-1 flex items-center justify-center relative px-20 pb-8">
        {/* Prev arrow */}
        {index > 0 ? (
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-6 w-10 h-10 rounded-full flex items-center justify-center border border-white/25 bg-white/8 hover:bg-white/20 hover:border-white/40 transition text-white cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <div className="absolute left-6 w-10 h-10" /> // Spacer
        )}

        {/* Image with fade+zoom */}
        <AnimatePresence mode="wait">
          <motion.img
            key={img?.id}
            src={img?.url}
            alt={img?.alt}
            variants={lightboxImg}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-h-[calc(100vh-120px)] max-w-[860px] w-full object-contain rounded-2xl"
            draggable={false}
          />
        </AnimatePresence>

        {/* Next arrow */}
        {index < total - 1 ? (
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-6 w-10 h-10 rounded-full flex items-center justify-center border border-white/25 bg-white/8 hover:bg-white/20 hover:border-white/40 transition text-white cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>
        ) : (
          <div className="absolute right-6 w-10 h-10" /> // Spacer
        )}
      </div>
    </motion.div>
  );
};

// ─── PhotoTourModal ─────────────────────────────────────────────────────────
interface PhotoTourModalProps {
  images: GalleryImage[];
  isOpen: boolean;
  onClose: () => void;
  initialPhotoIndex?: number | null;
}

const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  images,
  isOpen,
  onClose,
  initialPhotoIndex = null,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);

  // Sync scroll position when opening modal with a specific photo category
  useEffect(() => {
    if (isOpen && initialPhotoIndex !== null && containerRef.current) {
      const selectedPhoto = images[initialPhotoIndex];
      if (selectedPhoto && selectedPhoto.category) {
        // Run scroll targeting after DOM settles
        setTimeout(() => {
          const targetEl = document.getElementById(
            mkId(selectedPhoto.category!),
          );
          if (targetEl && containerRef.current) {
            containerRef.current.scrollTo({
              top: targetEl.offsetTop - 210,
              behavior: "auto",
            });
          }
        }, 80);
      }
    }
  }, [isOpen, initialPhotoIndex, images]);

  // Ordered categories (insertion order from images)
  const categories = useMemo(() => {
    const seen = new Set<string>();
    return images.reduce<string[]>((acc, img) => {
      if (img.category && !seen.has(img.category)) {
        seen.add(img.category);
        acc.push(img.category);
      }
      return acc;
    }, []);
  }, [images]);

  // Grouped images per category
  const grouped = useMemo(() => {
    const map: Record<string, GalleryImage[]> = {};
    for (const cat of categories) {
      map[cat] = images.filter((i) => i.category === cat);
    }
    return map;
  }, [images, categories]);

  // Section ids list
  const sectionIds = useMemo(() => categories.map(mkId), [categories]);

  // Active section hook based on modal container scroll
  const activeId = useActiveSection(
    sectionIds,
    containerRef,
    isProgrammaticScrollRef,
  );

  // Body scroll lock when tour is open (and no lightbox)
  useEffect(() => {
    if (!isOpen) return;
    if (lightboxIndex === null) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, lightboxIndex]);

  // ESC to close tour (when lightbox isn't open)
  useEffect(() => {
    if (!isOpen || lightboxIndex !== null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, lightboxIndex, onClose]);

  const getGlobalIndex = useCallback(
    (img: GalleryImage) => images.findIndex((i) => i.id === img.id),
    [images],
  );

  // Scroll to a specific category section inside the modal viewport container
  const handleScrollToCategory = useCallback((cat: string) => {
    const targetEl = document.getElementById(mkId(cat));
    const container = containerRef.current;
    if (!targetEl || !container) return;

    isProgrammaticScrollRef.current = true;

    // Scroll to the element position offset
    const stripOffset = 20;
    const targetScrollTop = targetEl.offsetTop - stripOffset;
    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });

    // Check progress using requestAnimationFrame to accurately detect end of scroll
    let lastScrollTop = container.scrollTop;
    const check = () => {
      const currentScroll = container.scrollTop;
      const dist = Math.abs(currentScroll - targetScrollTop);

      // If we are extremely close, or if scrolling has stopped completely
      if (dist < 2 || currentScroll === lastScrollTop) {
        isProgrammaticScrollRef.current = false;
        return;
      }
      lastScrollTop = currentScroll;
      requestAnimationFrame(check);
    };

    // Delay start of checks slightly to let the scroll animation initialize
    setTimeout(() => {
      requestAnimationFrame(check);
    }, 50);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* ── Photo Tour Scrollable Container ── */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-white overflow-y-auto scrollbar-hide"
        role="presentation"
        style={lightboxIndex !== null ? { overflow: "hidden" } : undefined}
      >
        {/* Header */}
        <PhotoHeader onClose={onClose} />

        {/* Category Thumbnail Strip */}
        <CategoryStrip
          categories={categories}
          grouped={grouped}
          activeId={activeId}
          onScrollToCategory={handleScrollToCategory}
        />

        {/* Category Sections List */}
        <div className="max-w-[1280px] mx-auto px-12">
          {categories.map((cat) => {
            const roomImages = grouped[cat] ?? [];
            const meta = ROOM_META[cat] ?? { title: cat, amenities: "" };
            return (
              <div
                key={cat}
                id={mkId(cat)}
                className="grid gap-8 border-b border-neutral-100 py-12 last:border-0 scroll-mt-[20px]"
                style={{ gridTemplateColumns: "35% 65%" }}
              >
                {/* Left Column: Sticky Description for this category */}
                <div className="relative">
                  <div className="sticky top-[20px] pt-4 pr-10 flex flex-col justify-start">
                    <h2 className="text-[34px] font-bold text-neutral-900 leading-tight mb-3 tracking-tight">
                      {meta.title}
                    </h2>
                    {meta.amenities && (
                      <p className="text-[14px] text-neutral-500 leading-relaxed font-normal">
                        {meta.amenities}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Gallery Images */}
                <div>
                  <GallerySection
                    category={cat}
                    images={roomImages}
                    onImageClick={setLightboxIndex}
                    globalIndex={getGlobalIndex}
                  />
                </div>
              </div>
            );
          })}
          {/* Spacer so last section can align properly */}
          <div className="h-[20vh]" aria-hidden="true" />
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            onBackToTour={() => setLightboxIndex(null)}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoTourModal;
