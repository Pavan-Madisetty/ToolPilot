import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import type { ToastMessage } from '@/types';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X, LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────
// Toast Configuration
// ─────────────────────────────────────────────

type ToastVariant = ToastMessage['type'];

const VARIANT_CONFIG: Record<
  ToastVariant,
  {
    icon: LucideIcon;
    bg: string;
    border: string;
    iconColor: string;
    labelColor: string;
  }
> = {
  success: {
    icon: CheckCircle,
    bg: 'rgba(22, 163, 74, 0.08)',
    border: 'rgba(22, 163, 74, 0.25)',
    iconColor: 'rgb(22, 163, 74)',
    labelColor: 'rgb(22, 163, 74)',
  },
  error: {
    icon: AlertCircle,
    bg: 'rgba(220, 38, 38, 0.08)',
    border: 'rgba(220, 38, 38, 0.25)',
    iconColor: 'rgb(220, 38, 38)',
    labelColor: 'rgb(220, 38, 38)',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'rgba(234, 179, 8, 0.08)',
    border: 'rgba(234, 179, 8, 0.3)',
    iconColor: 'rgb(202, 138, 4)',
    labelColor: 'rgb(161, 98, 7)',
  },
  info: {
    icon: Info,
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.25)',
    iconColor: 'rgb(59, 130, 246)',
    labelColor: 'rgb(37, 99, 235)',
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

  // Auto-dismiss with visual progress
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
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 14,
        background: 'var(--bg-elevated)',
        border: `1.5px solid ${config.border}`,
        boxShadow: 'var(--shadow-lg)',
        minWidth: 280,
        maxWidth: 380,
        backdropFilter: 'blur(12px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Colored left stripe */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: 4,
          background: config.iconColor,
          borderRadius: '14px 0 0 14px',
        }}
      />

      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          marginTop: 1,
          padding: 6,
          borderRadius: 8,
          background: config.bg,
          marginLeft: 8,
        }}
      >
        <Icon
          width={18}
          height={18}
          style={{ color: config.iconColor }}
          strokeWidth={1.75}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            lineHeight: 1.4,
          }}
        >
          {toast.title}
        </p>
        {toast.message && (
          <p
            style={{
              margin: '3px 0 0',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
              lineHeight: 1.5,
            }}
          >
            {toast.message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss notification"
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: 6,
          border: 'none',
          background: 'transparent',
          color: 'var(--text-tertiary)',
          cursor: 'pointer',
          padding: 0,
          transition: 'background 0.15s, color 0.15s',
          marginTop: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-surface)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--text-tertiary)';
        }}
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
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="sync" initial={false}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={toast} onDismiss={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
