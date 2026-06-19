'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardList, User } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { useAuth } from '@/hooks/useAuth';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { user } = useAuth();

  const navItems = [
    {
      href: '/',
      label: t.nav.home,
      icon: <Home size={20} />,
    },
    {
      href: '/track',
      label: 'Lacak',
      icon: <ClipboardList size={20} />,
    },
    {
      href: user ? (user.role === 'admin' ? '/admin/dashboard' : '/profile') : '/login',
      label: user ? 'Profil' : 'Masuk',
      icon: <User size={20} />,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-card border-t border-border-default h-16 flex items-center justify-around px-4">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors duration-150 ${
              active ? 'text-brand-navy' : 'text-ink-muted'
            }`}
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="text-[10px] font-medium mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNav;
