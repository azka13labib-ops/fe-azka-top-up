'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { Game, Product } from '@/types';

interface OrderSummaryCardProps {
  game: Game;
  selectedProduct: Product | null;
  userId: string;
  zoneId: string;
  paymentLabel: string | null;
  adminFee: number;
  discount: number;
  total: number;
  isSubmitting: boolean;
  onOrder: () => void;
  nickname?: string | null;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  game,
  selectedProduct,
  userId,
  zoneId,
  paymentLabel,
  adminFee,
  discount,
  total,
  isSubmitting,
  onOrder,
  nickname,
}) => {
  const detailRows = [
    { label: 'Game', value: game.name },
    { label: 'Item', value: selectedProduct ? selectedProduct.name : '—' },
    {
      label: 'User ID',
      value: userId ? `${userId}${zoneId ? ` (${zoneId})` : ''}` : '—',
    },
    ...(nickname ? [{ label: 'Nickname', value: nickname }] : []),
    { label: 'Payment', value: paymentLabel || '—' },
  ];

  const badges = [
    'SSL Terenkripsi',
    'Pembayaran Aman',
    'Midtrans Certified',
    'Proses Otomatis',
  ];

  return (
    <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-5 flex flex-col justify-between h-fit lg:sticky lg:top-24 shadow-none">
      <div>
        {/* Title */}
        <h3 className="text-base font-medium text-ink-primary border-b-[0.5px] border-border-default pb-4 mb-4">
          Order Summary
        </h3>

        {/* Detail Rows */}
        <div className="space-y-2.5">
          {detailRows.map((row) => (
            <div key={row.label} className="flex justify-between py-1 items-center">
              <span className="text-xs text-ink-muted">{row.label}</span>
              <span className="text-xs font-medium text-ink-primary truncate max-w-[150px]">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="border-t-[0.5px] border-border-default mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Price</span>
            <span className="font-mono">
              {selectedProduct ? formatRupiah(selectedProduct.selling_price) : formatRupiah(0)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-muted">
            <span>Admin Fee</span>
            <span className="font-mono">{formatRupiah(adminFee)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs items-center">
              <span className="text-ink-muted">Diskon</span>
              <span className="text-status-success font-medium font-mono">
                -{formatRupiah(discount)}
              </span>
            </div>
          )}
        </div>

        {/* Total Payment */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t-[0.5px] border-border-default">
          <span className="text-sm font-medium text-ink-primary">
            Total Payment
          </span>
          <span className="text-base font-medium text-brand-navy font-mono">
            {formatRupiah(total)}
          </span>
        </div>

        {/* Security Badges */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t-[0.5px] border-border-default">
          {badges.map((b) => (
            <div key={b} className="flex items-center gap-1 text-[10px] text-ink-muted leading-tight">
              <ShieldCheck size={12} className="text-status-success shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-5">
        <button
          type="button"
          disabled={isSubmitting || !selectedProduct || !userId || !paymentLabel}
          onClick={onOrder}
          className="w-full bg-brand-navy text-white rounded-xl h-12 text-sm font-semibold hover:bg-brand-navy-dark transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-none"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            'Order Now'
          )}
        </button>
        <p className="text-[10px] text-ink-hint text-center mt-2 leading-normal">
          By placing this order, you agree to our Terms of Service.
        </p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
