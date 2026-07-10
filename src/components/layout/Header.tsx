import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, Heart, Folder } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
import { MODULES } from '@/config/modules';
import { clsx } from 'clsx';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { setIsOpen: setSearchOpen } = useSearchStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
        className="sticky top-0 z-50 transition-shadow duration-200"
        style={{
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-default)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: isScrolled ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="container-app h-16 flex items-center justify-between">
          
          {/* LEFT ZONE: Logo */}
          <div className="flex items-center gap-8 h-full shrink-0">
            <Link
              to="/"
              className="flex items-center gap-3 font-bold text-xl select-none cursor-pointer"
              aria-label="ToolPilot — Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-sm shrink-0"
                style={{
                  background: 'var(--primary)',
                }}
                aria-hidden="true"
              >
                T
              </div>
              <span className="font-bold text-xl tracking-tight leading-none flex items-center">
                <span className="text-[var(--text-primary)]">Tool</span>
                <span className="text-[var(--primary)]">Pilot</span>
              </span>
            </Link>
          </div>

          {/* CENTER-RIGHT ZONE: Search Field */}
          <div className="hidden md:flex flex-1 justify-end max-w-[420px] lg:max-w-none mr-4 lg:mr-8">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              aria-label="Search tools (⌘K)"
              className={clsx(
                "flex items-center w-[320px] h-10 px-3 rounded-[8px] border cursor-text transition-all duration-150 outline-none select-none",
                isSearchFocused
                  ? "border-[#6366F1]"
                  : "border-[var(--border-default)] hover:border-slate-300 dark:hover:border-slate-700"
              )}
              style={{
                boxShadow: isSearchFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : 'none',
                background: 'var(--bg-base)',
              }}
            >
              <Search
                size={16}
                className="shrink-0 text-slate-400 dark:text-slate-500"
                aria-hidden="true"
              />
              <span className="flex-1 text-left text-sm font-normal text-slate-400 dark:text-slate-500 ml-[12px]">
                Search tools…
              </span>
              <kbd
                className="inline-flex items-center justify-center h-5 px-1.5 rounded-[4px] border text-[11px] font-sans font-medium bg-[var(--bg-surface)] border-[var(--border-default)] text-slate-400 dark:text-slate-500"
              >
                ⌘K
              </kbd>
            </button>
          </div>

          {/* RIGHT ZONE: Icons Cluster & Theme toggle */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Favorites heart */}
            <Link
              to="/#favorites"
              aria-label="View favorite tools"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Heart size={20} strokeWidth={2} aria-hidden="true" />
            </Link>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                {theme === 'light' ? (
                  <Moon size={20} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Sun size={20} strokeWidth={2} aria-hidden="true" />
                )}
              </motion.div>
            </button>

            {/* Tablet Hamburger Menu */}
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors lg:hidden shrink-0"
            >
              <Menu size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Actions Right */}
          <div className="flex md:hidden items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            >
              <Search size={20} strokeWidth={2} aria-hidden="true" />
            </button>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
            >
              <Menu size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════  MOBILE DRAWER  ════════════════════ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Panel */}
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
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] flex flex-col overflow-hidden"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '1px solid var(--border-default)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-[var(--border-default)]">
                <span className="font-bold text-base text-[var(--text-primary)]">Navigation</span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] cursor-pointer"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Drawer Search */}
              <div className="px-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setSearchOpen(true); setIsDrawerOpen(false); }}
                  className="flex items-center gap-3 w-full h-11 px-4 rounded-[8px] border border-[var(--border-default)] bg-[var(--bg-base)] text-left hover:border-indigo-400 transition-colors cursor-pointer"
                >
                  <Search size={16} strokeWidth={2} className="text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-400 dark:text-slate-500">Search tools…</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6">
                {/* Favorites */}
                <div>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      to="/#favorites"
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-[var(--bg-surface)] rounded-lg transition-colors cursor-pointer"
                    >
                      <Heart size={18} strokeWidth={2} className="text-slate-400 shrink-0" />
                      <span>Favorites</span>
                    </Link>
                  </div>
                </div>

                {/* Explore Categories */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] px-3 mb-2">
                    Explore Categories
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {MODULES.map((mod) => (
                      <Link
                        key={mod.key}
                        to={mod.slug}
                        onClick={() => setIsDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-[var(--bg-surface)] rounded-lg transition-colors cursor-pointer"
                      >
                        <Folder size={18} strokeWidth={2} className="text-slate-400 shrink-0" />
                        <span>{mod.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="px-5 py-4 border-t border-[var(--border-default)] shrink-0 flex flex-col gap-2 bg-[var(--bg-surface)]">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={18} strokeWidth={2} className="text-slate-500" />
                      <span>Switch to Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun size={18} strokeWidth={2} className="text-slate-400" />
                      <span>Switch to Light Mode</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
