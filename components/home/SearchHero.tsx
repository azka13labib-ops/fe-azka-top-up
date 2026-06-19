'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface SearchHeroProps {
  search: string;
  setSearch: (val: string) => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ search, setSearch }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-6 mb-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-navy to-brand-navy-dark p-8 md:p-12 shadow-xl">
        {/* Background decorative shapes */}
        <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-accent-amber/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Temukan Game Favoritmu</h2>
            <p className="text-sm text-white/70">Top-up diamond, UC, dan voucher dengan cepat dan aman.</p>
          </div>
          
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ketik nama game..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-14 pl-12 pr-4 text-white placeholder:text-white/50 outline-none focus:border-white/50 focus:bg-white/20 transition-all duration-300 shadow-inner"
            />
            <Search className="absolute left-4 top-4 h-6 w-6 text-white/50 shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHero;
