'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'MLBB SPECIAL',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      title: 'Weekly Diamond Pass',
      subtitle: 'Klaim total 210 Diamonds selama 7 hari. Hemat 30% dibanding top-up biasa!',
      priceText: 'Rp 26.500',
      link: '/games/mobile-legends',
      bgColor: 'from-blue-50 to-indigo-100/50 border-indigo-100',
      glowColor: 'bg-indigo-400/20',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Floating glowing MLBB Diamond visual */}
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-45 flex items-center justify-center shadow-xl animate-bounce duration-1000 relative">
            <span className="text-white font-bold text-3xl -rotate-45">💎</span>
          </div>
          <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-indigo-300 rounded-full animate-pulse"></div>
        </div>
      )
    },
    {
      badge: 'FLASH SALE FF',
      badgeColor: 'bg-orange-100 text-orange-700 border-orange-200',
      title: 'Top Up Free Fire',
      subtitle: 'Dapatkan bonus diamond ekstra up to 15% untuk semua nominal top-up.',
      priceText: 'Rp 1.000',
      link: '/games/free-fire',
      bgColor: 'from-amber-50 to-orange-100/50 border-orange-100',
      glowColor: 'bg-orange-400/20',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Floating glowing FF Fire visual */}
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl rotate-12 flex items-center justify-center shadow-xl animate-pulse relative">
            <span className="text-white font-bold text-4xl">🔥</span>
          </div>
          <div className="absolute top-1/3 left-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
        </div>
      )
    },
    {
      badge: 'PUBG DISCOUNT',
      badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      title: 'PUBG Mobile UC Deals',
      subtitle: 'Promo harga termurah untuk Unknown Cash (UC). Proses otomatis 24 Jam!',
      priceText: 'Rp 9.745',
      link: '/games/pubg-mobile',
      bgColor: 'from-emerald-50 to-teal-100/50 border-emerald-100',
      glowColor: 'bg-emerald-400/20',
      illustration: (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Floating airdrop/chest visual */}
          <div className="w-20 h-16 bg-gradient-to-b from-red-600 to-red-800 rounded-lg flex flex-col items-center justify-between border-t-8 border-blue-600 shadow-xl animate-bounce relative">
            <span className="text-white font-bold text-[9px] pt-1">AIRDROP</span>
            <div className="w-5 h-2 bg-yellow-400 rounded-full mb-1"></div>
          </div>
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-teal-300 rounded-full animate-ping"></div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

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

        {/* Right Column: Automated Banner Carousel */}
        <div className="relative z-10 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <div className="relative w-full max-w-[500px] aspect-4/3 rounded-2xl overflow-hidden shadow-xl border border-border-default bg-white group">
            
            {/* Carousel Slides */}
            <div className="w-full h-full relative">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} p-6 flex flex-col justify-between transition-all duration-700 ease-in-out transform ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0 z-10' 
                      : 'opacity-0 translate-x-4 z-0 pointer-events-none'
                  }`}
                >
                  {/* Background Ambient Glow */}
                  <div className={`absolute -top-12 -right-12 w-48 h-48 ${slide.glowColor} rounded-full blur-3xl`}></div>

                  {/* Slide Top: Badge & Illustration Container */}
                  <div className="grid grid-cols-12 gap-4 h-3/5 items-center relative z-10">
                    <div className="col-span-7 space-y-3">
                      <span className={`inline-block border ${slide.badgeColor} text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase`}>
                        {slide.badge}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold text-brand-navy leading-tight tracking-tight">
                        {slide.title}
                      </h3>
                      <p className="text-xs text-ink-secondary line-clamp-3">
                        {slide.subtitle}
                      </p>
                    </div>
                    <div className="col-span-5 h-full flex items-center justify-center">
                      {slide.illustration}
                    </div>
                  </div>

                  {/* Slide Bottom: Pricing & CTA */}
                  <div className="flex items-center justify-between border-t border-brand-navy/10 pt-4 relative z-10">
                    <div>
                      <span className="text-[10px] text-ink-muted block mb-0.5">Mulai Dari</span>
                      <span className="text-lg font-bold text-brand-navy font-mono">{slide.priceText}</span>
                    </div>
                    <Link
                      href={slide.link}
                      className="bg-brand-navy hover:bg-brand-navy-dark text-white rounded-xl px-5 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                    >
                      Beli Sekarang
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Left & Right Navigation Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-border-default flex items-center justify-center text-brand-navy shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-border-default flex items-center justify-center text-brand-navy shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-4 left-6 flex gap-1.5 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide ? 'bg-brand-navy w-5' : 'bg-brand-navy/30'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
