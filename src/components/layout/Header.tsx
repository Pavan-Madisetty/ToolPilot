import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
import { MODULES } from '@/config/modules';
import { clsx } from 'clsx';

/** Maps module key → emoji for the mobile drawer */
const MODULE_EMOJIS: Record<string, string> = {
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

export function Header() {
  const { theme, toggleTheme, designMode, toggleDesignMode } = useThemeStore();
  const { setIsOpen: setSearchOpen } = useSearchStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  /* ── scroll shadow ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── ⌘K / Ctrl+K shortcut ──────────────────────────────── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setSearchOpen]);

  /* ── lock body scroll while drawer is open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  /* ── close drawer on outside click or Escape ────────────── */
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      document.addEventListener('mousedown', onMouseDown);
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isDrawerOpen]);

  return (
    <>
      {/* ════════════════════════  HEADER BAR  ════════════════════════ */}
      <header
        role="banner"
        className={clsx(
          'sticky top-0 z-50 transition-shadow duration-200',
          isScrolled ? 'shadow-md' : 'shadow-none'
        )}
        style={{
          background: 'var(--header-bg)',
          borderBottom: '1px solid var(--header-border)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="container-app">
          <div className="flex items-center h-16 gap-4">

            {/* ── Logo ─────────────────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold text-xl shrink-0 select-none"
              aria-label="ToolPilot — Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-sm"
                style={{
                  background:
                    'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                }}
                aria-hidden="true"
              >
                T
              </div>
              <span style={{ color: 'var(--text-primary)' }}>
                Tool
                <span style={{ color: '#4F46E5' }}>Pilot</span>
              </span>
            </Link>

            {/* ── Grow spacer ──────────────────────────────────────── */}
            <div className="flex-1" />

            {/* ── SEARCH BAR — desktop (md+) ───────────────────────── */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools (⌘K)"
              className={clsx(
                'hidden md:flex items-center gap-3',
                'h-10 px-4 rounded-lg',
                'border-2 cursor-text',
                'transition-all duration-150',
                'focus-visible:outline-none',
                // light defaults — clear visible stroke
                'border-slate-200 bg-white hover:border-indigo-400',
                // dark defaults
                'dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500',
              )}
              style={{ minWidth: 280, maxWidth: 400 }}
            >
              <MagnifyingGlassIcon
                className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
              <span className="flex-1 text-left text-sm font-normal text-slate-400 dark:text-slate-500">
                Search tools…
              </span>
              <kbd
                className={clsx(
                  'hidden lg:inline-flex items-center justify-center',
                  'h-6 px-2 rounded-md border text-[10px] font-semibold tracking-wide',
                  'border-slate-200 bg-slate-50 text-slate-400',
                  'dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500',
                )}
              >
                ⌘K
              </kbd>
            </button>

            {/* ── Action row ───────────────────────────────────────── */}
            <div className="flex items-center gap-1">

              {/* Search icon — mobile only */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search tools"
                className="md:hidden btn btn-icon btn-ghost"
              >
                <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Theme toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
                }
                className="btn btn-icon btn-ghost"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.18 }}
                >
                  {theme === 'light' ? (
                    <MoonIcon className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <SunIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </motion.div>
              </button>

              {/* Design Mode Switcher */}
              <button
                type="button"
                onClick={toggleDesignMode}
                aria-label={
                  designMode === 'default' ? 'Switch to minimal UI' : 'Switch to default UI'
                }
                title={designMode === 'default' ? 'Minimal UI' : 'Default UI'}
                className="px-2.5 py-1.5 rounded-lg border text-[10px] font-bold tracking-wide uppercase transition-all duration-150 border-slate-200 hover:border-indigo-400 dark:border-slate-700 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer shrink-0"
                style={{
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--border-default)',
                }}
              >
                {designMode === 'default' ? '✦ Classic' : '⊙ Minimal'}
              </button>

              {/* Hamburger — MOBILE ONLY (md:hidden) */}
              <button
                ref={toggleBtnRef}
                type="button"
                onClick={() => setIsDrawerOpen((o) => !o)}
                aria-expanded={isDrawerOpen}
                aria-controls="mobile-drawer"
                aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
                className={clsx(
                  'md:hidden btn btn-icon btn-ghost transition-colors',
                  isDrawerOpen &&
                    'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                )}
              >
                {isDrawerOpen ? (
                  <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════  MOBILE DRAWER  ════════════════════ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* drawer panel */}
            <motion.div
              ref={drawerRef}
              key="drawer-panel"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[300px] flex flex-col overflow-hidden"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '1px solid var(--border-default)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
              }}
            >
              {/* drawer header */}
              <div
                className="flex items-center justify-between px-5 h-16 shrink-0 border-b"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="btn btn-icon btn-ghost"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* drawer search */}
              <div className="px-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setSearchOpen(true); setIsDrawerOpen(false); }}
                  className={clsx(
                    'flex items-center gap-3 w-full h-11 px-4 rounded-xl',
                    'border-2 border-slate-200 bg-slate-50 text-left',
                    'dark:border-slate-700 dark:bg-slate-900',
                    'hover:border-indigo-400 dark:hover:border-indigo-500',
                    'transition-colors duration-150',
                  )}
                >
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-400 dark:text-slate-500">
                    Search 500+ tools…
                  </span>
                </button>
              </div>

              {/* drawer modules */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 px-1">
                  Browse Modules
                </p>
                <div className="flex flex-col gap-1">
                  {MODULES.map((mod) => (
                    <Link
                      key={mod.key}
                      to={mod.slug}
                      onClick={() => setIsDrawerOpen(false)}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-3 rounded-xl group',
                        'transition-all duration-150',
                        'hover:bg-indigo-50 dark:hover:bg-indigo-950/50',
                      )}
                    >
                      <span
                        className="flex items-center justify-center w-9 h-9 rounded-lg text-lg shrink-0"
                        style={{ background: 'var(--bg-surface)' }}
                        aria-hidden="true"
                      >
                        {MODULE_EMOJIS[mod.key] ?? '🔧'}
                      </span>
                      <span
                        className="flex-1 text-sm font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {mod.name}
                      </span>
                      <ArrowRightIcon
                        className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* drawer footer */}
              <div
                className="px-5 py-4 border-t shrink-0 flex flex-col gap-2"
                style={{ borderColor: 'var(--border-default)' }}
              >
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={clsx(
                    'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl',
                    'text-sm font-medium transition-colors duration-150',
                    'hover:bg-slate-100 dark:hover:bg-slate-800',
                  )}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {theme === 'light' ? (
                    <>
                      <MoonIcon className="w-4.5 h-4.5" />
                      Switch to Dark Mode
                    </>
                  ) : (
                    <>
                      <SunIcon className="w-4.5 h-4.5" />
                      Switch to Light Mode
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleDesignMode}
                  className={clsx(
                    'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl',
                    'text-sm font-medium transition-colors duration-150',
                    'hover:bg-slate-100 dark:hover:bg-slate-800',
                  )}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="text-xs font-bold font-mono tracking-tighter w-4.5 flex justify-center">
                    {designMode === 'default' ? '⊙' : '✦'}
                  </span>
                  <span>{designMode === 'default' ? 'Switch to Minimal UI' : 'Switch to Classic UI'}</span>
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
