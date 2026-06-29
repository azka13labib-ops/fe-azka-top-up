'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { Product } from '@/types';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProductsTable } from '@/components/admin/ProductsTable';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { RefreshCw, Search } from 'lucide-react';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function AdminProductsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState('all');

  // Guard
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  // Fetch products
  const { data: productsData, isLoading, mutate } = useSWR(
    user && user.role === 'admin' ? '/admin/products?per_page=200' : null,
    fetcher
  );

  const productsList: Product[] = productsData?.data || (Array.isArray(productsData) ? productsData : []);

  const handleToggleActive = async (productId: number, active: boolean) => {
    try {
      // Optimistic UI Update
      mutate(
        productsData?.data
          ? {
              ...productsData,
              data: productsList.map((p) => (p.id === productId ? { ...p, is_active: active } : p)),
            }
          : productsList.map((p) => (p.id === productId ? { ...p, is_active: active } : p)),
        false
      );

      await api.put(`/admin/products/${productId}`, { is_active: active });
      toast('Status produk berhasil diperbarui!', 'success');
      mutate();
    } catch (err) {
      const error = err as Error;
      toast(error.message || 'Gagal mengubah status produk.', 'error');
      mutate();
    }
  };

  const handleUpdatePrice = async (productId: number, newPrice: number) => {
    try {
      // Optimistic UI Update
      mutate(
        productsData?.data
          ? {
              ...productsData,
              data: productsList.map((p) => (p.id === productId ? { ...p, selling_price: newPrice } : p)),
            }
          : productsList.map((p) => (p.id === productId ? { ...p, selling_price: newPrice } : p)),
        false
      );

      await api.put(`/admin/products/${productId}`, { selling_price: newPrice });
      toast('Harga jual produk berhasil diperbarui!', 'success');
      mutate();
    } catch (err) {
      const error = err as Error;
      toast(error.message || 'Gagal memperbarui harga produk.', 'error');
      mutate();
    }
  };

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      await api.post('/admin/products/sync');
      toast('Berhasil sinkronisasi produk dengan Digiflazz!', 'success');
      mutate();
    } catch (err) {
      const error = err as Error;
      toast(error.message || 'Gagal sinkronisasi produk.', 'error');
    } finally {
      setSyncLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-page">
        <Skeleton className="w-1/3 h-20" />
      </div>
    );
  }

  // Filter products based on search term and game slug
  const filteredProducts = productsList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.digiflazz_sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGame = selectedGame === 'all' || p.game?.slug === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="flex bg-surface-page min-h-screen text-ink-secondary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-medium text-ink-primary">
              Kelola Produk Top-up
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              Atur harga jual retail game item, aktifkan/nonaktifkan produk, dan sinkronkan dengan provider.
            </p>
          </div>

          <Button
            onClick={handleSync}
            loading={syncLoading}
            variant="primary"
            icon={<RefreshCw size={14} />}
            className="h-10 text-xs font-medium cursor-pointer shrink-0"
          >
            Sinkronisasi Digiflazz
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-surface-card border border-border-default rounded-xl p-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari SKU atau nama item..."
              className="w-full bg-surface-input border border-border-default rounded-lg h-9 pl-9 pr-3 text-xs text-ink-primary placeholder:text-ink-hint outline-none focus:border-brand-navy"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-hint shrink-0" />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-ink-muted hidden sm:inline">Game:</label>
            <select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="bg-surface-input border border-border-default rounded-lg h-9 px-3 text-xs text-ink-primary outline-none focus:border-brand-navy cursor-pointer"
            >
              <option value="all">Semua Game</option>
              <option value="mobile-legends">Mobile Legends</option>
              <option value="free-fire">Free Fire</option>
              <option value="pubg-mobile">PUBG Mobile</option>
            </select>
          </div>
        </div>

        {/* Table container */}
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center p-12 bg-surface-card border border-border-default rounded-xl text-ink-muted text-xs">
            Tidak ada produk game ditemukan.
          </div>
        ) : (
          <ProductsTable
            products={filteredProducts}
            onToggleActive={handleToggleActive}
            onUpdatePrice={handleUpdatePrice}
          />
        )}
      </main>
    </div>
  );
}
