import React from 'react';
import type { Listing, Host } from '../types';

interface PropertyInfoProps {
  listing: Listing;
  host: Host;
}

// Matching icons from screenshot using SVG
const OutdoorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18l9-9 9 9" />
    <path d="M9 12l-2 6" />
    <path d="M15 12l2 6" />
    <path d="M12 3v9" />
  </svg>
);

const FanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 6" />
    <path d="M12 22a4 4 0 0 1-4-4c0-2 2-3 2-6" />
    <path d="M2 12a4 4 0 0 1 4-4c2 0 3 2 6 2" />
    <path d="M22 12a4 4 0 0 1-4 4c-2 0-3-2-6-2" />
  </svg>
);

const CheckInDoorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="12" height="18" rx="1" />
    <path d="M15 9l3 3-3 3" />
    <path d="M18 12H9" />
  </svg>
);

const PropertyInfo: React.FC<PropertyInfoProps> = ({ listing, host }) => {
  const [isDescExpanded, setIsDescExpanded] = React.useState(false);

  const fullDescription = "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";

  return (
    <div className="flex flex-col gap-0 py-6">

      {/* ── Row 1: Title + Specs ── */}
      <div className="pb-6 border-b border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-1">
          Entire {listing.type.toLowerCase()} in {listing.location}
        </h2>
        <p className="text-neutral-500 text-sm font-normal">
          {listing.maxGuests} guests&nbsp;·&nbsp;
          {listing.bedrooms} bedroom&nbsp;·&nbsp;
          {listing.beds} bed&nbsp;·&nbsp;
          {listing.bathrooms} bathroom
        </p>
      </div>

      {/* ── Row 2: Guest Favorite Banner ── */}
      {listing.isGuestFavorite && (
        <div className="flex flex-row items-center justify-between border border-neutral-200 rounded-2xl px-5 py-4 my-6 shadow-sm">
          {/* Left: Guest Favourite laurels banner + description */}
          <div className="flex items-center gap-6">
            <div className="flex items-center select-none" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
              {/* Left Laurel */}
              <svg style={{ display: 'block', height: '36px', width: 'auto' }} viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222" />
              </svg>
              {/* Text label */}
              <div className="flex flex-col items-center justify-center px-1 text-center font-bold text-neutral-900 tracking-tight leading-[1.05]">
                <span className="text-[17px] tracking-tight">Guest</span>
                <span className="text-[13px] tracking-tight font-semibold">favourite</span>
              </div>
              {/* Right Laurel */}
              <svg style={{ display: 'block', height: '36px', width: 'auto' }} viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1]">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.4895 25.417L14.8276 24.4547L16.5303 23.6492L17.1923 24.6116L16.3409 25.0143L17.1923 24.6116C18.6638 26.751 17.9509 29.3868 15.5999 30.4989C14.8548 30.8513 14.0005 31.0196 13.1221 30.987L12.8044 30.9752L12.7297 29.2305L13.0474 29.2423C13.5744 29.2618 14.0871 29.1608 14.5341 28.9494C15.9447 28.2821 16.3725 26.7007 15.4895 25.417Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.32441 10.235C10.0819 8.96204 10.9247 7.4878 10.853 5.81232C10.7813 4.13685 9.80929 2.59524 7.93708 1.18749C6.17964 2.46049 5.33678 3.93473 5.40851 5.6102C5.48024 7.28568 6.45221 8.82729 8.32441 10.235Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.19425 0.489275C7.55718 0.226387 8.10753 0.246818 8.49416 0.537533C10.5385 2.07473 11.7071 3.84975 11.7923 5.84026C11.8775 7.83076 10.8574 9.52453 8.93841 10.9146C8.57548 11.1775 8.02513 11.157 7.6385 10.8663C5.59415 9.32914 4.4256 7.55411 4.34039 5.56361C4.25517 3.57311 5.27521 1.87933 7.19425 0.489275ZM7.92362 2.3684C6.77985 3.38355 6.29788 4.47199 6.3478 5.63813C6.39772 6.80428 6.97457 7.93203 8.20904 9.03547C9.35281 8.02032 9.83478 6.93187 9.78486 5.76573C9.73493 4.59959 9.15809 3.47184 7.92362 2.3684Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6806 24.0529C14.1314 22.353 12.4326 21.4688 10.5842 21.4001C8.73575 21.3315 7.10737 22.0923 5.69905 23.6824C7.24822 25.3823 8.94702 26.2666 10.7955 26.3352C12.6439 26.4038 14.2723 25.6431 15.6806 24.0529Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M4.90529 24.1787C4.60807 23.8526 4.58911 23.4097 4.8593 23.1046C6.38985 21.3765 8.27538 20.4331 10.521 20.5164C12.7666 20.5998 14.7391 21.6864 16.4227 23.5339C16.7199 23.86 16.7389 24.303 16.4687 24.608C14.9381 26.3361 13.0526 27.2795 10.807 27.1962C8.56134 27.1128 6.5889 26.0262 4.90529 24.1787ZM6.98781 23.7198C8.22307 24.8808 9.46778 25.4045 10.7323 25.4515C11.9968 25.4984 13.2005 25.0656 14.3402 23.9928C13.1049 22.8318 11.8602 22.3081 10.5957 22.2611C9.3312 22.2142 8.12744 22.6471 6.98781 23.7198Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M10.6766 20.7043C10.2137 18.5957 9.16392 17.0928 7.52727 16.1956C5.89062 15.2984 3.99442 15.1864 1.83867 15.8596C2.30157 17.9683 3.35135 19.4712 4.988 20.3684C6.62465 21.2656 8.52085 21.3775 10.6766 20.7043Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M0.791956 15.9443C0.703053 15.5393 0.94431 15.1569 1.37329 15.023C3.7337 14.2859 5.9714 14.3695 7.95247 15.4554C9.92449 16.5364 11.1013 18.3139 11.6022 20.5956C11.6911 21.0006 11.4499 21.3829 11.0209 21.5169C8.66048 22.254 6.42277 22.1704 4.4417 21.0844C2.46969 20.0034 1.29285 18.226 0.791956 15.9443ZM2.95349 16.4656C3.43375 17.9951 4.27991 19.007 5.41321 19.6282C6.5306 20.2407 7.84423 20.4286 9.44069 20.0743C8.96043 18.5448 8.11427 17.5329 6.98097 16.9116C5.86358 16.2991 4.54995 16.1113 2.95349 16.4656Z" fill="#222222" />
                <path fillRule="evenodd" clipRule="evenodd" d="M7.90911 15.6267C8.65652 13.6743 8.53705 11.9555 7.55072 10.4702C6.56438 8.98484 4.90844 8.03014 2.58291 7.60605C1.8355 9.55846 1.95497 11.2773 2.9413 12.7626C3.92764 14.2479 5.58357 15.2026 7.90911 15.6267Z" fill="#F7F7F7" />
                <path fillRule="evenodd" clipRule="evenodd" d="M1.66037 7.28295C1.80927 6.89397 2.26578 6.67525 2.74598 6.76282C5.29848 7.22831 7.26368 8.31371 8.44396 10.0911C9.61955 11.8614 9.70866 13.854 8.89805 15.9715C8.74915 16.3605 8.29264 16.5792 7.81244 16.4916C5.25994 16.0261 3.29474 14.9407 2.11446 13.1634C0.938866 11.393 0.849755 9.40048 1.66037 7.28295ZM3.3385 8.6613C2.94038 10.1267 3.14588 11.3465 3.83454 12.3835C4.51397 13.4067 5.60091 14.1584 7.21992 14.5931C7.61804 13.1278 7.41254 11.9079 6.72388 10.8709C6.04445 9.84774 4.95751 9.09607 3.3385 8.6613Z" fill="#222222" />
              </svg>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200" />
            <p className="text-sm text-neutral-600 font-normal sm:max-w-[210px] leading-snug">
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>

          {/* Right: Rating + Review count */}
          <div className="flex items-center gap-4 sm:gap-6 md:pr-2">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-neutral-900">{listing.rating.toFixed(2)}</span>
              <div className="flex text-amber-400 text-xs mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-neutral-900">{listing.reviewCount}</span>
              <span className="text-xs text-neutral-500 font-normal">Reviews</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Row 3: Hosted by + Avatar ── */}
      <div className="flex items-center gap-3 py-5 border-t border-neutral-200">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow"
        />
        <div>
          <p className="text-base font-semibold text-neutral-900">
            Hosted by {host.name} Homes
          </p>
          <p className="text-sm text-neutral-500 font-normal">2 years hosting</p>
        </div>
      </div>

      {/* ── Row 4: Highlights ── */}
      <div className="flex flex-col gap-5 py-5 border-t border-neutral-200">

        <div className="flex flex-row gap-4 items-start">
          <span className="text-neutral-700 mt-0.5 shrink-0">
            <OutdoorIcon />
          </span>
          <div>
            <h3 className="text-base font-semibold text-neutral-900">Outdoor entertainment</h3>
            <p className="text-sm text-neutral-500 font-normal">
              The pool and alfresco dining are great for summer trips.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-start">
          <span className="text-neutral-700 mt-0.5 shrink-0">
            <FanIcon />
          </span>
          <div>
            <h3 className="text-base font-semibold text-neutral-900">Designed for staying cool</h3>
            <p className="text-sm text-neutral-500 font-normal">
              Beat the heat with the A/C and ceiling fan.
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4 items-start">
          <span className="text-neutral-700 mt-0.5 shrink-0">
            <CheckInDoorIcon />
          </span>
          <div>
            <h3 className="text-base font-semibold text-neutral-900">Self check-in</h3>
            <p className="text-sm text-neutral-500 font-normal">
              You can check in with the building staff.
            </p>
          </div>
        </div>

      </div>

      {/* ── Row 5: Translation Note & Description ── */}
      <div className="py-7 border-t border-neutral-200 flex flex-col gap-5">
        {/* Translation Banner */}
        <div className="bg-neutral-50 rounded-xl p-4 flex items-center justify-between border border-neutral-100">
          <p className="text-[14px] text-neutral-800 font-normal">
            Some info has been automatically translated. <button className="underline font-semibold text-neutral-900 cursor-pointer">Show original</button>
          </p>
        </div>

        {/* Property Description */}
        <div className="relative text-[15px] text-neutral-800 leading-relaxed font-normal">
          <div className={isDescExpanded ? "" : "line-clamp-2 pr-4"}>
            {fullDescription}
          </div>
          {!isDescExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        {/* Show More Trigger Link */}
        <div className="pt-2">
          <button 
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="flex items-center gap-1 font-semibold text-neutral-900 underline text-[15px] cursor-pointer hover:text-neutral-800 transition"
          >
            {isDescExpanded ? "Show less" : "Show more"}
            <svg 
              viewBox="0 0 18 18" 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-[12px] h-[12px] fill-none stroke-current stroke-2 mt-0.5 transition-transform duration-200 ${isDescExpanded ? "rotate-180" : ""}`}
            >
              <path d="m6 3 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyInfo;
