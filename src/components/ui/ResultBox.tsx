import { clsx } from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ResultBoxProps extends HTMLMotionProps<'div'> {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  highlight?: boolean;
  align?: 'center' | 'left';
  shouldFormat?: boolean;
}

function formatNumber(value: string | number): string {
  if (typeof value === 'string') return value;
  if (Number.isNaN(value) || !Number.isFinite(value)) return '—';
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

export function ResultBox({
  label,
  value,
  prefix,
  suffix,
  highlight = false,
  align = 'center',
  shouldFormat = true,
  className,
  ...props
}: ResultBoxProps) {
  const displayValue = shouldFormat ? formatNumber(value) : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={clsx(
        'result-box',
        {
          'result-box--highlight': highlight,
          'result-box--left': align === 'left',
        },
        className
      )}
      {...props}
    >
      {highlight && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px] rounded-t-lg"
          style={{ background: 'var(--primary)' }}
          aria-hidden="true"
        />
      )}
      
      <span
        className={clsx('result-label', {
          'result-label--highlight': highlight,
        })}
      >
        {label}
      </span>
      
      <span
        className={clsx('result-value flex items-baseline gap-0.5', {
          'result-value--highlight': highlight,
        })}
      >
        {prefix && (
          <span className="text-lg font-semibold opacity-85 mr-0.5" aria-hidden="true">
            {prefix}
          </span>
        )}
        <span>{displayValue}</span>
        {suffix && (
          <span className="text-sm font-medium text-[var(--text-secondary)] ml-0.5" aria-hidden="true">
            {suffix}
          </span>
        )}
      </span>
    </motion.div>
  );
}

export default ResultBox;
