// ─── Listing ─────────────────────────────────────────────────────────────────

export interface PricingInfo {
  basePrice: number;
  currency: string;
  cleaningFee: number;
  serviceFee: number;
  discountLabel: string;
}

export interface HighlightItem {
  icon: string;
  title: string;
  description: string;
}

export interface SleepingArrangement {
  id: number;
  room: string;
  image: string;
  beds: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Listing {
  id: string;
  title: string;
  type: string;
  location: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  highlights: HighlightItem[];
  checkIn: string;
  checkOut: string;
  pricing: PricingInfo;
  sleepingArrangements: SleepingArrangement[];
  coordinates: Coordinates;
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  category: string;
  url: string;
  alt: string;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  text: string;
}

// ─── Amenities ───────────────────────────────────────────────────────────────

export interface Amenity {
  id: number;
  category: string;
  icon: string;
  name: string;
}

// ─── Host ─────────────────────────────────────────────────────────────────────

export interface CoHost {
  name: string;
  avatar: string;
}

export interface RatingBreakdown {
  label: string;
  icon: string;
  score: number;
}

export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  joinedDate: string;
  totalReviews: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  about: string;
  highlights: string[];
  coHosts: CoHost[];
  ratingBreakdown: RatingBreakdown[];
}
