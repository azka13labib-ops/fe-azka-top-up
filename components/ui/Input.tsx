import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, containerClassName = '', className = '', ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1.5 w-full', containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-ink-muted select-none">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface-input border border-border-default rounded-lg h-11 px-3 text-sm text-ink-primary placeholder:text-ink-hint outline-none transition-colors duration-150',
            error
              ? 'border-status-error focus:border-status-error focus:ring-1 focus:ring-status-error'
              : 'focus:border-border-focus focus:bg-brand-navy-light',
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-[11px] text-status-error font-medium">{error}</span>
        ) : (
          helperText && (
            <span className="text-[11px] text-ink-hint">{helperText}</span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
