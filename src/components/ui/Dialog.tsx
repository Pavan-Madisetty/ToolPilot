import { useEffect, useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Dialog({ isOpen, onClose, title, children, footer, size = 'md' }: DialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg-overlay backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog Container */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={handleBackdropClick}
            className={clsx(
              'w-full flex flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-elevated shadow-xl relative z-10 max-h-[85vh]',
              {
                'max-w-sm': size === 'sm',
                'max-w-md': size === 'md',
                'max-w-lg': size === 'lg',
                'max-w-2xl': size === 'xl',
              }
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-default">
              <h2 id="dialog-title" className="text-body-large font-bold text-text-primary">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="btn btn-icon btn-ghost btn-sm"
                aria-label="Close dialog"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 text-sm leading-relaxed text-text-secondary">
              {children}
            </div>

            {/* Footer Actions (Optional) */}
            {footer && (
              <div className="px-6 py-4 border-t border-border-default bg-bg-surface flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
