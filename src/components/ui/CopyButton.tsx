import { useState, useCallback } from 'react';
import {
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

// ─────────────────────────────────────────────
// CopyButton — Copy text to clipboard
// ─────────────────────────────────────────────

interface CopyButtonProps {
  /** The text to copy to clipboard */
  text: string;
  /** Optional button label (default: 'Copy') */
  label?: string;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Optional additional class names */
  className?: string;
}

const SIZE_STYLES = {
  sm: {
    button: 'copy-btn copy-btn--sm',
    iconSize: 14,
    fontSize: '0.75rem',
    padding: '4px 8px',
    gap: 4,
  },
  md: {
    button: 'copy-btn copy-btn--md',
    iconSize: 16,
    fontSize: '0.875rem',
    padding: '6px 12px',
    gap: 6,
  },
} as const;

export function CopyButton({
  text,
  label = 'Copy',
  size = 'md',
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

  const sizeConfig = SIZE_STYLES[size];

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${label} to clipboard`}
      aria-live="polite"
      disabled={copied}
      className={clsx(className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: sizeConfig.gap,
        padding: sizeConfig.padding,
        fontSize: sizeConfig.fontSize,
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        border: '1px solid var(--border-default)',
        borderRadius: 8,
        cursor: copied ? 'default' : 'pointer',
        background: copied
          ? 'rgba(34, 197, 94, 0.08)'
          : error
            ? 'rgba(239, 68, 68, 0.08)'
            : 'var(--bg-elevated)',
        color: copied
          ? 'rgb(22, 163, 74)'
          : error
            ? 'rgb(220, 38, 38)'
            : 'var(--text-secondary)',
        borderColor: copied
          ? 'rgba(34, 197, 94, 0.3)'
          : error
            ? 'rgba(239, 68, 68, 0.3)'
            : 'var(--border-default)',
        transition: 'all 0.18s ease',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        outline: 'none',
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void handleCopy();
        }
      }}
    >
      {copied ? (
        <CheckIcon
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          aria-hidden="true"
          strokeWidth={2.5}
        />
      ) : (
        <ClipboardDocumentIcon
          width={sizeConfig.iconSize}
          height={sizeConfig.iconSize}
          aria-hidden="true"
        />
      )}
      <span>{copied ? 'Copied!' : error ? 'Failed' : label}</span>
    </button>
  );
}
