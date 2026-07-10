import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { ScaleIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const conversionTools = TOOLS.filter((t) => t.module === 'conversion');

export default function ConversionModule() {
  return (
    <ModulePageWrapper
      moduleKey="conversion"
      moduleName="Conversion"
      description="Access free browser-based unit conversion calculators including length, weight, and temperature metrics."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        title="Conversion Tools"
        description="Translate metric lengths, compare mass weight values, and convert Celsius/Fahrenheit temperature scales instantly."
        icon={<ScaleIcon className="w-6 h-6" />}
        iconColorClass="text-teal-500"
        accentBgColor="rgba(20, 184, 166, 0.08)"
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
