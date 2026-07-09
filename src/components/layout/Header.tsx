import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
import { MODULES } from '@/config/modules';
import { clsx } from 'clsx';

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { setIsOpen: setSearchOpen } = useSearchStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const navItems = [
    { label: 'All Tools', href: '/' },
    { label: 'Finance', href: '/finance' },
    { label: 'Developer', href: '/developer' },
    { label: 'PDF', href: '/pdf' },
    { label: 'Image', href: '/image' },
    { label: 'Text', href: '/text' },
    { label: 'AI', href: '/ai' },
  ];

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

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 ml-4"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "bg-[rgba(79,70,229,0.08)] text-[var(--text-link)] font-semibold"
                        : "text-[var(--text-secondary)] hover:bg-gray-100 dark:hover:bg-gray-800"
                    )
                  }
                  end={item.href === '/'}
                >
                  {item.label}
                </NavLink>
              ))}

              {/* All Modules dropdown trigger */}
              <Link
                to="/"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Squares2X2Icon className="w-4 h-4" aria-hidden="true" />
                More
              </Link>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Search Bar — Desktop */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-[10px] text-sm transition-all duration-200 border hover:border-[var(--border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-tertiary)',
                minWidth: '280px',
                boxShadow: 'var(--shadow-xs)',
              }}
              aria-label="Search tools (Ctrl+K)"
            >
              <MagnifyingGlassIcon className="w-4.5 h-4.5 shrink-0" style={{ color: 'var(--text-tertiary)' }} aria-hidden="true" />
              <span className="flex-1 text-left text-xs font-normal">Search 500+ tools or tools index...</span>
              <kbd
                className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] rounded-[6px] border font-mono"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
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

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden btn btn-icon btn-ghost"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden border-t"
            style={{
              borderColor: 'var(--border-default)',
              background: 'var(--bg-elevated)',
            }}
          >
            <nav className="container-app py-4" aria-label="Mobile navigation">
              {/* Search */}
              <button
                onClick={() => { setSearchOpen(true); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg mb-2 text-sm"
                style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
              >
                <MagnifyingGlassIcon className="w-4 h-4" aria-hidden="true" />
                Search 500+ tools...
              </button>

              <div className="grid grid-cols-2 gap-1">
                {navItems.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-default)' }}>
                <p className="px-3 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                  All Modules
                </p>
                <div className="grid grid-cols-3 gap-1">
                  {MODULES.map((mod) => (
                    <Link
                      key={mod.key}
                      to={mod.slug}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-2 py-2 rounded-lg text-xs font-medium text-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {mod.name}
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
