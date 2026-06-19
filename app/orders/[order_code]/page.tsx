'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useOrderStatus } from '@/hooks/useOrderStatus';
import { StatusHeader } from '@/components/orders/StatusHeader';
import { StatusTracker } from '@/components/orders/StatusTracker';
import { CountdownTimer } from '@/components/orders/CountdownTimer';
import { SerialNumberBox } from '@/components/orders/SerialNumberBox';
import { ReceiptCard } from '@/components/orders/ReceiptCard';
import { OrderDetailTable } from '@/components/orders/OrderDetailTable';
import { OrderTimeline } from '@/components/orders/OrderTimeline';
import { FailedActions } from '@/components/orders/FailedActions';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { RefreshCw, CreditCard, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface OrderStatusPageProps {
  params: Promise<{ order_code: string }>;
} 

export default function OrderStatusPage({ params }: OrderStatusPageProps) {
  const { order_code } = use(params);
  const router = useRouter();
  const { toast } = useToast();

  const { order, isLoading, error, refresh } = useOrderStatus(order_code);

  const handlePayNow = () => {
    if (order?.midtrans_snap_token && (window as any).snap) {
      (window as any).snap.pay(order.midtrans_snap_token, {
        onSuccess: () => refresh(),
        onPending: () => refresh(),
        onError: () => refresh(),
        onClose: () => refresh(),
      });
    } else {
      toast('Token pembayaran tidak ditemukan. Silakan hubungi CS.', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-6">
        <Skeleton className="h-44 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h3 className="text-lg font-medium text-ink-primary">Pesanan Tidak Ditemukan</h3>
        <p className="text-sm text-ink-muted mt-2">
          Kami tidak dapat menemukan pesanan dengan kode &quot;{order_code}&quot;.
        </p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-navy-dark transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const isCompleted = order.topup_status === 'completed';
  const isPendingPayment = order.payment_status === 'pending';
  const isProcessing = order.topup_status === 'processing' || (order.payment_status === 'paid' && order.topup_status === 'pending');
  const isFailed = order.topup_status === 'failed' || order.payment_status === 'expired' || order.payment_status === 'failed' || order.payment_status === 'cancelled';

  // Set tracker status token
  let trackerStatus: 'waiting_payment' | 'processing' | 'completed' | 'failed' | 'expired' | 'cancelled' = 'processing';
  if (isPendingPayment) trackerStatus = 'waiting_payment';
  else if (order.payment_status === 'expired') trackerStatus = 'expired';
  else if (order.payment_status === 'cancelled') trackerStatus = 'cancelled';
  else if (isCompleted) trackerStatus = 'completed';
  else if (isFailed) trackerStatus = 'failed';

  return (
    <>
      {/* Midtrans Snap JS SDK */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="max-w-2xl mx-auto px-6 py-12 space-y-4">
        
        {/* Status Title & Banner */}
        <StatusHeader topupStatus={order.topup_status} paymentStatus={order.payment_status} />

        {/* 1. Completed State */}
        {isCompleted && (
          <>
            {order.digiflazz_sn && <SerialNumberBox sn={order.digiflazz_sn} />}
            <ReceiptCard order={order} />
          </>
        )}

        {/* 2. Pending Payment State */}
        {isPendingPayment && (
          <>
            <CountdownTimer expiresAt={order.expires_at} />
            <StatusTracker currentStatus="waiting_payment" />
            
            {/* Pay Button container */}
            <div className="bg-surface-card border border-border-default rounded-xl p-5 mb-4 flex flex-col items-center gap-3">
              <p className="text-xs text-ink-muted text-center leading-normal">
                Belum menyelesaikan pembayaran? Buka kembali portal pembayaran Midtrans Snap di bawah ini.
              </p>
              <Button
                onClick={handlePayNow}
                variant="primary"
                full
                icon={<CreditCard size={16} />}
              >
                Bayar Sekarang
              </Button>
            </div>
          </>
        )}

        {/* 3. Processing State */}
        {isProcessing && (
          <>
            <StatusTracker currentStatus="processing" />
            <div className="bg-brand-navy-light border border-border-default rounded-xl p-4 mb-4 text-center">
              <p className="text-xs text-brand-navy font-medium flex items-center justify-center gap-2">
                <RefreshCw size={14} className="animate-spin" />
                Sistem sedang memproses item game Anda secara otomatis.
              </p>
            </div>
          </>
        )}

        {/* 4. Failed State */}
        {isFailed && !isCompleted && (
          <>
            <StatusTracker currentStatus={trackerStatus} />
            <FailedActions order={order} />
          </>
        )}

        {/* Order Details Table */}
        <OrderDetailTable order={order} />

        {/* Timeline Logs */}
        <OrderTimeline logs={order.logs} />

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-default">
          <Button
            onClick={() => router.push('/')}
            variant="primary"
            full
            icon={<RefreshCw size={16} />}
          >
            Top Up Lagi
          </Button>
          <Button
            onClick={() => window.print()}
            variant="outline"
            full
          >
            Cetak Invoice
          </Button>
        </div>

      </div>
    </>
  );
}
