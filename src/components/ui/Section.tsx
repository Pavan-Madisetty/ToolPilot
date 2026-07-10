import { HTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  alt?: boolean;
}

export function Section({ alt = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={clsx(
        'section',
        {
          'section--alt': alt,
        },
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  viewAllHref?: string;
  viewAllText?: string;
  center?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  icon,
  viewAllHref,
  viewAllText = 'View All',
  center = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'section__header',
        {
          'section__header--center': center,
        },
        className
      )}
      {...props}
    >
      <div className={clsx({ 'flex flex-col items-center': center })}>
        <h2 className="section__title">
          {icon && <span className="section__title-icon">{icon}</span>}
          <span>{title}</span>
        </h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
      </div>

      {viewAllHref && !center && (
        <Link to={viewAllHref} className="section__view-all">
          <span>{viewAllText}</span>
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
