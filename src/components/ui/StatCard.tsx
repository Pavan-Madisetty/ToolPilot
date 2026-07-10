import { motion } from 'framer-motion';
import clsx from 'clsx';

// ─────────────────────────────────────────────
// StatCard — Prominent stat display card
// ─────────────────────────────────────────────

interface StatCardProps {
  /** Label beneath the value */
  label: string;
  /** The main value to display */
  value: string | number;
  /** Optional prefix (e.g. '₹', '$', '+') */
  prefix?: string;
  /** Optional suffix (e.g. '%', ' months', ' yrs') */
  suffix?: string;
  /** Highlight this stat with brand accent */
  highlight?: boolean;
  /** Optional class names */
  className?: string;
}

function formatNumber(value: string | number): string {
  if (typeof value === 'string') return value;
  if (Number.isNaN(value) || !Number.isFinite(value)) return '—';
  // Format with commas for large numbers
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    });
  }
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function StatCard({
  label,
  value,
  prefix,
  suffix,
  highlight = false,
  className,
}: StatCardProps) {
  const formatted = formatNumber(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      role="figure"
      aria-label={`${label}: ${prefix ?? ''}${formatted}${suffix ?? ''}`}
      className={clsx(className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 'var(--space-8)',
        padding: 'var(--space-16) var(--space-24)',
        borderRadius: 'var(--radius-md)',
        background: highlight
          ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.03) 100%)'
          : 'var(--bg-elevated)',
        border: `1px solid ${highlight ? 'var(--primary)' : 'var(--border-default)'}`,
        boxShadow: highlight
          ? 'var(--shadow-md)'
          : 'var(--shadow-sm)',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle highlight accent bar */}
      {highlight && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'var(--primary)',
            borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          }}
        />
      )}

      {/* Label */}
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: highlight ? 'var(--primary)' : 'var(--text-tertiary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {label}
      </span>

      {/* Value */}
      <span
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
          color: highlight ? 'var(--primary)' : 'var(--text-primary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {prefix && (
          <span
            aria-hidden="true"
            style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: highlight ? 'var(--primary)' : 'var(--text-secondary)',
            }}
          >
            {prefix}
          </span>
        )}
        <span
          style={{
            fontSize: '1.875rem',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          {formatted}
        </span>
        {suffix && (
          <span
            aria-hidden="true"
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginLeft: 2,
            }}
          >
            {suffix}
          </span>
        )}
      </span>
    </motion.div>
  );
}
