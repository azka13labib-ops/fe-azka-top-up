'use client';

import React from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Search, Gamepad2 } from 'lucide-react';
import { api } from '@/lib/api';
import { Game } from '@/types';
import { Skeleton } from '@/components/ui/Skeleton';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

const gameMetadata: Record<string, { publisher: string; color: string; isFeatured?: boolean }> = {
  'mobile-legends': { publisher: 'Moonton', color: '#1a1a2e', isFeatured: true },
  'free-fire': { publisher: 'Garena', color: '#FF6B35' },
  'genshin-impact': { publisher: 'HoYoverse', color: '#1a1635' },
  'pubg-mobile': { publisher: 'Level Infinite', color: '#2B5FB3' },
  'valorant': { publisher: 'Riot Games', color: '#E8372A' },
  'call-of-duty': { publisher: 'Activision', color: '#2C2C2C' },
};

export const GameGrid: React.FC<{ search: string, setSearch?: React.Dispatch<React.SetStateAction<string>> }> = ({ search, setSearch }) => {
  const { data: games, isLoading } = useSWR<Game[]>('/games', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  // Fallback items in case API is empty or loading fails
  const fallbackGames: Game[] = [
    { id: 1, name: 'Mobile Legends', slug: 'mobile-legends', thumbnail_url: 'https://placehold.co/400x600/f2f3ff/00236f/png?text=Mobile+Legends', description: '', id_field_label: 'ID', zone_field_label: 'Server', needs_zone: true, is_active: true },
    { id: 2, name: 'Free Fire', slug: 'free-fire', thumbnail_url: 'https://placehold.co/400x600/ffddb8/855300/png?text=Free+Fire', description: '', id_field_label: 'ID', zone_field_label: null, needs_zone: false, is_active: true },
    { id: 3, name: 'Genshin Impact', slug: 'genshin-impact', thumbnail_url: 'https://placehold.co/400x600/f2f3ff/00236f/png?text=Genshin+Impact', description: '', id_field_label: 'ID', zone_field_label: 'Server', needs_zone: true, is_active: true },
    { id: 4, name: 'PUBG Mobile', slug: 'pubg-mobile', thumbnail_url: 'https://placehold.co/400x600/f2f3ff/00236f/png?text=PUBG+Mobile', description: '', id_field_label: 'ID', zone_field_label: null, needs_zone: false, is_active: true },
    { id: 5, name: 'Valorant', slug: 'valorant', thumbnail_url: 'https://placehold.co/400x600/f2f3ff/00236f/png?text=Valorant', description: '', id_field_label: 'ID', zone_field_label: null, needs_zone: false, is_active: true },
    { id: 6, name: 'Call of Duty', slug: 'call-of-duty', thumbnail_url: 'https://placehold.co/400x600/f2f3ff/00236f/png?text=Call+of+Duty', description: '', id_field_label: 'ID', zone_field_label: null, needs_zone: false, is_active: true },
  ];

  const activeGames = games && games.length > 0 ? games : fallbackGames;

  const filteredGames = activeGames.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="games" className="max-w-7xl mx-auto px-6 py-12 bg-surface-page">
      
      {/* Centered Search Bar */}
      <div className="flex flex-col items-center mb-12">
        <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-wider mb-6">
          Katalog Produk
        </h3>
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-ink-muted" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-24 h-12 rounded-full bg-surface-input text-ink-primary placeholder-ink-hint border-[0.5px] border-border-default focus:outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 shadow-none text-sm"
            placeholder="Ketik nama game atau voucher..."
            value={search}
            onChange={(e) => setSearch && setSearch(e.target.value)}
          />
          <div className="absolute inset-y-1.5 right-1.5 flex items-center">
            <button className="bg-brand-navy text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-brand-navy-dark transition-colors h-9 shadow-none cursor-pointer">
              Cari
            </button>
          </div>
        </div>
      </div>

      {isLoading && !games ? (
        // Loading state
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border-[0.5px] border-border-default rounded-xl p-5 space-y-4">
              <Skeleton className="w-full aspect-square rounded-xl bg-surface-subtle" />
              <Skeleton className="w-3/4 h-4 rounded bg-surface-subtle" />
              <Skeleton className="w-1/2 h-3 rounded bg-surface-subtle" />
            </div>
          ))}
        </div>
      ) : filteredGames.length === 0 ? (
        // Empty state
        <div className="text-center py-16 bg-white border-[0.5px] border-border-default rounded-xl">
          <Gamepad2 className="mx-auto text-ink-hint mb-3" size={36} />
          <p className="text-sm font-medium text-ink-primary">Game tidak ditemukan</p>
          <p className="text-xs text-ink-muted mt-1">Coba kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        // Grid
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredGames.map((game) => {
            const meta = gameMetadata[game.slug] || { publisher: 'Publisher', color: '#1E3A8A', isFeatured: false };

            return (
              <Link
                key={game.id}
                href={`/games/${game.slug}`}
                className="group bg-white hover:bg-brand-navy-light/40 border-[0.5px] border-border-default rounded-xl p-5 flex flex-col items-center text-center transition-all duration-200 shadow-none hover:border-brand-navy"
              >
                {/* Square Image Container */}
                <div className="w-full aspect-square bg-surface-subtle rounded-xl mb-4 flex items-center justify-center border-[0.5px] border-border-default relative overflow-hidden">
                  {game.thumbnail_url ? (
                     <img src={game.thumbnail_url} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                     <span className="text-xs font-semibold text-ink-hint">IMG</span>
                  )}
                </div>

                {/* Content */}
                <h4 className="text-sm font-medium text-ink-primary mb-2 group-hover:text-brand-navy transition-colors">
                  {game.name}
                </h4>
                
                <div className="flex items-center gap-1.5 mt-auto">
                  <div className="flex items-center text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span className="text-[10px] font-bold ml-0.5 text-ink-secondary">5.0</span>
                  </div>
                  <span className="text-[10px] text-ink-hint">&bull;</span>
                  <span className="text-[10px] text-ink-muted">Mulai {meta.publisher === 'Moonton' ? 'Rp 1.500' : 'Rp 10.000'}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default GameGrid;
