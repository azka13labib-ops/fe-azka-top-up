import React from 'react';
import { Order } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatRupiah, formatDate } from '@/lib/utils';
import { X, RefreshCw, Undo, Clipboard } from 'lucide-react';

interface OrderDetailPanelProps {
  order: Order | null;
  onClose: () => void;
  onRetry: (orderId: number) => Promise<void>;
  onRefund: (orderId: number) => Promise<void>;
  isActionLoading: boolean;
}

export const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({
  order,
  onClose,
  onRetry,
  onRefund,
  isActionLoading,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-surface-card border border-border-default rounded-xl w-full max-w-xl max-h-[85vh] flex flex-col justify-between shadow-none animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border-default">
          <div>
            <h3 className="text-sm font-semibold text-ink-primary font-mono">
              {order.order_code}
            </h3>
            <span className="text-[10px] text-ink-muted">
              Dibuat: {formatDate(order.created_at)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Status block */}
          <div className="grid grid-cols-2 gap-4 bg-surface-subtle p-3 rounded-lg border border-border-default">
            <div>
              <span className="text-[10px] text-ink-muted uppercase font-medium">Status Bayar</span>
              <div className="mt-1">
                <Badge variant={order.payment_status === 'paid' ? 'paid' : order.payment_status === 'expired' ? 'expired' : 'pending'}>
                  {order.payment_status}
                </Badge>
              </div>
            </div>
            <div>
              <span className="text-[10px] text-ink-muted uppercase font-medium">Status Top-up</span>
              <div className="mt-1">
                <Badge variant={order.topup_status === 'completed' ? 'completed' : order.topup_status === 'failed' ? 'failed' : 'processing'}>
                  {order.topup_status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Customer info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold text-ink-primary uppercase tracking-wider">
              Informasi Pelanggan
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-ink-secondary">
              <span className="text-ink-muted">Game / Item</span>
              <span className="font-medium text-ink-primary">{order.game_name} - {order.product_name}</span>

              <span className="text-ink-muted">ID Pelanggan</span>
              <span className="font-medium text-ink-primary">{order.customer_no} {order.zone_id ? `(${order.zone_id})` : ''}</span>

              <span className="text-ink-muted">Email</span>
              <span className="font-medium text-ink-primary truncate">{order.email}</span>

              <span className="text-ink-muted">No. WA</span>
              <span className="font-medium text-ink-primary">{order.phone || '—'}</span>
            </div>
          </div>

          {/* Transaction info */}
          <div className="border-t border-border-default pt-4 space-y-2.5">
            <h4 className="text-xs font-semibold text-ink-primary uppercase tracking-wider">
              Rincian Pembayaran
            </h4>
            <div className="grid grid-cols-2 gap-y-2 text-ink-secondary">
              <span className="text-ink-muted">Metode</span>
              <span className="font-medium text-ink-primary uppercase font-mono">{order.payment_method}</span>

              <span className="text-ink-muted">Serial Number / SN</span>
              <span className="font-medium text-ink-primary font-mono">{order.digiflazz_sn || '—'}</span>

              <span className="text-ink-muted">Total Pembayaran</span>
              <span className="font-semibold text-brand-navy font-mono">{formatRupiah(order.selling_price)}</span>
            </div>
          </div>

          {/* Failure reason if failed */}
          {order.topup_status === 'failed' && (
            <div className="bg-status-error-bg border border-status-error-border rounded-lg p-3 text-status-error">
              <span className="text-[10px] font-semibold uppercase block">Alasan Gagal</span>
              <span className="text-xs mt-1 block leading-normal">{order.failure_reason || 'Gagal dari API provider Digiflazz.'}</span>
            </div>
          )}

          {/* Timeline Logs */}
          <div className="border-t border-border-default pt-4 space-y-2.5">
            <h4 className="text-xs font-semibold text-ink-primary uppercase tracking-wider">
              Logs Sistem
            </h4>
            <div className="space-y-2 pl-3 border-l border-border-default max-h-[150px] overflow-y-auto">
              {order.logs?.map((log) => (
                <div key={log.id} className="text-xs">
                  <span className="text-[10px] text-ink-hint">{formatDate(log.created_at)}</span>
                  <span className="font-medium text-ink-primary block mt-0.5">{log.event_label}</span>
                  <span className="text-[11px] text-ink-muted block mt-0.5">{log.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-border-default flex gap-3">
          {order.topup_status === 'failed' && (
            <Button
              onClick={() => onRetry(order.id)}
              disabled={isActionLoading}
              variant="primary"
              className="flex-1"
              icon={<RefreshCw size={14} />}
            >
              Retry Top-up
            </Button>
          )}
          {order.topup_status === 'failed' && (
            <Button
              onClick={() => onRefund(order.id)}
              disabled={isActionLoading}
              variant="outline"
              className="flex-1"
              icon={<Undo size={14} />}
            >
              Tandai Refund
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderDetailPanel;
