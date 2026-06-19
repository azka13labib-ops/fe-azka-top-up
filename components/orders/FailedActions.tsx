import React from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Order } from '@/types';

interface FailedActionsProps {
  order: Order;
}

export const FailedActions: React.FC<FailedActionsProps> = ({ order }) => {
  const supportWa = process.env.NEXT_PUBLIC_SUPPORT_WA || '6281234567890';
  
  const handleSupportChat = () => {
    const text = `Halo Admin, transaksi saya gagal dengan Order Code: ${order.order_code}. Mohon bantuannya. Detail: ${order.game_name} - ${order.product_name}. Alasan: ${order.failure_reason || '—'}`;
    const url = `https://wa.me/${supportWa}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-status-error-bg border border-status-error-border rounded-xl p-5 mb-4 text-center">
      <h4 className="text-sm font-medium text-status-error uppercase tracking-wider mb-2">
        Mengapa Top-up Gagal?
      </h4>
      <p className="text-xs text-status-error/80 leading-relaxed mb-4">
        {order.failure_reason || 'Terjadi gangguan koneksi ke server distributor game. Dana Anda aman dan akan dikembalikan secara otomatis jika sudah terpotong.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Button
          onClick={handleSupportChat}
          variant="wa"
          icon={<MessageCircle size={16} />}
          className="text-xs sm:text-sm"
        >
          Hubungi Layanan CS
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            icon={<ArrowLeft size={16} />}
            className="w-full text-xs sm:text-sm"
          >
            Pesan Ulang
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FailedActions;
