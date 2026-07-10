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
      <section aria-label="Utilities tools list" className="mt-8">
        <div className="tools-grid">
          {utilitiesTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
