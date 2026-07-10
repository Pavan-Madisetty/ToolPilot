import { Globe } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const travelTools = TOOLS_BY_MODULE['travel'] || [];

export default function TravelModule() {
  return (
    <ModulePageWrapper
      moduleKey="travel"
      moduleName="Travel"
      description="Access free browser-based travel tools including timezone estimators and packing list templates."
    >
      {/* Hero Header */}
      <ModuleHeader
        moduleKey="travel"
        title="Travel Tools"
        description="Track global timezone offsets, plan flight schedules, and compile travel checklists efficiently."
        icon={<Globe size={24} strokeWidth={2} />}
        toolCount={travelTools.length}
      />

      {/* Coming soon board */}
      <div className="py-20 text-center border rounded-2xl bg-white dark:bg-slate-800" style={{ borderColor: 'var(--border-default)' }}>
        <div className="text-6xl mb-4">✈️</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Travel Utilities Coming Soon</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
          We are building client-side travel utilities (like timezone visualizers and offline itinerary planners). Check back soon!
        </p>
      </div>
    </ModulePageWrapper>
  );
}
