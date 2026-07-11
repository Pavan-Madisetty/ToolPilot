import { ToolCard } from '@/components/ui/ToolCard';
import { Sparkles } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const utilitiesTools = TOOLS_BY_MODULE['utilities'] || [];

export default function UtilitiesModule() {
  return (
    <ModulePageWrapper
      moduleKey="utilities"
      moduleName="Utilities"
      description="Access free browser-based general utilities including discount calculators, date difference trackers, and hex color code tools."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="utilities"
        title="Utility Tools"
        description="Compute discount rates, check date intervals (days between dates), and translate digital color models."
        icon={<Sparkles size={24} strokeWidth={2} />}
        toolCount={utilitiesTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Utilities tools">
        {utilitiesTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {utilitiesTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">🧰</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building general utilities like discount and date calculators. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
