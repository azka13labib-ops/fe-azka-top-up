'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Order } from '@/types';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { OrdersTable } from '@/components/admin/OrdersTable';
import { OrderDetailPanel } from '@/components/admin/OrderDetailPanel';
import { Skeleton } from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/Toast';
import { Search } from 'lucide-react';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

function AdminOrdersContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Filter States
  const [paymentStatus, setPaymentStatus] = useState('');
  const [topupStatus, setTopupStatus] = useState('');
  const [searchCode, setSearchCode] = useState('');

  // Selected Order for detail view
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Guard
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  // Fetch orders
  const { data: ordersData, isLoading, mutate } = useSWR(
    user && user.role === 'admin'
      ? `/admin/orders?payment_status=${paymentStatus}&topup_status=${topupStatus}`
      : null,
    fetcher
  );

  const ordersList: Order[] = ordersData?.data || (Array.isArray(ordersData) ? ordersData : []);

  // Sync selected order detailed values when list updates
  useEffect(() => {
    if (selectedOrder) {
      const updated = ordersList.find((o) => o.id === selectedOrder.id);
      if (updated) {
        setSelectedOrder(updated);
      }
    }
  }, [ordersList, selectedOrder]);

  // Auto-open order from search params (e.g. from dashboard click)
  useEffect(() => {
    const code = searchParams.get('code');
    if (code && ordersList.length > 0) {
      const match = ordersList.find((o) => o.order_code === code);
      if (match) {
        setSelectedOrder(match);
      }
    }
  }, [searchParams, ordersList]);

  const handleRetry = async (orderId: number) => {
    setActionLoading(true);
    try {
      await api.post(`/admin/orders/${orderId}/retry`);
      toast('Top-up retry berhasil dikirim ke antrean!', 'success');
      mutate();
    } catch (err: any) {
      toast(err.message || 'Gagal melakukan retry top-up.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRefund = async (orderId: number) => {
    const notes = prompt('Masukkan catatan refund (wajib):');
    if (notes === null) return; // cancelled prompt
    
    if (!notes.trim()) {
      toast('Catatan refund wajib diisi.', 'warning');
      return;
    }

    setActionLoading(true);
    try {
      await api.post(`/admin/orders/${orderId}/flag-refund`, { refund_notes: notes });
      toast('Pesanan berhasil ditandai untuk refund!', 'success');
      mutate();
    } catch (err: any) {
      toast(err.message || 'Gagal menandai refund.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-page">
        <Skeleton className="w-1/3 h-20" />
      </div>
    );
  }

  // Filter orders by search code client-side
  const filteredOrders = ordersList.filter((o) =>
    o.order_code.toLowerCase().includes(searchCode.toLowerCase())
  );

  return (
    <div className="flex bg-surface-page min-h-screen text-ink-secondary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-xl font-medium text-ink-primary">
            Daftar Pesanan & Transaksi
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Pantau seluruh transaksi, lihat logs detail kesalahan API Digiflazz, dan jalankan retry atau flag refund manual.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface-card border border-border-default rounded-xl p-4">
          {/* Search ID */}
          <div className="relative">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Cari Kode Transaksi..."
              className="w-full bg-surface-input border border-border-default rounded-lg h-9 pl-9 pr-3 text-xs text-ink-primary placeholder:text-ink-hint outline-none focus:border-brand-navy"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-hint shrink-0" />
          </div>

          {/* Payment Status Filter */}
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="bg-surface-input border border-border-default rounded-lg h-9 px-3 text-xs text-ink-primary outline-none focus:border-brand-navy"
          >
            <option value="">Semua Status Bayar</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="expired">Expired</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Topup Status Filter */}
          <select
            value={topupStatus}
            onChange={(e) => setTopupStatus(e.target.value)}
            className="bg-surface-input border border-border-default rounded-lg h-9 px-3 text-xs text-ink-primary outline-none focus:border-brand-navy"
          >
            <option value="">Semua Status Top-up</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Table container */}
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center p-12 bg-surface-card border border-border-default rounded-xl text-ink-muted text-xs">
            Tidak ada transaksi ditemukan.
          </div>
        ) : (
          <OrdersTable
            orders={filteredOrders}
            onViewDetail={(order) => setSelectedOrder(order)}
          />
        )}

        {/* Detail Modal Overlay */}
        {selectedOrder && (
          <OrderDetailPanel
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onRetry={handleRetry}
            onRefund={handleRefund}
            isActionLoading={actionLoading}
          />
        )}
      </main>
    </div>
  );
}

export default function AdminOrdersPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-surface-page"><Skeleton className="w-1/3 h-20" /></div>}>
      <AdminOrdersContent />
    </Suspense>
  );
}
