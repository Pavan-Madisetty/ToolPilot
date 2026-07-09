import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { GlobeAmericasIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';

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
        <ModuleHeader
          title="Travel Module"
          description="Track global timezone offsets, plan flight schedules, and compile travel checklists efficiently."
          icon={<GlobeAmericasIcon className="w-6 h-6" />}
          iconColorClass="text-cyan-500"
          accentBgColor="rgba(6, 182, 212, 0.08)"
        />

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
