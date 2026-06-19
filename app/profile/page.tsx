'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Order } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { User, ClipboardList, LogOut, Gamepad2 } from 'lucide-react';
import { formatRupiah, formatDate } from '@/lib/utils';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch past orders list
  const { data: orders = [], isLoading: ordersLoading } = useSWR<Order[]>(
    user ? '/profile/orders' : null,
    fetcher
  );

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        <Skeleton className="h-44 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    );
  }

  // Map backend status to UI badges
  const getBadgeVariant = (order: Order) => {
    if (order.topup_status === 'completed') return 'completed';
    if (order.topup_status === 'failed') return 'failed';
    if (order.payment_status === 'pending') return 'pending';
    if (order.payment_status === 'expired') return 'expired';
    return 'processing';
  };

  const getStatusLabel = (order: Order) => {
    if (order.topup_status === 'completed') return 'Berhasil';
    if (order.topup_status === 'failed') return 'Gagal';
    if (order.payment_status === 'pending') return 'Menunggu Bayar';
    if (order.payment_status === 'expired') return 'Kadaluarsa';
    return 'Diproses';
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      
      {/* Profile Header */}
      <div className="bg-surface-card border border-border-default rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-navy-light text-brand-navy flex items-center justify-center shrink-0">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-ink-primary">
              {user?.name}
            </h2>
            <p className="text-xs text-ink-muted">
              {user?.email} &bull; Customer
            </p>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          icon={<LogOut size={14} />}
          className="shrink-0"
        >
          Keluar
        </Button>
      </div>

      {/* Transaction History Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink-primary uppercase tracking-wider flex items-center gap-1.5">
          <ClipboardList size={16} className="text-brand-navy" />
          Riwayat Transaksi Saya
        </h3>

        {ordersLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            title="Belum Ada Transaksi"
            description="Anda belum memiliki riwayat pembelian top-up game. Silakan lakukan pesanan sekarang."
            icon={<Gamepad2 size={24} />}
            action={
              <Button onClick={() => router.push('/')} variant="primary">
                Pesan Sekarang
              </Button>
            }
          />
        ) : (
          <div className="bg-surface-card border border-border-default rounded-xl overflow-hidden divide-y divide-border-default">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/orders/${order.order_code}`)}
                className="p-4 hover:bg-surface-subtle transition-colors duration-150 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Product/Game name */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-ink-primary">
                      {order.product_name}
                    </span>
                    <span className="text-xs text-ink-muted">&bull;</span>
                    <span className="text-xs text-ink-muted">
                      {order.game_name}
                    </span>
                  </div>
                  <span className="text-[11px] text-ink-hint font-mono block mt-1">
                    {order.order_code} &bull; {formatDate(order.created_at)}
                  </span>
                </div>

                {/* Status and price */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-medium text-ink-primary font-mono block">
                      {formatRupiah(order.selling_price)}
                    </span>
                    <span className="text-xs text-ink-muted block mt-0.5">
                      ID: {order.customer_no}
                    </span>
                  </div>

                  <Badge variant={getBadgeVariant(order)}>
                    {getStatusLabel(order)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
