import { TOOLS } from '@/config/tools';
import { ToolCard } from '@/components/ui/ToolCard';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ModuleHeader } from '@/components/shared/ModuleHeader';
import { ModulePageWrapper } from '@/components/shared/ModulePageWrapper';

const healthTools = TOOLS.filter((t) => t.module === 'health');

export default function HealthModule() {
  return (
    <ModulePageWrapper
      moduleKey="health"
      moduleName="Health"
      description="Access free browser-based fitness utilities including BMI and calorie metrics."
    >
      {/* Hero Banner Header */}
      <ModuleHeader
        title="Health Tools"
        description="Compute BMI (Body Mass Index) scores, determine healthy weight target scopes, and check baseline fitness metrics locally."
        icon={<HeartIcon className="w-6 h-6" />}
        iconColorClass="text-rose-500"
        accentBgColor="rgba(244, 63, 94, 0.08)"
        toolCount={healthTools.length}
      />

      {/* Tools Grid */}
      <section aria-label="Health tools list">
        <div className="tools-grid">
          {healthTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </ModulePageWrapper>
  );
}
