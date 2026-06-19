'use client';

import React from 'react';
import { Product } from '@/types';
import { cn, formatRupiah } from '@/lib/utils';

interface StepSelectAmountProps {
  products: Product[];
  selectedProductId: number | null;
  onSelectProduct: (productId: number) => void;
  isLoading?: boolean;
}

export const StepSelectAmount: React.FC<StepSelectAmountProps> = ({
  products,
  selectedProductId,
  onSelectProduct,
  isLoading = false,
}) => {
  // Mock products in case backend lists are loading or empty
  const fallbackProducts: Product[] = [
    { id: 1, game_id: 1, name: '5 Diamonds', selling_price: 1500, is_active: true, digiflazz_sku: 'ml5' },
    { id: 2, game_id: 1, name: '11 Diamonds', selling_price: 3000, is_active: true, digiflazz_sku: 'ml11' },
    { id: 3, game_id: 1, name: '17 Diamonds', selling_price: 4500, is_active: true, digiflazz_sku: 'ml17' },
    { id: 4, game_id: 1, name: '25 Diamonds', selling_price: 6800, is_active: true, digiflazz_sku: 'ml25' },
    { id: 5, game_id: 1, name: '40 Diamonds', selling_price: 10500, is_active: true, digiflazz_sku: 'ml40' },
    { id: 6, game_id: 1, name: '86 Diamonds', selling_price: 22000, is_active: true, digiflazz_sku: 'ml86' },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Let's mark some products as promo (e.g. index 3 and 5) for rich visual UI
  const isPromoMock = (id: number) => {
    return id === 1 || id === 6; // MLBB 5 diamonds and 86 diamonds
  };

  return (
    <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-6 space-y-4 shadow-none">
      {/* Header */}
      <div className="flex items-center">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-medium mr-2 shrink-0">
          2
        </span>
        <h3 className="text-base font-medium text-ink-primary">
          Select Top-Up Amount
        </h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-surface-subtle animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {displayProducts.map((product) => {
            const isSelected = selectedProductId === product.id;
            const isPromo = isPromoMock(product.id);

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product.id)}
                className={cn(
                  'rounded-xl p-4 cursor-pointer transition-all duration-150 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[96px] outline-none',
                  isSelected
                    ? 'border-[1.5px] border-brand-navy bg-brand-navy-light text-brand-navy'
                    : 'border-[0.5px] border-border-default bg-surface-card hover:bg-surface-subtle'
                )}
              >
                {/* Promo label banner */}
                {isPromo && (
                  <span className="absolute top-0 left-0 bg-accent-amber text-white text-[9px] font-medium px-2 py-0.5 rounded-br-lg">
                    PROMO
                  </span>
                )}

                {/* Icon indicator */}
                <div className="text-xl mb-1 select-none">💎</div>

                {/* Product name */}
                <span
                  className={cn(
                    'text-sm font-medium transition-colors',
                    isSelected ? 'text-brand-navy font-semibold' : 'text-ink-primary'
                  )}
                >
                  {product.name}
                </span>

                {/* Price */}
                <span className={cn(
                  'text-xs mt-0.5 font-mono',
                  isSelected ? 'text-brand-navy font-medium' : 'text-ink-muted'
                )}>
                  {formatRupiah(product.selling_price)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StepSelectAmount;
