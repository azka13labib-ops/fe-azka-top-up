'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast('Silakan lengkapi semua field pendaftaran.', 'warning');
      return;
    }

    try {
      await register(name, email, password);
      toast('Pendaftaran berhasil! Anda otomatis masuk.', 'success');
      router.push('/profile');
    } catch (err: any) {
      const msg = err.message || 'Pendaftaran gagal. Email mungkin sudah terdaftar.';
      toast(msg, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <div className="bg-surface-card border border-border-default rounded-xl p-6 space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-medium text-ink-primary">
            Daftar Akun Baru
          </h2>
          <p className="text-xs text-ink-muted mt-2">
            Buat akun baru untuk melacak transaksi game Anda secara otomatis.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Lengkap"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Cahya Pratama"
            required
          />

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
            placeholder="Minimal 6 karakter"
            required
            minLength={6}
          />

          <Button type="submit" variant="primary" full loading={loading} className="mt-2 h-11 text-sm font-medium">
            Daftar Sekarang
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-ink-muted text-center pt-2">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-brand-navy font-medium hover:underline">
            Masuk Di Sini
          </Link>
        </p>
      </div>
    </div>
  );
}
