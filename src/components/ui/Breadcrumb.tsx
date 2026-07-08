import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// ─────────────────────────────────────────────
// Breadcrumb — Semantic navigation trail
// ─────────────────────────────────────────────

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
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center' }}>
      <ol
        role="list"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 0,
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-sans)',
        }}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={`${item.label}-${index}`}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {/* Separator (skip for first item) */}
              {!isFirst && (
                <ChevronRightIcon
                  width={14}
                  height={14}
                  aria-hidden="true"
                  style={{
                    color: 'var(--text-tertiary)',
                    margin: '0 6px',
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Last item = current page */}
              {isLast ? (
                <span
                  aria-current="page"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    maxWidth: 220,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  to={item.href}
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    borderRadius: 4,
                    padding: '1px 2px',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-link)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                  }}
                >
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
