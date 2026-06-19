'use client';

import React, { useState } from 'react';
import { Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface VoucherInputProps {
  onApplyDiscount: (amount: number, code: string | null) => void;
}

export const VoucherInput: React.FC<VoucherInputProps> = ({ onApplyDiscount }) => {
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    setError(null);
    if (!code.trim()) return;

    const formattedCode = code.trim().toUpperCase();

    // Check if code is valid (mock check)
    if (formattedCode === 'AZKA10OFF') {
      setAppliedCode(formattedCode);
      onApplyDiscount(2500, formattedCode);
    } else if (formattedCode === 'PROMO') {
      setAppliedCode(formattedCode);
      onApplyDiscount(1000, formattedCode);
    } else {
      setError('Kode voucher tidak valid atau sudah kadaluarsa.');
      setAppliedCode(null);
      onApplyDiscount(0, null);
    }
  };

  const handleRemove = () => {
    setCode('');
    setAppliedCode(null);
    setError(null);
    onApplyDiscount(0, null);
  };

  return (
    <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-5 space-y-3 shadow-none">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Tag size={16} className="text-accent-amber fill-accent-amber" />
        <div>
          <h4 className="text-sm font-medium text-ink-primary">
            Kode Voucher / Promo
          </h4>
          <p className="text-xs text-ink-muted">
            Punya kode promo? Masukkan di sini untuk mendapat diskon.
          </p>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={appliedCode !== null}
          placeholder="Contoh: AZKA10OFF"
          className="flex-1 bg-surface-input border-[0.5px] border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 disabled:opacity-70 shadow-none"
        />
        {appliedCode ? (
          <button
            type="button"
            onClick={handleRemove}
            className="bg-status-error text-white rounded-lg px-5 h-11 text-sm font-medium hover:bg-red-700 transition-colors duration-150 cursor-pointer shadow-none"
          >
            Hapus
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            className="bg-brand-navy text-white rounded-lg px-5 h-11 text-sm font-medium hover:bg-brand-navy-dark transition-colors duration-150 cursor-pointer shadow-none"
          >
            Pakai
          </button>
        )}
      </div>

      {/* Success Alert */}
      {appliedCode && (
        <div className="flex items-center gap-2 bg-status-success-bg border-[0.5px] border-status-success-border rounded-lg px-4 py-3 mt-2 animate-fade-in shadow-none">
          <CheckCircle size={14} className="text-status-success shrink-0" />
          <span className="text-xs text-status-success font-medium">
            Voucher {appliedCode} aktif — Diskon {appliedCode === 'AZKA10OFF' ? 'Rp 2.500' : 'Rp 1.000'} diterapkan!
          </span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 bg-status-error-bg border-[0.5px] border-status-error-border rounded-lg px-4 py-3 mt-2 animate-fade-in shadow-none">
          <AlertCircle size={14} className="text-status-error shrink-0" />
          <span className="text-xs text-status-error font-medium">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default VoucherInput;
