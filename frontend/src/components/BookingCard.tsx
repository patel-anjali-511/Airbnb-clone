import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Flag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Listing } from '../types';

interface BookingCardProps {
  listing: Listing;
  checkIn: Date | null;
  checkOut: Date | null;
  setCheckIn: (d: Date | null) => void;
  setCheckOut: (d: Date | null) => void;
  nights: number;
}

// ── Calendar Helpers ───────────────────────────────────────────────
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBetween(date: Date, start: Date, end: Date) {
  return date > start && date < end;
}

function formatShortDate(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── Mini Calendar ─────────────────────────────────────────────────
interface MiniCalendarProps {
  year: number;
  month: number;
  checkIn: Date | null;
  checkOut: Date | null;
  onPickDate: (d: Date) => void;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ year, month, checkIn, checkOut, onPickDate }) => {
  const totalDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1)),
  ];

  return (
    <div className="flex-1 min-w-[280px]">
      <p className="text-center font-semibold text-sm text-gray-900 mb-3">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-xs font-semibold text-gray-500 py-1">
            {d}
          </div>
        ))}
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} />;
          const isPast = date < today;
          const isStart = checkIn && sameDay(date, checkIn);
          const isEnd = checkOut && sameDay(date, checkOut);
          const inRange = checkIn && checkOut && isBetween(date, checkIn, checkOut);

          return (
            <button
              key={idx}
              disabled={isPast}
              onClick={() => onPickDate(date)}
              className={`
                relative w-9 h-9 mx-auto flex items-center justify-center text-sm transition rounded-full
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                ${isStart || isEnd ? 'bg-gray-900 text-white hover:bg-gray-800 rounded-full z-10' : ''}
                ${inRange ? 'bg-[#f0f0f0] rounded-none text-gray-900' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ── Main BookingCard ───────────────────────────────────────────────
const BookingCard: React.FC<BookingCardProps> = ({
  listing,
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  nights,
}) => {
  const [guests, setGuests] = useState(2);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarStep, setCalendarStep] = useState<'in' | 'out'>('in');

  // Calendar navigation state — show Oct + Nov 2026 by default
  const [leftYear, setLeftYear] = useState(2026);
  const [leftMonth, setLeftMonth] = useState(9); // October

  const displayTotal = 28499;
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
  useEffect(() => {
    if (!showCalendar) return;
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showCalendar]);

  const handlePickDate = (date: Date) => {
    if (calendarStep === 'in' || !checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setCalendarStep('out');
    } else {
      if (date <= checkIn) {
        setCheckIn(date);
        setCheckOut(null);
        setCalendarStep('out');
      } else {
        setCheckOut(date);
        setCalendarStep('in');
        setShowCalendar(false);
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

  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  const incrementGuests = () => { if (guests < listing.maxGuests) setGuests(guests + 1); };
  const decrementGuests = () => { if (guests > 1) setGuests(guests - 1); };

  const formatDisplay = (d: Date | null) => {
    if (!d) return '';
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
  };

  return (
    <div className="sticky top-28 flex flex-col gap-3">

      {/* ── Loyalty Banner ── */}
      <div className="flex items-center justify-between border border-neutral-200 rounded-2xl px-5 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#00A699">
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          <div className="text-sm text-neutral-700">
            <span className="font-semibold">Get 10% off your next stay.</span>{' '}
            <a href="#" className="underline text-neutral-700 hover:text-neutral-900">Terms apply</a>
          </div>
        </div>
        <button className="text-sm font-semibold border border-neutral-800 rounded-lg px-4 py-1.5 hover:bg-neutral-50 transition">
          Claim
        </button>
      </div>

      {/* ── Main Booking Card ── */}
      <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xl relative">

        {/* Total price headline */}
        <div className="mb-5">
          <span className="text-2xl font-bold text-neutral-900">
            ₹{displayTotal.toLocaleString('en-IN')}
          </span>
          <span className="text-neutral-600 text-base font-normal ml-1">
            for {nights} night{nights !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ── Date & Guest Inputs Grid ── */}
        <div className="border border-neutral-400 rounded-xl mb-4 overflow-visible relative">
          {/* CHECK-IN / CHECKOUT row */}
          <div className="grid grid-cols-2 border-b border-neutral-400">
            <button
              className="p-3 border-r border-neutral-400 text-left hover:bg-gray-50 transition rounded-tl-xl"
              onClick={() => { setCalendarStep('in'); setShowCalendar(true); setShowGuestDropdown(false); }}
            >
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-gray-900">Check-in</p>
              <p className="text-sm text-neutral-700 mt-0.5">{checkIn ? formatDisplay(checkIn) : 'Add date'}</p>
            </button>
            <button
              className="p-3 text-left hover:bg-gray-50 transition rounded-tr-xl"
              onClick={() => { setCalendarStep('out'); setShowCalendar(true); setShowGuestDropdown(false); }}
            >
              <p className="text-[9px] font-extrabold uppercase tracking-wider text-gray-900">Checkout</p>
              <p className="text-sm text-neutral-700 mt-0.5">{checkOut ? formatDisplay(checkOut) : 'Add date'}</p>
            </button>
          </div>

          {/* GUESTS row */}
          <div
            className="p-3 cursor-pointer relative"
            onClick={() => { setShowGuestDropdown(!showGuestDropdown); setShowCalendar(false); }}
          >
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-gray-900">Guests</p>
            <div className="flex flex-row items-center justify-between text-sm font-normal text-neutral-700 mt-0.5">
              <span>{guests} guest{guests > 1 ? 's' : ''}</span>
              <ChevronDown size={16} />
            </div>
            <AnimatePresence>
              {showGuestDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg p-4 z-20 cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm">Guests</div>
                      <div className="text-xs text-neutral-500">Max {listing.maxGuests} guests</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={decrementGuests} disabled={guests <= 1}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 disabled:opacity-30 transition">−</button>
                      <span className="text-sm font-semibold w-4 text-center">{guests}</span>
                      <button onClick={incrementGuests} disabled={guests >= listing.maxGuests}
                        className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:border-neutral-800 disabled:opacity-30 transition">+</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Free Cancellation Info ── */}
        <div className="bg-neutral-100 rounded-lg px-4 py-3 mb-4 text-sm text-neutral-700">
          Free cancellation before <span className="font-semibold">17 October</span>
        </div>

        {/* ── Reserve Button ── */}
        <button className="w-full bg-[#E31C5F] text-white font-semibold py-3 rounded-[8px] hover:bg-[#D70466] active:scale-[0.98] transition-all focus:outline-none text-[16px] leading-[20px] tracking-wide mb-3 shadow-md hover:shadow-lg">
          Reserve
        </button>
        <p className="text-center text-xs text-neutral-500">You won't be charged yet</p>
      </div>

      {/* ── Calendar Overlay ── */}
      <AnimatePresence>
        {showCalendar && (
          <motion.div
            ref={calendarRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-[680px] max-w-[96vw]"
            style={{ top: 0, left: '50%', transform: 'translateX(-50%)', position: 'fixed', marginTop: '180px' }}
          >
            {/* Calendar Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {nights} night{nights !== 1 ? 's' : ''} in Candolim
                </h3>
                {checkIn && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    {formatShortDate(checkIn)}
                    {checkOut ? ` - ${formatShortDate(checkOut)}` : ''}
                  </p>
                )}
              </div>
              <button onClick={() => setShowCalendar(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition">
                <X size={18} />
              </button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-5">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-8 flex-1 justify-center">
                <MiniCalendar year={leftYear} month={leftMonth} checkIn={checkIn} checkOut={checkOut} onPickDate={handlePickDate} />
                <MiniCalendar year={rightYear} month={rightMonth} checkIn={checkIn} checkOut={checkOut} onPickDate={handlePickDate} />
              </div>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Calendar Footer */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-6 h-4 border border-gray-300 rounded-sm" />
                <span>Minimum stay: 1 night</span>
              </div>
              <button
                onClick={() => { setCheckIn(null); setCheckOut(null); setCalendarStep('in'); }}
                className="text-sm font-semibold text-gray-800 underline hover:text-gray-600 transition"
              >
                Clear dates
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Report this listing ── */}
      <button className="flex items-center justify-center gap-2 w-full mt-1 text-sm text-neutral-500 hover:text-neutral-800 underline transition">
        <Flag size={13} />
        <span>Report this listing</span>
      </button>
    </div>
  );
};

export default BookingCard;
