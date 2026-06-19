import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'expired'
  | 'cancelled'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const baseStyle = 'inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border transition-colors';

  const variants: Record<BadgeVariant, string> = {
    pending: 'bg-status-warning-bg text-status-warning border-status-warning-border',
    warning: 'bg-status-warning-bg text-status-warning border-status-warning-border',
    
    paid: 'bg-status-info-bg text-status-info border-status-info-border',
    processing: 'bg-status-info-bg text-status-info border-status-info-border',
    info: 'bg-status-info-bg text-status-info border-status-info-border',

    completed: 'bg-status-success-bg text-status-success border-status-success-border',
    success: 'bg-status-success-bg text-status-success border-status-success-border',

    failed: 'bg-status-error-bg text-status-error border-status-error-border',
    error: 'bg-status-error-bg text-status-error border-status-error-border',

    expired: 'bg-surface-subtle text-ink-muted border-border-default',
    cancelled: 'bg-surface-subtle text-ink-muted border-border-default',
    neutral: 'bg-surface-subtle text-ink-muted border-border-default',
  };

  return (
    <span className={cn(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
};

export default Badge;
