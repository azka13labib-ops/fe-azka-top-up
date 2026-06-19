'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Portal Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-surface-card transition-all duration-300 animate-slide-in
              ${t.type === 'success' ? 'border-status-success-border text-ink-primary' : ''}
              ${t.type === 'error' ? 'border-status-error-border text-ink-primary' : ''}
              ${t.type === 'warning' ? 'border-status-warning-border text-ink-primary' : ''}
              ${t.type === 'info' ? 'border-status-info-border text-ink-primary' : ''}
            `}
          >
            {/* Icon */}
            <div className="mt-0.5 shrink-0">
              {t.type === 'success' && <CheckCircle size={16} className="text-status-success" />}
              {t.type === 'error' && <AlertCircle size={16} className="text-status-error" />}
              {t.type === 'warning' && <AlertTriangle size={16} className="text-status-warning" />}
              {t.type === 'info' && <Info size={16} className="text-status-info" />}
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium text-ink-primary">
              {t.message}
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
