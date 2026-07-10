import { ElementType, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  padding?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export function Card({
  as: Component = 'div',
  padding = 'md',
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Component
      className={clsx(
        'card',
        {
          // Padding variations
          'p-3 md:p-4': padding === 'sm',
          'p-4 md:p-8': padding === 'md', // Matches standard .card
          'p-6 md:p-12': padding === 'lg',
          // Disable interactive hover effects if false
          'hover:translate-y-0 hover:shadow-md': !interactive,
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
