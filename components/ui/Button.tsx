import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger' | 'wa';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  full?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  full = false,
  className = '',
  disabled,
  ...props
}) => {
  // Base classes according to PRD: flat, h-11 default, rounded-xl (large), transition-colors duration-150
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-brand-navy text-white hover:bg-brand-navy-dark',
    outline: 'bg-transparent text-brand-navy border border-brand-navy hover:bg-brand-navy-light',
    ghost: 'bg-transparent text-ink-muted hover:text-ink-primary',
    danger: 'bg-status-error text-white hover:bg-red-700',
    wa: 'bg-wa text-white hover:bg-[#1FB855]',
  };

  const sizes = {
    sm: 'h-9 px-3 text-xs',
    md: 'h-11 px-5 text-sm',
    lg: 'h-12 px-6 text-sm', // Note: max font-weight in PRD is 500 (medium)
  };

  const widthStyle = full ? 'w-full' : '';

  return (
    <button
      disabled={disabled || loading}
      className={cn(baseStyle, variants[variant], sizes[size], widthStyle, className)}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};
export default Button;
