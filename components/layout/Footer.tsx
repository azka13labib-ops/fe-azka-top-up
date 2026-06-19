'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-[0.5px] border-border-default py-12 w-full mt-auto relative z-10 shadow-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* About */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-brand-navy tracking-tight">
              AZKA TOP UP
            </span>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
            Platform top up game termurah, tercepat, dan terpercaya di Indonesia. Beli voucher game favoritmu sekarang juga!
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
            Menu Cepat
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/track" className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150">
                Lacak Pesanan
              </Link>
            </li>
            <li>
              <Link href="/#promotions" className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150">
                Promo
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
            Bantuan & Legal
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/#faq" className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150">
                Syarat & Ketentuan
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <a 
                href={`https://wa.me/6281234567890`}
                target="_blank"
                rel="noreferrer"
                className="text-ink-secondary hover:text-brand-navy font-medium transition-colors duration-150"
              >
                Hubungi Kami (WhatsApp)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-border-default mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-ink-muted">
        <div>
          &copy; {new Date().getFullYear()} AZKA TOP UP. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
