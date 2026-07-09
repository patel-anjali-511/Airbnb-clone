import React from "react";
import type { Listing } from "../types";
import { Calendar, Key, ShieldAlert } from "lucide-react";

interface ThingsToKnowProps {
  listing: Listing;
}

const ThingsToKnow: React.FC<ThingsToKnowProps> = ({ listing: _listing }) => {
  return (
    <div className="py-8 ">
      <h3 className="text-[22px] font-semibold text-neutral-900 mb-6">
        Things to know
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Cancellation policy */}
        <div className="flex flex-col gap-3">
          <div className="mb-1 text-neutral-800">
            <Calendar size={28} strokeWidth={1.5} />
          </div>
          <h4 className="font-semibold text-[16px] text-neutral-800">
            Cancellation policy
          </h4>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            Free cancellation before 17 October. Cancel before check-in on 18
            October for a partial refund.
          </p>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed">
            Review this host’s full policy for details.
          </p>
          <button className="flex items-center gap-1 text-sm font-semibold text-neutral-950 underline hover:text-neutral-700 transition text-left mt-2">
            <span>Learn more</span>
          </button>
        </div>

        {/* Column 2: House rules */}
        <div className="flex flex-col gap-3">
          <div className="mb-1 text-neutral-800">
            <Key size={28} strokeWidth={1.5} />
          </div>
          <h4 className="font-semibold text-[16px] text-neutral-800">
            House rules
          </h4>
          <ul className="text-sm text-neutral-500 font-normal space-y-2.5">
            <li>Check-in after 2:00 pm</li>
            <li>Checkout before 11:00 am</li>
            <li>3 guests maximum</li>
          </ul>
          <button className="flex items-center gap-1 text-sm font-semibold text-neutral-950 underline hover:text-neutral-700 transition text-left mt-2">
            <span>Learn more</span>
          </button>
        </div>

        {/* Column 3: Safety & property */}
        <div className="flex flex-col gap-3">
          <div className="mb-1 text-neutral-800">
            <ShieldAlert size={28} strokeWidth={1.5} />
          </div>
          <h4 className="font-semibold text-[16px] text-neutral-800">
            Safety & property
          </h4>
          <ul className="text-sm text-neutral-500 font-normal space-y-2.5">
            <li className="line-through text-neutral-400">Carbon monoxide alarm not reported</li>
            <li className="line-through text-neutral-400">Smoke alarm not reported</li>
            <li>Exterior security cameras on property</li>
          </ul>
          <button className="flex items-center gap-1 text-sm font-semibold text-neutral-950 underline hover:text-neutral-700 transition text-left mt-2">
            <span>Learn more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThingsToKnow;
