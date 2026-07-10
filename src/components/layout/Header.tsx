import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
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
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LEFT ZONE: Logo & Nav Links */}
          <div className="flex items-center gap-8 h-full shrink-0">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold text-xl select-none"
              aria-label="ToolPilot — Home"
            >
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center text-white text-[10px] font-black shadow-sm shrink-0"
                style={{
                  background: 'var(--primary)',
                }}
                aria-hidden="true"
              >
                T
              </div>
              <span className="font-bold text-xl tracking-tight leading-none">
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
                background: isSearchFocused ? 'var(--bg-base)' : 'var(--bg-base)',
              }}
            >
              <MagnifyingGlassIcon
                className="w-4 h-4 shrink-0 text-slate-400 dark:text-slate-500"
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

          {/* RIGHT ZONE: Icons Cluster & Sign in */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {/* Favorites heart */}
            <Link
              to="/#favorites"
              aria-label="View favorite tools"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <HeartIcon className="w-5 h-5" aria-hidden="true" />
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
                  <MoonIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <SunIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </motion.div>
            </button>



            {/* Tablet-only Hamburger Menu */}
            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
              className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors lg:hidden shrink-0"
            >
              <Bars3Icon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* MOBILE LAYOUT (<768px) */}
          <div className="flex md:hidden items-center justify-between w-full h-full relative">
            {/* Logo Left */}
            <Link
              to="/"
              className="flex items-center gap-2.5 font-bold text-xl select-none"
              aria-label="ToolPilot — Home"
            >
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center text-white text-[10px] font-black shadow-sm shrink-0"
                style={{
                  background: 'var(--primary)',
                }}
                aria-hidden="true"
              >
                T
              </div>
              <span className="font-bold text-lg tracking-tight leading-none">
                <span className="text-[var(--text-primary)]">Tool</span>
                <span className="text-[var(--primary)]">Pilot</span>
              </span>
            </Link>

            {/* Mobile Actions Right: Search Icon + Hamburger */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search tools"
                className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
              >
                <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                ref={toggleBtnRef}
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open menu"
                className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
              >
                <Bars3Icon className="w-5 h-5" aria-hidden="true" />
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
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
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
              className="fixed top-0 right-0 bottom-0 z-50 w-[320px] flex flex-col overflow-hidden"
              style={{
                background: 'var(--bg-elevated)',
                borderLeft: '1px solid var(--border-default)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
              }}
            >
              {/* drawer header */}
              <div className="flex items-center justify-between px-5 h-16 shrink-0 border-b border-[var(--border-default)]">
                <span className="font-bold text-base text-[var(--text-primary)]">Navigation</span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center hover:bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* drawer search */}
              <div className="px-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setSearchOpen(true); setIsDrawerOpen(false); }}
                  className="flex items-center gap-3 w-full h-11 px-4 rounded-[8px] border border-[var(--border-default)] bg-[var(--bg-base)] text-left hover:border-indigo-400 transition-colors"
                >
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm text-slate-400 dark:text-slate-500">Search tools…</span>
                </button>
              </div>

              {/* drawer modules & links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-6">
                <div>
                  <div className="flex flex-col gap-0.5">
                    <Link
                      to="/#favorites"
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-[var(--bg-surface)] rounded-lg transition-colors"
                    >
                      <HeartIcon className="w-5 h-5 text-slate-400 shrink-0" />
                      <span>Favorites</span>
                    </Link>

                  </div>
                </div>
              </div>

              {/* drawer footer */}
              <div className="px-5 py-4 border-t border-[var(--border-default)] shrink-0 flex flex-col gap-2 bg-[var(--bg-surface)]">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === 'light' ? (
                    <>
                      <MoonIcon className="w-5 h-5 text-slate-500" />
                      <span>Switch to Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <SunIcon className="w-5 h-5 text-slate-400" />
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
