import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
import { MODULES } from '@/config/modules';
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

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { setIsOpen: setSearchOpen } = useSearchStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  // Scroll detection for header shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  // Lock body scroll when universal mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Click outside & Escape key listeners for closing menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-50 transition-all duration-200',
          isScrolled ? 'shadow-sm' : ''
        )}
        style={{
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--header-border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        role="banner"
      >
        <div className="container-app">
          <div className="flex items-center h-16 gap-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl shrink-0"
              aria-label="ToolPilot — Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
                style={{ background: 'linear-gradient(135deg, var(--text-link) 0%, rgba(79, 70, 229, 0.6) 100%)' }}
                aria-hidden="true"
              >
                T
              </div>
              <span style={{ color: 'var(--text-primary)' }}>
                Tool<span style={{ color: 'var(--text-link)' }}>Pilot</span>
              </span>
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search Bar — Desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-normal transition-all duration-200 border cursor-text hover:bg-slate-50 dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-tertiary)',
                minWidth: '260px',
                boxShadow: 'var(--shadow-xs)',
              }}
              aria-label="Search tools (Ctrl+K)"
            >
              <MagnifyingGlassIcon className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
              <span className="flex-1 text-left text-slate-400 dark:text-slate-500">Search tools...</span>
              <kbd
                className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] rounded-md border font-sans font-medium"
                style={{
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  color: 'var(--text-tertiary)',
                }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search — Mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden btn btn-icon btn-ghost"
                aria-label="Search tools"
              >
                <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="btn btn-icon btn-ghost"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                title={theme === 'light' ? 'Dark mode' : 'Light mode'}
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <MoonIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <SunIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </motion.div>
              </button>

              {/* Universal Menu Toggle */}
              <button
                ref={toggleBtnRef}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={clsx(
                  "btn btn-icon btn-ghost focus:outline-none transition-colors",
                  isMobileMenuOpen ? "bg-slate-100 dark:bg-slate-800 text-[var(--text-link)]" : ""
                )}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Universal Menu */}
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-4 right-4 md:left-auto md:right-6 lg:right-8 top-16 md:top-[68px] w-[calc(100vw-32px)] md:w-[380px] border rounded-2xl shadow-xl z-50 overflow-hidden"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-elevated)',
            }}
          >
            <nav className="p-4" aria-label="Navigation Menu">
              {/* Search — Mobile Only */}
              <button
                onClick={() => { setSearchOpen(true); setIsMobileMenuOpen(false); }}
                className="md:hidden flex items-center gap-3 w-full px-3 py-2.5 rounded-lg mb-4 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                <span>Search 500+ tools...</span>
              </button>

              <div>
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  All Modules
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {MODULES.map((mod) => (
                    <Link
                      key={mod.key}
                      to={mod.slug}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-[var(--text-link)]"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                    >
                      <span className="text-base shrink-0" aria-hidden="true">
                        {getCategoryEmoji(mod.key)}
                      </span>
                      <span className="truncate">{mod.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
}
