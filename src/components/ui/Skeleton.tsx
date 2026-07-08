import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'skeleton',
        {
          'h-4 w-full': variant === 'text',
          'rounded-full': variant === 'circle',
          'rounded-lg': variant === 'rect',
        },
        className
      )}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
