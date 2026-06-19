'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2, Search, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const navLinks = [
    { href: '/#promotions', label: 'Promo' },
    { href: '/#metode', label: 'Metode' },
    { href: '/track', label: 'Lacak' },
    { href: '/#faq', label: 'FAQ' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-[0.5px] border-border-default h-[64px] flex items-center w-full">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
            <Gamepad2 size={18} className="text-white" />
          </div>
          <span className="hidden md:inline-block text-lg font-bold text-brand-navy tracking-tight">
            AZKA
          </span>
        </Link>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = link.href === '/#promotions'; // Hardcoded active for Promo as requested
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative py-5 ${
                  active
                    ? 'text-brand-navy border-b-2 border-brand-navy'
                    : 'text-ink-secondary hover:text-brand-navy'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: Search + Auth */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="text-ink-secondary hover:text-brand-navy transition-colors cursor-pointer" title="Cari">
            <Search size={18} />
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href={user.role === 'admin' ? '/admin/dashboard' : '/profile'}
                className="flex items-center gap-2 text-sm font-medium text-ink-secondary hover:text-brand-navy transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-surface-subtle border border-border-default flex items-center justify-center">
                  <UserIcon size={16} className="text-ink-muted" />
                </div>
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={logout}
                className="text-ink-muted hover:text-red-600 transition-colors cursor-pointer"
                title="Keluar"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="bg-transparent border border-brand-navy text-brand-navy rounded-lg px-5 py-2 text-sm font-semibold hover:bg-surface-subtle transition-colors inline-flex items-center justify-center h-10"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex bg-brand-navy text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-brand-navy-dark transition-colors items-center justify-center h-10"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
