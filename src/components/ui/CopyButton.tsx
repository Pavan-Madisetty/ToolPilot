import { useState, useCallback } from 'react';
import { Clipboard, Check } from 'lucide-react';
import clsx from 'clsx';

interface CopyButtonProps {
  /** The text to copy to clipboard */
  text: string;
  /** Optional button label (default: 'Copy') */
  label?: string;
  /** Size variant */
  size?: 'xs' | 'sm' | 'md';
  /** Styling variant */
  variant?: 'outline' | 'ghost';
  /** Optional additional class names */
  className?: string;
}

const ICON_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
} as const;

export function CopyButton({
  text,
  label = 'Copy',
  size = 'md',
  variant = 'outline',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = useCallback(async () => {
    if (copied) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  }, [text, copied]);

  const iconSize = ICON_SIZES[size];

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${label} to clipboard`}
      aria-live="polite"
      disabled={copied}
      className={clsx(
        'copy-btn',
        `copy-btn--${size}`,
        {
          'copy-btn--ghost': variant === 'ghost' && !copied && !error,
          'copy-btn--copied': copied,
          'copy-btn--error': error,
        },
        className
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void handleCopy();
        }
      }}
    >
      {copied ? (
        <Check size={iconSize} aria-hidden="true" strokeWidth={2.5} />
      ) : (
        <Clipboard size={iconSize} aria-hidden="true" strokeWidth={2} />
      )}
      <span>{copied ? 'Copied!' : error ? 'Failed' : label}</span>
    </button>
  );
}

export default CopyButton;
