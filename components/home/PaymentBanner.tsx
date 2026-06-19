'use client';

import React from 'react';

export const PaymentBanner: React.FC = () => {
  return (
    <section className="w-full bg-surface-page border-t-[0.5px] border-border-default py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-[10px] font-bold text-ink-muted uppercase tracking-widest mb-6">
          MENDUKUNG METODE PEMBAYARAN
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-brand-navy font-bold text-lg">QRIS</span>
          <span className="text-brand-navy font-bold text-lg">OVO</span>
          <span className="text-brand-navy font-bold text-lg">DANA</span>
          <span className="text-brand-navy font-bold text-lg">GoPay</span>
          <span className="text-brand-navy font-bold text-lg">ShopeePay</span>
          <span className="text-brand-navy font-bold text-lg">LinkAja</span>
          <span className="text-brand-navy font-bold text-lg">BCA</span>
          <span className="text-brand-navy font-bold text-lg">Mandiri</span>
          <span className="text-brand-navy font-bold text-lg">BRI</span>
          <span className="text-brand-navy font-bold text-lg">BNI</span>
        </div>
      </div>
    </section>
  );
};

export default PaymentBanner;
