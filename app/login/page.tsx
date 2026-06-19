'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Silakan lengkapi email dan password Anda.', 'warning');
      return;
    }

    try {
      const res = await login(email, password, false);
      toast('Login berhasil!', 'success');
      router.push('/profile');
    } catch (err: any) {
      const msg = err.message || 'Email atau password salah.';
      toast(msg, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <div className="bg-surface-card border border-border-default rounded-xl p-6 space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-medium text-ink-primary">
            Selamat Datang Kembali
          </h2>
          <p className="text-xs text-ink-muted mt-2">
            Masuk ke akun AZKA TOP UP Anda untuk melihat riwayat pesanan lengkap.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Contoh: nama@email.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password Anda"
            required
          />

          <Button type="submit" variant="primary" full loading={loading} className="mt-2 h-11 text-sm font-medium">
            Masuk
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-ink-muted text-center pt-2">
          Belum punya akun?{' '}
          <Link href="/register" className="text-brand-navy font-medium hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
