import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useSearchStore } from '@/stores/uiStore';
import { MODULE_MAP } from '@/config/modules';

export function SearchDialog() {
  const { query, results, isOpen, setIsOpen, setQuery, clearSearch } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, setIsOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleResultClick = (slug: string) => {
    navigate(slug);
    setIsOpen(false);
    clearSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-xl overflow-hidden rounded-xl border shadow-2xl relative z-10 flex flex-col max-h-[70vh]"
            style={{
              background: 'var(--bg-elevated)',
              borderColor: 'var(--border-default)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search tools"
          >
            {/* Search Input Box */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <MagnifyingGlassIcon className="w-5 h-5 shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools by name, tag, category..."
                className="flex-1 bg-transparent border-none outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Search inputs"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="btn btn-icon btn-ghost btn-sm"
                  aria-label="Clear query"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results / Empty / Suggestions */}
            <div className="flex-1 overflow-y-auto p-2">
              {query.length < 2 ? (
                <div className="py-6 px-4 text-center">
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Type at least 2 characters to search
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Try searching "EMI", "JSON", "Base64", "Word Counter"
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 px-4 text-center">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    No tools found matching "{query}"
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                    Check your spelling or search for another term.
                  </p>
                </div>
              ) : (
                <ul className="space-y-0.5" role="listbox">
                  {results.map(({ tool }) => {
                    const moduleConfig = MODULE_MAP[tool.module];
                    return (
                      <li key={tool.id} role="option" aria-selected="false">
                        <button
                          onClick={() => handleResultClick(tool.slug)}
                          className="w-full flex items-center justify-between text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                              {tool.name}
                            </p>
                            <p className="text-xs truncate max-w-[320px]" style={{ color: 'var(--text-secondary)' }}>
                              {tool.description}
                            </p>
                          </div>
                          {moduleConfig && (
                            <span
                              className={`badge module-badge-${tool.module}`}
                            >
                              {moduleConfig.name}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer / Shortcuts */}
            <div
              className="px-4 py-2.5 border-t text-[11px] flex items-center justify-between"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)' }}
            >
              <span className="flex items-center gap-1">
                <SparklesIcon className="w-3.5 h-3.5 text-blue-500" />
                Find tools instantly
              </span>
              <span className="flex items-center gap-2">
                <span>Esc to close</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
