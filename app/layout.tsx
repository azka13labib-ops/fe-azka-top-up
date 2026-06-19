import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ToastProvider } from '@/components/ui/Toast';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Top Up Game Instan & Aman | AZKA TOP UP',
  description: 'Beli diamond, UC, dan voucher game favoritmu dengan harga terbaik dan proses otomatis instan 24 jam terpercaya di Indonesia.',
  keywords: 'top up game, diamond ml, voucher game, top up murah, azka top up, mobile legends, free fire',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col bg-surface-page text-ink-primary relative overflow-x-hidden">
        <LanguageProvider>
          <ToastProvider>
            <Navbar />
            <main className="grow pb-16 md:pb-0 z-0">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
