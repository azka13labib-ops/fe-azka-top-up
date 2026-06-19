import React from 'react';
import { Order } from '@/types';
import { formatRupiah, formatDate } from '@/lib/utils';

interface OrderDetailTableProps {
  order: Order;
}

export const OrderDetailTable: React.FC<OrderDetailTableProps> = ({ order }) => {
  const detailItems = [
    { label: 'Game', value: order.game_name },
    { label: 'User ID', value: `${order.customer_no}${order.zone_id ? ` (${order.zone_id})` : ''}` },
    { label: 'Item', value: order.product_name },
    { label: 'Payment Method', value: order.payment_method ? order.payment_method.toUpperCase() : 'MIDTRANS' },
  ];

  return (
    <div className="bg-surface-card border border-border-default rounded-xl p-5 mb-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border-default pb-3 mb-4">
        <div>
          <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
            Transaction ID
          </span>
          <span className="text-sm font-medium text-ink-primary font-mono">
            {order.order_code}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-ink-muted uppercase tracking-wider block">
            Date
          </span>
          <span className="text-sm font-medium text-ink-primary">
            {formatDate(order.created_at)}
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {detailItems.map((item) => (
          <div key={item.label} className="flex justify-between items-center py-0.5 text-xs sm:text-sm">
            <span className="text-ink-muted">{item.label}</span>
            <span className="text-ink-primary font-medium">{item.value}</span>
          </div>
        ))}

        {/* Divider */}
        <div className="border-t border-border-default my-2 pt-3 flex justify-between items-center">
          <span className="text-sm font-medium text-ink-primary">Total Price</span>
          <span className="text-base font-semibold text-brand-navy font-mono">
            {formatRupiah(order.selling_price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailTable;
