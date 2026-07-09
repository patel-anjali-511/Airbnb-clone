import React from 'react';
import { Bed } from 'lucide-react';
import type { SleepingArrangement } from '../types';

interface SleepingArrangementsProps {
  arrangements: SleepingArrangement[];
}

const SleepingArrangements: React.FC<SleepingArrangementsProps> = ({ arrangements }) => {
  if (!arrangements || arrangements.length === 0) return null;

  return (
    <div className="py-6 border-b-[1px] border-neutral-200">
      <h3 className="text-xl font-semibold mb-6">Where you'll sleep</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {arrangements.map((item) => (
          <div
            key={item.id}
            className="border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition duration-200"
          >
            {/* Room Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.room}
                className="w-full h-36 object-cover rounded-xl"
              />
            )}
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-base">{item.room}</div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 font-normal">
                <Bed size={16} />
                <span>{item.beds.join(', ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SleepingArrangements;
