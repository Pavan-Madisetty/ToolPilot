import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import type { ToastMessage } from '@/types';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

// ─────────────────────────────────────────────
// Toast Configuration
// ─────────────────────────────────────────────

type ToastVariant = ToastMessage['type'];

const VARIANT_CONFIG: Record<
  ToastVariant,
  {
    icon: typeof CheckCircle;
    bgClass: string;
    borderClass: string;
    textClass: string;
  }
> = {
  success: {
    icon: CheckCircle,
    bgClass: 'bg-success-subtle',
    borderClass: 'border-success/25',
    textClass: 'text-success',
  },
  error: {
    icon: AlertCircle,
    bgClass: 'bg-danger-subtle',
    borderClass: 'border-danger/25',
    textClass: 'text-danger',
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-warning-subtle',
    borderClass: 'border-warning/30',
    textClass: 'text-warning',
  },
  info: {
    icon: Info,
    bgClass: 'bg-info-subtle',
    borderClass: 'border-info/25',
    textClass: 'text-info',
  },
};

// ─────────────────────────────────────────────
// Single Toast Item
// ─────────────────────────────────────────────

interface ToastItemProps {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const config = VARIANT_CONFIG[toast.type];
  const Icon = config.icon;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss logic
  useEffect(() => {
    const duration = toast.duration ?? 4000;
    timerRef.current = setTimeout(() => onDismiss(toast.id), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 48, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 48, scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      className={clsx(
        'flex items-start gap-3 p-3.5 pr-4 rounded-xl bg-bg-elevated shadow-lg min-w-[280px] max-w-[380px] backdrop-blur-md relative overflow-hidden border',
        config.borderClass
      )}
    >
      {/* Colored left stripe */}
      <div
        aria-hidden="true"
        className={clsx('absolute top-0 left-0 bottom-0 w-1 rounded-l-lg bg-current', config.textClass)}
      />

      {/* Icon */}
      <div
        aria-hidden="true"
        className={clsx('shrink-0 mt-0.5 p-1.5 rounded-md ml-2', config.bgClass)}
      >
        <Icon width={18} height={18} className={config.textClass} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="m-0 text-caption font-semibold text-text-primary leading-normal">
          {toast.title}
        </p>
        {toast.message && (
          <p className="mt-1 mb-0 text-small text-text-secondary leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        className="shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-0 bg-transparent text-text-tertiary hover:bg-bg-surface hover:text-text-primary cursor-pointer p-0 transition-colors mt-0.5"
      >
        <X size={14} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Toast Container
// ─────────────────────────────────────────────

export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions removals"
      className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2.5 pointer-events-none"
    >
      <AnimatePresence mode="sync" initial={false}>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
