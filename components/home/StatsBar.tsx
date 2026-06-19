import React from 'react';
import { Receipt, ShieldCheck, Gauge, Package } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    { 
      value: '5M+', 
      label: 'TOTAL TRANSAKSI',
      icon: <Receipt size={22} className="text-brand-navy" />,
      bg: 'bg-brand-navy-light'
    },
    { 
      value: '99.9%', 
      label: 'TINGKAT SUKSES',
      icon: <ShieldCheck size={22} className="text-status-success" />,
      bg: 'bg-status-success-bg'
    },
    { 
      value: '< 1 Detik', 
      label: 'PROSES RATA-RATA',
      icon: <Gauge size={22} className="text-status-info" />,
      bg: 'bg-status-info-bg'
    },
    { 
      value: '100+', 
      label: 'PRODUK TERSEDIA',
      icon: <Package size={22} className="text-accent-amber" />,
      bg: 'bg-accent-amber-bg'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-4">
      <div className="bg-white border-[0.5px] border-border-default rounded-xl py-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-border-default shadow-none">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 lg:justify-center px-4">
            <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-ink-primary tracking-tight leading-none mb-1.5">
                {stat.value}
              </span>
              <span className="text-[10px] font-semibold text-ink-muted tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsBar;
