import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchDialog } from '@/components/features/SearchDialog';
import { AnnouncementBanner } from '@/components/shared/AnnouncementBanner';
import { useRuntimeConfig } from '@/context/RuntimeConfigContext';

export function AppLayout() {
  const location = useLocation();
  const { config } = useRuntimeConfig();

  if (config.featureFlags?.maintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-[var(--bg-base)]">
        <div className="max-w-md p-8 border rounded-2xl bg-white dark:bg-slate-800 shadow-xl border-[var(--border-default)]">
          <div className="text-7xl mb-6 animate-pulse">🛠️</div>
          <h1 className="text-3xl font-extrabold mb-4" style={{ color: 'var(--text-primary)' }}>
            Under Maintenance
          </h1>
          <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            ToolPilot is currently undergoing scheduled platform upgrades. We will be back shortly with brand new tools and speed optimizations!
          </p>
          <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <AnnouncementBanner />
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1" role="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <SearchDialog />
    </div>
  );
}
