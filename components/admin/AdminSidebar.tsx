'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, ListOrdered, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: '/admin/products',
      label: 'Kelola Produk',
      icon: <ShoppingBag size={18} />,
    },
    {
      href: '/admin/orders',
      label: 'Pesanan / Transaksi',
      icon: <ListOrdered size={18} />,
    },
    {
      href: '/admin/settings',
      label: 'Pengaturan Web',
      icon: <Settings size={18} />,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <aside className="w-64 bg-surface-card border-r border-border-default min-h-screen flex flex-col justify-between p-6 shrink-0">
      
      {/* Top Section */}
      <div className="space-y-8">
        <div>
          <span className="text-sm font-semibold text-brand-navy tracking-wider block">
            AZKA TOP UP
          </span>
          <span className="text-[10px] text-ink-hint uppercase font-medium mt-1 block">
            Admin Workspace
          </span>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150',
                  active
                    ? 'bg-brand-navy text-white hover:bg-brand-navy-dark'
                    : 'text-ink-muted hover:text-ink-primary hover:bg-surface-subtle'
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-xs font-medium text-ink-muted hover:text-ink-primary transition-colors"
        >
          <Home size={14} />
          <span>Kembali ke Toko</span>
        </Link>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-status-error hover:bg-status-error-bg transition-colors duration-150 cursor-pointer"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Keluar Admin</span>
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;
