// ─────────────────────────────────────────────────────────────
// StepWizard — Main wizard shell with progress bar & navigation
// ─────────────────────────────────────────────────────────────
import { lazy, Suspense, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useResumeStore } from '@/stores/resumeStore';
import { WIZARD_STEPS } from '@/types/resume';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

// ── Lazy-load each step ──────────────────────────────────────
const STEP_COMPONENTS = [
  lazy(() => import('./steps/PersonalDetails')),
  lazy(() => import('./steps/EducationStep')),
  lazy(() => import('./steps/ExperienceStep')),
  lazy(() => import('./steps/SkillsStep')),
  lazy(() => import('./steps/ProjectsStep')),
  lazy(() => import('./steps/CertificatesStep')),
  lazy(() => import('./steps/AchievementsStep')),
  lazy(() => import('./steps/TemplateGallery')),
  lazy(() => import('./steps/LiveEditor')),
];

const TOTAL_STEPS = WIZARD_STEPS.length; // 9

/** Framer-motion animation variants for step transitions */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function StepWizard() {
  const currentStep = useResumeStore((s) => s.currentStep);
  const setStep = useResumeStore((s) => s.setStep);
  const nextStep = useResumeStore((s) => s.nextStep);
  const prevStep = useResumeStore((s) => s.prevStep);

  const handleStepClick = useCallback(
    (index: number) => {
      // Allow clicking on completed or current steps only
      if (index <= currentStep) {
        setStep(index);
      }
    },
    [currentStep, setStep]
  );

  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* ═══════════════════════════════════════════════════════
          Progress bar — horizontal step circles
          ═══════════════════════════════════════════════════════ */}
      {/* Desktop progress bar */}
      <nav
        className="hidden md:flex items-center justify-between"
        aria-label="Wizard progress"
      >
        {WIZARD_STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isFuture = index > currentStep;

          return (
            <div key={step.key} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <button
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={isFuture}
                className="flex flex-col items-center gap-1 group cursor-pointer disabled:cursor-not-allowed"
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold transition-all duration-300"
                  style={{
                    backgroundColor: isCompleted
                      ? 'var(--primary)'
                      : isCurrent
                        ? 'transparent'
                        : 'transparent',
                    borderWidth: '2px',
                    borderStyle: 'solid',
                    borderColor: isCompleted || isCurrent ? 'var(--primary)' : 'var(--border-default)',
                    color: isCompleted
                      ? '#fff'
                      : isCurrent
                        ? 'var(--primary)'
                        : 'var(--text-secondary)',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(37,99,235,0.15)' : undefined,
                  }}
                >
                  {isCompleted ? <Check size={16} /> : index + 1}
                </div>
                <span
                  className="text-[10px] font-medium whitespace-nowrap"
                  style={{
                    color: isCurrent ? 'var(--primary)' : 'var(--text-secondary)',
                  }}
                >
                  {step.shortLabel}
                </span>
              </button>

              {/* Connecting line */}
              {index < TOTAL_STEPS - 1 && (
                <div
                  className="flex-1 h-0.5 mx-1 rounded"
                  style={{
                    backgroundColor: isCompleted ? 'var(--primary)' : 'var(--border-default)',
                  }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile progress: show current step only */}
      <div
        className="flex md:hidden items-center justify-center gap-2 py-2"
        aria-label="Current wizard step"
      >
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
          style={{
            backgroundColor: 'var(--primary)',
            color: '#fff',
          }}
        >
          {currentStep + 1}
        </span>
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {WIZARD_STEPS[currentStep].label}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          ({currentStep + 1}/{TOTAL_STEPS})
        </span>
      </div>

      {/* ═══════════════════════════════════════════════════════
          Step content area with slide transition
          ═══════════════════════════════════════════════════════ */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Suspense
              fallback={
                <div
                  className="flex items-center justify-center py-20"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <div className="text-center space-y-2">
                    <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
                    <p className="text-sm">Loading step…</p>
                  </div>
                </div>
              }
            >
              <StepComponent />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════════════════════
          Bottom navigation bar
          ═══════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
        {/* Previous button — hidden on step 0 */}
        {currentStep > 0 ? (
          <Button
            variant="secondary"
            onClick={prevStep}
            leftIcon={<ChevronLeft size={16} />}
            aria-label="Go to previous step"
          >
            Previous
          </Button>
        ) : (
          <div /> // Spacer
        )}

        {/* Step counter */}
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>

        {/* Next button — different label on template step, hidden on editor step */}
        {currentStep < TOTAL_STEPS - 1 && (
          <Button
            variant="primary"
            onClick={nextStep}
            rightIcon={<ChevronRight size={16} />}
            aria-label={currentStep === 7 ? 'Preview resume' : 'Go to next step'}
          >
            {currentStep === 7 ? 'Preview Resume' : 'Next'}
          </Button>
        )}

        {/* On the last step (editor), no Next — export is within the editor */}
        {currentStep === TOTAL_STEPS - 1 && <div />}
      </div>
    </div>
  );
}
