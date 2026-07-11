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
      <section aria-label="Conversion tools">
        {conversionTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {conversionTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">⚖️</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building unit conversion calculators for length, weight, and temperature. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
