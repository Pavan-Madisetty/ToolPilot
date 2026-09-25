import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { MODULE_MAP } from '@/config/modules';
import { LucideIcon } from '@/components/shared/LucideIcon';

interface ToolSwitcherProps {
  toolId: string;
  moduleKey: string;
}

/**
 * Lets people hop between tools of the same category without going back to a menu:
 * previous / next arrows plus a searchable list of every sibling tool.
 */
export function ToolSwitcher({ toolId, moduleKey }: ToolSwitcherProps) {
  const siblings = useMemo(() => TOOLS_BY_MODULE[moduleKey] ?? [], [moduleKey]);
  const module = MODULE_MAP[moduleKey as keyof typeof MODULE_MAP];
  const moduleLabel = (module?.name ?? 'More').replace(/ Tools$/, '');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = siblings.findIndex((t) => t.id === toolId);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (siblings.length < 2) return null;

  const q = query.trim().toLowerCase();
  const list = q
    ? siblings.filter((t) => t.name.toLowerCase().includes(q) || t.tags?.some((g) => g.toLowerCase().includes(q)))
    : siblings;

  return (
    <div className="sk-switcher" ref={rootRef}>
      {prev ? (
        <Link to={prev.slug} className="sk-switcher__step" aria-label={`Previous tool: ${prev.name}`} title={prev.name}>
          <ChevronLeft size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span className="sk-switcher__step is-disabled" aria-hidden="true"><ChevronLeft size={18} /></span>
      )}

      <button
        type="button"
        className="sk-switcher__btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{moduleLabel} tools</span>
        <span className="sk-switcher__count">{siblings.length}</span>
        <ChevronDown size={15} aria-hidden="true" className={clsx(open && 'rotate-180')} />
      </button>

      {next ? (
        <Link to={next.slug} className="sk-switcher__step" aria-label={`Next tool: ${next.name}`} title={next.name}>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span className="sk-switcher__step is-disabled" aria-hidden="true"><ChevronRight size={18} /></span>
      )}

      {open && (
        <div className="sk-switcher__panel">
          <label className="sk-switcher__search">
            <Search size={15} aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Filter ${moduleLabel.toLowerCase()} tools…`}
              aria-label="Filter tools"
            />
          </label>
          <ul className="sk-switcher__list" role="listbox" aria-label={`${moduleLabel} tools`}>
            {list.map((t) => (
              <li key={t.id} role="option" aria-selected={t.id === toolId}>
                <Link to={t.slug} onClick={() => setOpen(false)} className={clsx('sk-switcher__item', t.id === toolId && 'is-current')}>
                  <LucideIcon name={t.icon} fallback={module?.icon} size={16} />
                  <span>{t.name}</span>
                </Link>
              </li>
            ))}
            {list.length === 0 && <li className="sk-switcher__empty">No matching tools</li>}
          </ul>
          {module && (
            <Link to={module.slug} className="sk-switcher__all">
              View all {moduleLabel} tools
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default ToolSwitcher;
