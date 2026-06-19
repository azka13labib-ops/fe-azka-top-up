'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Order } from '@/types';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { StatsCard } from '@/components/admin/StatsCard';
import { OrdersTable } from '@/components/admin/OrdersTable';
import { Skeleton } from '@/components/ui/Skeleton';
import { DollarSign, Wallet, Percent, ClipboardList } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { DashboardCharts } from '@/components/admin/DashboardCharts';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Guard: Redirect if not logged in or not admin
  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/admin/login');
      }
    }
  }, [user, authLoading, router]);

  // Fetch orders
  const { data: ordersData, isLoading: ordersLoading } = useSWR(
    user && user.role === 'admin' ? '/admin/orders' : null,
    fetcher
  );

  // Fetch Digiflazz balance
  const { data: balanceData, isLoading: balanceLoading } = useSWR(
    user && user.role === 'admin' ? '/admin/balance' : null,
    fetcher
  );

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-page">
        <Skeleton className="w-1/3 h-20" />
      </div>
    );
  }

  // Extract orders list from paginated format
  const ordersList: Order[] = ordersData?.data || (Array.isArray(ordersData) ? ordersData : []);

  // Compute dashboard metrics
  const totalOrders = ordersList.length;
  
  const completedOrders = ordersList.filter((o) => o.topup_status === 'completed');
  const totalSales = completedOrders.reduce((sum, o) => sum + Number(o.selling_price || 0), 0);
  
  const successRate = totalOrders > 0 
    ? ((completedOrders.length / totalOrders) * 100).toFixed(1)
    : '100';

  const digiflazzBalance = balanceData?.balance ?? 0;

  return (
    <div className="flex bg-surface-page min-h-screen text-ink-secondary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-xl font-medium text-ink-primary">
            Dashboard Utama
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Ikhtisar performa penjualan, rate kesuksesan transaksi, dan saldo Digiflazz.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Omset Penjualan"
            value={formatRupiah(totalSales)}
            icon={<DollarSign size={20} />}
            description="Dari semua top-up berstatus Berhasil"
          />

          <StatsCard
            title="Saldo Digiflazz"
            value={balanceLoading ? 'Loading...' : formatRupiah(digiflazzBalance)}
            icon={<Wallet size={20} />}
            description="Koneksi deposit Digiflazz API"
          />

          <StatsCard
            title="Success Rate"
            value={`${successRate}%`}
            icon={<Percent size={20} />}
            description={`${completedOrders.length} dari ${totalOrders} transaksi berhasil`}
          />

          <StatsCard
            title="Total Pesanan"
            value={totalOrders}
            icon={<ClipboardList size={20} />}
            description="Seluruh transaksi masuk"
          />
        </div>

        {/* Dashboard Charts */}
        {ordersLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-[320px] rounded-xl lg:col-span-2" />
            <Skeleton className="h-[320px] rounded-xl" />
          </div>
        ) : (
          <DashboardCharts orders={ordersList} />
        )}

        {/* Recent Orders Section */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
            Pesanan Terbaru
          </h3>

          {ordersLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 rounded-lg" />
              <Skeleton className="h-32 rounded-lg" />
            </div>
          ) : ordersList.length === 0 ? (
            <div className="text-center p-8 bg-surface-card border border-border-default rounded-xl text-ink-muted text-xs">
              Belum ada transaksi masuk di sistem.
            </div>
          ) : (
            <OrdersTable
              orders={ordersList.slice(0, 5)} // show top 5 on dashboard
              onViewDetail={(order) => router.push(`/admin/orders?code=${order.order_code}`)}
            />
          )}
        </div>
      </main>
    </div>
  );
}
