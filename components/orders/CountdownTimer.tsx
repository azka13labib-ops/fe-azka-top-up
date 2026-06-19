'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  expiresAt: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt }) => {
  const { minutes, seconds, isExpired } = useCountdown(expiresAt);

  if (isExpired) {
    return (
      <div className="bg-status-error-bg border border-status-error-border rounded-xl p-4 mb-4 flex items-center gap-3">
        <Clock className="text-status-error shrink-0" size={18} />
        <div>
          <h4 className="text-sm font-medium text-status-error">
            Waktu Pembayaran Habis
          </h4>
          <p className="text-xs text-status-error/85">
            Batas waktu pembayaran untuk transaksi ini telah kadaluarsa.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-status-warning-bg border border-status-warning-border rounded-xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Clock className="text-status-warning shrink-0" size={18} />
        <div>
          <h4 className="text-sm font-medium text-status-warning">
            Selesaikan Pembayaran
          </h4>
          <p className="text-xs text-status-warning/85">
            Bayar sebelum batas waktu berakhir untuk menghindari pembatalan.
          </p>
        </div>
      </div>

      {/* Countdown Digits */}
      <div className="flex items-center gap-1 self-start sm:self-center">
        <span className="bg-white rounded-md border border-status-warning-border px-3 py-1.5 text-status-warning font-semibold text-sm tabular-nums shadow-none">
          {minutes}
        </span>
        <span className="text-status-warning font-bold">:</span>
        <span className="bg-white rounded-md border border-status-warning-border px-3 py-1.5 text-status-warning font-semibold text-sm tabular-nums shadow-none">
          {seconds}
        </span>
      </div>
    </div>
  );
};

export default CountdownTimer;
