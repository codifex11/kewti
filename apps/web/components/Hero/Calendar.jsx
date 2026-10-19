"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { KewtiCalendar } from '@workspace/ui/components/kewti-calender/component';
import Kenat from 'kenat';

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(() => new Kenat());
  const DOCS_PAGE = process.env.NEXT_PUBLIC_DOCS_PAGE || "localhost:3001";

  const gc = selectedDate ? selectedDate.getGregorian() : null;

  return (
    <div className="w-full bg-[#1A1412]/80 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden font-sans py-12 md:py-16 select-none rounded-2xl border border-white/5 shadow-2xl">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] bg-[#E05320]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Real Ethiopian Calendar — wrapped in .dark so Tailwind dark: variants activate */}
      <div className="dark relative z-10 flex flex-col items-center gap-4">
        <KewtiCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          showAnimations={true}
          showHolidays={true}
          className="!bg-neutral-950 border border-neutral-800 shadow-2xl"
        />

      </div>

      {/* Bottom Right Action Panel */}
      <div className="bg-[#1C1C1C] rounded-none px-6 py-4 mt-8 flex items-center gap-4 border-l border-t border-neutral-800/30 cursor-pointer hover:bg-[#2a2220] transition-colors md:max-w-1/5 md:w-full md:absolute md:bottom-0 md:right-0">
        <Link target="_blank" rel="noopener noreferrer" href={`${DOCS_PAGE}/docs/components/kewti-calender`}>
          <span className="text-sm font-normal text-neutral-300 tracking-wide">
            More to Explore
          </span>
        </Link>
        <div className="text-[#E05320] flex items-center justify-center">
          <svg className="w-4 h-4 transform stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </div>
  );
}