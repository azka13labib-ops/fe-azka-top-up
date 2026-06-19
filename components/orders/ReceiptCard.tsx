'use client';

import React from 'react';
import { CheckCircle, Download, Send, AlertTriangle } from 'lucide-react';
import { formatRupiah, formatDate } from '@/lib/utils';
import { Order } from '@/types';

interface ReceiptCardProps {
  order: Order;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ order }) => {
  const isCompleted = order.topup_status === 'completed';

  const handleShareWa = () => {
    const text = `Halo, saya telah berhasil melakukan top-up ${order.product_name} untuk game ${order.game_name} di AZKA TOP UP dengan SN: ${order.digiflazz_sn || '—'}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="mb-6">
      {/* Top Banner Card (Navy background) */}
      <div className="bg-brand-navy rounded-t-xl p-6 text-center text-white">
        <div className="text-sm font-medium opacity-80 mb-2">
          AZKA TOP UP
        </div>
        
        <div className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs px-3 py-1 rounded-full mb-3">
          {isCompleted ? (
            <>
              <CheckCircle size={12} />
              <span>Top-up Berhasil</span>
            </>
          ) : (
            <>
              <AlertTriangle size={12} className="text-status-warning" />
              <span>Transaksi {order.topup_status.toUpperCase()}</span>
            </>
          )}
        </div>

        <div className="text-3xl font-medium tracking-tight font-mono">
          {formatRupiah(order.selling_price)}
        </div>

        <div className="text-sm opacity-75 mt-1 leading-normal">
          {order.game_name}: {order.customer_no} {order.zone_id ? `(${order.zone_id})` : ''} &bull; {order.product_name}
        </div>
      </div>

      {/* Bottom info section (White container) */}
      <div className="bg-surface-card border border-border-default border-t-0 rounded-b-xl px-5 py-4 space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-ink-muted">Metode Pembayaran</span>
          <span className="text-ink-primary font-medium uppercase font-mono">
            {order.payment_method || 'MIDTRANS'}
          </span>
        </div>
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-ink-muted">Waktu Transaksi</span>
          <span className="text-ink-primary font-medium">
            {formatDate(order.paid_at || order.completed_at)}
          </span>
        </div>
      </div>

      {/* Share / Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-3 w-full">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-surface-card border border-border-default rounded-xl h-11 text-xs sm:text-sm text-ink-secondary hover:border-border-strong transition-colors duration-150 cursor-pointer"
        >
          <Download size={14} />
          <span>Unduh Bukti</span>
        </button>
        <button
          onClick={handleShareWa}
          className="flex-1 flex items-center justify-center gap-2 bg-wa text-white rounded-xl h-11 text-xs sm:text-sm font-medium hover:bg-[#1FB855] transition-colors duration-150 cursor-pointer"
        >
          <Send size={14} className="rotate-45 -mt-0.5" />
          <span>Bagikan ke WA</span>
        </button>
      </div>
    </div>
  );
};

export default ReceiptCard;
