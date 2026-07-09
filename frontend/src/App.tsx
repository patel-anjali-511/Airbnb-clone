import { useState } from "react";
import { fetchListing, fetchGallery, fetchHost, fetchAmenities, fetchReviews } from "./services/api";
import { useFetch } from "./hooks/useFetch";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import PropertyHeader from "./components/PropertyHeader";
import ImageGallery from "./components/ImageGallery";
import PropertyInfo from "./components/PropertyInfo";
import BookingCard from "./components/BookingCard";
import Amenities from "./components/Amenities";
import SleepingArrangements from "./components/SleepingArrangements";
import Reviews from "./components/Reviews";
import HostSection from "./components/HostSection";
import LocationSection from "./components/LocationSection";
import ThingsToKnow from "./components/ThingsToKnow";
import Footer from "./components/Footer";
import MoreStaysNearby from "./components/MoreStaysNearby";
import PhotoTourModal from "./components/PhotoTourModal";
import StickySubNav from "./components/StickySubNav";
import FullWidthCalendar from "./components/FullWidthCalendar";

// ─── Skeleton: header ─────────────────────────────────────────────────────────
function PropertyHeaderSkeleton() {
  return (
    <div className="pt-6 pb-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4" />
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    </div>
  );
}

// ─── Skeleton: gallery ────────────────────────────────────────────────────────
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[480px] rounded-xl overflow-hidden animate-pulse">
      <div className="col-span-2 row-span-2 bg-gray-200" />
      <div className="col-span-1 row-span-1 bg-gray-200" />
      <div className="col-span-1 row-span-1 bg-gray-200" />
      <div className="col-span-1 row-span-1 bg-gray-200" />
      <div className="col-span-1 row-span-1 bg-gray-200" />
    </div>
  );
}

// ─── Skeleton: details ────────────────────────────────────────────────────────
function DetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-32" />
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
      </div>
      <hr className="border-neutral-200" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

function App() {
  const { data: listing, loading: listingLoading, error: listingError } = useFetch(fetchListing);
  const { data: gallery, loading: galleryLoading, error: galleryError } = useFetch(fetchGallery);
  const { data: host, loading: hostLoading, error: hostError } = useFetch(fetchHost);
  const { data: amenities, loading: amenitiesLoading, error: amenitiesError } = useFetch(fetchAmenities);
  const { data: reviews, loading: reviewsLoading, error: reviewsError } = useFetch(fetchReviews);

  // Photo tour overlay state (will be used in Section: Photo Tour)
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState<number | null>(null);

  // Shared date picking state (synchronizes BookingCard and FullWidthCalendar)
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18)); // Oct 18
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 23)); // Oct 23
  const [leftYear, setLeftYear] = useState(2026);
  const [leftMonth, setLeftMonth] = useState(9); // October

  const nights = checkIn && checkOut
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handlePickDate = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      if (date <= checkIn) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
      }
    }
  };

  const prevMonth = () => {
    if (leftMonth === 0) { setLeftMonth(11); setLeftYear(y => y - 1); }
    else setLeftMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear(y => y + 1); }
    else setLeftMonth(m => m + 1);
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans antialiased">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Sticky Sub-Navigation (Photos / Amenities / Reviews / Location tabs) */}
      {listing && (
        <StickySubNav
          rating={listing.rating}
          reviewCount={listing.reviewCount}
          totalPrice={28499}
          nights={5}
        />
      )}

      {/* Page offset for fixed navbar */}
      <div className="pt-20">
        <Container>
          {/* ── Sections 2–4: Property Title, Rating, Location, Share/Save ── */}
          {listingLoading && <PropertyHeaderSkeleton />}
          {listingError && (
            <p className="pt-6 text-sm text-red-500">
              Failed to load listing: {listingError}
            </p>
          )}
          {listing && <PropertyHeader listing={listing} />}

          {/* ── Section 5: Hero Image Gallery ── */}
          {galleryLoading && <GallerySkeleton />}
          {galleryError && (
            <p className="text-sm text-red-500">
              Failed to load gallery: {galleryError}
            </p>
          )}
          {gallery && gallery.length > 0 && (
            <div id="gallery">
              <ImageGallery
                images={gallery}
                onShowAll={() => { setInitialPhotoIndex(null); setPhotoTourOpen(true); }}
                onShowPhoto={(index) => { setInitialPhotoIndex(index); setPhotoTourOpen(true); }}
              />
            </div>
          )}

          {/* ── 2-Column Details Layout (Left: Info, Right: Booking Card) ── */}
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-12 mt-6 relative">
            {/* Left Column: Property Info (Sections 7 onwards) */}
            <div className="col-span-1 md:col-span-4 flex flex-col">
              {hostLoading && <DetailsSkeleton />}
              {hostError && (
                <p className="text-sm text-red-500 pt-6">
                  Failed to load host info: {hostError}
                </p>
              )}
              {listing && host && (
                <PropertyInfo listing={listing} host={host} />
              )}

              {/* ── Section 8: Amenities ── */}
              <div id="amenities">
                {amenitiesLoading && <div className="h-32 bg-gray-150 animate-pulse rounded-xl mt-6" />}
                {amenitiesError && (
                  <p className="text-sm text-red-500 pt-6">
                    Failed to load amenities: {amenitiesError}
                  </p>
                )}
                {amenities && <Amenities amenities={amenities} />}
              </div>

              {/* ── Shared Calendar (rendered in left column, aligned next to BookingCard) ── */}
              <FullWidthCalendar
                checkIn={checkIn}
                checkOut={checkOut}
                onPickDate={handlePickDate}
                onClear={() => { setCheckIn(null); setCheckOut(null); }}
                leftYear={leftYear}
                leftMonth={leftMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
                nights={nights}
              />
            </div>

            {/* Right Column: Sticky Booking Card (Section 6) */}
            <div className="col-span-1 md:col-span-3 mt-8 md:mt-0">
              {listing && (
                <BookingCard
                  listing={listing}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  setCheckIn={setCheckIn}
                  setCheckOut={setCheckOut}
                  nights={nights}
                />
              )}
            </div>
          </div>

          {/* ── Full Width Bottom Content (Below Amenities & Booking Card) ── */}
          <div className="mt-12 space-y-6">
            {/* ── Section 9: Sleeping Arrangements (Full Width / Centered) ── */}
            {listing && (
              <SleepingArrangements arrangements={listing.sleepingArrangements} />
            )}

            {/* ── Section 10: Reviews (Full Width / Centered) ── */}
            <div id="reviews">
              {reviewsLoading && <div className="h-48 bg-gray-100 animate-pulse rounded-xl mt-6" />}
              {reviewsError && (
                <p className="text-sm text-red-500 pt-6">
                  Failed to load reviews: {reviewsError}
                </p>
              )}
              {reviews && listing && (
                <Reviews
                  reviews={reviews}
                  rating={listing.rating}
                  reviewCount={listing.reviewCount}
                />
              )}
            </div>

            {/* ── Section 11: Host section ── */}
            {hostLoading && <div className="h-48 bg-gray-100 animate-pulse rounded-xl mt-6" />}
            {host && (
              <HostSection host={host} />
            )}

            {/* ── Section 12: Location section ── */}
            <div id="location">
              {listing && (
                <LocationSection listing={listing} />
              )}
            </div>

            {/* ── Section 13: Things to know ── */}
            {listing && (
              <ThingsToKnow listing={listing} />
            )}
          </div>

          <div className="pt-8 pb-12">
            <MoreStaysNearby />
          </div>
        </Container>
      </div>

      {/* ── Section 14: Footer ── */}
      <Footer />

      {/* ── Authentic Airbnb Photo Tour overlay with room categories & Lightbox ── */}
      {gallery && (
        <PhotoTourModal
          images={gallery}
          isOpen={photoTourOpen}
          onClose={() => setPhotoTourOpen(false)}
          initialPhotoIndex={initialPhotoIndex}
        />
      )}
    </div>
  );
}

export default App;


