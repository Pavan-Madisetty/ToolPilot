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
      <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-bg-base">
        <div className="max-w-md p-8 border border-border-default rounded-2xl bg-bg-elevated shadow-xl">
          <div className="text-7xl mb-6 animate-pulse">🛠️</div>
          <h1 className="text-3xl font-extrabold mb-4 text-text-primary">
            Under Maintenance
          </h1>
          <p className="text-body mb-6 leading-relaxed text-text-secondary">
            Toolskyt is currently undergoing scheduled platform upgrades. We will be back shortly with brand new tools and speed optimizations!
          </p>
          <div className="w-12 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <AnnouncementBanner />
      {/* Accessibility: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
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
