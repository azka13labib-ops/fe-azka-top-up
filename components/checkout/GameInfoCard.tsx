import React from 'react';
import { Game } from '@/types';
import { Gamepad2 } from 'lucide-react';

interface GameInfoCardProps {
  game: Game;
}

export const GameInfoCard: React.FC<GameInfoCardProps> = ({ game }) => {
  // Map slugs to background colors for aesthetic visual banners
  const bannerColors: Record<string, string> = {
    'mobile-legends': '#1a1a2e',
    'free-fire': '#FF6B35',
    'genshin-impact': '#1a1635',
    'pubg-mobile': '#2B5FB3',
    'valorant': '#E8372A',
    'call-of-duty': '#2C2C2C',
  };

  const bgColor = bannerColors[game.slug] || '#1E3A8A';

  // Fallback thumbnails matching the game grid
  const fallbackThumbnails: Record<string, string> = {
    'mobile-legends': 'https://placehold.co/400x600/1a1a2e/ffffff/png?text=Mobile+Legends',
    'free-fire': 'https://placehold.co/400x600/FF6B35/ffffff/png?text=Free+Fire',
    'genshin-impact': 'https://placehold.co/400x600/1a1635/ffffff/png?text=Genshin+Impact',
    'pubg-mobile': 'https://placehold.co/400x600/2B5FB3/ffffff/png?text=PUBG+Mobile',
    'valorant': 'https://placehold.co/400x600/E8372A/ffffff/png?text=Valorant',
    'call-of-duty': 'https://placehold.co/400x600/2C2C2C/ffffff/png?text=Call+of+Duty',
  };

  const finalThumbnail = game.thumbnail_url || fallbackThumbnails[game.slug];

  return (
    <div className="text-left lg:pr-6">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0 select-none overflow-hidden shadow-sm border border-border-default/50"
          style={{ backgroundColor: bgColor }}
        >
          {finalThumbnail ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={finalThumbnail}
              alt={game.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Gamepad2 size={32} />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-ink-primary">
          {game.name} Top-up
        </h2>
      </div>

      <div className="text-sm text-ink-secondary leading-relaxed space-y-4">
        <p>AZKA TOP UP menawarkan top up {game.name} yang mudah, aman, dan instan.</p>
        
        {game.description && (
          <div dangerouslySetInnerHTML={{ __html: game.description }} />
        )}
        
        <p>Cukup masukkan player ID Anda, pilih jumlah item yang ingin Anda beli, selesaikan pembayaran, dan pesanan akan segera diproses ke akun {game.name} Anda.</p>
      </div>
    </div>
  );
};

export default GameInfoCard;
