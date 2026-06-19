'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import FlashSaleSection from '@/components/home/FlashSaleSection';
import GameGrid from '@/components/home/GameGrid';
import FeaturesSection from '@/components/home/FeaturesSection';
import FaqSection from '@/components/home/FaqSection';
import PaymentBanner from '@/components/home/PaymentBanner';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-4 pb-0">
      <HeroSection />
      <StatsBar />
      <FlashSaleSection />
      <GameGrid search={search} setSearch={setSearch} />
      <FeaturesSection />
      <FaqSection />
      <PaymentBanner />
    </div>
  );
}
