import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Lightbulb, Info, BarChart2 } from 'lucide-react';

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: 'tip' | 'example' | 'info';
  title?: ReactNode;
  icon?: ReactNode;
}

export function Callout({
  tone = 'info',
  title,
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  // Determine default title and icon based on tone
  const defaultTitle = {
    tip: 'Pro Tips',
    example: 'Calculation Examples',
    info: 'Information',
  }[tone];

  const defaultIcon = {
    tip: <Lightbulb size={20} className="text-amber-500" strokeWidth={2} />,
    example: <BarChart2 size={20} className="text-indigo-500" strokeWidth={2} />,
    info: <Info size={20} className="text-blue-500" strokeWidth={2} />,
  }[tone];

  const displayTitle = title ?? defaultTitle;
  const displayIcon = icon ?? defaultIcon;

  return (
    <div
      className={clsx(
        'callout',
        `callout--${tone}`,
        className
      )}
      {...props}
    >
      <div className="callout__header">
        <div className="callout__icon-wrap" aria-hidden="true">
          {displayIcon}
        </div>
        <h3 className="callout__title">{displayTitle}</h3>
      </div>
      <div className="callout__content w-full">
        {children}
      </div>
    </div>
  );
}

export default Callout;
