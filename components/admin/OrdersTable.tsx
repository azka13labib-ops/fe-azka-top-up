import React from 'react';
import { Order } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatRupiah, formatDate } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface OrdersTableProps {
  orders: Order[];
  onViewDetail: (order: Order) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onViewDetail }) => {
  const getTopupBadge = (status: Order['topup_status']) => {
    switch (status) {
      case 'completed': return 'success';
      case 'failed': return 'error';
      case 'processing': return 'info';
      default: return 'pending';
    }
  };

  const getPaymentBadge = (status: Order['payment_status']) => {
    switch (status) {
      case 'paid': return 'paid';
      case 'expired': return 'expired';
      case 'cancelled': return 'cancelled';
      case 'failed': return 'failed';
      default: return 'pending';
    }
  };

  return (
    <div className="bg-surface-card border border-border-default rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-subtle border-b border-border-default text-xs text-ink-muted font-medium uppercase tracking-wider">
              <th className="p-4">Trx ID</th>
              <th className="p-4">Game & Item</th>
              <th className="p-4">Customer ID</th>
              <th className="p-4">Email & No. HP</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Status Bayar</th>
              <th className="p-4">Status Top-up</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm text-ink-secondary divide-y divide-border-default">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-surface-subtle/50 transition-colors">
                <td className="p-4 font-mono font-medium text-ink-primary">
                  {order.order_code}
                </td>
                <td className="p-4">
                  <div className="font-medium text-ink-primary">{order.product_name}</div>
                  <div className="text-[10px] text-ink-muted">{order.game_name}</div>
                </td>
                <td className="p-4">
                  {order.customer_no} {order.zone_id ? `(${order.zone_id})` : ''}
                </td>
                <td className="p-4">
                  <div className="text-ink-primary font-medium">{order.email}</div>
                  <div className="text-[10px] text-ink-muted">{order.phone || '-'}</div>
                </td>
                <td className="p-4 font-mono">
                  {formatRupiah(order.selling_price)}
                </td>
                <td className="p-4">
                  <Badge variant={getPaymentBadge(order.payment_status)}>
                    {order.payment_status}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge variant={getTopupBadge(order.topup_status)}>
                    {order.topup_status}
                  </Badge>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => onViewDetail(order)}
                    className="p-1 text-ink-muted hover:text-brand-navy hover:bg-brand-navy-light rounded transition-colors cursor-pointer inline-flex items-center justify-center"
                    title="Detail Transaksi"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
