import { ToolCard } from '@/components/ui/ToolCard';
import { Heart } from 'lucide-react';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';
import { TOOLS_BY_MODULE } from '@/config/tools';

const healthTools = TOOLS_BY_MODULE['health'] || [];

export default function HealthModule() {
  return (
    <ModulePageWrapper
      moduleKey="health"
      moduleName="Health"
      description="Access free browser-based fitness utilities including BMI and calorie metrics."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        moduleKey="health"
        title="Health Tools"
        description="Compute BMI (Body Mass Index) scores, determine healthy weight target scopes, and check baseline fitness metrics locally."
        icon={<Heart size={24} strokeWidth={2} />}
        toolCount={healthTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Health tools">
        {healthTools.length > 0 ? (
          <div className="tools-grid mt-8">
            {healthTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="py-20 text-center border rounded-2xl"
            style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
          >
            <div className="text-6xl mb-4" aria-hidden="true">🩺</div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tools Coming Soon
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              We're building fitness utilities like BMI and calorie calculators. Check back soon!
            </p>
          </div>
        )}
      </section>
    </ModulePageWrapper>
  );
}
