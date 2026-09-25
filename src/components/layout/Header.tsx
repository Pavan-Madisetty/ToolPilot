import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X, Heart, ChevronDown, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useThemeStore } from '@/stores/themeStore';
import { useSearchStore } from '@/stores/uiStore';
import { MODULES, getModuleColors } from '@/config/modules';
import { TOOLS_BY_MODULE, LIVE_TOOL_COUNT } from '@/config/tools';
import { LucideIcon } from '@/components/shared/LucideIcon';

/** Categories promoted to the top bar; everything else lives in the "All tools" menu. */
const PRIMARY_NAV = ['finance', 'developer', 'pdf', 'image', 'text'] as const;

export function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const setSearchOpen = useSearchStore((s) => s.setIsOpen);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ⌘K / Ctrl+K opens search.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Dismiss mega-menu / drawer on outside click or Escape.
  useEffect(() => {
    if (!menuOpen && !drawerOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuOpen && menuRef.current && !menuRef.current.contains(t)) setMenuOpen(false);
      if (
        drawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(t) &&
        !drawerBtnRef.current?.contains(t)
      )
        setDrawerOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen, drawerOpen]);

  const primary = PRIMARY_NAV.map((k) => MODULES.find((m) => m.key === k)).filter(
    (m): m is (typeof MODULES)[number] => Boolean(m)
  );

  return (
    <>
      <header className={clsx('sk-header', scrolled && 'sk-header--scrolled')} role="banner">
        <div className="sk-container sk-header__inner">
          <Link to="/" className="sk-logo" aria-label="Toolskyt — home">
            <span className="sk-logo__mark" aria-hidden="true">
              T
            </span>
            <span className="sk-logo__word">
              Tool<span>skyt</span>
            </span>
          </Link>

          <nav className="sk-nav" aria-label="Primary">
            <div className="sk-nav__menu" ref={menuRef}>
              <button
                type="button"
                className={clsx('sk-nav__link sk-nav__trigger', menuOpen && 'is-active')}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                onClick={() => setMenuOpen((v) => !v)}
              >
                All tools
                <ChevronDown size={15} aria-hidden="true" className={clsx(menuOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="sk-mega"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.14 }}
                  >
                    <div className="sk-mega__grid">
                      {MODULES.map((mod) => {
                        const c = getModuleColors(mod.key);
                        return (
                          <Link key={mod.key} to={mod.slug} className="sk-mega__item" onClick={() => setMenuOpen(false)}>
                            <span
                              className="sk-mega__icon"
                              style={{ background: c.bg, color: c.accent }}
                              aria-hidden="true"
                            >
                              <LucideIcon name={mod.icon} size={18} strokeWidth={2.2} />
                            </span>
                            <span className="sk-mega__text">
                              <span className="sk-mega__name">
                                {mod.name}
                                <em>{TOOLS_BY_MODULE[mod.key]?.length ?? 0}</em>
                              </span>
                              <span className="sk-mega__desc">{mod.description}</span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <Link to="/all-tools" className="sk-mega__all" onClick={() => setMenuOpen(false)}>
                      Browse all {LIVE_TOOL_COUNT} tools <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {primary.map((mod) => (
              <NavLink
                key={mod.key}
                to={mod.slug}
                className={({ isActive }) => clsx('sk-nav__link', isActive && 'is-active')}
              >
                {mod.name.replace(/ Tools$/, '')}
              </NavLink>
            ))}
          </nav>

          <div className="sk-header__actions">
            <button
              type="button"
              className="sk-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools (Ctrl or Command + K)"
            >
              <Search size={16} aria-hidden="true" />
              <span>Search tools…</span>
              <kbd>⌘K</kbd>
            </button>

            <button
              type="button"
              className="sk-icon-btn sk-search-icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tools"
            >
              <Search size={19} aria-hidden="true" />
            </button>

            <Link to="/#favorites" className="sk-icon-btn sk-hide-sm" aria-label="Favorite tools">
              <Heart size={19} aria-hidden="true" />
            </Link>

            <button
              type="button"
              className="sk-icon-btn"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
            </button>

            <button
              ref={drawerBtnRef}
              type="button"
              className="sk-icon-btn sk-burger"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="backdrop"
              className="sk-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              ref={drawerRef}
              className="sk-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            >
              <div className="sk-drawer__head">
                <span className="sk-drawer__title">Browse tools</span>
                <button type="button" className="sk-icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                className="sk-drawer__search"
                onClick={() => {
                  setDrawerOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search size={16} aria-hidden="true" />
                Search {LIVE_TOOL_COUNT} tools…
              </button>

              <div className="sk-drawer__list">
                {MODULES.map((mod) => {
                  const c = getModuleColors(mod.key);
                  return (
                    <Link key={mod.key} to={mod.slug} className="sk-drawer__item" onClick={() => setDrawerOpen(false)}>
                      <span className="sk-mega__icon" style={{ background: c.bg, color: c.accent }} aria-hidden="true">
                        <LucideIcon name={mod.icon} size={18} strokeWidth={2.2} />
                      </span>
                      <span className="sk-drawer__name">{mod.name}</span>
                      <em>{TOOLS_BY_MODULE[mod.key]?.length ?? 0}</em>
                    </Link>
                  );
                })}
              </div>

              <div className="sk-drawer__foot">
                <Link to="/#favorites" className="sk-drawer__foot-link" onClick={() => setDrawerOpen(false)}>
                  <Heart size={16} aria-hidden="true" /> Favorites
                </Link>
                <button type="button" className="sk-drawer__foot-link" onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
                  {theme === 'light' ? 'Dark mode' : 'Light mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
