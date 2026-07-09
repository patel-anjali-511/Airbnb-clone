import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
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
    <div className="flex-1 min-w-[285px]">
      <p className="text-center font-semibold text-sm text-gray-900 mb-4">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1.5 text-center">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-xs font-semibold text-gray-500 py-1 select-none">
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
                relative w-10 h-10 mx-auto flex items-center justify-center text-sm transition rounded-full
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-neutral-100 cursor-pointer font-medium text-neutral-800'}
                ${isStart || isEnd ? 'bg-neutral-900 text-white hover:bg-neutral-800 rounded-full z-10 font-bold' : ''}
                ${inRange ? 'bg-neutral-100 rounded-none text-neutral-900' : ''}
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

interface FullWidthCalendarProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onPickDate: (d: Date) => void;
  onClear: () => void;
  leftYear: number;
  leftMonth: number;
  prevMonth: () => void;
  nextMonth: () => void;
  nights: number;
}

const FullWidthCalendar: React.FC<FullWidthCalendarProps> = ({
  checkIn,
  checkOut,
  onPickDate,
  onClear,
  leftYear,
  leftMonth,
  prevMonth,
  nextMonth,
  nights,
}) => {
  const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;

  return (
    <div className="py-8 border-b border-neutral-200">
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold text-neutral-900">
          {nights ? `${nights} nights` : 'Select dates'} in Candolim
        </h3>
        <p className="text-sm text-neutral-500 font-normal mt-1 mb-6">
          {checkIn && checkOut
            ? `${formatShortDate(checkIn)} - ${formatShortDate(checkOut)}`
            : 'Add your travel dates for exact pricing'}
        </p>

        {/* Calendar Side-by-Side View */}
        <div className="relative flex flex-col sm:flex-row gap-8 items-start justify-between">
          {/* Navigation Arrows */}
          <button
            onClick={prevMonth}
            className="absolute left-1 top-0 p-2 hover:bg-neutral-100 rounded-full transition z-10"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            className="absolute right-1 top-0 p-2 hover:bg-neutral-100 rounded-full transition z-10"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>

          <MiniCalendar
            year={leftYear}
            month={leftMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onPickDate={onPickDate}
          />
          <MiniCalendar
            year={rightYear}
            month={rightMonth}
            checkIn={checkIn}
            checkOut={checkOut}
            onPickDate={onPickDate}
          />
        </div>

        {/* Clear dates trigger */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClear}
            className="text-sm font-semibold text-neutral-800 underline hover:text-neutral-600 transition"
          >
            Clear dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullWidthCalendar;
