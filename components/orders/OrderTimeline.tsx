import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { OrderLog } from '@/types';

interface OrderTimelineProps {
  logs: OrderLog[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ logs = [] }) => {
  // Sort logs by newest first (created_at descending)
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (sortedLogs.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface-card border border-border-default rounded-xl p-5 mb-4">
      <h3 className="text-sm font-medium text-ink-primary uppercase tracking-wider mb-4">
        Riwayat Pesanan
      </h3>

      <div className="relative pl-4 border-l border-border-default space-y-6">
        {sortedLogs.map((log) => {
          // Determine dot color depending on type or content
          let dotColor = 'bg-ink-hint';
          if (log.type === 'success') {
            dotColor = 'bg-status-success';
          } else if (log.type === 'info') {
            dotColor = 'bg-status-info';
          } else if (log.type === 'error') {
            dotColor = 'bg-status-error';
          }

          return (
            <div key={log.id} className="relative">
              {/* Timeline dot */}
              <span
                className={cn(
                  'absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white shrink-0',
                  dotColor
                )}
              />
              
              {/* Event details */}
              <div>
                <span className="text-[10px] text-ink-hint block">
                  {formatDate(log.created_at)}
                </span>
                <span className="text-sm font-medium text-ink-primary block mt-0.5">
                  {log.event_label || log.event}
                </span>
                <span className="text-xs text-ink-muted block mt-0.5 leading-relaxed">
                  {log.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
