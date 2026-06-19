import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={cn(
        'bg-surface-card border border-border-default rounded-xl p-6 transition-colors duration-150',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
