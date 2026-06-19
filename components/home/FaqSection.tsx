'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqSection: React.FC = () => {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({
    0: true, // Default open the first one
  });

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqs: FaqItem[] = [
    {
      q: 'Apakah top-up langsung masuk ke akun saya?',
      a: 'Ya, proses top-up berjalan otomatis. Rata-rata item masuk ke akun dalam kurang dari 30 detik setelah pembayaran dikonfirmasi.',
    },
    {
      q: 'Apakah saya perlu membuat akun untuk membeli?',
      a: 'Tidak perlu. AZKA TOP UP mendukung Guest Checkout — kamu langsung beli tanpa daftar. Cukup masukkan User ID game dan email untuk invoice.',
    },
    {
      q: 'Apa yang terjadi jika top-up gagal?',
      a: 'Jika top-up gagal, dana kamu akan dikembalikan secara otomatis dalam 1x24 jam. Kamu juga akan mendapat notifikasi via email.',
    },
    {
      q: 'Metode pembayaran apa saja yang tersedia?',
      a: 'Kami menerima QRIS, GoPay, DANA, ShopeePay, BCA Virtual Account, BNI Virtual Account, dan Mandiri Bill Payment.',
    },
    {
      q: 'Berapa lama proses jika menggunakan Virtual Account?',
      a: 'Virtual Account memiliki waktu konfirmasi 5–15 menit tergantung bank. Setelah terkonfirmasi, top-up diproses otomatis dalam hitungan detik.',
    },
  ];

  return (
    <section id="faq" className="max-w-2xl mx-auto px-6 py-16">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-medium text-ink-primary">
          Pertanyaan yang Sering Diajukan
        </h3>
        <p className="text-sm text-ink-muted mt-2">
          Ada yang ingin kamu tanyakan? Temukan jawabannya di sini.
        </p>
      </div>

      {/* Faq Items */}
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndexes[i];
          return (
            <div
              key={i}
              className="bg-surface-card border border-border-default rounded-xl overflow-hidden transition-all duration-150"
            >
              {/* Question Row */}
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                className="w-full flex justify-between items-center px-5 py-4 cursor-pointer text-left focus:outline-none"
              >
                <span
                  className={cn(
                    'text-sm font-medium transition-colors duration-150',
                    isOpen ? 'text-brand-navy' : 'text-ink-primary'
                  )}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-ink-muted transition-transform duration-150 shrink-0',
                    isOpen ? 'rotate-180 text-brand-navy' : ''
                  )}
                />
              </button>

              {/* Answer Content */}
              <div
                className={cn(
                  'transition-all duration-150 ease-in-out overflow-hidden',
                  isOpen ? 'max-h-60 border-t border-border-default' : 'max-h-0'
                )}
              >
                <p className="px-5 py-4 text-sm text-ink-secondary leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
