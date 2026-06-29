'use client';

import React, { useState, use } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { api } from '@/lib/api';
import { Game, Product } from '@/types';
import { useToast } from '@/components/ui/Toast';
import { GameInfoCard } from '@/components/checkout/GameInfoCard';
import { StepAccountInfo } from '@/components/checkout/StepAccountInfo';
import { StepSelectAmount } from '@/components/checkout/StepSelectAmount';
import { VoucherInput } from '@/components/checkout/VoucherInput';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { Skeleton } from '@/components/ui/Skeleton';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { toast } = useToast();

  // Form States
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [verifiedNickname, setVerifiedNickname] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  // Promo states
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Fetch Game Details
  const { data: game, error: gameError } = useSWR<Game>(
    slug ? `/games/${slug}` : null,
    fetcher
  );

  // Fetch Game Products
  const { data: products = [] } = useSWR<Product[]>(
    slug ? `/games/${slug}/products` : null,
    fetcher
  );

  const activeProductId = selectedProductId ?? (products[0]?.id || null);
  const selectedProduct = products.find((p) => p.id === activeProductId) || null;
  
  // Pricing calculations
  const subtotal = selectedProduct ? Number(selectedProduct.selling_price) : 0;
  const adminFee = selectedProduct ? 1500 : 0;
  const idCheckerFee = (selectedProduct && game && game.id_field_label) ? 150 : 0;
  const total = Math.max(0, subtotal + adminFee + idCheckerFee - discountAmount);

  const handleApplyDiscount = (amount: number, code: string | null) => {
    setDiscountAmount(amount);
    setAppliedVoucher(code);
    if (code) {
      toast(`Voucher ${code} berhasil dipasang!`, 'success');
    } else {
      toast('Voucher dilepas.', 'info');
    }
  };

  const handleOrder = async () => {
    if (!selectedProduct) {
      toast('Silakan pilih item top-up terlebih dahulu.', 'warning');
      return;
    }
    if (!userId) {
      toast('Silakan masukkan User ID game Anda.', 'warning');
      return;
    }
    if (game?.needs_zone && !zoneId) {
      toast('Silakan masukkan Zone ID / Server Anda.', 'warning');
      return;
    }
    if (!verifiedNickname) {
      toast('ID Game Anda belum terverifikasi. Harap masukkan ID yang valid.', 'warning');
      return;
    }
    if (!email) {
      toast('Silakan masukkan email untuk pengiriman invoice.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      // POST Request payload
      const payload = {
        product_id: selectedProduct.id,
        customer_no: userId,
        zone_id: game?.needs_zone ? zoneId : null,
        email: email,
        phone: phone || null,
        payment_method: 'MIDTRANS',
        voucher_code: appliedVoucher,
      };

      const response = await api.post('/orders', payload);
      const { order_code, midtrans_snap_token } = response.data.data;

      toast('Pesanan berhasil dibuat, mengarahkan ke pembayaran...', 'success');

      // Check if Midtrans Snap object is loaded
      const snap = (window as unknown as { snap?: { pay: (token: string, options: unknown) => void } }).snap;
      if (midtrans_snap_token && snap) {
        snap.pay(midtrans_snap_token, {
          onSuccess: () => {
            router.push(`/orders/${order_code}`);
          },
          onPending: () => {
            router.push(`/orders/${order_code}`);
          },
          onError: () => {
            router.push(`/orders/${order_code}`);
          },
          onClose: () => {
            router.push(`/orders/${order_code}`);
          },
        });
      } else {
        // Fallback or direct redirect
        router.push(`/orders/${order_code}`);
      }
    } catch (err) {
      const error = err as Error;
      const msg = error.message || 'Gagal memproses pesanan. Silakan coba kembali.';
      toast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (gameError) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h3 className="text-lg font-medium text-ink-primary">Game Tidak Ditemukan</h3>
        <p className="text-sm text-ink-muted mt-2">Link checkout yang Anda tuju tidak valid.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-navy-dark transition-colors cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  if (!game) {
    // Loading skeleton
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <Skeleton className="h-64 rounded-xl" />
          </div>
          <div className="lg:col-span-6 space-y-6">
            <Skeleton className="h-44 rounded-xl" />
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-44 rounded-xl" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Midtrans Snap JS SDK */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Game Info Sidebar (33% -> lg:col-span-4) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <GameInfoCard game={game} />
          </div>

          {/* Column 2: Main Content (67% -> lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8 pb-12">
            
            {/* Step 1: Account Information */}
            <StepAccountInfo
              game={game}
              userId={userId}
              setUserId={setUserId}
              zoneId={zoneId}
              setZoneId={setZoneId}
              onVerificationChange={setVerifiedNickname}
            />

            {/* Step 2: Select Top-Up Amount */}
            <StepSelectAmount
              products={products}
              selectedProductId={activeProductId}
              onSelectProduct={setSelectedProductId}
            />

            {/* Step 3: Voucher / Promo */}
            <VoucherInput onApplyDiscount={handleApplyDiscount} />

            {/* Step 4: Email & Contact Form */}
            <div className="bg-surface-card border-[0.5px] border-border-default rounded-xl p-6 space-y-4 shadow-none">
              <h4 className="text-sm font-medium text-ink-primary">
                Informasi Kontak (Invoice)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-ink-muted">Email *</label>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: gamer@email.com"
                    required
                    className="w-full bg-surface-input border-[0.5px] border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 shadow-none disabled:opacity-75 disabled:bg-slate-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-ink-muted">No. WhatsApp (Opsional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Contoh: 08123456789"
                    className="w-full bg-surface-input border-[0.5px] border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none focus:border-[1.5px] focus:border-brand-navy transition-all duration-150 shadow-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Order Summary Card */}
            <div>
              <OrderSummaryCard
                game={game}
                selectedProduct={selectedProduct}
                userId={userId}
                zoneId={zoneId}
                paymentLabel="Midtrans Snap"
                adminFee={adminFee}
                idCheckerFee={idCheckerFee}
                discount={discountAmount}
                total={total}
                isSubmitting={isSubmitting}
                onOrder={handleOrder}
                nickname={verifiedNickname}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
