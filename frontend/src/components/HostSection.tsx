import { API_BASE_URL } from "../config/api";
import React from 'react';
import type { Host } from '../types';

interface HostSectionProps {
  host: Host;
}

const HostSection: React.FC<HostSectionProps> = ({ host }) => {
  return (
    <div className="py-8 border-b border-neutral-200">
      <h3 className="text-[22px] font-semibold text-neutral-900 mb-6">Meet your host</h3>

      {/* ── Outer Card Wrapper matching modern Airbnb Host Card ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Host Card Container */}
        <div className="col-span-1 bg-white border border-neutral-200 shadow-2xl rounded-3xl p-6 flex flex-col items-center select-none">
          <div className="flex w-full items-center justify-between gap-6">
            
            {/* Avatar and Badge */}
            <div className="flex flex-col items-center flex-1">
              <div className="relative">
                <img
                  src={host.avatar}
                  alt="Mirashya Homes"
                  className="w-[104px] h-[104px] rounded-full object-cover shadow-sm"
                />
                <div className="absolute bottom-0 right-0 bg-[#E61E4D] text-white p-1.5 rounded-full shadow-md">
                  <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                    <path d="M16 1L3 8v10c0 7.37 5.56 13.06 13 14 7.44-.94 13-6.63 13-14V8L16 1zm0 28.5c-5.75-.81-10-5.44-10-11V9.88l10-5.38 10 5.38v7.62c0 5.56-4.25 10.19-10 11z"/>
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mt-3">Mirashya Homes</h4>
              <p className="text-sm font-semibold text-neutral-800 mt-0.5">Host</p>
            </div>

            {/* Stats Column (inside the card) */}
            <div className="flex flex-col gap-4 text-left border-l border-neutral-100 pl-6 select-text">
              <div>
                <span className="text-[20px] font-bold text-neutral-900 block leading-none">1,463</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Reviews</span>
              </div>
              <div className="border-t border-neutral-100 my-0.5" />
              <div>
                <span className="text-[20px] font-bold text-neutral-900 block leading-none">4.68★</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Rating</span>
              </div>
              <div className="border-t border-neutral-100 my-0.5" />
              <div>
                <span className="text-[20px] font-bold text-neutral-900 block leading-none">2</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Years hosting</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Details, Bio, Co-hosts & Details list */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6 text-neutral-800">
          
          {/* Host Bio / Intro Highlights */}
          <div className="space-y-4 font-normal text-neutral-800 text-[15px] leading-relaxed">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎂</span>
              <span>Born in the 80s</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🎓</span>
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>

          {/* Co-Hosts List */}
          <div className="space-y-3 pt-2 border-t border-neutral-100">
            <h5 className="font-semibold text-[14px] text-neutral-800">Co-Hosts</h5>
            <div className="flex flex-wrap gap-4 items-center">
              {/* Co-hosts block containing image avatars or custom colored initial text boxes */}
              <div className="flex flex-wrap gap-y-3 gap-x-4 items-center">
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/co1.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Sharath</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/co2.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Aman Dev Pahwa</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/co3.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Maria Karen Priyanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/rev5.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Simran</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/rev1.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Pallavi</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={`${API_BASE_URL}/assets/rev2.jpg`} alt="" className="w-[32px] h-[32px] rounded-full object-cover" />
                  <span className="text-[14px] text-neutral-800 font-normal">Sanyukta</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "rgb(253, 231, 239)", color: "rgb(212, 53, 110)" }}>S</div>
                  <span className="text-[14px] text-neutral-800 font-normal">Shruti</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-bold text-xs" style={{ background: "rgb(231, 240, 253)", color: "rgb(58, 110, 204)" }}>A</div>
                  <span className="text-[14px] text-neutral-800 font-normal">Amisha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Response metrics and action button */}
          <div className="space-y-4 pt-4 border-t border-neutral-100">
            <h5 className="font-semibold text-sm uppercase tracking-wider text-neutral-800">Host details</h5>
            <div className="space-y-1 text-sm font-normal text-neutral-600">
              <div>Response rate: <span className="font-semibold text-neutral-900">100%</span></div>
              <div>Responds within an hour</div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button className="self-start bg-neutral-900 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-neutral-800 active:scale-95 transition focus:outline-none">
                Message host
              </button>
              
              <div className="flex gap-2 max-w-sm border-t border-neutral-100 pt-3 text-[11px] text-neutral-500 font-normal leading-normal select-none">
                <span>🛡️</span>
                <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HostSection;
