import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
}) => {
  return (
    <div className="bg-surface-card border border-border-default rounded-xl p-5 flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs text-ink-muted block font-medium">
          {title}
        </span>
        <span className="text-2xl font-semibold text-ink-primary block tracking-tight font-mono">
          {value}
        </span>
        {description && (
          <span className="text-[10px] text-ink-hint block leading-normal">
            {description}
          </span>
        )}
      </div>

      <div className="w-10 h-10 rounded-lg bg-brand-navy-light text-brand-navy flex items-center justify-center shrink-0">
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
