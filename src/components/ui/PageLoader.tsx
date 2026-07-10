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
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        background: 'var(--bg-base)',
      }}
    >
      {/* Logo Mark */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: 'linear-gradient(135deg, var(--text-link) 0%, rgba(79, 70, 229, 0.6) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(79, 70, 229, 0.25)',
        }}
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
      <div style={{ position: 'relative', width: 48, height: 48 }} aria-hidden="true">
        <motion.span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid var(--border-default)',
            borderTopColor: 'var(--text-link)',
          }}
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
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          fontWeight: 500,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.01em',
        }}
      >
        <span>Loading</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }} aria-hidden="true">
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
              style={{
                display: 'inline-block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--text-link)',
              }}
            />
          ))}
        </span>
      </motion.div>
    </motion.div>
  );
}
