import { Globe } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';

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

      {/* Tools Grid */}
      {travelTools.length > 0 ? (
        <section aria-label="Travel tools">
          <div className="tools-grid mt-8">
            {travelTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ) : (
        <div
          className="py-20 text-center border rounded-2xl"
          style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
        >
          <div className="text-6xl mb-4" aria-hidden="true">✈️</div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Travel Utilities Coming Soon
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            We are building client-side travel utilities (like timezone visualizers and offline
            itinerary planners). Check back soon!
          </p>
        </div>
      )}
    </ModulePageWrapper>
  );
}
