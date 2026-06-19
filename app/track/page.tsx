'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardList, Search, ArrowRight, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

export default function TrackOrderPage() {
  const [orderCode, setOrderCode] = useState('');
  const [recentOrders, setRecentOrders] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  // Load recently created orders from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const orders = localStorage.getItem('azka_recent_orders');
      if (orders) {
        try {
          setRecentOrders(JSON.parse(orders));
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCode.trim()) {
      toast('Silakan masukkan Kode Pesanan Anda.', 'warning');
      return;
    }

    const formattedCode = orderCode.trim().toUpperCase();
    router.push(`/orders/${formattedCode}`);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 flex flex-col justify-center min-h-[70vh]">
      
      {/* Title block with larger decorative icon */}
      <div className="text-center mb-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-navy/5 rounded-full blur-2xl -z-10"></div>
        <div className="w-20 h-20 rounded-2xl bg-white/50 backdrop-blur-xl border border-white shadow-xl text-brand-navy flex items-center justify-center mx-auto mb-6 transform rotate-3">
          <ClipboardList size={40} className="-rotate-3" />
        </div>
        <h2 className="text-2xl font-bold text-ink-primary">
          Lacak Pesanan Anda
        </h2>
        <p className="text-sm text-ink-muted mt-2 mx-auto leading-normal">
          Masukkan Kode Pesanan (contoh: AZKA-20260612-12345) untuk melihat status pembayaran dan pengiriman item game Anda.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleTrack} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
            placeholder="KODE PESANAN: AZKA-XXXXXX"
            className="w-full bg-surface-card/60 backdrop-blur-md border border-border-default/50 rounded-xl h-14 pl-12 pr-4 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-brand-navy focus:bg-white transition-all duration-300 uppercase shadow-sm"
          />
          <Search className="absolute left-4 top-4 h-6 w-6 text-ink-hint shrink-0" />
        </div>

        <Button type="submit" variant="primary" full className="h-14 text-sm font-bold shadow-lg shadow-brand-navy/20 hover:shadow-brand-navy/40 transition-all duration-300">
          <span>Lacak Sekarang</span>
          <ArrowRight size={18} className="ml-2" />
        </Button>
      </form>

      {/* Recent Orders Local List */}
      {recentOrders.length > 0 && (
        <div className="mt-12">
          <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock size={14} className="text-brand-navy" />
            Pencarian Terakhir
          </h4>
          <ul className="space-y-3">
            {recentOrders.map((code) => (
              <li key={code}>
                <button
                  onClick={() => router.push(`/orders/${code}`)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/50 bg-white/40 backdrop-blur-md shadow-sm hover:bg-white hover:shadow-md hover:-translate-y-0.5 text-left transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-ink-muted mb-1">ID Transaksi</span>
                    <span className="text-sm text-ink-primary font-bold font-mono tracking-tight">{code}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
