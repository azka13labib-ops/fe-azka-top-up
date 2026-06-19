'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const FlashSaleSection: React.FC = () => {
  // Mock timer: count down from a fixed duration on load
  const [secondsLeft, setSecondsLeft] = useState(10053); // 2h 47m 33s

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 10053));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeBlock = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const hours = formatTimeBlock(Math.floor(secondsLeft / 3600));
  const minutes = formatTimeBlock(Math.floor((secondsLeft % 3600) / 60));
  const seconds = formatTimeBlock(secondsLeft % 60);

  return (
    <section id="promotions" className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <h3 className="text-xs font-bold text-accent-amber uppercase tracking-wider">
              WAKTU TERBATAS
            </h3>
          </div>
          <p className="text-xl font-medium text-brand-navy">Flash Sale Premium</p>
        </div>
        
        <div className="bg-white border-[0.5px] border-border-default rounded-full px-5 py-2 flex items-center gap-2 shadow-none">
          <svg className="w-4 h-4 text-accent-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div className="flex items-center gap-1 text-ink-primary font-semibold tabular-nums text-sm">
            <span>{hours}</span>
            <span className="text-ink-hint">:</span>
            <span>{minutes}</span>
            <span className="text-ink-hint">:</span>
            <span>{seconds}</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1 (Mobile Legends) - Highlighted */}
        <div className="lg:col-span-2 bg-white border-[0.5px] border-border-default rounded-2xl overflow-hidden flex flex-col sm:flex-row border-l-4 border-l-accent-amber shadow-none">
          {/* Image Placeholder */}
          <div className="w-full sm:w-2/5 bg-surface-subtle relative min-h-[200px] flex items-center justify-center border-r-[0.5px] border-border-default overflow-hidden">
            <img src="/Thumbnail/mlbb-banner.jpg" alt="Mobile Legends Flash Sale" className="w-full h-full object-cover absolute inset-0" />
            <span className="absolute top-4 left-4 bg-accent-amber text-white text-[10px] font-bold px-2.5 py-1 rounded-sm z-10">
              SAVE 40%
            </span>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center bg-white">
            <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider mb-2">
              Mobile Legends
            </span>
            <h4 className="text-2xl font-medium text-brand-navy leading-tight mb-4 tracking-tight">
              5000 + 1000
              <br />
              Bonus Diamonds
            </h4>
            
            <div className="mb-6">
              <span className="text-xs text-ink-muted uppercase tracking-wide">
                Harga Normal: <span className="line-through">Rp 1.250.000</span>
              </span>
              <div className="text-2xl font-medium text-brand-navy mt-1">
                Rp 750.000
              </div>
            </div>
            
            <Link href="/games/mobile-legends">
              <button className="w-full sm:w-auto bg-transparent border-[1.5px] border-brand-navy text-brand-navy font-semibold px-8 py-3 rounded-xl hover:bg-surface-subtle transition-colors cursor-pointer text-sm">
                Beli Sekarang
              </button>
            </Link>
          </div>
        </div>

        {/* Card 2 (PUBG Mobile) */}
        <div className="bg-white border-[0.5px] border-border-default rounded-2xl overflow-hidden flex flex-col shadow-none">
          {/* Image Placeholder */}
          <div className="w-full h-48 bg-surface-subtle relative flex items-center justify-center border-b-[0.5px] border-border-default overflow-hidden">
             <img src="/Thumbnail/pubg.jpg" alt="PUBG Mobile Flash Sale" className="w-full h-full object-cover absolute inset-0" />
             <span className="absolute top-4 left-4 bg-brand-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-sm z-10">
              SAVE 25%
            </span>
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col justify-center bg-white">
            <span className="text-xs font-semibold text-brand-navy uppercase tracking-wider mb-1">
              PUBG Mobile
            </span>
            <h4 className="text-lg font-medium text-brand-navy mb-4 tracking-tight">
              3850 UC
            </h4>
            
            <div className="mb-6">
              <span className="text-[10px] text-ink-muted line-through block">
                Rp 800.000
              </span>
              <div className="text-lg font-medium text-brand-navy">
                Rp 600.000
              </div>
            </div>
            
            <Link href="/games/pubg-mobile" className="mt-auto">
              <button className="w-full bg-transparent border-[1.5px] border-brand-navy text-brand-navy font-semibold px-4 py-2.5 rounded-xl hover:bg-surface-subtle transition-colors cursor-pointer text-sm">
                Pilih Nominal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
