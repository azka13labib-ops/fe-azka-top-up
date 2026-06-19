'use client';

import React, { useState } from 'react';

interface SerialNumberBoxProps {
  sn: string;
}

export const SerialNumberBox: React.FC<SerialNumberBoxProps> = ({ sn }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!sn) return;
    navigator.clipboard.writeText(sn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-status-success-bg border border-status-success-border rounded-xl p-4 mb-4">
      <div className="text-xs font-medium text-status-success uppercase tracking-wider mb-2">
        SERIAL NUMBER / SN
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm sm:text-base font-medium text-status-success font-mono tracking-wide select-all break-all">
          {sn}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs font-medium text-status-success border border-status-success-border rounded-md px-3 py-1.5 bg-white hover:bg-status-success-bg transition-colors duration-150 shrink-0 cursor-pointer"
        >
          {copied ? 'Tersalin!' : 'Salin'}
        </button>
      </div>

      <p className="text-xs text-status-success/70 mt-2">
        Simpan kode ini sebagai bukti transaksi top-up berhasil.
      </p>
    </div>
  );
};

export default SerialNumberBox;
