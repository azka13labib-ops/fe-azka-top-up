import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { Badge, BadgeVariant } from '@/components/ui/Badge';

interface StatusHeaderProps {
  topupStatus: 'pending' | 'processing' | 'completed' | 'failed';
  paymentStatus: 'pending' | 'paid' | 'expired' | 'failed' | 'cancelled';
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({
  topupStatus,
  paymentStatus,
}) => {
  // Determine dominant state
  let icon = <RefreshCw size={36} className="text-status-info animate-spin" />;
  let title = 'Top-up Sedang Diproses';
  let desc = 'Pesanan Anda sedang kami proses ke akun game Anda. Halaman ini akan otomatis diperbarui.';
  let badgeVariant: BadgeVariant = 'processing';
  let badgeLabel = 'Diproses';

  if (paymentStatus === 'pending') {
    icon = <AlertTriangle size={36} className="text-status-warning" />;
    title = 'Menunggu Pembayaran';
    desc = 'Silakan selesaikan pembayaran Anda sebelum batas waktu berakhir.';
    badgeVariant = 'pending';
    badgeLabel = 'Menunggu Bayar';
  } else if (topupStatus === 'completed') {
    icon = <CheckCircle size={36} className="text-status-success" />;
    title = 'Transaction Successful';
    desc = 'Your top up has been successfully processed.';
    badgeVariant = 'completed';
    badgeLabel = 'Berhasil';
  } else if (topupStatus === 'failed' || paymentStatus === 'failed') {
    icon = <AlertCircle size={36} className="text-status-error" />;
    title = 'Transaksi Gagal';
    desc = 'Top-up gagal diproses. Silakan hubungi customer service kami jika dana terpotong.';
    badgeVariant = 'failed';
    badgeLabel = 'Gagal';
  } else if (paymentStatus === 'expired') {
    icon = <AlertCircle size={36} className="text-ink-hint" />;
    title = 'Pembayaran Kadaluarsa';
    desc = 'Batas waktu pembayaran Anda telah habis. Silakan buat pesanan baru.';
    badgeVariant = 'expired';
    badgeLabel = 'Kadaluarsa';
  } else if (paymentStatus === 'cancelled') {
    icon = <AlertCircle size={36} className="text-ink-hint" />;
    title = 'Pesanan Dibatalkan';
    desc = 'Pesanan Anda telah dibatalkan.';
    badgeVariant = 'cancelled';
    badgeLabel = 'Dibatalkan';
  } else if (topupStatus === 'processing') {
    icon = <RefreshCw size={36} className="text-status-info animate-spin" />;
    title = 'Top-up Sedang Diproses';
    desc = 'Pesanan Anda sedang kami proses ke akun game Anda. Halaman ini akan otomatis diperbarui.';
    badgeVariant = 'processing';
    badgeLabel = 'Diproses';
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-6">
      {/* Icon Circle Container */}
      <div className="w-16 h-16 rounded-full bg-surface-card border border-border-default flex items-center justify-center mb-4 shadow-none">
        {icon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-medium text-ink-primary">
        {title}
      </h2>

      {/* Description */}
      <p className="text-sm text-ink-muted mt-2 max-w-md">
        {desc}
      </p>

      {/* Status Badge */}
      <Badge variant={badgeVariant} className="mt-4">
        {badgeLabel}
      </Badge>
    </div>
  );
};

export default StatusHeader;
