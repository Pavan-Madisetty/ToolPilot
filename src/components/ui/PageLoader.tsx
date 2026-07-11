import { motion } from 'framer-motion';

// ─────────────────────────────────────────────
// PageLoader — Full-screen loading overlay
// ─────────────────────────────────────────────

const DOT_VARIANTS = {
  initial: { y: 0, opacity: 0.4 },
  animate: { y: -8, opacity: 1 },
};

const CONTAINER_VARIANTS = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function PageLoader() {
  return (
    <motion.div
      role="status"
      aria-label="Loading content, please wait"
      aria-live="polite"
      variants={CONTAINER_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-bg-base"
    >
      {/* Logo Mark */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-text-link to-indigo-500/60 flex items-center justify-center shadow-lg shadow-indigo-500/25"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Spinner Ring */}
      <div className="relative w-12 h-12" aria-hidden="true">
        <motion.span
          className="absolute inset-0 rounded-full border-3 border-border-default border-t-text-link"
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.9,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </div>

      {/* Animated Dots with "Loading…" text */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center gap-1.5 text-text-secondary text-sm font-medium tracking-wide"
      >
        <span>Loading</span>
        <span className="flex items-center gap-0.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              variants={DOT_VARIANTS}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
              className="inline-block w-1 h-1 rounded-full bg-text-link"
            />
          ))}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default PageLoader;
