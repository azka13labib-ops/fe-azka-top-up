'use client';

import React from 'react';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full relative px-6 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-surface-page">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start text-left z-10">
          
          {/* Promo Badge */}
          <span className="inline-block bg-brand-navy-light border-[0.5px] border-brand-navy/20 text-brand-navy text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            RESELLER RESMI & TERPERCAYA
          </span>

          {/* Headline */}
          <h1 className="text-4xl lg:text-5xl font-medium text-brand-navy leading-tight mb-6 tracking-tight">
            Top-up Game
            <br />
            <span className="text-accent-amber">
              Instan & Aman
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm lg:text-base text-ink-secondary leading-relaxed mb-10 max-w-lg">
            Platform marketplace digital premium. Transaksi real-time 24/7, harga kompetitif, dengan sistem keamanan kelas enterprise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#games" className="w-full sm:w-auto text-center bg-brand-navy text-white rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-brand-navy-dark transition-colors">
              Mulai Transaksi
            </a>
            <Link href="/track" className="w-full sm:w-auto text-center bg-transparent border-[1.5px] border-brand-navy text-brand-navy rounded-xl px-8 py-3.5 text-sm font-semibold hover:bg-surface-subtle transition-colors">
              Lacak Pesanan
            </Link>
          </div>
        </div>

        {/* Right Column: Illustration Placeholder */}
        <div className="relative z-10 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="w-full max-w-[500px] aspect-[4/3] bg-surface-card border-[0.5px] border-border-strong rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Flat Illustration Placeholder */}
            <div className="absolute inset-0 bg-[url('https://placehold.co/600x450/f2f3ff/00236f/png?text=3D+Gaming+Illustration')] bg-cover bg-center opacity-70"></div>
            <div className="text-brand-navy font-semibold text-sm z-10 flex flex-col items-center p-6 bg-white/95 border-[0.5px] border-border-default rounded-xl shadow-none">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               <span className="text-xs">AZKA TOP UP PORTAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
