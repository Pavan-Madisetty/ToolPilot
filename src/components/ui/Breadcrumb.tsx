import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  /** Items after the implicit 'Home' item */
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol role="list" className="breadcrumb-list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="breadcrumb-item">
              {/* Separator (skip for first item) */}
              {!isFirst && (
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  className="breadcrumb-separator"
                  aria-hidden="true"
                />
              )}

              {/* Last item = current page */}
              {isLast ? (
                <span aria-current="page" className="breadcrumb-current">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link to={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-static">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
