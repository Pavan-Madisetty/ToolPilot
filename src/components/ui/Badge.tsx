import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost';
  module?: string;
}

export function Badge({
  variant = 'primary',
  module,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'badge',
        module ? `module-badge-${module}` : `badge--${variant}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
