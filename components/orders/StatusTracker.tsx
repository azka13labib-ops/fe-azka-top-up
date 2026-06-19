import React from 'react';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface StatusTrackerProps {
  currentStatus: 'waiting_payment' | 'processing' | 'completed' | 'failed' | 'expired' | 'cancelled';
}

export const StatusTracker: React.FC<StatusTrackerProps> = ({ currentStatus }) => {
  const steps = [
    { id: 'created', label: 'Pesanan Dibuat' },
    { id: 'payment', label: 'Pembayaran' },
    { id: 'processing', label: 'Proses Top-up' },
    { id: 'finish', label: 'Selesai' },
  ];

  // Helper to determine status state for visual styling
  const getStepState = (stepId: string) => {
    if (currentStatus === 'expired' || currentStatus === 'cancelled') {
      if (stepId === 'created') return 'completed';
      if (stepId === 'payment') return 'failed';
      return 'inactive';
    }

    if (currentStatus === 'failed') {
      if (stepId === 'finish') return 'failed';
      return 'completed';
    }

    if (stepId === 'created') return 'completed';

    if (stepId === 'payment') {
      if (currentStatus === 'waiting_payment') return 'active';
      return 'completed';
    }

    if (stepId === 'processing') {
      if (currentStatus === 'waiting_payment') return 'inactive';
      if (currentStatus === 'processing') return 'active';
      return 'completed';
    }

    if (stepId === 'finish') {
      if (currentStatus === 'completed') return 'completed';
      return 'inactive';
    }

    return 'inactive';
  };

  return (
    <div className="bg-surface-card border border-border-default rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const state = getStepState(step.id);
          
          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <div className="flex flex-col items-center flex-1 relative">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center border text-xs font-semibold z-10',
                    state === 'completed' && 'bg-status-success-bg border-status-success text-status-success',
                    state === 'active' && 'bg-brand-navy-light border-brand-navy text-brand-navy',
                    state === 'inactive' && 'bg-surface-subtle border-border-default text-ink-hint',
                    state === 'failed' && 'bg-status-error-bg border-status-error text-status-error'
                  )}
                >
                  {state === 'completed' ? (
                    <Check size={12} strokeWidth={3} />
                  ) : state === 'failed' ? (
                    <X size={12} strokeWidth={3} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'text-[11px] font-medium mt-2 text-center truncate max-w-[80px]',
                    state === 'completed' && 'text-status-success',
                    state === 'active' && 'text-brand-navy',
                    state === 'inactive' && 'text-ink-hint',
                    state === 'failed' && 'text-status-error'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Line connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 -mt-5 bg-border-default shrink-0',
                    // Color the line connector green if the next step is active/completed
                    getStepState(steps[index + 1].id) !== 'inactive' ? 'bg-status-success' : ''
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTracker;
