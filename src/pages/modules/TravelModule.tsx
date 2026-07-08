import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';

export default function TravelModule() {
  return (
    <>
      <Helmet>
        <title>Travel & Geography Utilities | ToolPilot</title>
        <meta
          name="description"
          content="Access free browser-based travel tools including timezone estimators and packing lists templates."
        />
      </Helmet>

      <div className="container-app py-8">
        <Breadcrumb items={[{ label: 'Travel' }]} />

        {/* Hero Header */}
        <div
          className="p-8 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 mb-12 mt-4"
          style={{
            borderColor: 'var(--border-default)',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-xl">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-cyan-500"
              style={{ background: 'var(--bg-elevated)' }}
              aria-hidden="true"
            >
              <GlobeAmericasIcon className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
              Travel Module
            </h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
              Track global timezone offsets, plan flight schedules, and compile travel checklists efficiently.
            </p>
          </div>
        </div>

        {/* Coming soon board */}
        <div className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Travel Utilities Coming Soon</h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are designing geo-location calculators and currency conversion widgets that operate 100% offline. Check back soon!
          </p>
        </div>
      </div>
    </>
  );
}
