'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { Save, AlertCircle } from 'lucide-react';

const fetcher = (url: string) => api.get(url).then((res) => res.data.data);

export default function AdminSettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);

  // Form Field States
  const [appName, setAppName] = useState('');
  const [supportWa, setSupportWa] = useState('');
  const [digiflazzUsername, setDigiflazzUsername] = useState('');
  const [digiflazzApiKey, setDigiflazzApiKey] = useState('');
  const [midtransMerchantId, setMidtransMerchantId] = useState('');
  const [midtransClientKey, setMidtransClientKey] = useState('');
  const [midtransServerKey, setMidtransServerKey] = useState('');

  // Guard
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [user, authLoading, router]);

  // Fetch settings
  const { data: settings = {}, isLoading, mutate } = useSWR(
    user && user.role === 'admin' ? '/admin/settings' : null,
    fetcher
  );

  // Sync form states with fetched settings
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setAppName(settings.app_name || '');
      setSupportWa(settings.support_wa || '');
      setDigiflazzUsername(settings.digiflazz_username || '');
      setDigiflazzApiKey(settings.digiflazz_api_key || '');
      setMidtransMerchantId(settings.midtrans_merchant_id || '');
      setMidtransClientKey(settings.midtrans_client_key || '');
      setMidtransServerKey(settings.midtrans_server_key || '');
    }
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    try {
      const payload = {
        app_name: appName,
        support_wa: supportWa,
        digiflazz_username: digiflazzUsername,
        digiflazz_api_key: digiflazzApiKey,
        midtrans_merchant_id: midtransMerchantId,
        midtrans_client_key: midtransClientKey,
        midtrans_server_key: midtransServerKey,
      };

      await api.put('/admin/settings', payload);
      toast('Konfigurasi web berhasil disimpan!', 'success');
      mutate();
    } catch (err: any) {
      toast(err.message || 'Gagal menyimpan konfigurasi.', 'error');
    } finally {
      setSaveLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading)) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-page">
        <Skeleton className="w-1/3 h-20" />
      </div>
    );
  }

  return (
    <div className="flex bg-surface-page min-h-screen text-ink-secondary">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto max-w-4xl">
        <div>
          <h2 className="text-xl font-medium text-ink-primary">
            Pengaturan Web & Integrasi API
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Sesuaikan identitas nama platform, kontak admin WhatsApp, dan kredensial API key untuk Digiflazz & Midtrans.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* General Settings */}
            <div className="bg-surface-card border border-border-default rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
                Informasi Umum Web
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nama Aplikasi / Brand"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Contoh: AZKA TOP UP"
                  required
                />
                <Input
                  label="No. WhatsApp Customer Support"
                  value={supportWa}
                  onChange={(e) => setSupportWa(e.target.value)}
                  placeholder="Contoh: 6281234567890"
                  required
                  helperText="Format dengan kode negara tanpa tanda +"
                />
              </div>
            </div>

            {/* Digiflazz Settings */}
            <div className="bg-surface-card border border-border-default rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
                Integrasi Provider Digiflazz
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Username Digiflazz"
                  value={digiflazzUsername}
                  onChange={(e) => setDigiflazzUsername(e.target.value)}
                  placeholder="Username Anda"
                />
                <Input
                  label="API Key Digiflazz"
                  type="password"
                  value={digiflazzApiKey}
                  onChange={(e) => setDigiflazzApiKey(e.target.value)}
                  placeholder="API Key Digiflazz (Production/Development)"
                />
              </div>
            </div>

            {/* Midtrans Settings */}
            <div className="bg-surface-card border border-border-default rounded-xl p-5 space-y-4">
              <h3 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">
                Integrasi Payment Gateway Midtrans
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    label="Merchant ID Midtrans"
                    value={midtransMerchantId}
                    onChange={(e) => setMidtransMerchantId(e.target.value)}
                    placeholder="Merchant ID"
                  />
                  <Input
                    label="Client Key Midtrans"
                    value={midtransClientKey}
                    onChange={(e) => setMidtransClientKey(e.target.value)}
                    placeholder="Client Key (SB-Mid-client-...)"
                  />
                  <Input
                    label="Server Key Midtrans"
                    type="password"
                    value={midtransServerKey}
                    onChange={(e) => setMidtransServerKey(e.target.value)}
                    placeholder="Server Key (SB-Mid-server-...)"
                  />
                </div>
                <div className="flex gap-2 p-3 bg-status-info-bg border border-status-info-border rounded-lg text-status-info text-xs leading-normal">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    Pastikan Anda menyalin URL Webhook berikut dan menempelkannya di Dashboard Midtrans Anda:
                    <br />
                    <strong className="font-mono mt-1 block select-all">
                      {process.env.NEXT_PUBLIC_API_URL
                        ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')}/webhook/midtrans`
                        : 'http://localhost:8000/api/v1/webhook/midtrans'}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Save CTA */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                loading={saveLoading}
                variant="primary"
                icon={<Save size={16} />}
                className="h-11 px-6 text-sm font-medium cursor-pointer"
              >
                Simpan Semua Konfigurasi
              </Button>
            </div>

          </form>
        )}
      </main>
    </div>
  );
}
