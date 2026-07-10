import { useEffect, useRef, useState, useTransition, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, Clock } from 'lucide-react';
import { useSearchStore } from '@/stores/uiStore';
import { MODULE_MAP } from '@/config/modules';
import { clsx } from 'clsx';

function getCategoryEmoji(moduleKey: string): string {
  const emojis: Record<string, string> = {
    finance: '💵',
    developer: '💻',
    pdf: '📄',
    image: '🖼️',
    text: '✍️',
    ai: '🤖',
    business: '💼',
    productivity: '⏱️',
    education: '🎓',
    travel: '✈️',
    health: '❤️',
    utilities: '⚙️',
    conversion: '⚖️',
  };
  return emojis[moduleKey] || '🔧';
}

export function SearchDialog() {
  const { query, results, isOpen, setIsOpen, setQuery, clearSearch } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();

  // Load recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recent_searches');
    return saved ? JSON.parse(saved) : [];
  });

  const handleResultSelect = useCallback(
    (slug: string, term: string) => {
      // Save to recent searches log
      const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recent_searches', JSON.stringify(updated));

      navigate(slug);
      setIsOpen(false);
      clearSearch();
    },
    [recentSearches, navigate, setIsOpen, clearSearch]
  );

  const handleInputChange = (val: string) => {
    setActiveIndex(-1);
    startTransition(() => {
      setQuery(val);
    });
  };

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

  // Keyboard navigation through results list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      const visibleCount = Math.min(results.length, 8);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < visibleCount ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : visibleCount - 1));
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && activeIndex < visibleCount) {
          e.preventDefault();
          const targetTool = results[activeIndex].tool;
          handleResultSelect(targetTool.slug, targetTool.name);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    activeIndex,
    results,
    recentSearches,
    navigate,
    clearSearch,
    setIsOpen,
    handleResultSelect,
  ]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  const visibleResults = results.slice(0, 8);

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
            className="w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[70vh]"
            style={{
              background: 'var(--bg-elevated)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Search tools"
          >
            {/* Search Input Box */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 border-b transition-colors duration-200"
              style={{
                borderColor: isFocused ? 'var(--border-focus)' : 'var(--border-default)',
              }}
            >
              {isPending ? (
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-t-transparent border-[var(--text-link)] rounded-full animate-spin" />
                </div>
              ) : (
                <Search
                  className="w-5 h-5 shrink-0 transition-colors"
                  style={{ color: isFocused ? 'var(--text-link)' : 'var(--text-tertiary)' }}
                />
              )}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search tools by name, tag, category..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                style={{ color: 'var(--text-primary)' }}
                aria-label="Search inputs"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="btn btn-icon btn-ghost btn-sm"
                  aria-label="Clear query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results / Empty / Suggestions */}
            <div className="flex-1 overflow-y-auto p-2">
              {query.trim().length < 2 ? (
                <div className="py-4">
                  {recentSearches.length > 0 ? (
                    <div>
                      <div className="flex items-center justify-between px-3 py-1.5 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Recent Searches
                        </span>
                        <button
                          onClick={clearRecentSearches}
                          className="text-[10px] font-semibold hover:text-[var(--text-link)] transition-colors"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          Clear
                        </button>
                      </div>
                      <div className="space-y-0.5">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => handleInputChange(term)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 px-4 text-center">
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Type at least 2 characters to search
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        Try searching "EMI", "JSON", "Base64", "Word Counter"
                      </p>
                    </div>
                  )}
                </div>
              ) : visibleResults.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    No tools found matching "{query}"
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Check your spelling or try search terms.
                  </p>
                </div>
              ) : (
                <ul className="space-y-0.5" role="listbox">
                  {visibleResults.map(({ tool }, idx) => {
                    const moduleConfig = MODULE_MAP[tool.module];
                    const isSelected = activeIndex === idx;
                    return (
                      <li key={tool.id} role="option" aria-selected={isSelected}>
                        <button
                          onClick={() => handleResultSelect(tool.slug, tool.name)}
                          className={clsx(
                            'w-full flex items-center justify-between text-left px-4 py-3 rounded-xl transition-all duration-150',
                            isSelected
                              ? 'bg-[rgba(79,70,229,0.08)] dark:bg-[rgba(139,92,246,0.1)] text-[var(--text-link)]'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                          )}
                          style={{
                            borderLeft: isSelected
                              ? '3px solid var(--text-link)'
                              : '3px solid transparent',
                            paddingLeft: isSelected ? '13px' : '16px',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg shrink-0" aria-hidden="true">
                              {getCategoryEmoji(tool.module)}
                            </span>
                            <div>
                              <p
                                className="text-sm font-semibold"
                                style={{
                                  color: isSelected ? 'var(--text-link)' : 'var(--text-primary)',
                                }}
                              >
                                {tool.name}
                              </p>
                              <p className="text-xs truncate max-w-[280px] sm:max-w-[340px] mt-0.5 text-slate-400 dark:text-slate-500">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                          {moduleConfig && (
                            <span className={`badge module-badge-${tool.module}`}>
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
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Find tools instantly
              </span>
              <span className="flex items-center gap-2.5">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>Esc close</span>
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
