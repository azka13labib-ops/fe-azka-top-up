'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn, formatRupiah } from '@/lib/utils';
import { Product } from '@/types';

interface PaymentMethod {
  id: string;
  label: string;
  fee: number;
  category: string;
  logoUrl: string;
}

interface StepPaymentMethodProps {
  selectedProduct: Product | null;
  selectedPaymentId: string | null;
  onSelectPayment: (paymentId: string) => void;
}

export const StepPaymentMethod: React.FC<StepPaymentMethodProps> = ({
  selectedProduct,
  selectedPaymentId,
  onSelectPayment,
}) => {
  const paymentMethods: PaymentMethod[] = [
    { id: 'qris', label: 'QRIS', fee: 0, category: 'ewallet', logoUrl: 'https://placehold.co/100x40/ffffff/000000/png?text=QRIS' },
    { id: 'bca_va', label: 'BCA Virtual Account', fee: 0, category: 'va', logoUrl: 'https://placehold.co/100x40/ffffff/000000/png?text=BCA' },
    { id: 'dana', label: 'Dana', fee: 50, category: 'ewallet', logoUrl: 'https://placehold.co/100x40/ffffff/000000/png?text=DANA' },
    { id: 'gopay', label: 'GoPay', fee: 50, category: 'ewallet', logoUrl: 'https://placehold.co/100x40/ffffff/000000/png?text=GoPay' },
  ];

  return (
    <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-6 space-y-4 shadow-none">
      {/* Header */}
      <div className="flex items-center">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-medium mr-2 shrink-0">
          3
        </span>
        <h3 className="text-base font-medium text-ink-primary">
          Payment Method
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedPaymentId === method.id;
          const basePrice = selectedProduct ? selectedProduct.selling_price : 0;
          const totalPrice = basePrice > 0 ? basePrice + method.fee : null;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelectPayment(method.id)}
              className={cn(
                'rounded-xl p-4 cursor-pointer text-left transition-all duration-150 relative flex flex-col justify-between min-h-[80px] w-full outline-none',
                isSelected
                  ? 'border-[1.5px] border-brand-navy bg-brand-navy-light text-brand-navy'
                  : 'border-[0.5px] border-border-default bg-surface-card hover:bg-surface-subtle'
              )}
            >
              <div className="flex items-center justify-between w-full mb-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={method.logoUrl} alt={method.label} className="h-8 object-contain object-left max-w-[80px]" />
                {isSelected && (
                  <CheckCircle size={18} className="text-brand-navy shrink-0" />
                )}
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'text-sm font-semibold transition-colors',
                  isSelected ? 'text-brand-navy' : 'text-ink-primary'
                )}>
                  {method.label}
                </span>
                <span className={cn(
                  'text-[11px] mt-0.5 font-mono',
                  isSelected ? 'text-brand-navy font-medium' : 'text-ink-muted'
                )}>
                  {totalPrice !== null ? formatRupiah(totalPrice) : `Biaya admin: +${formatRupiah(method.fee)}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepPaymentMethod;
