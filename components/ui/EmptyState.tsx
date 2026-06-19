import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Tidak Ada Data',
  description = 'Data yang Anda cari tidak ditemukan.',
  icon,
  action,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-12 bg-surface-card border border-border-default rounded-xl',
        className
      )}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-navy-light text-brand-navy mb-4">
        {icon || <Gamepad2 size={24} />}
      </div>
      <h3 className="text-base font-medium text-ink-primary mb-1">
        {title}
      </h3>
      <p className="text-sm text-ink-muted max-w-xs mb-6 leading-relaxed">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
