import { ToolCard } from '@/components/ui/ToolCard';
import { Scale } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const conversionTools = TOOLS_BY_MODULE['conversion'] || [];

export default function ConversionModule() {
  return (
    <ModulePageWrapper
      moduleKey="conversion"
      moduleName="Conversion"
      description="Access free browser-based unit conversion calculators including length, weight, and temperature metrics."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="conversion"
        title="Conversion Tools"
        description="Translate metric lengths, compare mass weight values, and convert Celsius/Fahrenheit temperature scales instantly."
        icon={<Scale size={24} strokeWidth={2} />}
        toolCount={conversionTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Conversion tools list">
        <div className="tools-grid">
          {conversionTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
