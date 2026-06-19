'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Silakan masukkan email dan password admin Anda.', 'warning');
      return;
    }

    try {
      await login(email, password, true); // true sets isAdmin
      toast('Login Admin berhasil! Selamat datang di dashboard.', 'success');
      router.push('/admin/dashboard');
    } catch (err: any) {
      const msg = err.message || 'Email atau password admin salah.';
      toast(msg, 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20 min-h-[70vh] flex flex-col justify-center">
      <div className="bg-surface-card border border-border-default rounded-xl p-6 space-y-6">
        
        {/* Title */}
        <div className="text-center">
          <span className="text-xs font-semibold text-brand-navy tracking-wider uppercase block">
            AZKA TOP UP
          </span>
          <h2 className="text-lg font-medium text-ink-primary mt-1">
            Admin Portal Login
          </h2>
          <p className="text-xs text-ink-muted mt-2">
            Gunakan kredensial admin Anda untuk mengelola produk dan pesanan.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Admin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password admin"
            required
          />

          <Button type="submit" variant="primary" full loading={loading} className="mt-2 h-11 text-sm font-medium">
            Masuk ke Workspace
          </Button>
        </form>
      </div>
    </div>
  );
}
